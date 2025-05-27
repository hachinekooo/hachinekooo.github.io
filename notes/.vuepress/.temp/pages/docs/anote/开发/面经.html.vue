<template><div><h1 id="spring" tabindex="-1"><a class="header-anchor" href="#spring"><span>Spring</span></a></h1>
<h2 id="说说循环依赖" tabindex="-1"><a class="header-anchor" href="#说说循环依赖"><span>说说循环依赖</span></a></h2>
<ul>
<li>就是两个或两个以上的 bean 互相持有对方，最终形成闭环。比如 A 依赖于 B，B 依赖于 A。</li>
<li>只有单例的 Bean 才存在循环依赖的情况，原型(Prototype)情况下，Spring 会直接抛出异常。</li>
<li>Spring 框架依据三级缓存已经解决了大部分的循环依赖（利用三层缓存机制）
<ol>
<li>一级缓存：<code v-pre>Map&lt;String,Object&gt; singletonObjects</code>，单例池，⽤于保存实例化、属性注⼊、初始化完成的 bean 实例</li>
<li>二级缓存：<code v-pre>Map&lt;String,Object&gt; earlySingletonObjects</code>，早期曝光对象，⽤于保存实例化的 bean 实例</li>
<li>三级缓存：<code v-pre>Map&lt;String,ObjectFactory\&lt;?&gt;&gt;singletonFactories</code>，早期曝光对象⼯⼚，⽤于保存 bean 创建⼯⼚，以便于后⾯有机会创建代理对象。</li>
</ol>
</li>
</ul>
<h3 id="具体是咋解决的" tabindex="-1"><a class="header-anchor" href="#具体是咋解决的"><span>具体是咋解决的</span></a></h3>
<ol>
<li>创建 A 实例，同时把创建 A 对象的⼯⼚放⼊三级缓存，表⽰ A 开始实例化了，虽然我这个对象还不完整，但是先曝光出来让⼤家知道</li>
<li>A 注⼊属性时，发现依赖 B，此时 B 还没有被创建出来，所以去实例化 B，B 实例化完成，也会创建 ObjectFactory 对象存入三级缓存 singletonFactories</li>
<li>同样，B 注⼊属性时发现依赖 A，它就会从缓存⾥找 A 对象。依次从⼀级到三级缓存查询 A，最后从三级缓存通过对象⼯⼚拿到 A，发现 A 虽然不太完善，但是存在，把 A 放⼊⼆级缓存，同时删除三级缓存中的 A，此时，B 已经实例化并且初始化完成，把 B 放⼊⼀级缓存。</li>
<li>接着 A 继续属性赋值，顺利从⼀级缓存拿到实例化且初始化完成的 B 对象，A 对象创建也完成，删除⼆级缓存中的 A，同时把 A 放⼊⼀级缓存</li>
<li>最后，⼀级缓存中保存着实例化、初始化都完成的 A、B 对象</li>
</ol>
<p>使用对象工厂获取对象的原因：如果 A 或者 B 对象被增强过，就可以通过工厂获取到增强后到对象，如果不是就是获取到普通对象。</p>
<p>实例化和属性赋值是分开的，所以⾥⾯有操作的空间。如果都是构造器注⼊的化，那么都得在实例化这⼀步完成注⼊，所以⾃然是⽆法⽀持了。</p>
<h2 id="为什么要三级缓存-二级不行吗" tabindex="-1"><a class="header-anchor" href="#为什么要三级缓存-二级不行吗"><span>为什么要三级缓存，⼆级不⾏吗</span></a></h2>
<p>不⾏，主要是为了⽣成代理对象。如果是没有代理的情况下，使⽤⼆级缓存解决循环依赖也是 OK 的。但是如果存在代理，三级没有问题，⼆级就不⾏了。</p>
<p>因为三级缓存中放的是⽣成具体对象的匿名内部类，获取 Object 的时候，它可以⽣成代理对象，也可以返回普通对象。使⽤三级缓存主要是为了保证不管什么时候使⽤的都是⼀个对象。</p>
<p>假设只有⼆级缓存的情况，那么可能出现 Bean 覆盖的情况</p>
<h3 id="构造方法注入出现了循环依赖怎么解决" tabindex="-1"><a class="header-anchor" href="#构造方法注入出现了循环依赖怎么解决"><span>构造方法注入出现了循环依赖怎么解决</span></a></h3>
<p>A 依赖于 B，B 依赖于 A，注入的方式是构造方法注入</p>
<p>原因：由于 bean 的生命周期中构造函数是第一个执行的，Spring 框架并不能解决构造方法的的依赖注入</p>
<p>解决方案：使用@Lazy 进行懒加载，什么时候需要对象再进行 bean 对象的创建</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Lazy</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> B</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> b){</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">	System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"A的构造方法执行了..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">b</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="常见的注解" tabindex="-1"><a class="header-anchor" href="#常见的注解"><span>常见的注解</span></a></h1>
<h2 id="spring-中" tabindex="-1"><a class="header-anchor" href="#spring-中"><span>Spring 中</span></a></h2>
<blockquote>
<p>大部分都是和 Bean 相关的注解</p>
</blockquote>
<table>
<thead>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td>注解</td>
<td>说明</td>
</tr>
<tr>
<td>用 Spring 得有配置类</td>
<td>@Configuration</td>
<td>指定当前类是一个 Spring 配置类，当创建容器时 会从该类上加载注解</td>
</tr>
<tr>
<td>有可能使用其他配置类吧</td>
<td>@Import</td>
<td>使用@Import导入的类会被Spring加载到IOC容器 中</td>
</tr>
<tr>
<td>扫描位置？</td>
<td>@ComponentScan</td>
<td>用于指定 Spring 在初始化容器时要扫描的包</td>
</tr>
<tr>
<td>注册Bean</td>
<td>@Component、@Controller、@Service、 @Repository</td>
<td>使用在类上用于实例化Bean</td>
</tr>
<tr>
<td></td>
<td>@Bean</td>
<td>使用在方法上，标注将该方法的返回值存储到 Spring容器中</td>
</tr>
<tr>
<td>Bean 的作用范围？</td>
<td>@Scope</td>
<td>标注Bean的作用范围</td>
</tr>
<tr>
<td>有了 Bean 之后你得用吧？</td>
<td>@Autowired</td>
<td>使用在字段上用于根据类型依赖注入</td>
</tr>
<tr>
<td></td>
<td>@Qualifier</td>
<td>结合@Autowired一起使用用于根据名称进行依赖 注入</td>
</tr>
<tr>
<td></td>
<td>@Aspect、@Before、@After、 @Around、@Pointcut</td>
<td>用于切面编程（AOP）</td>
</tr>
</tbody>
</table>
<h2 id="springmvc" tabindex="-1"><a class="header-anchor" href="#springmvc"><span>SpringMVC</span></a></h2>
<blockquote>
<p>和 Web 层开发的相关注解</p>
</blockquote>
<table>
<thead>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td>注解</td>
<td>说明</td>
</tr>
<tr>
<td>地址？</td>
<td>@RequestMapping</td>
<td>用于映射请求路径，可以定义在类上和方法上。</td>
</tr>
<tr>
<td>参数？</td>
<td>@PathVariable</td>
<td>从请求路径下中获取请求参数(/user/{id})，传递给方法的形式参数</td>
</tr>
<tr>
<td></td>
<td>@RequestParam</td>
<td>指定请求参数的名称</td>
</tr>
<tr>
<td></td>
<td>@RequestHeader</td>
<td>获取指定的请求头数据</td>
</tr>
<tr>
<td></td>
<td>@RequestBody</td>
<td>注解实现接收http请求的json数据，将json转换为java对象</td>
</tr>
<tr>
<td>响应？</td>
<td>@ResponseBody</td>
<td>注解实现将controller方法返回对象转化为json对象响应给客户端</td>
</tr>
<tr>
<td>综合注解？</td>
<td>@RestController</td>
<td>@Controller + @ResponseBody</td>
</tr>
</tbody>
</table>
<h2 id="springboot" tabindex="-1"><a class="header-anchor" href="#springboot"><span>SpringBoot</span></a></h2>
<blockquote>
<p>主要是自动配置相关</p>
</blockquote>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>注解</td>
<td>说明</td>
</tr>
<tr>
<td>@SpringBootConfiguration</td>
<td>组合了- @Configuration 注解，实现配置类的功能；</td>
</tr>
<tr>
<td>@EnableAutoConfiguration</td>
<td>打开自动配置的功能，也可以关闭某个自动配置的选项</td>
</tr>
<tr>
<td>@ComponentScan</td>
<td>Spring 组件扫描</td>
</tr>
</tbody>
</table>
<h1 id="抽象类-abstract-class-和接又-interface-有什么区别" tabindex="-1"><a class="header-anchor" href="#抽象类-abstract-class-和接又-interface-有什么区别"><span>抽象类(abstract class)和接⼜(interface)有什么区别</span></a></h1>
<p>从设计层面来说，抽象是对类的抽象，是一种模板设计，而接口是对行为的抽象，是一种行为规范。</p>
<p>从实现上来说，一个类可以实现多个接口，但只能实现一个抽象类。接口自己本身可以通过 extends 关键字扩展多个接口。</p>
<p>从修饰符来说，接口方法默认修饰符是 public，抽象方法可以有 public、protected 和 default 这些修符（抽象方法就是为了被重写所以不能使用 private 关键字修饰！）。</p>
<p>接口的方法默认是 public，所有方法在接口中不能有实现（Java 8 开始接口方法可以有默认实现），而抽象类可以有非抽象的方法。</p>
<h1 id="静态方法和实例方法有何不同" tabindex="-1"><a class="header-anchor" href="#静态方法和实例方法有何不同"><span>静态⽅法和实例⽅法有何不同</span></a></h1>
<ul>
<li>
<p>静态方法不依赖于类的实例，可以直接使用类.方法名或者对象名.方法名进行调用</p>
</li>
<li>
<p>静态⽅法⾥不能访问类的⾮静态成员变量和⽅法。</p>
</li>
<li>
<p>依存于类的实例，需要使⽤&quot;对象名.⽅法名&quot;的⽅式调⽤；可以访问类的所有成员变量和方法。</p>
</li>
</ul>
</div></template>


