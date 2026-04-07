/**
 * docs 命令 - 批量导出文档
 */
import { Command } from 'commander';
import { ExportService } from '../../core/ExportService.js';
import fs from 'fs/promises';

export const docsCommand = new Command('docs')
  .description('批量导出文档')
  .option('--file <path>', '文档 ID 列表文件（每行一个 ID）')
  .option('--ids <list>', '逗号分隔的文档 ID')
  .option('-o, --output <dir>', '输出目录', './output')
  .option('-c, --concurrency <n>', '并发数量', '5')
  .action(async (options) => {
    const service = new ExportService();

    // 获取文档 ID 列表
    let docIds: string[] = [];

    if (options.file) {
      // 从文件读取
      try {
        const content = await fs.readFile(options.file, 'utf-8');
        docIds = content
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean);
      } catch {
        console.error(`❌ 无法读取文件: ${options.file}`);
        process.exit(1);
      }
    } else if (options.ids) {
      // 从命令行参数读取
      docIds = options.ids.split(',').map((id: string) => id.trim());
    } else {
      console.error('❌ 请指定 --file 或 --ids 参数');
      console.error('   示例: dingding-export docs --ids 123,456,789');
      console.error('        dingding-export docs --file ids.txt');
      process.exit(1);
    }

    if (docIds.length === 0) {
      console.error('❌ 没有找到要导出的文档 ID');
      process.exit(1);
    }

    console.log(`📚 准备导出 ${docIds.length} 个文档...\n`);

    const results = await service.exportDocuments(docIds, options.output, {
      concurrency: parseInt(options.concurrency),
    });

    const success = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    console.log(`\n📊 批量导出完成:`);
    console.log(`  ✅ 成功: ${success}`);
    console.log(`  ❌ 失败: ${failed}`);

    if (failed > 0) {
      console.log('\n失败的文档:');
      results
        .filter((r) => !r.success)
        .forEach((r, i) => {
          console.log(`  ${i + 1}. ${r.error}`);
        });
      process.exit(1);
    }
  });
