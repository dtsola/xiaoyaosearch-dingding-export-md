# 小遥搜索钉钉导出工具 - 项目开发规范

> 本文档是项目的基础配置文档，每次 AI 会话都会自动加载。请 AI 助手在协助开发时严格遵守以下规范。

---

## 项目概述

**项目名称**：小遥搜索钉钉导出工具

**产品定位**：为钉钉文档用户提供批量导出知识库并转换为通用格式的浏览器插件

**产品形态**：Chrome/Edge 浏览器扩展（Manifest V3）

**技术栈**：
- 核心框架：Baby（自研轻量级响应式框架，约400行）
- UI 库：Tailwind CSS v4 + DaisyUI v5（Apple 风格设计）
- 构建工具：Vite v8 + @crxjs/vite-plugin
- 状态管理：Baby 内置响应式系统
- 文件操作：File System Access API

**当前版本**：v1.0.0

**项目状态**：MVP 已完成，进入 UI/UX 优化阶段

---

## 重要规则

### 语言要求
**所有 AI 回复、文档编写、代码注释必须使用中文。**

### 自我检查要求
**每次完成一个功能后，AI 助手需要自己检查一遍是否真正完成了需求。**
- 验证功能是否按预期工作
- 检查是否有遗漏的边界情况
- 确认代码质量和可维护性

---

## 1. 技术选型规范

### 1.1 前端框架
- **核心框架**：Baby 框架（自研）
  - 轻量级响应式框架，约400行代码
  - 基于 `Object.defineProperty` 的数据劫持
  - 组件化开发模式，支持 props 和事件传递
  - 生命周期钩子：created、mounted
  - watch 机制，监听数据变化

### 1.2 UI 组件库
- **样式框架**：Tailwind CSS v4 + DaisyUI v5
  - 原子化 CSS，便于定制 Apple 风格
  - 组件类前缀：`dddd-`
  - 主题色：`#007AFF`（苹果蓝）

### 1.3 构建工具
- **主构建工具**：Vite v8
- **扩展构建**：@crxjs/vite-plugin v2
- **CSS 处理**：PostCSS v8 + autoprefixer

### 1.4 浏览器扩展
- **规范**：Chrome Extension Manifest V3
- **目标平台**：Chrome 90+ / Edge 90+
- **后台脚本**：Service Worker
- **内容脚本**：content.js（页面注入）

### 1.5 文件存储
- **本地文件操作**：File System Access API
- **配置存储**：localStorage
- **存储键前缀**：`dddd-`

---

## 2. 代码规范

### 2.1 命名约定

| 类型 | 命名风格 | 示例 |
|------|---------|------|
| 组件类 | PascalCase | `class MainComponent` |
| 组件文件 | kebab-case | `main.js`, `dentryItem.js` |
| 变量/函数 | camelCase | `getDocInfo()`, `selectedDocs` |
| 常量 | UPPER_SNAKE_CASE | `CFG_KEY`, `EXPORT_ADOC_AS` |
| CSS 类 | kebab-case | `.dddd-card`, `.my-dingdocdownloader` |

### 2.2 代码风格
- 使用 **2 空格**缩进
- 使用**单引号**（JS）
- 使用**分号**
- 组件方法使用 `methods` 对象组织
- 组件状态使用 `state` 或 `data` 对象组织

### 2.3 目录结构
```
src/
├── app.js                    # 应用入口
├── app.html / app.ejs        # HTML 模板
├── app.css                   # 主样式文件
├── background.js             # 后台脚本（Service Worker）
├── content.js                # 内容脚本入口
├── script/                   # 核心脚本目录
│   ├── index.js             # Baby 框架核心
│   ├── api.js               # 钉钉 API 封装
│   ├── Http.js              # HTTP 请求封装
│   ├── util.js              # 工具函数
│   ├── cfg.js               # 配置管理
│   ├── version.js           # 版本号
│   ├── errors.js            # 错误定义
│   └── component/           # UI 组件目录
│       ├── main.js          # 主界面组件
│       ├── dentryItem.js    # 文档项组件
│       ├── dialog.js        # 弹窗组件
│       ├── loading.js       # 加载组件
│       ├── adoc2md.js       # Markdown 转换器
│       └── settings/
│           └── cell_radios.js  # 单选组件
└── style/
    └── app.css              # 应用样式
```

### 2.4 注释规范
- 所有函数必须添加 JSDoc 风格的中文注释
- 复杂逻辑需要添加行内注释说明
- 注释应说明"为什么"而非"是什么"

```javascript
/**
 * 获取访问令牌
 * @returns {Promise<string>} 访问令牌
 */
export async function getAccessToken() {
    // 钉钉 API 需要使用 Cookie 中的认证信息
    // ...
}
```

---

## 3. Git 规范

### 3.1 分支策略
- `main`：主分支，稳定发布版本
- `develop`：开发分支，日常开发
- `feature/*`：功能分支，新功能开发
- `hotfix/*`：修复分支，紧急修复

### 3.2 提交信息格式
采用约定式提交（Conventional Commits）：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型（type）：**
- `feat`：新功能
- `fix`：修复 Bug
- `docs`：文档更新
- `style`：代码格式（不影响功能）
- `refactor`：重构
- `perf`：性能优化
- `test`：测试相关
- `chore`：构建/工具相关

**示例：**
```
feat(api): 添加 PDF 导出功能

实现了钉钉文档导出为 PDF 格式的功能，包括：
- 创建导出任务
- 轮询任务状态
- 下载生成的 PDF 文件

Closes #123
```

### 3.3 提交频率
- 每完成一个独立功能即提交
- 提交前确保代码可运行
- 避免一次性提交过多改动

---

## 4. 测试规范

### 4.1 测试类型
| 类型 | 说明 | 优先级 |
|------|------|--------|
| 单元测试 | 测试独立函数和组件 | P1 |
| 集成测试 | 测试模块间交互 | P0 |
| 手动测试 | 真实环境验证 | P0 |

### 4.2 测试清单
| 测试项 | 说明 |
|--------|------|
| 扩展激活 | 点击扩展图标能正常显示界面 |
| 文档列表加载 | 能正确加载并显示文档列表 |
| 单选/多选 | 复选框交互正常 |
| 文件夹选择 | 选择文件夹时递归选中子项 |
| 文档导出 | 能正确导出各种格式的文档 |
| 进度显示 | 下载时显示实时进度 |
| 错误处理 | 网络错误等异常情况有友好提示 |

### 4.3 测试环境
- **开发浏览器**：Chrome 90+ / Edge 90+
- **测试页面**：钉钉文档页面（alidocs.dingtalk.com）
- **加载方式**：chrome://extensions/ 加载未打包的扩展

---

## 5. 部署规范

### 5.1 构建命令
```bash
# 开发模式（监听文件变化）
npm run dev:ext

# 生产构建
npm run build:ext

# 预览构建结果
npm run preview
```

### 5.2 构建产物
- 构建目录：`dist/`
- 需要提交到商店的文件：`dist/` 目录下的所有文件

### 5.3 发布流程
1. 运行 `npm run build:ext` 构建生产版本
2. 检查构建产物是否正确
3. 准备商店素材（图标、截图）
4. 提交到 Chrome Web Store 审核
5. 审核通过后发布

### 5.4 版本号规范
遵循语义化版本（Semantic Versioning）：
- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

示例：`v1.0.0` → `v1.0.1` → `v1.1.0` → `v2.0.0`

---

## 6. 设计文档引用

### 6.1 产品文档
| 文档 | 路径 | 说明 |
|------|------|------|
| **市场需求文档（MRD）** | [docs/00-mrd.md](../docs/00-mrd.md) | 市场分析、目标用户、竞品情况 |
| **产品需求文档（PRD）** | [docs/01-prd.md](../docs/01-prd.md) | 产品功能、使用场景、核心流程 |

### 6.2 技术文档
| 文档 | 路径 | 说明 |
|------|------|------|
| **技术方案文档** | [docs/03-技术方案文档.md](../docs/03-技术方案文档.md) | 系统架构、API 设计、安全设计 |
| **技术选型文档** | [docs/技术选型文档.md](../docs/技术选型文档.md) | 前端技术栈、构建工具、第三方服务 |
| **代码架构文档** | [docs/代码架构文档.md](../docs/代码架构文档.md) | 项目结构、核心模块、组件架构 |

### 6.3 开发文档
| 文档 | 路径 | 说明 |
|------|------|------|
| **开发任务清单** | [docs/04-开发任务清单.md](../docs/04-开发任务清单.md) | 各阶段任务、完成度、已知问题 |
| **开发排期** | [docs/05-开发排期.md](../docs/05-开发排期.md) | 时间规划、里程碑 |
| **开发进度** | [docs/开发进度.md](../docs/开发进度.md) | 实际进度、资源使用、风险评估 |
| **实施步骤文档** | [docs/实施步骤文档.md](../docs/实施步骤文档.md) | 环境准备、开发步骤、测试验证、故障排查 |

### 6.4 UI/UX 文档
| 文档 | 路径 | 说明 |
|------|------|------|
| **苹果风格 UI 改造方案** | [docs/苹果风格UI改造方案.md](../docs/苹果风格UI改造方案.md) | 设计原则、UI 设计稿、实现方案 |

### 6.5 配置文件
| 文件 | 路径 | 说明 |
|------|------|------|
| **项目提示词** | [docs/项目提示词.md](../docs/项目提示词.md) | AI 辅助开发的提示指令集合 |
| **迁移实施方案** | [docs/迁移实施方案.md](../docs/迁移实施方案.md) | 从老项目迁移的实施计划 |

---

## 7. 关键 API 说明

### 7.1 钉钉 API
| API | 说明 |
|-----|------|
| `getAccessToken()` | 获取访问令牌 |
| `getDocumentData()` | 获取文档内容 |
| `downloadDingDoc2pdf()` | 导出为 PDF |
| `downloadDingDoc2md()` | 导出为 Markdown |
| `downloadDingDoc()` | 导出为 Word |
| `downloadAxls()` | 导出表格为 Excel |
| `downloadAboard()` | 导出白板/脑图为图片 |
| `queryExportStatus()` | 查询导出任务状态 |

### 7.2 配置管理
| 配置键 | 说明 |
|--------|------|
| `dddd-export_adoc_as` | 文档导出格式（.docx/.md/.pdf） |
| `dddd-export_axls_as` | 表格导出格式（.xlsx） |
| `dddd-export_adraw_as` | 白板导出格式（.jpg） |
| `dddd-export_amind_as` | 脑图导出格式（.jpg） |

---

## 8. 项目当前状态

### 已完成功能（P0）
- ✅ 插件安装与激活
- ✅ 页面检测与注入
- ✅ 文档列表加载
- ✅ 单选/多选功能
- ✅ 文件夹级联选择
- ✅ 批量下载
- ✅ 格式转换（.docx/.md/.pdf/.xlsx/.jpg）
- ✅ 目录结构保持
- ✅ 下载进度显示
- ✅ 导出格式配置

### 进行中（P1）
- 🔄 动画效果优化
- ⬜ 响应式布局优化
- ⬜ 错误提示优化
- ⬜ 帮助文档完善

### 已知问题
| 问题 | 严重程度 | 预计修复时间 |
|------|----------|--------------|
| Markdown 导出丢失附件 | 中 | v1.1.0 |
| 多维表格不支持导出 | 低 | - |
| 快捷方式不支持导出 | 低 | - |

---

## 9. AI 协作指南

### 9.1 当需要实现新功能时
1. 先查阅 [docs/04-开发任务清单.md](../docs/04-开发任务清单.md) 确认是否已规划
2. 参考 [docs/代码架构文档.md](../docs/代码架构文档.md) 了解代码结构
3. 遵循本文档的代码规范和命名约定
4. 完成后自我检查一遍是否真正完成

### 9.2 当需要修复 Bug 时
1. 先查看 [docs/开发进度.md](../docs/开发进度.md) 的已知问题列表
2. 使用 Chrome DevTools 调试
3. 参考 [docs/实施步骤文档.md](../docs/实施步骤文档.md) 的故障排查章节
4. 修复后添加相关测试用例

### 9.3 当需要了解架构时
1. 先阅读 [docs/03-技术方案文档.md](../docs/03-技术方案文档.md)
2. 再查看 [docs/代码架构文档.md](../docs/代码架构文档.md)
3. 查看源码中的注释和组件实现

### 9.4 当需要修改 UI 时
1. 参考 [docs/苹果风格UI改造方案.md](../docs/苹果风格UI改造方案.md)
2. 使用 Tailwind CSS 原子类，保持 `dddd-` 前缀
3. 遵循 Apple 设计原则：简洁、毛玻璃、浅色调

---

## 10. 快速参考

### 常用命令
```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev:ext

# 生产构建
npm run build:ext

# 预览构建结果
npm run preview
```

### 关键文件路径
| 文件 | 路径 |
|------|------|
| 应用入口 | [src/app.js](../src/app.js) |
| Baby 框架 | [src/script/index.js](../src/script/index.js) |
| API 封装 | [src/script/api.js](../src/script/api.js) |
| 主组件 | [src/script/component/main.js](../src/script/component/main.js) |
| 配置管理 | [src/script/cfg.js](../src/script/cfg.js) |
| 扩展配置 | [manifest.json](../manifest.json) |
| 构建配置 | [vite.config.ext.js](../vite.config.ext.js) |

---

**文档维护**：dtsola
**最后更新**：2026-04-08
**文档版本**：v1.0.0