---
title: 手把手实现Spring Boot动态配置之@Value注解的解析与配置刷新
icon: file
order: 
date: 2025-06-04
category:
  - Java
tags:
  - 动态配置刷新
  - SpringBoot
  - Nacos
  - Environment
  - Binder
---
## Part 1: Spring 源码梳理与解析 (Spring Source Code Analyse)
### 类
```java
AccessibleObject (父类)
    ├── Field (字段)
    ├── Method (方法)  
    └── Constructor (构造函数)
```

```java
InjectedElement (抽象父类)
    ├── AutowiredFieldElement (处理字段注入)
    └── AutowiredMethodElement (处理方法注入)
```


#### InjectionMetadata
> 一个容器，方便管理

简化版代码

```java
class InjectionMetadata {
    private final Class<?> targetClass;           // 目标类
    private final Collection<InjectedElement> injectedElements;  // 所有需要注入的元素
    
    // 核心方法：执行注入
    public void inject(Object target, String beanName, PropertyValues pvs) {
        // 遍历所有 injectedElements，逐个调用 inject()
    }
    
    /*
	* 判断是否需要刷新 
	**/
    public static boolean needsRefresh(@Nullable InjectionMetadata metadata, Class<?> clazz) {  
    	return (metadata == null || this.targetClass != clazz;  
	}
}
```

### findAutowiringMetadata

简化版代码：

```java
InjectionMetadata findMetadata(String beanName, Class clazz) {
	// 有 beanName就用，没有就用类名
    String key = beanName != null ? beanName : clazz.getName();
    
    /*
    * 先查缓存
    * 如果命中缓存，且缓存不需要刷新时，直接返回
    **/
    InjectionMetadata cached = cache.get(key);
    if (cached != null && !cached.needsRefresh()) {
        return cached;
    }
    
    // 缓存失效，重新构建
    synchronized (cache) {
        // 双重检查，避免加锁之前的一瞬间有其它线程刚好对这个key构建好，导致重复构建
        cached = cache.get(key);
        if (cached == null || cached.needsRefresh()) {
            cached = buildMetadata(clazz);  // 这里是真正的扫描逻辑
            cache.put(key, cached);
        }
    }
    return cached;
}


protected boolean needsRefresh(Class<?> clazz) {  
    return this.targetClass != clazz;  
}
```

### buildAutowiringMetadata

```java
private InjectionMetadata buildAutowiringMetadata(Class<?> clazz) {
	/*
	* 真正构建之前，判断这个类是否是目标类：查找 一下这个类上是否有相关注解
	* autowiredAnnotationTypes 在 AutowiredAnnotationBeanPostProcessor 当构造方法中被初始化
	* 两个值：Autowired.class 、 Value.class
	**/
	if (!AnnotationUtils.isCandidateClass(clazz, this.autowiredAnnotationTypes)) {
		return InjectionMetadata.EMPTY;
	}

	List<InjectionMetadata.InjectedElement> elements = new ArrayList<>();
	Class<?> targetClass = clazz;

	do {
		final List<InjectionMetadata.InjectedElement> currElements = new ArrayList<>();

		ReflectionUtils.doWithLocalFields(targetClass, field -> {
			MergedAnnotation<?> ann = findAutowiredAnnotation(field);
			if (ann != null) {
				if (Modifier.isStatic(field.getModifiers())) {
					if (logger.isInfoEnabled()) {
						logger.info("Autowired annotation is not supported on static fields: " + field);
					}
					return;
				}
				boolean required = determineRequiredStatus(ann);
				currElements.add(new AutowiredFieldElement(field, required));
			}
		});

		ReflectionUtils.doWithLocalMethods(targetClass, method -> {
			Method bridgedMethod = BridgeMethodResolver.findBridgedMethod(method);
			if (!BridgeMethodResolver.isVisibilityBridgeMethodPair(method, bridgedMethod)) {
				return;
			}
			MergedAnnotation<?> ann = findAutowiredAnnotation(bridgedMethod);
			if (ann != null && method.equals(ClassUtils.getMostSpecificMethod(method, clazz))) {
				if (Modifier.isStatic(method.getModifiers())) {
					if (logger.isInfoEnabled()) {
						logger.info("Autowired annotation is not supported on static methods: " + method);
					}
					return;
				}
				if (method.getParameterCount() == 0) {
					if (logger.isInfoEnabled()) {
						logger.info("Autowired annotation should only be used on methods with parameters: " +
								method);
					}
				}
				boolean required = determineRequiredStatus(ann);
				PropertyDescriptor pd = BeanUtils.findPropertyForMethod(bridgedMethod, clazz);
				currElements.add(new AutowiredMethodElement(method, required, pd));
			}
		});

		elements.addAll(0, currElements);
		targetClass = targetClass.getSuperclass(); // 获取父类
	}
	while (targetClass != null && targetClass != Object.class);

	return InjectionMetadata.forElements(elements, clazz);
}
```

### findAutowiredAnnotation




## Part 2: 渐进式实现篇 (Progressive Implementation)

### 构建元数据缓存


### 执行注入
