<template><div><h2 id="java-语言数组结构教程" tabindex="-1"><a class="header-anchor" href="#java-语言数组结构教程"><span>Java 语言数组结构教程</span></a></h2>
<p>在 <strong><a href="https://haicoder.net/java/java-development.html" target="_blank" rel="noopener noreferrer">Java 语言</a></strong> 中，虚拟机的内存空间分为堆内存空间和栈内存空间。Java 的数组就需要用到这两个空间，我们定义的数组的名字，它是保存在 Java 栈上面，然后记录的数据指向堆里面具体数据的地址。</p>
<h2 id="java-语言数组结构详解" tabindex="-1"><a class="header-anchor" href="#java-语言数组结构详解"><span>Java 语言数组结构详解</span></a></h2>
<h3 id="堆栈内存解释" tabindex="-1"><a class="header-anchor" href="#堆栈内存解释"><span>堆栈内存解释</span></a></h3>
<p>数组的操作中，在栈内存中保存的永远是数组的名称，只开辟了栈内存空间的数组是永远没有办法被使用的，必须有指向的堆堆内存数组才可以被使用，要开辟新的堆内存，需要使用 new 关键字。然后就可以将此堆堆使用权交给栈。一个堆内存空间可以被多个栈内存空间同时指向。</p>
<p>生活中的场景就是一个人，它可以有多个名字，而名字我们可以理解为栈，而人就相当于一个堆。</p>
<figure><img src="https://haicoder.net/uploads/pic/server/java/java-array/01 java堆栈解释.png" alt="01 java堆栈解释.png" tabindex="0" loading="lazy"><figcaption>01 java堆栈解释.png</figcaption></figure>
<h3 id="数组堆栈" tabindex="-1"><a class="header-anchor" href="#数组堆栈"><span>数组堆栈</span></a></h3>
<p>我们以一个代码为例子：</p>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">package</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> com.haicoder.net.array</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ArrayTest</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">     </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">	public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#C678DD">		int</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scores</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//定义一个数组         </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">		scores </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]; </span><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//为每个数组分配内存空间    </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	}</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体的内存分配图如下：</p>
<figure><img src="https://haicoder.net/uploads/pic/server/java/java-array/02 java数组堆栈.png" alt="02 java数组堆栈.png" tabindex="0" loading="lazy"><figcaption>02 java数组堆栈.png</figcaption></figure>
<p>我们可以看到，<code v-pre>scores</code> 这个名词指向了堆里面的一块内存空间，它被分了三个连续的空间，里面的值都是 <code v-pre>0</code> ，因为我们定义了 <code v-pre>int</code> 类型的数组，并且给它分配了空间，而 <code v-pre>int</code> 类型的默认值是 <code v-pre>0</code> ，所以我们刚初始化的时候，数组就是这样的分配模型。</p>
<p>在后面对数组进行操作的时候，其实是对堆里面的数据进行操作。</p>
<h2 id="java-语言数组总结" tabindex="-1"><a class="header-anchor" href="#java-语言数组总结"><span>Java 语言数组总结</span></a></h2>
<p>和普通类型不一样，数组类型是引用数据类型，它的名字存放在栈中，具体的数据，存放在堆中。</p>
<p>因为堆是可以被栈里面多个名字指向的，所以我们在实际工作中如果发现自己的数组值不是自己期望的数据，可以看下是不是被别的地方引用给修改了。</p>
<p>原文链接：
<a href="https://haicoder.net/java/java-array-memory.html" target="_blank" rel="noopener noreferrer">Java数组内存-Java数组内存分配-Java数组内存空间-嗨客网</a></p>
</div></template>


