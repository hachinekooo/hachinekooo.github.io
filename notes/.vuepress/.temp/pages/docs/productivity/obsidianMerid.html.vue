<template><div><h1 id="一-添加css代码" tabindex="-1"><a class="header-anchor" href="#一-添加css代码"><span>一 添加CSS代码</span></a></h1>
<p>1、依次点击：obsidian 设置 -&gt;&gt; 外观 -&gt;&gt; 页面最底端 CSS 代码片段 -&gt;&gt; 打开代码段文件夹</p>
<p>2、 新建mermaid.css文件并添加代码<br>
参考：<a href="https://forum-zh.obsidian.md/t/topic/4405/2" target="_blank" rel="noopener noreferrer">如何调整mermaid的graph图的大小（所见即所得模式下） - 疑问解答 - Obsidian 中文论坛</a></p>
<div class="language-css line-numbers-mode" data-highlighter="shiki" data-ext="css" data-title="css" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">.mermaid</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> svg</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    width: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75">%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    height: </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">auto</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：<br>
width：保持mermaid svg图片的宽度<br>
height：保持高度。不添加时图片上下间距会太大。</p>
<p>3、 在外观界面打开CSS代码片段mermaid按钮生效</p>
<p>设置好后，obsidian里的所有mermaid图都保持100%缩放比例跟随窗口动态改变。</p>
</div></template>


