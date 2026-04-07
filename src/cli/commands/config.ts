/**
 * config 命令 - 配置管理
 */
import { Command } from 'commander';
import { ConfigManager } from '../../core/ConfigManager.js';
import path from 'path';
import os from 'os';

export const configCommand = new Command('config')
  .description('配置管理')
  .option('-l, --list', '列出所有配置')
  .option('-s, --set <key=value>', '设置配置项')
  .option('-g, --get <key>', '获取配置项')
  .option('--use-profile <name>', '切换配置文件')
  .option('--show-path', '显示配置文件路径')
  .action(async (options) => {
    const configManager = new ConfigManager();

    // 显示配置文件路径
    if (options.showPath) {
      const configPath = path.join(os.homedir(), '.dingding-export', 'config.json');
      console.log(`📁 配置文件路径: ${configPath}`);
      return;
    }

    // 列出所有配置
    if (options.list) {
      await listConfigs(configManager);
      return;
    }

    // 获取配置项
    if (options.get) {
      await getConfig(configManager, options.get);
      return;
    }

    // 设置配置项
    if (options.set) {
      await setConfig(configManager, options.set);
      return;
    }

    // 切换配置文件
    if (options.useProfile) {
      await switchProfile(configManager, options.useProfile);
      return;
    }

    // 默认显示当前配置
    await showCurrentConfig(configManager);
  });

/**
 * 列出所有配置
 */
async function listConfigs(configManager: ConfigManager): Promise<void> {
  const config = await configManager.load();

  console.log('\n📋 所有配置文件:\n');

  for (const [name] of Object.entries(config.profiles)) {
    const isCurrent = name === config.currentProfile;
    const prefix = isCurrent ? '→ *' : '  -';
    console.log(`${prefix} ${name}`);
  }

  console.log(`\n当前配置文件: ${config.currentProfile}`);
}

/**
 * 获取配置项
 */
async function getConfig(configManager: ConfigManager, key: string): Promise<void> {
  const profile = await configManager.getProfile();

  // 支持嵌套路径，如 outputDir 或 downloadImages
  const value = (profile as any)[key];

  if (value === undefined) {
    console.log(`❌ 配置项不存在: ${key}`);
    console.log('   可用的配置项:');
    console.log('   - outputDir: 输出目录');
    console.log('   - concurrency: 并发数量');
    console.log('   - downloadImages: 是否下载图片');
    console.log('   - downloadAssets: 是否下载附件');
    console.log('   - incrementalMode: 是否启用增量模式');
  } else {
    console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
  }
}

/**
 * 设置配置项
 */
async function setConfig(configManager: ConfigManager, keyValue: string): Promise<void> {
  const [key, ...valueParts] = keyValue.split('=');
  const value = valueParts.join('=');

  if (!value) {
    console.error('❌ 格式错误，应为: key=value');
    console.error('   示例: dingding-export config --set outputDir=./my-output');
    process.exit(1);
  }

  const config = await configManager.load();
  const profileName = config.currentProfile;
  const profile = config.profiles[profileName];

  // 解析值类型
  let parsedValue: any = value;
  if (value === 'true') {
    parsedValue = true;
  } else if (value === 'false') {
    parsedValue = false;
  } else if (!isNaN(Number(value))) {
    parsedValue = Number(value);
  }

  // 更新配置
  (profile as any)[key] = parsedValue;

  // 保存配置
  await configManager.save(config);

  console.log(`✅ 配置已更新: ${key} = ${parsedValue}`);
}

/**
 * 切换配置文件
 */
async function switchProfile(configManager: ConfigManager, profileName: string): Promise<void> {
  const config = await configManager.load();

  if (!config.profiles[profileName]) {
    console.error(`❌ 配置文件不存在: ${profileName}`);
    console.log('   可用的配置文件:', Object.keys(config.profiles).join(', '));
    process.exit(1);
  }

  config.currentProfile = profileName;
  await configManager.save(config);

  console.log(`✅ 已切换到配置文件: ${profileName}`);
}

/**
 * 显示当前配置
 */
async function showCurrentConfig(configManager: ConfigManager): Promise<void> {
  const config = await configManager.load();
  const profile = await configManager.getProfile();

  console.log('\n⚙️  当前配置:\n');
  console.log(`配置文件: ${config.currentProfile}`);
  console.log(`输出目录: ${profile.outputDir}`);
  console.log(`并发数量: ${profile.concurrency}`);
  console.log(`下载图片: ${profile.downloadImages}`);
  console.log(`下载附件: ${profile.downloadAssets}`);
  console.log(`增量模式: ${profile.incrementalMode}`);
  console.log('');
}
