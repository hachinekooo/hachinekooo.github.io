<template><div><h1 id="格式化剪贴板的内容" tabindex="-1"><a class="header-anchor" href="#格式化剪贴板的内容"><span>格式化剪贴板的内容</span></a></h1>
<div class="language-applescript line-numbers-mode" data-highlighter="shiki" data-ext="applescript" data-title="applescript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 获取剪贴板内容</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> clipboardText</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> the</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> clipboard</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 删除方括号及其内容</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> modifiedText</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> deleteBracketContent(clipboardText)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 最终格式：[](docs/allNote/Java基础.md#什么是继承？)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> modifiedText2</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> modifiedText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 删除方括号及其内容的函数</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">on</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> deleteBracketContent</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">sourceText</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> openBracket</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> offset</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> of</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "["</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sourceText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> closeBracket</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> offset</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> of</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "]"</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sourceText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    -- 如果找到了方括号，删除它们及其内容</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> openBracket </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">is not</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> and</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> closeBracket </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">is not</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> then</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> sourceText</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> text</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (closeBracket </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) thru </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">-1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> of</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sourceText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    end if</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sourceText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">end</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> deleteBracketContent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 替换 "docs" 为你想要的字符串，这里用 "replaced" 作为示例</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> modifiedText3</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> replaceText(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"docs/"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">""</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, modifiedText2)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 要求用户输入</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> userInput</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> text</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> returned </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">of</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">display dialog</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "请输入："</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> default answer </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">""</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> buttons {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"OK"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">} default button </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"OK"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 将用户输入放到替换后的文本的方括号[java基础]内</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> finalText</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "["</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> &#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> userInput </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x26;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "]"</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> &#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> modifiedText3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 将最终文本写回剪贴板</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">set</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> the</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> clipboard to finalText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">tell</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> application</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "System Events"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        keystroke</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "v"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> using command down</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">end tell</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">-- 替换函数</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">on</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> replaceText</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">find, replace, sourceText</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    set</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> text item delimiters</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> to find</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> sourceText</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> text</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> items</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> of</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sourceText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    set</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> text item delimiters</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> to replace</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    set</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> sourceText</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ""</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> &#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sourceText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    set</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> text item delimiters</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> to </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">""</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sourceText</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">end</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> replaceText</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


