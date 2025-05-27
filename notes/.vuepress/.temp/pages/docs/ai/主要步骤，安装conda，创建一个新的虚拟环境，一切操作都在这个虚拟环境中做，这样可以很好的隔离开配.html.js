import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/ai/主要步骤，安装conda，创建一个新的虚拟环境，一切操作都在这个虚拟环境中做，这样可以很好的隔离开配.html.vue"
const data = JSON.parse("{\"path\":\"/docs/ai/%E4%B8%BB%E8%A6%81%E6%AD%A5%E9%AA%A4%EF%BC%8C%E5%AE%89%E8%A3%85conda%EF%BC%8C%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83%EF%BC%8C%E4%B8%80%E5%88%87%E6%93%8D%E4%BD%9C%E9%83%BD%E5%9C%A8%E8%BF%99%E4%B8%AA%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83%E4%B8%AD%E5%81%9A%EF%BC%8C%E8%BF%99%E6%A0%B7%E5%8F%AF%E4%BB%A5%E5%BE%88%E5%A5%BD%E7%9A%84%E9%9A%94%E7%A6%BB%E5%BC%80%E9%85%8D.html\",\"title\":\"在Mac中安装MLC LLM\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"在Mac中安装MLC LLM\",\"icon\":\"file\",\"order\":null,\"tags\":null,\"description\":\"主要步骤，安装conda，创建一个新的虚拟环境，一切操作都在这个虚拟环境中做，这样可以很好的隔离开配置AI环境时python包影响其他情况下的使用 执行mlc_llm chat HF://mlc-ai/Llama-3-8B-Instruct-q4f16_1-MLC可能会遇到网络为题，这是因为命令行默认是不走代理的： 我们可以现在命令行中进行代理的配置，...\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.92,\"words\":276},\"filePathRelative\":\"docs/ai/主要步骤，安装conda，创建一个新的虚拟环境，一切操作都在这个虚拟环境中做，这样可以很好的隔离开配.md\",\"excerpt\":\"<p>主要步骤，安装conda，创建一个新的虚拟环境，一切操作都在这个虚拟环境中做，这样可以很好的隔离开配置AI环境时python包影响其他情况下的使用</p>\\n<p>执行mlc_llm chat HF://mlc-ai/Llama-3-8B-Instruct-q4f16_1-MLC可能会遇到网络为题，这是因为命令行默认是不走代理的：\\n我们可以现在命令行中进行代理的配置，这里以ClashX为例\\nClashX后台图标 - 帮助 - 端口 - 查看Sockets Port 端口号</p>\\n<p>其次就是可能会出现requests 库缺少 SOCKS 代理支持的依赖的问题：\\n如果你正在使用 macOS，你可以使用 Homebrew 来安装必要的依赖项。请尝试以下步骤：</p>\",\"autoDesc\":true}")
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
