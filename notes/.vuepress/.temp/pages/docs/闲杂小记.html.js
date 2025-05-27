import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/闲杂小记.html.vue"
const data = JSON.parse("{\"path\":\"/docs/%E9%97%B2%E6%9D%82%E5%B0%8F%E8%AE%B0.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.01.5 星期五 11点19分16秒 上午<br>\",\"最后修改\":\"2024.05.17 星期五 2点28分57秒 下午<br>\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.27,\"words\":81},\"filePathRelative\":\"docs/闲杂小记.md\",\"excerpt\":\"<ul>\\n<li><a href=\\\"/docs/code/%E5%A4%84%E7%90%86%E5%99%A8%E5%92%8C%E5%86%85%E6%A0%B8%E7%9A%84%E7%90%86%E8%A7%A3.html\\\" target=\\\"_blank\\\">处理器和内核的理解</a></li>\\n<li><a href=\\\"/docs/code/%E7%83%AD%E6%8F%92%E6%8B%94.html\\\" target=\\\"_blank\\\">热插拔</a></li>\\n<li><a href=\\\"/docs/code/Vision%E5%92%8C%E7%9B%AE%E6%A0%87%E5%9C%B0%E5%9B%BE%E7%9A%84%E5%8C%BA%E5%88%AB.html\\\" target=\\\"_blank\\\">Vision和目标地图的区别</a></li>\\n</ul>\"}")
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
