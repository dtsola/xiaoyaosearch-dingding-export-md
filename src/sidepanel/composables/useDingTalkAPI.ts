/**
 * 钉钉 API Composable
 */

import { ref, computed } from 'vue';
import { DingTalkAPI } from '../api/dingtalk';
import type { ApiDentryItem, ExportProgressCallback } from '../api/types';
import type { DentryItem, ExportFormat } from '@/shared/types';

/**
 * 导出任务状态
 */
export interface ExportTask {
  id: string;
  item: ApiDentryItem;
  status: 'pending' | 'exporting' | 'success' | 'failed';
  progress: number;
  error?: string;
  downloadUrl?: string;
  filename?: string;
}

/**
 * 钉钉 API Composable
 */
export function useDingTalkAPI() {
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const api = ref<DingTalkAPI | null>(null);

  // 初始化 API 实例
  function initAPI() {
    if (!api.value) {
      api.value = new DingTalkAPI();
    }
    return api.value;
  }

  /**
   * 获取文档列表
   */
  async function getDocList(dentryUuid: string, loadMoreId = '') {
    loading.value = true;
    error.value = null;

    try {
      const client = initAPI();
      const result = await client.getDocList(dentryUuid, loadMoreId);
      return result;
    } catch (e) {
      error.value = e as Error;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  /**
   * 获取文档信息
   */
  async function getDocInfo(dentryUuid: string) {
    loading.value = true;
    error.value = null;

    try {
      const client = initAPI();
      const result = await client.getDocInfo(dentryUuid);
      return result;
    } catch (e) {
      error.value = e as Error;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  /**
   * 导出单个文档
   */
  async function exportDocument(
    item: ApiDentryItem,
    format: ExportFormat,
    onProgress?: ExportProgressCallback
  ): Promise<string> {
    const client = initAPI();

    // 获取文档 Key 和 Dentry Key
    const docKey = item.docKey || '';
    const dentryKey = item.dentryKey || '';
    const contentType = item.contentType || '';
    const name = item.dentryName;
    const size = item.size || 0;
    const dentryUuid = item.dentryUuid;

    return client.exportDocument(
      dentryUuid,
      docKey,
      dentryKey,
      contentType,
      name,
      size,
      format,
      onProgress
    );
  }

  return {
    loading,
    error,
    getDocList,
    getDocInfo,
    exportDocument,
  };
}

/**
 * 导出管理器 Composable
 */
export function useExportManager(concurrentLimit = 3) {
  const queue = ref<ExportTask[]>([]);
  const isExporting = computed(() => queue.value.some((t) => t.status === 'exporting'));
  const { exportDocument } = useDingTalkAPI();

  /**
   * 添加导出任务
   */
  function addTask(item: ApiDentryItem, format: ExportFormat): ExportTask {
    const task: ExportTask = {
      id: `${item.dentryUuid}_${Date.now()}`,
      item,
      status: 'pending',
      progress: 0,
      filename: generateFilename(item, format),
    };

    queue.value.push(task);
    processQueue();

    return task;
  }

  /**
   * 生成导出文件名
   */
  function generateFilename(item: ApiDentryItem, format: ExportFormat): string {
    const name = item.dentryName;
    const extMap: Record<ExportFormat, string> = {
      md: 'md',
      docx: 'docx',
      pdf: 'pdf',
      xlsx: 'xlsx',
      jpg: 'jpg',
    };

    // 如果文件名已有扩展名，先移除
    const baseName = name.replace(/\.[^/.]+$/, '');
    return `${baseName}.${extMap[format]}`;
  }

  /**
   * 处理导出队列
   */
  async function processQueue(): Promise<void> {
    const pendingTasks = queue.value.filter((t) => t.status === 'pending');
    const runningTasks = queue.value.filter((t) => t.status === 'exporting');

    if (runningTasks.length >= concurrentLimit) {
      return;
    }

    const tasksToStart = pendingTasks.slice(0, concurrentLimit - runningTasks.length);

    for (const task of tasksToStart) {
      exportTask(task);
    }
  }

  /**
   * 执行单个导出任务
   */
  async function exportTask(task: ExportTask): Promise<void> {
    task.status = 'exporting';

    try {
      const url = await exportDocument(task.item, 'md', (progress, status) => {
        task.progress = progress;
      });

      task.status = 'success';
      task.progress = 100;
      task.downloadUrl = url;
    } catch (e) {
      task.status = 'failed';
      task.error = (e as Error).message;
    }

    // 继续处理队列
    processQueue();
  }

  /**
   * 重试失败的任务
   */
  function retryTask(taskId: string): void {
    const task = queue.value.find((t) => t.id === taskId);
    if (task && task.status === 'failed') {
      task.status = 'pending';
      task.progress = 0;
      task.error = undefined;
      processQueue();
    }
  }

  /**
   * 移除任务
   */
  function removeTask(taskId: string): void {
    const index = queue.value.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      queue.value.splice(index, 1);
    }
  }

  /**
   * 清空已完成的任务
   */
  function clearCompleted(): void {
    queue.value = queue.value.filter((t) => t.status !== 'success');
  }

  /**
   * 清空所有任务
   */
  function clearAll(): void {
    queue.value = [];
  }

  /**
   * 下载已完成的任务
   */
  function downloadTask(task: ExportTask): void {
    if (task.status === 'success' && task.downloadUrl && task.filename) {
      const a = document.createElement('a');
      a.href = task.downloadUrl;
      a.download = task.filename;
      a.click();
    }
  }

  /**
   * 获取统计信息
   */
  const stats = computed(() => {
    const total = queue.value.length;
    const success = queue.value.filter((t) => t.status === 'success').length;
    const failed = queue.value.filter((t) => t.status === 'failed').length;
    const pending = queue.value.filter((t) => t.status === 'pending').length;
    const exporting = queue.value.filter((t) => t.status === 'exporting').length;

    return { total, success, failed, pending, exporting };
  });

  return {
    queue,
    isExporting,
    stats,
    addTask,
    retryTask,
    removeTask,
    clearCompleted,
    clearAll,
    downloadTask,
  };
}
