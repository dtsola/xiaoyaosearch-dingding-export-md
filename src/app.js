import Baby from "./script/index.js";
import Main from "./script/component/main.js";
import { dconfirm, dalert } from "./script/component/dialog.js";
import CellRadios from "./script/component/settings/cell_radios.js";
import { getCfg, CFG_KEY, setCfg } from "./script/cfg.js";
import version from "./script/version.js";

// 导入样式 - Tailwind CSS + DaisyUI
import "./app.css";

// ============================================
// 应用逻辑封装为函数，按需执行
// ============================================

function initApp() {
    let ddddom = document.querySelector(`.my-dingdocdownloader`);

    // 如果已存在，先移除
    if (ddddom) {
        ddddom.remove();
        ddddom = null;
    }

    if (document.querySelector(`.my-dingdocdownloader`)) {
        return; // 已存在，不重复创建
    }

    const ins = new Baby({
        render(h) {
            const dom =
                h("div", {
                    class: "my-dingdocdownloader ddddddoc-root dddd-card",
                    style: {position: "fixed", right: "20px", bottom: "20px", zIndex: "10", width: "42rem"}
                }, [
                    h("div", {class: "dddd-card-body", style: {padding: 0}}, [
                        h("h2", {class: "dddd-card-title flex flex-row", style: {gap: "12px"}}, [
                            h("span", {class: "font-bold"}, `钉钉文档下载器`),
                            h("small", {class: ""}, `v${version}`),
                            h("div", {class: "flex-grow"}, []),

                            h("button", {
                                title: "帮助&关于",
                                type: "button",
                                class: "dddd-btn dddd-btn-circle dddd-btn-ghost",
                                style: {width: "28px", height: "28px", fontSize: "14px"},
                                on: {click: this.onAboutClick}
                            }, "?"),
                            h("details", {ref: "menubtn", class: "dddd-dropdown dddd-dropdown-end hidden"}, [
                                h("summary", {class: "dddd-btn dddd-btn-ghost dddd-btn-circle", title: "菜单", style: {width: "28px", height: "28px", fontSize: "14px"}}, "≡"),
                                h("ul", {class: "dddd-menu dddd-dropdown-content z-1"}, [
                                    h("li", {}, [h("a", {on: {click: this.onSettingsClick}}, "设置")]),
                                    h("li", {}, [h("a", {on: {click: this.onAboutClick}}, "帮助&关于")])
                                ])
                            ]),
                            h("button", {
                                title: "关闭",
                                ref: "close",
                                type: "button",
                                class: "dddd-btn dddd-btn-circle dddd-btn-ghost hidden",
                                style: {width: "28px", height: "28px", fontSize: "18px"},
                                on: {click: this.onCloseClick}
                            }, "×"),
                        ]),
                        h("div", {ref: "container", style: {padding: "0 24px 20px"}}, [
                            h("p", {style: {fontSize: "14px", color: "#86868b", lineHeight: "1.6", marginBottom: "16px"}}, "欢迎使用钉钉文档下载器，点击下方按钮开始批量下载文档。"),
                            h("div", {class: "dddd-alert", role: "alert"}, [
                                h("div", {style: {fontSize: "16px", marginRight: "10px"}}, "⚠"),
                                h("span", {}, "本工具仅供学习交流使用，请勿用于商业用途。使用风险自负。")
                            ])
                        ]),
                        h("div", {ref: "cardactions", class: "dddd-card-actions", style: {justifyContent: "flex-end"}}, [
                            h("button", {
                                ref: "actionBtnStart",
                                type: "button",
                                class: "dddd-btn dddd-btn-primary",
                                on: {click: this.onStartClick}
                            }, "开始下载"),
                            h("button", {type: "button", class: "dddd-btn dddd-btn-ghost", on: {click: this.onExitClick}}, "退出")
                        ])
                    ])
                ]);

            return dom;
        },
        components: {mymain: Main, CellRadios: CellRadios},
        methods: {
            showCardActionsExit() {
                this.$refs.cardactions.classList.remove("hidden");
                this.$refs.actionBtnStart.classList.add("hidden");
            },
            onStartClick() {
                let _this = this;

                this.$refs.cardactions.classList.add("hidden");
                this.$refs.close.classList.remove("hidden");
                this.$refs.menubtn.classList.remove("hidden");

                this.$refs.container.innerHTML = "";
                let main = this.$createElement(function (h) {
                    return h("mymain", {on: {"dddd_notdd": _this.showCardActionsExit}});
                });
                this.$refs.container.append(main);
            },
            onCloseClick() {
                dconfirm("提示信息", "你确定要关闭钉钉文档下载工具吗？", () => {
                    this.exit();
                });
            },
            onSettingsClick(){
                this.$refs.menubtn.removeAttribute("open");
                showSettings.call(this);
            },
            onAboutClick() {
                this.$refs.menubtn.removeAttribute("open");
                showHelp$About.call(this);
            },
            onExitClick() {
                this.exit();
            },

            exit() {
                this.$el.remove();
            }
        }
    });
    const el = ins.$mount();
    document.body.append(el);
    appInstance = ins;
}


// ============================================
// 设置和帮助对话框
// ============================================

function showSettings() {
    dalert(`设置 - 钉钉文档下载器 v${version}`, this.$createElement(h => {
        return h("div", {}, [
            h("div", {style: {fontSize: "15px", fontWeight: "600", marginBottom: "16px", color: "#1d1d1f"}}, "导出格式"),
            h("ul", {class: "flex flex-col gap-2 select-none"}, [

                h("CellRadios", {
                    props: {
                        title: "文档(.adoc)",
                        name: "adoc",
                        defaultValue: getCfg(CFG_KEY.EXPORT_ADOC_AS, ".docx"),
                        options: [
                            {label: "导出为 .docx", value: ".docx"},
                            {label: "导出为 .md", value: ".md"},
                            {label: "导出为 .pdf", value: ".pdf"},
                        ]
                    },
                    on: {change: (newOp) => {
                        setCfg(CFG_KEY.EXPORT_ADOC_AS, newOp.value);
                        if (newOp.value === ".md") {
                            this.$refs.mdtip.classList.remove("hidden");
                        } else {
                            this.$refs.mdtip.classList.add("hidden")
                        }
                    }}
                }),
                h("li", {ref: "mdtip", class: getCfg(CFG_KEY.EXPORT_ADOC_AS, ".docx") === ".md" ? "" : "hidden"}, [
                    h("div", {style: {marginBottom: "12px", padding: "12px 14px", background: "#fff9e6", borderRadius: "10px", fontSize: "13px", lineHeight: "1.5"}}, [
                        h("div", {}, "您选择了导出为 .md 格式。钉钉文档有许多功能无法完全在Markdown上呈现，比如：文档内附件、文档内流程图等。建议选择导出格式为 .docx 或 .pdf。"),
                    ])
                ]),
                h("CellRadios", {
                    props: {
                        title: "表格(.axls)",
                        name: "axls",
                        defaultValue: getCfg(CFG_KEY.EXPORT_AXLS_AS, ".xlsx"),
                        options: [
                            {label: "导出为 .xlsx", value: ".xlsx"}
                        ]
                    },
                    on: {change: (newOp) => {setCfg(CFG_KEY.EXPORT_AXLS_AS, newOp.value)}}
                }),
                h("CellRadios", {
                    props: {
                        title: "白板(.adraw)",
                        name: "adraw",
                        defaultValue: getCfg(CFG_KEY.EXPORT_ADRAW_AS, ".jpg"),
                        options: [
                            {label: "导出为 .jpg", value: ".jpg"}
                        ]
                    },
                    on: {change: (newOp) => {setCfg(CFG_KEY.EXPORT_ADRAW_AS, newOp.value)}}
                }),
                h("CellRadios", {
                    props: {
                        title: "脑图(.amind)",
                        name: "amind",
                        defaultValue: getCfg(CFG_KEY.EXPORT_AMIND_AS, ".jpg"),
                        options: [
                            {label: "导出为 .jpg", value: ".jpg"}
                        ]
                    },
                    on: {change: (newOp) => {setCfg(CFG_KEY.EXPORT_AMIND_AS, newOp.value)}}
                }),

                h("li", {style: {display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#f8f9fa", borderRadius: "10px", fontSize: "12px", color: "#86868b"}}, [
                    h("div", {}, "多维表格及快捷方式不支持导出，其它文件按原文件导出。"),
                ]),
            ]),
        ])
    }));
}

function showHelp$About() {
    dalert(`帮助&关于 - 钉钉文档下载器 v${version}`, this.$createElement(h => {
        return h("div", {}, [
            h("div", {class: "dddd-alert", role: "alert", style: {marginBottom: "16px"}}, [
                h("div", {style: {fontSize: "16px", marginRight: "10px"}}, "⚠"),
                h("small", {style: {fontSize: "13px"}}, "本工具仅供学习交流使用，请勿用于商业用途。使用风险自负。"),
            ]),


            h("div", {style: {marginBottom: "16px"}}, [
                h("div", {style: {fontSize: "15px", fontWeight: "600", marginBottom: "10px", color: "#1d1d1f"}}, "使用方法"),
                h("ul", {style: {fontSize: "14px", lineHeight: "1.6", color: "#424245", paddingLeft: "20px"}}, [
                    h("li", {style: {marginBottom: "8px"}}, "勾选你要下载到本地的目录或文件夹。如果你勾选目录，会自动勾选该目录及其子目录下的所有内容。"),
                    h("li", {style: {marginBottom: "8px"}}, "点击【下载选中】按钮，选择一个本地目录进行保存。当某个文档名字前面出现了✅图标时，说明该文档已经下载完成。"),
                    h("li", {style: {fontSize: "12px", color: "#86868b"}}, "【注意事项】全部下载完成后，下载到本地的文件目录结构和钉钉文档中的目录结构完全一致。工具只会从当前钉钉文档界面开始加载数据。"),
                ]),
            ]),

            h("div", {style: {marginBottom: "16px"}}, [
                h("div", {style: {fontSize: "15px", fontWeight: "600", marginBottom: "8px", color: "#1d1d1f"}}, "版本变更记录"),
                h("div", {style: {fontSize: "13px"}}, [
                    h("div", {}, "v1.0.0："),
                    h("ul", {style: {fontSize: "13px", lineHeight: "1.5", color: "#424245", paddingLeft: "20px"}}, [
                        h("li", {style: {color: "#86868b"}}, "修复钉钉文档下载为pdf在没有水印的情况下出错。"),
                        h("li", {style: {color: "#86868b"}}, "修复文件名中数字被抹除的问题。"),
                        h("li", {style: {color: "#86868b"}}, "添加新钉钉文档域名支持。@niezhili"),
                    ])
                ]),
            ]),


            h("div", {style: {fontSize: "14px", lineHeight: "1.6", color: "#424245"}}, [
                h("div", {style: {marginBottom: "8px", fontWeight: "500"}}, "欢迎您使用本工具，您可以在"),
                h("a", {href:"https://github.com/Microanswer/ding-doc-downloader", target:"blank", style: {color: "#007AFF", textDecoration: "none"}}, " GitHub "),
                h("span", {}, "上提出您的建议。"),
            ])
        ])
    }))
}


// ============================================
// 消息监听 - 等待插件图标点击
// ============================================

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'showDownloader') {
        initApp();
        sendResponse({ status: 'ok' });
    }
    return true;
});


// ============================================
// 开发环境调试（书签脚本模式）
// ============================================

if (process.env.NODE_ENV === "development") {
    // 开发模式下自动启动（用于本地调试）
    setTimeout(() => {
        initApp();
    }, 500);
}
