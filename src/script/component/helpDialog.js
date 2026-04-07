import Baby from "../index.js";
import version from "../version.js";

/**
 * 显示帮助/关于对话框
 * 包含小遥搜索介绍、工具使用说明、作者信息等
 */
export function showHelpDialog() {
    let d = new Baby({
        render(h) {
            return h("div", { class: "dddd-modal ddddddoc-root"}, [
                h("div", {
                    class: "dddd-modal-box",
                    style: {
                        maxWidth: "520px",
                        maxHeight: "80vh",
                        overflow: "auto"
                    }
                }, [
                    // 标题栏
                    h("div", {class: "flex justify-between items-center mb-4"}, [
                        h("h3", {class: "text-lg font-bold"}, "关于本工具"),
                        h("button", {
                            class: "dddd-btn dddd-btn-circle dddd-btn-ghost",
                            on: {click: this.onCloseClick}
                        }, "×")
                    ]),

                    // 小遥搜索生态介绍
                    h("div", {
                        class: "dddd-alert",
                        style: {
                            marginBottom: "16px",
                            padding: "14px",
                            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                            borderColor: "#0ea5e9",
                            borderRadius: "10px"
                        }
                    }, [
                        h("div", {style: {display: "flex", alignItems: "flex-start", gap: "10px"}}, [
                            h("span", {style: {fontSize: "20px"}}, "🔍"),
                            h("div", {style: {flex: 1}}, [
                                h("div", {style: {fontSize: "14px", fontWeight: "600", color: "#0c4a6e", marginBottom: "4px"}}, "小遥搜索"),
                                h("div", {style: {fontSize: "12px", color: "#0369a1", lineHeight: "1.6"}}, [
                                    "听懂你的话、看懂你的图",
                                    h("br"),
                                    "用 AI 找到本地任何文件"
                                ]),
                                h("div", {style: {marginTop: "8px"}}, [
                                    h("a", {
                                        href: "https://github.com/dtsola/xiaoyaosearch",
                                        target: "_blank",
                                        class: "dddd-link",
                                        style: {marginRight: "12px"}
                                    }, "GitHub"),
                                    h("a", {
                                        href: "https://www.dtsola.com",
                                        target: "_blank",
                                        class: "dddd-link"
                                    }, "官网")
                                ])
                            ])
                        ])
                    ]),

                    // 工具介绍
                    h("div", {class: "mb-4"}, [
                        h("h4", {class: "text-sm font-bold mb-2"}, "✨ 本工具功能"),
                        h("ul", {class: "text-sm", style: {paddingLeft: "20px", lineHeight: "1.8"}}, [
                            h("li", "批量导出钉钉文档/知识库"),
                            h("li", "支持转换为 .docx / .md / .pdf / .xlsx 格式"),
                            h("li", "保持原有目录结构"),
                            h("li", "配合小遥搜索实现本地 AI 搜索")
                        ])
                    ]),

                    // 使用方法
                    h("div", {class: "mb-4"}, [
                        h("h4", {class: "text-sm font-bold mb-2"}, "📖 使用方法"),
                        h("ol", {class: "text-sm", style: {paddingLeft: "20px", lineHeight: "1.8"}}, [
                            h("li", "打开钉钉文档页面"),
                            h("li", "点击浏览器工具栏的插件图标"),
                            h("li", "选择要导出的文档/文件夹"),
                            h("li", "点击下载选中并选择保存位置")
                        ])
                    ]),

                    // 版本信息
                    h("div", {class: "mb-4"}, [
                        h("h4", {class: "text-sm font-bold mb-2"}, "📌 版本信息"),
                        h("div", {class: "text-sm", style: {color: "#86868b"}}, [
                            "版本：v" + version,
                            h("br"),
                            "更新日期：2026-04-08"
                        ])
                    ]),

                    // 作者信息
                    h("div", {class: "mb-4"}, [
                        h("h4", {class: "text-sm font-bold mb-2"}, "👨‍💻 关于作者"),
                        h("div", {class: "text-sm", style: {lineHeight: "1.8"}}, [
                            h("div", {style: {fontWeight: "500", marginBottom: "4px"}}, "dtsola — IT解决方案架构师"),
                            h("div", {style: {fontSize: "12px", color: "#86868b"}}, [
                                h("a", {
                                    href: "https://www.dtsola.com",
                                    target: "_blank",
                                    class: "dddd-link",
                                    style: {marginRight: "8px"}
                                }, "个人网站"),
                                h("a", {
                                    href: "https://space.bilibili.com/736015",
                                    target: "_blank",
                                    class: "dddd-link",
                                    style: {marginRight: "8px"}
                                }, "B站"),
                                h("a", {
                                    href: "https://github.com/dtsola",
                                    target: "_blank",
                                    class: "dddd-link"
                                }, "GitHub")
                            ])
                        ])
                    ]),

                    // 底部按钮
                    h("div", {class: "dddd-modal-action", style: {marginTop: "16px"}}, [
                        h("button", {
                            class: "dddd-btn dddd-btn-primary",
                            on: {click: this.onCloseClick}
                        }, "知道了")
                    ])
                ])
            ]);
        },
        methods: {
            $show() {
                this.$el.setAttribute("open", true);
            },
            $close() {
                this.$el.removeAttribute("open");
                setTimeout(() => {
                    this.$el.remove();
                }, 300)
            },
            onCloseClick() {
                this.$close();
            }
        }
    });

    let dom = d.$mount();
    document.querySelector(`.my-dingdocdownloader`).append(dom);
    d.$show();
}
