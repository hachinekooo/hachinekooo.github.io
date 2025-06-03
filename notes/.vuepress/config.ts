import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import blockAnchorPlugin from './plugins/markdown-it-block-anchor.js'; // 确保路径正确

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "乐观的小八",
  description: "编程, 哲学, 生活, AI, 分享, 开源, 效率, 科技, 数码, Code, Programming, Philosophy, Life, AI, Sharing, Open Source, Efficiency, Technology, Digital",
  theme,

  alias: {
    "@": path.resolve(__dirname, "./"),
  },

  extendsMarkdown: (md) => {
      console.log('Extending Markdown with block anchor plugin');
      md.use(blockAnchorPlugin);
    }
});
