import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/knowledge/interview.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/knowledge/interview.html\",\"title\":\"面经\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"面经\",\"icon\":\"file\",\"order\":null,\"category\":[\"知识\"],\"tags\":[\"面经\"],\"description\":\"Spring 说说循环依赖 就是两个或两个以上的 bean 互相持有对方，最终形成闭环。比如 A 依赖于 B，B 依赖于 A。 只有单例的 Bean 才存在循环依赖的情况，原型(Prototype)情况下，Spring 会直接抛出异常。 Spring 框架依据三级缓存已经解决了大部分的循环依赖（利用三层缓存机制） 一级缓存：Map<String,Obj...\",\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"Spring\",\"slug\":\"spring\",\"link\":\"#spring\",\"children\":[{\"level\":3,\"title\":\"说说循环依赖\",\"slug\":\"说说循环依赖\",\"link\":\"#说说循环依赖\",\"children\":[]},{\"level\":3,\"title\":\"为什么要三级缓存，⼆级不⾏吗\",\"slug\":\"为什么要三级缓存-二级不行吗\",\"link\":\"#为什么要三级缓存-二级不行吗\",\"children\":[]}]},{\"level\":2,\"title\":\"常见的注解\",\"slug\":\"常见的注解\",\"link\":\"#常见的注解\",\"children\":[{\"level\":3,\"title\":\"Spring 中\",\"slug\":\"spring-中\",\"link\":\"#spring-中\",\"children\":[]},{\"level\":3,\"title\":\"SpringMVC\",\"slug\":\"springmvc\",\"link\":\"#springmvc\",\"children\":[]},{\"level\":3,\"title\":\"SpringBoot\",\"slug\":\"springboot\",\"link\":\"#springboot\",\"children\":[]}]},{\"level\":2,\"title\":\"抽象类(abstract class)和接⼜(interface)有什么区别\",\"slug\":\"抽象类-abstract-class-和接又-interface-有什么区别\",\"link\":\"#抽象类-abstract-class-和接又-interface-有什么区别\",\"children\":[]},{\"level\":2,\"title\":\"静态⽅法和实例⽅法有何不同\",\"slug\":\"静态方法和实例方法有何不同\",\"link\":\"#静态方法和实例方法有何不同\",\"children\":[]}],\"readingTime\":{\"minutes\":5.54,\"words\":1663},\"filePathRelative\":\"docs/code/knowledge/interview.md\",\"excerpt\":\"<h2>Spring</h2>\\n<h3>说说循环依赖</h3>\\n<ul>\\n<li>就是两个或两个以上的 bean 互相持有对方，最终形成闭环。比如 A 依赖于 B，B 依赖于 A。</li>\\n<li>只有单例的 Bean 才存在循环依赖的情况，原型(Prototype)情况下，Spring 会直接抛出异常。</li>\\n<li>Spring 框架依据三级缓存已经解决了大部分的循环依赖（利用三层缓存机制）\\n<ol>\\n<li>一级缓存：<code>Map&lt;String,Object&gt; singletonObjects</code>，单例池，⽤于保存实例化、属性注⼊、初始化完成的 bean 实例</li>\\n<li>二级缓存：<code>Map&lt;String,Object&gt; earlySingletonObjects</code>，早期曝光对象，⽤于保存实例化的 bean 实例</li>\\n<li>三级缓存：<code>Map&lt;String,ObjectFactory\\\\&lt;?&gt;&gt;singletonFactories</code>，早期曝光对象⼯⼚，⽤于保存 bean 创建⼯⼚，以便于后⾯有机会创建代理对象。</li>\\n</ol>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
