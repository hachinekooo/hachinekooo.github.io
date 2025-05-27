<template><div><h1 id="概念" tabindex="-1"><a class="header-anchor" href="#概念"><span>概念</span></a></h1>
<p><code v-pre>Master</code> 默认开发分支
<code v-pre>origin</code> 默认远程版本库
<code v-pre>Head</code> 默认开发分支
<code v-pre>Head^</code> <code v-pre>head</code> 的父提交</p>
<h1 id="配置-ssh-进行免密推送" tabindex="-1"><a class="header-anchor" href="#配置-ssh-进行免密推送"><span>配置 SSH 进行免密推送</span></a></h1>
<h2 id="全局配置" tabindex="-1"><a class="header-anchor" href="#全局配置"><span>全局配置</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --global</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> user.Email</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> blueboySalvat@163.com</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    //配置全局范围的用户名和邮箱</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --global</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> user.Name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> blueboySalvat</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>以下为其他相关命令，不用做，仅供参考学习：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --global</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -l</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    //查看全局配置</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -l</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  //查看所有配置</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -l</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">   //查看所有配置</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --global</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --unset</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> user.name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    //删除添加的全局</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --global</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --unset</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> user.email</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="生成密钥" tabindex="-1"><a class="header-anchor" href="#生成密钥"><span>生成密钥</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ssh-keygen</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsa</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "your email@example.com"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">//引号里面填写你的邮箱地址，比如我的是</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ssh-keygen</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsa</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "blueboysalvat@163.com"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在-github-上配置免密" tabindex="-1"><a class="header-anchor" href="#在-github-上配置免密"><span>在 Github 上配置免密</span></a></h2>
<p>将在用户家目录下(macos 在 <code v-pre>/Users/电脑的用户名/.ssh</code>，windosw 在 c 盘哪里来着) 下生成的 <code v-pre>xxx.pub</code> 公钥中的内容添加到 github - &gt; 头像 - Setting - SSH and Gpt keys - New SSH Key</p>
<h3 id="测试连通性" tabindex="-1"><a class="header-anchor" href="#测试连通性"><span>测试连通性</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ssh</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -T</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> git@github.com</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Hi</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> blueboySalvat!</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> You've successfully authenticated, but GitHub does not provide shell access.</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后就可以直接在本地按照流程，直接 push 了，不用密码。</p>
<h2 id="在云服务器上添加免密" tabindex="-1"><a class="header-anchor" href="#在云服务器上添加免密"><span>在云服务器上添加免密</span></a></h2>
<h3 id="在客户端测试" tabindex="-1"><a class="header-anchor" href="#在客户端测试"><span>在客户端测试</span></a></h3>
<h1 id="git-推送流程" tabindex="-1"><a class="header-anchor" href="#git-推送流程"><span>git 推送流程</span></a></h1>
<p>git init
git add.
git commit -m &quot;&quot;
git branch -M main
git remote add origin git@github.com:blueboySalvat/blueboySalvat.github.io.git
git push -u origin main -f</p>
<h1 id="一键推送脚本" tabindex="-1"><a class="header-anchor" href="#一键推送脚本"><span>一键推送脚本</span></a></h1>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">#!/bin/bash</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># 提示用户，并且记录用户键入的commit_message</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">read</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "请输入提交的消息： "</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> commit_message</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># 切换到指定目录</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /Users/wangwenpeng/Code/blog/Area</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># 添加所有更改</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> .</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># 提交更改</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> commit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$commit_message</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># 推送到远程仓库</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># f强制提交，会覆盖远程仓库</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> push</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -u</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> origin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> main</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -f</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "提交成功！"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="fatal-unable-to-access-https-xxx" tabindex="-1"><a class="header-anchor" href="#fatal-unable-to-access-https-xxx"><span>Fatal: unable to access ‘https:xxx’</span></a></h1>
<p>报错：fatal: unable to access ' https://github.com/xxx.github.io.git/ ': Failure when receiving data from the peer</p>
<p>I was stuck in this problem until I noticed that I was not logged into my VPN.
If you have configured your proxy for a VPN, you need to login to your VPN to use the proxy.
to use it outside the VPN use the unset command:</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>git config --global --unset http.proxy</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>And remember to set the proxy when within the VPN.</p>
<p>AI关于次命令的解释：
当你在使用 Git 时，有时候可能会设置一个 HTTP 代理来进行网络连接。但是如果你想取消全局的 HTTP 代理设置，可以使用这个命令</p>
<p>这个命令会移除全局 Git 配置中的 http.proxy 设置，这样 Git 将不再使用 HTTP 代理进行网络连接。</p>
<ul>
<li><code v-pre>git config</code>：这是用于管理Git配置的命令。</li>
<li><code v-pre>--global</code>：这个标志表示应该在全局范围内进行配置更改，即影响系统上所有的仓库。</li>
<li><code v-pre>--unset</code>：这个标志用于取消设置或删除配置值。</li>
<li><code v-pre>http.proxy</code>：这是要取消设置的特定配置键，它代表了 HTTP 代理。</li>
</ul>
<p>如果你 clone 下来一个别人的仓库，在此基础上完成你的代码，推送到自己的仓库可能遇到如下问题：
Error: remote origin already exists. 表示远程仓库已存在。
因此你要进行以下操作：
1、先输入 git remote rm origin 删除关联的 origin 的远程库
2、关联自己的仓库 git remote add origin https://gitee.com/xxxxxx.git
3、最后 git push origin master，这样就推送到自己的仓库了。</p>
</div></template>


