import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "乐观的小八",
  description: "编程, 哲学, 生活, AI, 分享, 开源, 效率, 科技, 数码, Code, Programming, Philosophy, Life, AI, Sharing, Open Source, Efficiency, Technology, Digital",
  theme,
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
