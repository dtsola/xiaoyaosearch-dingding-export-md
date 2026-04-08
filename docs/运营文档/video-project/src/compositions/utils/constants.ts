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
  // 飞书蓝
  feishuBlue: '#3370FF',
  // GitHub 黑
  githubBlack: '#24292F',
  // 代码黑
  codeBlack: '#0D1117',
  // 成功绿
  successGreen: '#2EA043',
  // 错误红
  errorRed: '#DA3633',
  // 警告黄
  warningYellow: '#D29922',
  // 文字色
  textPrimary: '#FFFFFF',
  textSecondary: '#8B949E',
  textAccent: '#58A6FF',
  // 背景色
  bgPrimary: '#0D1117',
  bgSecondary: '#161B22',
  bgTertiary: '#21262D',
  // 边框
  border: '#30363D',
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

// 场景时长（帧数）
export const SCENE_DURATIONS = {
  shot01: 15 * 30,  // 15秒 - 背景故事
  shot02: 20 * 30,  // 20秒 - 问题分析
  shot03: 10 * 30,  // 10秒 - 解决方案标题
  shot04: 30 * 30,  // 30秒 - 功能与场景
  shot05: 10 * 30,  // 10秒 - 安装工具
  shot06: 15 * 30,  // 15秒 - 初始化
  shot07: 10 * 30,  // 10秒 - 单文档导出
  shot08: 13 * 30,  // 13秒 - 批量导出
  shot09: 12 * 30,  // 12秒 - 知识库导出
  shot10: 15 * 30,  // 15秒 - CTA
} as const;

// 总时长（增加缓冲，确保配音不会超出）
export const TOTAL_DURATION = 200 * 30; // 200秒 @ 30fps（足够容纳所有配音）
