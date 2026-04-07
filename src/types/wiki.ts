/**
 * 知识库相关类型定义
 */

/**
 * 知识库节点类型常量
 */
export const NodeType = {
  /** 文档 */
  DOCUMENT: 'document',
  /** 文件夹 */
  FOLDER: 'folder',
  /** 根节点 */
  ROOT: 'root',
} as const;

/**
 * 知识库节点类型
 */
export type NodeTypeInfo = (typeof NodeType)[keyof typeof NodeType];

/**
 * 知识库节点
 */
export interface WikiNode {
  /** 节点 ID */
  id: string;
  /** 节点名称 */
  name: string;
  /** 节点类型 */
  type: NodeTypeInfo;
  /** 子节点 */
  children?: WikiNode[];
  /** 父节点 ID */
  parentId?: string;
  /** 文档 ID（仅文档类型） */
  docId?: string;
  /** 最后修改时间 */
  updatedAt?: string;
}

/**
 * 知识库导出选项
 */
export interface WikiExportOptions {
  /** 输出目录 */
  outputDir: string;
  /** 递归深度 */
  depth: number;
  /** 是否保留目录结构 */
  preserveStructure: boolean;
  /** 是否下载图片 */
  downloadImages: boolean;
  /** 并发数量 */
  concurrency: number;
  /** 是否增量模式 */
  incrementalMode: boolean;
}

/**
 * 知识库 API 响应
 */
export interface WikiResponse {
  /** 节点列表 */
  nodes: WikiNode[];
  /** 当前节点信息 */
  current: WikiNode;
}
