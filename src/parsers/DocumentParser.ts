/**
 * 文档解析器
 * 将钉钉文档数据解析为统一格式
 */
import type { ParsedDocument, ContentBlock, ImageContent } from '../types/document.js';

/**
 * 文档解析器
 */
export class DocumentParser {
  /**
   * 解析文档数据
   */
  parse(documentData: any): ParsedDocument {
    // 处理不同的数据格式
    const title = this.extractTitle(documentData);
    const content = this.parseContent(documentData);
    const images = this.extractImages(documentData);
    const attachments = this.extractAttachments(documentData);

    return {
      title,
      content,
      images,
      attachments,
      metadata: this.extractMetadata(documentData),
    };
  }

  /**
   * 提取文档标题
   */
  private extractTitle(data: any): string {
    // 尝试多种可能的标题字段
    return data?.title || data?.name || data?.document?.title || data?.content?.title || '未命名文档';
  }

  /**
   * 解析文档内容
   */
  private parseContent(data: any): ContentBlock[] {
    const blocks: ContentBlock[] = [];

    // 处理不同的内容格式
    const content = data?.content || data?.document?.content || data?.blocks || [];

    if (Array.isArray(content)) {
      for (const item of content) {
        const block = this.parseContentItem(item);
        if (block) {
          blocks.push(block);
        }
      }
    } else if (typeof content === 'object') {
      // 单个内容对象
      const block = this.parseContentItem(content);
      if (block) {
        blocks.push(block);
      }
    }

    return blocks;
  }

  /**
   * 解析单个内容项
   */
  private parseContentItem(item: any): ContentBlock | null {
    if (!item || typeof item !== 'object') {
      return null;
    }

    // 根据类型解析
    switch (item.type) {
      case 'heading':
      case 'header':
        return {
          type: 'heading',
          text: item.text || item.content || '',
          level: item.level || 1,
        };

      case 'paragraph':
      case 'text':
        return {
          type: 'paragraph',
          text: item.text || item.content || '',
        };

      case 'code':
        return {
          type: 'code',
          text: item.code || item.content || '',
          language: item.language,
        };

      case 'table':
        return {
          type: 'table',
          rows: item.rows || item.content || [],
        };

      case 'list':
        return {
          type: 'list',
          items: item.items || item.content || [],
          ordered: item.ordered || false,
        };

      case 'image':
        return {
          type: 'image',
          url: item.url || item.src || '',
          alt: item.alt || item.caption,
        };

      case 'divider':
      case 'hr':
        return {
          type: 'divider',
        };

      case 'quote':
        return {
          type: 'quote',
          text: item.text || item.content || '',
        };

      case 'link':
        return {
          type: 'link',
          url: item.url || item.href || '',
          text: item.text || item.content || '',
        };

      default:
        // 尝试处理未知类型
        if (item.text) {
          return {
            type: 'paragraph',
            text: item.text,
          };
        }
        return null;
    }
  }

  /**
   * 提取图片列表
   */
  private extractImages(data: any): ImageContent[] {
    const images: ImageContent[] = [];

    const extract = (obj: any) => {
      if (!obj || typeof obj !== 'object') {
        return;
      }

      // 检查当前对象
      if (obj.type === 'image' && obj.url) {
        images.push({
          type: 'image',
          url: obj.url,
          alt: obj.alt,
        });
      }

      // 递归处理子对象
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach(extract);
        } else if (typeof obj[key] === 'object') {
          extract(obj[key]);
        }
      }
    };

    extract(data);
    return images;
  }

  /**
   * 提取附件列表
   */
  private extractAttachments(data: any): string[] {
    // 提取附件 URL
    const attachments: string[] = [];

    const extract = (obj: any) => {
      if (!obj || typeof obj !== 'object') {
        return;
      }

      if (obj.type === 'attachment' && obj.url) {
        attachments.push(obj.url);
      }

      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach(extract);
        } else if (typeof obj[key] === 'object') {
          extract(obj[key]);
        }
      }
    };

    extract(data);
    return attachments;
  }

  /**
   * 提取元数据
   */
  private extractMetadata(data: any): {
    createdAt?: string;
    updatedAt?: string;
    author?: string;
  } {
    return {
      createdAt: data?.createdAt || data?.createdTime,
      updatedAt: data?.updatedAt || data?.modifiedTime,
      author: data?.creator || data?.author,
    };
  }
}
