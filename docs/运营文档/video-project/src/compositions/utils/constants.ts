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

// 场景时长（帧数）- 8个场景
export const SCENE_DURATIONS = {
  shot01: 15 * 30,  // 15秒 - 背景故事
  shot02: 20 * 30,  // 20秒 - 问题分析
  shot03: 10 * 30,  // 10秒 - 解决方案标题
  shot04: 15 * 30,  // 15秒 - 功能展示-主界面
  shot05: 20 * 30,  // 20秒 - 功能展示-批量导出
  shot06: 10 * 30,  // 10秒 - 功能展示-格式配置
  shot07: 10 * 30,  // 10秒 - 生态介绍-小遥搜索集成
  shot08: 10 * 30,  // 10秒 - CTA
} as const;

// 总时长（增加缓冲，确保配音不会超出）
export const TOTAL_DURATION = 150 * 30; // 150秒 @ 30fps（足够容纳所有配音）
