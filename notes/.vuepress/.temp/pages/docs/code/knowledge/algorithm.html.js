import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/knowledge/algorithm.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/knowledge/algorithm.html\",\"title\":\"常见的算法思路\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"常见的算法思路\",\"icon\":\"file\",\"order\":null,\"category\":[\"算法\"],\"tags\":[\"LeetCode\"],\"description\":\"方法技巧总结 深度优先搜索(回溯)算法 适用场景： 连通性问题（如岛屿问题） 路径搜索 组合/排列问题 实现要点： 清晰的递归终止条件 标记已访问的节点，避免重复访问 四向或八向探索（对于网格问题） 回溯时恢复状态（某些情况需要） 优化技巧： 直接在原数组上标记已访问状态，节省空间 提前判断边界条件，减少不必要的递归(枝剪) 例子：岛屿的最大面积（Le...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"常见的算法思路\\\",\\\"image\\\":[\\\"https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Wang Wenpeng\\\",\\\"url\\\":\\\"hachinekooo.github.io\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://hachinekooo.github.io/docs/code/knowledge/algorithm.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"乐观的小八\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"常见的算法思路\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"方法技巧总结 深度优先搜索(回溯)算法 适用场景： 连通性问题（如岛屿问题） 路径搜索 组合/排列问题 实现要点： 清晰的递归终止条件 标记已访问的节点，避免重复访问 四向或八向探索（对于网格问题） 回溯时恢复状态（某些情况需要） 优化技巧： 直接在原数组上标记已访问状态，节省空间 提前判断边界条件，减少不必要的递归(枝剪) 例子：岛屿的最大面积（Le...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"LeetCode\"}]]},\"readingTime\":{\"minutes\":15.05,\"words\":4514},\"filePathRelative\":\"docs/code/knowledge/algorithm.md\",\"excerpt\":\"<h2>方法技巧总结</h2>\\n<h3>深度优先搜索(回溯)算法</h3>\\n<ol>\\n<li>\\n<p><strong>适用场景</strong>：</p>\\n<ul>\\n<li>连通性问题（如岛屿问题）</li>\\n<li>路径搜索</li>\\n<li>组合/排列问题</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>实现要点</strong>：</p>\\n<ul>\\n<li>清晰的递归终止条件</li>\\n<li>标记已访问的节点，避免重复访问</li>\\n<li>四向或八向探索（对于网格问题）</li>\\n<li>回溯时恢复状态（某些情况需要）</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>优化技巧</strong>：</p>\\n<ul>\\n<li>直接在原数组上标记已访问状态，节省空间</li>\\n<li>提前判断边界条件，减少不必要的递归(枝剪)</li>\\n</ul>\\n</li>\\n<li>\\n<p>例子：岛屿的最大面积（LeetCode 695）<br>\\n<strong>问题</strong>：给定一个二维数组，其中 1 表示陆地，0 表示水域，找出最大的岛屿面积。</p>\\n</li>\\n</ol>\",\"autoDesc\":true}")
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
