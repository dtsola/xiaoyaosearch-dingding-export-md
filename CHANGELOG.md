# 更新日志

## [1.0.0] - 2026-04-08

### 首次发布 🎉

小遥搜索钉钉导出工具 v1.0.0 正式发布！这是一个用于批量导出钉钉文档/知识库的浏览器插件。

### ✨ 核心功能

- **批量导出** - 支持单个、批量、文件夹递归、完整知识库导出
- **多格式转换** - 支持 .docx、.md、.pdf、.xlsx、.jpg 等格式
- **目录保持** - 完整保留原有文档目录结构
- **实时进度** - 显示导出进度和状态反馈
- **格式配置** - 可自定义各类文档的默认导出格式

### 支持的文档类型

| 类型 | 后缀 | 导出格式 |
|------|------|---------|
| 文档 | .adoc | .docx, .md, .pdf |
| 表格 | .axls | .xlsx |
| 白板 | .adraw | .jpg |
| 脑图 | .amind | .jpg |

### 技术栈

- **框架**：Baby（自研轻量级响应式框架）
- **UI**：Tailwind CSS v4 + DaisyUI v5（Apple 风格）
- **构建**：Vite v8 + @crxjs/vite-plugin
- **平台**：Chrome Extension Manifest V3

### 适用平台

- Chrome 90+
- Edge 90+

### 已知限制

- 多维表格不支持导出
- 快捷方式仅导出快捷方式本身
- Markdown 导出部分复杂内容以链接形式保留

---

## 下载安装

### Chrome Web Store
（审核中，即将上线）

### Edge Add-ons
（审核中，即将上线）

### 手动安装
1. 下载 [Release](https://github.com/dtsola/xiaoyaosearch-dingding-export-md/releases) 压缩包
2. 解压到本地目录
3. 打开浏览器扩展管理页面（`chrome://extensions/` 或 `edge://extensions/`）
4. 开启"开发者模式"
5. 点击"加载已解压的扩展程序"，选择解压后的目录

---

## 相关链接

- [小遥搜索](https://github.com/dtsola/xiaoyaosearch) - 本地 AI 搜索工具
- [小遥搜索飞书导出工具](https://github.com/dtsola/xiaoyaosearch-feishu-export-md)

---

**完整功能介绍**：请查看 [README.md](README.md)
