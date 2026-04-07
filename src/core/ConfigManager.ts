/**
 * 配置管理器
 * 负责加载、保存和管理用户配置
 */
import { cosmiconfig } from 'cosmiconfig';
import path from 'path';
import os from 'os';
import fs from 'fs/promises';
import type { Config, ConfigProfile, ExportOptions } from '../types/config.js';

export class ConfigManager {
  private configDir: string;
  private explorer: ReturnType<typeof cosmiconfig>;

  constructor() {
    this.configDir = path.join(os.homedir(), '.dingding-export');
    this.explorer = cosmiconfig('dingding-export', {
      searchPlaces: ['.dingding-exportrc', '.dingding-exportrc.json', 'package.json'],
    });
  }

  /**
   * 加载配置文件
   */
  async load(): Promise<Config> {
    const result = await this.explorer.search();
    return result?.config || this.getDefaultConfig();
  }

  /**
   * 获取指定配置文件
   */
  async getProfile(name?: string): Promise<ConfigProfile> {
    const config = await this.load();
    const profileName = name || config.currentProfile;
    return config.profiles[profileName] || config.profiles.default;
  }

  /**
   * 获取导出选项
   */
  async getExportOptions(profileName?: string): Promise<ExportOptions> {
    const profile = await this.getProfile(profileName);
    return {
      outputDir: profile.outputDir,
      concurrency: profile.concurrency,
      downloadImages: profile.downloadImages,
      downloadAssets: profile.downloadAssets,
      incrementalMode: profile.incrementalMode,
    };
  }

  /**
   * 保存配置文件
   */
  async save(config: Config): Promise<void> {
    await fs.mkdir(this.configDir, { recursive: true });
    const configFile = path.join(this.configDir, 'config.json');
    await fs.writeFile(configFile, JSON.stringify(config, null, 2));
  }

  /**
   * 获取默认配置
   */
  private getDefaultConfig(): Config {
    return {
      profiles: {
        default: {
          outputDir: './output',
          concurrency: 5,
          downloadImages: true,
          downloadAssets: true,
          incrementalMode: false,
        },
      },
      currentProfile: 'default',
    };
  }
}
