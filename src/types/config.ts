/**
 * 配置相关类型定义
 */

/**
 * 配置文件结构
 */
export interface ConfigProfile {
  /** 输出目录 */
  outputDir: string;
  /** 并发数量 */
  concurrency: number;
  /** 是否下载图片 */
  downloadImages: boolean;
  /** 是否下载其他资源 */
  downloadAssets: boolean;
  /** 是否启用增量模式 */
  incrementalMode: boolean;
}

/**
 * 完整配置结构
 */
export interface Config {
  /** 所有配置文件 */
  profiles: Record<string, ConfigProfile>;
  /** 当前使用的配置文件名称 */
  currentProfile: string;
}

/**
 * Cookie 结构
 */
export interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires?: number | string;
  httpOnly?: boolean;
  secure?: boolean;
}

/**
 * 文档导出选项
 */
export interface ExportOptions {
  /** 输出目录 */
  outputDir: string;
  /** 并发数量 */
  concurrency: number;
  /** 是否下载图片 */
  downloadImages: boolean;
  /** 是否下载其他资源 */
  downloadAssets: boolean;
  /** 是否增量模式 */
  incrementalMode: boolean;
}
