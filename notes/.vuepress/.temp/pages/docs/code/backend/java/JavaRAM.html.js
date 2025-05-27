import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/backend/java/javaRAM.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/backend/java/javaRAM.html\",\"title\":\"Java中的内存模型\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Java中的内存模型\",\"icon\":\"file\",\"category\":[\"Java\"],\"tags\":[\"内存模型\"],\"description\":\"栈内存空间 基本数据类型 引用（数组名、类名、接口名） 先进后出，后进先出 存取速度比堆要快，仅次于寄存器，栈数据可以共享，但缺点是，存在栈中的数据大小与生存必须是确定的，缺乏灵活性 堆内存空间 new 出来的内容（数组、对象） 堆可以动态地分配内存大小，生存期也不必事先告诉编译器，因为它是在运行时动态分配内存的，但缺点是，由于要在运行时动态分配内存，...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://blueboysalvat.github.io/docs/code/backend/java/javaRAM.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Java中的内存模型\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"栈内存空间 基本数据类型 引用（数组名、类名、接口名） 先进后出，后进先出 存取速度比堆要快，仅次于寄存器，栈数据可以共享，但缺点是，存在栈中的数据大小与生存必须是确定的，缺乏灵活性 堆内存空间 new 出来的内容（数组、对象） 堆可以动态地分配内存大小，生存期也不必事先告诉编译器，因为它是在运行时动态分配内存的，但缺点是，由于要在运行时动态分配内存，...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"WangWenpeng\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"内存模型\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Java中的内存模型\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"WangWenpeng\\\",\\\"url\\\":\\\"blueboysalvat.github.io\\\"}]}\"]]},\"headers\":[{\"level\":3,\"title\":\"栈内存空间\",\"slug\":\"栈内存空间\",\"link\":\"#栈内存空间\",\"children\":[]},{\"level\":3,\"title\":\"堆内存空间\",\"slug\":\"堆内存空间\",\"link\":\"#堆内存空间\",\"children\":[]},{\"level\":2,\"title\":\"图解 JVM 内存模型：\",\"slug\":\"图解-jvm-内存模型\",\"link\":\"#图解-jvm-内存模型\",\"children\":[]},{\"level\":2,\"title\":\"参考资料 ：\",\"slug\":\"参考资料\",\"link\":\"#参考资料\",\"children\":[]}],\"readingTime\":{\"minutes\":0.86,\"words\":259},\"filePathRelative\":\"docs/code/backend/java/javaRAM.md\",\"excerpt\":\"<h3>栈内存空间</h3>\\n<blockquote>\\n<p>基本数据类型\\n引用（数组名、类名、接口名）</p>\\n</blockquote>\\n<ul>\\n<li>先进后出，后进先出</li>\\n<li>存取速度比堆要快，仅次于寄存器，栈数据可以共享，但缺点是，存在栈中的数据大小与生存必须是确定的，缺乏灵活性</li>\\n</ul>\\n<h3>堆内存空间</h3>\\n<blockquote>\\n<p><code>new</code> 出来的内容（数组、对象）</p>\\n</blockquote>\\n<ul>\\n<li>堆可以动态地分配内存大小，生存期也不必事先告诉编译器，因为它是在运行时动态分配内存的，但缺点是，由于要在运行时动态分配内存，存取速度较慢。</li>\\n</ul>\",\"autoDesc\":true}")
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
