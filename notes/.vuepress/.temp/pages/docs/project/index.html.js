import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/project/index.html.vue"
const data = JSON.parse("{\"path\":\"/docs/project/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"这里是我的日记本，记录一些我的点滴。 我本身是一个及其不爱写日记的人，但是我发现有时候写写日记的感觉，挺好。 偶尔在日记里记录下感恩和祝福，我祝福一切，祝福家人，祝福朋友，也祝福陌生人，也祝福意见不一致的人，也祝福对我有敌意的人。 也祝愿你身体安康、平安喜乐。\"},\"readingTime\":{\"minutes\":0.41,\"words\":122},\"filePathRelative\":\"docs/project/README.md\",\"excerpt\":\"<p>这里是我的日记本，记录一些我的点滴。</p>\\n<p>我本身是一个及其不爱写日记的人，但是我发现有时候写写日记的感觉，挺好。</p>\\n<p>偶尔在日记里记录下感恩和祝福，我祝福一切，祝福家人，祝福朋友，也祝福陌生人，也祝福意见不一致的人，也祝福对我有敌意的人。</p>\\n<p>也祝愿你身体安康、平安喜乐。</p>\\n<hr>\\n\",\"autoDesc\":true}")
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
