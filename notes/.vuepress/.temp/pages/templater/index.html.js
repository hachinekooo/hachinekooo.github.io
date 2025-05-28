import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/templater/index.html.vue"
const data = JSON.parse("{\"path\":\"/templater/\",\"title\":\"Templater\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Templater\",\"article\":false,\"feed\":false,\"sitemap\":false,\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Templater\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://hachinekooo.github.io/templater/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"乐观的小八\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Templater\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
