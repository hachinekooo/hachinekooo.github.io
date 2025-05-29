import { defineComponent, h, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { DropTransition } from "vuepress-theme-hope/client";
import "@/customcss/hitokoto-blog-hero.scss";
import slogans from '@source/slogans.json';

export default defineComponent({
    name: "HitokotoBlogHero",
    inheritAttrs: false,
    props: {
        text: {
            type: String,
            required: true,
        },
        image: { type: String, default: null },
        imageDark: { type: String, default: null },
        alt: { type: String, required: true },
        imageStyle: {
            type: [String, Object],
            default: null,
        },
    },
    setup(props) {
        const text = ref("");
        const display = ref("");
        const author = ref("");
        let isMounted = false;

        const getHitokoto = () => {
            const randomIndex = Math.floor(Math.random() * slogans.length);
            const { text: sloganText, author: sloganAuthor } = slogans[randomIndex];
            text.value = sloganText;
            author.value = sloganAuthor;
        };

        const renderNextWord = () => {
            let index = 0;
            const render = () => {
                display.value += text.value[index];
                index += 1;
                return nextTick().then(() => {
                    if (index < text.value.length) {
                        setTimeout(render, 150);
                    } else if (isMounted) {
                        setTimeout(() => {
                            display.value = ""; // 清空当前显示内容
                            getHitokoto(); // 获取新的标语
                            renderNextWord(); // 再次调用渲染函数
                        }, 3000);
                    }
                });
            };
            render();
        };

        onMounted(() => {
            isMounted = true;
            getHitokoto(); // 初始化获取标语
            renderNextWord(); // 开始渲染标语
        });

        onUnmounted(() => {
            isMounted = false;
        });

        return () => [
            h(DropTransition, { appear: true, type: "group", delay: 0.04 }, () => [
                props.image
                    ? h("img", {
                        key: "light",
                        class: ["vp-blog-hero-image", { light: props.imageDark }],
                        style: props.imageStyle,
                        src: props.image,
                        alt: props.alt,
                    })
                    : null,
                props.imageDark
                    ? h("img", {
                        key: "dark",
                        class: "vp-blog-hero-image dark",
                        style: props.imageStyle,
                        src: props.imageDark,
                        alt: props.alt,
                    })
                    : null,
            ]),
            h(DropTransition, { appear: true, delay: 0.08 }, () => props.text
                ? h("h1", { class: "vp-blog-hero-title" }, props.text)
                : null),
            h("div", { class: "hitokoto" }, [
                h("p", { class: "hitokoto-text" }, h("span", display.value)),
                h("p", {
                    class: "hitokoto-author",
                    style: { opacity: display.value.length > 4 ? 1 : 0 },
                }, `——「${author.value}」`),
            ]),
        ];
    },
});