import { getDocList, downloadBoard, httpDownload, downloadAmind, downloadAdoc, downloadAxls, downloadDocument } from "../api.js";
import Loading from "./loading.js";
import utils from "../util.js";
import { getCfg, CFG_KEY } from "../cfg.js";
const DentryItem = {
    props: {
        dentryInfo: {type: Object},
        hasmoredata: {type: Boolean},
    },
    components: {
        DentryItem: () => DentryItem,
        Loading: Loading
    },
    created(){
        this.hasMore = this.$props.hasmoredata;
        // console.log("this.hasMore", this.hasMore, this.$props.hasmoredata, this.hasmoredata)
        // console.log("this.dentryInfo", this.dentryInfo)
    },
    render(h) {

        let icon = "📄";
        let fileSize = "";
        if (this.dentryInfo.dentryType === "folder") {
            icon = "📁";
        } else {
            if (this.dentryInfo.fileSize) {
                fileSize = utils.beautifySize(this.dentryInfo.fileSize);
                fileSize = utils.beautifySize(this.dentryInfo.fileSize);
            } else {
                fileSize = "-";
            }
        }
        let title = this.dentryInfo.name + fileSize;

        if (!this.dentryInfo.hasChildren) {
            return h("li", {}, [h("label", {class: "file-item-label"}, [
                h("input", {ref: "checkbox", class: "dddd-checkbox dddd-checkbox-xs", type: "checkbox", on: {change: this.onSelectChange}}),
                h("span", {class: "file-icon"}, icon),
                h("span", {class: "file-name"}, [
                    h("span", {on: {click: this.onDentryItemClick}, title: title}, this.dentryInfo.name),
                    h("span", {class: "file-size"}, fileSize)
                ]),
                h("span", {ref: "downloadStat", class: "download-status hidden"}, [
                    h("div", {ref: "downloadProgress", role:"progressbar", class: "dddd-radial-progress", style: {"--dddd-value": "0", "--size": "14px", "--thickness": "2px"}}, "0%"),
                    h("span", {ref: "downloadResult", class: "hidden"}, "❗")
                ])
            ])]);
        }

        let childrenDom = [];
        if ((this.dentryInfo.children||[]).length > 0) {
            (this.dentryInfo.children||[]).map(child => {
                childrenDom.push(h("DentryItem", {ref: "di", on: {selectChange: this.onChildrenSelectChange}, props: () => ({dentryInfo: child, hasmoredata: true})}))
            });
        }

        return h("li", {class: ""}, [
            h("details", {ref: "details", open: false, on: {"toggle": this.onChildrenOpenChange}}, [
                h("summary", {class: "folder-item-summary"}, [
                    h("input", {ref: "checkbox", class: "dddd-checkbox dddd-checkbox-xs", type: "checkbox", on: {change: this.onSelectChange}}),
                    h("span", {class: "folder-icon"}, [
                        h("span", {ref: "diricon"}, icon),
                        h("Loading", {ref: "loading", class: "hidden"})
                    ]),
                    h("span", {class: "folder-name", on: {click: this.onDentryItemClick}, title: this.dentryInfo.name}, this.dentryInfo.name)
                ]),
                h("ul", {ref: "children", class: "folder-children"}, childrenDom)
            ])])
    },
    methods: {
        onChildrenSelectChange(arg) {
            this.$emit("selectChange", {data: [this.dentryInfo, ...arg.data], selected: arg.selected});
        },
        async onSelectChange(){
            let selected = this.$refs.checkbox.checked;
            this.$emit("selectChange", {data: [this.dentryInfo], selected: selected});

            // 如果选中的是一个有下级内容的，那么将下面的所有内容也选中。
            if (this.dentryInfo.hasChildren) {

                // 已经加载出来了数据，没有更多数据那么直接选中。
                if (!this.hasMore) {
                    let di = this.$refs.di;
                    if (!di) return;
                    if (!Array.isArray(di)) {
                        di = [di];
                    }
                    for (let i = 0; i < di.length; i++) {
                        di[i].$select(selected);
                    }
                } else {
                    // 还有数据，那么立即加载。
                    while (this.hasMore) {
                        await this.loadChildrenData(selected, this.loadMoreId);
                    }
                }
            }
        },
        onDentryItemClick() {
            if (!this.dentryInfo.hasChildren) {
                this.$refs.checkbox.checked = !this.$refs.checkbox.checked;
                this.onSelectChange();
            }
        },
        async loadChildrenData(selected, loadMoreId) {
            this.$refs.diricon.classList.add("hidden");
            this.$refs.loading.$el.classList.remove("hidden");

            const {data} = await getDocList(this.dentryInfo.dentryUuid, loadMoreId);
            this.dentryInfo.children = data.children;
            this.hasMore = data.hasMore;
            this.loadMoreId = data.loadMoreId || "";
            for (let i = 0; i < this.dentryInfo.children.length; i++) {
                this.addDentry(this.dentryInfo.children[i], selected);
            }

            this.$refs.diricon.classList.remove("hidden");
            this.$refs.loading.$el.classList.add("hidden");
        },
        async onChildrenOpenChange() {
            // console.log("详情：", this.$refs.details.open, "是否选中：", this.$refs.checkbox.checked);

            // 如果是打开目录，但是目录下没有数据，那么尝试加载数据。
            if (this.$refs.details.open) {
                while (this.hasMore) {
                    await this.loadChildrenData(this.$refs.checkbox.checked, this.loadMoreId);
                }
            }
        },

        addDentry(dentryInfo, selected) {
            const newdti = this.$createElement(h => {
                return h("DentryItem", {ref: "di", on: {selectChange: this.onChildrenSelectChange}, props: () => ({dentryInfo: dentryInfo, hasmoredata: true})});
            });
            if (selected) {
                let di = this.$refs.di;
                if (!di) return;
                if (!Array.isArray(di)) {
                    di = [di];
                }
                for (let i = 0; i < di.length; i++) {
                    di[i].$select(selected);
                }
            }
            this.$refs.children.append(newdti);
        },

        // 选中或取消选中当前文件
        $select(select) {
            if (this.$refs.checkbox.checked === select) {
                return;
            }

            this.$refs.checkbox.checked = select;
            this.onSelectChange();
        },

        // 返回是否选中或有下级选中。
        $hasSelected() {
            let selected = this.$refs.checkbox.checked;
            if (selected) {
                return true;
            }

            // 如果有下级，那么继续
            let allDi = this.$refs.di;
            if (!allDi) {
                return false;
            }
            if (!Array.isArray(allDi)) {
                allDi = [allDi];
            }

            for (let i = 0; i < allDi.length; i++) {
                let s = allDi[i].$hasSelected();
                if (s) {
                    return s;
                }
            }

            return false;
        },

        // 如果本文件被选中了，那么下载本文件。
        async $download(dirHandler, warnmap, metadataMap = [], pathStack = []) {

            let selected = this.$refs.checkbox.checked; // 当前文件是否选中。
            let hasSelected = this.$hasSelected(); // 当前文件或下级内容是否有选中的。

            let currentName = utils.fixFileName(this.dentryInfo.name);

            let currentDirHandle = null;
            let currentFileHandler = null;

            // 当前文件是选中的，进行下载。
            if (selected) {
                if (this.dentryInfo.dentryType !== "folder") {
                    try {

                        this.$refs.downloadStat.classList.remove("hidden");

                        let extension = this.dentryInfo.extension;
                        let newext = "";
                        if (extension === "adraw") {
                            newext = getCfg(CFG_KEY.EXPORT_ADRAW_AS, ".jpg");
                        } else if (extension === "amind") {
                            newext = getCfg(CFG_KEY.EXPORT_AMIND_AS, ".jpg");
                        } else if (extension === "adoc") {
                            newext = getCfg(CFG_KEY.EXPORT_ADOC_AS, ".docx");
                        } else if (extension === "axls") {
                            newext = getCfg(CFG_KEY.EXPORT_AXLS_AS, ".xlsx");
                        }

                        currentFileHandler = await dirHandler.getFileHandle(currentName + newext, {create: true});

                        this.$refs.downloadProgress.style.setProperty("--dddd-value", "16");

                        // 是个文件，那么按照文件类型下载。
                        let url = "";
                        if (extension === "adraw") {
                            url = await downloadBoard(this.dentryInfo.dentryKey, this.dentryInfo.docKey);
                        } else if (extension === "amind") {
                            url = await downloadAmind(this.dentryInfo.dentryKey, this.dentryInfo.docKey);
                        } else if (extension === "adoc") {
                            let durl = await downloadAdoc(this.dentryInfo.dentryUuid, this.dentryInfo.docKey, this.dentryInfo.dentryKey, this.dentryInfo.contentType, this.dentryInfo.name, this.dentryInfo.fileSize, newext);
                            if (typeof durl === "string") {
                                url = durl
                            } else {
                                url = durl[0];

                                let warns = durl[1];
                                if (warns && warns.length > 0) {
                                    warnmap.push({
                                        name: currentFileHandler.name,
                                        warns: warns,
                                    });
                                }

                            }

                        } else if (extension === "axls") {
                            url = await downloadAxls(this.dentryInfo.dentryUuid, this.dentryInfo.docKey, this.dentryInfo.dentryKey, this.dentryInfo.contentType, this.dentryInfo.name, this.dentryInfo.fileSize);
                        } else if (this.dentryInfo.contentType !== "alidoc" && this.dentryInfo.contentType !== "link") {
                            url = await downloadDocument(this.dentryInfo.dentryUuid);
                        } else {
                            throw new Error(`不支持此类型文件的下载：contentType=${this.dentryInfo.contentType},extension=${extension}`);
                        }

                        this.$refs.downloadProgress.style.setProperty("--dddd-value", "25");

                        // 剩下 75 的百分比拿给 下载文件显示。

                        await httpDownload(url, currentFileHandler, (progressStat) => {
                            if (progressStat.type === "begin") {
                                // ..
                                // console.log("开始下载")
                            } else if (progressStat.type === "pending") {
                                // console.log("下载中" + progressStat.percent);
                                let percent = Math.round(progressStat.percent * 0.75) + 25;
                                this.$refs.downloadProgress.style.setProperty("--dddd-value", String(percent));
                                this.$refs.downloadProgress.textContent = percent + "%";
                            } else if (progressStat.type === "success") {
                                // console.log("下载中完成");
                                this.$refs.downloadProgress.classList.add("hidden");
                                this.$refs.downloadResult.classList.remove("hidden");
                                this.$refs.downloadResult.textContent = "✅";
                                this.$refs.downloadResult.title = "下载完成";

                                // 元数据收集 - 用于小遥搜索识别
                                const relativePath = [...pathStack, currentName + newext].join("/");
                                metadataMap.push({
                                    fileName: currentName + newext,
                                    originalName: this.dentryInfo.name,
                                    dentryUuid: this.dentryInfo.dentryUuid,
                                    dentryKey: this.dentryInfo.dentryKey,
                                    docKey: this.dentryInfo.docKey,
                                    url: `https://alidocs.dingtalk.com/i/nodes/${this.dentryInfo.dentryUuid}`,
                                    fileSize: this.dentryInfo.fileSize,
                                    extension: this.dentryInfo.extension,
                                    exportFormat: newext,
                                    relativePath: relativePath,
                                    contentType: this.dentryInfo.contentType
                                });
                            } else if (progressStat.type === "error") {
                                console.log("下载出错：" + progressStat.error);

                                this.$refs.downloadProgress.classList.add("hidden");
                                this.$refs.downloadResult.classList.remove("hidden");
                                this.$refs.downloadResult.textContent = "❗";
                                this.$refs.downloadResult.title = `下载出错：${progressStat.error}`;

                                this.$el.title = `下载出错：${progressStat.error}`;
                            }
                        });
                    }catch (e) {
                        console.log("下载请求出错：" + e.message);
                        this.$refs.downloadProgress.classList.add("hidden");
                        this.$refs.downloadResult.classList.remove("hidden");
                        this.$refs.downloadResult.textContent = "❗";
                        this.$refs.downloadResult.title = `下载请求出错：${e.message}`;
                        this.$el.title = `下载请求出错：${e.message}`;
                    }
                }

                // 是个目录，那就只需要创建目录即可。
                if (this.dentryInfo.dentryType === "folder" || this.dentryInfo.hasChildren) {
                    currentDirHandle = await dirHandler.getDirectoryHandle(currentName + (this.dentryInfo.dentryType === "folder" ? "" : "_dir"), {create: true});
                }
            } else {
                // 当前文件没选中，但是可能子级有选中，这种情况，一定是要创建一个目录。
                if (hasSelected) {
                    currentDirHandle = await dirHandler.getDirectoryHandle(currentName + (this.dentryInfo.dentryType === "folder" ? "" : "_dir"), {create: true});
                }
            }

            if (hasSelected) {
                // 然后如果有下级，那么继续下载下级的。
                let allDi = this.$refs.di;
                if (!allDi) {
                    return;
                }
                if (!Array.isArray(allDi)) {
                    allDi = [allDi];
                }

                const newPathStack = [...pathStack, currentName];
                for (let i = 0; i < allDi.length; i++) {
                    await allDi[i].$download(currentDirHandle, warnmap, metadataMap, newPathStack);
                }
            }
        }
    },
    data: {
        hasMore: true, // 标记当前节点下是否还有更多数据可以加载。
        loadMoreId: "", // 加载更多数据使用的游标id，会在上一个加载列表的请求中返回的。
    }
};

export default DentryItem;
