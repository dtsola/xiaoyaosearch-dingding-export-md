<template>
  <Transition name="toast">
    <div v-if="visible" :class="toastClasses" @click="handleClick">
      <span class="toast-icon">{{ icon }}</span>
      <span class="toast-message">{{ message }}</span>
      <button v-if="closable" class="toast-close" @click.stop="close">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M10 4L4 10M4 4l6 6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

interface Props {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000,
  closable: true,
});

const emit = defineEmits<{
  close: [];
}>();

const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const icon = computed(() => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };
  return icons[props.type];
});

const toastClasses = computed(() => [
  'toast',
  `toast--${props.type}`,
  { 'toast--closable': props.closable },
]);

function close() {
  visible.value = false;
  emit('close');
}

function handleClick() {
  // 点击消息时可以执行某些操作
}

function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

onMounted(() => {
  visible.value = true;
  startTimer();
});

// 监听 visible 变化
watch(visible, (val) => {
  if (val) {
    startTimer();
  } else {
    clearTimer();
  }
});

// 暴露方法
defineExpose({
  close,
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: var(--spacing-4);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4);
  min-width: 280px;
  max-width: 400px;
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-tooltip);
  pointer-events: auto;
}

.toast--success {
  border-left: 3px solid var(--color-success);
}

.toast--success .toast-icon {
  color: var(--color-success);
}

.toast--error {
  border-left: 3px solid var(--color-error);
}

.toast--error .toast-icon {
  color: var(--color-error);
}

.toast--warning {
  border-left: 3px solid var(--color-warning);
}

.toast--warning .toast-icon {
  color: var(--color-warning);
}

.toast--info {
  border-left: 3px solid var(--color-info);
}

.toast--info .toast-icon {
  color: var(--color-info);
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 14px;
  font-weight: var(--font-bold);
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  line-height: var(--leading-normal);
}

.toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-text-tertiary);
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  flex-shrink: 0;
}

.toast-close:hover {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

/* 过渡动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all var(--duration-base) var(--ease-out);
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>
