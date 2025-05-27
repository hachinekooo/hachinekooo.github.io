import CodeDemo from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.88_markdown-it@14.1.0_mermaid@10.9.3_sass-embedded@_0a6be3eec7d1ff9b777b126e717c1613/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.88_markdown-it@14.1.0_mermaid@10.9.3_sass-embedded@_0a6be3eec7d1ff9b777b126e717c1613/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import Mermaid from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.88_markdown-it@14.1.0_mermaid@10.9.3_sass-embedded@_0a6be3eec7d1ff9b777b126e717c1613/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("Mermaid", Mermaid);
  },
};
