import { hasGlobalComponent } from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.104_vuepress@2.0.0-rc.23_@vuepress+bundler-vite@2.0.0-rc.23_@_3a6171e0c8d772a8ac5b9135d5cd8ec2/node_modules/@vuepress/helper/lib/client/index.js";
import { useScriptTag } from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vueuse+core@13.3.0_vue@3.5.15/node_modules/@vueuse/core/index.mjs";
import { h } from "vue";
import { VPIcon } from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.104_markdown-it@14.1.0_vuepress@2.0.0-rc.23_@vuepress+bu_b94f63f7d65708f8ab4c52013342cead/node_modules/@vuepress/plugin-icon/lib/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "fontawesome",
            prefix: "",
            ...props,
          })
      )
    }
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/all.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

  },
}
