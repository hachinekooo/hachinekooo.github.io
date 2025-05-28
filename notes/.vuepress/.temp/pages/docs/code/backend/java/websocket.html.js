import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/backend/java/websocket.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/backend/java/websocket.html\",\"title\":\"websocket基础\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"websocket基础\",\"icon\":\"file\",\"order\":null,\"date\":\"2024-10-09T00:00:00.000Z\",\"category\":[\"Java\"],\"tags\":[\"WebSocket\",\"STOMP\"],\"description\":\"1. WebSocket 基础 WebSocket 协议： WebSocket 是一种全双工通信协议，允许客户端和服务器之间建立持久连接，进行实时数据传输。 以 WebSocket 被用于实现 AI 助手的实时聊天功能为例 STOMP 协议： STOMP（Simple Text Oriented Messaging Protocol）是基于 WebSo...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"websocket基础\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2024-10-09T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Wang Wenpeng\\\",\\\"url\\\":\\\"hachinekooo.github.io\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://hachinekooo.github.io/docs/code/backend/java/websocket.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"乐观的小八\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"websocket基础\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"1. WebSocket 基础 WebSocket 协议： WebSocket 是一种全双工通信协议，允许客户端和服务器之间建立持久连接，进行实时数据传输。 以 WebSocket 被用于实现 AI 助手的实时聊天功能为例 STOMP 协议： STOMP（Simple Text Oriented Messaging Protocol）是基于 WebSo...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"STOMP\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"WebSocket\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-10-09T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":5.29,\"words\":1586},\"filePathRelative\":\"docs/code/backend/java/websocket.md\",\"excerpt\":\"<h2></h2>\\n<h3>1. <strong>WebSocket 基础</strong></h3>\\n<ul>\\n<li>\\n<p><strong>WebSocket 协议</strong>：</p>\\n<ul>\\n<li>WebSocket 是一种全双工通信协议，允许客户端和服务器之间建立持久连接，进行实时数据传输。</li>\\n<li>以 WebSocket 被用于实现 AI 助手的实时聊天功能为例</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>STOMP 协议</strong>：</p>\\n<ul>\\n<li>STOMP（Simple Text Oriented Messaging Protocol）是基于 WebSocket 的高级消息协议，提供更丰富的消息路由和订阅机制。</li>\\n<li>通过 <code>@EnableWebSocketMessageBroker</code> 和 <code>WebSocketMessageBrokerConfigurer</code> 配置了 STOMP 协议的支持。</li>\\n</ul>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
