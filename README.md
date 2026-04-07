# 小遥搜索钉钉导出工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)](https://chrome.google.com/webstore)

> 一键批量导出钉钉文档和知识库，让知识资产真正属于你自己

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 加载扩展

1. 运行 `npm run build` 构建项目
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目的 `dist/` 目录

## 📦 项目结构

```
xiaoyaosearch-dingtalk-export/
├── manifest.json              # Chrome扩展配置
├── vite.config.js            # Vite构建配置
├── tailwind.config.js        # Tailwind CSS配置
├── src/
│   ├── content/               # Content Script（注入到钉钉页面）
│   │   ├── index.js          # 入口文件
│   │   ├── framework/        # Baby框架
│   │   ├── components/       # UI组件
│   │   ├── api/              # API封装
│   │   ├── utils/            # 工具函数
│   │   └── styles/           # 样式文件
│   ├── popup/                # 扩展弹窗
│   └── background/           # 后台脚本
├── public/                    # 静态资源
│   └── icons/                # 扩展图标
└── dist/                     # 构建输出
```

## 🎯 功能特性

- ✅ 批量导出钉钉文档
- ✅ 支持多种格式（Markdown、DOCX、PDF、XLSX、JPG）
- ✅ 保持目录结构
- ✅ 本地处理，数据不上传服务器

## 🔧 技术栈

- **构建工具**: Vite 5.x
- **样式框架**: Tailwind CSS 4.x + DaisyUI 4.x
- **开发语言**: JavaScript ES6+

## 📝 待办事项

- [ ] Day 1: 项目初始化 ✅
- [ ] Day 2-4: 核心代码复刻
- [ ] Day 5-6: 功能完善
- [ ] Day 7: Chrome扩展适配
- [ ] Day 8-9: 测试与优化
- [ ] Day 10: 发布准备

## 🎨 图标说明

**注意**: 当前使用的是占位图标（SVG格式），需要替换为PNG格式的正式图标：

- `icon16.png` (16x16) - 工具栏图标
- `icon48.png` (48x48) - 扩展管理页面图标
- `icon128.png` (128x128) - Chrome Web Store 图标

可以使用以下工具将 SVG 转换为 PNG：
- 在线工具: https://cloudconvert.com/svg-to-png
- 命令行工具: `convert icon.svg icon128.png` (需要 ImageMagick)

## 📄 许可证

MIT License

## 🙏 致谢

- [ding-doc-downloader](https://github.com/Microanswer/ding-doc-downloader) - 参考项目

---

**小遥搜索** - 让知识管理更简单
