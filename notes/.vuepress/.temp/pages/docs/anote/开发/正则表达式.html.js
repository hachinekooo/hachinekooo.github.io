import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/anote/开发/正则表达式.html.vue"
const data = JSON.parse("{\"path\":\"/docs/anote/%E5%BC%80%E5%8F%91/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html\",\"title\":\"在 JavaScript 中使用\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.02.17 星期六 10点38分49秒 上午<br>\",\"最后修改\":\"2024.07.9 星期二 8点33分22秒 早上<br>\",\"description\":\"任意一个字符表示匹配任意对应的字符，如 a 匹配 a，7匹配7，-匹配-。 []代表匹配中括号中其中任一个字符，如[abc]匹配 a 或 b 或 c。 -在中括号里面和外面代表含义不同，如在外时，就匹配-，如果在中括号内[a-b]表示匹配26个小写字母中的任一个；[a-zA-Z]匹配大小写共52个字母中任一个；[0-9]匹配十个数字中任一个。 ^ 在中...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/anote/%E5%BC%80%E5%8F%91/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"在 JavaScript 中使用\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"任意一个字符表示匹配任意对应的字符，如 a 匹配 a，7匹配7，-匹配-。 []代表匹配中括号中其中任一个字符，如[abc]匹配 a 或 b 或 c。 -在中括号里面和外面代表含义不同，如在外时，就匹配-，如果在中括号内[a-b]表示匹配26个小写字母中的任一个；[a-zA-Z]匹配大小写共52个字母中任一个；[0-9]匹配十个数字中任一个。 ^ 在中...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mr.Hope\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"在 JavaScript 中使用\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mr.Hope\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":3.25,\"words\":976},\"filePathRelative\":\"docs/anote/开发/正则表达式.md\",\"excerpt\":\"<ol>\\n<li>\\n<p>任意一个字符表示匹配任意对应的字符，如 <code>a</code> 匹配 <code>a</code>，<code>7</code>匹配<code>7</code>，<code>-</code>匹配<code>-</code>。</p>\\n</li>\\n<li>\\n<p><code>[]</code>代表匹配中括号中其中任一个字符，如<code>[abc]</code>匹配 <code>a</code> 或 <code>b</code> 或 <code>c</code>。</p>\\n</li>\\n<li>\\n<p><code>-</code>在中括号里面和外面代表含义不同，如在外时，就匹配<code>-</code>，如果在中括号内<code>[a-b]</code>表示匹配26个小写字母中的任一个；<code>[a-zA-Z]</code>匹配大小写共52个字母中任一个；<code>[0-9]</code>匹配十个数字中任一个。</p>\\n</li>\\n<li>\\n<p><code>^</code> 在中括号里面和外面含义不同，如在外时，就表示开头，如 <code>^7[0-9]</code> 表示匹配开头是7的，且第二位是任一数字的字符串；如果在中括号里面，表示除了这个字符之外的任意字符(包括数字，特殊字符)，如 <code>[^abc]</code> 表示匹配除去 abc 之外的其他任一字符。</p>\\n</li>\\n<li>\\n<p><code>.</code>表示匹配。</p>\\n</li>\\n<li>\\n<p><code>\\\\d</code> 表示。</p>\\n</li>\\n<li>\\n<p><code>\\\\D</code> 表示。</p>\\n</li>\\n</ol>\",\"autoDesc\":true}")
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
