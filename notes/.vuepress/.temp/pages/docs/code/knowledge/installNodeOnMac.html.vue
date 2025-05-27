<template><div><p>使用 <code v-pre>Rosetta2</code> 来启动终端，这样我们就通过 Rosetta2 转译到 x86 架构中执行安装：<br>
步骤：</p>
<ol>
<li>在 finder 中，点击应用程序，并在实用工具中找到终端</li>
<li>右键终端，点击获取信息</li>
<li>勾选 <code v-pre>Open using Rosetta</code></li>
<li>重启终端，并执行 <code v-pre>nvm install v12</code> 命令</li>
</ol>
<p>安装完之后，就可以正常使用了</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># 使用某个版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nvm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> use</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nodeVersion</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"># 查看都有哪些版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nvm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> list</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


