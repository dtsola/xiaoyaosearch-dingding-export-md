/**
 * Markdown 生成器
 * 将解析后的文档转换为 Markdown 格式
 */
import type { ParsedDocument, ContentBlock } from '../types/document.js';

/**
 * Markdown 生成器
 */
export class MarkdownGenerator {
  /**
   * 生成 Markdown 文档
   */
  generate(document: ParsedDocument): string {
    let markdown = '';

    // 标题
    markdown += `# ${document.title}\n\n`;

    // 元数据（可选）
    if (document.metadata) {
      const metaParts: string[] = [];
      if (document.metadata.author) {
        metaParts.push(`作者: ${document.metadata.author}`);
      }
      if (document.metadata.createdAt) {
        metaParts.push(`创建时间: ${document.metadata.createdAt}`);
      }
      if (document.metadata.updatedAt) {
        metaParts.push(`更新时间: ${document.metadata.updatedAt}`);
      }
      if (metaParts.length > 0) {
        markdown += `> ${metaParts.join(' | ')}\n\n`;
      }
    }

    // 内容
    for (const block of document.content) {
      markdown += this.generateBlock(block);
    }

    return markdown;
  }

  /**
   * 生成单个内容块
   */
  private generateBlock(block: ContentBlock): string {
    switch (block.type) {
      case 'heading':
        return this.generateHeading(block);
      case 'paragraph':
        return this.generateParagraph(block);
      case 'code':
        return this.generateCode(block);
      case 'table':
        return this.generateTable(block);
      case 'list':
        return this.generateList(block);
      case 'image':
        return this.generateImage(block);
      case 'divider':
        return this.generateDivider();
      case 'quote':
        return this.generateQuote(block);
      case 'link':
        return this.generateLink(block);
      default:
        return '';
    }
  }

  /**
   * 生成标题
   */
  private generateHeading(block: any): string {
    const level = Math.min(Math.max(block.level || 1, 1), 6);
    return `${'#'.repeat(level)} ${block.text}\n\n`;
  }

  /**
   * 生成段落
   */
  private generateParagraph(block: any): string {
    return `${block.text}\n\n`;
  }

  /**
   * 生成代码块
   */
  private generateCode(block: any): string {
    const language = block.language || '';
    return `\`\`\`${language}\n${block.text}\n\`\`\`\n\n`;
  }

  /**
   * 生成表格
   */
  private generateTable(block: any): string {
    if (!block.rows || block.rows.length === 0) {
      return '';
    }

    let table = '';

    for (let i = 0; i < block.rows.length; i++) {
      const row = block.rows[i];
      table += '| ' + row.join(' | ') + ' |\n';

      // 添加表头分隔线
      if (i === 0) {
        table += '| ' + row.map(() => '---').join(' | ') + ' |\n';
      }
    }

    return table + '\n';
  }

  /**
   * 生成列表
   */
  private generateList(block: any): string {
    if (!block.items || block.items.length === 0) {
      return '';
    }

    let list = '';
    const marker = block.ordered ? '.' : '-';

    for (const item of block.items) {
      list += `${marker} ${item}\n`;
    }

    return list + '\n';
  }

  /**
   * 生成图片
   */
  private generateImage(block: any): string {
    const alt = block.alt || block.text || '图片';
    return `![${alt}](${block.url})\n\n`;
  }

  /**
   * 生成分割线
   */
  private generateDivider(): string {
    return '---\n\n';
  }

  /**
   * 生成引用
   */
  private generateQuote(block: any): string {
    return `> ${block.text}\n\n`;
  }

  /**
   * 生成链接
   */
  private generateLink(block: any): string {
    return `[${block.text}](${block.url})\n\n`;
  }
}
