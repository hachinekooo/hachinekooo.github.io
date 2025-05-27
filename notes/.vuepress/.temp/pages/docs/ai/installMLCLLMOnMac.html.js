import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/ai/installMLCLLMOnMac.html.vue"
const data = JSON.parse("{\"path\":\"/docs/ai/installMLCLLMOnMac.html\",\"title\":\"在Mac中安装MLC LLM\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"在Mac中安装MLC LLM\",\"icon\":\"file\",\"order\":null,\"date\":\"2024-07-10T00:00:00.000Z\",\"category\":[\"AI\"],\"tags\":[\"语言大模型\"],\"description\":\"主要步骤，安装conda，创建一个新的虚拟环境，一切操作都在这个虚拟环境中做，这样可以很好的隔离开配置AI环境时python包影响其他情况下的使用 执行mlc_llm chat HF://mlc-ai/Llama-3-8B-Instruct-q4f16_1-MLC可能会遇到网络为题，这是因为命令行默认是不走代理的： 我们可以现在命令行中进行代理的配置，...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://blueboySalvat.top/docs/ai/installMLCLLMOnMac.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"在Mac中安装MLC LLM\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"主要步骤，安装conda，创建一个新的虚拟环境，一切操作都在这个虚拟环境中做，这样可以很好的隔离开配置AI环境时python包影响其他情况下的使用 执行mlc_llm chat HF://mlc-ai/Llama-3-8B-Instruct-q4f16_1-MLC可能会遇到网络为题，这是因为命令行默认是不走代理的： 我们可以现在命令行中进行代理的配置，...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"WangWenpeng\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"语言大模型\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-07-10T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"在Mac中安装MLC LLM\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2024-07-10T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"WangWenpeng\\\",\\\"url\\\":\\\"blueboySalvat.top\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":0.95,\"words\":284},\"filePathRelative\":\"docs/ai/installMLCLLMOnMac.md\",\"localizedDate\":\"2024年7月10日\",\"excerpt\":\"<p>主要步骤，安装conda，创建一个新的虚拟环境，一切操作都在这个虚拟环境中做，这样可以很好的隔离开配置AI环境时python包影响其他情况下的使用</p>\\n<p>执行mlc_llm chat HF://mlc-ai/Llama-3-8B-Instruct-q4f16_1-MLC可能会遇到网络为题，这是因为命令行默认是不走代理的：\\n我们可以现在命令行中进行代理的配置，这里以ClashX为例\\nClashX后台图标 - 帮助 - 端口 - 查看Sockets Port 端口号</p>\\n<p>其次就是可能会出现requests 库缺少 SOCKS 代理支持的依赖的问题：\\n如果你正在使用 macOS，你可以使用 Homebrew 来安装必要的依赖项。请尝试以下步骤：</p>\",\"autoDesc\":true}")
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
