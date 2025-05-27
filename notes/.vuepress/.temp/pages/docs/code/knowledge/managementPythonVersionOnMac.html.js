import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/knowledge/managementPythonVersionOnMac.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/knowledge/managementPythonVersionOnMac.html\",\"title\":\"pyenv segmentation fault code 11(M芯片MAC管理Python版本建议)\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"pyenv segmentation fault code 11(M芯片MAC管理Python版本建议)\",\"icon\":\"file\",\"order\":null,\"category\":[\"编程知识\"],\"tags\":[\"Python\"],\"description\":\"描述 建议在电脑中使用 conda 来管理 python 版本。 我之前是使用 pyenv 和 conda 。平时并不激活 conda 环境，使用pyenv环境中的python。但是我最近发现这样似乎存在冲突问题，使用 pip 就出现 pyenv segmentation fault code 11 的问题。重装 pyenv、装其他版本的python、...\",\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"描述\",\"slug\":\"描述\",\"link\":\"#描述\",\"children\":[]},{\"level\":2,\"title\":\"过程\",\"slug\":\"过程\",\"link\":\"#过程\",\"children\":[]}],\"readingTime\":{\"minutes\":0.89,\"words\":266},\"filePathRelative\":\"docs/code/knowledge/managementPythonVersionOnMac.md\",\"excerpt\":\"<h2>描述</h2>\\n<p>建议在电脑中使用 <code>conda</code> 来管理 <code>python</code> 版本。</p>\\n<p>我之前是使用 <code>pyenv</code> 和 <code>conda</code> 。平时并不激活 <code>conda</code> 环境，使用pyenv环境中的python。但是我最近发现这样似乎存在冲突问题，使用 <code>pip</code> 就出现 <code>pyenv segmentation fault code 11</code> 的问题。重装 pyenv、装其他版本的python、更新 pip 都试过了，都没有解决。</p>\",\"autoDesc\":true}")
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
