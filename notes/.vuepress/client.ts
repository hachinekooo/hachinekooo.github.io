import { defineClientConfig } from "vuepress/client";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
import { Blog } from "vuepress-theme-hope/blog";
import { h } from "vue";

export default defineClientConfig({
  setup() {
    setupRunningTimeFooter(
      new Date("2025-05-27"),
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