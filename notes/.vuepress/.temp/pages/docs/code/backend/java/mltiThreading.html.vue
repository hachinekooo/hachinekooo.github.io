<template><div><h2 id="threadlocal" tabindex="-1"><a class="header-anchor" href="#threadlocal"><span>ThreadLocal</span></a></h2>
<h3 id="threadlocal-的实现原理" tabindex="-1"><a class="header-anchor" href="#threadlocal-的实现原理"><span>ThreadLocal 的实现原理</span></a></h3>
<p>ThreadLocal 本质上是一个线程隔离的变量存储机制，它的核心实现主要依赖以下几个关键部分：</p>
<ol>
<li>
<p>ThreadLocal 对象本身不存储值，而是作为一个 key 来访问<code v-pre>线程中的ThreadLocalMap</code></p>
</li>
<li>
<p>Thread 类中有一个 ThreadLocalMap 类型的成员变量 threadLocals:</p>
</li>
</ol>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Thread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    ThreadLocalMap</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> threadLocals </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    //...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>ThreadLocalMap 的实现是类似 HashMap 的结构:</li>
</ol>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ThreadLocalMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // Entry 继承自 WeakReference</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Entry</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> WeakReference</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ThreadLocal</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">>></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        Entry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ThreadLocal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">> </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">k</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Object</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> v</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            super</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(k);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            value </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> v;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Entry</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">[] table</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    //...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工作原理如下：</p>
<ol>
<li>当调用 <code v-pre>ThreadLocal.set(value)</code> 时：</li>
</ol>
<ul>
<li>首先获取当前线程对象</li>
<li>从线程对象中获取 ThreadLocalMap</li>
<li>如果 map 不存在则创建一个</li>
<li>将 ThreadLocal 对象作为 key，值作为 value 存储到 map 中</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">T</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> value) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 获取当前线程对象</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    Thread</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> t </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> Thread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">currentThread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 根据当前线程对象，获取当前线程对象中的ThreadLocalMap类型的 threadlocals变量</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    ThreadLocalMap</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> map </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getMap</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(t)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 如果map存在</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (map </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 执行map中的set方法，进行数据存储</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, value);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 如果map不存在，则当前线程就创建ThreadLocalMap并存值</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        createMap</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> value)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> createMap</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Thread</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> T</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> firstValue) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">	// 给当前线程的 threadlocals变量赋值</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">    t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">threadLocals</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ThreadLocalMap</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> firstValue)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ThreadLocalMap</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">ThreadLocal</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">?</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> firstKey</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Object</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> firstValue) {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 内部成员数组，INITIAL_CAPACITY值为16的常量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    table </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Entry</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">[INITIAL_CAPACITY]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 位运算，结果与取模相同，计算出需要存放的位置</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> i </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> firstKey</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">threadLocalHashCode</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> &#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> (INITIAL_CAPACITY </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">	// 以 ThreadLocalMap 自身为Key</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    table[i] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Entry</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(firstKey</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> firstValue)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    setThreshold</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(INITIAL_CAPACITY)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>当调用 ThreadLocal.get() 时：</li>
</ol>
<ul>
<li>同样获取当前线程的 ThreadLocalMap</li>
<li>以 ThreadLocal 对象为 key 查找对应的 Entry</li>
<li>返回 Entry 中存储的 value</li>
</ul>
<ol start="3">
<li>内存泄露问题：</li>
</ol>
<ul>
<li>ThreadLocalMap 的 Entry 继承自 WeakReference</li>
<li>ThreadLocal 作为 key 被弱引用持有,可以被垃圾回收</li>
<li>但 value 仍然被 Entry 强引用持有</li>
<li>因此使用完 ThreadLocal 后需要主动调用 remove() 方法清理</li>
</ul>
<p>代码示例：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ThreadLocal</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">T</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">T</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Thread</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> t</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> Thread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">currentThread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        ThreadLocalMap</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(t);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (map </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, value);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        else</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            createMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(t, value);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">    </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> T</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Thread</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> t</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> Thread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">currentThread</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        ThreadLocalMap</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> getMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(t);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (map </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">            ThreadLocalMap</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Entry</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getEntry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">this</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (e </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">SuppressWarnings</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"unchecked"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">                T</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> result</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (T)</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> result;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> setInitialValue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种实现方式的优点是：</p>
<ol>
<li>实现了线程隔离，每个线程都拥有自己的变量副本</li>
<li>避免了同步操作，提高了性能</li>
<li>数据互不干扰，简化了并发编程</li>
</ol>
<p>注意点：</p>
<ol>
<li>及时调用 remove() 方法避免内存泄露</li>
<li>注意线程池场景下的变量清理</li>
<li>ThreadLocal 对象的生命周期管理</li>
</ol>
<h3 id="threadlocal-内存泄漏" tabindex="-1"><a class="header-anchor" href="#threadlocal-内存泄漏"><span>ThreadLocal 内存泄漏</span></a></h3>
<Mermaid id="mermaid-164" code="eJxLL0osyFDwCeJSAIKQjKLUxBTD6Oe79j9f0R2roKtrBxXzyU9OzPFNLDCMRuXHIukzwqPPCI8+uNkQfYlJOanRrnklRZXPpm54vrsFqhQkDFYAljKEqMAqZ4RHzjhaT08PIgMxByRV83TPrqd7pj6fsqJGISwxpzTVMBpMPW3Yg6pUD6x2I0xtiA+yr5CUGmE11QibqUClGKaCZYPDol/OnfmsofFp/4yX7f3QQIXIgYnikkqgz6BOS8vMybFSTrNM0ykuKcrPTrVSNjY2hrJ1yzNTSjKsjAoq0PUZka4vxAeqJymJeD3gOIBalZaCXxsAAKTpoQ=="></Mermaid><p>内存泄漏的原因：</p>
<ol>
<li>
<p>强引用没有正确解除</p>
<ul>
<li>当我们让静态变量 = null 时,ThreadLocal 对象失去了强引用</li>
<li>此时 ThreadLocal 仅剩 Entry 对象的弱引用</li>
<li>ThreadLocal 对象在下次 GC 时就会被回收</li>
<li>但关键问题在于: Entry 对象仍然被 ThreadLocalMap 的 table 数组强引用着</li>
<li>Entry 中的 value 也依然被 Entry 强引用着</li>
<li>这导致 value 无法被回收,造成内存泄漏</li>
</ul>
</li>
<li>
<p>为什么我们不能依赖 set 方法解决:</p>
<ul>
<li>虽然ThreadLocal 的 set 方法确实会清理 key 为 null 的 Entry</li>
<li>但这种清理是不可靠的,因为依赖于下次调用 set 时否能碰巧命中这个位置</li>
<li>如果后续没有 set 操作,或 set 的 hash 没有命中该位置，内存泄漏就会持续存在</li>
</ul>
</li>
</ol>
<p>最佳实践:</p>
<ul>
<li>明确调用 ThreadLocal 的 remove() 方法,主动清理 Entry</li>
<li>remove 会断开 table 数组对 Entry 的强引用</li>
<li>然后再解除外部对 ThreadLocal 的强引用</li>
<li>这样可以确保整个引用链都被安全地清理</li>
<li></li>
<li>养成使用完 ThreadLocal 后必须调用 remove 的习惯</li>
<li>最好把 ThreadLocal 的清理放在 finally 块中</li>
<li>如果是线程池场景,清理显得尤为重要,因为线程会被重用</li>
</ul>
<h2 id="reentrantlock" tabindex="-1"><a class="header-anchor" href="#reentrantlock"><span>ReentrantLock</span></a></h2>
<table>
<thead>
<tr>
<th><strong>功能</strong></th>
<th><strong>使用场景</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>基本用法 (<code v-pre>lock()</code>)</strong></td>
<td>需要显式控制锁的场景，比如复杂的并发逻辑。</td>
</tr>
<tr>
<td><strong>尝试获取锁 (<code v-pre>tryLock()</code>)</strong></td>
<td>不希望线程阻塞的场景，比如任务可以稍后重试或直接放弃。</td>
</tr>
<tr>
<td><strong>超时获取锁 (<code v-pre>tryLock(timeout, unit)</code>)</strong></td>
<td>需要控制任务执行时间的场景，比如避免死锁或任务堆积。</td>
</tr>
<tr>
<td><strong>可中断获取锁 (<code v-pre>lockInterruptibly()</code>)</strong></td>
<td>需要响应中断的场景，比如任务取消或线程池关闭。</td>
</tr>
</tbody>
</table>
</div></template>


