/**
 * export 命令 - 导出单个文档
 */
import { Command } from 'commander';
import { ExportService } from '../../core/ExportService.js';

export const exportCommand = new Command('export')
  .description('导出单个文档')
  .option('-d, --doc <id>', '文档 ID')
  .option('-w, --wiki <id>', '知识库文档 ID')
  .option('-o, --output <dir>', '输出目录', './output')
  .action(async (options) => {
    const docId = options.doc || options.wiki;

    if (!docId) {
      console.error('❌ 请指定文档 ID (--doc 或 --wiki)');
      console.error('   示例: dingding-export export -d 123456');
      process.exit(1);
    }

    const service = new ExportService();
    const result = await service.exportDocument(docId, options.output);

    if (!result.success) {
      console.error(`\n❌ 导出失败: ${result.error}`);
      process.exit(1);
    }

    console.log('\n✅ 完成！');
  });
