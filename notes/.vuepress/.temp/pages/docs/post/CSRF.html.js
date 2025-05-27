import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/post/CSRF.html.vue"
const data = JSON.parse("{\"path\":\"/docs/post/CSRF.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.08.1 星期四 7点52分13秒 早上<br>\",\"最后修改\":\"2024.08.1 星期四 9点31分39秒 晚上<br>\",\"description\":\"预检请求的触发条件 简单请求： 浏览器不会为简单请求发出预检请求。简单请求是指满足以下条件的请求： 使用的 HTTP 方法是 GET、POST 或 HEAD。 请求头部仅包含以下标准头：Accept、Accept-Language、Content-Language、Content-Type（其值仅限于 application/x- www-form-u...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/post/CSRF.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"预检请求的触发条件 简单请求： 浏览器不会为简单请求发出预检请求。简单请求是指满足以下条件的请求： 使用的 HTTP 方法是 GET、POST 或 HEAD。 请求头部仅包含以下标准头：Accept、Accept-Language、Content-Language、Content-Type（其值仅限于 application/x- www-form-u...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"WangWenpeng\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"WangWenpeng\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.67,\"words\":200},\"filePathRelative\":\"docs/post/CSRF.md\",\"excerpt\":\"<p>预检请求的触发条件</p>\\n<ol>\\n<li>简单请求：\\n<ul>\\n<li>浏览器不会为简单请求发出预检请求。简单请求是指满足以下条件的请求：</li>\\n<li>使用的 HTTP 方法是 <code>GET</code>、<code>POST</code> 或 <code>HEAD</code>。</li>\\n<li>请求头部仅包含以下标准头：<code>Accept</code>、<code>Accept-Language</code>、<code>Content-Language</code>、<code>Content-Type</code>（其值仅限于 <code>application/x- www-form-urlencoded</code>、<code>multipart/form-data</code>、<code>text/plain</code> ）。</li>\\n</ul>\\n</li>\\n<li>非简单请求：\\n<ul>\\n<li>如果请求不符合简单请求的条件，则浏览器会先发送一个 <code>OPTIONS</code> 请求进行预检，以确定服务器是否允许该请求。</li>\\n</ul>\\n</li>\\n</ol>\",\"autoDesc\":true}")
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
