/**
 * wiki 命令 - 导出知识库
 */
import { Command } from 'commander';
import { DingTalkWikiAPI } from '../../api/DingTalkWikiAPI.js';
import { ExportService } from '../../core/ExportService.js';
import type { WikiNode } from '../../types/wiki.js';
import fs from 'fs/promises';
import path from 'path';
import cliProgress from 'cli-progress';

export const wikiCommand = new Command('wiki')
  .description('导出知识库')
  .argument('<wikiId>', '知识库 ID')
  .option('-o, --output <dir>', '输出目录', './output')
  .option('--depth <n>', '递归深度', '10')
  .option('--flat', '扁平导出（不保留目录结构）', false)
  .option('-c, --concurrency <n>', '并发数量', '5')
  .action(async (wikiId, options) => {
    console.log(`📖 导出知识库: ${wikiId}`);
    console.log(`📁 输出目录: ${options.output}`);
    console.log(`📊 递归深度: ${options.depth}`);
    console.log(`📂 导出模式: ${options.flat ? '扁平' : '保留结构'}\n`);

    const wikiAPI = new DingTalkWikiAPI();
    const exportService = new ExportService(options.output);

    try {
      // 1. 获取知识库结构
      console.log('🔍 获取知识库结构...');
      const tree = await wikiAPI.getWikiTree(wikiId, parseInt(options.depth));
      console.log(`✅ 找到 ${countNodes(tree)} 个节点\n`);

      // 2. 提取文档 ID
      const docIds = wikiAPI.extractDocIds(tree);
      console.log(`📄 准备导出 ${docIds.length} 个文档\n`);

      if (docIds.length === 0) {
        console.log('⚠️  知识库中没有可导出的文档');
        return;
      }

      // 3. 创建进度条
      const progressBar = new cliProgress.SingleBar(
        {
          format: '导出进度 |{bar}| {percentage}% | {value}/{total} 文档',
        },
        cliProgress.Presets.shades_classic
      );

      progressBar.start(docIds.length, 0);

      // 4. 导出文档
      const results = await exportService.exportDocuments(docIds, options.output, {
        concurrency: parseInt(options.concurrency),
        onProgress: (current) => {
          progressBar.update(current);
        },
      });

      progressBar.stop();

      // 5. 如果需要保留结构，创建目录
      if (!options.flat) {
        console.log('\n📂 创建目录结构...');
        await createDirectoryStructure(tree, options.output);
      }

      // 6. 统计结果
      const success = results.filter((r) => r.success && !r.skipped).length;
      const skipped = results.filter((r) => r.skipped).length;
      const failed = results.filter((r) => !r.success).length;

      console.log(`\n📊 知识库导出完成:`);
      console.log(`  ✅ 成功: ${success}`);
      if (skipped > 0) {
        console.log(`  ⏭️  跳过: ${skipped}`);
      }
      if (failed > 0) {
        console.log(`  ❌ 失败: ${failed}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`\n❌ 知识库导出失败: ${errorMessage}`);
      process.exit(1);
    }
  });

/**
 * 统计节点数量
 */
function countNodes(nodes: WikiNode[]): number {
  let count = 0;

  for (const node of nodes) {
    count++;
    if (node.children) {
      count += countNodes(node.children);
    }
  }

  return count;
}

/**
 * 根据知识库结构创建目录
 */
async function createDirectoryStructure(nodes: WikiNode[], basePath: string): Promise<void> {
  for (const node of nodes) {
    const nodePath = path.join(basePath, sanitizeName(node.name));

    if (node.type === 'folder') {
      // 创建文件夹
      await fs.mkdir(nodePath, { recursive: true });

      // 递归处理子节点
      if (node.children) {
        await createDirectoryStructure(node.children, nodePath);
      }
    }
  }
}

/**
 * 清理名称（用于文件/目录名）
 */
function sanitizeName(name: string): string {
  return name
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 100);
}
