import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/Web.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/Web.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.06,\"words\":18},\"filePathRelative\":\"docs/code/Web.md\",\"excerpt\":\"<iframe src=\\\"http://blueboysalvat.github.io/\\\" allow=\\\"fullscreen\\\" allowfullscreen=\\\"\\\" style=\\\"height:100%;width:100%; aspect-ratio: 16 / 9; \\\"></iframe>\\n\"}")
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
