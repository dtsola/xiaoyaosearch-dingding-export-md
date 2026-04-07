<template>
  <header class="sidepanel-header">
    <div class="header-content">
      <h1 class="header-title">小遥搜索钉钉导出工具</h1>
      <button
        v-if="showClose"
        class="close-button"
        @click="$emit('close')"
        aria-label="关闭"
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
  </header>
</template>

<script setup lang="ts">
interface Props {
  showClose?: boolean;
}

withDefaults(defineProps<Props>(), {
  showClose: true,
});

defineEmits<{
  close: [];
}>();
</script>

<style scoped>
.sidepanel-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #6b7280;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.close-button:active {
  background-color: #e5e7eb;
}
</style>
