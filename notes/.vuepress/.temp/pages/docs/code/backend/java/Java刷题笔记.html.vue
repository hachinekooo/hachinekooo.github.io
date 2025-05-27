<template><div><p>#String #StringBuffer #StringBuilder</p>
<ul>
<li><code v-pre>StringBuffer</code> 是线程安全的，<code v-pre>StringBuilder</code> 运行速度最快，比 <code v-pre>String</code> 还快</li>
</ul>
<p>#方法重写</p>
<ul>
<li>
<p>方法的重写（<code v-pre>override</code>）两同两小一大原则：</p>
<ul>
<li>方法名相同，参数类型相同</li>
<li>子类返回类型小于等于父类方法返回类型，</li>
<li>子类抛出异常小于等于父类方法抛出异常，</li>
<li>子类访问权限大于等于父类方法访问权限。</li>
</ul>
</li>
<li>
<p>局部变量可以先申明不用必须初始化，但使用到了一定要先初始化，不同于类中成员变量会有初始值。</p>
</li>
</ul>
<p>#抽象类 #最终类</p>
<ul>
<li>抽象类能被继承，最终类只能被实例化。</li>
<li>抽象类中可以没有抽象方法，最终类中可以没有最终方法</li>
<li>抽象类和最终类都可以被声明使用；
<ul>
<li>是可以声明，而并非实例化。例如可以声明一个接口然后接收一个接口实现类</li>
</ul>
</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">package</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> test1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Shape</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> draw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Circle</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Shape</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Override</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> draw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Drawing Circle"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">abstract</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Animal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    abstract</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> sound</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Dog</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Animal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Override</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> sound</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Dog barks"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // 声明一个接口类型的变量，并接收一个接口的实现类  </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Shape</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> shape</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Circle</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        shape</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">draw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">        // 声明一个抽象类类型的变量，并接收一个抽象类的子类  </span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        Animal</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> animal</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> Dog</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();  </span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        animal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sound</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>#包装类</p>
<ul>
<li>当包装类与基本数据类型对比时，包装类会自动拆箱变为基本类型再进行比较</li>
<li>包装数据类直接赋值，默认调用其对用的 <code v-pre>valueOf()</code>方法。操作<code v-pre>-128 ~ 127</code> 之内的整型，在第一次引用，会在缓存中 new 一个对象；再次引用，直接从缓存中查找；操作<code v-pre>-128 ~ 127</code> 之外的整型，则每次都要 new<code v-pre> </code>一个对象。也就是说如果已经创建了一个<code v-pre>-128 ~ 127</code> 之间的整数，使用 <code v-pre>valueOf</code> 创建第二次时，不会使用 <code v-pre>new</code> 关键字，而用已经缓存的对象。</li>
</ul>
<p>#运算符</p>
<ul>
<li><code v-pre>&amp;</code> 与操作；</li>
<li><code v-pre>|</code> 或操作；</li>
<li><code v-pre>！</code> 非操作；</li>
<li><code v-pre>~</code> 取反操作；</li>
</ul>
<p><code v-pre>！</code> 是逻辑运算符，将数据整体运算；而 <code v-pre>~</code> 是位运算符，将二进制数的每一位取反运算</p>
<p>Java 中的位运算符：</p>
<ul>
<li>&gt;&gt;表示右移，如果该数为正，则高位补 <code v-pre>0</code>，若为负数，则高位补 <code v-pre>1</code>；</li>
<li>&gt;&gt;&gt;表示无符号右移，也叫逻辑右移，即若该数为正，则高位补 <code v-pre>0</code>，而若该数为负数，则右移后高位同样补 <code v-pre>0</code>
eg:</li>
</ul>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>x=5>>2 （>>带符号右移）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>将0101右移2位，为：0001。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>y=x>>>2 （>>>无符号右移，左边空缺补充为0）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>将0001右移2位，补0。结果为：0000。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>#tryCatch</p>
<ul>
<li>在 <code v-pre>try</code> 语句块或 <code v-pre>catch</code> 语句块中执行到 <code v-pre>System.exit(0)</code>直接退出程序</li>
<li>不管 <code v-pre>catch</code> 是否捕获异常，<code v-pre>finally</code> 语句块都是要被执行的</li>
<li><code v-pre>finally</code> 块中的 <code v-pre>return</code> 语句会覆盖 <code v-pre>try</code> 块中的 <code v-pre>return</code> 返回</li>
</ul>
<p>根据官方的 <code v-pre>JVM</code> 规范：
如果 <code v-pre>try</code> 语句里有 <code v-pre>return</code>，那么代码的行为如下：</p>
<ul>
<li>如果有返回值，就把返回值保存到局部变量中</li>
<li>执行 jsr 指令跳到 <code v-pre>finally</code> 语句里执行</li>
<li>执行完 <code v-pre>finally</code> 语句后，返回之前保存在局部变量表里的值</li>
<li>如果 <code v-pre>try</code>，<code v-pre>finally</code> 语句里均有 <code v-pre>return</code>，忽略 <code v-pre>try</code> 的 <code v-pre>return</code>，而使用 <code v-pre>finally</code> 的 <code v-pre>return</code>.</li>
</ul>
<p>#中间件
中间件位于操作系统之上，应用软件之下，而不是操作系统内核中</p>
<p>#JVM</p>
<p>通过 ClassLoader 寻找和装载 class 文件</p>
<p>解释字节码成为指令并执行，提供 class 文件的运行环境</p>
<p>进行运行期间垃圾回收</p>
<p>#静态初始化
关静态初始化块说法正确的是？</p>
<ul>
<li>
<p>无法直接调用静态初始化块</p>
</li>
<li>
<p>在创建第一个实例前或引用任何静态成员之前，将自动调用静态初始化块来初始化</p>
</li>
<li>
<p>静态初始化块既没有访问修饰符，也没有参数</p>
</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre v-pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> i </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">i </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">++;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"i的值是 : "</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i);</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic">//i的值是 :0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>JVM </code> 在处理 <code v-pre>i = i++;</code> 时 , 会建立一个临时变量来接收 i++ 的值 , 现在 i 的 0 的值被使用(赋值给临时变量)，使用之后 i 自增成为 1，然后此时返回这个临时变量的值 , 返回的值再被等号左边的变量接收了 , 这样就是说 i 虽然自增了但是又被赋值了0 , 这样输出的结果自然就是 0 了。</p>
</div></template>


