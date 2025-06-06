import { onClickOutside, useStorage } from "@vueuse/core";
import { Transition, computed, defineComponent, h, onMounted, ref, shallowRef, } from "vue";
import { ClientOnly, useLang } from "vuepress/client";
import "../customcss/fade-in.css";
import "../customcss/bing-hero-background.scss";
const bingStorage = useStorage("bing-image", {
    index: 0,
    data: [],
});
export default defineComponent({
    name: "BingHeroBackground",
    /*
     * TODO: Add download button
     * props: {
     *   download: Boolean,
     * },
     */
    setup() {
        const lang = useLang();
        const bingInfo = shallowRef();
        const showInfo = ref(false);
        const isMobile = ref(false);
        
        // 检测是否为移动设备
        const checkIsMobile = () => {
            isMobile.value = window.innerWidth <= 768;
        };

        const currentWallpaper = computed(() => {
            const { index, data } = bingStorage.value;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const langCode = lang.value.toLowerCase().split("-").shift();
            if (data[index]) {
                const { url, wallpaper, downloadable, locales } = data[index];
                return {
                    url,
                    wallpaper,
                    downloadable,
                    ...(locales[langCode] ?? locales.en),
                };
            }
            return null;
        });

        const getBingWallpapers = () => fetch("https://bing-wallpaper.vuejs.press/api/wallpaper").then((response) => response.json());
        const prev = () => {
            bingStorage.value.index -= 1;
        };
        const next = () => {
            bingStorage.value.index += 1;
        };
        onClickOutside(bingInfo, () => {
            showInfo.value = false;
        });
        onMounted(async () => {
            bingStorage.value.data = await getBingWallpapers();
            // 初始检测设备类型
            checkIsMobile();
            // 监听窗口大小变化
            window.addEventListener('resize', checkIsMobile);
        });
        
        return () => {
            const { title, headline, backstage, quickFact, copyright } = currentWallpaper.value ?? {};
            
            // 根据设备类型选择固定的本地图片
            const backgroundUrl = isMobile.value 
                ? `/assets/images/bg-mobile.webp` 
                : `/assets/images/bg.webp`;
                
            return h(ClientOnly, () => currentWallpaper.value
                ? [
                    h("div", {
                        class: "vp-blog-mask",
                        style: {
                            background: `url(${backgroundUrl}) center/cover no-repeat`,
                        },
                    }),
                    h("div", {
                        class: "bing-switch",
                        onClick: () => {
                            showInfo.value = true;
                        },
                    }, [
                        h(Transition, { name: "fade-in" }, () => showInfo.value
                            ? h("div", { class: "bing-info", ref: bingInfo }, [
                                h("a", {
                                    href: backstage,
                                    target: "_blank",
                                    class: "bing-info-header",
                                }, headline),
                                h("hr"),
                                h("div", { class: "bing-info-body" }, quickFact),
                                h("div", { class: "bing-info-copyright" }, copyright),
                            ])
                            : null),
                        h("div", { class: "bing-location" }, [
                            h("span", { class: "bing-location-icon" }),
                            title,
                        ]),
                        h("button", {
                            class: "bing-switch-prev",
                            title: "prev image",
                            type: "button",
                            disabled: bingStorage.value.index === 0,
                            onClick: () => {
                                prev();
                            },
                        }),
                        h("button", {
                            class: "bing-switch-next",
                            title: "next image",
                            type: "button",
                            disabled: bingStorage.value.index ===
                                bingStorage.value.data.length - 1,
                            onClick: () => {
                                next();
                            },
                        }),
                    ]),
                ]
                : null);
        };
    },
});
//# sourceMappingURL=BingHeroBackground.js.map