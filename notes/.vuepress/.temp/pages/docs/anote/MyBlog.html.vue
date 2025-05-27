<template><div><h1 id="我为什么需要一个blog" tabindex="-1"><a class="header-anchor" href="#我为什么需要一个blog"><span>我为什么需要一个Blog</span></a></h1>
<ul>
<li>我想体验一次自己建站的感觉。</li>
<li>我想在上面做一下“我的关于”。</li>
<li>发布一点我写好的文章。</li>
</ul>
<h1 id="定位" tabindex="-1"><a class="header-anchor" href="#定位"><span>定位</span></a></h1>
<ul>
<li>发布一些在 obsidian中已经成熟完善的笔记。</li>
</ul>
<h1 id="建站之路" tabindex="-1"><a class="header-anchor" href="#建站之路"><span>建站之路</span></a></h1>
<ul>
<li>npm是什么
NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：
<ul>
<li>允许用户从NPM服务器下载别人编写的第三方包到本地使用。</li>
<li>允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。</li>
<li>允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。</li>
</ul>
</li>
</ul>
<h1 id="安装-git" tabindex="-1"><a class="header-anchor" href="#安装-git"><span>安装 git</span></a></h1>
<p>苹果系统下可以直接在“终端”进行安装
输入 git --version（查看git版本命令）它就会自动弹窗，进行安装即可</p>
<h1 id="安装nodejs" tabindex="-1"><a class="header-anchor" href="#安装nodejs"><span>安装nodejs</span></a></h1>
<ul>
<li>下载地址：<a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer">Node.js</a>
可以下载 xx. Xx. Xx LTS 版本（<strong>长期支持版本</strong>，重点在于稳定性和安全性）</li>
<li>更新 npm 到最新版本（新版的 nodejs 已经集成 npm）</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>sudo npm install npm -g</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h1 id="安装-docsify-cli-工具" tabindex="-1"><a class="header-anchor" href="#安装-docsify-cli-工具"><span>安装 docsify-cli 工具</span></a></h1>
<ul>
<li>用于创建及本地预览文档网站</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>npm i docsify-cli -g</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>初始化</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>docsify init ./docs</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>docs 文件夹基本目录结构：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>wangwenpeng@AppleBook ~ % pwd</span></span>
<span class="line"><span>/Users/wangwenpeng</span></span>
<span class="line"><span>wangwenpeng@AppleBook ~ % ls</span></span>
<span class="line"><span>Applications Movies</span></span>
<span class="line"><span>Applications (Parallels) Music</span></span>
<span class="line"><span>Desktop Parallels</span></span>
<span class="line"><span>Documents Pictures</span></span>
<span class="line"><span>Downloads Public</span></span>
<span class="line"><span>Library docs</span></span>
<span class="line"><span>wangwenpeng@AppleBook ~ % ls docs</span></span>
<span class="line"><span>README.md index.html</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>README.md<br>
index.html -入口文件</p>
<ul>
<li>启动 docsify</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>wangwenpeng@AppleBook ~ % sudo docsify serve ./docs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Password:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>Serving /Users/wangwenpeng/docs now.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Listening at http://localhost:60304</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考文章：
<a href="https://docsify.js.org/#/zh-cn/quickstart?id=%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE" target="_blank" rel="noopener noreferrer">docsify</a>
<a href="https://notebook.js.org/#/Project/Docsify/docsifyNotes?id=_3-%E4%BD%BF%E7%94%A8-docsify-%E6%9E%84%E5%BB%BA%E6%96%87%E6%A1%A3" target="_blank" rel="noopener noreferrer">3 使用 docsify 构建文档</a>
<a href="https://docsify.js.org/#/zh-cn/deploy?id=github-pages" target="_blank" rel="noopener noreferrer">部署</a></p>
</div></template>


