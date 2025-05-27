import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/JavaScript.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/JavaScript.html\",\"title\":\"在浏览器调试中使用 JQuery\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.06.7 星期五 4点45分34秒 下午<br>\",\"最后修改\":\"2024.06.28 星期五 2点56分51秒 下午<br>\",\"description\":\"在浏览器调试中使用 JQuery 在调试-控制台中执行如下脚本，就可以使用了。 运行 01在head中运行JS.html 02在body中运行JS.html 03使用引入中运行JS.html inferenceTest.js 04在事件中运行JS.html 变量 05变量.html 分支 06分支.html 循环 07循环.html 数组 08数组.h...\",\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"通过 ID 获取元素\",\"slug\":\"通过-id-获取元素\",\"link\":\"#通过-id-获取元素\",\"children\":[]},{\"level\":2,\"title\":\"通过 Class 获取元素\",\"slug\":\"通过-class-获取元素\",\"link\":\"#通过-class-获取元素\",\"children\":[]},{\"level\":2,\"title\":\"修改普通元素\",\"slug\":\"修改普通元素\",\"link\":\"#修改普通元素\",\"children\":[]},{\"level\":2,\"title\":\"修改表单元素\",\"slug\":\"修改表单元素\",\"link\":\"#修改表单元素\",\"children\":[]},{\"level\":2,\"title\":\"操作属性\",\"slug\":\"操作属性\",\"link\":\"#操作属性\",\"children\":[]},{\"level\":2,\"title\":\"操作CSS\",\"slug\":\"操作css\",\"link\":\"#操作css\",\"children\":[]},{\"level\":2,\"title\":\"事件\",\"slug\":\"事件\",\"link\":\"#事件\",\"children\":[]},{\"level\":2,\"title\":\"创建元素\",\"slug\":\"创建元素\",\"link\":\"#创建元素\",\"children\":[]},{\"level\":2,\"title\":\"手搓校验\",\"slug\":\"手搓校验\",\"link\":\"#手搓校验\",\"children\":[]},{\"level\":2,\"title\":\"使用正则表达式进行校验\",\"slug\":\"使用正则表达式进行校验\",\"link\":\"#使用正则表达式进行校验\",\"children\":[]},{\"level\":2,\"title\":\"window 对象\",\"slug\":\"window-对象\",\"link\":\"#window-对象\",\"children\":[]},{\"level\":2,\"title\":\"定时器\",\"slug\":\"定时器\",\"link\":\"#定时器\",\"children\":[]}],\"readingTime\":{\"minutes\":10.1,\"words\":3031},\"filePathRelative\":\"docs/code/JavaScript.md\",\"excerpt\":\"\\n<p>在调试-控制台中执行如下脚本，就可以使用了。</p>\\n<div class=\\\"language- line-numbers-mode\\\" data-highlighter=\\\"shiki\\\" data-ext=\\\"\\\" data-title=\\\"\\\" style=\\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\\"><pre class=\\\"shiki shiki-themes one-light one-dark-pro vp-code\\\"><code><span class=\\\"line\\\"><span>var jquery = document.createElement('script');  </span></span>\\n<span class=\\\"line\\\"><span>jquery.src = \\\"http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js\\\";//若调试页面是https的这里也修改为https.</span></span>\\n<span class=\\\"line\\\"><span>document.getElementsByTagName('head')[0].appendChild(jquery);  </span></span>\\n<span class=\\\"line\\\"><span>jQuery.noConflict();</span></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")
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
