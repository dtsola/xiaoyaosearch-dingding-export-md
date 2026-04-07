/**
 * 文档相关类型定义
 */

/**
 * 内容块类型（使用字符串字面量联合类型，更灵活）
 */
export type ContentType = 'paragraph' | 'heading' | 'code' | 'table' | 'list' | 'image' | 'divider' | 'quote' | 'link';

/**
 * 文本内容
 */
export interface TextContent {
  type: 'paragraph' | 'quote';
  text: string;
}

/**
 * 标题内容
 */
export interface HeadingContent {
  type: 'heading';
  text: string;
  level: number;
}

/**
 * 代码块
 */
export interface CodeContent {
  type: 'code';
  text: string;
  language?: string;
}

/**
 * 表格
 */
export interface TableContent {
  type: 'table';
  rows: string[][];
}

/**
 * 列表
 */
export interface ListContent {
  type: 'list';
  items: string[];
  ordered: boolean;
}

/**
 * 图片
 */
export interface ImageContent {
  type: 'image';
  url: string;
  alt?: string;
}

/**
 * 分割线
 */
export interface DividerContent {
  type: 'divider';
}

/**
 * 链接
 */
export interface LinkContent {
  type: 'link';
  url: string;
  text: string;
}

/**
 * 内容块联合类型
 */
export type ContentBlock =
  | TextContent
  | HeadingContent
  | CodeContent
  | TableContent
  | ListContent
  | ImageContent
  | DividerContent
  | LinkContent;

/**
 * 解析后的文档
 */
export interface ParsedDocument {
  /** 文档标题 */
  title: string;
  /** 内容块列表 */
  content: ContentBlock[];
  /** 图片列表 */
  images: ImageContent[];
  /** 附件列表 */
  attachments: string[];
  /** 文档元数据 */
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    author?: string;
  };
}
