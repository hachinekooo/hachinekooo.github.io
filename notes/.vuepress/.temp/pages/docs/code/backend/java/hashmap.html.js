import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/backend/java/hashmap.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/backend/java/hashmap.html\",\"title\":\"HashMap面经常见问题\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"HashMap面经常见问题\",\"icon\":\"file\",\"order\":null,\"category\":[\"Java\"],\"tags\":[\"面经\"],\"description\":\"为什么容量必须是 2 的次幂 索引计算高效：通过 hash & (capacity - 1) 快速计算索引，替代取模操作。在计算机中，位运算的速度要远高于取余运算，因为计算机本质上就是二进制嘛。 扩容高效：容量翻倍时，仅通过简单的位运算 hash & (oldCap) 即可判断元素位置，无需重新计算所有索引。 冲突率低：2 幂次⽅刚好是偶数，偶数-1 ...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://blueboysalvat.github.io/docs/code/backend/java/hashmap.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"HashMap面经常见问题\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"为什么容量必须是 2 的次幂 索引计算高效：通过 hash & (capacity - 1) 快速计算索引，替代取模操作。在计算机中，位运算的速度要远高于取余运算，因为计算机本质上就是二进制嘛。 扩容高效：容量翻倍时，仅通过简单的位运算 hash & (oldCap) 即可判断元素位置，无需重新计算所有索引。 冲突率低：2 幂次⽅刚好是偶数，偶数-1 ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"WangWenpeng\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"面经\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"HashMap面经常见问题\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"WangWenpeng\\\",\\\"url\\\":\\\"blueboysalvat.github.io\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"\",\"slug\":\"\",\"link\":\"#\",\"children\":[]}],\"readingTime\":{\"minutes\":0.87,\"words\":260},\"filePathRelative\":\"docs/code/backend/java/hashmap.md\",\"excerpt\":\"<h2></h2>\\n<p><strong>为什么容量必须是 2 的次幂</strong></p>\\n<ol>\\n<li>\\n<p><strong>索引计算高效</strong>：通过 hash &amp; (capacity - 1) 快速计算索引，替代取模操作。在计算机中，位运算的速度要远高于取余运算，因为计算机本质上就是二进制嘛。</p>\\n</li>\\n<li>\\n<p><strong>扩容高效</strong>：容量翻倍时，仅通过简单的位运算 hash &amp; (oldCap) 即可判断元素位置，无需重新计算所有索引。</p>\\n</li>\\n<li>\\n<p><strong>冲突率低</strong>：2 幂次⽅刚好是偶数，偶数-1 是奇数，奇数的⼆进制最后⼀位是 1，也就保证了 hash &amp;(length-1) 的最后⼀位可能为 0，也可能为 1（取决于 hash 的值），这样可以保证哈希值的均匀分布。</p>\\n</li>\\n<li>\\n<p><strong>实现简单</strong>：避免复杂的对齐计算。</p>\\n</li>\\n</ol>\",\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
