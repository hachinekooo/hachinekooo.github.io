import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme(
  {
    hostname: "hachinekooo.github.io",

    author: {
      name: "Wang Wenpeng",
      url: "hachinekooo.github.io",
    },

    logo: "/hachiico.png",

    repo: "",

    docsDir: "notes",

    // 导航栏
    navbar,

    // 侧边栏
    sidebar,

    // 页脚
    footer: "here to the crazy ones.",
    displayFooter: true,

    // 博客相关
    blog: {
      name: "Wang Wenpeng",
      avatar: "/hachiico.png",
      description: "A person who loves programming and philosophy.",
      intro: "/intro.html",
      medias: {
        Email: "mailto:hachinekooo@163.com",
        BiliBili: "https://space.bilibili.com/17449156",
        GitHub: "https://github.com/hachinekooo",
        Steam: "https://steamcommunity.com/profiles/76561198293325741/",
      },
      timeline: "时-间-线",
    },

    // 加密配置
    encrypt: {
      config: {
        "/docs/project/collageSocialApp.html": ["win"],
      },
    },

    // 多语言配置
    metaLocales: {
      editLink: "在 GitHub 上编辑此页",
    },

    // Markdown 配置
    markdown: {
      align: true,
      attrs: true,
      component: true,
      figure: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,
      alert: true,
      demo: true,
      mermaid: true,
    },

    navbarAutoHide: "always",

    // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
    // hotReload: true,

    // 在这里配置主题提供的插件
    plugins: {
      blog: true,
    
      // 启用之前需安装 @waline/client
      // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
      comment: {
        provider: "Waline",
        serverURL:
          "https://penglifecomment-git-main-blueboysalvats-projects.vercel.app/",
        reaction: true,
      },

      icon: {
        assets: "fontawesome-with-brands",
      },

      components: {
        components: ["Badge", "VPCard", "Share"],
      },
    },
  },
  { custom: true }
);