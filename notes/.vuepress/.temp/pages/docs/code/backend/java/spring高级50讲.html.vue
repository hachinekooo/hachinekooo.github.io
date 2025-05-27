<template><div><h2 id="容器与-bean" tabindex="-1"><a class="header-anchor" href="#容器与-bean"><span>容器与 bean</span></a></h2>
<h3 id="_1-容器接口" tabindex="-1"><a class="header-anchor" href="#_1-容器接口"><span>1) 容器接口</span></a></h3>
<ul>
<li>
<p>BeanFactory 接口，典型功能有：</p>
<ul>
<li>getBean</li>
</ul>
</li>
<li>
<p>ApplicationContext 接口，是 BeanFactory 的子接口。它扩展了 BeanFactory 接口的功能，如：</p>
<ul>
<li>国际化</li>
<li>通配符方式获取一组 Resource 资源</li>
<li>整合 Environment 环境（能通过它获取各种来源的配置信息）</li>
<li>事件发布与监听，实现组件之间的解耦</li>
</ul>
</li>
</ul>
<p>可以看到，我们课上讲的，都是 BeanFactory 提供的基本功能，ApplicationContext 中的扩展功能都没有用到。</p>
<h4 id="演示1-beanfactory-与-applicationcontext-的区别" tabindex="-1"><a class="header-anchor" href="#演示1-beanfactory-与-applicationcontext-的区别"><span>演示1 - BeanFactory 与 ApplicationContext 的区别</span></a></h4>
<h5 id="代码参考" tabindex="-1"><a class="header-anchor" href="#代码参考"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a01</strong> 包</p>
<h4 id="收获💡" tabindex="-1"><a class="header-anchor" href="#收获💡"><span>收获💡</span></a></h4>
<p>通过这个示例结合 debug 查看 ApplicationContext 对象的内部结构，学到：</p>
<ol>
<li>
<p>到底什么是 BeanFactory</p>
<ul>
<li>它是 ApplicationContext 的父接口</li>
<li>它才是 Spring 的核心容器, 主要的 ApplicationContext 实现都【组合】了它的功能，【组合】是指 ApplicationContext 的一个重要成员变量就是 BeanFactory</li>
</ul>
</li>
<li>
<p>BeanFactory 能干点啥</p>
<ul>
<li>表面上只有 getBean</li>
<li>实际上控制反转、基本的依赖注入、直至 Bean 的生命周期的各种功能，都由它的实现类提供</li>
<li>例子中通过反射查看了它的成员变量 singletonObjects，内部包含了所有的单例 bean</li>
</ul>
</li>
<li>
<p>ApplicationContext 比 BeanFactory 多点啥</p>
<ul>
<li>ApplicationContext 组合并扩展了 BeanFactory 的功能</li>
<li>国际化、通配符方式获取一组 Resource 资源、整合 Environment 环境、事件发布与监听</li>
<li>新学一种代码之间解耦途径，事件解耦</li>
</ul>
</li>
</ol>
<p>建议练习：完成用户注册与发送短信之间的解耦，用事件方式、和 AOP 方式分别实现</p>
<blockquote>
<p><em><strong>注意</strong></em></p>
<ul>
<li>如果 jdk &gt; 8, 运行时请添加 --add-opens java.base/java.lang=ALL-UNNAMED，这是因为这些版本的 jdk 默认不允许跨 module 反射</li>
<li>事件发布还可以异步，这个视频中没有展示，请自行查阅 @EnableAsync，@Async 的用法</li>
</ul>
</blockquote>
<h4 id="演示2-国际化" tabindex="-1"><a class="header-anchor" href="#演示2-国际化"><span>演示2 - 国际化</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> TestMessageSource</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        GenericApplicationContext</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> GenericApplicationContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">registerBean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"messageSource"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">MessageSource</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, () </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            ResourceBundleMessageSource</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ms</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ResourceBundleMessageSource</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            ms</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setDefaultEncoding</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"utf-8"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            ms</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setBasename</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"messages"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ms;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">refresh</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMessage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"hi"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Locale</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">ENGLISH</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">));</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMessage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"hi"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Locale</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">CHINESE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">));</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMessage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"hi"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Locale</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">JAPANESE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">));</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>国际化文件均在 src/resources 目录下</p>
<p>messages.properties（空）</p>
<p>messages_en.properties</p>
<div class="language-properties line-numbers-mode" data-highlighter="shiki" data-ext="properties" data-title="properties" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">hi</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">Hello</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>messages_ja.properties</p>
<div class="language-properties line-numbers-mode" data-highlighter="shiki" data-ext="properties" data-title="properties" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">hi</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">こんにちは</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>messages_zh.properties</p>
<div class="language-properties line-numbers-mode" data-highlighter="shiki" data-ext="properties" data-title="properties" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">hi</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">你好</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><blockquote>
<p><em><strong>注意</strong></em></p>
<ul>
<li>ApplicationContext 中 MessageSource bean 的名字固定为 messageSource</li>
<li>使用 SpringBoot 时，国际化文件名固定为 messages</li>
<li>空的 messages.properties 也必须存在</li>
</ul>
</blockquote>
<h3 id="_2-容器实现" tabindex="-1"><a class="header-anchor" href="#_2-容器实现"><span>2) 容器实现</span></a></h3>
<p>Spring 的发展历史较为悠久，因此很多资料还在讲解它较旧的实现，这里出于怀旧的原因，把它们都列出来，供大家参考</p>
<ul>
<li>DefaultListableBeanFactory，是 BeanFactory 最重要的实现，像<strong>控制反转</strong>和<strong>依赖注入</strong>功能，都是它来实现</li>
<li>ClassPathXmlApplicationContext，从类路径查找 XML 配置文件，创建容器（旧）</li>
<li>FileSystemXmlApplicationContext，从磁盘路径查找 XML 配置文件，创建容器（旧）</li>
<li>XmlWebApplicationContext，传统 SSM 整合时，基于 XML 配置文件的容器（旧）</li>
<li>AnnotationConfigWebApplicationContext，传统 SSM 整合时，基于 java 配置类的容器（旧）</li>
<li>AnnotationConfigApplicationContext，Spring boot 中非 web 环境容器（新）</li>
<li>AnnotationConfigServletWebServerApplicationContext，Spring boot 中 servlet web 环境容器（新）</li>
<li>AnnotationConfigReactiveWebServerApplicationContext，Spring boot 中 reactive web 环境容器（新）</li>
</ul>
<p>另外要注意的是，后面这些带有 ApplicationContext 的类都是 ApplicationContext 接口的实现，但它们是<strong>组合</strong>了 DefaultListableBeanFactory 的功能，并非继承而来</p>
<h4 id="演示1-defaultlistablebeanfactory" tabindex="-1"><a class="header-anchor" href="#演示1-defaultlistablebeanfactory"><span>演示1 - DefaultListableBeanFactory</span></a></h4>
<h5 id="代码参考-1" tabindex="-1"><a class="header-anchor" href="#代码参考-1"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a02.TestBeanFactory</strong></p>
<h4 id="收获💡-1" tabindex="-1"><a class="header-anchor" href="#收获💡-1"><span>收获💡</span></a></h4>
<ul>
<li>beanFactory 可以通过 registerBeanDefinition 注册一个 bean definition 对象
<ul>
<li>我们平时使用的配置类、xml、组件扫描等方式都是生成 bean definition 对象注册到 beanFactory 当中</li>
<li>bean definition 描述了这个 bean 的创建蓝图：scope 是什么、用构造还是工厂创建、初始化销毁方法是什么，等等</li>
</ul>
</li>
<li>beanFactory 需要手动调用 beanFactory 后处理器对它做增强
<ul>
<li>例如通过解析 @Bean、@ComponentScan 等注解，来补充一些 bean definition</li>
</ul>
</li>
<li>beanFactory 需要手动添加 bean 后处理器，以便对后续 bean 的创建过程提供增强
<ul>
<li>例如 @Autowired，@Resource 等注解的解析都是 bean 后处理器完成的</li>
<li>bean 后处理的添加顺序会对解析结果有影响，见视频中同时加 @Autowired，@Resource 的例子</li>
</ul>
</li>
<li>beanFactory 需要手动调用方法来初始化单例</li>
<li>beanFactory 需要额外设置才能解析 ${} 与 #{}</li>
</ul>
<h4 id="演示2-常见-applicationcontext-实现" tabindex="-1"><a class="header-anchor" href="#演示2-常见-applicationcontext-实现"><span>演示2 - 常见 ApplicationContext 实现</span></a></h4>
<h5 id="代码参考-2" tabindex="-1"><a class="header-anchor" href="#代码参考-2"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a02.A02</strong></p>
<h4 id="收获💡-2" tabindex="-1"><a class="header-anchor" href="#收获💡-2"><span>收获💡</span></a></h4>
<ol>
<li>常见的 ApplicationContext 容器实现</li>
<li>内嵌容器、DispatcherServlet 的创建方法、作用</li>
</ol>
<h3 id="_3-bean-的生命周期" tabindex="-1"><a class="header-anchor" href="#_3-bean-的生命周期"><span>3) Bean 的生命周期</span></a></h3>
<p>一个受 Spring 管理的 bean，生命周期主要阶段有</p>
<ol>
<li>创建：根据 bean 的构造方法或者工厂方法来创建 bean 实例对象</li>
<li>依赖注入：根据 @Autowired，@Value 或其它一些手段，为 bean 的成员变量填充值、建立关系</li>
<li>初始化：回调各种 Aware 接口，调用对象的各种初始化方法</li>
<li>销毁：在容器关闭时，会销毁所有单例对象（即调用它们的销毁方法）
<ul>
<li>prototype 对象也能够销毁，不过需要容器这边主动调用</li>
</ul>
</li>
</ol>
<p>一些资料会提到，生命周期中还有一类 bean 后处理器：BeanPostProcessor，会在 bean 的初始化的前后，提供一些扩展逻辑。但这种说法是不完整的，见下面的演示1</p>
<h4 id="演示1-bean-生命周期" tabindex="-1"><a class="header-anchor" href="#演示1-bean-生命周期"><span>演示1 - bean 生命周期</span></a></h4>
<h5 id="代码参考-3" tabindex="-1"><a class="header-anchor" href="#代码参考-3"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a03</strong> 包</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">graph LR</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">创建 --> 依赖注入</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">依赖注入 --> 初始化</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">初始化 --> 可用</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">可用 --> 销毁</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建前后的增强</p>
<ul>
<li>postProcessBeforeInstantiation
<ul>
<li>这里返回的对象若不为 null 会替换掉原本的 bean，并且仅会走 postProcessAfterInitialization 流程</li>
</ul>
</li>
<li>postProcessAfterInstantiation
<ul>
<li>这里如果返回 false 会跳过依赖注入阶段</li>
</ul>
</li>
</ul>
<p>依赖注入前的增强</p>
<ul>
<li>postProcessProperties
<ul>
<li>如 @Autowired、@Value、@Resource</li>
</ul>
</li>
</ul>
<p>初始化前后的增强</p>
<ul>
<li>postProcessBeforeInitialization
<ul>
<li>这里返回的对象会替换掉原本的 bean</li>
<li>如 @PostConstruct、@ConfigurationProperties</li>
</ul>
</li>
<li>postProcessAfterInitialization
<ul>
<li>这里返回的对象会替换掉原本的 bean</li>
<li>如代理增强</li>
</ul>
</li>
</ul>
<p>销毁之前的增强</p>
<ul>
<li>postProcessBeforeDestruction
<ul>
<li>如 @PreDestroy</li>
</ul>
</li>
</ul>
<h4 id="收获💡-3" tabindex="-1"><a class="header-anchor" href="#收获💡-3"><span>收获💡</span></a></h4>
<ol>
<li>Spring bean 生命周期各个阶段</li>
<li>模板设计模式, 指大流程已经固定好了, 通过接口回调（bean 后处理器）在一些关键点前后提供扩展</li>
</ol>
<h4 id="演示2-模板方法设计模式" tabindex="-1"><a class="header-anchor" href="#演示2-模板方法设计模式"><span>演示2 - 模板方法设计模式</span></a></h4>
<h5 id="关键代码" tabindex="-1"><a class="header-anchor" href="#关键代码"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> TestMethodTemplate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        MyBeanFactory</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> beanFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> MyBeanFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        beanFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addBeanPostProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(bean </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"解析 @Autowired"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">));</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        beanFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addBeanPostProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(bean </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"解析 @Resource"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">));</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        beanFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 模板方法  Template Method Pattern</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> MyBeanFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getBean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bean</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Object</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"构造 "</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> bean);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"依赖注入 "</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> bean); </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">// @Autowired, @Resource</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">BeanPostProcessor</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> processor</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> :</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> processors) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                processor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">inject</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(bean);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"初始化 "</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> bean);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> bean;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> List</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">BeanPostProcessor</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> processors </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ArrayList</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;></span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> addBeanPostProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">BeanPostProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> processor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            processors</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(processor);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BeanPostProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> inject</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Object</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> bean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // 对依赖注入阶段的扩展</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="演示3-bean-后处理器排序" tabindex="-1"><a class="header-anchor" href="#演示3-bean-后处理器排序"><span>演示3 - bean 后处理器排序</span></a></h4>
<h5 id="代码参考-4" tabindex="-1"><a class="header-anchor" href="#代码参考-4"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a03.TestProcessOrder</strong></p>
<h4 id="收获💡-4" tabindex="-1"><a class="header-anchor" href="#收获💡-4"><span>收获💡</span></a></h4>
<ol>
<li>实现了 PriorityOrdered 接口的优先级最高</li>
<li>实现了 Ordered 接口与加了 @Order 注解的平级, 按数字升序</li>
<li>其它的排在最后</li>
</ol>
<h3 id="_4-bean-后处理器" tabindex="-1"><a class="header-anchor" href="#_4-bean-后处理器"><span>4) Bean 后处理器</span></a></h3>
<h4 id="演示1-后处理器作用" tabindex="-1"><a class="header-anchor" href="#演示1-后处理器作用"><span>演示1 - 后处理器作用</span></a></h4>
<h5 id="代码参考-5" tabindex="-1"><a class="header-anchor" href="#代码参考-5"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a04</strong> 包</p>
<h4 id="收获💡-5" tabindex="-1"><a class="header-anchor" href="#收获💡-5"><span>收获💡</span></a></h4>
<ol>
<li>@Autowired 等注解的解析属于 bean 生命周期阶段（依赖注入, 初始化）的扩展功能，这些扩展功能由 bean 后处理器来完成</li>
<li>每个后处理器各自增强什么功能
<ul>
<li>AutowiredAnnotationBeanPostProcessor 解析 @Autowired 与 @Value</li>
<li>CommonAnnotationBeanPostProcessor 解析 @Resource、@PostConstruct、@PreDestroy</li>
<li>ConfigurationPropertiesBindingPostProcessor 解析 @ConfigurationProperties</li>
</ul>
</li>
<li>另外 ContextAnnotationAutowireCandidateResolver 负责获取 @Value 的值，解析 @Qualifier、泛型、@Lazy 等</li>
</ol>
<h4 id="演示2-autowired-bean-后处理器运行分析" tabindex="-1"><a class="header-anchor" href="#演示2-autowired-bean-后处理器运行分析"><span>演示2 - @Autowired bean 后处理器运行分析</span></a></h4>
<h5 id="代码参考-6" tabindex="-1"><a class="header-anchor" href="#代码参考-6"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a04.DigInAutowired</strong></p>
<h4 id="收获💡-6" tabindex="-1"><a class="header-anchor" href="#收获💡-6"><span>收获💡</span></a></h4>
<ol>
<li>AutowiredAnnotationBeanPostProcessor.findAutowiringMetadata 用来获取某个 bean 上加了 @Value @Autowired 的成员变量，方法参数的信息，表示为 InjectionMetadata</li>
<li>InjectionMetadata 可以完成依赖注入</li>
<li>InjectionMetadata 内部根据成员变量，方法参数封装为 DependencyDescriptor 类型</li>
<li>有了 DependencyDescriptor，就可以利用 beanFactory.doResolveDependency 方法进行基于类型的查找</li>
</ol>
<h3 id="_5-beanfactory-后处理器" tabindex="-1"><a class="header-anchor" href="#_5-beanfactory-后处理器"><span>5) BeanFactory 后处理器</span></a></h3>
<h4 id="演示1-beanfactory-后处理器的作用" tabindex="-1"><a class="header-anchor" href="#演示1-beanfactory-后处理器的作用"><span>演示1 - BeanFactory 后处理器的作用</span></a></h4>
<h5 id="代码参考-7" tabindex="-1"><a class="header-anchor" href="#代码参考-7"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a05</strong> 包</p>
<ul>
<li>ConfigurationClassPostProcessor 可以解析
<ul>
<li>@ComponentScan</li>
<li>@Bean</li>
<li>@Import</li>
<li>@ImportResource</li>
</ul>
</li>
<li>MapperScannerConfigurer 可以解析
<ul>
<li>Mapper 接口</li>
</ul>
</li>
</ul>
<h4 id="收获💡-7" tabindex="-1"><a class="header-anchor" href="#收获💡-7"><span>收获💡</span></a></h4>
<ol>
<li>@ComponentScan, @Bean, @Mapper 等注解的解析属于核心容器（即 BeanFactory）的扩展功能</li>
<li>这些扩展功能由不同的 BeanFactory 后处理器来完成，其实主要就是补充了一些 bean 定义</li>
</ol>
<h4 id="演示2-模拟解析-componentscan" tabindex="-1"><a class="header-anchor" href="#演示2-模拟解析-componentscan"><span>演示2 - 模拟解析 @ComponentScan</span></a></h4>
<h5 id="代码参考-8" tabindex="-1"><a class="header-anchor" href="#代码参考-8"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a05.ComponentScanPostProcessor</strong></p>
<h4 id="收获💡-8" tabindex="-1"><a class="header-anchor" href="#收获💡-8"><span>收获💡</span></a></h4>
<ol>
<li>Spring 操作元数据的工具类 CachingMetadataReaderFactory</li>
<li>通过注解元数据（AnnotationMetadata）获取直接或间接标注的注解信息</li>
<li>通过类元数据（ClassMetadata）获取类名，AnnotationBeanNameGenerator 生成 bean 名</li>
<li>解析元数据是基于 ASM 技术</li>
</ol>
<h4 id="演示3-模拟解析-bean" tabindex="-1"><a class="header-anchor" href="#演示3-模拟解析-bean"><span>演示3 - 模拟解析 @Bean</span></a></h4>
<h5 id="代码参考-9" tabindex="-1"><a class="header-anchor" href="#代码参考-9"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a05.AtBeanPostProcessor</strong></p>
<h4 id="收获💡-9" tabindex="-1"><a class="header-anchor" href="#收获💡-9"><span>收获💡</span></a></h4>
<ol>
<li>进一步熟悉注解元数据（AnnotationMetadata）获取方法上注解信息</li>
</ol>
<h4 id="演示4-模拟解析-mapper-接口" tabindex="-1"><a class="header-anchor" href="#演示4-模拟解析-mapper-接口"><span>演示4 - 模拟解析 Mapper 接口</span></a></h4>
<h5 id="代码参考-10" tabindex="-1"><a class="header-anchor" href="#代码参考-10"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a05.MapperPostProcessor</strong></p>
<h4 id="收获💡-10" tabindex="-1"><a class="header-anchor" href="#收获💡-10"><span>收获💡</span></a></h4>
<ol>
<li>Mapper 接口被 Spring 管理的本质：实际是被作为 MapperFactoryBean 注册到容器中</li>
<li>Spring 的诡异做法，根据接口生成的 BeanDefinition 仅为根据接口名生成 bean 名</li>
</ol>
<h3 id="_6-aware-接口" tabindex="-1"><a class="header-anchor" href="#_6-aware-接口"><span>6) Aware 接口</span></a></h3>
<h4 id="演示-aware-接口及-initializingbean-接口" tabindex="-1"><a class="header-anchor" href="#演示-aware-接口及-initializingbean-接口"><span>演示 - Aware 接口及 InitializingBean 接口</span></a></h4>
<h5 id="代码参考-11" tabindex="-1"><a class="header-anchor" href="#代码参考-11"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a06</strong> 包</p>
<h4 id="收获💡-11" tabindex="-1"><a class="header-anchor" href="#收获💡-11"><span>收获💡</span></a></h4>
<ol>
<li>Aware 接口提供了一种【内置】 的注入手段，例如
<ul>
<li>BeanNameAware 注入 bean 的名字</li>
<li>BeanFactoryAware 注入 BeanFactory 容器</li>
<li>ApplicationContextAware 注入 ApplicationContext 容器</li>
<li>EmbeddedValueResolverAware 注入 ${} 解析器</li>
</ul>
</li>
<li>InitializingBean 接口提供了一种【内置】的初始化手段</li>
<li>对比
<ul>
<li>内置的注入和初始化不受扩展功能的影响，总会被执行</li>
<li>而扩展功能受某些情况影响可能会失效</li>
<li>因此 Spring 框架内部的类常用内置注入和初始化</li>
</ul>
</li>
</ol>
<h4 id="配置类-autowired-失效分析" tabindex="-1"><a class="header-anchor" href="#配置类-autowired-失效分析"><span>配置类 @Autowired 失效分析</span></a></h4>
<p>Java 配置类不包含 BeanFactoryPostProcessor 的情况</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sequenceDiagram </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ac as ApplicationContext</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant bfpp as BeanFactoryPostProcessor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant bpp as BeanPostProcessor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant config as Java配置类</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ac ->> bfpp : 1. 执行 BeanFactoryPostProcessor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ac ->> bpp : 2. 注册 BeanPostProcessor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ac ->> +config : 3. 创建和初始化</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">bpp ->> config : 3.1 依赖注入扩展(如 @Value 和 @Autowired)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">bpp ->> config : 3.2 初始化扩展(如 @PostConstruct)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ac ->> config : 3.3 执行 Aware 及 InitializingBean</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config -->> -ac : 3.4 创建成功</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Java 配置类包含 BeanFactoryPostProcessor 的情况，因此要创建其中的 BeanFactoryPostProcessor 必须提前创建 Java 配置类，而此时的 BeanPostProcessor 还未准备好，导致 @Autowired 等注解失效</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sequenceDiagram </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ac as ApplicationContext</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant bfpp as BeanFactoryPostProcessor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant bpp as BeanPostProcessor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant config as Java配置类</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ac ->> +config : 3. 创建和初始化</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ac ->> config : 3.1 执行 Aware 及 InitializingBean</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config -->> -ac : 3.2 创建成功</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ac ->> bfpp : 1. 执行 BeanFactoryPostProcessor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ac ->> bpp : 2. 注册 BeanPostProcessor</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应代码</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Configuration</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> MyConfig1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Logger</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> log </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> LoggerFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getLogger</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">MyConfig1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Autowired</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> setApplicationContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ApplicationContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> applicationContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">debug</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"注入 ApplicationContext"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">PostConstruct</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> init</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">debug</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"初始化"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> //  ⬅️ 注释或添加 beanFactory 后处理器对应上方两种情况</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BeanFactoryPostProcessor</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> processor1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> beanFactory </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">debug</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"执行 processor1"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        };</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em><strong>注意</strong></em></p>
<p>解决方法：</p>
<ul>
<li>用内置依赖注入和初始化取代扩展依赖注入和初始化</li>
<li>用静态工厂方法代替实例工厂方法，避免工厂对象提前被创建</li>
</ul>
</blockquote>
<h3 id="_7-初始化与销毁" tabindex="-1"><a class="header-anchor" href="#_7-初始化与销毁"><span>7) 初始化与销毁</span></a></h3>
<h4 id="演示-初始化销毁顺序" tabindex="-1"><a class="header-anchor" href="#演示-初始化销毁顺序"><span>演示 - 初始化销毁顺序</span></a></h4>
<h5 id="代码参考-12" tabindex="-1"><a class="header-anchor" href="#代码参考-12"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a07</strong> 包</p>
<h4 id="收获💡-12" tabindex="-1"><a class="header-anchor" href="#收获💡-12"><span>收获💡</span></a></h4>
<p>Spring 提供了多种初始化手段，除了课堂上讲的 @PostConstruct，@Bean(initMethod) 之外，还可以实现 InitializingBean 接口来进行初始化，如果同一个 bean 用了以上手段声明了 3 个初始化方法，那么它们的执行顺序是</p>
<ol>
<li>@PostConstruct 标注的初始化方法</li>
<li>InitializingBean 接口的初始化方法</li>
<li>@Bean(initMethod) 指定的初始化方法</li>
</ol>
<p>与初始化类似，Spring 也提供了多种销毁手段，执行顺序为</p>
<ol>
<li>@PreDestroy 标注的销毁方法</li>
<li>DisposableBean 接口的销毁方法</li>
<li>@Bean(destroyMethod) 指定的销毁方法</li>
</ol>
<h3 id="_8-scope" tabindex="-1"><a class="header-anchor" href="#_8-scope"><span>8) Scope</span></a></h3>
<p>在当前版本的 Spring 和 Spring Boot 程序中，支持五种 Scope</p>
<ul>
<li>singleton，容器启动时创建（未设置延迟），容器关闭时销毁</li>
<li>prototype，每次使用时创建，不会自动销毁，需要调用 DefaultListableBeanFactory.destroyBean(bean) 销毁</li>
<li>request，每次请求用到此 bean 时创建，请求结束时销毁</li>
<li>session，每个会话用到此 bean 时创建，会话结束时销毁</li>
<li>application，web 容器用到此 bean 时创建，容器停止时销毁</li>
</ul>
<p>有些文章提到有 globalSession 这一 Scope，也是陈旧的说法，目前 Spring 中已废弃</p>
<p>但要注意，如果在 singleton 注入其它 scope 都会有问题，解决方法有</p>
<ul>
<li>@Lazy</li>
<li>@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)</li>
<li>ObjectFactory</li>
<li>ApplicationContext.getBean</li>
</ul>
<h4 id="演示1-request-session-application-作用域" tabindex="-1"><a class="header-anchor" href="#演示1-request-session-application-作用域"><span>演示1 - request, session, application 作用域</span></a></h4>
<h5 id="代码参考-13" tabindex="-1"><a class="header-anchor" href="#代码参考-13"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a08</strong> 包</p>
<ul>
<li>打开不同的浏览器, 刷新 http://localhost:8080/test 即可查看效果</li>
<li>如果 jdk &gt; 8, 运行时请添加 --add-opens java.base/java.lang=ALL-UNNAMED</li>
</ul>
<h4 id="收获💡-13" tabindex="-1"><a class="header-anchor" href="#收获💡-13"><span>收获💡</span></a></h4>
<ol>
<li>有几种 scope</li>
<li>在 singleton 中使用其它几种 scope 的方法</li>
<li>其它 scope 的销毁时机
<ul>
<li>可以将通过 server.servlet.session.timeout=30s 观察 session bean 的销毁</li>
<li>ServletContextScope 销毁机制疑似实现有误</li>
</ul>
</li>
</ol>
<h4 id="分析-singleton-注入其它-scope-失效" tabindex="-1"><a class="header-anchor" href="#分析-singleton-注入其它-scope-失效"><span>分析 - singleton 注入其它 scope 失效</span></a></h4>
<p>以单例注入多例为例</p>
<p>有一个单例对象 E</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Component</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> E</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Logger</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> log </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> LoggerFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getLogger</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">E</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> F</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> f</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> E</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">info</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"E()"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Autowired</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> setF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">F</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> f</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">f</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> f;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">info</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"setF(F f) {}"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">f</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> F</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> f;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要注入的对象 F 期望是多例</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Component</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Scope</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"prototype"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> F</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Logger</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> log </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> LoggerFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getLogger</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">F</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> F</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">info</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"F()"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">E</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> e </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">E</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">F</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> f1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">F</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> f2 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f1);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f2);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>com.itheima.demo.cycle.F@6622fc65</span></span>
<span class="line"><span>com.itheima.demo.cycle.F@6622fc65</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>发现它们是同一个对象，而不是期望的多例对象</p>
<p>对于单例对象来讲，依赖注入仅发生了一次，后续再没有用到多例的 F，因此 E 用的始终是第一次依赖注入的 F</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">graph LR</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e1(e 创建)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e2(e set 注入 f)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">f1(f 创建)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e1-->f1-->e2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决</p>
<ul>
<li>仍然使用 @Lazy 生成代理</li>
<li>代理对象虽然还是同一个，但当每次<strong>使用代理对象的任意方法</strong>时，由代理创建新的 f 对象</li>
</ul>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">graph LR</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e1(e 创建)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e2(e set 注入 f代理)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">f1(f 创建)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">f2(f 创建)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">f3(f 创建)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e1-->e2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e2--使用f方法-->f1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e2--使用f方法-->f2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">e2--使用f方法-->f3</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Component</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> E</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Autowired</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Lazy</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> setF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">F</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> f</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">f</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> f;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">info</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"setF(F f) {}"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">f</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getClass</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em><strong>注意</strong></em></p>
<ul>
<li>@Lazy 加在也可以加在成员变量上，但加在 set 方法上的目的是可以观察输出，加在成员变量上就不行了</li>
<li>@Autowired 加在 set 方法的目的类似</li>
</ul>
</blockquote>
<p>输出</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>E: setF(F f) class com.itheima.demo.cycle.F$$EnhancerBySpringCGLIB$$8b54f2bc</span></span>
<span class="line"><span>F: F()</span></span>
<span class="line"><span>com.itheima.demo.cycle.F@3a6f2de3</span></span>
<span class="line"><span>F: F()</span></span>
<span class="line"><span>com.itheima.demo.cycle.F@56303b57</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出日志可以看到调用 setF 方法时，f 对象的类型是代理类型</p>
<h4 id="演示2-4种解决方法" tabindex="-1"><a class="header-anchor" href="#演示2-4种解决方法"><span>演示2 - 4种解决方法</span></a></h4>
<h5 id="代码参考-14" tabindex="-1"><a class="header-anchor" href="#代码参考-14"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a08.sub</strong> 包</p>
<ul>
<li>如果 jdk &gt; 8, 运行时请添加 --add-opens java.base/java.lang=ALL-UNNAMED</li>
</ul>
<h4 id="收获💡-14" tabindex="-1"><a class="header-anchor" href="#收获💡-14"><span>收获💡</span></a></h4>
<ol>
<li>单例注入其它 scope 的四种解决方法
<ul>
<li>@Lazy</li>
<li>@Scope(value = &quot;prototype&quot;, proxyMode = ScopedProxyMode.TARGET_CLASS)</li>
<li>ObjectFactory</li>
<li>ApplicationContext</li>
</ul>
</li>
<li>解决方法虽然不同，但理念上殊途同归: 都是推迟其它 scope bean 的获取</li>
</ol>
<h2 id="aop" tabindex="-1"><a class="header-anchor" href="#aop"><span>AOP</span></a></h2>
<p>AOP 底层实现方式之一是代理，由代理结合通知和目标，提供增强功能</p>
<p>除此以外，aspectj 提供了两种另外的 AOP 底层实现：</p>
<ul>
<li>
<p>第一种是通过 ajc 编译器在<strong>编译</strong> class 类文件时，就把通知的增强功能，织入到目标类的字节码中</p>
</li>
<li>
<p>第二种是通过 agent 在<strong>加载</strong>目标类时，修改目标类的字节码，织入增强功能</p>
</li>
<li>
<p>作为对比，之前学习的代理是<strong>运行</strong>时生成新的字节码</p>
</li>
</ul>
<p>简单比较的话：</p>
<ul>
<li>aspectj 在编译和加载时，修改目标字节码，性能较高</li>
<li>aspectj 因为不用代理，能突破一些技术上的限制，例如对构造、对静态方法、对 final 也能增强</li>
<li>但 aspectj 侵入性较强，且需要学习新的 aspectj 特有语法，因此没有广泛流行</li>
</ul>
<h3 id="_9-aop-实现之-ajc-编译器" tabindex="-1"><a class="header-anchor" href="#_9-aop-实现之-ajc-编译器"><span>9) AOP 实现之 ajc 编译器</span></a></h3>
<p>代码参考项目 <strong>demo6_advanced_aspectj_01</strong></p>
<h4 id="收获💡-15" tabindex="-1"><a class="header-anchor" href="#收获💡-15"><span>收获💡</span></a></h4>
<ol>
<li>编译器也能修改 class 实现增强</li>
<li>编译器增强能突破代理仅能通过方法重写增强的限制：可以对构造方法、静态方法等实现增强</li>
</ol>
<blockquote>
<p><em><strong>注意</strong></em></p>
<ul>
<li>版本选择了 java 8, 因为目前的 aspectj-maven-plugin 1.14.0 最高只支持到 java 16</li>
<li>一定要用 maven 的 compile 来编译, idea 不会调用 ajc 编译器</li>
</ul>
</blockquote>
<h3 id="_10-aop-实现之-agent-类加载" tabindex="-1"><a class="header-anchor" href="#_10-aop-实现之-agent-类加载"><span>10) AOP 实现之 agent 类加载</span></a></h3>
<p>代码参考项目 <strong>demo6_advanced_aspectj_02</strong></p>
<h4 id="收获💡-16" tabindex="-1"><a class="header-anchor" href="#收获💡-16"><span>收获💡</span></a></h4>
<ol>
<li>类加载时可以通过 agent 修改 class 实现增强</li>
</ol>
<h3 id="_11-aop-实现之-proxy" tabindex="-1"><a class="header-anchor" href="#_11-aop-实现之-proxy"><span>11) AOP 实现之 proxy</span></a></h3>
<h4 id="演示1-jdk-动态代理" tabindex="-1"><a class="header-anchor" href="#演示1-jdk-动态代理"><span>演示1 - jdk 动态代理</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> JdkProxyDemo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Target</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"target foo"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">param</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // 目标对象</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Target</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> target</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // 代理对象</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Foo</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (Foo) </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">newProxyInstance</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getClassLoader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[]{</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">},</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                (p, method, args) </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                    System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"proxy before..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">                    Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> result</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> method</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(target, args);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                    System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"proxy after..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> result;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                });</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // 调用代理</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>proxy before...</span></span>
<span class="line"><span>target foo</span></span>
<span class="line"><span>proxy after...</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-17" tabindex="-1"><a class="header-anchor" href="#收获💡-17"><span>收获💡</span></a></h4>
<ul>
<li>jdk 动态代理要求目标<strong>必须</strong>实现接口，生成的代理类实现相同接口，因此代理与目标之间是平级兄弟关系</li>
</ul>
<h4 id="演示2-cglib-代理" tabindex="-1"><a class="header-anchor" href="#演示2-cglib-代理"><span>演示2 - cglib 代理</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> CglibProxyDemo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"target foo"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">param</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // 目标对象</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Target</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> target</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // 代理对象</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Target</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (Target) </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Enhancer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">create</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                (MethodInterceptor) (p, method, args, methodProxy) </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"proxy before..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> result</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> methodProxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(target, args);</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">            // 另一种调用方法，不需要目标对象实例</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//            Object result = methodProxy.invokeSuper(p, args);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"proxy after..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> result;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        });</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // 调用代理</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果与 jdk 动态代理相同</p>
<h4 id="收获💡-18" tabindex="-1"><a class="header-anchor" href="#收获💡-18"><span>收获💡</span></a></h4>
<ul>
<li>cglib 不要求目标实现接口，它生成的代理类是目标的子类，因此代理与目标之间是子父关系</li>
<li>限制⛔：根据上述分析 final 类无法被 cglib 增强</li>
</ul>
<h3 id="_12-jdk-动态代理进阶" tabindex="-1"><a class="header-anchor" href="#_12-jdk-动态代理进阶"><span>12) jdk 动态代理进阶</span></a></h3>
<h4 id="演示1-模拟-jdk-动态代理" tabindex="-1"><a class="header-anchor" href="#演示1-模拟-jdk-动态代理"><span>演示1 - 模拟 jdk 动态代理</span></a></h4>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> A12</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> bar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Target</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"target foo"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> bar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"target bar"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">param</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // ⬇️1. 创建代理，这时传入 InvocationHandler</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Foo</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> $Proxy0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> InvocationHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">            // ⬇️5. 进入 InvocationHandler</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Object</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Method</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> method</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Object</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Throwable</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">                // ⬇️6. 功能增强</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"before..."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">                // ⬇️7. 反射调用目标方法</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> method</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), args);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        });</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // ⬇️2. 调用代理方法</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">bar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模拟代理实现</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.lang.reflect.InvocationHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.lang.reflect.Method</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.lang.reflect.Proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.lang.reflect.UndeclaredThrowableException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">// ⬇️这就是 jdk 代理类的源码, 秘密都在里面</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> $Proxy0</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Proxy</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> A12</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> $</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Proxy0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">InvocationHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> h</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        super</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(h);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // ⬇️3. 进入代理方法</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        try</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">            // ⬇️4. 回调 InvocationHandler</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            h</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, foo, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">RuntimeException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Error</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            throw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> e;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Throwable</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            throw</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> UndeclaredThrowableException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(e);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> bar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        try</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> result</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> h</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, bar, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) result;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">RuntimeException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Error</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            throw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> e;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Throwable</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            throw</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> UndeclaredThrowableException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(e);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Method</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Method</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        try</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            foo </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> A12</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMethod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"foo"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">            bar </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> A12</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMethod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"bar"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">NoSuchMethodException</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            throw</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> NoSuchMethodError</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getMessage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-19" tabindex="-1"><a class="header-anchor" href="#收获💡-19"><span>收获💡</span></a></h4>
<p>代理一点都不难，无非就是利用了多态、反射的知识</p>
<ol>
<li>方法重写可以增强逻辑，只不过这【增强逻辑】千变万化，不能写死在代理内部</li>
<li>通过接口回调将【增强逻辑】置于代理类之外</li>
<li>配合接口方法反射（是多态调用），就可以再联动调用目标方法</li>
<li>会用 arthas 的 jad 工具反编译代理类</li>
<li>限制⛔：代理增强是借助多态来实现，因此成员变量、静态方法、final 方法均不能通过代理实现</li>
</ol>
<h4 id="演示2-方法反射优化" tabindex="-1"><a class="header-anchor" href="#演示2-方法反射优化"><span>演示2 - 方法反射优化</span></a></h4>
<h5 id="代码参考-15" tabindex="-1"><a class="header-anchor" href="#代码参考-15"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a12.TestMethodInvoke</strong></p>
<h4 id="收获💡-20" tabindex="-1"><a class="header-anchor" href="#收获💡-20"><span>收获💡</span></a></h4>
<ol>
<li>前 16 次反射性能较低</li>
<li>第 17 次调用会生成代理类，优化为非反射调用</li>
<li>会用 arthas 的 jad 工具反编译第 17 次调用生成的代理类</li>
</ol>
<blockquote>
<p><em><strong>注意</strong></em></p>
<p>运行时请添加 --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens java.base/jdk.internal.reflect=ALL-UNNAMED</p>
</blockquote>
<h3 id="_13-cglib-代理进阶" tabindex="-1"><a class="header-anchor" href="#_13-cglib-代理进阶"><span>13) cglib 代理进阶</span></a></h3>
<h4 id="演示-模拟-cglib-代理" tabindex="-1"><a class="header-anchor" href="#演示-模拟-cglib-代理"><span>演示 - 模拟 cglib 代理</span></a></h4>
<h5 id="代码参考-16" tabindex="-1"><a class="header-anchor" href="#代码参考-16"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a13</strong> 包</p>
<h4 id="收获💡-21" tabindex="-1"><a class="header-anchor" href="#收获💡-21"><span>收获💡</span></a></h4>
<p>和 jdk 动态代理原理查不多</p>
<ol>
<li>回调的接口换了一下，InvocationHandler 改成了 MethodInterceptor</li>
<li>调用目标时有所改进，见下面代码片段
<ol>
<li>method.invoke 是反射调用，必须调用到足够次数才会进行优化</li>
<li>methodProxy.invoke 是不反射调用，它会正常（间接）调用目标对象的方法（Spring 采用）</li>
<li>methodProxy.invokeSuper 也是不反射调用，它会正常（间接）调用代理对象的方法，可以省略目标对象</li>
</ol>
</li>
</ol>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> A14Application</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> InvocationTargetException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Target</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> target</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Proxy</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setCallbacks</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Callback</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[]{(MethodInterceptor) (p, m, a, mp) </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"proxy before..."</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> mp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getSignature</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">            // ⬇️调用目标方法(三种)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//            Object result = m.invoke(target, a);  // ⬅️反射调用</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//            Object result = mp.invoke(target, a); // ⬅️非反射调用, 结合目标用</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> result</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> mp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">invokeSuper</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(p, a);   </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">// ⬅️非反射调用, 结合代理用</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"proxy after..."</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> mp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getSignature</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> result;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }});</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // ⬇️调用代理方法</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">save</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em><strong>注意</strong></em></p>
<ul>
<li>调用 Object 的方法, 后两种在 jdk &gt;= 9 时都有问题, 需要 --add-opens java.base/java.lang=ALL-UNNAMED</li>
</ul>
</blockquote>
<h3 id="_14-cglib-避免反射调用" tabindex="-1"><a class="header-anchor" href="#_14-cglib-避免反射调用"><span>14) cglib 避免反射调用</span></a></h3>
<h4 id="演示-cglib-如何避免反射" tabindex="-1"><a class="header-anchor" href="#演示-cglib-如何避免反射"><span>演示 - cglib 如何避免反射</span></a></h4>
<h5 id="代码参考-17" tabindex="-1"><a class="header-anchor" href="#代码参考-17"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a13.ProxyFastClass</strong>，<strong>com.itheima.a13.TargetFastClass</strong></p>
<h4 id="收获💡-22" tabindex="-1"><a class="header-anchor" href="#收获💡-22"><span>收获💡</span></a></h4>
<ol>
<li>当调用 MethodProxy 的 invoke 或 invokeSuper 方法时, 会动态生成两个类
<ul>
<li>ProxyFastClass 配合代理对象一起使用, 避免反射</li>
<li>TargetFastClass 配合目标对象一起使用, 避免反射 (Spring 用的这种)</li>
</ul>
</li>
<li>TargetFastClass 记录了 Target 中方法与编号的对应关系
<ul>
<li>save(long) 编号 2</li>
<li>save(int) 编号 1</li>
<li>save() 编号 0</li>
<li>首先根据方法名和参数个数、类型, 用 switch 和 if 找到这些方法编号</li>
<li>然后再根据编号去调用目标方法, 又用了一大堆 switch 和 if, 但避免了反射</li>
</ul>
</li>
<li>ProxyFastClass 记录了 Proxy 中方法与编号的对应关系，不过 Proxy 额外提供了下面几个方法
<ul>
<li>saveSuper(long) 编号 2，不增强，仅是调用 super.save(long)</li>
<li>saveSuper(int) 编号 1，不增强, 仅是调用 super.save(int)</li>
<li>saveSuper() 编号 0，不增强, 仅是调用 super.save()</li>
<li>查找方式与 TargetFastClass 类似</li>
</ul>
</li>
<li>为什么有这么麻烦的一套东西呢？
<ul>
<li>避免反射, 提高性能, 代价是一个代理类配两个 FastClass 类, 代理类中还得增加仅调用 super 的一堆方法</li>
<li>用编号处理方法对应关系比较省内存, 另外, 最初获得方法顺序是不确定的, 这个过程没法固定死</li>
</ul>
</li>
</ol>
<h3 id="_15-jdk-和-cglib-在-spring-中的统一" tabindex="-1"><a class="header-anchor" href="#_15-jdk-和-cglib-在-spring-中的统一"><span>15) jdk 和 cglib 在 Spring 中的统一</span></a></h3>
<p>Spring 中对切点、通知、切面的抽象如下</p>
<ul>
<li>切点：接口 Pointcut，典型实现 AspectJExpressionPointcut</li>
<li>通知：典型接口为 MethodInterceptor 代表环绕通知</li>
<li>切面：Advisor，包含一个 Advice 通知，PointcutAdvisor 包含一个 Advice 通知和一个 Pointcut</li>
</ul>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">classDiagram</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class Advice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class MethodInterceptor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class Advisor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class PointcutAdvisor</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Pointcut &#x3C;|-- AspectJExpressionPointcut</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Advice &#x3C;|-- MethodInterceptor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Advisor &#x3C;|-- PointcutAdvisor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">PointcutAdvisor o-- "一" Pointcut</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">PointcutAdvisor o-- "一" Advice</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> Advice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> MethodInterceptor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> Pointcut</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> Advisor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> PointcutAdvisor</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代理相关类图</p>
<ul>
<li>AopProxyFactory 根据 proxyTargetClass 等设置选择 AopProxy 实现</li>
<li>AopProxy 通过 getProxy 创建代理对象</li>
<li>图中 Proxy 都实现了 Advised 接口，能够获得关联的切面集合与目标（其实是从 ProxyFactory 取得）</li>
<li>调用代理方法时，会借助 ProxyFactory 将通知统一转为环绕通知：MethodInterceptor</li>
</ul>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">classDiagram</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Advised &#x3C;|-- ProxyFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ProxyFactory o-- Target</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ProxyFactory o-- "多" Advisor</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ProxyFactory --> AopProxyFactory : 使用</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">AopProxyFactory --> AopProxy</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Advised &#x3C;|-- 基于CGLIB的Proxy</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">基于CGLIB的Proxy &#x3C;-- ObjenesisCglibAopProxy : 创建</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">AopProxy &#x3C;|-- ObjenesisCglibAopProxy</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">AopProxy &#x3C;|-- JdkDynamicAopProxy</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">基于JDK的Proxy &#x3C;-- JdkDynamicAopProxy : 创建</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Advised &#x3C;|-- 基于JDK的Proxy</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class AopProxy {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   +getProxy() Object</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class ProxyFactory {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	proxyTargetClass : boolean</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class ObjenesisCglibAopProxy {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	advised : ProxyFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class JdkDynamicAopProxy {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	advised : ProxyFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> Advised</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> AopProxyFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> AopProxy</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="演示-底层切点、通知、切面" tabindex="-1"><a class="header-anchor" href="#演示-底层切点、通知、切面"><span>演示 - 底层切点、通知、切面</span></a></h4>
<h5 id="代码参考-18" tabindex="-1"><a class="header-anchor" href="#代码参考-18"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a15.A15</strong></p>
<h4 id="收获💡-23" tabindex="-1"><a class="header-anchor" href="#收获💡-23"><span>收获💡</span></a></h4>
<ol>
<li>底层的切点实现</li>
<li>底层的通知实现</li>
<li>底层的切面实现</li>
<li>ProxyFactory 用来创建代理
<ul>
<li>如果指定了接口，且 proxyTargetClass = false，使用 JdkDynamicAopProxy</li>
<li>如果没有指定接口，或者 proxyTargetClass = true，使用 ObjenesisCglibAopProxy
<ul>
<li>例外：如果目标是接口类型或已经是 Jdk 代理，使用 JdkDynamicAopProxy</li>
</ul>
</li>
</ul>
</li>
</ol>
<blockquote>
<p><em><strong>注意</strong></em></p>
<ul>
<li>要区分本章节提到的 MethodInterceptor，它与之前 cglib 中用的的 MethodInterceptor 是不同的接口</li>
</ul>
</blockquote>
<h3 id="_16-切点匹配" tabindex="-1"><a class="header-anchor" href="#_16-切点匹配"><span>16) 切点匹配</span></a></h3>
<h4 id="演示-切点匹配" tabindex="-1"><a class="header-anchor" href="#演示-切点匹配"><span>演示 - 切点匹配</span></a></h4>
<h5 id="代码参考-19" tabindex="-1"><a class="header-anchor" href="#代码参考-19"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a16.A16</strong></p>
<h4 id="收获💡-24" tabindex="-1"><a class="header-anchor" href="#收获💡-24"><span>收获💡</span></a></h4>
<ol>
<li>常见 aspectj 切点用法</li>
<li>aspectj 切点的局限性，实际的 @Transactional 切点实现</li>
</ol>
<h3 id="_17-从-aspect-到-advisor" tabindex="-1"><a class="header-anchor" href="#_17-从-aspect-到-advisor"><span>17) 从 @Aspect 到 Advisor</span></a></h3>
<h4 id="演示1-代理创建器" tabindex="-1"><a class="header-anchor" href="#演示1-代理创建器"><span>演示1 - 代理创建器</span></a></h4>
<h5 id="代码参考-20" tabindex="-1"><a class="header-anchor" href="#代码参考-20"><span>代码参考</span></a></h5>
<p><strong>org.springframework.aop.framework.autoproxy</strong> 包</p>
<h4 id="收获💡-25" tabindex="-1"><a class="header-anchor" href="#收获💡-25"><span>收获💡</span></a></h4>
<ol>
<li>AnnotationAwareAspectJAutoProxyCreator 的作用
<ul>
<li>将高级 @Aspect 切面统一为低级 Advisor 切面</li>
<li>在合适的时机创建代理</li>
</ul>
</li>
<li>findEligibleAdvisors 找到有【资格】的 Advisors
<ul>
<li>有【资格】的 Advisor 一部分是低级的, 可以由自己编写, 如本例 A17 中的 advisor3</li>
<li>有【资格】的 Advisor 另一部分是高级的, 由解析 @Aspect 后获得</li>
</ul>
</li>
<li>wrapIfNecessary
<ul>
<li>它内部调用 findEligibleAdvisors, 只要返回集合不空, 则表示需要创建代理</li>
<li>它的调用时机通常在原始对象初始化后执行, 但碰到循环依赖会提前至依赖注入之前执行</li>
</ul>
</li>
</ol>
<h4 id="演示2-代理创建时机" tabindex="-1"><a class="header-anchor" href="#演示2-代理创建时机"><span>演示2 - 代理创建时机</span></a></h4>
<h5 id="代码参考-21" tabindex="-1"><a class="header-anchor" href="#代码参考-21"><span>代码参考</span></a></h5>
<p><strong>org.springframework.aop.framework.autoproxy.A17_1</strong></p>
<h4 id="收获💡-26" tabindex="-1"><a class="header-anchor" href="#收获💡-26"><span>收获💡</span></a></h4>
<ol>
<li>代理的创建时机
<ul>
<li>初始化之后 (无循环依赖时)</li>
<li>实例创建后, 依赖注入前 (有循环依赖时), 并暂存于二级缓存</li>
</ul>
</li>
<li>依赖注入与初始化不应该被增强, 仍应被施加于原始对象</li>
</ol>
<h4 id="演示3-before-对应的低级通知" tabindex="-1"><a class="header-anchor" href="#演示3-before-对应的低级通知"><span>演示3 - @Before 对应的低级通知</span></a></h4>
<h5 id="代码参考-22" tabindex="-1"><a class="header-anchor" href="#代码参考-22"><span>代码参考</span></a></h5>
<p><strong>org.springframework.aop.framework.autoproxy.A17_2</strong></p>
<h4 id="收获💡-27" tabindex="-1"><a class="header-anchor" href="#收获💡-27"><span>收获💡</span></a></h4>
<ol>
<li>@Before 前置通知会被转换为原始的 AspectJMethodBeforeAdvice 形式, 该对象包含了如下信息
<ol>
<li>通知代码从哪儿来</li>
<li>切点是什么(这里为啥要切点, 后面解释)</li>
<li>通知对象如何创建, 本例共用同一个 Aspect 对象</li>
</ol>
</li>
<li>类似的还有
<ol>
<li>AspectJAroundAdvice (环绕通知)</li>
<li>AspectJAfterReturningAdvice</li>
<li>AspectJAfterThrowingAdvice (环绕通知)</li>
<li>AspectJAfterAdvice (环绕通知)</li>
</ol>
</li>
</ol>
<h3 id="_18-静态通知调用" tabindex="-1"><a class="header-anchor" href="#_18-静态通知调用"><span>18) 静态通知调用</span></a></h3>
<p>代理对象调用流程如下（以 JDK 动态代理实现为例）</p>
<ul>
<li>从 ProxyFactory 获得 Target 和环绕通知链，根据他俩创建 MethodInvocation，简称 mi</li>
<li>首次执行 mi.proceed() 发现有下一个环绕通知，调用它的 invoke(mi)</li>
<li>进入环绕通知1，执行前增强，再次调用 mi.proceed() 发现有下一个环绕通知，调用它的 invoke(mi)</li>
<li>进入环绕通知2，执行前增强，调用 mi.proceed() 发现没有环绕通知，调用 mi.invokeJoinPoint() 执行目标方法</li>
<li>目标方法执行结束，将结果返回给环绕通知2，执行环绕通知2 的后增强</li>
<li>环绕通知2继续将结果返回给环绕通知1，执行环绕通知1 的后增强</li>
<li>环绕通知1返回最终的结果</li>
</ul>
<p>图中不同颜色对应一次环绕通知或目标的调用起始至终结</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant Proxy</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ih as InvocationHandler</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant mi as MethodInvocation</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant Factory as ProxyFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant mi1 as MethodInterceptor1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant mi2 as MethodInterceptor2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant Target</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Proxy ->> +ih : invoke()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ih ->> +Factory : 获得 Target</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Factory -->> -ih : </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ih ->> +Factory : 获得 MethodInterceptor 链</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Factory -->> -ih : </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ih ->> +mi : 创建 mi</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi -->> -ih : </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rect rgb(200, 223, 255)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ih ->> +mi : mi.proceed()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi ->> +mi1 : invoke(mi)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi1 ->> mi1 : 前增强</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rect rgb(200, 190, 255)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi1 ->> mi : mi.proceed()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi ->> +mi2 : invoke(mi)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi2 ->> mi2 : 前增强</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rect rgb(150, 190, 155)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi2 ->> mi : mi.proceed()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi ->> +Target : mi.invokeJoinPoint()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Target ->> Target : </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Target -->> -mi2 : 结果</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi2 ->> mi2 : 后增强</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi2 -->> -mi1 : 结果</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi1 ->> mi1 : 后增强</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi1 -->> -mi : 结果</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mi -->> -ih : </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ih -->> -Proxy :</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="演示1-通知调用过程" tabindex="-1"><a class="header-anchor" href="#演示1-通知调用过程"><span>演示1 - 通知调用过程</span></a></h4>
<h5 id="代码参考-23" tabindex="-1"><a class="header-anchor" href="#代码参考-23"><span>代码参考</span></a></h5>
<p><strong>org.springframework.aop.framework.A18</strong></p>
<h4 id="收获💡-28" tabindex="-1"><a class="header-anchor" href="#收获💡-28"><span>收获💡</span></a></h4>
<p>代理方法执行时会做如下工作</p>
<ol>
<li>通过 proxyFactory 的 getInterceptorsAndDynamicInterceptionAdvice() 将其他通知统一转换为 MethodInterceptor 环绕通知
<ul>
<li>MethodBeforeAdviceAdapter 将 @Before AspectJMethodBeforeAdvice 适配为 MethodBeforeAdviceInterceptor</li>
<li>AfterReturningAdviceAdapter 将 @AfterReturning AspectJAfterReturningAdvice 适配为 AfterReturningAdviceInterceptor</li>
<li>这体现的是适配器设计模式</li>
</ul>
</li>
<li>所谓静态通知，体现在上面方法的 Interceptors 部分，这些通知调用时无需再次检查切点，直接调用即可</li>
<li>结合目标与环绕通知链，创建 MethodInvocation 对象，通过它完成整个调用</li>
</ol>
<h4 id="演示2-模拟-methodinvocation" tabindex="-1"><a class="header-anchor" href="#演示2-模拟-methodinvocation"><span>演示2 - 模拟 MethodInvocation</span></a></h4>
<h5 id="代码参考-24" tabindex="-1"><a class="header-anchor" href="#代码参考-24"><span>代码参考</span></a></h5>
<p><strong>org.springframework.aop.framework.A18_1</strong></p>
<h4 id="收获💡-29" tabindex="-1"><a class="header-anchor" href="#收获💡-29"><span>收获💡</span></a></h4>
<ol>
<li>proceed() 方法调用链中下一个环绕通知</li>
<li>每个环绕通知内部继续调用 proceed()</li>
<li>调用到没有更多通知了, 就调用目标方法</li>
</ol>
<p>MethodInvocation 的编程技巧在实现拦截器、过滤器时能用上</p>
<h3 id="_19-动态通知调用" tabindex="-1"><a class="header-anchor" href="#_19-动态通知调用"><span>19) 动态通知调用</span></a></h3>
<h4 id="演示-带参数绑定的通知方法调用" tabindex="-1"><a class="header-anchor" href="#演示-带参数绑定的通知方法调用"><span>演示 - 带参数绑定的通知方法调用</span></a></h4>
<h5 id="代码参考-25" tabindex="-1"><a class="header-anchor" href="#代码参考-25"><span>代码参考</span></a></h5>
<p><strong>org.springframework.aop.framework.autoproxy.A19</strong></p>
<h4 id="收获💡-30" tabindex="-1"><a class="header-anchor" href="#收获💡-30"><span>收获💡</span></a></h4>
<ol>
<li>通过 proxyFactory 的 getInterceptorsAndDynamicInterceptionAdvice() 将其他通知统一转换为 MethodInterceptor 环绕通知</li>
<li>所谓动态通知，体现在上面方法的 DynamicInterceptionAdvice 部分，这些通知调用时因为要为通知方法绑定参数，还需再次利用切点表达式</li>
<li>动态通知调用复杂程度高，性能较低</li>
</ol>
<h2 id="web" tabindex="-1"><a class="header-anchor" href="#web"><span>WEB</span></a></h2>
<h3 id="_20-requestmappinghandlermapping-与-requestmappinghandleradapter" tabindex="-1"><a class="header-anchor" href="#_20-requestmappinghandlermapping-与-requestmappinghandleradapter"><span>20) RequestMappingHandlerMapping 与 RequestMappingHandlerAdapter</span></a></h3>
<p>RequestMappingHandlerMapping 与 RequestMappingHandlerAdapter 俩是一对，分别用来</p>
<ul>
<li>处理 @RequestMapping 映射</li>
<li>调用控制器方法、并处理方法参数与方法返回值</li>
</ul>
<h4 id="演示1-dispatcherservlet-初始化" tabindex="-1"><a class="header-anchor" href="#演示1-dispatcherservlet-初始化"><span>演示1 - DispatcherServlet 初始化</span></a></h4>
<h5 id="代码参考-26" tabindex="-1"><a class="header-anchor" href="#代码参考-26"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a20</strong> 包</p>
<h4 id="收获💡-31" tabindex="-1"><a class="header-anchor" href="#收获💡-31"><span>收获💡</span></a></h4>
<ol>
<li>DispatcherServlet 是在第一次被访问时执行初始化, 也可以通过配置修改为 Tomcat 启动后就初始化</li>
<li>在初始化时会从 Spring 容器中找一些 Web 需要的组件, 如 HandlerMapping、HandlerAdapter 等，并逐一调用它们的初始化</li>
<li>RequestMappingHandlerMapping 初始化时，会收集所有 @RequestMapping 映射信息，封装为 Map，其中
<ul>
<li>key 是 RequestMappingInfo 类型，包括请求路径、请求方法等信息</li>
<li>value 是 HandlerMethod 类型，包括控制器方法对象、控制器对象</li>
<li>有了这个 Map，就可以在请求到达时，快速完成映射，找到 HandlerMethod 并与匹配的拦截器一起返回给 DispatcherServlet</li>
</ul>
</li>
<li>RequestMappingHandlerAdapter 初始化时，会准备 HandlerMethod 调用时需要的各个组件，如：
<ul>
<li>HandlerMethodArgumentResolver 解析控制器方法参数</li>
<li>HandlerMethodReturnValueHandler 处理控制器方法返回值</li>
</ul>
</li>
</ol>
<h4 id="演示2-自定义参数与返回值处理器" tabindex="-1"><a class="header-anchor" href="#演示2-自定义参数与返回值处理器"><span>演示2 - 自定义参数与返回值处理器</span></a></h4>
<h5 id="代码参考-27" tabindex="-1"><a class="header-anchor" href="#代码参考-27"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a20.TokenArgumentResolver</strong> ，<strong>com.itheima.a20.YmlReturnValueHandler</strong></p>
<h4 id="收获💡-32" tabindex="-1"><a class="header-anchor" href="#收获💡-32"><span>收获💡</span></a></h4>
<ol>
<li>体会参数解析器的作用</li>
<li>体会返回值处理器的作用</li>
</ol>
<h3 id="_21-参数解析器" tabindex="-1"><a class="header-anchor" href="#_21-参数解析器"><span>21) 参数解析器</span></a></h3>
<h4 id="演示-常见参数解析器" tabindex="-1"><a class="header-anchor" href="#演示-常见参数解析器"><span>演示 - 常见参数解析器</span></a></h4>
<h5 id="代码参考-28" tabindex="-1"><a class="header-anchor" href="#代码参考-28"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a21</strong> 包</p>
<h4 id="收获💡-33" tabindex="-1"><a class="header-anchor" href="#收获💡-33"><span>收获💡</span></a></h4>
<ol>
<li>初步了解 RequestMappingHandlerAdapter 的调用过程
<ol>
<li>控制器方法被封装为 HandlerMethod</li>
<li>准备对象绑定与类型转换</li>
<li>准备 ModelAndViewContainer 用来存储中间 Model 结果</li>
<li>解析每个参数值</li>
</ol>
</li>
<li>解析参数依赖的就是各种参数解析器，它们都有两个重要方法
<ul>
<li>supportsParameter 判断是否支持方法参数</li>
<li>resolveArgument 解析方法参数</li>
</ul>
</li>
<li>常见参数的解析
<ul>
<li>@RequestParam</li>
<li>省略 @RequestParam</li>
<li>@RequestParam(defaultValue)</li>
<li>MultipartFile</li>
<li>@PathVariable</li>
<li>@RequestHeader</li>
<li>@CookieValue</li>
<li>@Value</li>
<li>HttpServletRequest 等</li>
<li>@ModelAttribute</li>
<li>省略 @ModelAttribute</li>
<li>@RequestBody</li>
</ul>
</li>
<li>组合模式在 Spring 中的体现</li>
<li>@RequestParam, @CookieValue 等注解中的参数名、默认值, 都可以写成活的, 即从 ${ } #{ }中获取</li>
</ol>
<h3 id="_22-参数名解析" tabindex="-1"><a class="header-anchor" href="#_22-参数名解析"><span>22) 参数名解析</span></a></h3>
<h4 id="演示-两种方法获取参数名" tabindex="-1"><a class="header-anchor" href="#演示-两种方法获取参数名"><span>演示 - 两种方法获取参数名</span></a></h4>
<h5 id="代码参考-29" tabindex="-1"><a class="header-anchor" href="#代码参考-29"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a22.A22</strong></p>
<h4 id="收获💡-34" tabindex="-1"><a class="header-anchor" href="#收获💡-34"><span>收获💡</span></a></h4>
<ol>
<li>如果编译时添加了 -parameters 可以生成参数表, 反射时就可以拿到参数名</li>
<li>如果编译时添加了 -g 可以生成调试信息, 但分为两种情况
<ul>
<li>普通类, 会包含局部变量表, 用 asm 可以拿到参数名</li>
<li>接口, 不会包含局部变量表, 无法获得参数名
<ul>
<li>这也是 MyBatis 在实现 Mapper 接口时为何要提供 @Param 注解来辅助获得参数名</li>
</ul>
</li>
</ul>
</li>
</ol>
<h3 id="_23-对象绑定与类型转换" tabindex="-1"><a class="header-anchor" href="#_23-对象绑定与类型转换"><span>23) 对象绑定与类型转换</span></a></h3>
<h4 id="底层第一套转换接口与实现" tabindex="-1"><a class="header-anchor" href="#底层第一套转换接口与实现"><span>底层第一套转换接口与实现</span></a></h4>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">classDiagram</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Formatter --|> Printer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Formatter --|> Parser</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class Converters {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   Set~GenericConverter~</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class Converter</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class ConversionService</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class FormattingConversionService</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ConversionService &#x3C;|-- FormattingConversionService</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">FormattingConversionService o-- Converters</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Printer --> Adapter1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Adapter1 --> Converters</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Parser --> Adapter2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Adapter2 --> Converters</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Converter --> Adapter3</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Adapter3 --> Converters</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> Formatter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> Printer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> Parser</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> Converter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> ConversionService</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Printer 把其它类型转为 String</li>
<li>Parser 把 String 转为其它类型</li>
<li>Formatter 综合 Printer 与 Parser 功能</li>
<li>Converter 把类型 S 转为类型 T</li>
<li>Printer、Parser、Converter 经过适配转换成 GenericConverter 放入 Converters 集合</li>
<li>FormattingConversionService 利用其它们实现转换</li>
</ul>
<h4 id="底层第二套转换接口" tabindex="-1"><a class="header-anchor" href="#底层第二套转换接口"><span>底层第二套转换接口</span></a></h4>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">classDiagram</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">PropertyEditorRegistry o-- "多" PropertyEditor</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> PropertyEditorRegistry</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> PropertyEditor</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>PropertyEditor 把 String 与其它类型相互转换</li>
<li>PropertyEditorRegistry 可以注册多个 PropertyEditor 对象</li>
<li>与第一套接口直接可以通过 FormatterPropertyEditorAdapter 来进行适配</li>
</ul>
<h4 id="高层接口与实现" tabindex="-1"><a class="header-anchor" href="#高层接口与实现"><span>高层接口与实现</span></a></h4>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">classDiagram</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">TypeConverter &#x3C;|-- SimpleTypeConverter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">TypeConverter &#x3C;|-- BeanWrapperImpl</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">TypeConverter &#x3C;|-- DirectFieldAccessor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">TypeConverter &#x3C;|-- ServletRequestDataBinder</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">SimpleTypeConverter --> TypeConverterDelegate</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">BeanWrapperImpl --> TypeConverterDelegate</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">DirectFieldAccessor --> TypeConverterDelegate</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ServletRequestDataBinder --> TypeConverterDelegate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">TypeConverterDelegate --> ConversionService</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">TypeConverterDelegate --> PropertyEditorRegistry</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> TypeConverter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> ConversionService</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;&#x3C;interface>> PropertyEditorRegistry</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>它们都实现了 TypeConverter 这个高层转换接口，在转换时，会用到 TypeConverter Delegate 委派ConversionService 与 PropertyEditorRegistry 真正执行转换（Facade 门面模式）
<ul>
<li>首先看是否有自定义转换器, @InitBinder 添加的即属于这种 (用了适配器模式把 Formatter 转为需要的 PropertyEditor)</li>
<li>再看有没有 ConversionService 转换</li>
<li>再利用默认的 PropertyEditor 转换</li>
<li>最后有一些特殊处理</li>
</ul>
</li>
<li>SimpleTypeConverter 仅做类型转换</li>
<li>BeanWrapperImpl 为 bean 的属性赋值，当需要时做类型转换，走 Property</li>
<li>DirectFieldAccessor 为 bean 的属性赋值，当需要时做类型转换，走 Field</li>
<li>ServletRequestDataBinder 为 bean 的属性执行绑定，当需要时做类型转换，根据 directFieldAccess 选择走 Property 还是 Field，具备校验与获取校验结果功能</li>
</ul>
<h4 id="演示1-类型转换与数据绑定" tabindex="-1"><a class="header-anchor" href="#演示1-类型转换与数据绑定"><span>演示1 - 类型转换与数据绑定</span></a></h4>
<h5 id="代码参考-30" tabindex="-1"><a class="header-anchor" href="#代码参考-30"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a23</strong> 包</p>
<h4 id="收获💡-35" tabindex="-1"><a class="header-anchor" href="#收获💡-35"><span>收获💡</span></a></h4>
<p>基本的类型转换与数据绑定用法</p>
<ul>
<li>SimpleTypeConverter</li>
<li>BeanWrapperImpl</li>
<li>DirectFieldAccessor</li>
<li>ServletRequestDataBinder</li>
</ul>
<h4 id="演示2-数据绑定工厂" tabindex="-1"><a class="header-anchor" href="#演示2-数据绑定工厂"><span>演示2 - 数据绑定工厂</span></a></h4>
<h5 id="代码参考-31" tabindex="-1"><a class="header-anchor" href="#代码参考-31"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a23.TestServletDataBinderFactory</strong></p>
<h4 id="收获💡-36" tabindex="-1"><a class="header-anchor" href="#收获💡-36"><span>收获💡</span></a></h4>
<p>ServletRequestDataBinderFactory 的用法和扩展点</p>
<ol>
<li>可以解析控制器的 @InitBinder 标注方法作为扩展点，添加自定义转换器
<ul>
<li>控制器私有范围</li>
</ul>
</li>
<li>可以通过 ConfigurableWebBindingInitializer 配置 ConversionService 作为扩展点，添加自定义转换器
<ul>
<li>公共范围</li>
</ul>
</li>
<li>同时加了 @InitBinder 和 ConversionService 的转换优先级
<ol>
<li>优先采用 @InitBinder 的转换器</li>
<li>其次使用 ConversionService 的转换器</li>
<li>使用默认转换器</li>
<li>特殊处理（例如有参构造）</li>
</ol>
</li>
</ol>
<h4 id="演示3-获取泛型参数" tabindex="-1"><a class="header-anchor" href="#演示3-获取泛型参数"><span>演示3 - 获取泛型参数</span></a></h4>
<h5 id="代码参考-32" tabindex="-1"><a class="header-anchor" href="#代码参考-32"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a23.sub</strong> 包</p>
<h4 id="收获💡-37" tabindex="-1"><a class="header-anchor" href="#收获💡-37"><span>收获💡</span></a></h4>
<ol>
<li>java api 获取泛型参数</li>
<li>spring api 获取泛型参数</li>
</ol>
<h3 id="_24-controlleradvice-之-initbinder" tabindex="-1"><a class="header-anchor" href="#_24-controlleradvice-之-initbinder"><span>24) @ControllerAdvice 之 @InitBinder</span></a></h3>
<h4 id="演示-准备-initbinder" tabindex="-1"><a class="header-anchor" href="#演示-准备-initbinder"><span>演示 - 准备 @InitBinder</span></a></h4>
<p><strong>准备 @InitBinder</strong> 在整个 HandlerAdapter 调用过程中所处的位置</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant adapter as HandlerAdapter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant bf as WebDataBinderFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant mf as ModelFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ihm as ServletInvocableHandlerMethod</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ar as ArgumentResolvers </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant rh as ReturnValueHandlers</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant container as ModelAndViewContainer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rect rgb(200, 150, 255)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +bf: 准备 @InitBinder</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">bf -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +mf: 准备 @ModelAttribute</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mf ->> +container: 添加Model数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -mf: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mf -->> -adapter: </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +ihm: invokeAndHandle</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> +ar: 获取 args</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar ->> ar: 有的解析器涉及 RequestBodyAdvice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar ->> container: 有的解析器涉及数据绑定生成Model数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar -->> -ihm: args</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> ihm: method.invoke(bean,args) 得到 returnValue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> +rh: 处理 returnValue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh ->> rh: 有的处理器涉及 ResponseBodyAdvice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh ->> +container: 添加Model数据,处理视图名,是否渲染等</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -rh: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh -->> -ihm: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +container: 获取 ModelAndView</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -adapter:</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>RequestMappingHandlerAdapter 在图中缩写为 HandlerAdapter</li>
<li>HandlerMethodArgumentResolverComposite 在图中缩写为 ArgumentResolvers</li>
<li>HandlerMethodReturnValueHandlerComposite 在图中缩写为 ReturnValueHandlers</li>
</ul>
<h4 id="收获💡-38" tabindex="-1"><a class="header-anchor" href="#收获💡-38"><span>收获💡</span></a></h4>
<ol>
<li>RequestMappingHandlerAdapter 初始化时会解析 @ControllerAdvice 中的 @InitBinder 方法</li>
<li>RequestMappingHandlerAdapter 会以类为单位，在该类首次使用时，解析此类的 @InitBinder 方法</li>
<li>以上两种 @InitBinder 的解析结果都会缓存来避免重复解析</li>
<li>控制器方法调用时，会综合利用本类的 @InitBinder 方法和 @ControllerAdvice 中的 @InitBinder 方法创建绑定工厂</li>
</ol>
<h3 id="_25-控制器方法执行流程" tabindex="-1"><a class="header-anchor" href="#_25-控制器方法执行流程"><span>25) 控制器方法执行流程</span></a></h3>
<h4 id="图1" tabindex="-1"><a class="header-anchor" href="#图1"><span>图1</span></a></h4>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">classDiagram</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">class ServletInvocableHandlerMethod {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	+invokeAndHandle(ServletWebRequest,ModelAndViewContainer)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">HandlerMethod &#x3C;|-- ServletInvocableHandlerMethod</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">HandlerMethod o-- bean</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">HandlerMethod o-- method</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ServletInvocableHandlerMethod o-- WebDataBinderFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ServletInvocableHandlerMethod o-- ParameterNameDiscoverer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ServletInvocableHandlerMethod o-- HandlerMethodArgumentResolverComposite</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ServletInvocableHandlerMethod o-- HandlerMethodReturnValueHandlerComposite</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HandlerMethod 需要</p>
<ul>
<li>bean 即是哪个 Controller</li>
<li>method 即是 Controller 中的哪个方法</li>
</ul>
<p>ServletInvocableHandlerMethod 需要</p>
<ul>
<li>WebDataBinderFactory 负责对象绑定、类型转换</li>
<li>ParameterNameDiscoverer 负责参数名解析</li>
<li>HandlerMethodArgumentResolverComposite 负责解析参数</li>
<li>HandlerMethodReturnValueHandlerComposite 负责处理返回值</li>
</ul>
<h4 id="图2" tabindex="-1"><a class="header-anchor" href="#图2"><span>图2</span></a></h4>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant adapter as RequestMappingHandlerAdapter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant bf as WebDataBinderFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant mf as ModelFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant container as ModelAndViewContainer</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +bf: 准备 @InitBinder</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">bf -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +mf: 准备 @ModelAttribute</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mf ->> +container: 添加Model数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -mf: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mf -->> -adapter:</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="图3" tabindex="-1"><a class="header-anchor" href="#图3"><span>图3</span></a></h4>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant adapter as RequestMappingHandlerAdapter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ihm as ServletInvocableHandlerMethod</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ar as ArgumentResolvers</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant rh as ReturnValueHandlers</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant container as ModelAndViewContainer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +ihm: invokeAndHandle</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> +ar: 获取 args</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar ->> ar: 有的解析器涉及 RequestBodyAdvice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar ->> container: 有的解析器涉及数据绑定生成模型数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> ar: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar -->> -ihm: args</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> ihm: method.invoke(bean,args) 得到 returnValue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> +rh: 处理 returnValue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh ->> rh: 有的处理器涉及 ResponseBodyAdvice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh ->> +container: 添加Model数据,处理视图名,是否渲染等</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -rh: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh -->> -ihm: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +container: 获取 ModelAndView</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -adapter:</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_26-controlleradvice-之-modelattribute" tabindex="-1"><a class="header-anchor" href="#_26-controlleradvice-之-modelattribute"><span>26) @ControllerAdvice 之 @ModelAttribute</span></a></h3>
<h4 id="演示-准备-modelattribute" tabindex="-1"><a class="header-anchor" href="#演示-准备-modelattribute"><span>演示 - 准备 @ModelAttribute</span></a></h4>
<h5 id="代码参考-33" tabindex="-1"><a class="header-anchor" href="#代码参考-33"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a26</strong> 包</p>
<p><strong>准备 @ModelAttribute</strong> 在整个 HandlerAdapter 调用过程中所处的位置</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant adapter as HandlerAdapter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant bf as WebDataBinderFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant mf as ModelFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ihm as ServletInvocableHandlerMethod</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ar as ArgumentResolvers </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant rh as ReturnValueHandlers</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant container as ModelAndViewContainer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +bf: 准备 @InitBinder</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">bf -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rect rgb(200, 150, 255)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +mf: 准备 @ModelAttribute</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mf ->> +container: 添加Model数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -mf: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mf -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +ihm: invokeAndHandle</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> +ar: 获取 args</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar ->> ar: 有的解析器涉及 RequestBodyAdvice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar ->> container: 有的解析器涉及数据绑定生成Model数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar -->> -ihm: args</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> ihm: method.invoke(bean,args) 得到 returnValue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> +rh: 处理 returnValue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh ->> rh: 有的处理器涉及 ResponseBodyAdvice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh ->> +container: 添加Model数据,处理视图名,是否渲染等</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -rh: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh -->> -ihm: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +container: 获取 ModelAndView</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -adapter:</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-39" tabindex="-1"><a class="header-anchor" href="#收获💡-39"><span>收获💡</span></a></h4>
<ol>
<li>RequestMappingHandlerAdapter 初始化时会解析 @ControllerAdvice 中的 @ModelAttribute 方法</li>
<li>RequestMappingHandlerAdapter 会以类为单位，在该类首次使用时，解析此类的 @ModelAttribute 方法</li>
<li>以上两种 @ModelAttribute 的解析结果都会缓存来避免重复解析</li>
<li>控制器方法调用时，会综合利用本类的 @ModelAttribute 方法和 @ControllerAdvice 中的 @ModelAttribute 方法创建模型工厂</li>
</ol>
<h3 id="_27-返回值处理器" tabindex="-1"><a class="header-anchor" href="#_27-返回值处理器"><span>27) 返回值处理器</span></a></h3>
<h4 id="演示-常见返回值处理器" tabindex="-1"><a class="header-anchor" href="#演示-常见返回值处理器"><span>演示 - 常见返回值处理器</span></a></h4>
<h5 id="代码参考-34" tabindex="-1"><a class="header-anchor" href="#代码参考-34"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a27</strong> 包</p>
<h4 id="收获💡-40" tabindex="-1"><a class="header-anchor" href="#收获💡-40"><span>收获💡</span></a></h4>
<ol>
<li>常见的返回值处理器
<ul>
<li>ModelAndView，分别获取其模型和视图名，放入 ModelAndViewContainer</li>
<li>返回值类型为 String 时，把它当做视图名，放入 ModelAndViewContainer</li>
<li>返回值添加了 @ModelAttribute 注解时，将返回值作为模型，放入 ModelAndViewContainer
<ul>
<li>此时需找到默认视图名</li>
</ul>
</li>
<li>返回值省略 @ModelAttribute 注解且返回非简单类型时，将返回值作为模型，放入 ModelAndViewContainer
<ul>
<li>此时需找到默认视图名</li>
</ul>
</li>
<li>返回值类型为 ResponseEntity 时
<ul>
<li>此时走 MessageConverter，并设置 ModelAndViewContainer.requestHandled 为 true</li>
</ul>
</li>
<li>返回值类型为 HttpHeaders 时
<ul>
<li>会设置 ModelAndViewContainer.requestHandled 为 true</li>
</ul>
</li>
<li>返回值添加了 @ResponseBody 注解时
<ul>
<li>此时走 MessageConverter，并设置 ModelAndViewContainer.requestHandled 为 true</li>
</ul>
</li>
</ul>
</li>
<li>组合模式在 Spring 中的体现 + 1</li>
</ol>
<h3 id="_28-messageconverter" tabindex="-1"><a class="header-anchor" href="#_28-messageconverter"><span>28) MessageConverter</span></a></h3>
<h4 id="演示-messageconverter-的作用" tabindex="-1"><a class="header-anchor" href="#演示-messageconverter-的作用"><span>演示 - MessageConverter 的作用</span></a></h4>
<h5 id="代码参考-35" tabindex="-1"><a class="header-anchor" href="#代码参考-35"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a28.A28</strong></p>
<h4 id="收获💡-41" tabindex="-1"><a class="header-anchor" href="#收获💡-41"><span>收获💡</span></a></h4>
<ol>
<li>MessageConverter 的作用
<ul>
<li>@ResponseBody 是返回值处理器解析的</li>
<li>但具体转换工作是 MessageConverter 做的</li>
</ul>
</li>
<li>如何选择 MediaType
<ul>
<li>首先看 @RequestMapping 上有没有指定</li>
<li>其次看 request 的 Accept 头有没有指定</li>
<li>最后按 MessageConverter 的顺序, 谁能谁先转换</li>
</ul>
</li>
</ol>
<h3 id="_29-controlleradvice-之-responsebodyadvice" tabindex="-1"><a class="header-anchor" href="#_29-controlleradvice-之-responsebodyadvice"><span>29) @ControllerAdvice 之 ResponseBodyAdvice</span></a></h3>
<h4 id="演示-responsebodyadvice-增强" tabindex="-1"><a class="header-anchor" href="#演示-responsebodyadvice-增强"><span>演示 - ResponseBodyAdvice 增强</span></a></h4>
<h5 id="代码参考-36" tabindex="-1"><a class="header-anchor" href="#代码参考-36"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a29</strong> 包</p>
<p><strong>ResponseBodyAdvice 增强</strong> 在整个 HandlerAdapter 调用过程中所处的位置</p>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" data-title="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant adapter as HandlerAdapter</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant bf as WebDataBinderFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant mf as ModelFactory</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ihm as ServletInvocableHandlerMethod</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant ar as ArgumentResolvers </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant rh as ReturnValueHandlers</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">participant container as ModelAndViewContainer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +bf: 准备 @InitBinder</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">bf -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +mf: 准备 @ModelAttribute</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mf ->> +container: 添加Model数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -mf: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mf -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +ihm: invokeAndHandle</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> +ar: 获取 args</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar ->> ar: 有的解析器涉及 RequestBodyAdvice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar ->> container: 有的解析器涉及数据绑定生成Model数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ar -->> -ihm: args</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> ihm: method.invoke(bean,args) 得到 returnValue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm ->> +rh: 处理 returnValue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rect rgb(200, 150, 255)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh ->> rh: 有的处理器涉及 ResponseBodyAdvice</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh ->> +container: 添加Model数据,处理视图名,是否渲染等</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -rh: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">rh -->> -ihm: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ihm -->> -adapter: </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">adapter ->> +container: 获取 ModelAndView</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">container -->> -adapter:</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-42" tabindex="-1"><a class="header-anchor" href="#收获💡-42"><span>收获💡</span></a></h4>
<ol>
<li>ResponseBodyAdvice 返回响应体前包装</li>
</ol>
<h3 id="_30-异常解析器" tabindex="-1"><a class="header-anchor" href="#_30-异常解析器"><span>30) 异常解析器</span></a></h3>
<h4 id="演示-exceptionhandlerexceptionresolver" tabindex="-1"><a class="header-anchor" href="#演示-exceptionhandlerexceptionresolver"><span>演示 - ExceptionHandlerExceptionResolver</span></a></h4>
<h5 id="代码参考-37" tabindex="-1"><a class="header-anchor" href="#代码参考-37"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a30.A30</strong></p>
<h4 id="收获💡-43" tabindex="-1"><a class="header-anchor" href="#收获💡-43"><span>收获💡</span></a></h4>
<ol>
<li>它能够重用参数解析器、返回值处理器，实现组件重用</li>
<li>它能够支持嵌套异常</li>
</ol>
<h3 id="_31-controlleradvice-之-exceptionhandler" tabindex="-1"><a class="header-anchor" href="#_31-controlleradvice-之-exceptionhandler"><span>31) @ControllerAdvice 之 @ExceptionHandler</span></a></h3>
<h4 id="演示-准备-exceptionhandler" tabindex="-1"><a class="header-anchor" href="#演示-准备-exceptionhandler"><span>演示 - 准备 @ExceptionHandler</span></a></h4>
<h5 id="代码参考-38" tabindex="-1"><a class="header-anchor" href="#代码参考-38"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a31</strong> 包</p>
<h4 id="收获💡-44" tabindex="-1"><a class="header-anchor" href="#收获💡-44"><span>收获💡</span></a></h4>
<ol>
<li>ExceptionHandlerExceptionResolver 初始化时会解析 @ControllerAdvice 中的 @ExceptionHandler 方法</li>
<li>ExceptionHandlerExceptionResolver 会以类为单位，在该类首次处理异常时，解析此类的 @ExceptionHandler 方法</li>
<li>以上两种 @ExceptionHandler 的解析结果都会缓存来避免重复解析</li>
</ol>
<h3 id="_32-tomcat-异常处理" tabindex="-1"><a class="header-anchor" href="#_32-tomcat-异常处理"><span>32) Tomcat 异常处理</span></a></h3>
<ul>
<li>
<p>我们知道 @ExceptionHandler 只能处理发生在 mvc 流程中的异常，例如控制器内、拦截器内，那么如果是 Filter 出现了异常，如何进行处理呢？</p>
</li>
<li>
<p>在 Spring Boot 中，是这么实现的：</p>
<ol>
<li>因为内嵌了 Tomcat 容器，因此可以配置 Tomcat 的错误页面，Filter 与 错误页面之间是通过请求转发跳转的，可以在这里做手脚</li>
<li>先通过 ErrorPageRegistrarBeanPostProcessor 这个后处理器配置错误页面地址，默认为 <code v-pre>/error</code> 也可以通过 <code v-pre>${server.error.path}</code> 进行配置</li>
<li>当 Filter 发生异常时，不会走 Spring 流程，但会走 Tomcat 的错误处理，于是就希望转发至 <code v-pre>/error</code> 这个地址
<ul>
<li>当然，如果没有 @ExceptionHandler，那么最终也会走到 Tomcat 的错误处理</li>
</ul>
</li>
<li>Spring Boot 又提供了一个 BasicErrorController，它就是一个标准 @Controller，@RequestMapping 配置为 <code v-pre>/error</code>，所以处理异常的职责就又回到了 Spring</li>
<li>异常信息由于会被 Tomcat 放入 request 作用域，因此 BasicErrorController 里也能获取到</li>
<li>具体异常信息会由 DefaultErrorAttributes 封装好</li>
<li>BasicErrorController 通过 Accept 头判断需要生成哪种 MediaType 的响应
<ul>
<li>如果要的不是 text/html，走 MessageConverter 流程</li>
<li>如果需要 text/html，走 mvc 流程，此时又分两种情况
<ul>
<li>配置了 ErrorViewResolver，根据状态码去找 View</li>
<li>没配置或没找到，用 BeanNameViewResolver 根据一个固定为 error 的名字找到 View，即所谓的 WhitelabelErrorView</li>
</ul>
</li>
</ul>
</li>
</ol>
</li>
</ul>
<blockquote>
<p><em><strong>评价</strong></em></p>
<ul>
<li>一个错误处理搞得这么复杂，就问恶心不？</li>
</ul>
</blockquote>
<h4 id="演示1-错误页处理" tabindex="-1"><a class="header-anchor" href="#演示1-错误页处理"><span>演示1 - 错误页处理</span></a></h4>
<h5 id="关键代码-1" tabindex="-1"><a class="header-anchor" href="#关键代码-1"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // ⬅️修改了 Tomcat 服务器默认错误地址, 出错时使用请求转发方式跳转</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ErrorPageRegistrar</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> errorPageRegistrar</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> webServerFactory </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> webServerFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addErrorPages</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ErrorPage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/error"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">));</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // ⬅️TomcatServletWebServerFactory 初始化前用它增强, 注册所有 ErrorPageRegistrar</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ErrorPageRegistrarBeanPostProcessor</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> errorPageRegistrarBeanPostProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ErrorPageRegistrarBeanPostProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-45" tabindex="-1"><a class="header-anchor" href="#收获💡-45"><span>收获💡</span></a></h4>
<ol>
<li>Tomcat 的错误页处理手段</li>
</ol>
<h4 id="演示2-basicerrorcontroller" tabindex="-1"><a class="header-anchor" href="#演示2-basicerrorcontroller"><span>演示2 - BasicErrorController</span></a></h4>
<h5 id="关键代码-2" tabindex="-1"><a class="header-anchor" href="#关键代码-2"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // ⬅️ErrorProperties 封装环境键值, ErrorAttributes 控制有哪些错误信息</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BasicErrorController</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> basicErrorController</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    ErrorProperties</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> errorProperties </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ErrorProperties</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    errorProperties</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setIncludeException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> BasicErrorController</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> DefaultErrorAttributes</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> errorProperties)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // ⬅️名称为 error 的视图, 作为 BasicErrorController 的 text/html 响应结果</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> View</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> error</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> View</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> render</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            Map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">> </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            HttpServletRequest</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            HttpServletResponse</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> response</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Exception</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(model);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setContentType</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"text/html;charset=utf-8"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"""</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                    &#x3C;h3>服务器内部错误&#x3C;/h3></span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                    """</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    }</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // ⬅️收集容器中所有 View 对象, bean 的名字作为视图名</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ViewResolver</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> viewResolver</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> BeanNameViewResolver</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-46" tabindex="-1"><a class="header-anchor" href="#收获💡-46"><span>收获💡</span></a></h4>
<ol>
<li>Spring Boot 中 BasicErrorController 如何工作</li>
</ol>
<h3 id="_33-beannameurlhandlermapping-与-simplecontrollerhandleradapter" tabindex="-1"><a class="header-anchor" href="#_33-beannameurlhandlermapping-与-simplecontrollerhandleradapter"><span>33) BeanNameUrlHandlerMapping 与 SimpleControllerHandlerAdapter</span></a></h3>
<h4 id="演示-本组映射器和适配器" tabindex="-1"><a class="header-anchor" href="#演示-本组映射器和适配器"><span>演示 - 本组映射器和适配器</span></a></h4>
<h5 id="关键代码-3" tabindex="-1"><a class="header-anchor" href="#关键代码-3"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BeanNameUrlHandlerMapping</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> beanNameUrlHandlerMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> BeanNameUrlHandlerMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SimpleControllerHandlerAdapter</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> simpleControllerHandlerAdapter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> SimpleControllerHandlerAdapter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/c3"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Controller</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> controller3</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> response) </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"this is c3"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    }</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-47" tabindex="-1"><a class="header-anchor" href="#收获💡-47"><span>收获💡</span></a></h4>
<ol>
<li>BeanNameUrlHandlerMapping，以 / 开头的 bean 的名字会被当作映射路径</li>
<li>这些 bean 本身当作 handler，要求实现 Controller 接口</li>
<li>SimpleControllerHandlerAdapter，调用 handler</li>
<li>模拟实现这组映射器和适配器</li>
</ol>
<h3 id="_34-routerfunctionmapping-与-handlerfunctionadapter" tabindex="-1"><a class="header-anchor" href="#_34-routerfunctionmapping-与-handlerfunctionadapter"><span>34) RouterFunctionMapping 与 HandlerFunctionAdapter</span></a></h3>
<h4 id="演示-本组映射器和适配器-1" tabindex="-1"><a class="header-anchor" href="#演示-本组映射器和适配器-1"><span>演示 - 本组映射器和适配器</span></a></h4>
<h5 id="关键代码-4" tabindex="-1"><a class="header-anchor" href="#关键代码-4"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> RouterFunctionMapping</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> routerFunctionMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> RouterFunctionMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> HandlerFunctionAdapter</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> handlerFunctionAdapter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> HandlerFunctionAdapter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> RouterFunction</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">ServerResponse</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> r1</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    //           ⬇️映射条件   ⬇️handler</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> route</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">GET</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/r1"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> request </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">-></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ok</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">body</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"this is r1"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-48" tabindex="-1"><a class="header-anchor" href="#收获💡-48"><span>收获💡</span></a></h4>
<ol>
<li>RouterFunctionMapping, 通过 RequestPredicate 条件映射</li>
<li>handler 要实现 HandlerFunction 接口</li>
<li>HandlerFunctionAdapter, 调用 handler</li>
</ol>
<h3 id="_35-simpleurlhandlermapping-与-httprequesthandleradapter" tabindex="-1"><a class="header-anchor" href="#_35-simpleurlhandlermapping-与-httprequesthandleradapter"><span>35) SimpleUrlHandlerMapping 与 HttpRequestHandlerAdapter</span></a></h3>
<h4 id="演示1-本组映射器和适配器" tabindex="-1"><a class="header-anchor" href="#演示1-本组映射器和适配器"><span>演示1 - 本组映射器和适配器</span></a></h4>
<h5 id="代码参考-39" tabindex="-1"><a class="header-anchor" href="#代码参考-39"><span>代码参考</span></a></h5>
<p><strong>org.springframework.boot.autoconfigure.web.servlet.A35</strong></p>
<h5 id="关键代码-5" tabindex="-1"><a class="header-anchor" href="#关键代码-5"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SimpleUrlHandlerMapping</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> simpleUrlHandlerMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ApplicationContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> context) {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    SimpleUrlHandlerMapping</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> handlerMapping </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> SimpleUrlHandlerMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Map</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> ResourceHttpRequestHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> map </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">        =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBeansOfType</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">ResourceHttpRequestHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    handlerMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setUrlMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(map);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> handlerMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> HttpRequestHandlerAdapter</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> httpRequestHandlerAdapter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> HttpRequestHandlerAdapter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/**"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ResourceHttpRequestHandler</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> handler1</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    ResourceHttpRequestHandler</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> handler </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ResourceHttpRequestHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    handler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setLocations</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">List</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">of</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ClassPathResource</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"static/"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)));</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> handler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/img/**"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ResourceHttpRequestHandler</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> handler2</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    ResourceHttpRequestHandler</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> handler </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ResourceHttpRequestHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    handler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setLocations</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">List</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">of</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ClassPathResource</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"images/"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)));</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> handler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-49" tabindex="-1"><a class="header-anchor" href="#收获💡-49"><span>收获💡</span></a></h4>
<ol>
<li>SimpleUrlHandlerMapping 不会在初始化时收集映射信息，需要手动收集</li>
<li>SimpleUrlHandlerMapping 映射路径</li>
<li>ResourceHttpRequestHandler 作为静态资源 handler</li>
<li>HttpRequestHandlerAdapter, 调用此 handler</li>
</ol>
<h4 id="演示2-静态资源解析优化" tabindex="-1"><a class="header-anchor" href="#演示2-静态资源解析优化"><span>演示2 - 静态资源解析优化</span></a></h4>
<h5 id="关键代码-6" tabindex="-1"><a class="header-anchor" href="#关键代码-6"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/**"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ResourceHttpRequestHandler</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> handler1</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    ResourceHttpRequestHandler</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> handler </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ResourceHttpRequestHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    handler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setLocations</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">List</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">of</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ClassPathResource</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"static/"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)));</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    handler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setResourceResolvers</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">List</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">of</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        	// ⬇️缓存优化</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> CachingResourceResolver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ConcurrentMapCache</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"cache1"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)),</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        	// ⬇️压缩优化</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> EncodedResourceResolver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(),</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        	// ⬇️原始资源解析</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> PathResourceResolver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    ));</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> handler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-50" tabindex="-1"><a class="header-anchor" href="#收获💡-50"><span>收获💡</span></a></h4>
<ol>
<li>责任链模式体现</li>
<li>压缩文件需要手动生成</li>
</ol>
<h4 id="演示3-欢迎页" tabindex="-1"><a class="header-anchor" href="#演示3-欢迎页"><span>演示3 - 欢迎页</span></a></h4>
<h5 id="关键代码-7" tabindex="-1"><a class="header-anchor" href="#关键代码-7"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> WelcomePageHandlerMapping</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> welcomePageHandlerMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ApplicationContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> context) {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Resource</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> resource </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getResource</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"classpath:static/index.html"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> WelcomePageHandlerMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> resource</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "/**"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SimpleControllerHandlerAdapter</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> simpleControllerHandlerAdapter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> SimpleControllerHandlerAdapter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-51" tabindex="-1"><a class="header-anchor" href="#收获💡-51"><span>收获💡</span></a></h4>
<ol>
<li>欢迎页支持静态欢迎页与动态欢迎页</li>
<li>WelcomePageHandlerMapping 映射欢迎页（即只映射 '/'）
<ul>
<li>它内置的 handler ParameterizableViewController 作用是不执行逻辑，仅根据视图名找视图</li>
<li>视图名固定为 forward:index.html</li>
</ul>
</li>
<li>SimpleControllerHandlerAdapter, 调用 handler
<ul>
<li>转发至 /index.html</li>
<li>处理 /index.html 又会走上面的静态资源处理流程</li>
</ul>
</li>
</ol>
<h4 id="映射器与适配器小结" tabindex="-1"><a class="header-anchor" href="#映射器与适配器小结"><span>映射器与适配器小结</span></a></h4>
<ol>
<li>HandlerMapping 负责建立请求与控制器之间的映射关系
<ul>
<li>RequestMappingHandlerMapping (与 @RequestMapping 匹配)</li>
<li>WelcomePageHandlerMapping    (/)</li>
<li>BeanNameUrlHandlerMapping    (与 bean 的名字匹配 以 / 开头)</li>
<li>RouterFunctionMapping        (函数式 RequestPredicate, HandlerFunction)</li>
<li>SimpleUrlHandlerMapping      (静态资源 通配符 /** /img/**)</li>
<li>之间也会有顺序问题, boot 中默认顺序如上</li>
</ul>
</li>
<li>HandlerAdapter 负责实现对各种各样的 handler 的适配调用
<ul>
<li>RequestMappingHandlerAdapter 处理：@RequestMapping 方法
<ul>
<li>参数解析器、返回值处理器体现了组合模式</li>
</ul>
</li>
<li>SimpleControllerHandlerAdapter 处理：Controller 接口</li>
<li>HandlerFunctionAdapter 处理：HandlerFunction 函数式接口</li>
<li>HttpRequestHandlerAdapter 处理：HttpRequestHandler 接口 (静态资源处理)</li>
<li>这也是典型适配器模式体现</li>
</ul>
</li>
</ol>
<h3 id="_36-mvc-处理流程" tabindex="-1"><a class="header-anchor" href="#_36-mvc-处理流程"><span>36) mvc 处理流程</span></a></h3>
<p>当浏览器发送一个请求 <code v-pre>http://localhost:8080/hello</code> 后，请求到达服务器，其处理流程是：</p>
<ol>
<li>
<p>服务器提供了 DispatcherServlet，它使用的是标准 Servlet 技术</p>
<ul>
<li>路径：默认映射路径为 <code v-pre>/</code>，即会匹配到所有请求 URL，可作为请求的统一入口，也被称之为<strong>前控制器</strong>
<ul>
<li>jsp 不会匹配到 DispatcherServlet</li>
<li>其它有路径的 Servlet 匹配优先级也高于 DispatcherServlet</li>
</ul>
</li>
<li>创建：在 Boot 中，由 DispatcherServletAutoConfiguration 这个自动配置类提供 DispatcherServlet 的 bean</li>
<li>初始化：DispatcherServlet 初始化时会优先到容器里寻找各种组件，作为它的成员变量
<ul>
<li>HandlerMapping，初始化时记录映射关系</li>
<li>HandlerAdapter，初始化时准备参数解析器、返回值处理器、消息转换器</li>
<li>HandlerExceptionResolver，初始化时准备参数解析器、返回值处理器、消息转换器</li>
<li>ViewResolver</li>
</ul>
</li>
</ul>
</li>
<li>
<p>DispatcherServlet 会利用 RequestMappingHandlerMapping 查找控制器方法</p>
<ul>
<li>
<p>例如根据 /hello 路径找到 @RequestMapping(&quot;/hello&quot;) 对应的控制器方法</p>
</li>
<li>
<p>控制器方法会被封装为 HandlerMethod 对象，并结合匹配到的拦截器一起返回给 DispatcherServlet</p>
</li>
<li>
<p>HandlerMethod 和拦截器合在一起称为 HandlerExecutionChain（调用链）对象</p>
</li>
</ul>
</li>
<li>
<p>DispatcherServlet 接下来会：</p>
<ol>
<li>调用拦截器的 preHandle 方法</li>
<li>RequestMappingHandlerAdapter 调用 handle 方法，准备数据绑定工厂、模型工厂、ModelAndViewContainer、将 HandlerMethod 完善为 ServletInvocableHandlerMethod
<ul>
<li>@ControllerAdvice 全局增强点1️⃣：补充模型数据</li>
<li>@ControllerAdvice 全局增强点2️⃣：补充自定义类型转换器</li>
<li>使用 HandlerMethodArgumentResolver 准备参数
<ul>
<li>@ControllerAdvice 全局增强点3️⃣：RequestBody 增强</li>
</ul>
</li>
<li>调用 ServletInvocableHandlerMethod</li>
<li>使用 HandlerMethodReturnValueHandler 处理返回值
<ul>
<li>@ControllerAdvice 全局增强点4️⃣：ResponseBody 增强</li>
</ul>
</li>
<li>根据 ModelAndViewContainer 获取 ModelAndView
<ul>
<li>如果返回的 ModelAndView 为 null，不走第 4 步视图解析及渲染流程
<ul>
<li>例如，有的返回值处理器调用了 HttpMessageConverter 来将结果转换为 JSON，这时 ModelAndView 就为 null</li>
</ul>
</li>
<li>如果返回的 ModelAndView 不为 null，会在第 4 步走视图解析及渲染流程</li>
</ul>
</li>
</ul>
</li>
<li>调用拦截器的 postHandle 方法</li>
<li>处理异常或视图渲染
<ul>
<li>如果 1~3 出现异常，走 ExceptionHandlerExceptionResolver 处理异常流程
<ul>
<li>@ControllerAdvice 全局增强点5️⃣：@ExceptionHandler 异常处理</li>
</ul>
</li>
<li>正常，走视图解析及渲染流程</li>
</ul>
</li>
<li>调用拦截器的 afterCompletion 方法</li>
</ol>
</li>
</ol>
<h2 id="boot" tabindex="-1"><a class="header-anchor" href="#boot"><span>Boot</span></a></h2>
<h3 id="_37-boot-骨架项目" tabindex="-1"><a class="header-anchor" href="#_37-boot-骨架项目"><span>37) Boot 骨架项目</span></a></h3>
<p>如果是 linux 环境，用以下命令即可获取 spring boot 的骨架 pom.xml</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -G</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://start.spring.io/pom.xml</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dependencies=web,mysql,mybatis</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pom.xml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>也可以使用 Postman 等工具实现</p>
<p>若想获取更多用法，请参考</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://start.spring.io</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_38-boot-war项目" tabindex="-1"><a class="header-anchor" href="#_38-boot-war项目"><span>38) Boot War项目</span></a></h3>
<p>步骤1：创建模块，区别在于打包方式选择 war</p>
<img src="img/image-20211021160145072.png" alt="image-20211021160145072" style="zoom: 50%;" />
<p>接下来勾选 Spring Web 支持</p>
<img src="img/image-20211021162416525.png" alt="image-20211021162416525" style="zoom:50%;" />
<p>步骤2：编写控制器</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Controller</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> MyController</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">RequestMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/hello"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> abc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"进入了控制器"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "hello"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>步骤3：编写 jsp 视图，新建 webapp 目录和一个 hello.jsp 文件，注意文件名与控制器方法返回的视图逻辑名一致</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>src</span></span>
<span class="line"><span>	|- main</span></span>
<span class="line"><span>		|- java</span></span>
<span class="line"><span>		|- resources</span></span>
<span class="line"><span>		|- webapp</span></span>
<span class="line"><span>			|- hello.jsp</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>步骤4：配置视图路径，打开 application.properties 文件</p>
<div class="language-properties line-numbers-mode" data-highlighter="shiki" data-ext="properties" data-title="properties" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">spring.mvc.view.prefix</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">/</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">spring.mvc.view.suffix</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">.jsp</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>将来 prefix + 控制器方法返回值 + suffix 即为视图完整路径</p>
</blockquote>
<h4 id="测试" tabindex="-1"><a class="header-anchor" href="#测试"><span>测试</span></a></h4>
<p>如果用 mvn 插件 <code v-pre>mvn spring-boot:run</code> 或 main 方法测试</p>
<ul>
<li>必须添加如下依赖，因为此时用的还是内嵌 tomcat，而内嵌 tomcat 默认不带 jasper（用来解析 jsp）</li>
</ul>
<div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>org.apache.tomcat.embed&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>tomcat-embed-jasper&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>provided&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用 Idea 配置 tomcat 来测试，此时用的是外置 tomcat</p>
<ul>
<li>骨架生成的代码中，多了一个 ServletInitializer，它的作用就是配置外置 Tomcat 使用的，在外置 Tomcat 启动后，去调用它创建和运行 SpringApplication</li>
</ul>
<h4 id="启示" tabindex="-1"><a class="header-anchor" href="#启示"><span>启示</span></a></h4>
<p>对于 jar 项目，若要支持 jsp，也可以在加入 jasper 依赖的前提下，把 jsp 文件置入 <code v-pre>META-INF/resources</code></p>
<h3 id="_39-boot-启动过程" tabindex="-1"><a class="header-anchor" href="#_39-boot-启动过程"><span>39) Boot 启动过程</span></a></h3>
<p>阶段一：SpringApplication 构造</p>
<ol>
<li>记录 BeanDefinition 源</li>
<li>推断应用类型</li>
<li>记录 ApplicationContext 初始化器</li>
<li>记录监听器</li>
<li>推断主启动类</li>
</ol>
<p>阶段二：执行 run 方法</p>
<ol>
<li>
<p>得到 SpringApplicationRunListeners，名字取得不好，实际是事件发布器</p>
<ul>
<li>发布 application starting 事件1️⃣</li>
</ul>
</li>
<li>
<p>封装启动 args</p>
</li>
<li>
<p>准备 Environment 添加命令行参数（*）</p>
</li>
<li>
<p>ConfigurationPropertySources 处理（*）</p>
<ul>
<li>发布 application environment 已准备事件2️⃣</li>
</ul>
</li>
<li>
<p>通过 EnvironmentPostProcessorApplicationListener 进行 env 后处理（*）</p>
<ul>
<li>application.properties，由 StandardConfigDataLocationResolver 解析</li>
<li>spring.application.json</li>
</ul>
</li>
<li>
<p>绑定 spring.main 到 SpringApplication 对象（*）</p>
</li>
<li>
<p>打印 banner（*）</p>
</li>
<li>
<p>创建容器</p>
</li>
<li>
<p>准备容器</p>
<ul>
<li>发布 application context 已初始化事件3️⃣</li>
</ul>
</li>
<li>
<p>加载 bean 定义</p>
<ul>
<li>发布 application prepared 事件4️⃣</li>
</ul>
</li>
<li>
<p>refresh 容器</p>
<ul>
<li>发布 application started 事件5️⃣</li>
</ul>
</li>
<li>
<p>执行 runner</p>
<ul>
<li>
<p>发布 application ready 事件6️⃣</p>
</li>
<li>
<p>这其中有异常，发布 application failed 事件7️⃣</p>
</li>
</ul>
</li>
</ol>
<blockquote>
<p>带 * 的有独立的示例</p>
</blockquote>
<h4 id="演示-启动过程" tabindex="-1"><a class="header-anchor" href="#演示-启动过程"><span>演示 - 启动过程</span></a></h4>
<p><strong>com.itheima.a39.A39_1</strong> 对应 SpringApplication 构造</p>
<p><strong>com.itheima.a39.A39_2</strong> 对应第1步，并演示 7 个事件</p>
<p><strong>com.itheima.a39.A39_3</strong> 对应第2、8到12步</p>
<p><strong>org.springframework.boot.Step3</strong></p>
<p><strong>org.springframework.boot.Step4</strong></p>
<p><strong>org.springframework.boot.Step5</strong></p>
<p><strong>org.springframework.boot.Step6</strong></p>
<p><strong>org.springframework.boot.Step7</strong></p>
<h4 id="收获💡-52" tabindex="-1"><a class="header-anchor" href="#收获💡-52"><span>收获💡</span></a></h4>
<ol>
<li>SpringApplication 构造方法中所做的操作
<ul>
<li>可以有多种源用来加载 bean 定义</li>
<li>应用类型推断</li>
<li>添加容器初始化器</li>
<li>添加监听器</li>
<li>演示主类推断</li>
</ul>
</li>
<li>如何读取 spring.factories 中的配置</li>
<li>从配置中获取重要的事件发布器：SpringApplicationRunListeners</li>
<li>容器的创建、初始化器增强、加载 bean 定义等</li>
<li>CommandLineRunner、ApplicationRunner 的作用</li>
<li>环境对象
<ol>
<li>命令行 PropertySource</li>
<li>ConfigurationPropertySources 规范环境键名称</li>
<li>EnvironmentPostProcessor 后处理增强
<ul>
<li>由 EventPublishingRunListener 通过监听事件2️⃣来调用</li>
</ul>
</li>
<li>绑定 spring.main 前缀的 key value 至 SpringApplication</li>
</ol>
</li>
<li>Banner</li>
</ol>
<h3 id="_40-tomcat-内嵌容器" tabindex="-1"><a class="header-anchor" href="#_40-tomcat-内嵌容器"><span>40) Tomcat 内嵌容器</span></a></h3>
<p>Tomcat 基本结构</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Server</span></span>
<span class="line"><span>└───Service</span></span>
<span class="line"><span>    ├───Connector (协议, 端口)</span></span>
<span class="line"><span>    └───Engine</span></span>
<span class="line"><span>        └───Host(虚拟主机 localhost)</span></span>
<span class="line"><span>            ├───Context1 (应用1, 可以设置虚拟路径, / 即 url 起始路径; 项目磁盘路径, 即 docBase )</span></span>
<span class="line"><span>            │   │   index.html</span></span>
<span class="line"><span>            │   └───WEB-INF</span></span>
<span class="line"><span>            │       │   web.xml (servlet, filter, listener) 3.0</span></span>
<span class="line"><span>            │       ├───classes (servlet, controller, service ...)</span></span>
<span class="line"><span>            │       ├───jsp</span></span>
<span class="line"><span>            │       └───lib (第三方 jar 包)</span></span>
<span class="line"><span>            └───Context2 (应用2)</span></span>
<span class="line"><span>                │   index.html</span></span>
<span class="line"><span>                └───WEB-INF</span></span>
<span class="line"><span>                        web.xml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="演示1-tomcat-内嵌容器" tabindex="-1"><a class="header-anchor" href="#演示1-tomcat-内嵌容器"><span>演示1 - Tomcat 内嵌容器</span></a></h4>
<h5 id="关键代码-8" tabindex="-1"><a class="header-anchor" href="#关键代码-8"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">[] args) throws LifecycleException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> IOException {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 1.创建 Tomcat 对象</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Tomcat</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> tomcat </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Tomcat</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    tomcat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setBaseDir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tomcat"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 2.创建项目文件夹, 即 docBase 文件夹</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    File</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> docBase </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> Files</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">createTempDirectory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"boot."</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toFile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    docBase</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">deleteOnExit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 3.创建 Tomcat 项目, 在 Tomcat 中称为 Context</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Context</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> context </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> tomcat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">""</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">docBase</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getAbsolutePath</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 4.编程添加 Servlet</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addServletContainerInitializer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ServletContainerInitializer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> onStartup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>> </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">c</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ServletContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> ctx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ServletException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            HelloServlet</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> helloServlet</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> HelloServlet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            ctx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addServlet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"aaa"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, helloServlet).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/hello"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Collections</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">emptySet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 5.启动 Tomcat</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    tomcat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">start</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 6.创建连接器, 设置监听端口</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Connector</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> connector </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Connector</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Http11Nio2Protocol</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">())</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    connector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setPort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">8080</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    tomcat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setConnector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(connector);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="演示2-集成-spring-容器" tabindex="-1"><a class="header-anchor" href="#演示2-集成-spring-容器"><span>演示2 - 集成 Spring 容器</span></a></h4>
<h5 id="关键代码-9" tabindex="-1"><a class="header-anchor" href="#关键代码-9"><span>关键代码</span></a></h5>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">WebApplicationContext</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> springContext </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getApplicationContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">// 4.编程添加 Servlet</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addServletContainerInitializer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ServletContainerInitializer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> onStartup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>> </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">c</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ServletContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> ctx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ServletException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // ⬇️通过 ServletRegistrationBean 添加 DispatcherServlet 等</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ServletRegistrationBean</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> registrationBean</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> :</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">             springContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getBeansOfType</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">ServletRegistrationBean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">values</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            registrationBean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">onStartup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(ctx);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">Collections</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">emptySet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_41-boot-自动配置" tabindex="-1"><a class="header-anchor" href="#_41-boot-自动配置"><span>41) Boot 自动配置</span></a></h3>
<h4 id="aopautoconfiguration" tabindex="-1"><a class="header-anchor" href="#aopautoconfiguration"><span>AopAutoConfiguration</span></a></h4>
<p>Spring Boot 是利用了自动配置类来简化了 aop 相关配置</p>
<ul>
<li>AOP 自动配置类为 <code v-pre>org.springframework.boot.autoconfigure.aop.AopAutoConfiguration</code></li>
<li>可以通过 <code v-pre>spring.aop.auto=false</code> 禁用 aop 自动配置</li>
<li>AOP 自动配置的本质是通过 <code v-pre>@EnableAspectJAutoProxy</code> 来开启了自动代理，如果在引导类上自己添加了 <code v-pre>@EnableAspectJAutoProxy</code> 那么以自己添加的为准</li>
<li><code v-pre>@EnableAspectJAutoProxy</code> 的本质是向容器中添加了 <code v-pre>AnnotationAwareAspectJAutoProxyCreator</code> 这个 bean 后处理器，它能够找到容器中所有切面，并为匹配切点的目标类创建代理，创建代理的工作一般是在 bean 的初始化阶段完成的</li>
</ul>
<h4 id="datasourceautoconfiguration" tabindex="-1"><a class="header-anchor" href="#datasourceautoconfiguration"><span>DataSourceAutoConfiguration</span></a></h4>
<ul>
<li>对应的自动配置类为：org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration</li>
<li>它内部采用了条件装配，通过检查容器的 bean，以及类路径下的 class，来决定该 @Bean 是否生效</li>
</ul>
<p>简单说明一下，Spring Boot 支持两大类数据源：</p>
<ul>
<li>EmbeddedDatabase - 内嵌数据库连接池</li>
<li>PooledDataSource - 非内嵌数据库连接池</li>
</ul>
<p>PooledDataSource 又支持如下数据源</p>
<ul>
<li>hikari 提供的 HikariDataSource</li>
<li>tomcat-jdbc 提供的 DataSource</li>
<li>dbcp2 提供的 BasicDataSource</li>
<li>oracle 提供的 PoolDataSourceImpl</li>
</ul>
<p>如果知道数据源的实现类类型，即指定了 <code v-pre>spring.datasource.type</code>，理论上可以支持所有数据源，但这样做的一个最大问题是无法订制每种数据源的详细配置（如最大、最小连接数等）</p>
<h4 id="mybatisautoconfiguration" tabindex="-1"><a class="header-anchor" href="#mybatisautoconfiguration"><span>MybatisAutoConfiguration</span></a></h4>
<ul>
<li>MyBatis 自动配置类为 <code v-pre>org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration</code></li>
<li>它主要配置了两个 bean
<ul>
<li>SqlSessionFactory - MyBatis 核心对象，用来创建 SqlSession</li>
<li>SqlSessionTemplate - SqlSession 的实现，此实现会与当前线程绑定</li>
<li>用 ImportBeanDefinitionRegistrar 的方式扫描所有标注了 @Mapper 注解的接口</li>
<li>用 AutoConfigurationPackages 来确定扫描的包</li>
</ul>
</li>
<li>还有一个相关的 bean：MybatisProperties，它会读取配置文件中带 <code v-pre>mybatis.</code> 前缀的配置项进行定制配置</li>
</ul>
<p>@MapperScan 注解的作用与 MybatisAutoConfiguration 类似，会注册 MapperScannerConfigurer 有如下区别</p>
<ul>
<li>@MapperScan 扫描具体包（当然也可以配置关注哪个注解）</li>
<li>@MapperScan 如果不指定扫描具体包，则会把引导类范围内，所有接口当做 Mapper 接口</li>
<li>MybatisAutoConfiguration 关注的是所有标注 @Mapper 注解的接口，会忽略掉非 @Mapper 标注的接口</li>
</ul>
<p>这里有同学有疑问，之前介绍的都是将具体类交给 Spring 管理，怎么到了 MyBatis 这儿，接口就可以被管理呢？</p>
<ul>
<li>其实并非将接口交给 Spring 管理，而是每个接口会对应一个 MapperFactoryBean，是后者被 Spring 所管理，接口只是作为 MapperFactoryBean 的一个属性来配置</li>
</ul>
<h4 id="transactionautoconfiguration" tabindex="-1"><a class="header-anchor" href="#transactionautoconfiguration"><span>TransactionAutoConfiguration</span></a></h4>
<ul>
<li>
<p>事务自动配置类有两个：</p>
<ul>
<li><code v-pre>org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration</code></li>
<li><code v-pre>org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration</code></li>
</ul>
</li>
<li>
<p>前者配置了 DataSourceTransactionManager 用来执行事务的提交、回滚操作</p>
</li>
<li>
<p>后者功能上对标 @EnableTransactionManagement，包含以下三个 bean</p>
<ul>
<li>BeanFactoryTransactionAttributeSourceAdvisor 事务切面类，包含通知和切点</li>
<li>TransactionInterceptor 事务通知类，由它在目标方法调用前后加入事务操作</li>
<li>AnnotationTransactionAttributeSource 会解析 @Transactional 及事务属性，也包含了切点功能</li>
</ul>
</li>
<li>
<p>如果自己配置了 DataSourceTransactionManager 或是在引导类加了 @EnableTransactionManagement，则以自己配置的为准</p>
</li>
</ul>
<h4 id="servletwebserverfactoryautoconfiguration" tabindex="-1"><a class="header-anchor" href="#servletwebserverfactoryautoconfiguration"><span>ServletWebServerFactoryAutoConfiguration</span></a></h4>
<ul>
<li>提供 ServletWebServerFactory</li>
</ul>
<h4 id="dispatcherservletautoconfiguration" tabindex="-1"><a class="header-anchor" href="#dispatcherservletautoconfiguration"><span>DispatcherServletAutoConfiguration</span></a></h4>
<ul>
<li>提供 DispatcherServlet</li>
<li>提供 DispatcherServletRegistrationBean</li>
</ul>
<h4 id="webmvcautoconfiguration" tabindex="-1"><a class="header-anchor" href="#webmvcautoconfiguration"><span>WebMvcAutoConfiguration</span></a></h4>
<ul>
<li>配置 DispatcherServlet 的各项组件，提供的 bean 见过的有
<ul>
<li>多项 HandlerMapping</li>
<li>多项 HandlerAdapter</li>
<li>HandlerExceptionResolver</li>
</ul>
</li>
</ul>
<h4 id="errormvcautoconfiguration" tabindex="-1"><a class="header-anchor" href="#errormvcautoconfiguration"><span>ErrorMvcAutoConfiguration</span></a></h4>
<ul>
<li>提供的 bean 有 BasicErrorController</li>
</ul>
<h4 id="multipartautoconfiguration" tabindex="-1"><a class="header-anchor" href="#multipartautoconfiguration"><span>MultipartAutoConfiguration</span></a></h4>
<ul>
<li>它提供了 org.springframework.web.multipart.support.StandardServletMultipartResolver</li>
<li>该 bean 用来解析 multipart/form-data 格式的数据</li>
</ul>
<h4 id="httpencodingautoconfiguration" tabindex="-1"><a class="header-anchor" href="#httpencodingautoconfiguration"><span>HttpEncodingAutoConfiguration</span></a></h4>
<ul>
<li>POST 请求参数如果有中文，无需特殊设置，这是因为 Spring Boot 已经配置了 org.springframework.boot.web.servlet.filter.OrderedCharacterEncodingFilter</li>
<li>对应配置 server.servlet.encoding.charset=UTF-8，默认就是 UTF-8</li>
<li>当然，它只影响非 json 格式的数据</li>
</ul>
<h4 id="演示-自动配置类原理" tabindex="-1"><a class="header-anchor" href="#演示-自动配置类原理"><span>演示 - 自动配置类原理</span></a></h4>
<h5 id="关键代码-10" tabindex="-1"><a class="header-anchor" href="#关键代码-10"><span>关键代码</span></a></h5>
<p>假设已有第三方的两个自动配置类</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Configuration</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // ⬅️第三方的配置类</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> AutoConfiguration1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Bean1</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> bean1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Bean1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Configuration</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // ⬅️第三方的配置类</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> AutoConfiguration2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Bean2</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> bean2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Bean2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提供一个配置文件 META-INF/spring.factories，key 为导入器类名，值为多个自动配置类名，用逗号分隔</p>
<div class="language-properties line-numbers-mode" data-highlighter="shiki" data-ext="properties" data-title="properties" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">MyImportSelector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">AutoConfiguration1,\</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">AutoConfiguration2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em><strong>注意</strong></em></p>
<ul>
<li>上述配置文件中 MyImportSelector 与 AutoConfiguration1，AutoConfiguration2 为简洁均省略了包名，自己测试时请将包名根据情况补全</li>
</ul>
</blockquote>
<p>引入自动配置</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Configuration</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // ⬅️本项目的配置类</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Import</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">MyImportSelector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Config</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> MyImportSelector</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> DeferredImportSelector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // ⬇️该方法从 META-INF/spring.factories 读取自动配置类名，返回的 String[] 即为要导入的配置类</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">[] </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">selectImports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">AnnotationMetadata</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> importingClassMetadata</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> SpringFactoriesLoader</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">loadFactoryNames</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">MyImportSelector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toArray</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-53" tabindex="-1"><a class="header-anchor" href="#收获💡-53"><span>收获💡</span></a></h4>
<ol>
<li>自动配置类本质上就是一个配置类而已，只是用 META-INF/spring.factories 管理，与应用配置类解耦</li>
<li>@Enable 打头的注解本质是利用了 @Import</li>
<li>@Import 配合 DeferredImportSelector 即可实现导入，selectImports 方法的返回值即为要导入的配置类名</li>
<li>DeferredImportSelector 的导入会在最后执行，为的是让其它配置优先解析</li>
</ol>
<h3 id="_42-条件装配底层" tabindex="-1"><a class="header-anchor" href="#_42-条件装配底层"><span>42) 条件装配底层</span></a></h3>
<p>条件装配的底层是本质上是 @Conditional 与 Condition，这两个注解。引入自动配置类时，期望满足一定条件才能被 Spring 管理，不满足则不管理，怎么做呢？</p>
<p>比如条件是【类路径下必须有 dataSource】这个 bean ，怎么做呢？</p>
<p>首先编写条件判断类，它实现 Condition 接口，编写条件判断逻辑</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> MyCondition1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Condition</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // ⬇️如果存在 Druid 依赖，条件成立</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> matches</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ConditionContext</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> context</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">AnnotatedTypeMetadata</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> metadata</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> ClassUtils</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">isPresent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"com.alibaba.druid.pool.DruidDataSource"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，在要导入的自动配置类上添加 <code v-pre>@Conditional(MyCondition1.class)</code>，将来此类被导入时就会做条件检查</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Configuration</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> // 第三方的配置类</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Conditional</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">MyCondition1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">// ⬅️加入条件</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> AutoConfiguration1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Bean1</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> bean1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Bean1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别测试加入和去除 druid 依赖，观察 bean1 是否存在于容器</p>
<div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>com.alibaba&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>druid&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>1.1.17&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="收获💡-54" tabindex="-1"><a class="header-anchor" href="#收获💡-54"><span>收获💡</span></a></h4>
<ol>
<li>学习一种特殊的 if - else</li>
</ol>
<h2 id="其它" tabindex="-1"><a class="header-anchor" href="#其它"><span>其它</span></a></h2>
<h3 id="_43-factorybean" tabindex="-1"><a class="header-anchor" href="#_43-factorybean"><span>43) FactoryBean</span></a></h3>
<h4 id="演示-factorybean" tabindex="-1"><a class="header-anchor" href="#演示-factorybean"><span>演示 - FactoryBean</span></a></h4>
<h5 id="代码参考-40" tabindex="-1"><a class="header-anchor" href="#代码参考-40"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a43</strong> 包</p>
<h4 id="收获💡-55" tabindex="-1"><a class="header-anchor" href="#收获💡-55"><span>收获💡</span></a></h4>
<ol>
<li>它的作用是用制造创建过程较为复杂的产品, 如 SqlSessionFactory, 但 @Bean 已具备等价功能</li>
<li>使用上较为古怪, 一不留神就会用错
<ol>
<li>被 FactoryBean 创建的产品
<ul>
<li>会认为创建、依赖注入、Aware 接口回调、前初始化这些都是 FactoryBean 的职责, 这些流程都不会走</li>
<li>唯有后初始化的流程会走, 也就是产品可以被代理增强</li>
<li>单例的产品不会存储于 BeanFactory 的 singletonObjects 成员中, 而是另一个 factoryBeanObjectCache 成员中</li>
</ul>
</li>
<li>按名字去获取时, 拿到的是产品对象, 名字前面加 &amp; 获取的是工厂对象</li>
</ol>
</li>
</ol>
<h3 id="_44-indexed-原理" tabindex="-1"><a class="header-anchor" href="#_44-indexed-原理"><span>44) @Indexed 原理</span></a></h3>
<p>真实项目中，只需要加入以下依赖即可</p>
<div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>org.springframework&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>spring-context-indexer&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">optional</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>true&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">optional</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="演示-indexed" tabindex="-1"><a class="header-anchor" href="#演示-indexed"><span>演示 - @Indexed</span></a></h4>
<h5 id="代码参考-41" tabindex="-1"><a class="header-anchor" href="#代码参考-41"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a44</strong> 包</p>
<h4 id="收获💡-56" tabindex="-1"><a class="header-anchor" href="#收获💡-56"><span>收获💡</span></a></h4>
<ol>
<li>在编译时就根据 @Indexed 生成 META-INF/spring.components 文件</li>
<li>扫描时
<ul>
<li>如果发现 META-INF/spring.components 存在, 以它为准加载 bean definition</li>
<li>否则, 会遍历包下所有 class 资源 (包括 jar 内的)</li>
</ul>
</li>
<li>解决的问题，在编译期就找到 @Component 组件，节省运行期间扫描 @Component 的时间</li>
</ol>
<h3 id="_45-代理进一步理解" tabindex="-1"><a class="header-anchor" href="#_45-代理进一步理解"><span>45) 代理进一步理解</span></a></h3>
<h4 id="演示-代理" tabindex="-1"><a class="header-anchor" href="#演示-代理"><span>演示 - 代理</span></a></h4>
<h5 id="代码参考-42" tabindex="-1"><a class="header-anchor" href="#代码参考-42"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a45</strong> 包</p>
<h4 id="收获💡-57" tabindex="-1"><a class="header-anchor" href="#收获💡-57"><span>收获💡</span></a></h4>
<ol>
<li>
<p>spring 代理的设计特点</p>
<ul>
<li>
<p>依赖注入和初始化影响的是原始对象</p>
<ul>
<li>因此 cglib 不能用 MethodProxy.invokeSuper()</li>
</ul>
</li>
<li>
<p>代理与目标是两个对象，二者成员变量并不共用数据</p>
</li>
</ul>
</li>
<li>
<p>static 方法、final 方法、private 方法均无法增强</p>
<ul>
<li>进一步理解代理增强基于方法重写</li>
</ul>
</li>
</ol>
<h3 id="_46-value-装配底层" tabindex="-1"><a class="header-anchor" href="#_46-value-装配底层"><span>46) @Value 装配底层</span></a></h3>
<h4 id="按类型装配的步骤" tabindex="-1"><a class="header-anchor" href="#按类型装配的步骤"><span>按类型装配的步骤</span></a></h4>
<ol>
<li>查看需要的类型是否为 Optional，是，则进行封装（非延迟），否则向下走</li>
<li>查看需要的类型是否为 ObjectFactory 或 ObjectProvider，是，则进行封装（延迟），否则向下走</li>
<li>查看需要的类型（成员或参数）上是否用 @Lazy 修饰，是，则返回代理，否则向下走</li>
<li>解析 @Value 的值
<ol>
<li>如果需要的值是字符串，先解析 ${ }，再解析 #</li>
<li>不是字符串，需要用 TypeConverter 转换</li>
</ol>
</li>
<li>看需要的类型是否为 Stream、Array、Collection、Map，是，则按集合处理，否则向下走</li>
<li>在 BeanFactory 的 resolvableDependencies 中找有没有类型合适的对象注入，没有向下走</li>
<li>在 BeanFactory 及父工厂中找类型匹配的 bean 进行筛选，筛选时会考虑 @Qualifier 及泛型</li>
<li>结果个数为 0 抛出 NoSuchBeanDefinitionException 异常</li>
<li>如果结果 &gt; 1，再根据 @Primary 进行筛选</li>
<li>如果结果仍 &gt; 1，再根据成员名或变量名进行筛选</li>
<li>结果仍 &gt; 1，抛出 NoUniqueBeanDefinitionException 异常</li>
</ol>
<h4 id="演示-value-装配过程" tabindex="-1"><a class="header-anchor" href="#演示-value-装配过程"><span>演示 - @Value 装配过程</span></a></h4>
<h5 id="代码参考-43" tabindex="-1"><a class="header-anchor" href="#代码参考-43"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a46</strong> 包</p>
<h4 id="收获💡-58" tabindex="-1"><a class="header-anchor" href="#收获💡-58"><span>收获💡</span></a></h4>
<ol>
<li>ContextAnnotationAutowireCandidateResolver 作用之一，获取 @Value 的值</li>
<li>了解 ${ } 对应的解析器</li>
<li>了解 #{ } 对应的解析器</li>
<li>TypeConvert 的一项体现</li>
</ol>
<h3 id="_47-autowired-装配底层" tabindex="-1"><a class="header-anchor" href="#_47-autowired-装配底层"><span>47) @Autowired 装配底层</span></a></h3>
<h4 id="演示-autowired-装配过程" tabindex="-1"><a class="header-anchor" href="#演示-autowired-装配过程"><span>演示 - @Autowired 装配过程</span></a></h4>
<h5 id="代码参考-44" tabindex="-1"><a class="header-anchor" href="#代码参考-44"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a47</strong> 包</p>
<h4 id="收获💡-59" tabindex="-1"><a class="header-anchor" href="#收获💡-59"><span>收获💡</span></a></h4>
<ol>
<li>@Autowired 本质上是根据成员变量或方法参数的类型进行装配</li>
<li>如果待装配类型是 Optional，需要根据 Optional 泛型找到 bean，再封装为 Optional 对象装配</li>
<li>如果待装配的类型是 ObjectFactory，需要根据 ObjectFactory 泛型创建 ObjectFactory 对象装配
<ul>
<li>此方法可以延迟 bean 的获取</li>
</ul>
</li>
<li>如果待装配的成员变量或方法参数上用 @Lazy 标注，会创建代理对象装配
<ul>
<li>此方法可以延迟真实 bean 的获取</li>
<li>被装配的代理不作为 bean</li>
</ul>
</li>
<li>如果待装配类型是数组，需要获取数组元素类型，根据此类型找到多个 bean 进行装配</li>
<li>如果待装配类型是 Collection 或其子接口，需要获取 Collection 泛型，根据此类型找到多个 bean</li>
<li>如果待装配类型是 ApplicationContext 等特殊类型
<ul>
<li>会在 BeanFactory 的 resolvableDependencies 成员按类型查找装配</li>
<li>resolvableDependencies 是 map 集合，key 是特殊类型，value 是其对应对象</li>
<li>不能直接根据 key 进行查找，而是用 isAssignableFrom 逐一尝试右边类型是否可以被赋值给左边的 key 类型</li>
</ul>
</li>
<li>如果待装配类型有泛型参数
<ul>
<li>需要利用 ContextAnnotationAutowireCandidateResolver 按泛型参数类型筛选</li>
</ul>
</li>
<li>如果待装配类型有 @Qualifier
<ul>
<li>需要利用 ContextAnnotationAutowireCandidateResolver 按注解提供的 bean 名称筛选</li>
</ul>
</li>
<li>有 @Primary 标注的 @Component 或 @Bean 的处理</li>
<li>与成员变量名或方法参数名同名 bean 的处理</li>
</ol>
<h3 id="_48-事件监听器" tabindex="-1"><a class="header-anchor" href="#_48-事件监听器"><span>48) 事件监听器</span></a></h3>
<h4 id="演示-事件监听器" tabindex="-1"><a class="header-anchor" href="#演示-事件监听器"><span>演示 - 事件监听器</span></a></h4>
<h5 id="代码参考-45" tabindex="-1"><a class="header-anchor" href="#代码参考-45"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a48</strong> 包</p>
<h4 id="收获💡-60" tabindex="-1"><a class="header-anchor" href="#收获💡-60"><span>收获💡</span></a></h4>
<p>事件监听器的两种方式</p>
<ol>
<li>实现 ApplicationListener 接口
<ul>
<li>根据接口泛型确定事件类型</li>
</ul>
</li>
<li>@EventListener 标注监听方法
<ul>
<li>根据监听器方法参数确定事件类型</li>
<li>解析时机：在 SmartInitializingSingleton（所有单例初始化完成后），解析每个单例 bean</li>
</ul>
</li>
</ol>
<h3 id="_49-事件发布器" tabindex="-1"><a class="header-anchor" href="#_49-事件发布器"><span>49) 事件发布器</span></a></h3>
<h4 id="演示-事件发布器" tabindex="-1"><a class="header-anchor" href="#演示-事件发布器"><span>演示 - 事件发布器</span></a></h4>
<h5 id="代码参考-46" tabindex="-1"><a class="header-anchor" href="#代码参考-46"><span>代码参考</span></a></h5>
<p><strong>com.itheima.a49</strong> 包</p>
<h4 id="收获💡-61" tabindex="-1"><a class="header-anchor" href="#收获💡-61"><span>收获💡</span></a></h4>
<p>事件发布器模拟实现</p>
<ol>
<li>addApplicationListenerBean 负责收集容器中的监听器
<ul>
<li>监听器会统一转换为 GenericApplicationListener 对象，以支持判断事件类型</li>
</ul>
</li>
<li>multicastEvent 遍历监听器集合，发布事件
<ul>
<li>发布前先通过 GenericApplicationListener.supportsEventType 判断支持该事件类型才发事件</li>
<li>可以利用线程池进行异步发事件优化</li>
</ul>
</li>
<li>如果发送的事件对象不是 ApplicationEvent 类型，Spring 会把它包装为 PayloadApplicationEvent 并用泛型技术解析事件对象的原始类型
<ul>
<li>视频中未讲解</li>
</ul>
</li>
</ol>
</div></template>


