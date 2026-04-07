<template>
  <div class="task-item" :class="`status-${task.status}`">
    <!-- 状态图标 -->
    <div class="task-icon">
      <span v-if="task.status === 'pending'" class="icon-pending">⏳</span>
      <span v-else-if="task.status === 'exporting'" class="icon-exporting">
        <svg class="spinner" width="16" height="16" viewBox="0 0 16 16">
          <circle
            cx="8"
            cy="8"
            r="6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-dasharray="24"
            stroke-dashoffset="12"
          />
        </svg>
      </span>
      <span v-else-if="task.status === 'success'" class="icon-success">✅</span>
      <span v-else-if="task.status === 'failed'" class="icon-failed">❌</span>
    </div>

    <!-- 任务信息 -->
    <div class="task-info">
      <p class="task-name" :title="task.item.dentryName">{{ task.item.dentryName }}</p>
      <p v-if="task.status === 'exporting'" class="task-status">
        导出中... {{ task.progress }}%
      </p>
      <p v-else-if="task.status === 'failed'" class="task-error">
        {{ task.error || '导出失败' }}
      </p>
      <p v-else-if="task.status === 'success'" class="task-status">
        导出完成
      </p>
    </div>

    <!-- 操作按钮 -->
    <div class="task-actions">
      <button
        v-if="task.status === 'failed'"
        class="action-btn retry"
        @click="$emit('retry')"
        title="重试"
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
      </button>
      <button
        v-if="task.status === 'success'"
        class="action-btn download"
        @click="$emit('download')"
        title="下载"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2v10M4 8l4 4 4-4M2 14h12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        class="action-btn remove"
        @click="$emit('remove')"
        title="移除"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExportTask } from '@/sidepanel/composables/useDingTalkAPI';

interface Props {
  task: ExportTask;
}

interface Emits {
  (e: 'retry'): void;
  (e: 'remove'): void;
  (e: 'download'): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.15s ease-in-out;
}

.task-item:last-child {
  border-bottom: none;
}

.task-item:hover {
  background-color: #f9fafb;
}

.task-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.icon-exporting svg {
  animation: spin 1s linear infinite;
  color: #007aff;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.task-info {
  flex: 1;
  min-width: 0;
}

.task-name {
  font-size: 13px;
  color: #111827;
  margin: 0 0 2px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-status {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.task-error {
  font-size: 12px;
  color: #ef4444;
  margin: 0;
}

.task-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.action-btn:hover {
  background-color: #f3f4f6;
}

.action-btn.retry {
  color: #007aff;
}

.action-btn.download {
  color: #34c759;
}

.action-btn.remove {
  color: #6b7280;
}

.task-item.status-success .task-name {
  color: #059669;
}

.task-item.status-failed .task-name {
  color: #dc2626;
}
</style>
