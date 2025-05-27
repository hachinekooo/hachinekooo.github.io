import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/post/Redis基本知识.html.vue"
const data = JSON.parse("{\"path\":\"/docs/post/Redis%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86.html\",\"title\":\"基本概念\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.05.6 星期一 7点35分50秒 晚上<br>\",\"最后修改\":\"2024.05.17 星期五 2点08分05秒 下午<br>\",\"description\":\"基本概念 基于内存进行存储，支持 key-value 的存储形式，底层是用 C 语言编写的。 基于 key-value 形式的数据字典，结构非常简单，没有数据表的概念，直接用键值对的形式完成数据的管理。 Redis 支持多种数据类型：这里给出 5 个先 字符串类型string 哈希类型hash 列表类型list 集合类型set 有序集合类型sorted...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/post/Redis%E5%9F%BA%E6%9C%AC%E7%9F%A5%E8%AF%86.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"基本概念\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"基本概念 基于内存进行存储，支持 key-value 的存储形式，底层是用 C 语言编写的。 基于 key-value 形式的数据字典，结构非常简单，没有数据表的概念，直接用键值对的形式完成数据的管理。 Redis 支持多种数据类型：这里给出 5 个先 字符串类型string 哈希类型hash 列表类型list 集合类型set 有序集合类型sorted...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"WangWenpeng\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"基本概念\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"WangWenpeng\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"全局常用命令\",\"slug\":\"全局常用命令\",\"link\":\"#全局常用命令\",\"children\":[]},{\"level\":2,\"title\":\"数据操作\",\"slug\":\"数据操作\",\"link\":\"#数据操作\",\"children\":[{\"level\":3,\"title\":\"字符串类型的操作\",\"slug\":\"字符串类型的操作\",\"link\":\"#字符串类型的操作\",\"children\":[]},{\"level\":3,\"title\":\"自增操作\",\"slug\":\"自增操作\",\"link\":\"#自增操作\",\"children\":[]},{\"level\":3,\"title\":\"hash 类型\",\"slug\":\"hash-类型\",\"link\":\"#hash-类型\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.2,\"words\":1260},\"filePathRelative\":\"docs/post/Redis基本知识.md\",\"excerpt\":\"\\n<p>基于内存进行存储，支持 key-value 的存储形式，底层是用 C 语言编写的。\\n基于 key-value 形式的数据字典，结构非常简单，没有数据表的概念，直接用键值对的形式完成数据的管理。</p>\\n<p>Redis 支持多种数据类型：这里给出 5 个先</p>\\n<ul>\\n<li>字符串类型<code>string</code></li>\\n<li>哈希类型<code>hash</code></li>\\n<li>列表类型<code>list</code></li>\\n<li>集合类型<code>set</code></li>\\n<li>有序集合类型<code>sortedset</code></li>\\n</ul>\",\"autoDesc\":true}")
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
