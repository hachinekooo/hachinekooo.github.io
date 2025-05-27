import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "开发",
    icon: "pen-to-square",
    prefix: "/docs/code/",
    children: [
      { text: "前端", icon: "pen-to-square", link: "frontend/" },
      { text: "后端", icon: "pen-to-square", link: "backend/" },
      { text: "数据库", icon: "pen-to-square", link: "database/" },
      { text: "服务器", icon: "pen-to-square", link: "server/" },
      { text: "基本知识", icon: "pen-to-square", link: "knowledge/" },
    ],
  },
  {
    text: "项目",
    icon: "book",
    link: "/docs/project/",
  },
  {
    text: "AI",
    icon: "book",
    link: "/docs/ai/",
  },
  {
    text: "效率技巧",
    icon: "book",
    link: "/docs/productivity/",
  },
]);
