<template>
  <div class="doc-tree">
    <!-- 工具栏 -->
    <div class="doc-tree-toolbar">
      <div class="toolbar-left">
        <button class="toolbar-btn" @click="selectAll" :disabled="isEmpty">
          全选
        </button>
        <button class="toolbar-btn" @click="unselectAll" :disabled="isEmpty">
          取消
        </button>
      </div>
      <div class="toolbar-right">
        <span class="selection-count">
          {{ selectedCount }} / {{ totalCount }}
        </span>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="isEmpty && !loading" class="empty-state">
      <span class="empty-icon">📭</span>
      <p class="empty-text">暂无文档</p>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <LoadingSpinner message="正在加载文档..." />
    </div>

    <!-- 文档树 -->
    <div v-else class="doc-tree-content" :class="{ 'has-selection': selectedCount > 0 }">
      <DocTreeItem
        v-for="item in items"
        :key="item.dentryUuid"
        :item="item"
        :selected-uuids="selectedUuids"
        :expanded-uuids="expandedUuids"
        @toggle-select="handleToggleSelect"
        @toggle-expand="handleToggleExpand"
      />
    </div>

    <!-- 加载更多 -->
    <div v-if="hasMore && !loading" class="load-more">
      <button class="load-more-btn" @click="$emit('loadMore')">
        加载更多
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DocTreeItem from './DocTreeItem.vue';
import LoadingSpinner from '../layout/LoadingSpinner.vue';
import type { ApiDentryItem } from '@/sidepanel/api/types';

interface Props {
  items: ApiDentryItem[];
  hasMore?: boolean;
  loading?: boolean;
}

interface Emits {
  (e: 'loadMore'): void;
  (e: 'selectionChange', selected: Set<string>): void;
}

const props = withDefaults(defineProps<Props>(), {
  hasMore: false,
  loading: false,
});

const emit = defineEmits<Emits>();

// 选中的 UUID 集合
const selectedUuids = ref<Set<string>>(new Set());

// 展开的 UUID 集合
const expandedUuids = ref<Set<string>>(new Set());

// 总数量
const totalCount = computed(() => countItems(props.items));

// 选中数量
const selectedCount = computed(() => selectedUuids.value.size);

// 是否为空
const isEmpty = computed(() => props.items.length === 0);

/**
 * 递归计算项目数量
 */
function countItems(items: ApiDentryItem[]): number {
  let count = 0;
  for (const item of items) {
    count += 1;
    if (item.children) {
      count += countItems(item.children);
    }
  }
  return count;
}

/**
 * 全选
 */
function selectAll() {
  addAllToSelection(props.items);
  emitSelectionChange();
}

function addAllToSelection(items: ApiDentryItem[]) {
  for (const item of items) {
    selectedUuids.value.add(item.dentryUuid);
    if (item.children) {
      addAllToSelection(item.children);
    }
  }
}

/**
 * 取消全选
 */
function unselectAll() {
  selectedUuids.value.clear();
  emitSelectionChange();
}

/**
 * 切换选中状态
 */
function handleToggleSelect(uuid: string) {
  if (selectedUuids.value.has(uuid)) {
    selectedUuids.value.delete(uuid);
  } else {
    selectedUuids.value.add(uuid);
  }
  emitSelectionChange();
}

/**
 * 切换展开状态
 */
function handleToggleExpand(uuid: string) {
  if (expandedUuids.value.has(uuid)) {
    expandedUuids.value.delete(uuid);
  } else {
    expandedUuids.value.add(uuid);
  }
}

/**
 * 发送选中变化事件
 */
function emitSelectionChange() {
  emit('selectionChange', new Set(selectedUuids.value));
}

/**
 * 获取选中的项目列表
 */
function getSelectedItems(): ApiDentryItem[] {
  const result: ApiDentryItem[] = [];

  function findSelected(items: ApiDentryItem[]) {
    for (const item of items) {
      if (selectedUuids.value.has(item.dentryUuid)) {
        result.push(item);
      }
      if (item.children) {
        findSelected(item.children);
      }
    }
  }

  findSelected(props.items);
  return result;
}

// 暴露方法给父组件
defineExpose({
  getSelectedItems,
  selectAll,
  unselectAll,
});
</script>

<style scoped>
.doc-tree {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.doc-tree-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.toolbar-left {
  display: flex;
  gap: 4px;
}

.toolbar-btn {
  padding: 4px 10px;
  font-size: 12px;
  color: #007aff;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.toolbar-btn:hover:not(:disabled) {
  background-color: #e5f1ff;
}

.toolbar-btn:disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.toolbar-right {
  display: flex;
  align-items: center;
}

.selection-count {
  font-size: 12px;
  color: #6b7280;
}

.doc-tree-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.doc-tree-content.has-selection {
  padding-bottom: 60px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-text {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.load-more {
  padding: 12px;
  border-top: 1px solid #e5e7eb;
}

.load-more-btn {
  width: 100%;
  padding: 8px;
  font-size: 13px;
  color: #007aff;
  background-color: #f3f4f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.load-more-btn:hover {
  background-color: #e5e7eb;
}
</style>
