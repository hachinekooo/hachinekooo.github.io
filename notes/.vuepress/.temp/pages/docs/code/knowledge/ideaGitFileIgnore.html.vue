<template><div><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>
<h3 id="场景再现" tabindex="-1"><a class="header-anchor" href="#场景再现"><span>场景再现</span></a></h3>
<blockquote>
<p>有时候我们会在IDEA GIT提交窗口看到很多我们不想看到的文件，例如<code v-pre>.log</code>。于是我们修改<code v-pre>.gitignore</code>文件在其中加入<code v-pre>.log</code>，但是刷新一看<code v-pre>.log</code>文件还是存在。<br>
这是因为<code v-pre>.gitignore</code>只能忽略未被track的文件(即未加入到暂存区)。如果某些文件已经被纳入了暂存区中(加入暂存区即该文件被版本管理了)，则修改<code v-pre>.gitignore</code>是无效的</p>
</blockquote>
<h3 id="查看文件管理情况" tabindex="-1"><a class="header-anchor" href="#查看文件管理情况"><span>查看文件管理情况</span></a></h3>
<p>查看当前 Git 仓库中已经被版本管理的文件</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>git ls-files</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>查看当前目录的文件状态
git status 输出解读：</p>
<ul>
<li>已被版本管理的文件：在 Changes not staged for commit 或 Changes to be committed 部分。</li>
<li>未被版本管理的文件：显示在 Untracked files 部分。</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>git status</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="删除被版本管理文件并重新添加" tabindex="-1"><a class="header-anchor" href="#删除被版本管理文件并重新添加"><span>删除被版本管理文件并重新添加</span></a></h3>
<p>删除所有已经被纳入版本管理的文件</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>git rm -r --cached .</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>将当前工作目录下的所有<strong>修改过的文件</strong>和<strong>新建的未被追踪的文件</strong>添加到 Git 暂存区（Staging Area）。</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>git add .</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>将暂存区中的更改记录为一次新的提交，将暂存区的更改提交到仓库。</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>git commit -m 'update .gitignore'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


