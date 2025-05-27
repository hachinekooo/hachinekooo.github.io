import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/knowledge/数据结构.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/knowledge/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.html\",\"title\":\"神奇的AI\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"神奇的AI\",\"icon\":\"file\",\"order\":null,\"category\":[\"科普通识\"],\"tags\":[\"硬件\"],\"description\":\"树 二叉树 二叉查找树 BST 平衡二叉树(AVL) 解决二叉查找树在某些情况下退化成单链表的问题；规则：左子树和右子树的高度差不大于 1 有算法开销的，用插入的成本来弥补查询的效率 当插入特别少查询特别多时候，很 ok 一旦插入比查询多，avl 就很浪费时间精力 红黑树 解决了二叉平衡树大量的旋转而造成的性能开销 性质： 根节点是黑色 叶节点是不存储...\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":2.5,\"words\":750},\"filePathRelative\":\"docs/code/knowledge/数据结构.md\",\"excerpt\":\"\\n<h1>二叉树</h1>\\n<h1>二叉查找树 BST</h1>\\n<h1>平衡二叉树(AVL)</h1>\\n<blockquote>\\n<p>解决二叉查找树在某些情况下退化成单链表的问题；规则：左子树和右子树的高度差不大于 1</p>\\n</blockquote>\\n<p>有算法开销的，用插入的成本来弥补查询的效率</p>\\n<p>当插入特别少查询特别多时候，很 ok</p>\\n<p>一旦插入比查询多，avl 就很浪费时间精力</p>\\n<h1>红黑树</h1>\\n<blockquote>\\n<p>解决了二叉平衡树大量的旋转而造成的性能开销</p>\\n</blockquote>\\n<p>性质：</p>\\n<ul>\\n<li>根节点是黑色</li>\\n<li>叶节点是不存储数据的黑色空节点</li>\\n<li>任何相邻的两个节点不能同时为红色</li>\\n<li>任意节点到其可到达的叶节点间包含相同数量的黑色节点</li>\\n</ul>\",\"autoDesc\":true}")
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
