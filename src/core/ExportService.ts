/**
 * 导出服务
 * 整合各个模块，实现完整的导出流程
 */
import { DingTalkAPI } from '../api/DingTalkAPI.js';
import { DocumentParser } from '../parsers/DocumentParser.js';
import { MarkdownGenerator } from '../generators/MarkdownGenerator.js';
import { CookieManager } from './CookieManager.js';
import { ConfigManager } from './ConfigManager.js';
import { StateManager } from './StateManager.js';
import type { ExportOptions } from '../types/config.js';
import type { ParsedDocument } from '../types/document.js';
import fs from 'fs/promises';
import path from 'path';
import pLimit from 'p-limit';

/**
 * 导出结果
 */
export interface ExportResult {
  /** 是否成功 */
  success: boolean;
  /** 文档 ID */
  docId: string;
  /** 输出文件路径 */
  outputPath?: string;
  /** 错误信息 */
  error?: string;
  /** 是否跳过（增量模式） */
  skipped?: boolean;
}

/**
 * 导出进度回调
 */
export type ProgressCallback = (current: number, total: number, docId: string) => void;

/**
 * 导出服务
 */
export class ExportService {
  private api: DingTalkAPI;
  private parser: DocumentParser;
  private generator: MarkdownGenerator;
  private cookieManager: CookieManager;
  private configManager: ConfigManager;
  private stateManager?: StateManager;

  constructor(outputDir?: string) {
    this.api = new DingTalkAPI();
    this.parser = new DocumentParser();
    this.generator = new MarkdownGenerator();
    this.cookieManager = new CookieManager();
    this.configManager = new ConfigManager();

    // 如果提供了输出目录，初始化状态管理器
    if (outputDir) {
      this.stateManager = new StateManager(outputDir);
    }
  }

  /**
   * 导出单个文档
   */
  async exportDocument(docId: string, outputDir: string, options: Partial<ExportOptions> = {}): Promise<ExportResult> {
    try {
      // 获取配置
      const config = await this.configManager.getExportOptions();
      const opts = { ...config, ...options };

      // 增量模式检查
      if (opts.incrementalMode && this.stateManager) {
        const shouldExport = await this.stateManager.shouldExport(docId);
        if (!shouldExport) {
          console.log(`⏭️  跳过（已导出）: ${docId}`);
          return {
            success: true,
            docId,
            skipped: true,
          };
        }
      }

      console.log(`📄 正在导出文档: ${docId}`);

      // 1. 确保 Cookie 有效
      await this.cookieManager.ensureValidCookie();

      // 2. 获取文档页面
      console.log('  📥 获取文档页面...');
      const html = await this.api.fetchDocumentPage(docId);

      // 3. 提取 dentryKey
      console.log('  🔍 提取文档密钥...');
      const dentryKey = this.api.extractDentryKey(html);
      console.log(`  ✅ dentryKey: ${dentryKey}`);

      // 4. 获取文档内容
      console.log('  📥 获取文档内容...');
      const documentData = await this.api.fetchDocumentData(dentryKey);

      // 5. 解析文档
      console.log('  🔧 解析文档结构...');
      const parsedDoc = this.parser.parse(documentData);
      console.log(`  📝 标题: ${parsedDoc.title}`);

      // 6. 下载图片（如果启用）
      if (opts.downloadImages && parsedDoc.images.length > 0) {
        console.log(`  🖼️  下载 ${parsedDoc.images.length} 张图片...`);
        await this.downloadImages(parsedDoc, outputDir);
      }

      // 7. 生成 Markdown
      console.log('  ✍️  生成 Markdown...');
      const markdown = this.generator.generate(parsedDoc);

      // 8. 保存文件
      await fs.mkdir(outputDir, { recursive: true });
      const fileName = this.sanitizeFileName(`${parsedDoc.title}.md`);
      const outputPath = path.join(outputDir, fileName);
      await fs.writeFile(outputPath, markdown, 'utf-8');

      console.log(`  ✅ 导出成功: ${outputPath}`);

      // 9. 更新状态
      if (this.stateManager) {
        await this.stateManager.markExported(docId, parsedDoc.title, parsedDoc.metadata?.updatedAt, outputPath);
      }

      return {
        success: true,
        docId,
        outputPath,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`  ❌ 导出失败: ${errorMessage}`);

      return {
        success: false,
        docId,
        error: errorMessage,
      };
    }
  }

  /**
   * 导出多个文档（批量，支持并发控制）
   */
  async exportDocuments(
    docIds: string[],
    outputDir: string,
    options: Partial<ExportOptions> & { onProgress?: ProgressCallback } = {}
  ): Promise<ExportResult[]> {
    const config = await this.configManager.getExportOptions();
    const opts = { ...config, ...options };

    console.log(`\n📚 批量导出 ${docIds.length} 个文档`);
    console.log(`📁 输出目录: ${outputDir}`);
    console.log(`⚡ 并发数: ${opts.concurrency}`);
    if (opts.incrementalMode) {
      console.log(`🔄 增量模式: 已启用`);
    }
    console.log('');

    // 初始化状态管理器
    const stateManager = new StateManager(outputDir);
    this.stateManager = stateManager;

    // 创建并发限制器
    const limit = pLimit(opts.concurrency);
    const results: ExportResult[] = [];
    let completed = 0;

    // 创建所有任务
    const tasks = docIds.map((docId) =>
      limit(async () => {
        const result = await this.exportDocument(docId, outputDir, opts);
        completed++;

        // 调用进度回调
        if (options.onProgress) {
          options.onProgress(completed, docIds.length, docId);
        }

        return result;
      })
    );

    // 等待所有任务完成
    const taskResults = await Promise.all(tasks);
    results.push(...taskResults);

    // 统计结果
    const success = results.filter((r) => r.success && !r.skipped).length;
    const skipped = results.filter((r) => r.skipped).length;
    const failed = results.filter((r) => !r.success).length;

    console.log(`\n📊 批量导出完成:`);
    console.log(`  ✅ 成功: ${success}`);
    if (skipped > 0) {
      console.log(`  ⏭️  跳过: ${skipped}`);
    }
    if (failed > 0) {
      console.log(`  ❌ 失败: ${failed}`);
    }

    return results;
  }

  /**
   * 下载图片
   */
  private async downloadImages(document: ParsedDocument, outputDir: string): Promise<void> {
    const imagesDir = path.join(outputDir, 'images');
    await fs.mkdir(imagesDir, { recursive: true });

    for (const image of document.images) {
      try {
        const imageName = this.extractImageName(image.url);
        const imagePath = path.join(imagesDir, imageName);
        const buffer = await this.api.downloadImage(image.url);
        await fs.writeFile(imagePath, buffer);
      } catch {
        console.warn(`    ⚠️  图片下载失败: ${image.url}`);
      }
    }
  }

  /**
   * 从 URL 中提取图片名称
   */
  private extractImageName(url: string): string {
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];

    // 如果没有扩展名，添加默认扩展名
    if (!path.extname(fileName)) {
      return `${fileName}.png`;
    }

    return fileName;
  }

  /**
   * 清理文件名（移除不合法字符）
   */
  private sanitizeFileName(fileName: string): string {
    // 移除或替换不合法的文件名字符
    return fileName
      .replace(/[<>:"/\\|?*]/g, '') // 移除 Windows 不允许的字符
      .replace(/\s+/g, '_') // 空格替换为下划线
      .substring(0, 200); // 限制长度
  }
}
