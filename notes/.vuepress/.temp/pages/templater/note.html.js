import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/templater/note.html.vue"
const data = JSON.parse("{\"path\":\"/templater/note.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"icon\":\"file\",\"order\":null,\"tags\":null},\"readingTime\":{\"minutes\":0.03,\"words\":8},\"filePathRelative\":\"templater/note.md\",\"excerpt\":\"<h2></h2>\\n\"}")
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
