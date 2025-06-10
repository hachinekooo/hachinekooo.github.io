import { defineClientConfig } from "vuepress/client";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
import BingHeroBackground from "./customjs/BingHeroBackground.js";
import HitokotoBlogHero from "./customjs/HitokotoBlogHero.js";
import { Blog } from "vuepress-theme-hope/blog";
import { h } from "vue";

export default defineClientConfig({
  setup() {
    setupRunningTimeFooter(
      new Date("2025-05-27"), // 在这个时间，我重启了博客，进行了一系列打理，删除了很多水文，加了一点喜欢的样式调整。真要说起来，博客从 2024 年 8 月就迁移到 VuePress 了
      {
        "/": "Running time: :day days :hour hours :minute minutes :second seconds",
        "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
      },
      true,
    );
    setupSnowFall();
  },

  layouts: {
    Blog: () =>
      h(Blog, null, {
        heroInfo: (info: { text: string }) => h(HitokotoBlogHero, info),
        heroBg: () => h(BingHeroBackground),
      }),
  },
});