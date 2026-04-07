<template>
  <div class="doc-tree-item" :class="{ 'is-folder': isFolder }">
    <div
      class="doc-tree-item-content"
      :class="{ 'is-selected': isSelected }"
      @click="handleClick"
    >
      <!-- 展开/收起按钮 -->
      <span
        v-if="isFolder"
        class="expand-icon"
        :class="{ 'is-expanded': expanded }"
        @click.stop="toggleExpand"
      >
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path
            :d="expanded ? 'M2 4 L6 8 L10 4' : 'M4 2 L8 6 L4 10'"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span v-else class="expand-icon-placeholder"></span>

      <!-- 复选框 -->
      <label class="checkbox-wrapper" @click.stop>
        <input
          type="checkbox"
          :checked="isChecked"
          @change="toggleCheck"
          class="checkbox"
        />
        <span class="checkbox-custom"></span>
      </label>

      <!-- 文件图标和名称 -->
      <span class="file-info">
        <span class="file-icon">{{ fileIcon }}</span>
        <span class="file-name" :title="item.dentryName">{{ item.dentryName }}</span>
      </span>

      <!-- 文件大小 -->
      <span v-if="!isFolder && item.size" class="file-size">
        {{ formatSize(item.size) }}
      </span>
    </div>

    <!-- 子节点 -->
    <div v-if="expanded && isFolder && children.length > 0" class="doc-tree-children">
      <DocTreeItem
        v-for="child in children"
        :key="child.dentryUuid"
        :item="child"
        :selected-uuids="selectedUuids"
        :expanded-uuids="expandedUuids"
        :depth="depth + 1"
        @toggle-select="handleChildToggle"
        @toggle-expand="handleChildExpand"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ApiDentryItem } from '@/sidepanel/api/types';

interface Props {
  item: ApiDentryItem;
  selectedUuids: Set<string>;
  expandedUuids: Set<string>;
  depth?: number;
}

interface Emits {
  (e: 'toggleSelect', uuid: string): void;
  (e: 'toggleExpand', uuid: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
});

const emit = defineEmits<Emits>();

// 是否为文件夹
const isFolder = computed(() => props.item.dentryType === 'folder');

// 是否有子节点
const children = computed(() => props.item.children || []);

// 是否已展开
const expanded = computed(() => props.expandedUuids.has(props.item.dentryUuid));

// 是否被选中
const isChecked = computed(() => props.selectedUuids.has(props.item.dentryUuid));

// 是否被选中（高亮显示）
const isSelected = computed(() => props.selectedUuids.has(props.item.dentryUuid));

// 文件图标
const fileIcon = computed(() => {
  const iconMap: Record<string, string> = {
    adoc: '📄',
    axls: '📊',
    adraw: '🎨',
    amind: '🧠',
    folder: '📁',
  };
  return iconMap[props.item.dentryType] || '📄';
});

// 切换展开状态
function toggleExpand() {
  emit('toggleExpand', props.item.dentryUuid);
}

// 切换选中状态
function toggleCheck() {
  emit('toggleSelect', props.item.dentryUuid);
}

// 点击项目
function handleClick() {
  if (isFolder.value) {
    toggleExpand();
  } else {
    toggleCheck();
  }
}

// 处理子节点事件
function handleChildToggle(uuid: string) {
  emit('toggleSelect', uuid);
}

function handleChildExpand(uuid: string) {
  emit('toggleExpand', uuid);
}

// 格式化文件大小
function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
</script>

<style scoped>
.doc-tree-item {
  user-select: none;
}

.doc-tree-item-content {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.doc-tree-item-content:hover {
  background-color: #f3f4f6;
}

.doc-tree-item-content.is-selected {
  background-color: #e5f1ff;
}

.expand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #9ca3af;
  transition: transform 0.15s ease-in-out;
}

.expand-icon.is-expanded {
  transform: rotate(0);
}

.expand-icon-placeholder {
  width: 16px;
  height: 16px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  background-color: white;
  transition: all 0.15s ease-in-out;
}

.checkbox:checked + .checkbox-custom {
  background-color: #007aff;
  border-color: #007aff;
}

.checkbox:checked + .checkbox-custom::after {
  content: '';
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translateY(-1px);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}

.file-icon {
  flex-shrink: 0;
  font-size: 16px;
}

.file-name {
  font-size: 13px;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.is-folder .file-name {
  font-weight: 500;
}

.file-size {
  font-size: 11px;
  color: #9ca3af;
  flex-shrink: 0;
}

.doc-tree-children {
  margin-left: 16px;
}
</style>
