import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.88_@waline+client@3.5.7_katex@0.16.22_markdown-it@14.1.0_m_39cbd3ce6a03cc5be303489b76fa8b22/node_modules/vuepress-theme-hope/lib/client/exports/base.js";

import { defineCatalogInfoGetter } from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.104_vuepress@2.0.0-rc.23_@vuepress+bundler-vite@2.0.0_ffa2adb8a5fafd5263b76234ded38a5f/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { Blog, BloggerInfo, SocialMedias, setupBlog } from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.88_@waline+client@3.5.7_katex@0.16.22_markdown-it@14.1.0_m_39cbd3ce6a03cc5be303489b76fa8b22/node_modules/vuepress-theme-hope/lib/client/exports/blog.js";
import "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.88_@waline+client@3.5.7_katex@0.16.22_markdown-it@14.1.0_m_39cbd3ce6a03cc5be303489b76fa8b22/node_modules/vuepress-theme-hope/lib/client/styles/blog/layout.scss";
import { GlobalEncrypt, LocalEncrypt } from "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.88_@waline+client@3.5.7_katex@0.16.22_markdown-it@14.1.0_m_39cbd3ce6a03cc5be303489b76fa8b22/node_modules/vuepress-theme-hope/lib/client/exports/encrypt.js";

import "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.106_vuepress@2.0.0-rc.23_@vuepress+bundler-vite@2.0.0-rc.23_@_752d256f33ad74648f9f39ae988906a0/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.106_vuepress@2.0.0-rc.23_@vuepress+bundler-vite@2.0.0-rc.23_@_752d256f33ad74648f9f39ae988906a0/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "/Users/wangwenpeng/Code/area/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.106_vuepress@2.0.0-rc.23_@vuepress+bundler-vite@2.0.0-rc.23_@_752d256f33ad74648f9f39ae988906a0/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "/Users/wangwenpeng/Code/area/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.88_@waline+client@3.5.7_katex@0.16.22_markdown-it@14.1.0_m_39cbd3ce6a03cc5be303489b76fa8b22/node_modules/vuepress-theme-hope/lib/client/styles/index.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("SocialMedias", SocialMedias);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    Blog,
  }
};
