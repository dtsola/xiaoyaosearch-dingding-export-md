<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: '正在加载...',
});
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #007aff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-message {
  margin-top: 16px;
  font-size: 14px;
  color: #6b7280;
}
</style>
