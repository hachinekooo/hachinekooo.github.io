import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/code/常见的注解及其作用.html.vue"
const data = JSON.parse("{\"path\":\"/docs/code/%E5%B8%B8%E8%A7%81%E7%9A%84%E6%B3%A8%E8%A7%A3%E5%8F%8A%E5%85%B6%E4%BD%9C%E7%94%A8.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"@Component 使用在类上用于实例化 Bean @Controller 使用在 Web 层类上用于实例化 Bean @Service 使用在 Service 层类上用于实例化 Bean @Repository 使用在Dao层类上用于实例化Bean @Bean 描述在方法上，把方法的返回值交给容器管理 @Autowired 按 byType 自动注...\",\"gitInclude\":[]},\"headers\":[{\"level\":2,\"title\":\"AOP 切面注解\",\"slug\":\"aop-切面注解\",\"link\":\"#aop-切面注解\",\"children\":[]}],\"readingTime\":{\"minutes\":1.65,\"words\":496},\"filePathRelative\":\"docs/code/常见的注解及其作用.md\",\"excerpt\":\"<p>@Component 使用在类上用于实例化 Bean\\n@Controller 使用在 Web 层类上用于实例化 Bean\\n@Service 使用在 Service 层类上用于实例化 Bean\\n@Repository 使用在Dao层类上用于实例化Bean</p>\\n<p><strong>@Bean</strong>&nbsp;描述在方法上，把方法的返回值交给容器管理\\n<strong>@Autowired</strong>&nbsp;按 byType 自动注入.如果注入的类型有多个实现类，则需要注入具体实现类的名称。<br>\\n<strong>@Qualifier(\\\"\\\")</strong>&nbsp;配合@Autowired 使用名称进行注入。\\n<strong>@Resource</strong>&nbsp;按 byName 自动注入获取对应的 bean 对象 ,相当于使用了 Autowired+Qualifier\\n<strong>@Value</strong>&nbsp;注入简单类型属性。<br>\\n<strong>@Scope(value=\\\"\\\")</strong>&nbsp;配置 bean 的使用范围，默认生成的类是单例的。\\n@PostConstruct 使用在方法上标注该方法是该 bean 的初始化方法。\\n@PreDestroy 使用在方法上标注该方法是 Bean 的销毁方法\\n@Transactional 在需要进行事务控制的类或是方法上开启事务</p>\",\"autoDesc\":true}")
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
