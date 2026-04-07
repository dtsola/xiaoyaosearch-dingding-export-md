/**
 * 日志工具
 * 使用 pino 实现高性能日志
 */
import pino from 'pino';

/**
 * 日志级别
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SILENT = 'silent',
}

/**
 * 日志配置
 */
export interface LoggerConfig {
  /** 日志级别 */
  level: LogLevel;
  /** 是否输出到文件 */
  file?: boolean;
  /** 日志文件路径 */
  filePath?: string;
  /** 是否使用彩色输出 */
  pretty: boolean;
}

/**
 * 默认日志配置
 */
const defaultConfig: LoggerConfig = {
  level: LogLevel.INFO,
  file: false,
  pretty: true,
};

/**
 * 创建日志器
 */
export function createLogger(name: string, config: Partial<LoggerConfig> = {}): pino.Logger {
  const opts = { ...defaultConfig, ...config };

  // 基础配置
  const baseOptions: pino.LoggerOptions = {
    level: opts.level,
    name,
    timestamp: pino.stdTimeFunctions.isoTime,
  };

  // 简单的美化输出（开发模式）
  if (opts.pretty) {
    return pino({
      ...baseOptions,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    });
  }

  // 生产模式使用标准输出
  return pino(baseOptions);
}

/**
 * 全局日志器实例
 */
export const logger = createLogger('dingding-export');

/**
 * 日志工具类
 */
export class Logger {
  private instance: pino.Logger;

  constructor(name: string, config?: Partial<LoggerConfig>) {
    this.instance = createLogger(name, config);
  }

  /** 调试信息 */
  debug(message: string, ...args: any[]): void {
    this.instance.debug({ args }, message);
  }

  /** 一般信息 */
  info(message: string, ...args: any[]): void {
    this.instance.info({ args }, message);
  }

  /** 警告信息 */
  warn(message: string, ...args: any[]): void {
    this.instance.warn({ args }, message);
  }

  /** 错误信息 */
  error(message: string, error?: Error | unknown): void {
    if (error instanceof Error) {
      this.instance.error({ error: { message: error.message, stack: error.stack } }, message);
    } else {
      this.instance.error({ error }, message);
    }
  }

  /** 获取底层 pino 实例 */
  getPino(): pino.Logger {
    return this.instance;
  }
}
