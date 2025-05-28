import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/templater/quiettalks.html.vue"
const data = JSON.parse("{\"path\":\"/templater/quiettalks.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"icon\":\"pen-nib\",\"order\":null,\"category\":[\"日记\"],\"tags\":null,\"description\":\"<%* let today = tp.date.now(\\\"YYYY-MM-DD\\\") let momentDate = window.moment(today, \\\"YYYY-MM-DD\\\", true) let titleName = momentDate.format(\\\"YYYY-MM-DD\\\") let year = momentDate.format(...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Wang Wenpeng\\\",\\\"url\\\":\\\"hachinekooo.github.io\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://hachinekooo.github.io/templater/quiettalks.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"乐观的小八\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"<%* let today = tp.date.now(\\\"YYYY-MM-DD\\\") let momentDate = window.moment(today, \\\"YYYY-MM-DD\\\", true) let titleName = momentDate.format(\\\"YYYY-MM-DD\\\") let year = momentDate.format(...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.22,\"words\":66},\"filePathRelative\":\"templater/quiettalks.md\",\"excerpt\":\"<h2>&lt;%*<br>\\nlet today = tp.date.now(\\\"YYYY-MM-DD\\\")<br>\\nlet momentDate = window.moment(today, \\\"YYYY-MM-DD\\\", true)<br>\\nlet titleName = momentDate.format(\\\"YYYY-MM-DD\\\")<br>\\nlet year = momentDate.format(\\\"YYYY\\\")<br>\\nlet month = momentDate.format(\\\"MM\\\")<br>\\n-%&gt;</h2>\\n<h2>3 things worth it</h2>\\n<ul>\\n<li></li>\\n<li></li>\\n</ul>\",\"autoDesc\":true}")
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
