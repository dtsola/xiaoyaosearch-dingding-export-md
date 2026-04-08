# 静态资源目录

## 需要准备的资源

### 图片资源
- `logo.png` - 产品 Logo（PNG，透明背景，建议 512x512）
- `qr-code.png` - 个人微信二维码（PNG，建议 500x500）

### 可选资源
- `screenshots/` - 产品截图目录
  - `init.png` - 初始化配置截图
  - `single-doc.png` - 单文档导出截图
  - `batch-export.png` - 批量导出截图
  - `wiki-export.png` - 知识库导出截图

### 视频资源
- `demo-screen.mp4` - 屏幕录制演示视频（可选）

## 注意事项

1. 图片格式：PNG 或 JPG
2. 建议尺寸：
   - Logo: 512x512
   - 二维码: 500x500
   - 截图: 1920x1080
3. 文件大小：单个文件不超过 5MB

## 使用方式

在组件中使用 `staticFile()` 引用资源：

```tsx
import { Img, staticFile } from 'remotion';

<Img src={staticFile('logo.png')} />
```
