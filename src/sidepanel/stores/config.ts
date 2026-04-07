import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { ExportConfig, ExportFormat } from '@/shared/types';

const STORAGE_KEY = 'dingtalk-export:config';

export const useConfigStore = defineStore('config', () => {
  // 导出格式配置
  const exportFormats = ref<ExportConfig>({
    adoc: 'md',      // 文档导出格式
    axls: 'xlsx',    // 表格导出格式
    adraw: 'jpg',    // 白板导出格式
    amind: 'jpg',    // 脑图导出格式
  });

  // 主题设置
  const theme = ref<'light' | 'dark' | 'auto'>('auto');

  // 自动关闭侧边栏
  const autoClose = ref(false);

  // 并发导出数量限制
  const concurrentLimit = ref(3);

  /**
   * 获取指定文件类型的导出格式
   */
  function getFormat(fileType: keyof ExportConfig): ExportFormat {
    return exportFormats.value[fileType] || 'md';
  }

  /**
   * 设置指定文件类型的导出格式
   */
  function setFormat(fileType: keyof ExportConfig, format: ExportFormat): void {
    exportFormats.value[fileType] = format;
    saveConfig();
  }

  /**
   * 保存配置到 localStorage
   */
  function saveConfig(): void {
    const config = {
      exportFormats: exportFormats.value,
      theme: theme.value,
      autoClose: autoClose.value,
      concurrentLimit: concurrentLimit.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  /**
   * 从 localStorage 加载配置
   */
  function loadConfig(): void {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const config = JSON.parse(saved);
        exportFormats.value = { ...exportFormats.value, ...config.exportFormats };
        theme.value = config.theme || theme.value;
        autoClose.value = config.autoClose ?? autoClose.value;
        concurrentLimit.value = config.concurrentLimit || concurrentLimit.value;
      } catch (e) {
        console.error('[配置] 加载配置失败:', e);
      }
    }
  }

  /**
   * 重置配置为默认值
   */
  function resetConfig(): void {
    exportFormats.value = {
      adoc: 'md',
      axls: 'xlsx',
      adraw: 'jpg',
      amind: 'jpg',
    };
    theme.value = 'auto';
    autoClose.value = false;
    concurrentLimit.value = 3;
    saveConfig();
  }

  // 监听配置变化自动保存
  watch(
    [exportFormats, theme, autoClose, concurrentLimit],
    () => saveConfig(),
    { deep: true }
  );

  // 初始化时加载配置
  loadConfig();

  return {
    exportFormats,
    theme,
    autoClose,
    concurrentLimit,
    getFormat,
    setFormat,
    saveConfig,
    loadConfig,
    resetConfig,
  };
});
