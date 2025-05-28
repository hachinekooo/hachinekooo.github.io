import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/templater/未命名.html.vue"
const data = JSON.parse("{\"path\":\"/templater/%E6%9C%AA%E5%91%BD%E5%90%8D.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"icon\":\"pen-nib\",\"order\":null,\"category\":[\"日记\"],\"tags\":null,\"description\":\"<%* let today = tp.date.now(\\\"YYYY-MM-DD\\\") let momentDate = window.moment(today, \\\"YYYY-MM-DD\\\", true) let titleName = momentDate.format(\\\"YYYY-MM-DD\\\") let year = momentDate.format(...\"},\"readingTime\":{\"minutes\":0.23,\"words\":70},\"filePathRelative\":\"templater/未命名.md\",\"excerpt\":\"<h2>&lt;%*<br>\\nlet today = tp.date.now(\\\"YYYY-MM-DD\\\")<br>\\nlet momentDate = window.moment(today, \\\"YYYY-MM-DD\\\", true)<br>\\nlet titleName = momentDate.format(\\\"YYYY-MM-DD\\\")<br>\\nlet year = momentDate.format(\\\"YYYY\\\")<br>\\nlet month = momentDate.format(\\\"MM\\\")<br>\\n-%&gt;</h2>\\n<h2>感触</h2>\\n<ul>\\n<li>#感触</li>\\n<li>#感触</li>\\n</ul>\",\"autoDesc\":true}")
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
