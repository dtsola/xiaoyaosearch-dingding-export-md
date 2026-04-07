<template>
  <div class="export-progress" :class="{ 'is-visible': tasks.length > 0 }">
    <!-- 进度条 -->
    <div class="progress-header">
      <div class="progress-info">
        <h3 class="progress-title">导出进度</h3>
        <span class="progress-count">{{ completedCount }} / {{ totalCount }}</span>
      </div>
      <button
        v-if="completedCount > 0"
        class="clear-btn"
        @click="$emit('clearCompleted')"
        title="清除已完成"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>

    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
    </div>

    <!-- 任务列表 -->
    <div class="task-list">
      <ExportTaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @retry="$emit('retry', task.id)"
        @remove="$emit('remove', task.id)"
        @download="$emit('download', task.id)"
      />
    </div>

    <!-- 批量操作 -->
    <div v-if="hasCompleted" class="bulk-actions">
      <button class="bulk-btn primary" @click="$emit('downloadAll')">
        下载全部 ({{ successCount }})
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ExportTaskItem from './ExportTaskItem.vue';
import type { ExportTask } from '@/sidepanel/composables/useDingTalkAPI';

interface Props {
  tasks: ExportTask[];
}

interface Emits {
  (e: 'retry', id: string): void;
  (e: 'remove', id: string): void;
  (e: 'download', id: string): void;
  (e: 'downloadAll'): void;
  (e: 'clearCompleted'): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const totalCount = computed(() => props.tasks.length);
const completedCount = computed(() => props.tasks.filter((t) => t.status === 'success').length);
const successCount = computed(() => props.tasks.filter((t) => t.status === 'success').length);
const hasCompleted = computed(() => successCount.value > 0);

const progressPercent = computed(() => {
  if (totalCount.value === 0) return 0;
  return Math.round((completedCount.value / totalCount.value) * 100);
});
</script>

<style scoped>
.export-progress {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  max-height: 50vh;
  display: flex;
  flex-direction: column;
}

.export-progress.is-visible {
  transform: translateY(0);
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.progress-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.progress-count {
  font-size: 13px;
  color: #6b7280;
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: #6b7280;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.clear-btn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.progress-bar {
  height: 3px;
  background-color: #e5e7eb;
  position: relative;
}

.progress-fill {
  height: 100%;
  background-color: #34c759;
  transition: width 0.3s ease-in-out;
}

.task-list {
  overflow-y: auto;
  max-height: 200px;
}

.bulk-actions {
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
}

.bulk-btn {
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.bulk-btn.primary {
  background-color: #007aff;
  color: white;
}

.bulk-btn.primary:hover {
  background-color: #0051d5;
}
</style>
