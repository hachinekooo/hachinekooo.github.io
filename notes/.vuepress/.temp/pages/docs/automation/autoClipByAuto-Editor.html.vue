<template><div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2>
<p>参考:<a href="https://github.com/WyattBlue/auto-editor" target="_blank" rel="noopener noreferrer">GitHub - WyattBlue/auto-editor: Auto-Editor: Efficient media analysis and rendering</a></p>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2>
<h3 id="音频切除" tabindex="-1"><a class="header-anchor" href="#音频切除"><span>音频切除</span></a></h3>
<p><code v-pre>--edit</code> 配置自动编辑器进行自动剪辑的方式</p>
<ul>
<li><code v-pre>audio:threshold=3%</code> 去除声音低于3%的的地方</li>
<li><code v-pre>audio:-19dB</code> 也可以使用 <code v-pre>dB</code> 单位，区分大小写</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>auto-editor example.mp4 --edit audio:-19dB</span></span>
<span class="line"><span>auto-editor example.mp4 --edit audio:-7dB</span></span>
<span class="line"><span>auto-editor example.mp4 --edit motion:-19dB</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="间隙控制" tabindex="-1"><a class="header-anchor" href="#间隙控制"><span>间隙控制</span></a></h3>
<p><code v-pre>--frame_margin</code> 默认的帧间隙是 8，通过手动制定帧间隙可以使得你的视频更加紧凑/平滑(以帧为单位)</p>
<p><code v-pre>--margin</code> 在其中添加一些&quot;静音&quot;部分,使编辑体验更佳(以秒为单位)</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 在编辑前后各增加0.2秒的填充时间,使编辑效果更好。</span></span>
<span class="line"><span># `0.2s` is the default value for `--margin`</span></span>
<span class="line"><span>auto-editor example.mp4 --margin 0.2sec</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在前面添加 0.3 秒缓冲时间,在后面添加 1.5 秒缓冲时间。</span></span>
<span class="line"><span>auto-editor example.mp4 --margin 0.3s,1.5sec</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导出" tabindex="-1"><a class="header-anchor" href="#导出"><span>导出</span></a></h3>
<p>创建一个 XML 文件，可以使用这条命令导入到 Adobe Premiere Pro 中:</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>auto-editor example.mp4 --export premiere</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>通用也支持：</p>
<ul>
<li>DaVinci Resolve with <code v-pre>--export resolve</code></li>
<li>Final Cut Pro with <code v-pre>--export final-cut-pro</code></li>
<li>ShotCut with <code v-pre>--export shotcut</code></li>
<li>Individual media clips with <code v-pre>--export clip-sequence</code></li>
</ul>
<h3 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例"><span>使用示例</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">auto-editor</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ~/Downloads/autoCutTest.mov</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --edit</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> audio:threshold=5%</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --frame_margin</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --export</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> final-cut-pro</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


