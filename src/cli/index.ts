#!/usr/bin/env node
/**
 * CLI 主入口
 * 将钉钉文档/知识库导出为 Markdown 格式
 */
import { Command } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态导入 package.json
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = await import(`file://${packageJsonPath}`, { with: { type: 'json' } }).then((m) => m.default);

const program = new Command();

program.name('dingding-export').description('将钉钉文档/知识库导出为 Markdown 格式').version(packageJson.version);

// 导入命令
const { initCommand } = await import('./commands/init.js');
const { exportCommand } = await import('./commands/export.js');
const { docsCommand } = await import('./commands/docs.js');
const { wikiCommand } = await import('./commands/wiki.js');
const { configCommand } = await import('./commands/config.js');

program.addCommand(initCommand);
program.addCommand(exportCommand);
program.addCommand(docsCommand);
program.addCommand(wikiCommand);
program.addCommand(configCommand);

program.parse();
