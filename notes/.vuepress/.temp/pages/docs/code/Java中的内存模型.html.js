import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/Java中的内存模型.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/Java%E4%B8%AD%E7%9A%84%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B.html\",\"title\":\"图解 JVM 内存模型：\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.01.21 星期日 8点38分28秒 晚上<br>\",\"最后修改\":\"2024.02.3 星期六 5点09分52秒 下午<br>\",\"description\":\"栈内存空间 基本数据类型 引用（数组名、类名、接口名） 先进后出，后进先出 存取速度比堆要快，仅次于寄存器，栈数据可以共享，但缺点是，存在栈中的数据大小与生存必须是确定的，缺乏灵活性 堆内存空间 new 出来的内容（数组、对象） 堆可以动态地分配内存大小，生存期也不必事先告诉编译器，因为它是在运行时动态分配内存的，但缺点是，由于要在运行时动态分配内存，...\",\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"栈内存空间\",\"slug\":\"栈内存空间\",\"link\":\"#栈内存空间\",\"children\":[]},{\"level\":2,\"title\":\"堆内存空间\",\"slug\":\"堆内存空间\",\"link\":\"#堆内存空间\",\"children\":[]}],\"readingTime\":{\"minutes\":0.92,\"words\":275},\"filePathRelative\":\"docs/code/Java中的内存模型.md\",\"excerpt\":\"<h2>栈内存空间</h2>\\n<blockquote>\\n<p>基本数据类型\\n引用（数组名、类名、接口名）</p>\\n</blockquote>\\n<ul>\\n<li>先进后出，后进先出</li>\\n<li>存取速度比堆要快，仅次于寄存器，栈数据可以共享，但缺点是，存在栈中的数据大小与生存必须是确定的，缺乏灵活性</li>\\n</ul>\\n<h2>堆内存空间</h2>\\n<blockquote>\\n<p><code>new</code> 出来的内容（数组、对象）</p>\\n</blockquote>\\n<ul>\\n<li>堆可以动态地分配内存大小，生存期也不必事先告诉编译器，因为它是在运行时动态分配内存的，但缺点是，由于要在运行时动态分配内存，存取速度较慢。</li>\\n</ul>\",\"autoDesc\":true}")
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
