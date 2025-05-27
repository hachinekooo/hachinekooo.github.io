<template><div><p>@Component 使用在类上用于实例化 Bean
@Controller 使用在 Web 层类上用于实例化 Bean
@Service 使用在 Service 层类上用于实例化 Bean
@Repository 使用在Dao层类上用于实例化Bean</p>
<p><strong>@Bean</strong> 描述在方法上，把方法的返回值交给容器管理
<strong>@Autowired</strong> 按 byType 自动注入.如果注入的类型有多个实现类，则需要注入具体实现类的名称。<br>
<strong>@Qualifier(&quot;&quot;)</strong> 配合@Autowired 使用名称进行注入。
<strong>@Resource</strong> 按 byName 自动注入获取对应的 bean 对象 ,相当于使用了 Autowired+Qualifier
<strong>@Value</strong> 注入简单类型属性。<br>
<strong>@Scope(value=&quot;&quot;)</strong> 配置 bean 的使用范围，默认生成的类是单例的。
@PostConstruct 使用在方法上标注该方法是该 bean 的初始化方法。
@PreDestroy 使用在方法上标注该方法是 Bean 的销毁方法
@Transactional 在需要进行事务控制的类或是方法上开启事务</p>
<p>@EnableTransactionManagement 配置事务的注解驱动
@MapperScan 扫描特定包下的 mapper
@Import 用于导入其他配置类
@Configuraton 指定当前类是一个配置类
@ComponmentScan 指定 Spring 在初始化容器时要扫描的包。这样配置了注解的那些类的注解才会生效。
@PropertySource 用于加载.properties 文件中的配置。</p>
<h3 id="aop-切面注解" tabindex="-1"><a class="header-anchor" href="#aop-切面注解"><span>AOP 切面注解</span></a></h3>
<p><strong>@Pointcut(&quot;切点表达式&quot;)</strong> 设置切入点</p>
<p><strong>@before(&quot;pointCut()&quot;)</strong> 在目标方法前执行<br>
<strong>@After(&quot;pointCut()&quot;)</strong> 在目标方法后执行，不管有没有异常<br>
<strong>@AfterReturning</strong> 在目标方法正常返回值后执行<br>
<strong>@AfterThrowing</strong> 在目标方法出现异常后执行<br>
上述的4大通知，都不能控制目标方法是否执行，一般只会做程序的监控。<br>
可以通过调用JoinPoint对象获取被切入方法 <em>签名</em>(getSignature())。
<strong>@Around(&quot;pointCut()&quot;)</strong> 在目标方法执行前后都要执行，可以控制目标方法在哪执行。<br>
可以通过调用ProceedingJoinPoint对象的proceed方法来控制需要切入的方法的行动轨迹。</p>
</div></template>


