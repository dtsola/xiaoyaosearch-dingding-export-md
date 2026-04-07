<template>
  <div class="toast-container">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
      :closable="toast.closable"
      @close="remove(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
import Toast from './index.vue';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
  closable: boolean;
}

defineProps<{
  toasts: ToastItem[];
}>();

const emit = defineEmits<{
  remove: [id: string];
}>();

function remove(id: string) {
  emit('remove', id);
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: var(--z-tooltip);
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}
</style>
