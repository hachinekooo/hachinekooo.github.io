export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"日记\":{\"path\":\"/category/%E6%97%A5%E8%AE%B0/\",\"indexes\":[0,1]},\"算法\":{\"path\":\"/category/%E7%AE%97%E6%B3%95/\",\"indexes\":[2]},\"知识\":{\"path\":\"/category/%E7%9F%A5%E8%AF%86/\",\"indexes\":[3,4,5]},\"服务器\":{\"path\":\"/category/%E6%9C%8D%E5%8A%A1%E5%99%A8/\",\"indexes\":[6]},\"Java\":{\"path\":\"/category/java/\",\"indexes\":[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"LeetCode\":{\"path\":\"/tag/leetcode/\",\"indexes\":[2]},\"Git\":{\"path\":\"/tag/git/\",\"indexes\":[3,5]},\"nginx\":{\"path\":\"/tag/nginx/\",\"indexes\":[6]},\"环境配置\":{\"path\":\"/tag/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/\",\"indexes\":[15]},\"SpringBoot\":{\"path\":\"/tag/springboot/\",\"indexes\":[7,8,18]},\"Filter\":{\"path\":\"/tag/filter/\",\"indexes\":[7]},\"Interceptor\":{\"path\":\"/tag/interceptor/\",\"indexes\":[7]},\"架构设计\":{\"path\":\"/tag/%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1/\",\"indexes\":[7,10]},\"设计模式\":{\"path\":\"/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/\",\"indexes\":[7,10,21]},\"日志记录\":{\"path\":\"/tag/%E6%97%A5%E5%BF%97%E8%AE%B0%E5%BD%95/\",\"indexes\":[7]},\"API监控\":{\"path\":\"/tag/api%E7%9B%91%E6%8E%A7/\",\"indexes\":[7]},\"JavaWeb\":{\"path\":\"/tag/javaweb/\",\"indexes\":[11,18,19]},\"基础\":{\"path\":\"/tag/%E5%9F%BA%E7%A1%80/\",\"indexes\":[11]},\"多线程\":{\"path\":\"/tag/%E5%A4%9A%E7%BA%BF%E7%A8%8B/\",\"indexes\":[17]},\"Spring\":{\"path\":\"/tag/spring/\",\"indexes\":[18]},\"MyBatisPlus\":{\"path\":\"/tag/mybatisplus/\",\"indexes\":[10]},\"MyBatis\":{\"path\":\"/tag/mybatis/\",\"indexes\":[10]},\"框架\":{\"path\":\"/tag/%E6%A1%86%E6%9E%B6/\",\"indexes\":[12]},\"版本管理\":{\"path\":\"/tag/%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86/\",\"indexes\":[8]},\"MAVEN\":{\"path\":\"/tag/maven/\",\"indexes\":[8]},\"多模块\":{\"path\":\"/tag/%E5%A4%9A%E6%A8%A1%E5%9D%97/\",\"indexes\":[8]},\"面经\":{\"path\":\"/tag/%E9%9D%A2%E7%BB%8F/\",\"indexes\":[20]},\"WebSocket\":{\"path\":\"/tag/websocket/\",\"indexes\":[9]},\"STOMP\":{\"path\":\"/tag/stomp/\",\"indexes\":[9]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

