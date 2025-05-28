import { hasGlobalComponent } from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.106_vuepress@2.0.0-rc.23_@vuepress+bundler-vite@2.0.0-rc.23_@_752d256f33ad74648f9f39ae988906a0/node_modules/@vuepress/helper/lib/client/index.js";
import Badge from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.88_sass-embedded@1.89.0_vuepress@2.0.0-rc.23_@vuepr_456d1fa2b2469fcb0887d19e564dc2ae/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.88_sass-embedded@1.89.0_vuepress@2.0.0-rc.23_@vuepr_456d1fa2b2469fcb0887d19e564dc2ae/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";
import Share from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.88_sass-embedded@1.89.0_vuepress@2.0.0-rc.23_@vuepr_456d1fa2b2469fcb0887d19e564dc2ae/node_modules/vuepress-plugin-components/lib/client/components/Share.js";

import "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.106_vuepress@2.0.0-rc.23_@vuepress+bundler-vite@2.0.0-rc.23_@_752d256f33ad74648f9f39ae988906a0/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    if(!hasGlobalComponent("Share")) app.component("Share", Share);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
