<template><div><h3 id="栈内存空间" tabindex="-1"><a class="header-anchor" href="#栈内存空间"><span>栈内存空间</span></a></h3>
<blockquote>
<p>基本数据类型
引用（数组名、类名、接口名）</p>
</blockquote>
<ul>
<li>先进后出，后进先出</li>
<li>存取速度比堆要快，仅次于寄存器，栈数据可以共享，但缺点是，存在栈中的数据大小与生存必须是确定的，缺乏灵活性</li>
</ul>
<h3 id="堆内存空间" tabindex="-1"><a class="header-anchor" href="#堆内存空间"><span>堆内存空间</span></a></h3>
<blockquote>
<p><code v-pre>new</code> 出来的内容（数组、对象）</p>
</blockquote>
<ul>
<li>堆可以动态地分配内存大小，生存期也不必事先告诉编译器，因为它是在运行时动态分配内存的，但缺点是，由于要在运行时动态分配内存，存取速度较慢。</li>
</ul>
<h2 id="图解-jvm-内存模型" tabindex="-1"><a class="header-anchor" href="#图解-jvm-内存模型"><span>图解 JVM 内存模型：</span></a></h2>
<figure><img src="@source/appends/img/JVM_RAM_Structure.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><img src="@source/appends/img/JVM_RAM_Structure2.png" alt="" loading="lazy">
<img src="@source/appends/img/JVM_RAM_Structure3.png" alt="" loading="lazy"></p>
<p>线程私有内存区：</p>
<ul>
<li>随着线程的产生和消亡，编译时确定所需要的内存大小。</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料 ：</span></a></h2>
<ul>
<li><a href="https://www.bilibili.com/video/BV1ET4y1Z711/" target="_blank" rel="noopener noreferrer">带你认识java中jvm虚拟机栈</a></li>
<li><a href="https://www.bilibili.com/video/BV1Q64y1h7PT" target="_blank" rel="noopener noreferrer">白话 JVM 内存结构，死也忘不了</a></li>
<li><a href="https://www.bilibili.com/video/BV12t411u726/" target="_blank" rel="noopener noreferrer">jvm内存模型全面解析哔哩哔哩</a></li>
</ul>
</div></template>


