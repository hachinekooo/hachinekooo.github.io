import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/anote/技术派笔记.html.vue"
const data = JSON.parse("{\"path\":\"/docs/anote/%E6%8A%80%E6%9C%AF%E6%B4%BE%E7%AC%94%E8%AE%B0.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.07.24 星期三 10点57分04秒 上午<br>\",\"最后修改\":\"2024.08.7 星期三 8点14分28秒 早上<br>\",\"description\":\"日志功能涉及到的知识点整理 为了做到request对象能无限读取请求体的功能，所以我们需要想着给它做一个增强处理，但是吧最好又不好影响我们之前使用request时的那种操作习惯，原来怎么用现在还是怎么用。 别说还真有这个东西，官方已经替我们想到了。HttpServletRequestWrapper 是 Java Servlet API 中的一个类，用于...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/anote/%E6%8A%80%E6%9C%AF%E6%B4%BE%E7%AC%94%E8%AE%B0.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"日志功能涉及到的知识点整理 为了做到request对象能无限读取请求体的功能，所以我们需要想着给它做一个增强处理，但是吧最好又不好影响我们之前使用request时的那种操作习惯，原来怎么用现在还是怎么用。 别说还真有这个东西，官方已经替我们想到了。HttpServletRequestWrapper 是 Java Servlet API 中的一个类，用于...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mr.Hope\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mr.Hope\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":3,\"title\":\"日志功能涉及到的知识点整理\",\"slug\":\"日志功能涉及到的知识点整理\",\"link\":\"#日志功能涉及到的知识点整理\",\"children\":[]}],\"readingTime\":{\"minutes\":5.43,\"words\":1628},\"filePathRelative\":\"docs/anote/技术派笔记.md\",\"excerpt\":\"<h3>日志功能涉及到的知识点整理</h3>\\n<p>为了做到request对象能无限读取请求体的功能，所以我们需要想着给它做一个增强处理，但是吧最好又不好影响我们之前使用request时的那种操作习惯，原来怎么用现在还是怎么用。</p>\\n<p>别说还真有这个东西，官方已经替我们想到了。<code>HttpServletRequestWrapper</code> 是 <code>Java Servlet API</code> 中的一个类，用于增强或修改 <code>HttpServletRequest</code> 对象的行为。它提供了一种灵活的方法来封装请求对象，并可以通过继承该类来重写或添加某些功能，而不需要修改原始请求对象的实现。</p>\",\"autoDesc\":true}")
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
