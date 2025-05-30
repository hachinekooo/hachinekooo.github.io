import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/backend/java/multiEnvConfig.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/backend/java/multiEnvConfig.html\",\"title\":\"SpringBoot环境配置的两种方式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"SpringBoot环境配置的两种方式\",\"icon\":\"file\",\"order\":null,\"category\":[\"Java\"],\"tags\":[\"JavaWeb\",\"Spring\",\"SpringBoot\"],\"description\":\"[!tips] spring boot 2.4 之后为了提升对 kubernetes 的支持，整个 spring.profiles 作废了；因此我们可以通过 spring.config.import 来代替它 命令行指定 java -jar your-application.jar --spring.profiles.active=dev,biz 右侧...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"SpringBoot环境配置的两种方式\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Wang Wenpeng\\\",\\\"url\\\":\\\"hachinekooo.github.io\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://hachinekooo.github.io/docs/code/backend/java/multiEnvConfig.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"乐观的小八\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"SpringBoot环境配置的两种方式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"[!tips] spring boot 2.4 之后为了提升对 kubernetes 的支持，整个 spring.profiles 作废了；因此我们可以通过 spring.config.import 来代替它 命令行指定 java -jar your-application.jar --spring.profiles.active=dev,biz 右侧...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"SpringBoot\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Spring\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"JavaWeb\"}]]},\"readingTime\":{\"minutes\":1.34,\"words\":403},\"filePathRelative\":\"docs/code/backend/java/multiEnvConfig.md\",\"excerpt\":\"<blockquote>\\n<p>[!tips]<br>\\nspring boot 2.4 之后为了提升对 kubernetes 的支持，整个 spring.profiles 作废了；因此我们可以通过 spring.config.import 来代替它</p>\\n</blockquote>\\n<h2>命令行指定</h2>\\n<ul>\\n<li><code>java -jar your-application.jar --spring.profiles.active=dev,biz</code></li>\\n</ul>\\n<p>右侧的配置会覆盖左侧的配置所以 biz 配置会覆盖 dev 配置两个 profile 的配置都会覆盖默认配置文件中的值</p>\",\"autoDesc\":true}")
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
