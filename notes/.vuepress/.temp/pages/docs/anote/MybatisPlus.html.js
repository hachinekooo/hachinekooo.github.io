import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/anote/MybatisPlus.html.vue"
const data = JSON.parse("{\"path\":\"/docs/anote/MybatisPlus.html\",\"title\":\"简介\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.04.28 星期日 3点11分42秒 下午<br>\",\"最后修改\":\"2024.06.28 星期五 1点37分21秒 下午<br>\",\"description\":\"简介 MyBatis-Plus（简称MP）是一个MyBatis的增强工具，在MyBatis的基础上只做增强不做改变，为简化开发、提高效率而生。 官网：MyBatis-Plus 常用注解 application.properties user.sql 基本操作 条件组合 分页 在 idea 中使用 mybatisPlus 生成代码 连接数据库 配置生成选...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/anote/MybatisPlus.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"简介\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"简介 MyBatis-Plus（简称MP）是一个MyBatis的增强工具，在MyBatis的基础上只做增强不做改变，为简化开发、提高效率而生。 官网：MyBatis-Plus 常用注解 application.properties user.sql 基本操作 条件组合 分页 在 idea 中使用 mybatisPlus 生成代码 连接数据库 配置生成选...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mr.Hope\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"简介\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mr.Hope\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"连接数据库\",\"slug\":\"连接数据库\",\"link\":\"#连接数据库\",\"children\":[]},{\"level\":2,\"title\":\"配置生成选项\",\"slug\":\"配置生成选项\",\"link\":\"#配置生成选项\",\"children\":[]},{\"level\":2,\"title\":\"项目结构及其配置\",\"slug\":\"项目结构及其配置\",\"link\":\"#项目结构及其配置\",\"children\":[]},{\"level\":2,\"title\":\"测试\",\"slug\":\"测试\",\"link\":\"#测试\",\"children\":[]}],\"readingTime\":{\"minutes\":6.5,\"words\":1949},\"filePathRelative\":\"docs/anote/MybatisPlus.md\",\"excerpt\":\"\\n<p><code>MyBatis-Plus</code>（简称<code>MP</code>）是一个<code>MyBatis</code>的<strong>增强</strong>工具，在<code>MyBatis</code>的基础上只做增强不做改变，为简化开发、提高效率而生。</p>\\n<p>官网：<a href=\\\"https://baomidou.com/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">MyBatis-Plus</a></p>\\n<h1>常用注解</h1>\\n<table>\\n<thead>\\n<tr>\\n<th>注解</th>\\n<th>描述</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>@TableName</td>\\n<td>指定实体类对应的表名。如果类名与表名不一致，可以通过此注解指定表名。</td>\\n</tr>\\n<tr>\\n<td>@TableId</td>\\n<td>标识主键字段，可以通过value属性指定表中的主键字段，通过type属性指定主键类型。</td>\\n</tr>\\n<tr>\\n<td>@TableField</td>\\n<td>指定属性对应的列名，特别是当实体类属性名与表字段名不一致时使用。</td>\\n</tr>\\n<tr>\\n<td>@TableLogic</td>\\n<td>用于标识逻辑删除属性，实现逻辑删除功能。在数据库中也要有对应属性的字段，并且要有默认值 0</td>\\n</tr>\\n<tr>\\n<td><code>pom.xml</code></td>\\n<td></td>\\n</tr>\\n</tbody>\\n</table>\",\"autoDesc\":true}")
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
