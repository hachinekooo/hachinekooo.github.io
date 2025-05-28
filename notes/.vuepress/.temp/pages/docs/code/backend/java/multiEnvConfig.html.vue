<template><div><blockquote>
<p>[!tips]<br>
spring boot 2.4 之后为了提升对 kubernetes 的支持，整个 spring.profiles 作废了；因此我们可以通过 spring.config.import 来代替它</p>
</blockquote>
<h2 id="命令行指定" tabindex="-1"><a class="header-anchor" href="#命令行指定"><span>命令行指定</span></a></h2>
<ul>
<li><code v-pre>java -jar your-application.jar --spring.profiles.active=dev,biz</code></li>
</ul>
<p>右侧的配置会覆盖左侧的配置所以 biz 配置会覆盖 dev 配置两个 profile 的配置都会覆盖默认配置文件中的值</p>
<h2 id="外置配置文件" tabindex="-1"><a class="header-anchor" href="#外置配置文件"><span>外置配置文件</span></a></h2>
<p>在生产环境中，通常会把配置文件放在 jar 包外部，常见做法是：</p>
<ol>
<li>目录结构：</li>
</ol>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>/app</span></span>
<span class="line"><span>  ├── your-application.jar</span></span>
<span class="line"><span>  └── config/</span></span>
<span class="line"><span>      ├── application.yml</span></span>
<span class="line"><span>      ├── application-dev.yml</span></span>
<span class="line"><span>      └── application-prod.yml</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>启动命令示例：</li>
</ol>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> your-application.jar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --spring.config.location=file:./config/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>主要好处：</p>
<ol>
<li>
<p>配置灵活性：</p>
<ul>
<li>无需重新打包就能修改配置</li>
<li>可以针对不同环境快速切换配置</li>
<li>便于运维人员进行配置调整</li>
</ul>
</li>
<li>
<p>安全性：</p>
<ul>
<li>敏感信息（如数据库密码）可以从代码仓库中分离</li>
<li>不同环境的配置可以由不同的人员管理</li>
</ul>
</li>
<li>
<p>运维便利：</p>
<ul>
<li>配置变更不需要重新构建应用</li>
<li>可以实现配置和应用的版本管理分离</li>
<li>便于进行配置备份和回滚</li>
</ul>
</li>
<li>
<p>多环境支持：</p>
<ul>
<li>同一个 jar 包可以在不同环境使用不同的配置</li>
<li>便于在开发、测试、生产环境之间切换</li>
</ul>
</li>
</ol>
<h2 id="spring-boot-查找配置文件的优先级-从高到低" tabindex="-1"><a class="header-anchor" href="#spring-boot-查找配置文件的优先级-从高到低"><span>Spring Boot 查找配置文件的优先级（从高到低）：</span></a></h2>
<ol>
<li>命令行参数</li>
<li>jar 包外部的配置文件</li>
<li>jar 包内部的配置文件</li>
</ol>
<p>外置配置文件会覆盖 jar 包内的默认配置</p>
</div></template>


