# 小遥搜索飞书导出工具 - Remotion 视频项目

> 使用 Remotion 框架实现的应用发布宣传视频

---

## 📋 项目概述

- **技术栈**：Remotion 4.0 + React 19 + TypeScript + Tailwind CSS 4
- **视频时长**：150秒（2分30秒）
- **分辨率**：1920x1080（16:9 横版）
- **帧率**：30fps
- **镜头数量**：10个

---

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看 Remotion Studio。

### 渲染视频

```bash
# 渲染为 MP4
npm run build
npx remotion render Main out.mp4

# 渲染为 GIF（可选）
npx remotion render Main out.gif --image-format=gif --pixels-per-frame=1000000
```

---

## 📁 项目结构

```
src/
├── components/              # 可复用组件
│   ├── FadeIn.tsx          # 淡入动画
│   ├── Typewriter.tsx      # 打字机效果
│   ├── SlideIn.tsx         # 滑入动画
│   ├── CodeBlock.tsx       # 代码块组件
│   └── index.ts            # 组件导出
├── compositions/           # 场景组件
│   ├── utils/
│   │   └── constants.ts    # 常量定义（颜色、字体、时长）
│   ├── Shot01_BackgroundStory.tsx    # 镜头01：背景故事
│   ├── Shot02_ProblemAnalysis.tsx    # 镜头02：问题分析
│   ├── Shot03_SolutionTitle.tsx      # 镜头03：解决方案标题
│   ├── Shot04_FeaturesAndScenes.tsx  # 镜头04：功能与场景
│   ├── Shot05_Install.tsx            # 镜头05：安装工具
│   ├── Shot06_Init.tsx               # 镜头06：初始化
│   ├── Shot07_SingleDoc.tsx          # 镜头07：单文档导出
│   ├── Shot08_BatchExport.tsx        # 镜头08：批量导出
│   ├── Shot09_WikiExport.tsx         # 镜头09：知识库导出
│   ├── Shot10_CTA.tsx                # 镜头10：行动号召
│   ├── Main.tsx                      # 主视频组件（整合所有场景）
│   └── index.ts                      # 组件导出
├── Root.tsx                 # 根组件，定义 Composition
├── index.css               # 全局样式
└── index.ts                # 入口文件
```

---

## 🎬 镜头列表

| 镜头 | 内容 | 时长 | 文件 |
|------|------|------|------|
| 01 | 背景故事 | 15秒 | Shot01_BackgroundStory.tsx |
| 02 | 问题分析 | 20秒 | Shot02_ProblemAnalysis.tsx |
| 03 | 解决方案标题 | 10秒 | Shot03_SolutionTitle.tsx |
| 04 | 功能与场景 | 30秒 | Shot04_FeaturesAndScenes.tsx |
| 05 | 安装工具 | 10秒 | Shot05_Install.tsx |
| 06 | 初始化 | 15秒 | Shot06_Init.tsx |
| 07 | 单文档导出 | 10秒 | Shot07_SingleDoc.tsx |
| 08 | 批量导出 | 13秒 | Shot08_BatchExport.tsx |
| 09 | 知识库导出 | 12秒 | Shot09_WikiExport.tsx |
| 10 | 行动号召 | 15秒 | Shot10_CTA.tsx |

---

## 🎨 设计规范

### 配色方案

```typescript
{
  feishuBlue: '#3370FF',      // 飞书蓝（主色）
  codeBlack: '#0D1117',       // 代码黑（背景）
  textPrimary: '#FFFFFF',     // 主文字
  textSecondary: '#8B949E',   // 副文字
  textAccent: '#58A6FF',      // 强调色
  successGreen: '#2EA043',    // 成功绿
  errorRed: '#DA3633',        // 错误红
}
```

### 字体配置

```typescript
{
  title: '72px',   // 标题
  subtitle: '48px', // 副标题
  heading: '36px',  // 小标题
  body: '24px',     // 正文
  code: '20px',     // 代码
}
```

---

## 🔧 开发命令

```bash
# 开发模式
npm run dev

# 构建
npm run build

# 代码检查
npm run lint
```

---

## 📝 使用技巧

### 添加新场景

1. 在 `src/compositions/` 创建新组件
2. 在 `src/compositions/Main.tsx` 中添加 `Series.Sequence`
3. 更新 `constants.ts` 中的场景时长

### 修改动画时长

修改 `constants.ts` 中的 `SCENE_DURATIONS`：

```typescript
export const SCENE_DURATIONS = {
  shot01: 15 * 30,  // 15秒 @ 30fps
  // ...
} as const;
```

### 使用 FadeIn 组件

```tsx
<FadeIn delay={30} duration={30}>
  <div>延迟30帧开始，持续30帧的淡入动画</div>
</FadeIn>
```

---

## 📦 依赖包

```json
{
  "@remotion/cli": "4.0.417",
  "@remotion/media": "4.0.441",
  "@remotion/transitions": "4.0.441",
  "@remotion/tailwind-v4": "4.0.417",
  "react": "19.2.3",
  "remotion": "4.0.417",
  "tailwindcss": "4.0.0",
  "zod": "3.22.3"
}
```

---

## 📚 参考资源

- [Remotion 官方文档](https://www.remotion.dev/docs)
- [Remotion Transitions](https://www.remotion.dev/docs/transitions)
- [Remotion Media](https://www.remotion.dev/docs/media)

---

**项目创建日期**：2026-03-30
**作者**：dtsola
