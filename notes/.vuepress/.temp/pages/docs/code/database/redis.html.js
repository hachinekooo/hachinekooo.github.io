import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/database/redis.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/database/redis.html\",\"title\":\"过期问题\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.05.7 星期二 8点37分38秒 晚上<br>\",\"最后修改\":\"2024.05.8 星期三 9点28分17秒 晚上<br>\",\"description\":\"过期问题 解决方式： 定时任务：使用 Java 代码定时去扫描数据库，查询到的失效数据则删除 消息通知：通知服务器它知道哪些订单即将过期，并且会将过期的订单的订单 ID 通知给我们的 Java 代码，然后我们的 Java 代码再去数据库查询，设置失效状态。 前置知识：订阅/发布模式 订阅发布的简单入门 就像是公众号和订阅者一样，公众号发了消息了，订阅者...\",\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"前置知识：订阅/发布模式\",\"slug\":\"前置知识-订阅-发布模式\",\"link\":\"#前置知识-订阅-发布模式\",\"children\":[{\"level\":3,\"title\":\"订阅发布的简单入门\",\"slug\":\"订阅发布的简单入门\",\"link\":\"#订阅发布的简单入门\",\"children\":[]},{\"level\":3,\"title\":\"Redis 过期监听(命令行)\",\"slug\":\"redis-过期监听-命令行\",\"link\":\"#redis-过期监听-命令行\",\"children\":[]}]},{\"level\":2,\"title\":\"超时订单取消\",\"slug\":\"超时订单取消\",\"link\":\"#超时订单取消\",\"children\":[]}],\"readingTime\":{\"minutes\":4.62,\"words\":1387},\"filePathRelative\":\"docs/code/database/redis.md\",\"excerpt\":\"\\n<p>解决方式：</p>\\n<ul>\\n<li>\\n<p>定时任务：使用 Java 代码定时去扫描数据库，查询到的失效数据则删除</p>\\n</li>\\n<li>\\n<p>消息通知：通知服务器它知道哪些订单即将过期，并且会将过期的订单的订单 ID 通知给我们的 Java 代码，然后我们的 Java 代码再去数据库查询，设置失效状态。</p>\\n</li>\\n</ul>\\n<h2>前置知识：订阅/发布模式</h2>\\n<h3>订阅发布的简单入门</h3>\\n<p>就像是公众号和订阅者一样，公众号发了消息了，订阅者就能收到信息。</p>\\n<figure><figcaption></figcaption></figure>\",\"autoDesc\":true}")
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
