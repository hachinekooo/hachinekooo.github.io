<template><div><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>
<p><strong>为什么容量必须是 2 的次幂</strong></p>
<ol>
<li>
<p><strong>索引计算高效</strong>：通过 hash &amp; (capacity - 1) 快速计算索引，替代取模操作。在计算机中，位运算的速度要远高于取余运算，因为计算机本质上就是二进制嘛。</p>
</li>
<li>
<p><strong>扩容高效</strong>：容量翻倍时，仅通过简单的位运算 hash &amp; (oldCap) 即可判断元素位置，无需重新计算所有索引。</p>
</li>
<li>
<p><strong>冲突率低</strong>：2 幂次⽅刚好是偶数，偶数-1 是奇数，奇数的⼆进制最后⼀位是 1，也就保证了 hash &amp;(length-1) 的最后⼀位可能为 0，也可能为 1（取决于 hash 的值），这样可以保证哈希值的均匀分布。</p>
</li>
<li>
<p><strong>实现简单</strong>：避免复杂的对齐计算。</p>
</li>
</ol>
<p>链表树化的条件由两部分组成：</p>
<ol>
<li>
<p>插入时链表长度达到 &gt;= 8，调用 treeifyBin。</p>
</li>
<li>
<p>treeifyBin 方法中，数组长度必须 &gt;= 64 才真正树化，否则会优先扩容。</p>
</li>
</ol>
</div></template>


