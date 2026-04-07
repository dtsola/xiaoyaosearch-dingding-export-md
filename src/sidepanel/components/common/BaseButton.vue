<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : undefined"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="button-spinner"></span>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  nativeType?: 'button' | 'submit' | 'reset';
  tag?: 'button' | 'a' | 'router-link';
  block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  nativeType: 'button',
  tag: 'button',
  block: false,
});

defineEmits<{
  click: [event: Event];
}>();

const buttonClasses = computed(() => {
  return [
    'base-button',
    `base-button--${props.variant}`,
    `base-button--${props.size}`,
    {
      'base-button--disabled': props.disabled,
      'base-button--loading': props.loading,
      'base-button--block': props.block,
    },
  ];
});
</script>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  text-align: center;
  white-space: nowrap;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  user-select: none;
  text-decoration: none;
}

.base-button--sm {
  height: var(--button-height-sm);
  padding: var(--button-padding-sm);
  font-size: var(--text-sm);
}

.base-button--md {
  height: var(--button-height-md);
  padding: var(--button-padding-md);
  font-size: var(--text-base);
}

.base-button--lg {
  height: var(--button-height-lg);
  padding: var(--button-padding-lg);
  font-size: var(--text-lg);
}

/* 变体样式 */
.base-button--primary {
  background-color: var(--color-primary);
  color: white;
}

.base-button--primary:hover:not(.base-button--disabled) {
  background-color: var(--color-primary-hover);
}

.base-button--primary:active:not(.base-button--disabled) {
  background-color: var(--color-primary-active);
}

.base-button--secondary {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.base-button--secondary:hover:not(.base-button--disabled) {
  background-color: var(--color-border-light);
}

.base-button--secondary:active:not(.base-button--disabled) {
  background-color: var(--color-border-medium);
}

.base-button--ghost {
  background-color: transparent;
  color: var(--color-primary);
}

.base-button--ghost:hover:not(.base-button--disabled) {
  background-color: var(--color-primary-subtle);
}

.base-button--danger {
  background-color: var(--color-error);
  color: white;
}

.base-button--danger:hover:not(.base-button--disabled) {
  background-color: #e6352b;
}

.base-button--danger:active:not(.base-button--disabled) {
  background-color: #cc2f26;
}

/* 禁用状态 */
.base-button--disabled,
.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* 加载状态 */
.base-button--loading {
  pointer-events: none;
}

.button-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 块级按钮 */
.base-button--block {
  width: 100%;
}
</style>
