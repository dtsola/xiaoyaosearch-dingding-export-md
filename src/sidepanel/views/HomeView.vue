<template>
  <div class="home-view">
    <!-- 欢迎卡片 -->
    <div class="welcome-card">
      <div class="icon-wrapper">
        <span class="icon">📄</span>
      </div>
      <h2 class="welcome-title">小遥搜索钉钉导出工具</h2>
      <p class="welcome-description">
        一键导出钉钉文档和知识库为 Markdown 格式
      </p>
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <BaseButton
        class="action-button"
        variant="primary"
        :loading="loading"
        :disabled="!hasPageInfo"
        @click="loadDocList"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2v6h6M14 8A6 6 0 1 1 5.34 3.34"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        刷新文档列表
      </BaseButton>
      <BaseButton class="action-button" variant="secondary" @click="showSettings = true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2v4M8 10v4M2 8h4M10 8h4M3.5 3.5l2.8 2.8M9.7 9.7l2.8 2.8M3.5 12.5l2.8-2.8M9.7 6.3l2.8-2.8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        导出设置
      </BaseButton>
    </div>

    <!-- 文档树 -->
    <div v-if="hasPageInfo || docTree.length > 0" class="doc-section">
      <div class="section-header">
        <h3 class="section-title">文档列表</h3>
        <BaseButton
          v-if="selectedCount > 0"
          variant="primary"
          size="sm"
          @click="startExport"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v10M4 8l4 4 4-4M2 14h12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          导出 ({{ selectedCount }})
        </BaseButton>
      </div>

      <DocTree
        ref="docTreeRef"
        :items="docTree"
        :has-more="hasMore"
        :loading="loading"
        @load-more="loadMore"
        @selection-change="handleSelectionChange"
      />
    </div>

    <!-- 空状态提示 -->
    <div v-else class="empty-state">
      <span class="empty-icon">📭</span>
      <p class="empty-text">
        {{ hasPageInfo ? '点击"刷新文档列表"加载文档' : '请在钉钉文档页面使用本工具' }}
      </p>
    </div>

    <!-- 导出进度 -->
    <ExportProgress
      :tasks="exportQueue"
      @retry="handleRetry"
      @remove="handleRemove"
      @download="handleDownload"
      @download-all="handleDownloadAll"
      @clear-completed="handleClearCompleted"
    />

    <!-- 设置弹窗 -->
    <SettingsModal :visible="showSettings" @close="showSettings = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePageStore } from '@/sidepanel/stores/page';
import { useConfigStore } from '@/sidepanel/stores/config';
import { useExportManager } from '@/sidepanel/composables/useDingTalkAPI';
import { useDingTalkAPI } from '@/sidepanel/composables/useDingTalkAPI';
import { useToast } from '@/sidepanel/composables/useToast';
import BaseButton from '@/sidepanel/components/common/BaseButton.vue';
import DocTree from '@/sidepanel/components/DocTree/index.vue';
import ExportProgress from '@/sidepanel/components/ExportProgress/index.vue';
import SettingsModal from '@/sidepanel/components/SettingsModal/index.vue';
import type { ApiDentryItem } from '@/sidepanel/api/types';

const pageStore = usePageStore();
const configStore = useConfigStore();
const toast = useToast();
const { getDocList } = useDingTalkAPI();
const {
  queue: exportQueue,
  isExporting,
  stats,
  addTask,
  retryTask,
  removeTask,
  clearCompleted,
  downloadTask,
} = useExportManager(configStore.concurrentLimit);

// UI 状态
const showSettings = ref(false);
const docTreeRef = ref<InstanceType<typeof DocTree> | null>(null);
const selectedItems = ref<ApiDentryItem[]>([]);
const docTree = ref<ApiDentryItem[]>([]);
const hasMore = ref(false);
const loading = ref(false);
const loadMoreId = ref('');

// 计算属性
const currentPage = computed(() => pageStore.currentPage);
const hasPageInfo = computed(() => currentPage.value !== null);
const selectedCount = computed(() => selectedItems.value.length);
const exportStats = computed(() => stats.value);

// 页面信息名称
const pageTypeName = computed(() => {
  if (!currentPage.value) return '';

  const typeMap: Record<string, string> = {
    my_space: '我的空间',
    space: '知识空间',
    document: '文档/目录',
    unknown: '未知',
  };

  return typeMap[currentPage.value.type] || currentPage.value.type;
});

// 加载文档列表
async function loadDocList() {
  if (!currentPage.value || loading.value) return;

  loading.value = true;

  try {
    const dentryUuid = currentPage.value.docId || 'root';
    const result = await getDocList(dentryUuid, loadMoreId.value);

    // 转换为树形结构
    if (loadMoreId.value) {
      // 追加数据
      docTree.value.push(...result.children);
    } else {
      docTree.value = result.children;
    }

    hasMore.value = result.hasMore;
    loadMoreId.value = result.loadMoreId || '';

    // 显示成功提示
    toast.success(`加载了 ${result.children.length} 个文档`);
  } catch (error) {
    console.error('加载文档列表失败:', error);
    toast.error('加载文档列表失败，请确保在钉钉文档页面使用');
  } finally {
    loading.value = false;
  }
}

// 加载更多
function loadMore() {
  loadDocList();
}

// 处理选中变化
function handleSelectionChange(selected: Set<string>) {
  if (!docTreeRef.value) return;

  selectedItems.value = docTreeRef.value.getSelectedItems();
}

// 开始导出
function startExport() {
  if (selectedItems.value.length === 0) return;

  for (const item of selectedItems.value) {
    // 获取导出格式
    const format = configStore.getFormat(item.dentryType as any);
    addTask(item, format);
  }

  // 显示提示
  toast.success(`开始导出 ${selectedItems.value.length} 个文档`);

  // 清空选中状态
  selectedItems.value = [];
  docTreeRef.value?.unselectAll();
}

// 处理重试
function handleRetry(id: string) {
  retryTask(id);
  toast.info('重新开始导出');
}

// 处理移除
function handleRemove(id: string) {
  removeTask(id);
}

// 处理下载
function handleDownload(id: string) {
  const task = exportQueue.value.find((t) => t.id === id);
  if (task) {
    downloadTask(task);
    toast.success('开始下载');
  }
}

// 下载全部
function handleDownloadAll() {
  const successCount = exportQueue.value.filter((t) => t.status === 'success').length;
  for (const task of exportQueue.value) {
    if (task.status === 'success') {
      downloadTask(task);
    }
  }
  toast.success(`开始下载 ${successCount} 个文件`);
}

// 清除已完成
function handleClearCompleted() {
  clearCompleted();
  toast.info('已清除已完成的任务');
}

// 组件挂载时获取页面信息
onMounted(async () => {
  // 向 content script 请求页面信息
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: 'GET_PAGE_INFO' },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log('[小遥搜索] 无法获取页面信息:', chrome.runtime.lastError.message);
            return;
          }
          if (response?.pageInfo) {
            pageStore.setCurrentPage(response.pageInfo);
            // 自动加载文档列表
            loadDocList();
          }
        }
      );
    }
  });
});
</script>

<style scoped>
.home-view {
  padding: var(--spacing-4);
  height: 100%;
  overflow-y: auto;
}

.welcome-card {
  text-align: center;
  padding: var(--spacing-6) var(--spacing-5);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  border-radius: var(--radius-lg);
  color: white;
  margin-bottom: var(--spacing-4);
  box-shadow: var(--shadow-md);
}

.icon-wrapper {
  margin-bottom: var(--spacing-3);
}

.icon {
  font-size: 40px;
}

.welcome-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin: 0 0 var(--spacing-2) 0;
}

.welcome-description {
  font-size: var(--text-sm);
  opacity: 0.9;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.action-button {
  flex: 1;
}

.doc-section {
  display: flex;
  flex-direction: column;
  height: calc(100% - 200px);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-2) var(--spacing-1);
  margin-bottom: var(--spacing-2);
}

.section-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-12) var(--spacing-6);
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-3);
}

.empty-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
