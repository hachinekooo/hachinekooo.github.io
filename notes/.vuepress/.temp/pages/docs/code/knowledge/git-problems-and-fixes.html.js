import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/knowledge/git-problems-and-fixes.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/knowledge/git-problems-and-fixes.html\",\"title\":\"Git 如何在本地隐藏文件改动但继续追踪管理（使用 assume-unchanged）\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Git 如何在本地隐藏文件改动但继续追踪管理（使用 assume-unchanged）\",\"icon\":\"file\",\"order\":null,\"date\":\"2025-04-29T00:00:00.000Z\",\"category\":[\"知识\"],\"tags\":[\"Git\"],\"description\":\"团队开发时分支和提交消息书写格式 分支 提交 如果这是产品新提出的要求 —— 这是一个新规则逻辑，不是 bug ⇒ feat 如果产品说：“早就说了不能显示，你怎么一开始显示了？” —— 这算是修 bug ⇒ fix 取消某些文件的追踪 在实际开发中，有时我们不希望 Git 工作区中出现某些文件的改动提示，但又希望它们继续被 Git 追踪管理，例如常见...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Git 如何在本地隐藏文件改动但继续追踪管理（使用 assume-unchanged）\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2025-04-29T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Wang Wenpeng\\\",\\\"url\\\":\\\"hachinekooo.github.io\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://hachinekooo.github.io/docs/code/knowledge/git-problems-and-fixes.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"乐观的小八\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Git 如何在本地隐藏文件改动但继续追踪管理（使用 assume-unchanged）\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"团队开发时分支和提交消息书写格式 分支 提交 如果这是产品新提出的要求 —— 这是一个新规则逻辑，不是 bug ⇒ feat 如果产品说：“早就说了不能显示，你怎么一开始显示了？” —— 这算是修 bug ⇒ fix 取消某些文件的追踪 在实际开发中，有时我们不希望 Git 工作区中出现某些文件的改动提示，但又希望它们继续被 Git 追踪管理，例如常见...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Git\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-04-29T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":4.2,\"words\":1260},\"filePathRelative\":\"docs/code/knowledge/git-problems-and-fixes.md\",\"excerpt\":\"<h2>团队开发时分支和提交消息书写格式</h2>\\n<h3>分支</h3>\\n<table>\\n<thead>\\n<tr>\\n<th><strong>类型前缀</strong></th>\\n<th><strong>说明</strong></th>\\n<th><strong>示例</strong></th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>feature/</td>\\n<td>新功能</td>\\n<td>feature/添加用户 API</td>\\n</tr>\\n<tr>\\n<td>fix/</td>\\n<td>修复 bug</td>\\n<td>fix/修复用户登陆失败</td>\\n</tr>\\n<tr>\\n<td>refactor/</td>\\n<td>重构，不影响业务</td>\\n<td>refactor/重构订单服务</td>\\n</tr>\\n<tr>\\n<td>hotfix/</td>\\n<td>紧急修复生产问题</td>\\n<td>hotfix/修复空指针问题</td>\\n</tr>\\n<tr>\\n<td>test/</td>\\n<td>测试相关</td>\\n<td>test/测试用户服务</td>\\n</tr>\\n<tr>\\n<td>chore/</td>\\n<td>杂项、构建脚本、文档</td>\\n<td>chore/更新 readme</td>\\n</tr>\\n</tbody>\\n</table>\",\"autoDesc\":true}")
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
