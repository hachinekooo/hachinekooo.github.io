<template><div><h1 id="业务" tabindex="-1"><a class="header-anchor" href="#业务"><span>业务</span></a></h1>
<h2 id="添加订单" tabindex="-1"><a class="header-anchor" href="#添加订单"><span>添加订单</span></a></h2>
<figure><img src="@source/docs/anote/appends/img/pengchengBookMs_addOrder.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="一些坑" tabindex="-1"><a class="header-anchor" href="#一些坑"><span>一些坑</span></a></h2>
<ul>
<li>拼写错误
<ul>
<li>在 ajax 中把 data 写成 date</li>
<li>在 ajax 中把 url 写成 uri</li>
</ul>
</li>
<li>标签闭合
<ul>
<li><code v-pre>&lt;base href=&quot;${pageContext.request.contextPath}/&quot; /&gt;</code></li>
</ul>
</li>
<li>地址路径
<ul>
<li><code v-pre>${pageContext.request.contextPath}</code> 格式是<code v-pre>/项目名</code>，没有后面的斜线，使用时忘了加斜线。</li>
<li>在 webapp 中的内容，访问需要 <code v-pre>项目名 + 资源地址 </code></li>
</ul>
</li>
<li>导入资源顺序问题
<ul>
<li>导入插件时如果用到 jQuery，需要注意插件放在其后。</li>
</ul>
</li>
<li>base 标签使用要放在 head 中首行。</li>
<li>button 不加 type 默认是 subbmit，如果没注意你可能遇到的点击就页面刷新到情况。</li>
</ul>
<h1 id="知识点" tabindex="-1"><a class="header-anchor" href="#知识点"><span>知识点</span></a></h1>
<h2 id="日期的处理" tabindex="-1"><a class="header-anchor" href="#日期的处理"><span>日期的处理</span></a></h2>
<ul>
<li>数据库中的字段类型为 <code v-pre>date</code></li>
<li>实体类使用日期属性 <code v-pre>@JsonFormat</code> ，换成 JSON 时就会把日期按照这个格式转换。</li>
<li>前端的 date 表单元素使用和第二步一样的 pattern，例如 <code v-pre>yyyy-MM-dd</code>，这样就可以在前端正常显示日期了。</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Data</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">AllArgsConstructor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">NoArgsConstructor</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Student</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Integer</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    //@JsonProperty("address")</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> addr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    /*</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    功能：</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        1.将前端的JSON值按照pattern映射到对应的属性</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        2.将服务器响应的数据按照pattern转换成JSON</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">JsonFormat</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">pattern</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "yyyy-MM-dd HH:mm:ss"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> timezone</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "GMT+8"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    /*</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    功能：</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        1.将前端传过来的日期字符串（如url-String格式、Form-Data格式，不能处理JSON）按照pattern转化为对应的Date类型</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        2.不会影响服务器返回前端的时间类型数据格式</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    */</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">DateTimeFormat</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">pattern</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "yyyy-MM-dd HH:mm:ss"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Date</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> birthday</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据库和封装类对应" tabindex="-1"><a class="header-anchor" href="#数据库和封装类对应"><span>数据库和封装类对应</span></a></h2>
<p>数据库中使用 bigInt 在 java 中使用 Long 类型进行对应。</p>
<h2 id="resp-数据格式化" tabindex="-1"><a class="header-anchor" href="#resp-数据格式化"><span>resp 数据格式化</span></a></h2>
<ul>
<li>格式化数组中的对象</li>
</ul>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"code"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"msg"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">""</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"data"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:[{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"scopename"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"幼儿"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"count"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">8</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">},{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"scopename"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"青少年"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"count"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">},{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"scopename"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"成人"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"count"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">36</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}]}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> data</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> mapInArr</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">mapInArr</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">item</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">value</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> item</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">count</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> item</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scopename</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">};  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">});</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[{</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">8</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">'幼儿'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}, {</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">'青少年'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}, {</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">36</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">'成人'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><code v-pre>map</code> 函数的作用是将原始数组中的每个对象转换为一个新的对象，以便在新的数组中存储特定的属性值。它将 <code v-pre>data</code> 数组中的每个对象转换为具有 <code v-pre>value</code> 和 <code v-pre>name</code> 属性的对象数组。</p>
<ul>
<li>把 value ，在数组集中存储
数组中的 map 的 key 成为一个数组
数组中的 map 的 value 成为一个数组</li>
</ul>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" data-title="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"code"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"msg"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">""</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"data"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:[{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"sname"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"社会学"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"count"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">24</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">},{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"sname"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"心理学"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"count"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">15</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">},{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"sname"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"脑科学"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"count"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">},{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"sname"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"成功学"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"count"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">},{</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"sname"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"经济学"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"count"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}]}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> xArr</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [];  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> yArr</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [];  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> i</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> &#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">length</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  xArr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">push</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">].</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">sname</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  yArr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">push</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">].</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">count</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询结果的封装" tabindex="-1"><a class="header-anchor" href="#查询结果的封装"><span>查询结果的封装</span></a></h2>
<h3 id="单行单列" tabindex="-1"><a class="header-anchor" href="#单行单列"><span>单行单列</span></a></h3>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> count </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> qr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">query</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(sql, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ScalarHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Long</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>(), </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">params</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toArray</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="多行多列" tabindex="-1"><a class="header-anchor" href="#多行多列"><span>多行多列</span></a></h3>
<h4 id="使用视图类" tabindex="-1"><a class="header-anchor" href="#使用视图类"><span>使用视图类</span></a></h4>
<blockquote>
<p>这个视图类集合了对应多张表字段名的属性。</p>
</blockquote>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Data</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">AllArgsConstructor</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">NoArgsConstructor</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BookVo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bno</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bname</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bauthor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Long</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> scopeid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> scopename</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">JsonFormat</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">pattern</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "yyyy-MM-dd"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> timezone</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "GMT+8"</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Date</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bpubdate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BigDecimal</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bprice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Integer</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> bstate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Integer</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> sid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> sname</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> slocation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>apache.QueryRunner</code> 查询并且将每条结果封装到视图类，最后放到 <code v-pre>List</code> 中。</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">List</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">BookVo</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> list </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> qr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">query</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(sql, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> BeanListHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;>(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">BookVo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">), </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">params</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toArray</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="使用-list-和-map" tabindex="-1"><a class="header-anchor" href="#使用-list-和-map"><span>使用 List 和 Map</span></a></h4>
<blockquote>
<p>有多少条记录，列表中就有多少个 <code v-pre>Map</code>，每个 <code v-pre>map</code> 中都由若干个 <code v-pre>字段名:字段值</code> 组成的。</p>
</blockquote>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">List</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Map</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">>></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> rankList </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> qr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">query</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(sql, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> MapListHandler</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">params</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toArray</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="记住账户" tabindex="-1"><a class="header-anchor" href="#记住账户"><span>记住账户</span></a></h2>
<blockquote>
<p>实现思路：登入灯光时并且勾选记住账户时，服务器端生成一个特定的、加密的标识符发送给浏览器，存储在用户浏览器本地的 Cookie 中，同时服务器端也在数据库中存储这个 cookie，下次用户访问的时候携带此 cookie，服务器端将此 cookie 和数据库中的信息进行对比。</p>
</blockquote>
<ol>
<li>
<p><strong>生成 Token</strong>：当用户成功登录并选择“记住我”选项时，服务器会生成一个唯一的、加密的 Token。这个 Token 可能包含用户的唯一标识（如用户 ID），并且可以加入时间戳和其他信息以增强安全性。</p>
</li>
<li>
<p><strong>存储 Token</strong>：服务器将这个加密的 Token 发送给用户浏览器，存储在 Cookie 中。同时，服务器也会在数据库中保存这个 Token 的记录，以便将来验证。</p>
</li>
<li>
<p><strong>设置有效期</strong>：这个 Cookie 的有效期通常会设置较长，比如几天或几周，这样即使用户关闭浏览器或计算机，Cookie 也不会立即失效。</p>
</li>
<li>
<p><strong>用户再次访问</strong>：当用户在有效期内再次访问网站时，浏览器会自动将这个 Cookie（包含 Token）发送给服务器。</p>
</li>
<li>
<p><strong>验证 Token</strong>：服务器接收到请求后，会读取 Cookie 中的 Token，并与数据库中存储的 Token 记录进行匹配验证。如果匹配成功，并且 Token 没有过期，服务器就可以识别用户的身份。</p>
</li>
<li>
<p><strong>自动登录</strong>：一旦 Token 验证通过，服务器就可以为用户创建一个新的会话（Session），使用户无需再次输入账号密码即可访问网站。</p>
</li>
<li>
<p><strong>安全措施</strong>：为了提高安全性，Token 通常会进行加密处理，以防止信息泄露。此外，还可以采取其他措施，如限制 Token 的使用范围（只在特定设备或 IP 地址上有效）、定期更新 Token 等。</p>
</li>
</ol>
<h3 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie"><span>cookie</span></a></h3>
<blockquote>
<p>如果只是生成一个 cookie 发给浏览器，是做不到区分验证用户的，除非你再设计一套验证机制。比如浏览器携带 cookie 再次访问时，服务器端解析这个 cookie，并且进行验证。</p>
</blockquote>
<h4 id="token" tabindex="-1"><a class="header-anchor" href="#token"><span>token</span></a></h4>
<blockquote>
<p>Token 在认证和授权过程中，通常是指一个包含安全凭证的字符串，这个凭证代表了用户的身份信息或会话信息。Token 并不限于只作为 Cookie 的值出现，它可以通过多种方式传输，例如 HTTP 头部、URL 参数等。Token 的核心作用是提供一种安全的方式来验证用户身份或会话有效性，而无需每次都传输用户名和密码。</p>
</blockquote>
<p>Token 通常具有以下特点：</p>
<ol>
<li>
<p><strong>唯一性</strong>：每个 Token 都是唯一的，以确保每个用户或会话都可以被明确地识别。</p>
</li>
<li>
<p><strong>有限的有效期</strong>：Token 通常具有过期机制，过期后无法再使用，以减少被盗用的风险。</p>
</li>
<li>
<p><strong>包含信息</strong>：Token 内部可以包含一些基本信息，如用户的 ID、创建时间、过期时间等。这些信息可以通过 Token 自身的结构直接编码（如 JWT），也可以是加密的，需要特定的密钥才能解密。</p>
</li>
<li>
<p><strong>加密</strong>：为了安全起见，Token 通常会进行加密处理，或者至少对关键信息进行加密，以防止信息被泄露。</p>
</li>
</ol>
<p>因此，当我们提到“记住我”功能中的 Token 时，它不仅仅是 Cookie 值中的一个字段，更是一种包含用户身份验证信息的安全凭证。服务器可以通过解析和验证这个 Token ，或者对比数据库，来确认用户身份，从而实现自动登录或维持会话的目的。</p>
<h3 id="session" tabindex="-1"><a class="header-anchor" href="#session"><span>session</span></a></h3>
<blockquote>
<p>使用 session 可以实现对用户身份的验证，当服务器端设置好 session 之后，我们不用在写什么特殊的验证机制就可以实现在单次回话中对用户身份的验证。所以不适用于来实现记住账户功能。</p>
</blockquote>
<h4 id="项目中的实现" tabindex="-1"><a class="header-anchor" href="#项目中的实现"><span>项目中的实现</span></a></h4>
<p>关键代码：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//判断cookie信息</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Cookie</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">[] cookies </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> req</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getCookies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    //获取请求中携带的cookie信息</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (cookies </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">	for</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Cookie</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> cookie </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> cookies) { </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//遍历cookies数组，寻找loginToken</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">		if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">cookie</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">equals</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"loginToken"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">			String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> loginToken </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> cookie</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getValue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">			String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> decrypt </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> EncryptionUtil</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">decrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(loginToken);</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 解密token</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">			String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">[] decryptParts </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> decrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">split</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">":"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> //切割解密后的字符串</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">			String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> username </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> decryptParts[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">  //用户名</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">			String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> timestamp </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> decryptParts[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic"> //记住账户那一刻的时间</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">			if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Date</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getTime</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> -</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> Long</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">parseLong</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(timestamp)</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> &#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 432000000</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//若loginToken没有过期（若时间差小于5天）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">				</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">				try</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">					Admin</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> admin </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> adminService</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">findByName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(username);</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    //根据用户名查找到用户其他信息</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">					session</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setAttribute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"admin"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, admin);</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">   //设置session</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">					RespBean</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ok </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> RespBean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ok</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"自动登录成功！"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">   //设置响应对象</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">					JsonUtil</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">toJSON</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getOutputStream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), ok);</span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    //向前端返回JSON格式的响应信息</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">				} </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">SQLException</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">					throw</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> RuntimeException</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(e)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">				} </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">catch</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ThrowInfoException</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">					throw</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> RuntimeException</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(e)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">				}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">			}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">		}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">	}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">rememberMeInFiveDays</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">equals</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"1"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) { </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//如果用户选择了记住我  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 创建一个Cookie，并且设置加密信息（用户名+时间戳）  </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> encryptedToken </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> EncryptionUtil</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">encrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(username, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Date</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getTime</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Cookie</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> loginToken </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Cookie</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"loginToken"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> encryptedToken)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 设置Cookie的有效期为5天  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    loginToken</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setMaxAge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 24</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 60</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 60</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 将Cookie设置为HttpOnly，防止XSS  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    loginToken</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setHttpOnly</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">    // 将Cookie发送给客户端  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addCookie</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(loginToken);</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="调试开发技巧" tabindex="-1"><a class="header-anchor" href="#调试开发技巧"><span>调试开发技巧</span></a></h1>
<h2 id="通过检查功能测试自己的选择器是否正确" tabindex="-1"><a class="header-anchor" href="#通过检查功能测试自己的选择器是否正确"><span>通过检查功能测试自己的选择器是否正确</span></a></h2>
<ul>
<li>打开检查功能</li>
<li>点击选中元素选项卡</li>
<li>windows 按快捷键 <code v-pre>ctrl+f</code>，mac 按快捷键 <code v-pre>cmd+f</code></li>
<li>在最底部出现的搜索框中填写自己想要测试的选择器即可，可以动态修及时查看效果。</li>
</ul>
<p>举例：
<img src="@source/docs/anote/appends/img/useCheckToCheckSelector.png" alt="" loading="lazy"></p>
<p>当需要选择很深层次的元素时，先在检查功能中进行验证。这会对后续进一步的操作非常有用，省去很多事。
例如在修改的这个功能中，我首先进行了分类信息查询，并且填充模版，最后挂载到相应的位置。但是这仅仅只做到了可以在修改框中看到&quot;分类&quot;这一栏可以下拉选择已有分类了，并不能做到选中当前图书修改之前所属的分类，用户体验比较糟糕。</p>
<p>我们可以看到我最终写完的 <code v-pre>选择器+属性</code> 设置的语句比较麻烦，提前测试好选择器我们就可以对刚刚测试过的选择器语句进行拆分，拼接 sid 值就行了，出了问题我们排查的范围也缩小了很多。（你的任何一段经历都将成为你最宝贵的财富，这个知识点是我在 2022.2.23 日玩浏览器自动化的时候一位老哥教给我的，今天突然就灵光一闪就试了试。）</p>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" data-title="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//查询：分类，并且挂载到修改到 ”修改模态框“ 中  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> findSnameUpd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">sid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"000"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  $</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ajax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">({  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    url </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "bookController?action=findSname"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    type </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "POST"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    dataType </span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "JSON"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    success</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">      //resp.data是返回的数据，将服务器返回的数据在模板中渲染  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">      let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> html</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'snameUpd_tableTempt'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">data</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">data</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> });  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">      //将渲染完成的数据挂载在页面上  </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">      $</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'#snameSelectUpd'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">html</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">html</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);  </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">      $</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"#updForm div[id= snameSelectUpd] select option[value='"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> sid</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "']"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">prop</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"selected"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },  </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    error</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">      console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">resp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">); </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">// 将错误信息打印到控制台  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    },  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  });  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="善用搜索快速定位" tabindex="-1"><a class="header-anchor" href="#善用搜索快速定位"><span>善用搜索快速定位</span></a></h2>
<p>例如双击选中方法名，然后按下搜索快捷键 <code v-pre>ctrl+f</code> 或者 <code v-pre>cmd+f</code>，即可在定义或者调用处之间跳转。</p>
<h2 id="调试" tabindex="-1"><a class="header-anchor" href="#调试"><span>调试</span></a></h2>
<h3 id="检查浏览器元素选选项卡" tabindex="-1"><a class="header-anchor" href="#检查浏览器元素选选项卡"><span>检查浏览器元素选选项卡</span></a></h3>
<h3 id="检查浏览器网络选项卡" tabindex="-1"><a class="header-anchor" href="#检查浏览器网络选项卡"><span>检查浏览器网络选项卡</span></a></h3>
<h4 id="查看载荷" tabindex="-1"><a class="header-anchor" href="#查看载荷"><span>查看载荷</span></a></h4>
<h4 id="查看预览" tabindex="-1"><a class="header-anchor" href="#查看预览"><span>查看预览</span></a></h4>
<h4 id="查看响应" tabindex="-1"><a class="header-anchor" href="#查看响应"><span>查看响应</span></a></h4>
<blockquote>
<p>查看前端返回的 <code v-pre>JSON</code> 数据是由有问题，若 <code v-pre>JSON</code> 数据没有问题那么可能是在数据渲染到页面的过程中出现了问题。</p>
</blockquote>
<h3 id="查看状态码" tabindex="-1"><a class="header-anchor" href="#查看状态码"><span>查看状态码</span></a></h3>
<h4 id="_200" tabindex="-1"><a class="header-anchor" href="#_200"><span>200</span></a></h4>
<blockquote>
<p>200 了但是没有达到预期，可能是请求的问题。例如参数不全、请求路径等。</p>
</blockquote>
<h4 id="_404" tabindex="-1"><a class="header-anchor" href="#_404"><span>404</span></a></h4>
<blockquote>
<p>可能是请求地址写错了。</p>
</blockquote>
<h4 id="_500" tabindex="-1"><a class="header-anchor" href="#_500"><span>500</span></a></h4>
<blockquote>
<p>服务器端代码错误，这时打端点进行调试。一般可能是参数接收处理问题。</p>
</blockquote>
<h1 id="开发" tabindex="-1"><a class="header-anchor" href="#开发"><span>开发</span></a></h1>
<p>Service 调用 DAO，并且处理一下问题，提供服务。</p>
<h2 id="管理员管理" tabindex="-1"><a class="header-anchor" href="#管理员管理"><span>管理员管理</span></a></h2>
<h3 id="管理员表" tabindex="-1"><a class="header-anchor" href="#管理员表"><span>管理员表</span></a></h3>
<table>
<thead>
<tr>
<th>字段</th>
<th>类型</th>
<th></th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>id</td>
<td>int</td>
<td>PRIMARY KEY</td>
<td></td>
</tr>
<tr>
<td>username</td>
<td>varchar</td>
<td>NOT NULL</td>
<td></td>
</tr>
<tr>
<td>password</td>
<td>varchar</td>
<td>NOT NULL</td>
<td></td>
</tr>
<tr>
<td>mail</td>
<td>varchar</td>
<td></td>
<td></td>
</tr>
<tr>
<td>phone</td>
<td>varchar</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="admindao-接口" tabindex="-1"><a class="header-anchor" href="#admindao-接口"><span>AdminDao 接口</span></a></h3>
<table>
<thead>
<tr>
<th>方法</th>
<th></th>
<th>返回值</th>
<th>方法名</th>
<th>参数列表</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>查询用户信息(根据用户名和密码)</td>
<td></td>
<td>Admin</td>
<td>selectByUsernameAndPassword</td>
<td>String username, String password</td>
<td></td>
</tr>
<tr>
<td>查询用户信息</td>
<td></td>
<td>Admin</td>
<td>selectInfo</td>
<td>Integer id</td>
<td></td>
</tr>
<tr>
<td>查询用户信息(根据用户名)</td>
<td></td>
<td>Admin</td>
<td>selectByName</td>
<td>String username</td>
<td></td>
</tr>
<tr>
<td>修改用户资料信息</td>
<td></td>
<td>int</td>
<td>updateInfo</td>
<td>Admin admin</td>
<td></td>
</tr>
<tr>
<td>修改密码(根据 id )：</td>
<td></td>
<td>int</td>
<td>updatePassword</td>
<td>Admin admin</td>
<td>包含的数据是<br>要更新密码的 id<br>要更新密码的 name，<br>要更新的最新密码 password</td>
</tr>
</tbody>
</table>
<h2 id="分类管理" tabindex="-1"><a class="header-anchor" href="#分类管理"><span>分类管理</span></a></h2>
<h3 id="分类表" tabindex="-1"><a class="header-anchor" href="#分类表"><span>分类表</span></a></h3>
<table>
<thead>
<tr>
<th>字段</th>
<th>类型</th>
<th></th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>sid</td>
<td>int</td>
<td>PRIMARY KEY</td>
<td></td>
</tr>
<tr>
<td>sname</td>
<td>varchar</td>
<td></td>
<td></td>
</tr>
<tr>
<td>slocation</td>
<td>varchar</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="sortdao-接口" tabindex="-1"><a class="header-anchor" href="#sortdao-接口"><span>SortDao 接口</span></a></h3>
<table>
<thead>
<tr>
<th>方法</th>
<th></th>
<th>返回值</th>
<th>方法名</th>
<th>参数列表</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>添加分类</td>
<td></td>
<td>int</td>
<td>insert</td>
<td>Sort sort</td>
<td></td>
</tr>
<tr>
<td>删除分类(根据 ID)</td>
<td></td>
<td>int</td>
<td>delete</td>
<td>Integer sid</td>
<td></td>
</tr>
<tr>
<td>修改分类(根据 ID)</td>
<td></td>
<td>int</td>
<td>update</td>
<td>Sort sort</td>
<td></td>
</tr>
<tr>
<td>查询分类(根据 ID)</td>
<td></td>
<td>Sort</td>
<td>selectById</td>
<td>Integer sid</td>
<td></td>
</tr>
<tr>
<td>查询分类(根据分类)</td>
<td></td>
<td>Sort</td>
<td>selectByName</td>
<td>String sname</td>
<td>分类名不允许出现空值，<br>正常情况下返回的一定是一个对象</td>
</tr>
<tr>
<td>查询所有分类</td>
<td></td>
<td>List&lt;Sort&gt;</td>
<td>selectAll</td>
<td></td>
<td></td>
</tr>
<tr>
<td>查询某个分类下的条目数量</td>
<td></td>
<td>int</td>
<td>selectCount</td>
<td>String sname</td>
<td></td>
</tr>
<tr>
<td>查询分类及其分类下的图书数量</td>
<td></td>
<td>List&lt;Map&lt;String, Object&gt;&gt;</td>
<td>selectSortAndBookCount()</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="图书管理" tabindex="-1"><a class="header-anchor" href="#图书管理"><span>图书管理</span></a></h2>
<h3 id="图书表" tabindex="-1"><a class="header-anchor" href="#图书表"><span>图书表</span></a></h3>
<table>
<thead>
<tr>
<th>字段</th>
<th>类型</th>
<th></th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>bid</td>
<td>bigint(20)</td>
<td>PRIMARY KEY</td>
<td>与业务无关的字段</td>
</tr>
<tr>
<td>bno</td>
<td>char(5)</td>
<td>UNIQUE</td>
<td>图书唯一标识</td>
</tr>
<tr>
<td>bname</td>
<td>varchar(20)</td>
<td></td>
<td>图书名</td>
</tr>
<tr>
<td>bauthor</td>
<td>varchar(20)</td>
<td></td>
<td>图书作者</td>
</tr>
<tr>
<td>bscope</td>
<td>char(1)</td>
<td></td>
<td>图书面向对象范围：成人/青少年/儿童</td>
</tr>
<tr>
<td>bpubdate</td>
<td>date</td>
<td></td>
<td>图书出版日期</td>
</tr>
<tr>
<td>bprice</td>
<td>decimal(5,2)</td>
<td></td>
<td>图书价格</td>
</tr>
<tr>
<td>bstate</td>
<td>tinyint(1)</td>
<td></td>
<td>图书状态：1有货/0无货</td>
</tr>
<tr>
<td>sid</td>
<td>int(11)</td>
<td></td>
<td>图书所属分类的 sid</td>
</tr>
</tbody>
</table>
<h3 id="bookdao-接口" tabindex="-1"><a class="header-anchor" href="#bookdao-接口"><span>BookDao 接口</span></a></h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>返回值</th>
<th>方法名</th>
<th>参数列表</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>分页查询</td>
<td>void</td>
<td>selectByPage</td>
<td>Page<BookVo> page, String bname, String bauthor, String bscope</td>
<td></td>
</tr>
<tr>
<td>查询图书总条目数</td>
<td>Long</td>
<td>selectCount</td>
<td>String bname, String bauthor, String bscope</td>
<td></td>
</tr>
<tr>
<td>查询受众类型信息</td>
<td>List</td>
<td>selectScope</td>
<td></td>
<td></td>
</tr>
<tr>
<td>增加图书条目</td>
<td>int</td>
<td>insert</td>
<td>Book book</td>
<td></td>
</tr>
<tr>
<td>删除图书条目</td>
<td>int</td>
<td>delete</td>
<td>Integer bid</td>
<td></td>
</tr>
<tr>
<td>修改图书信息</td>
<td>int</td>
<td>update</td>
<td>Book book</td>
<td></td>
</tr>
<tr>
<td>修改图书状态</td>
<td>boolean</td>
<td>updateBookState</td>
<td>Long bid, Integer state</td>
<td></td>
</tr>
<tr>
<td>查询某个图书(根据 bid)</td>
<td>Book</td>
<td>selectById</td>
<td>Integer bid</td>
<td></td>
</tr>
<tr>
<td>查询某个图书(根据 bno)</td>
<td>Book</td>
<td>selectByNo</td>
<td>Integer bno</td>
<td></td>
</tr>
<tr>
<td>查询最大的图书编号</td>
<td>String</td>
<td>selectMaxNo</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="受众管理" tabindex="-1"><a class="header-anchor" href="#受众管理"><span>受众管理</span></a></h2>
<h3 id="受众表" tabindex="-1"><a class="header-anchor" href="#受众表"><span>受众表</span></a></h3>
<table>
<thead>
<tr>
<th>字段</th>
<th>类型</th>
<th></th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>scopeid</td>
<td>bigint</td>
<td>PRIMARY KEY</td>
<td>受众 ID</td>
</tr>
<tr>
<td>scopeno</td>
<td>char</td>
<td>NOT NULL</td>
<td>受众编号</td>
</tr>
<tr>
<td>scopename</td>
<td>varchar</td>
<td>NOT NULL</td>
<td>受众名称</td>
</tr>
<tr>
<td>scopestatue</td>
<td>tinyint)</td>
<td></td>
<td>是否启用</td>
</tr>
</tbody>
</table>
<h3 id="scopedao" tabindex="-1"><a class="header-anchor" href="#scopedao"><span>ScopeDao</span></a></h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>返回值</th>
<th>方法名</th>
<th>参数列表</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>分页查询</td>
<td>void</td>
<td>selectByPage</td>
<td>Page<Scope> page, String scopename, String scopestatue</td>
<td></td>
</tr>
<tr>
<td>查询受众类型总条目数</td>
<td>Long</td>
<td>selectCount</td>
<td>String scopename, String scopestatue</td>
<td></td>
</tr>
<tr>
<td>受众类型及其该类型下的图书数量</td>
<td>List&lt;Map&lt;String, Object&gt;&gt;</td>
<td>selectScopeAndBookCount</td>
<td></td>
<td>返回的数据格式：{scopeid: 1, scopename: &quot;社会学&quot;, bookCount: 10}, {scopeid: 2, scopename: &quot;心理学&quot;, bookCount: 8}, ...</td>
</tr>
<tr>
<td>查询受众类型所有条目</td>
<td>List<Scope></td>
<td>selectAll</td>
<td></td>
<td></td>
</tr>
<tr>
<td>查询某个受众类型(根据 scopeid)</td>
<td>Scope</td>
<td>selectById</td>
<td>Integer scopeid</td>
<td></td>
</tr>
<tr>
<td>查询某个受众类型(根据 scopename)</td>
<td>Scope</td>
<td>selectByScopeName</td>
<td>String scopeName</td>
<td></td>
</tr>
<tr>
<td>删除某个受众类型(根据 scopeid)</td>
<td>boolean</td>
<td>delete</td>
<td>Integer scopeid</td>
<td></td>
</tr>
<tr>
<td>修改受众类型的状态</td>
<td>boolean</td>
<td>softDelete</td>
<td>Integer scopeid, Integer statue</td>
<td>statue 参数为要修改成的状态，0 表示禁用，1 表示启用</td>
</tr>
<tr>
<td>修改某个受众类型(根据 scopeid)</td>
<td>boolean</td>
<td>update</td>
<td>Scope scope</td>
<td></td>
</tr>
<tr>
<td>添加受众类型</td>
<td>boolean</td>
<td>add</td>
<td>Scope scope</td>
<td></td>
</tr>
<tr>
<td>查询最大受众类型的编号</td>
<td>String</td>
<td>selectMaxNo</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="顾客管理" tabindex="-1"><a class="header-anchor" href="#顾客管理"><span>顾客管理</span></a></h2>
<h3 id="顾客表" tabindex="-1"><a class="header-anchor" href="#顾客表"><span>顾客表</span></a></h3>
<table>
<thead>
<tr>
<th>字段</th>
<th>类型</th>
<th></th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>cid</td>
<td>int</td>
<td>PRIMARY KEY</td>
<td>顾客ID</td>
</tr>
<tr>
<td>cno</td>
<td>char</td>
<td>NOT NULL</td>
<td>顾客编号</td>
</tr>
<tr>
<td>cname</td>
<td>varchar</td>
<td>NOT NULL</td>
<td>顾客名称</td>
</tr>
<tr>
<td>cphone</td>
<td>varchar</td>
<td>NOT NULL</td>
<td>顾客手机</td>
</tr>
</tbody>
</table>
<h3 id="customerdao" tabindex="-1"><a class="header-anchor" href="#customerdao"><span>CustomerDao</span></a></h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>返回值</th>
<th>方法名</th>
<th>参数列表</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>分页查询</td>
<td>void</td>
<td>selectByPage</td>
<td>Page<Customer> page, String cPhone</td>
<td></td>
</tr>
<tr>
<td>查询(根据 cid)</td>
<td>Customer</td>
<td>selectByCid</td>
<td>String cid</td>
<td></td>
</tr>
<tr>
<td>查询(根据电话号码)</td>
<td>Customer</td>
<td>selectByPhoneNum</td>
<td>String cPhone</td>
<td></td>
</tr>
<tr>
<td>查询最大编号</td>
<td>String</td>
<td>selectMaxNo</td>
<td></td>
<td></td>
</tr>
<tr>
<td>查询顾客总条目数</td>
<td>Long</td>
<td>selectCount</td>
<td>String cPhone</td>
<td></td>
</tr>
<tr>
<td>增加</td>
<td>int</td>
<td>insert</td>
<td>Customer customer</td>
<td></td>
</tr>
<tr>
<td>删除</td>
<td>int</td>
<td>delete</td>
<td>Integer cid</td>
<td></td>
</tr>
<tr>
<td>修改顾客资料</td>
<td>int</td>
<td>update</td>
<td>Customer customer</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="订单管理" tabindex="-1"><a class="header-anchor" href="#订单管理"><span>订单管理</span></a></h2>
<h3 id="订单表" tabindex="-1"><a class="header-anchor" href="#订单表"><span>订单表</span></a></h3>
<table>
<thead>
<tr>
<th>字段</th>
<th>类型</th>
<th></th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>cbid</td>
<td>int</td>
<td>PRIMARY KEY</td>
<td>索引</td>
</tr>
<tr>
<td>orderid</td>
<td>char</td>
<td>NOT NULL</td>
<td>订单ID</td>
</tr>
<tr>
<td>cno</td>
<td>char</td>
<td>NOT NULL</td>
<td>顾客编号</td>
</tr>
<tr>
<td>bno</td>
<td>char</td>
<td></td>
<td>图书编号</td>
</tr>
<tr>
<td>orderprice</td>
<td>decimal</td>
<td></td>
<td>购买价格</td>
</tr>
<tr>
<td>ordertime</td>
<td>datetime</td>
<td>NOT NULL</td>
<td>购买时间</td>
</tr>
</tbody>
</table>
<h3 id="customerbookdao" tabindex="-1"><a class="header-anchor" href="#customerbookdao"><span>CustomerBookDao</span></a></h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>返回值</th>
<th>方法名</th>
<th>参数列表</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>分页查询</td>
<td>void</td>
<td>selectByPage</td>
<td>Page<CustomerBookVo> page, String phone, String bname, String bauthor, String orderid, String orderTime</td>
<td></td>
</tr>
<tr>
<td>查询订单数</td>
<td>Long</td>
<td>selectCount</td>
<td>String phone, String bname, String bauthor, String orderid, String orderTime</td>
<td></td>
</tr>
<tr>
<td>查询订单销售额</td>
<td>BigDecimal</td>
<td>selectSales</td>
<td>String phone, String bname, String bauthor, String orderid, String orderTime</td>
<td></td>
</tr>
<tr>
<td>查询客户的购买记录</td>
<td>List<CustomerBookVo></td>
<td>selectRecommendedInfo</td>
<td>String phone</td>
<td>用于分析喜好</td>
</tr>
<tr>
<td>添加订单条目</td>
<td>int</td>
<td>insert</td>
<td>CustomerAndBook customerAndBook</td>
<td></td>
</tr>
<tr>
<td>查询销量排行</td>
<td>List&lt;Map&lt;String, Object&gt;&gt;</td>
<td>selectRank</td>
<td>String sname</td>
<td></td>
</tr>
<tr>
<td>删除订单条目</td>
<td>int</td>
<td>delete</td>
<td>String orderId</td>
<td></td>
</tr>
<tr>
<td>生成随机订单号</td>
<td>String</td>
<td>genRandomOrderId</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h1 id="todo" tabindex="-1"><a class="header-anchor" href="#todo"><span>TODO</span></a></h1>
<ul class="task-list-container">
<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 完善售卖的业务流程  <font color=#646a73 size=1px><em>更新时间：2024-04-06 16点39分45</em></font></label></li>
<li></li>
</ul>
<h1 id="部署" tabindex="-1"><a class="header-anchor" href="#部署"><span>部署</span></a></h1>
<p>部署在了 opt 下</p>
</div></template>


