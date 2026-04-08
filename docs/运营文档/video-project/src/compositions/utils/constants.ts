/**
 * 视频常量定义
 * @module constants
 */

// 视频配置
export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
} as const;

// 颜色方案
export const COLORS = {
  // 钉钉蓝
  dingtalkBlue: '#0089FF',
  // GitHub 黑
  githubBlack: '#24292F',
  // 浏览器扩展灰
  extensionGray: '#F5F5F5',
  // 成功绿
  successGreen: '#2EA043',
  // 错误红
  errorRed: '#DA3633',
  // 警告黄
  warningYellow: '#D29922',
  // 文字色
  textPrimary: '#333333',
  textSecondary: '#666666',
  textAccent: '#0089FF',
  // 背景色
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F5F5F5',
  bgTertiary: '#E5E5E5',
  // 边框
  border: '#E5E5E5',
} as const;

// 字体配置
export const FONTS = {
  title: 'system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, Consolas, monospace',
  body: 'system-ui, -apple-system, sans-serif',
} as const;

// 字号配置
export const FONT_SIZES = {
  title: 72,
  subtitle: 48,
  heading: 36,
  body: 24,
  code: 20,
  small: 16,
} as const;

// 动画时长（帧数）
export const DURATIONS = {
  fast: 15,   // 0.5秒 @ 30fps
  normal: 30, // 1秒 @ 30fps
  slow: 45,   // 1.5秒 @ 30fps
} as const;

// 场景时长（帧数）- 基于实际音频时长
export const SCENE_DURATIONS = {
  shot01: 436,  // 14.5秒 - 背景故事
  shot02: 328,  // 10.9秒 - 问题分析
  shot03: 373,  // 12.4秒 - 解决方案标题
  shot04: 402,  // 13.4秒 - 功能展示-主界面
  shot05: 570,  // 19.0秒 - 功能展示-批量导出
  shot06: 417,  // 13.9秒 - 功能展示-格式配置
  shot07: 560,  // 18.6秒 - 生态介绍-小遥搜索集成
  shot08: 617,  // 20.5秒 - CTA
} as const;

// 总时长（基于实际音频时长总和）
export const TOTAL_DURATION = 436 + 328 + 373 + 402 + 570 + 417 + 560 + 617; // 3703帧 ≈ 123秒
