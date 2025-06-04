---
title: Spring Boot动态配置刷新完全指南：从原理到实战不重启更新配置
icon: file
order: 
date: 2025-05-31
category:
  - Java
tags:
  - 动态配置刷新
  - Nacos
  - Environment
  - Binder
---
## Part 1: 理论基础篇 (Foundation)

### 问题背景（Problem Background）

- 为什么需要动态配置？ (Why do we need dynamic configuration?)

动态配置刷新的重要性不言而喻，解决方案也有很多，比如 Nacos。有了它们，我们可以非常方便的实现配置修改，而不用重新重启服务，大大提高了配置效率。但是也不是所有的项目都需要这么重的服务，而且一个系统如果引入越多外部依赖，就越不可控。所以我们可以自己手动实现一个动态配置刷新，以实现更高的灵活性（同时也是一个学习的好机会） 

### Spring配置体系核心概念与配置加载原理

#### 什么是 Environment
`Environment` 是 Spring Boot 中一个非常重要的接口，负责环境配置。提供了简单的方法来获取系统变量、应用程序属性等。

它长这个样子⬇️
```java
public interface Environment extends PropertyResolver {  
    String[] getActiveProfiles();  
  
    String[] getDefaultProfiles();  
  
    /** @deprecated */  
    @Deprecated  
    boolean acceptsProfiles(String... profiles);  
  
    boolean acceptsProfiles(Profiles profiles);  
}
```

我们可以看到它还继承了父接口 `PropertyResolver`，父接口中的 `String getProperty(String key)` 方法也比较常用。

#### PropertySources
> Property is a part of Environment.

`Environment` 是门面(`facade`)，`PropertySources` 是实际存储配置的地方。`Environment` 负责统一管理和查询所有的 `PropertySources`。
```
Environment (环境对象) 
└── PropertySources (属性源集合)
```

打个比方：

Environment = 图书馆管理员 (librarian)  
PropertySources = 书架集合 (collection of bookshelves)  
当你问管理员要书时，他会按顺序在各个书架上找  

- `@ConfigurationProperties` 的工作原理


#### 了解 prepareEnvironment

我们知道在 `Spring Boot` 的启动类启动时，会执行 `run` 方法。我们跟进后会发现，属性配置就是在这里完成的。其中的 `prepareEnvironment` 方法是关键。
```java
public class SpringApplication {
	public ConfigurableApplicationContext run(String... args) {  
	   ...
	    try {  
	        ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);  // <-- 封装命令行的参数信息
	        ConfigurableEnvironment environment = this.prepareEnvironment(listeners, bootstrapContext, applicationArguments);  // 配置初始化
	
			......
	    } catch (Throwable ex) {  
	       	....
	    }  
	}
}
```

 让我们更进一步来观察
```java
private ConfigurableEnvironment prepareEnvironment(SpringApplicationRunListeners listeners, DefaultBootstrapContext bootstrapContext, ApplicationArguments applicationArguments) {

	/*
	* 创建一个 environment 对象
	**/
    ConfigurableEnvironment environment = this.getOrCreateEnvironment();
    /*
	* 这里主要是将命令行中的，键值对形式的参数封装为 PropertySource，以便添加到 environment 对象中。
	**/
    this.configureEnvironment(environment, applicationArguments.getSourceArgs());
    /*
    * environment 中只有 最普通的 PropertySource 对象，它仅支持通过 key 获取
    * 这一步是对 PropertySource 的增强，升级为支持配置解析与绑定的 ConfigurationPropertySources
    **/
    ConfigurationPropertySources.attach(environment);

    /*
     *  将默认的属性源中的所有属性值移到环境对象的队列末尾，defaultProperties 应该始终在最后，作为兜底，用来提供默认值
     **/
    DefaultPropertiesPropertySource.moveToEnd(environment);
    Assert.state(!environment.containsProperty("spring.main.environment-prefix"), "Environment prefix cannot be set via properties.");
    /*
	* 将某些属性绑定到 Spring Application，在这里绑定是因为，在创建 Spring 上下文（ApplicationContext）时需要用到某些配置信息
	* 可以看一下下面补充的 Spring Boot 启动流程
	**/
    this.bindToSpringApplication(environment);
    if (!this.isCustomEnvironment) {
        EnvironmentConverter environmentConverter = new EnvironmentConverter(this.getClassLoader());
        environment = environmentConverter.convertEnvironmentIfNecessary(environment, this.deduceEnvironmentClass());
    }

	/*
	* 最后再执行一次attach方法，确保无论中间添加了什么配置源，最终都能被正确包装
	**/
    ConfigurationPropertySources.attach(environment);
    return environment;
}
```

对于方法 `configureEnvironment` 需要特别关注一下，因为这里涉及到了是如何向 environment 添加新的 PropertySource。我们简单看一下就好，因为这个方法描述的是如何将命令行中的参数封装 PropertySource，然后再添加到 environment。

这里我们重点关注到 `configurePropertySources` 方法中 `environment` 的类型为 `ConfigurableEnvironment`，以及方法中的 `PropertySource.addFirst` 方法，以及参数类型。后面我们会用到这几个点 ^pc0bpw

```java
protected void configurePropertySources(ConfigurableEnvironment environment, String[] args) {  
	MutablePropertySources sources = environment.getPropertySources();  // 获取所有的 PropertySources
    
	String name = CommandLinePropertySource.COMMAND_LINE_PROPERTY_SOURCE_NAME;  
	if (sources.contains(name)) {   // 如果之前有这个名字的 PropertySources，就替换
	  PropertySource<?> source = sources.get(name);  
	  CompositePropertySource composite = new CompositePropertySource(name);  
	  composite.addPropertySource(  
			new SimpleCommandLinePropertySource("springApplicationCommandLineArgs", args));  
	  composite.addPropertySource(source);  
	  sources.replace(name, composite);  
	}  
	else {  // 否则就添加这个名字的 PropertySources
	  sources.addFirst(new SimpleCommandLinePropertySource(args));  
	}  
}
```


Spring Boot 启动流程：
```
1. SpringApplication 创建 (还没有场景Spring 应用上下文)
2. Environment 准备
3. bindToSpringApplication() <-- 此时还没有 Spring ApplicationContext
4. ApplicationContext 创建 <--  应用上下文诞生
5. Bean 扫描和注册
6. @ConfigurationProperties 绑定
7. 嵌入式 Tomcat 启动 <--  Web 容器启动
```

#### @ConfigurationProperties 的解析和绑定

我们已经成功读取，并初始化好了所有属性，但是怎么绑定到属性类呢？关键在于 `prepareEnvironment` 方法之后对于 `Spring ApplicationContext` 的处理
```java
public ConfigurableApplicationContext run(String... args) {
		
		.....
		
		try {
			......
			ConfigurableEnvironment environment = prepareEnvironment(listeners, bootstrapContext, applicationArguments);
			......
			
			/*
			* 创建 ApplicationContext 
			**/
			context = createApplicationContext();
			
			/*
			* 准备 ApplicationContext，比较重要的一步就是将 environment 设置到 ApplicationContext中
			**/			
			prepareContext(bootstrapContext, context, environment, listeners, applicationArguments, printedBanner);
			/*
			* 刷新上下文，这一步是绑定属性类的关键，这一步之后使用 @ConfigurationProperties 修饰的属性类才能正常使用
			**/
			refreshContext(context);
			
			......
		}
		catch (Throwable ex) {
			......
		}
		
		......
		
		return context;
	}
```

 我们 track 一下 `refreshContext(context)` 方法，在抽象类中有个通用的方法实现，我们只看最关键的：
```java
public abstract class AbstractApplicationContext {
    @Override
    public void refresh() {
    ......
    invokeBeanFactoryPostProcessors(beanFactory); // 注册和准备 BeanPostProcessor
    ......
    finishBeanFactoryInitialization(beanFactory); // 实际创建和初始化所有 singleton beans，执行Bean后置处理器
    ...
	}
}
```

在创建初始化 Bean 时，会执行 bean 的后置处理器，其中就包括 `ConfigurationPropertiesBindingPostProcessor` -- 配置属性绑定后置处理器
```java
public class ConfigurationPropertiesBindingPostProcessor
		implements BeanPostProcessor, PriorityOrdered, ApplicationContextAware, InitializingBean {

	private ApplicationContext applicationContext;

	private BeanDefinitionRegistry registry;

	private ConfigurationPropertiesBinder binder;

	@Override
	public void afterPropertiesSet() throws Exception {
		this.registry = (BeanDefinitionRegistry) this.applicationContext.getAutowireCapableBeanFactory();
		this.binder = ConfigurationPropertiesBinder.get(this.applicationContext);
	}

	......

	/*
	* 每个Bean实例化后都会调用这个方法，get 方法会检测当前 bean 是否需要绑定
	* 方法中会执行 findAnnotation(instance, type, factory, ConfigurationProperties.class);
	* annotation.isPresent() ? annotation.synthesize() : null;
	**/
	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		bind(ConfigurationPropertiesBean.get(this.applicationContext, bean, beanName));
		return bean;
	}

	private void bind(ConfigurationPropertiesBean bean) {
		// 检查这个 bean 是否已经绑定过
		if (bean == null || hasBoundValueObject(bean.getName())) {
			return;
		}
		
		try {
			this.binder.bind(bean); // 真正的绑定操作。实际绑定工作委托给 ConfigurationPropertiesBinder
		}
		catch (Exception ex) {
			throw new ConfigurationPropertiesBindException(bean, ex);
		}
	}

	private boolean hasBoundValueObject(String beanName) {
		return this.registry.containsBeanDefinition(beanName) && BindMethod.VALUE_OBJECT
				.equals(this.registry.getBeanDefinition(beanName).getAttribute(BindMethod.class.getName()));
	}
	
	......
}

```

实际的 bind 方法也没有很复杂, 让我们看看  
就是包装成 Bindable 对象，创建 BindHandler 对象，交给 Spring Binder 进行绑定
```java
BindResult<?> bind(ConfigurationPropertiesBean propertiesBean) {
    // 将包装被 @ConfigurationProperties 注解的 bean --> 可被绑定对象
    Bindable<?> target = propertiesBean.asBindTarget();
    
    // 获取注解信息  
    ConfigurationProperties annotation = propertiesBean.getAnnotation();
    
    // 创建绑定处理器，用于处理绑定过程中的各种情况
    BindHandler bindHandler = getBindHandler(target, annotation);
    
    // 执行实际绑定
    return getBinder().bind(annotation.prefix(), target, bindHandler);
}
```

getBinder() 方法返回的是一个已经初始化好的 Spring Binder 对象，这一段到时抄过来用就行。
```java
private Binder getBinder() {  
    if (this.binder == null) {  
       this.binder = new Binder(
       		getConfigurationPropertySources(), // 从哪里读取配置
			getPropertySourcesPlaceholdersResolver(),  // 如何解析 ${...} 占位符
             getConversionServices(), // 如何进行类型转换 (String → Integer)
             getPropertyEditorInitializer(),  // 如何初始化属性编辑器
             null,   // 如何处理默认值
             ConfigurationPropertiesBindConstructorProvider.INSTANCE);  // 如何创建对象实例
    }  
    return this.binder;  
}
```

怎么创建 Bindable 一个简单实例：  
Bindable 是一个**元数据容器**(metadata container)，包含了执行属性绑定所需的全部信息：类型、实例、注解和限制条件
```java
Bindable
	.ofInstance(bean)
	.withAnnotations(AnnotationUtils.findAnnotation(bean.getClass(), ConfigurationProperties.class));
```

一个 getBindHandler 参考
```java
/**
 *
 * 定义绑定配置属性到目标对象时如何处理各种异常和特殊情况
 * <p>
 * BindHandler 是 Spring Boot 提供的一个接口，用于在绑定配置属性到目标对象时处理各种异常和特殊情况
 *
 * @param annotation
 * @return
 */
private BindHandler getBindHandler(ConfigurationProperties annotation) {
    BindHandler handler = new IgnoreTopLevelConverterNotFoundBindHandler();
    if (annotation.ignoreInvalidFields()) { // 如果在配置属性时发现目标对象中有无效字段，则忽略这些无效字段
        handler = new IgnoreErrorsBindHandler(handler);
    }
    if (!annotation.ignoreUnknownFields()) { // 如果在配置属性时发现目标对象中有未知字段，则忽略这些未知字段
        UnboundElementsSourceFilter filter = new UnboundElementsSourceFilter();
        handler = new NoUnboundElementsBindHandler(handler, filter);
    }
    return handler;
}
```


## Part 2: 渐进式实现篇 (Progressive Implementation)

在阅读源码之后，相信你已经对与如何实现动态配置刷新有了一定的思路了，下面我们一起来实现一下吧。

- 万事开头难，让我先想一下，我们要干什么，首先我们要能做到获取到 `ConfigurationEnvironment`，忘记的同学可以回去看一下 [clickhere](#^pc0bpw)，从而能获取到它所管理的 `PropertySource`，然后我们便能将我们自定义的配置数据源设置到 `Environment` 中。其中使用到了到了两个接口
	- `ApplicationContextAware`。实现这个接口，从而获得感知应用上下的能力
	- `EnvironmentAware`。实现这个接口，从而获得感知环境的能力
- 接着我们要实现的是，对于使用了 `@ConfigurationProperties` 注解修饰的属性类，进行一个重新绑定，以便刷新属性值。
	- 便利所有的 Bean，找出那些被 `@ConfigurationProperties` 修饰的类
	- 包装、创建绑定策略、Bind

#### 基本实现
```sql
create table global_conf  
(  
    id int unsigned auto_increment comment '主键ID' primary key,  
    conf_key    varchar(128) default ''                not null comment '配置key',  
    conf_value  varchar(512) default ''                not null comment '配置value',  
    conf_group  varchar(255)                           null comment '组',  
    comment     varchar(128) default ''                not null comment '注释',  
    deleted     tinyint      default 0                 not null comment '是否删除 0 未删除 1 已删除',  
    create_time timestamp    default CURRENT_TIMESTAMP not null comment '创建时间',  
    update_time timestamp    default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '最后更新时间'  
)  
    comment '全局配置表';  
  
create index idx_key  
    on global_conf (conf_key);
```

```java
package com.github.dynamic;

/**
 * 动态配置绑定器，负责重新绑定属性
 *
 * @author wangwenpeng
 * @date 2025/06/03
 */
@Slf4j
@Component
public class DynamicConfigBinder implements ApplicationContextAware {
    private ApplicationContext applicationContext;

    private PropertySources propertySources;

    private volatile Binder binder;

    public  <T> void bind(Bindable<T> bindable) {
        ConfigurationProperties annotation = bindable.getAnnotation(ConfigurationProperties.class);
        if (annotation != null) {
            BindHandler bindHandler = getBindHandler(annotation);
            getBinder().bind(annotation.prefix(), bindable, bindHandler);
        }
    }

    private BindHandler getBindHandler(ConfigurationProperties annotation) {
        BindHandler handler = new IgnoreTopLevelConverterNotFoundBindHandler();
        if (annotation.ignoreInvalidFields()) { // 如果在配置属性时发现目标对象中有无效字段，则忽略这些无效字段
            handler = new IgnoreErrorsBindHandler(handler);
        }
        if (!annotation.ignoreUnknownFields()) { // 如果在配置属性时发现目标对象中有未知字段，则忽略这些未知字段
            UnboundElementsSourceFilter filter = new UnboundElementsSourceFilter();
            handler = new NoUnboundElementsBindHandler(handler, filter);
        }
        return handler;
    }

    /**
     * 初始化 Spring Binder 对象
     *
     * @return Spring Binder 对象
     */
    private Binder getBinder() {
        if (this.binder == null) {
            synchronized (this) {
                if (this.binder == null) {
                    this.binder = new Binder(
                            getConfigurationPropertySources(),
                            getPropertySourcesPlaceholdersResolver(),
                            getConversionService(),
                            getPropertyEditorInitializer());
                }
            }
        }
        return this.binder;
    }
}
```

```java
package com.github.dynamic;

/**
 * 动态配置管理器，负责拉取配置、封装配置与调用绑定器
 *
 * @author wangwenpeng
 * @date 2025/06/03
 */
@Slf4j
@Component
public class DynamicConfigManager implements EnvironmentAware, ApplicationContextAware, CommandLineRunner {

    private static final String DYNAMIC_CONFIG_PROPERTY_SOURCE_NAME = "dynamic-config";

    private ConfigurableEnvironment environment;

    private ApplicationContext applicationContext;

    private Map<String, Object> dynamicConfigs = new HashMap<>();

    @Autowired
    private DynamicConfigBinder dynamicConfigBinder;
    @Autowired
    private GlobalConfMapper globalConfMapper;

    public void reloadConfig(String group) {
        if (group == null) {
            loadConfigFromDb(null); // 全量加载
            addPropertySource();
            rebind(null); // 全量绑定
        } else {
            String before = JSONUtil.toJsonStr(dynamicConfigs);
            boolean toRefresh = loadConfigFromDb(group);
            if (toRefresh) {
                rebind(group);
                log.info("配置刷新! 旧:{}, 新:{}", before, JSONUtil.toJsonStr(dynamicConfigs));
            }
        }
    }

    /**
     * 从数据库加载配置信息
     *
     * @param targetGroup 目标分组，null 表示加载所有分组
     * @return boolean
     */
    public boolean loadConfigFromDb(String targetGroup) {
        log.info("====================== Loading configuration from database ======================\n");
        log.info("Starting to fetch dynamic configuration...");

        List<GlobalConfDO> list;
        if (targetGroup == null) {
            list = globalConfMapper.selectList(null);
        } else {
            list = globalConfMapper.selectList(new LambdaQueryWrapper<GlobalConfDO>().eq(GlobalConfDO::getConfGroup, targetGroup));
        }

        Map<String, Object> newConfigs = new HashMap<>();
        for (GlobalConfDO conf : list) {
            newConfigs.put(conf.getConfKey(), conf.getConfValue());
        }

        // 如果 targetGroup 为null（全量加载），且拉取到的配置信息不为空
        if (targetGroup == null && !newConfigs.isEmpty()) {
            dynamicConfigs = newConfigs;
            log.info("Successfully loaded {} configuration properties:", dynamicConfigs.size());
            return true;
        }

        // 如果 targetGroup 不为null（部分加载），且拉取到的配置信息不为空
        if (targetGroup != null && !newConfigs.isEmpty()) {
            // 更新 dynamicConfigs 中相应的配置项
            dynamicConfigs.putAll(newConfigs);
            return true;
        }

        log.warn("No configuration found in database");
        return false;
    }

    public void addPropertySource() {
        log.info("====================== Adding property source ======================\n");
        log.info("Creating MapPropertySource with name: {}", DYNAMIC_CONFIG_PROPERTY_SOURCE_NAME);

        int preSize = environment.getPropertySources().size();

        MapPropertySource dynConfPropertySource = new MapPropertySource(DYNAMIC_CONFIG_PROPERTY_SOURCE_NAME, dynamicConfigs);
        environment.getPropertySources().addFirst(dynConfPropertySource);

        log.info("Property source added with highest priority");
        log.info("Current property sources count: {} -> {}", preSize, environment.getPropertySources().size());
    }

    public void rebind(String group) {
        log.info("====================== Rebinding configuration properties ======================\n");

        // 找到所有添加了 ConfigurationProperties 注解的 bean
        Map<String, Object> beansWithAnnotation = applicationContext.getBeansWithAnnotation(ConfigurationProperties.class);


        if (group == null) {  // 全量刷新
            beansWithAnnotation.values().forEach(this::rebindBean);
        } else { // 部分刷新
            beansWithAnnotation.values().stream()
                    .filter(bean -> Objects.equals(bean.getClass().getSimpleName(), group))
                    .forEach(this::rebindBean);
        }

        log.info("Configuration rebinding completed");
    }

    private void rebindBean(Object bean) {
        ConfigurationProperties annotation = AnnotationUtils.findAnnotation(bean.getClass(), ConfigurationProperties.class);
        if (annotation != null) {
            // 执行重新绑定
            Bindable<?> bindable = Bindable.ofInstance(bean).withAnnotations(annotation);
            dynamicConfigBinder.bind(bindable);
        }
    }

    /*
    * 在 Spring Boot 完全启动后才执行在 Spring Boot 完全启动后才执行
    * yaml 中的默认值得以保留，作为默认值使用
    * */
    @Override
    public void run(String... args) throws Exception {
        reloadConfig(null);
    }
}
```

### 事件驱动支持

#### 回调支持

有时候我们需要在属性类刷新后重新计算一些值，我可以通过为目标属性类注册相应的回调任务来实现。当然你也可以通过事件通知来实现同样的效果。

```java
private Map<Class, Runnable> refreshCallBack = new HashMap<>(); // 回调任务
```

```java
public void rebind(String group) {

        ......

    if (group == null) {  // 全量刷新
        beansWithAnnotation.values().forEach(bean -> {
            rebindBean(bean);
            // 如果该 Bean 的类在 refreshCallback 中有对应的回调任务，则执行该回调任务
            executeCallback(bean);
        });
    } else { // 部分刷新
        beansWithAnnotation.values().stream()
                .filter(bean -> Objects.equals(bean.getClass().getSimpleName(), group))
                .forEach(bean1 -> {
                    rebindBean(bean1);
                    // 如果该 Bean 的类在 refreshCallback 中有对应的回调任务，则执行该回调任务
                    executeCallback(bean1);
                });
    }
}

private void executeCallback(Object bean) {
    if (refreshCallBack.containsKey(bean.getClass())) {
        refreshCallBack.get(bean.getClass()).run();
    }
}

public void registerRefreshCallback(Object bean, Runnable run) {  
    refreshCallBack.put(bean.getClass(), run);  
}
```

## Part 3: 高级特性篇 (Advanced Features)

### @Value 注解支持（@Value Annotation Support）

由于篇幅较长，故开一篇新的来讲解梳理：[dynamic-config-value](dynamic-config-value.md)

### 性能与安全（Performance & Security）


## Part 4: 总结与扩展 (Summary & Extensions)

### 封装为 Starter


### 与现有方案对比

#### 与 Spring Cloud Config 的异同


#### 与 Nacos 的对比