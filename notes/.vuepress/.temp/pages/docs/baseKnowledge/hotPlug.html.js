import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/baseKnowledge/hotPlug.html.vue"
const data = JSON.parse("{\"path\":\"/docs/baseKnowledge/hotPlug.html\",\"title\":\"什么是热插拔\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"什么是热插拔\",\"icon\":\"file\",\"order\":null,\"category\":[\"科普通识\"],\"tags\":[\"硬件\"],\"description\":\"随着存储技术的发展，很多移动存储设备都支持了热插拔，但是我个人不建议在没有“安全弹出”的情况下直接拔出移动存储设备。 热插拔只是在设备层面上可以保证安全，简单理解为你直接拔出移动存储设备，它本身硬件不会坏。 但是，这里就要说但是了，硬件不会坏但是文件系统可能坏，可能会造成你进不去你的移动存储设备而无法存取文件。举一个简单的例子，一台计算机，你在更新系统...\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.77,\"words\":231},\"filePathRelative\":\"docs/baseKnowledge/hotPlug.md\",\"excerpt\":\"<p>随着存储技术的发展，很多移动存储设备都支持了热插拔，但是我个人不建议在没有“安全弹出”的情况下直接拔出移动存储设备。\\n热插拔只是在设备层面上可以保证安全，简单理解为你直接拔出移动存储设备，它本身硬件不会坏。\\n但是，这里就要说但是了，硬件不会坏但是文件系统可能坏，可能会造成你进不去你的移动存储设备而无法存取文件。举一个简单的例子，一台计算机，你在更新系统时突然拔掉电源，再次重启的时候可能就进不去了，但是电脑本身硬件没坏，你完全重装电脑还能用，只是文件可能都没了。</p>\\n\",\"autoDesc\":true}")
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
