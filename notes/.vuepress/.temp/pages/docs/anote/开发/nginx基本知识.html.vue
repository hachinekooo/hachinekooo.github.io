<template><div><h1 id="什么是-nginx" tabindex="-1"><a class="header-anchor" href="#什么是-nginx"><span>什么是 nginx</span></a></h1>
<blockquote>
<p>Nginx 是一款<strong>轻量级</strong>的 Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，特点是占有内存少、并发能力强。Nginx 高并发能力强大、支持热不熟、启动简单。</p>
</blockquote>
<h1 id="nginx-的反向代理" tabindex="-1"><a class="header-anchor" href="#nginx-的反向代理"><span>Nginx 的反向代理</span></a></h1>
<h2 id="什么是正向-反向代理" tabindex="-1"><a class="header-anchor" href="#什么是正向-反向代理"><span>什么是正向/反向代理</span></a></h2>
<figure><img src="@source/docs/anote/appends/img/forwardProxyAndReverseProxy.png" alt="forwardProxyAndReverseProxy" tabindex="0" loading="lazy"><figcaption>forwardProxyAndReverseProxy</figcaption></figure>
<ul>
<li>正向代理，即在我们电脑本地上配置的一个代理，我们将使用我们自己配置的这个代理来帮我们去访问目标站点。举一个简单的例子，我们想要访问 X（推特）、Github 的时候，正常情况下国内是很慢或者无法访问的，但是我们可以在我们的电脑上配置一个代理服务器，让他帮我们去访问然后就 X 网站返回的内容交给我们本地电脑进行显示。</li>
<li>反向代理，现在代理服务器的配置不再由我们自己配置，而是由服务器那边人员去进行配置。同样的，配置代理服务器的目的也是为了提高访问体验。服务器那边配置好代理服务器后，当我们请求时请求的是代理服务器，而代理服务器会根据各个服务器的负载情况，动态的分配我们这次请求的流量往哪里走。Nginx 不但解决了向各个服务器的流量动态分发，还解决了在服务器之间共享 session 的问题。</li>
</ul>
<p>一个不成方圆的记忆法：</p>
<ul>
<li>正向代理是我们自己配置的，我们自己心知肚明的，所以叫正。</li>
<li>反向代理不是我们自己配置的，我们自己不知道有没有这个东西，翻译叫反。</li>
</ul>
<h1 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h1>
<blockquote>
<p>Nginx 可以实现向一个服务器集群那边派发合适的流量，从而提高访问速度等性能表现。</p>
</blockquote>
<h1 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离"><span>动静分离</span></a></h1>
<p>Nginx 将处理静态资源，而动态请求将由 Apache 处理</p>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">upstream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> mytest {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> localhost:9999;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> localhost:9900;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    listen </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">      80</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server_name </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> localhost;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    #拦截静态资源</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ~ </span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75">.*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|js|css|map|eot|svg|ttf|woff|woff2)$ </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">		root </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/home/pages;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">		index </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">index.html index.htm;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">	# 反向代理服务器资源</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    	proxy_pass </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">http://mytest/;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>静态资源拦截</strong>： 这部分配置用于拦截静态资源，例如 HTML、CSS、JavaScript、图片等。当客户端请求这些资源时，Nginx 会直接返回它们，而不需要将请求转发到后端服务器（如 Apache）。</p>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ~ </span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75">.*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|js|css|map|eot|svg|ttf|woff|woff2)$ </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    root </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/home/pages;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    index </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">index.html index.htm;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># location ~ .*\.(...)：这是一个正则表达式，匹配指定后缀的文件。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># root /home/pages;：指定静态资源的根目录。</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># index index.html index.htm;：如果请求的路径是目录，Nginx 会尝试返回 index.html 或 index.htm。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>反向代理</strong>： 这部分配置用于将请求转发到后端服务器。在你的配置中，请求会被代理到名为 <code v-pre>mytest</code> 的后端服务器组。以下是相关部分：</p>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" data-title="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    proxy_pass </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">http://mytest/;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>proxy_pass http://mytest/;</code>：将请求转发到 <code v-pre>mytest</code> 后端服务器组。</li>
</ul>
</li>
</ol>
<h1 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h1>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>cd /usr/local/nginx/sbin/</span></span>
<span class="line"><span>./nginx  启动</span></span>
<span class="line"><span>./nginx -s stop  停止</span></span>
<span class="line"><span>./nginx -s quit  安全退出</span></span>
<span class="line"><span>./nginx -s reload  重新加载配置文件如果我们修改了配置文件，就需要重新加载。</span></span>
<span class="line"><span>ps aux|grep nginx  查看 nginx 进程</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>补充相关命令：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 开启 service firewalld start</span></span>
<span class="line"><span># 重启 service firewalld restart</span></span>
<span class="line"><span># 关闭 service firewalld stop</span></span>
<span class="line"><span># 查看防火墙规则 firewall-cmd --list-all</span></span>
<span class="line"><span># 查询端口是否开放 firewall-cmd --query-port=8080/tcp</span></span>
<span class="line"><span># 开放80端口 firewall-cmd --permanent --add-port=80/tcp</span></span>
<span class="line"><span># 移除端口 firewall-cmd --permanent --remove-port=8080/tcp#重启防火墙(修改配置后要重启防火墙)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1、firwall-cmd：是Linux提供的操作firewall的一个工具；</span></span>
<span class="line"><span>2、--permanent：表示设置为持久；</span></span>
<span class="line"><span>3、--add-port：标识添加的端口；</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="相关参考" tabindex="-1"><a class="header-anchor" href="#相关参考"><span>相关参考</span></a></h1>
<p><a href="https://blog.csdn.net/hyfsbxg/article/details/122322125" target="_blank" rel="noopener noreferrer">Nginx详解（一文带你搞懂Nginx）-CSDN博客</a></p>
</div></template>


