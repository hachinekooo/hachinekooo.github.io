import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Code",
    icon: "terminal",
    link: "/docs/code/",
  },
  {
    text: "AI",
    icon: "robot",
    link: "/docs/ai/",
  },
  {
    text: "Algorithm",
    icon: "pen",
    link: "/docs/code/algorithm/",
  },
  {
    text: "QuietTalks",
    icon: "cloud",
    link: "/docs/quiettalks/",
  },
  {
    text: "Timeline",
    icon: "clock",
    link: "/timeline/",
  },
]);
