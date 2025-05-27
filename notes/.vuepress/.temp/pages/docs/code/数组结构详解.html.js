import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/数组结构详解.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/%E6%95%B0%E7%BB%84%E7%BB%93%E6%9E%84%E8%AF%A6%E8%A7%A3.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"Java 语言数组结构教程 在 Java 语言 中，虚拟机的内存空间分为堆内存空间和栈内存空间。Java 的数组就需要用到这两个空间，我们定义的数组的名字，它是保存在 Java 栈上面，然后记录的数据指向堆里面具体数据的地址。 Java 语言数组结构详解 堆栈内存解释 数组的操作中，在栈内存中保存的永远是数组的名称，只开辟了栈内存空间的数组是永远没有办...\",\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"Java 语言数组结构教程\",\"slug\":\"java-语言数组结构教程\",\"link\":\"#java-语言数组结构教程\",\"children\":[]},{\"level\":2,\"title\":\"Java 语言数组结构详解\",\"slug\":\"java-语言数组结构详解\",\"link\":\"#java-语言数组结构详解\",\"children\":[{\"level\":3,\"title\":\"堆栈内存解释\",\"slug\":\"堆栈内存解释\",\"link\":\"#堆栈内存解释\",\"children\":[]},{\"level\":3,\"title\":\"数组堆栈\",\"slug\":\"数组堆栈\",\"link\":\"#数组堆栈\",\"children\":[]}]},{\"level\":2,\"title\":\"Java 语言数组总结\",\"slug\":\"java-语言数组总结\",\"link\":\"#java-语言数组总结\",\"children\":[]}],\"readingTime\":{\"minutes\":2.1,\"words\":629},\"filePathRelative\":\"docs/code/数组结构详解.md\",\"excerpt\":\"<h2>Java 语言数组结构教程</h2>\\n<p>在 <strong><a href=\\\"https://haicoder.net/java/java-development.html\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">Java 语言</a></strong> 中，虚拟机的内存空间分为堆内存空间和栈内存空间。Java 的数组就需要用到这两个空间，我们定义的数组的名字，它是保存在 Java 栈上面，然后记录的数据指向堆里面具体数据的地址。</p>\\n<h2>Java 语言数组结构详解</h2>\\n<h3>堆栈内存解释</h3>\\n<p>数组的操作中，在栈内存中保存的永远是数组的名称，只开辟了栈内存空间的数组是永远没有办法被使用的，必须有指向的堆堆内存数组才可以被使用，要开辟新的堆内存，需要使用 new 关键字。然后就可以将此堆堆使用权交给栈。一个堆内存空间可以被多个栈内存空间同时指向。</p>\",\"autoDesc\":true}")
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
