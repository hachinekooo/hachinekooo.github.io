export const typesMap = JSON.parse("{\"article\":{\"/\":{\"path\":\"/article/\",\"indexes\":[9,0,1,25,2,5,10,11,12,26,13,14,15,16,6,8,27,17,18,28,29,3,4,7,19,20,21,22,23,24]}},\"star\":{\"/\":{\"path\":\"/star/\",\"indexes\":[]}},\"timeline\":{\"/\":{\"path\":\"/timeline/\",\"indexes\":[9,0,1,25,2,5,10,11,12,26,13,14,15,16,6,8,27,17,18]}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });

