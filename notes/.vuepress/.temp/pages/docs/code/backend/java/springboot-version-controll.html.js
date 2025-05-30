import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/backend/java/springboot-version-controll.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/backend/java/springboot-version-controll.html\",\"title\":\"SpringBoot项目版本管理的几种方式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"SpringBoot项目版本管理的几种方式\",\"icon\":\"file\",\"order\":null,\"date\":\"2025-04-25T00:00:00.000Z\",\"category\":[\"Java\"],\"tags\":[\"SpringBoot\",\"版本管理\",\"MAVEN\",\"多模块\"],\"description\":\"使用 BOM 依赖管理 什么是BOM BOM（Bill of Materials） 是 Maven 中的一种依赖管理机制，主要用于集中管理项目中所有依赖的版本号。它的核心作用是确保项目中的依赖版本一致，避免因版本冲突导致的问题。 在 Maven 中，BOM 是一个特殊的 POM 文件，通常以 <packaging>pom</packaging> 的形式...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"SpringBoot项目版本管理的几种方式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2025-04-25T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Wang Wenpeng\\\",\\\"url\\\":\\\"hachinekooo.github.io\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://hachinekooo.github.io/docs/code/backend/java/springboot-version-controll.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"乐观的小八\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"SpringBoot项目版本管理的几种方式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"使用 BOM 依赖管理 什么是BOM BOM（Bill of Materials） 是 Maven 中的一种依赖管理机制，主要用于集中管理项目中所有依赖的版本号。它的核心作用是确保项目中的依赖版本一致，避免因版本冲突导致的问题。 在 Maven 中，BOM 是一个特殊的 POM 文件，通常以 <packaging>pom</packaging> 的形式...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"多模块\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"MAVEN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"版本管理\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"SpringBoot\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-04-25T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":2.94,\"words\":883},\"filePathRelative\":\"docs/code/backend/java/springboot-version-controll.md\",\"excerpt\":\"<h2>使用 BOM 依赖管理</h2>\\n<h3>什么是BOM</h3>\\n<p>BOM（Bill of Materials） 是 Maven 中的一种依赖管理机制，主要用于集中管理项目中所有依赖的版本号。它的核心作用是确保项目中的依赖版本一致，避免因版本冲突导致的问题。<br>\\n在 Maven 中，BOM 是一个特殊的 POM 文件，通常以 <code>&lt;packaging&gt;pom&lt;/packaging&gt;</code> 的形式存在，并通过 <code>&lt;dependencyManagement&gt;</code> 定义一组依赖及其版本号。其他模块可以通过 import 的方式引入这个 BOM，从而继承其中定义的依赖版本。</p>\",\"autoDesc\":true}")
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
