import DentryItem from "./dentryItem.js";
import { getDocList, getSpaceInfo } from "../api.js";
import { dalert } from "./dialog.js";
import { showHelpDialog } from "./helpDialog.js";
import version from "../version.js";

const DingTalkDomains = ["alidocs.dingtalk.com"/*旧*/, "docs.dingtalk.com"]; // 新版钉钉文档域名(同时也要兼容旧版本)


export default {
    render(h) {
        return h("div", {style: {padding: "0 24px"}}, [
            // 品牌推广区域 - 小遥搜索生态
            h("div", {
                class: "dddd-alert",
                style: {
                    marginBottom: "16px",
                    padding: "12px 16px",
                    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                    borderColor: "#0ea5e9",
                    borderRadius: "10px"
                }
            }, [
                h("div", {style: {display: "flex", alignItems: "center", gap: "8px"}}, [
                    h("span", {style: {fontSize: "16px"}}, "🔍"),
                    h("div", {style: {flex: 1}}, [
                        h("div", {style: {fontSize: "13px", fontWeight: "600", color: "#0c4a6e", marginBottom: "2px"}}, "小遥搜索 - 本地 AI 搜索"),
                        h("div", {style: {fontSize: "12px", color: "#0369a1"}}, "听懂你的话、看懂你的图，用 AI 找到本地任何文件"),
                        h("a", {
                            href: "https://github.com/dtsola/xiaoyaosearch",
                            target: "_blank",
                            style: {fontSize: "12px", color: "#0284c7", textDecoration: "none", display: "inline-block", marginTop: "4px"}
                        }, "了解更多 →")
                    ])
                ])
            ]),
            h("div", {class: "flex flex-row items-center justify-between", style: {marginBottom: "12px"}}, [
                h("div", {ref:"progressTip", style: {fontSize: "15px", fontWeight: "600", color: "#1d1d1f"}}, "我的文档"),
                h("div", {ref: "btnArea", style: {display: "flex", gap: "8px", alignItems: "center"}}, [
                    h("a", {ref: "reloadBtn", class: "dddd-link hidden", on: {click: this.reload}}, "重新加载"),
                    h("button", {
                        ref: "downloadBtn",
                        class: "dddd-btn dddd-btn-primary hidden",
                        style: {padding: "6px 12px", fontSize: "13px"},
                        on: {click: this.onDownloadClick}
                    }, "下载选中"),
                    h("button", {
                        class: "dddd-btn dddd-btn-circle dddd-btn-ghost",
                        style: {width: "28px", height: "28px", fontSize: "16px"},
                        on: {click: this.onHelpClick}
                    }, "?")
                ])
            ]),
            h("div", {class: "overflow-auto", style: {maxHeight: "520px", paddingRight: "8px"}}, [
                h("progress", {ref: "progress", class: "dddd-progress", style: {width: "100%"}}, []),
                h("ul", {ref: "list", class: "dddd-menu dddd-menu-sm w-full hidden"}, this.dentrys.map(dentryInfo => {
                    return h("DentryItem", {ref: "di", props: () => ({dentryInfo: dentryInfo}), on: {selectChange: this.onDentrySelectChange}})
                }))
            ])
        ])
    },
    components: {
        DentryItem
    },
    created () {
    },
    mounted() {
        this.readCurrentPage();
    },
    methods: {
        onHelpClick() {
            showHelpDialog();
        },
        readCurrentPage() {
            this.$refs.progressTip.classList.remove("text-error");
            this.$refs.progressTip.textContent = "正在读取当前页面...";
            this.$refs.progress.classList.remove("hidden");
            this.$refs.reloadBtn.classList.add("hidden");

            let href = window.location.href;
            if (DingTalkDomains.some(DingTalkDomain => href.indexOf(DingTalkDomain) === -1)) {
                // 不在钉钉文档界面
                this.$refs.progressTip.classList.add("text-error");
                this.$refs.progressTip.textContent = "读取失败，当前页面不是钉钉文档页面。请打开钉钉文档页面后再打开本工具。";
                this.$refs.progress.classList.add("hidden");
                this.$emit("dddd_notdd");
                return;
            }

            // 打开了某个文件或目录
            if (href.includes("/i/nodes/") || href.includes("/i/desktop/folders")) {
                let dentryId = window.location.pathname.split("/").pop()
                this.getDocInfoAndChild(dentryId);
                return;
            }

            // 打开了自己的空间
            if (href.includes("/i/desktop/my-space")) {
                this.getMySpaceInfo();
                return;
            }

            // 打开了指定的空间
            if (href.includes("/i/spaces/")) {
                let spaceId = href.replace(/\/?overview/g, "").split("/").pop().trim();
                this.getSpaceInfo(spaceId);
                return;
            }

            // 没有打开任何地方
            this.$refs.progressTip.classList.remove("text-error");
            this.$refs.progressTip.textContent = "请打开某个知识库之后再运行本工具。";
            this.$refs.progress.classList.add("hidden");
            this.$refs.reloadBtn.classList.remove("hidden");
        },
        reload() {
            this.readCurrentPage();
        },
        async onDownloadClick() {
            let allDi = this.$refs.di;
            if (!allDi) {
                return;
            }
            if (!Array.isArray(allDi)) {
                allDi = [allDi];
            }

            // 如果没有选中任何文件，点击时什么也不做。
            if (this.selecteds.length <= 0) {
                return;
            }

            // 下载完成后，会产生一些警告。
            const warnmap = [];


            try {
                // 先让用户选择一个目录保存。
                const dirHandle = await window.showDirectoryPicker();

                for (let i = 0; i < allDi.length; i++) {
                    await allDi[i].$download(dirHandle, warnmap);
                }

                // 真的有警告，那么提示出来。
                if (warnmap.length > 0) {
                    this.showWarnMap(warnmap);
                }

            }catch (e) {
                if (e.code === DOMException.ABORT_ERR) {
                    // 用户取消了，这种错不用提示。
                    return;
                }
                dalert("出错", `下载出错了：${e.message}`);
            }

        },
        onDentrySelectChange(arg) {
            let dentry = arg.data;
            let selected = arg.selected;
            let index = this.selecteds.findIndex(sel => {
                return sel[sel.length - 1].dentryUuid === arg.data[arg.data.length - 1].dentryUuid;
            });

            if (index === -1 && selected) {
                this.selecteds.push(dentry);
            } else if(index !== -1 && !selected) {
                this.selecteds.splice(index, 1);
            }
        },
        async getDocInfoAndChild(dentryUuid) {
            const {data} = await getDocList(dentryUuid);

            // 还有更多数据，那么继续加载。
            while (data.hasMore) {
                const {data: moreData} = await getDocList(dentryUuid, data.loadMoreId);
                data.hasMore = moreData.hasMore;
                data.loadMoreId = moreData.loadMoreId;
                data.children = data.children.concat(moreData.children||[]);
            }

            this.$refs.progressTip.textContent = data.name;
            this.$refs.progress.classList.add("hidden");
            this.addDentry(data);
            this.$refs.list.classList.remove("hidden");
            this.$refs.downloadBtn.classList.remove("hidden");
        },
        async getMySpaceInfo() {
            const {data} = await getSpaceInfo();
            await this.getDocInfoAndChild(data.rootDentryUuid);
        },
        async getSpaceInfo(spaceId) {
            const {data} = await getSpaceInfo(spaceId);
            this.$refs.progressTip.textContent = data.name;
            await this.getDocInfoAndChild(data.rootDentryUuid);
        },
        addDentry(dentryInfo) {
            this.dentrys.push(dentryInfo);
            this.$refs.list.append(this.$createElement(h => {
                return h("DentryItem", {ref: "di", props: () => ({dentryInfo: dentryInfo, hasmoredata: false}), on: {selectChange: this.onDentrySelectChange}})
            }))
        },
        showWarnMap(warnMap) {

            dalert(`已导出勾选的 - 但请您注意 - 钉钉文档下载器 v${version}`, this.$createElement(h => {
                return h("div", {}, [
                    // 小遥搜索推广区域
                    h("div", {
                        style: {
                            marginBottom: "16px",
                            padding: "12px",
                            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                            border: "1px solid #0ea5e9",
                            borderRadius: "10px"
                        }
                    }, [
                        h("div", {style: {display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px"}}, [
                            h("span", {style: {fontSize: "16px"}}, "🔍"),
                            h("span", {style: {fontSize: "13px", fontWeight: "600", color: "#0c4a6e"}}, "配合小遥搜索，实现本地 AI 搜索！")
                        ]),
                        h("div", {style: {fontSize: "12px", color: "#0369a1", marginBottom: "8px"}}, [
                            "将导出的文档导入小遥搜索，即可："
                        ]),
                        h("ul", {style: {fontSize: "12px", color: "#0369a1", paddingLeft: "20px", marginBottom: "8px"}}, [
                            h("li", "用自然语言搜索文档内容"),
                            h("li", "上传图片搜索相关文档"),
                            h("li", "像聊天一样找到你想要的任何文件")
                        ]),
                        h("a", {
                            href: "https://github.com/dtsola/xiaoyaosearch",
                            target: "_blank",
                            style: {
                                fontSize: "12px",
                                color: "#0284c7",
                                textDecoration: "none",
                                display: "inline-block",
                                padding: "4px 12px",
                                background: "white",
                                borderRadius: "6px",
                                border: "1px solid #0ea5e9"
                            }
                        }, "立即了解小遥搜索 →")
                    ]),

                    // 原有的警告信息
                    h("div", {class: "mb-4 bg-amber-400 text-sm p-4 rounded-md"}, "由于Markdown内容支持单一，钉钉文档部分内容无法在 Markdown 中呈现。对于不支持的部分，在导出的md文件中会保留文档的打开链接，您可以打开链接查看钉钉文档原文。建议钉钉文档(.adoc)导出为 .docx 或 .pdf"),
                    h("ul", {}, warnMap.map(warn => {
                        return h("li", {}, [
                            h("span", {}, [
                                "文件：",h("span", {class: "font-bold"}, warn.name)
                            ]),
                            h("div", {}, warn.warns.map(warnStr => {
                                return h("div", {class: "text-sm text-zinc-600"}, warnStr)
                            }))
                        ])
                    }))
                ]);
            }));
        }
    },
    data: {
        accessToken: "",
        selecteds: [],
        dentrys: [

        ],
    }
}
