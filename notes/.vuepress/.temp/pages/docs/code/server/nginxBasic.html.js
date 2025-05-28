import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/server/nginxBasic.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/server/nginxBasic.html\",\"title\":\"nginx基本知识\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"nginx基本知识\",\"icon\":\"file\",\"order\":null,\"date\":\"2024-01-15T00:00:00.000Z\",\"category\":[\"服务器\"],\"tags\":[\"nginx\"],\"description\":\"什么是 nginx Nginx 是一款轻量级的 Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，特点是占有内存少、并发能力强。Nginx 高并发能力强大、支持热不熟、启动简单。 Nginx 的反向代理 什么是正向/反向代理 forwardProxyAndReverseProxyforwardProxyAndReversePro...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"nginx基本知识\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2024-01-15T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Wang Wenpeng\\\",\\\"url\\\":\\\"hachinekooo.github.io\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://hachinekooo.github.io/docs/code/server/nginxBasic.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"乐观的小八\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"nginx基本知识\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"什么是 nginx Nginx 是一款轻量级的 Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，特点是占有内存少、并发能力强。Nginx 高并发能力强大、支持热不熟、启动简单。 Nginx 的反向代理 什么是正向/反向代理 forwardProxyAndReverseProxyforwardProxyAndReversePro...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"nginx\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-01-15T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":3.6,\"words\":1081},\"filePathRelative\":\"docs/code/server/nginxBasic.md\",\"excerpt\":\"<h2>什么是 nginx</h2>\\n<blockquote>\\n<p>Nginx 是一款<strong>轻量级</strong>的 Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，特点是占有内存少、并发能力强。Nginx 高并发能力强大、支持热不熟、启动简单。</p>\\n</blockquote>\\n<h2>Nginx 的反向代理</h2>\\n<h3>什么是正向/反向代理</h3>\\n<figure><figcaption>forwardProxyAndReverseProxy</figcaption></figure>\\n<ul>\\n<li>正向代理，即在我们电脑本地上配置的一个代理，我们将使用我们自己配置的这个代理来帮我们去访问目标站点。举一个简单的例子，我们想要访问 X（推特）、Github 的时候，正常情况下国内是很慢或者无法访问的，但是我们可以在我们的电脑上配置一个代理服务器，让他帮我们去访问然后就 X 网站返回的内容交给我们本地电脑进行显示。</li>\\n<li>反向代理，现在代理服务器的配置不再由我们自己配置，而是由服务器那边人员去进行配置。同样的，配置代理服务器的目的也是为了提高访问体验。服务器那边配置好代理服务器后，当我们请求时请求的是代理服务器，而代理服务器会根据各个服务器的负载情况，动态的分配我们这次请求的流量往哪里走。Nginx 不但解决了向各个服务器的流量动态分发，还解决了在服务器之间共享 session 的问题。</li>\\n</ul>\",\"autoDesc\":true}")
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
