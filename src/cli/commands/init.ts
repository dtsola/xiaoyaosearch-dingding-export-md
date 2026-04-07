/**
 * init 命令 - 初始化配置
 */
import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import os from 'os';
import fs from 'fs/promises';

export const initCommand = new Command('init')
  .description('初始化配置')
  .option('-p, --profile <name>', '配置文件名称', 'default')
  .action(async (options) => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'outputDir',
        message: '请输入默认输出目录:',
        default: './output',
      },
      {
        type: 'number',
        name: 'concurrency',
        message: '请设置并发数量:',
        default: 5,
      },
      {
        type: 'confirm',
        name: 'downloadImages',
        message: '是否自动下载图片?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'downloadAssets',
        message: '是否下载其他资源（附件等）?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'incrementalMode',
        message: '是否启用增量导出模式?',
        default: false,
      },
    ]);

    // 保存配置
    const configDir = path.join(os.homedir(), '.dingding-export');
    await fs.mkdir(configDir, { recursive: true });

    const configFile = path.join(configDir, 'config.json');
    let config: any = {};

    // 尝试读取现有配置
    try {
      const content = await fs.readFile(configFile, 'utf-8');
      config = JSON.parse(content);
    } catch {
      // 配置文件不存在，使用默认结构
      config = { profiles: {}, currentProfile: 'default' };
    }

    // 更新配置
    config.profiles = config.profiles || {};
    config.profiles[options.profile] = answers;
    config.currentProfile = options.profile;

    await fs.writeFile(configFile, JSON.stringify(config, null, 2));
    console.log(`✅ 配置已保存到: ${configFile}`);
    console.log(`✅ 当前配置文件: ${options.profile}`);
  });
