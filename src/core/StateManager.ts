/**
 * 状态管理器
 * 用于记录导出历史，实现增量导出
 */
import fs from 'fs/promises';
import path from 'path';

/**
 * 导出记录
 */
export interface ExportRecord {
  /** 文档 ID */
  docId: string;
  /** 导出时间戳 */
  exportedAt: string;
  /** 文档标题 */
  title?: string;
  /** 文档最后修改时间 */
  lastModified?: string;
  /** 输出文件路径 */
  outputPath?: string;
}

/**
 * 状态数据
 */
export interface StateData {
  /** 导出记录映射 (docId -> record) */
  records: Record<string, ExportRecord>;
  /** 最后更新时间 */
  lastUpdate: string;
}

/**
 * 状态管理器
 */
export class StateManager {
  private statePath: string;

  constructor(outputDir: string) {
    this.statePath = path.join(outputDir, '.dingding-export-state.json');
  }

  /**
   * 加载状态
   */
  async loadState(): Promise<StateData> {
    try {
      const content = await fs.readFile(this.statePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      // 状态文件不存在，返回空状态
      return {
        records: {},
        lastUpdate: new Date().toISOString(),
      };
    }
  }

  /**
   * 保存状态
   */
  async saveState(state: StateData): Promise<void> {
    state.lastUpdate = new Date().toISOString();
    await fs.writeFile(this.statePath, JSON.stringify(state, null, 2));
  }

  /**
   * 判断是否应该导出（增量模式）
   */
  async shouldExport(docId: string, lastModified?: string): Promise<boolean> {
    const state = await this.loadState();
    const record = state.records[docId];

    // 如果没有导出记录，应该导出
    if (!record) {
      return true;
    }

    // 如果没有提供最后修改时间，认为需要重新导出
    if (!lastModified) {
      return true;
    }

    // 比较修改时间
    return lastModified > record.exportedAt;
  }

  /**
   * 标记文档已导出
   */
  async markExported(docId: string, title?: string, lastModified?: string, outputPath?: string): Promise<void> {
    const state = await this.loadState();

    state.records[docId] = {
      docId,
      exportedAt: new Date().toISOString(),
      title,
      lastModified,
      outputPath,
    };

    await this.saveState(state);
  }

  /**
   * 获取所有导出记录
   */
  async getRecords(): Promise<ExportRecord[]> {
    const state = await this.loadState();
    return Object.values(state.records);
  }

  /**
   * 获取指定文档的导出记录
   */
  async getRecord(docId: string): Promise<ExportRecord | null> {
    const state = await this.loadState();
    return state.records[docId] || null;
  }

  /**
   * 清除状态（重置增量导出）
   */
  async clearState(): Promise<void> {
    const emptyState: StateData = {
      records: {},
      lastUpdate: new Date().toISOString(),
    };
    await this.saveState(emptyState);
  }

  /**
   * 删除指定文档的记录
   */
  async removeRecord(docId: string): Promise<void> {
    const state = await this.loadState();
    delete state.records[docId];
    await this.saveState(state);
  }
}
