# 小遥搜索钉钉导出工具 - 项目开发规范

## 项目概述

**项目名称**：小遥搜索钉钉导出工具 (xiaoyaosearch-dingding-export)

**项目定位**：为使用钉钉进行知识管理的用户提供跨平台命令行工具，将钉钉文档/知识库导出为 Markdown 格式，便于对接 [小遥搜索](https://github.com/dtsola/xiaoyaosearch) 实现本地 AI 智能搜索。

**技术架构**：CLI 命令行工具（单体应用），支持跨平台（Windows/macOS/Linux）

**核心特性**：
- 智能Cookie管理（Playwright自动登录）
- 增量导出支持
- 并发控制（避免API限流）
- 模块化设计

---

## 用户偏好设置

### 语言要求
- **所有 AI 回复必须使用中文**
- **所有文档编写必须使用中文**
- **所有代码注释必须使用中文**
- **所有变量/函数命名使用英文**（遵循代码规范）

### 质量保证
- **每次完成一个功能后，必须自己检查一遍是否真正完成**
- 检查清单：
  1. 功能是否正常工作？
  2. 是否有对应的错误处理？
  3. 是否有对应的测试？
  4. 代码是否符合规范？
  5. 是否有必要的中文注释？

---

## 1. 技术选型规范

### 1.1 核心技术栈

| 技术类型 | 选型 | 版本要求 | 说明 |
|---------|------|---------|------|
| **运行时** | Node.js | >= 18.0.0 | CLI 工具标准运行时 |
| **语言** | TypeScript | 5.3+ | 编译时类型安全 |
| **包管理** | npm | 8.x+ | 严格依赖管理，节省空间 |

### 1.2 开发框架

| 类型 | 选型 | 版本 | 用途 |
|------|------|------|------|
| **CLI框架** | Commander.js | 11.x | 命令解析和路由 |
| **交互配置** | Inquirer.js | 9.x | 交互式命令行配置 |
| **进度显示** | cli-progress | 3.x | 批量导出进度展示 |

### 1.3 网络与数据

| 类型 | 选型 | 版本 | 用途 |
|------|------|------|------|
| **HTTP客户端** | axios | 1.x | HTTP 请求处理 |
| **HTML解析** | cheerio | 1.x | 从钉钉页面提取 dentryKey |
| **Cookie管理** | tough-cookie | 4.x | Cookie 持久化和自动更新 |
| **自动登录** | Playwright | 1.40+ | 浏览器自动化登录 |

### 1.4 工具库

| 类型 | 选型 | 版本 | 用途 |
|------|------|------|------|
| **日志** | pino | 8.x | 高性能结构化日志 |
| **配置管理** | cosmiconfig | 8.x | 多格式配置文件支持 |
| **并发控制** | p-limit | 3.x | API 限流控制 |
| **文件匹配** | glob | 10.x | 文件路径匹配 |

### 1.5 开发工具

| 类型 | 选型 | 版本 | 用途 |
|------|------|------|------|
| **代码规范** | ESLint | 最新 | 代码质量检查 |
| **代码格式化** | Prettier | 3.x | 统一代码风格 |
| **类型检查** | TypeScript | 5.3+ | 编译时类型检查 |
| **Git钩子** | Husky | 8.x | Git hooks 管理 |
| **提交规范** | Commitlint | 最新 | Conventional Commits 规范 |
| **测试框架** | Vitest | 最新 | 单元测试和集成测试 |
| **构建工具** | tsup | 最新 | 快速打包编译 |
| **开发运行** | tsx | 最新 | 直接运行 TypeScript |

---

## 2. 代码规范

### 2.1 命名约定

| 类型 | 命名风格 | 示例 |
|------|---------|------|
| **类** | PascalCase | `ConfigManager`, `DingTalkAPI` |
| **接口** | PascalCase，无 I 前缀 | `Config`, `DocumentData` |
| **类型别名** | PascalCase | `ExportOptions`, `ParsedDocument` |
| **枚举** | PascalCase | `ErrorCode` |
| **常量** | UPPER_SNAKE_CASE | `API_CONFIG`, `USER_AGENT` |
| **函数/方法** | camelCase | `loadConfig`, `exportDocument` |
| **私有方法** | camelCase，可选 _ 前缀 | `_saveCookie`, `loadCookie` |
| **变量** | camelCase | `docId`, `outputDir` |
| **文件名** | PascalCase（类文件）<br>camelCase（工具文件） | `ConfigManager.ts`<br>`file.ts`, `logger.ts` |
| **目录名** | kebab-case 或 camelCase | `api/`, `generators/`, `utils/` |

### 2.2 代码风格

```typescript
// 缩进和格式
- 使用 2 空格缩进
- 使用单引号（JavaScript/TypeScript）
- 使用分号
- 最大行宽 120 字符
- 函数间空一行
- 逻辑块间空两行

// 示例
export class ConfigManager {
  private configDir: string;

  constructor() {
    this.configDir = path.join(os.homedir(), '.dingding-export');
  }

  /**
   * 加载配置文件
   * @returns 配置对象
   */
  async load(): Promise<Config> {
    const result = await this.explorer.search();
    return result?.config || this.getDefaultConfig();
  }
}
```

### 2.3 注释规范

```typescript
/**
 * 函数/类的文档注释使用 JSDoc 格式
 * 必须使用中文编写
 * 
 * @param param1 - 参数说明
 * @returns 返回值说明
 * @throws 可能抛出的错误
 */
```

### 2.4 错误处理

```typescript
// 统一错误码定义（使用中文错误消息）
export enum ErrorCode {
  COOKIE_INVALID = 'COOKIE_INVALID',
  COOKIE_EXPIRED = 'COOKIE_EXPIRED',
  API_ERROR = 'API_ERROR',
  DOC_NOT_FOUND = 'DOC_NOT_FOUND',
}

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.COOKIE_INVALID]: 'Cookie 无效，请重新登录',
  [ErrorCode.COOKIE_EXPIRED]: 'Cookie 已过期，正在自动刷新...',
  [ErrorCode.API_ERROR]: 'API 请求失败',
  [ErrorCode.DOC_NOT_FOUND]: '文档不存在',
};
```

---

## 3. 项目结构规范

```
xiaoyaosearch-dingding-export/
├── src/                                 # 源代码主目录
│   ├── cli/                             # CLI 入口层
│   │   ├── index.ts                     # CLI 主入口
│   │   ├── commands/                    # 命令处理
│   │   └── utils/                       # CLI 工具函数
│   ├── core/                            # 核心业务层
│   │   ├── ConfigManager.ts             # 配置管理器
│   │   ├── ExportService.ts             # 导出服务
│   │   ├── CookieManager.ts             # Cookie 管理器 ⭐
│   │   └── StateManager.ts              # 状态管理器
│   ├── api/                             # API 调用层
│   ├── parsers/                         # 解析器层
│   ├── generators/                      # 生成器层
│   ├── utils/                           # 工具函数层
│   ├── types/                           # 类型定义层
│   └── constants/                       # 常量定义
├── bin/                                 # 可执行文件目录
├── tests/                               # 测试目录
│   ├── unit/                            # 单元测试
│   ├── integration/                     # 集成测试
│   └── fixtures/                        # 测试数据
├── docs/                                # 文档目录
├── templates/                           # 模板文件
└── scripts/                             # 脚本目录
```

---

## 4. Git 规范

### 4.1 提交信息规范（Conventional Commits）

```
<类型>(<范围>): <描述>

[可选的正文]

[可选的脚注]
```

**类型（type）：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建或辅助工具变动

**示例：**
```
feat(cli): 添加 init 命令交互式配置功能

- 使用 Inquirer.js 实现交互式配置
- 支持配置文件保存到用户目录
- 添加配置验证逻辑

Closes #123
```

### 4.2 分支策略

- `main`: 主分支，保持稳定可发布状态
- `develop`: 开发分支
- `feature/*`: 功能分支
- `fix/*`: 修复分支
- `release/*`: 发布分支

### 4.3 Git Hooks 配置

```javascript
// .husky/pre-commit
npm exec lint-staged

// .husky/commit-msg
npm exec commitlint --edit $1
```

---

## 5. 测试规范

### 5.1 测试框架

- 使用 **Vitest** 作为测试框架
- 单元测试覆盖率目标：**> 80%**

### 5.2 测试文件组织

```
tests/
├── unit/                            # 单元测试
│   ├── core/                        # 核心层测试
│   ├── api/                         # API 层测试
│   ├── parsers/                     # 解析器测试
│   └── generators/                  # 生成器测试
├── integration/                     # 集成测试
│   ├── commands/                    # 命令测试
│   └── scenarios/                   # 场景测试
└── fixtures/                        # 测试数据
```

### 5.3 测试编写规范

```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('CookieManager', () => {
  let cookieManager: CookieManager;

  beforeEach(() => {
    cookieManager = new CookieManager();
  });

  it('应该能验证 Cookie 是否有效', async () => {
    const isValid = await cookieManager.validate();
    expect(typeof isValid).toBe('boolean');
  });

  it('应该在 Cookie 失效时抛出错误', async () => {
    await expect(cookieManager.getCookie()).rejects.toThrow('Cookie 无效');
  });
});
```

### 5.4 运行测试

```bash
# 运行所有测试
npm test

# 运行测试并查看覆盖率
npm test:coverage

# 运行测试 UI
npm test:ui
```

---

## 6. 部署规范

### 6.1 版本管理

遵循语义化版本（Semantic Versioning）：
- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 向后兼容的功能新增
- **PATCH**: 向后兼容的问题修复

### 6.2 发布流程

```bash
# 1. 更新版本号
npm version <major|minor|patch>

# 2. 构建项目
npm build

# 3. 发布到 npm
npm publish

# 4. 创建 Git 标签
git push --follow-tags
```

### 6.3 发布检查清单

- [ ] 所有测试通过
- [ ] 代码覆盖率 >= 80%
- [ ] 文档已更新
- [ ] CHANGELOG 已更新
- [ ] 版本号已更新
- [ ] 构建产物已验证

---

## 7. 设计文档索引

### 7.1 产品文档

| 文档 | 路径 | 说明 |
|------|------|------|
| **MRD（市场需求文档）** | [docs/00-mrd.md](../docs/00-mrd.md) | 项目定位、目标用户、竞品分析 |
| **PRD（产品需求文档）** | [docs/01-prd.md](../docs/01-prd.md) | 功能清单、用户故事、非功能需求 |

### 7.2 技术文档

| 文档 | 路径 | 说明 |
|------|------|------|
| **技术方案文档** | [docs/03-技术方案文档.md](../docs/03-技术方案文档.md) | 系统架构、核心模块设计、API 调用方案 |
| **技术选型文档** | [docs/技术选型文档.md](../docs/技术选型文档.md) | 技术栈选型、成本估算、升级路径 |
| **代码架构文档** | [docs/代码架构文档.md](../docs/代码架构文档.md) | 项目结构、核心模块说明、依赖关系 |
| **实施步骤文档** | [docs/实施步骤文档.md](../docs/实施步骤文档.md) | 开发步骤、验证标准、常见问题 |

### 7.3 开发管理文档

| 文档 | 路径 | 说明 |
|------|------|------|
| **开发任务清单** | [docs/04-开发任务清单.md](../docs/04-开发任务清单.md) | 任务分解、验收标准 |
| **开发排期** | [docs/05-开发排期.md](../docs/05-开发排期.md) | 时间规划、里程碑 |
| **开发进度** | [docs/开发进度.md](../docs/开发进度.md) | 当前进度跟踪 |

### 7.4 运营文档

| 文档 | 路径 | 说明 |
|------|------|------|
| **应用发布宣传文档** | [docs/运营文档/应用发布宣传文档.md](../docs/运营文档/应用发布宣传文档.md) | 发布宣传材料 |
| **应用发布宣传视频脚本** | [docs/运营文档/应用发布宣传视频脚本.md](../docs/运营文档/应用发布宣传视频脚本.md) | 宣传视频脚本 |

### 7.5 基础模板文档

| 文档 | 路径 | 说明 |
|------|------|------|
| **文档模板集合** | [docs/base/](../docs/base/) | 各类文档的标准模板 |
| **精益开发流程** | [docs/base/精益开发流程.md](../docs/base/精益开发流程.md) | 开发流程规范 |

---

## 8. 核心技术亮点

### 8.1 智能 Cookie 管理 ⭐

使用 **Playwright** 实现浏览器自动化登录：
- 自动检测 Cookie 是否过期
- Cookie 失效时自动打开浏览器进行登录
- 登录完成后自动保存 Cookie 到本地
- 无需用户手动配置 Cookie

### 8.2 两阶段 API 调用

```
GET /i/nodes/{node_id}
  ↓ 提取 dentryKey
POST /api/document/data (Header: a-dentry-key)
  ↓ 获取文档内容
转换为 Markdown
```

### 8.3 并发控制

使用 **p-limit** 控制并发请求数量：
- 默认并发数：5
- 最大并发数：20
- 避免触发钉钉 API 限流

### 8.4 增量导出

基于本地状态文件实现增量导出：
- 记录已导出文档的时间戳
- 仅导出有更新的文档
- 节省时间和带宽

---

## 9. 常用命令

```bash
# 开发
npm dev                      # 启动开发模式
npm build                    # 构建项目
npm build:watch              # 监听模式构建

# 代码质量
npm type-check               # TypeScript 类型检查
npm lint                     # ESLint 检查
npm lint:fix                 # ESLint 自动修复
npm format                   # Prettier 格式化

# 测试
npm test                     # 运行所有测试
npm test:ui                  # 运行测试 UI
npm test:coverage            # 运行测试覆盖率

# 发布
npm release                  # 发布到 npm
```

---

## 10. 注意事项

### 10.1 安全要求

- Cookie 文件存储在用户目录，权限设置为仅所有者可读写
- Cookie 不在日志中输出
- 支持 `.gitignore` 忽略配置文件，防止意外提交

### 10.2 兼容性

- Node.js: >= 18.0.0
- 操作系统: Windows、macOS、Linux
- 包管理器: npm、npm、yarn

### 10.3 性能要求

- 单个文档导出响应时间 < 5秒
- 批量导出 100 篇文档 < 5分钟
- 并发请求可配置，默认 5，最大不超过 20

---

## 11. 相关资源

- [小遥搜索主项目](https://github.com/dtsola/xiaoyaosearch)
- [飞书导出工具（参考）](https://github.com/dtsola/xiaoyaosearch-feishu-export-md)
- [钉钉文档](https://open.dingtalk.com/document/)

---

**文档维护**：dtsola  
**最后更新**：2026-04-07  
**版本**：v1.0.0
