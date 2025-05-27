<template><div><p>如下两步即可搞定卸载操作：</p>
<ol>
<li>
<p>列出当前的 jdk 安装列表，如下命令：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">demo@Mac</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ~</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> $ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ls</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /Library/Java/JavaVirtualMachines/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">jdk-11.0.10.jdk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">		jdk-11.0.3.jdk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">		jdk1.7.0_80.jdk</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">		jdk1.8.0_241.jdk</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>假设要卸载如上的 <em>jdk-11.0.3.jdk</em>，如下命令：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">demo@Mac</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ~</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> $ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /Library/Java/JavaVirtualMachines/jdk-11.0.3.jdk</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Password:</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>输入 root 的密码后，删除成功。</p>
</li>
</ol>
<h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2>
<p><a href="https://www.knowledgedict.com/tutorial/java-how-to-uninstall-jdk-on-mac-os.html" target="_blank" rel="noopener noreferrer">Mac OS 如何彻底卸载各版本的 jdk（java 开发环境） | 程序员笔记</a></p>
</div></template>


