import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "乐观的小八",
  description:
    "一个很普通的人，普通的成绩，普通的家庭，普通的成长经历。找点自己喜欢做的事情。不停止前进，不在原地徘徊。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
