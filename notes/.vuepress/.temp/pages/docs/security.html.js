import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/security.html.vue"
const data = JSON.parse("{\"path\":\"/docs/security.html\",\"title\":\"安全\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.01.5 星期五 8点03分06秒 晚上<br>\",\"最后修改\":\"2024.08.1 星期四 7点52分13秒 早上<br>\",\"description\":\"安全 [[security/CSRF]]\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.16,\"words\":47},\"filePathRelative\":\"docs/security.md\",\"excerpt\":\"\\n<ul>\\n<li><a href=\\\"/docs/code/knowledge/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5.html\\\" target=\\\"_blank\\\">同源策略</a></li>\\n<li>[[security/CSRF]]</li>\\n</ul>\\n\",\"autoDesc\":true}")
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
