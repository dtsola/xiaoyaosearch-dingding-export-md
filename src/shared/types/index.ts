/**
 * 钉钉文档条目类型
 */
export interface DentryItem {
  dentry_uuid: string;
  dentry_name: string;
  dentry_type: string;
  parent_uuid: string;
  is_deleted: boolean;
  children?: DentryItem[];
}

/**
 * 文件类型枚举
 */
export enum FileType {
  ADOC = 'adoc',      // 文档
  AXLS = 'axls',      // 表格
  ADRAW = 'adraw',    // 白板
  AMIND = 'amind',    // 脑图
  FOLDER = 'folder',  // 文件夹
  UNKNOWN = 'unknown'
}

/**
 * 导出格式
 */
export type ExportFormat = 'md' | 'docx' | 'pdf' | 'xlsx' | 'jpg';

/**
 * 导出配置
 */
export interface ExportConfig {
  adoc: ExportFormat;    // 文档导出格式
  axls: ExportFormat;    // 表格导出格式
  adraw: ExportFormat;   // 白板导出格式
  amind: ExportFormat;   // 脑图导出格式
}

/**
 * 导出任务状态
 */
export enum TaskStatus {
  PENDING = 'pending',
  EXPORTING = 'exporting',
  SUCCESS = 'success',
  FAILED = 'failed'
}
