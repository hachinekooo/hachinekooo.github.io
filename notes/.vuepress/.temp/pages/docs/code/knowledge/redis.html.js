import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/knowledge/redis.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/knowledge/redis.html\",\"title\":\"Redis\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Redis\",\"icon\":\"file\",\"order\":null,\"category\":[\"数据库\"],\"tags\":[\"Redis\"],\"description\":\"哨兵机制 哨兵的工作流程包括定时监控、主观下线和客观下线、领导者 Sentinel 节点选举、故障转移等。每个 Sentinel 实例会定期通过 PING 命令向主节点和从节点发送心跳包。如果一个节点长时间没有响应 PING 命令，Sentinel 会将该节点标记为主观下线。当多个 Sentinel 同时认为一个节点不可用时，该节点被标记为客观下线。当...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://blueboysalvat.github.io/docs/code/knowledge/redis.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Redis\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"哨兵机制 哨兵的工作流程包括定时监控、主观下线和客观下线、领导者 Sentinel 节点选举、故障转移等。每个 Sentinel 实例会定期通过 PING 命令向主节点和从节点发送心跳包。如果一个节点长时间没有响应 PING 命令，Sentinel 会将该节点标记为主观下线。当多个 Sentinel 同时认为一个节点不可用时，该节点被标记为客观下线。当...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"WangWenpeng\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Redis\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Redis\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"WangWenpeng\\\",\\\"url\\\":\\\"blueboysalvat.github.io\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"哨兵机制\",\"slug\":\"哨兵机制\",\"link\":\"#哨兵机制\",\"children\":[]}],\"readingTime\":{\"minutes\":1.53,\"words\":460},\"filePathRelative\":\"docs/code/knowledge/redis.md\",\"excerpt\":\"<h2>哨兵机制</h2>\\n<blockquote>\\n<p>哨兵的工作流程包括定时监控、主观下线和客观下线、领导者 Sentinel 节点选举、故障转移等。每个 Sentinel 实例会定期通过 PING 命令向主节点和从节点发送心跳包。如果一个节点长时间没有响应 PING 命令，Sentinel 会将该节点标记为主观下线。当多个 Sentinel 同时认为一个节点不可用时，该节点被标记为客观下线。当主节点被确认下线后，Sentinel 之间会通过类似 Raft 的选举算法进行协商，选出一个领导者 Sentinel 来负责执行故障转移。将某个从节点提升为新的主节点。通知其他从节点重新复制新的主节点的数据。</p>\\n</blockquote>\",\"autoDesc\":true}")
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
