import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/post/极客商城.html.vue"
const data = JSON.parse("{\"path\":\"/docs/post/%E6%9E%81%E5%AE%A2%E5%95%86%E5%9F%8E.html\",\"title\":\"拆分公共部分\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.04.20 星期六 8点04分07秒 早上<br>\",\"最后修改\":\"2024.05.13 星期一 7点55分46秒 晚上<br>\",\"description\":\"拆分公共部分 提取谁？除了 web 层之外的内容，mapper、service、实体类工具类 如何做？ 在工程下新建子模块 common 把 mapper、service、实体类工具按照一定的层次剪切进来 修改 pom.xml，主要是引入父工程以及倒入子模块需要单独用到的依赖项 修改全局配置文件 测试 部署项目 大致步骤： 检查项目的 jdk 版本与服...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/post/%E6%9E%81%E5%AE%A2%E5%95%86%E5%9F%8E.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"拆分公共部分\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"拆分公共部分 提取谁？除了 web 层之外的内容，mapper、service、实体类工具类 如何做？ 在工程下新建子模块 common 把 mapper、service、实体类工具按照一定的层次剪切进来 修改 pom.xml，主要是引入父工程以及倒入子模块需要单独用到的依赖项 修改全局配置文件 测试 部署项目 大致步骤： 检查项目的 jdk 版本与服...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"WangWenpeng\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"拆分公共部分\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"WangWenpeng\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"参数接收\",\"slug\":\"参数接收\",\"link\":\"#参数接收\",\"children\":[]}],\"readingTime\":{\"minutes\":2.73,\"words\":819},\"filePathRelative\":\"docs/post/极客商城.md\",\"excerpt\":\"\\n<ul>\\n<li>提取谁？除了 web 层之外的内容，mapper、service、实体类工具类</li>\\n<li>如何做？\\n<ul>\\n<li>在工程下新建子模块 common\\n<ul>\\n<li>把 mapper、service、实体类工具按照一定的层次剪切进来</li>\\n<li>修改 pom.xml，主要是引入父工程以及倒入子模块需要单独用到的依赖项</li>\\n</ul>\\n</li>\\n<li>修改全局配置文件</li>\\n<li>测试</li>\\n</ul>\\n</li>\\n</ul>\\n<h1>部署项目</h1>\\n<p>大致步骤：</p>\\n<ul>\\n<li>检查项目的 jdk 版本与服务器生产环境的 jdk 版本是否对应</li>\\n<li>在 idea Maven 窗口中的设置 \\\"跳过测试\\\"</li>\\n<li>删除父工程的打包插件</li>\\n<li>在需要打包的子模块中配置打包插件\\n<ul>\\n<li>修改主类为子类启动类</li>\\n<li>skip 去掉</li>\\n</ul>\\n</li>\\n<li>修改路径问题，某些映射路径可能需要对应服务器路径单独设置一遍</li>\\n<li>在云服务器的 Mysql 中导入相关数据库</li>\\n<li>向云服务器中上传一些测试图片</li>\\n</ul>\",\"autoDesc\":true}")
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
