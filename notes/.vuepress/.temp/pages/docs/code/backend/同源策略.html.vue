<template><div><h1 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h1>
<blockquote>
<p>为了安全性而设置的一种安全策略</p>
</blockquote>
<h1 id="触发" tabindex="-1"><a class="header-anchor" href="#触发"><span>触发</span></a></h1>
<p>满足 <code v-pre>协议</code>、<code v-pre>地址</code>、<code v-pre>端口</code> 这三者中 <code v-pre>任意不同</code> 的时候(<code v-pre>源不同</code>)，此时会触发浏览器的同源策略</p>
<h1 id="作用" tabindex="-1"><a class="header-anchor" href="#作用"><span>作用</span></a></h1>
<ul>
<li>
<p>防止跨站脚本攻击(XSS) 同源策略可以阻止不同源之间的文档对彼此进行读取，这样就可以减少 XSS 攻击的风险。XSS 攻击是指黑客将恶意代码注入到网页中，当其他用户浏览该网页时就会执行恶意代码，从而导致信息泄露等严重后果。</p>
<ul>
<li>例如：用户在 A 网站正常阅读浏览，但是发现评论区有人恶意的在评论区中注入了恶意代码，用户每次加载到评论区就会加载触发这段恶意代码，这段代码可能会窃取用户在 A 网站的登录信息，并且发送到一个非同源的网站进行保存。致使大量用户的登录信息泄漏。开启同源策略可以在 A 网站上防止请求这个非同源的网站，从而防止信息被保存。</li>
</ul>
</li>
<li>
<p>防止跨站请求伪造(CSRF)  同源策略要求指定的任何跨源 HTTP 请求必须首先获得用户的许可，从而阻止了 CSRF 攻击。CSRF 攻击是指攻击者诱使用户执行了一个他们没有意识到的操作，比如修改密码或者转账等高风险操作。</p>
<ul>
<li>例如：例如：用户在 A 网站正常阅读浏览，但是发现评论区有人发了个链接，于是点击跳转到 B，就可能在 B 网站中执行一些恶意脚本，在 B 网站的恶意脚本中可能会直接在浏览器中使用 A 网站已经登录的身份，发送构造好的特定请求，从而实现恶意转账、修改 A 的资料信息等操作。开启同源策略之后，则要求跨源请求必须获得用户许可，有效阻止了这种&quot;偷跑&quot;的请求，在一定程度上防范了 CSRF 攻击。</li>
</ul>
</li>
</ul>
<h1 id="解决" tabindex="-1"><a class="header-anchor" href="#解决"><span>解决</span></a></h1>
<p>&gt; 跨源请求的本质是请求别人的信息，所以能否跨域请求，是由被请求的服务器的设置决定的。</p>
<h2 id="配置配置类" tabindex="-1"><a class="header-anchor" href="#配置配置类"><span>配置配置类</span></a></h2>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">configuration</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> CrosConfig</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> WebMvcConfigurer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> addCorsMappings</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">CorsRegistry</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> registry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">registry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addMapping</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/**"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">）</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//**匹配的是我们所有后台的路径，代表后台共享了什么资源</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">allowedorigins</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">（</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"http://localhost:8082"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">）</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//匹配的前台的服务器地址</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">maxAge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">allowedHeaders</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"*"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">allowedMethods</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"*"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)；</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//允许的前台的请求方式</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="crossorigin-注解" tabindex="-1"><a class="header-anchor" href="#crossorigin-注解"><span>CrossOrigin 注解</span></a></h2>
<h4 id="作用-1" tabindex="-1"><a class="header-anchor" href="#作用-1"><span>作用：</span></a></h4>
<p>在 controller 上添加@CrossOrigin 注解用来开启跨域请求，让其他域的请求可以访问该 controller。</p>
<h4 id="详解" tabindex="-1"><a class="header-anchor" href="#详解"><span>详解：</span></a></h4>
<p>origin属性：允许可访问的域列表</p>
<p>maxAge：准备响应前的缓存持续的最大时间（以秒为单位）</p>
<h3 id="使用位置" tabindex="-1"><a class="header-anchor" href="#使用位置"><span>使用位置</span></a></h3>
<ul>
<li>类</li>
<li>方法</li>
</ul>
<p>参考：<a href="https://blog.csdn.net/YMYYZ/article/details/128608870" target="_blank" rel="noopener noreferrer">springboot之跨域访问cros，@CrossOrigin注解</a></p>
</div></template>


