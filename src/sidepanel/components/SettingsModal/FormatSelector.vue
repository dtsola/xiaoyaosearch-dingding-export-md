<template>
  <div class="format-selector">
    <label class="format-label">{{ title }}</label>
    <div class="format-options">
      <label
        v-for="option in options"
        :key="option.value"
        class="format-option"
        :class="{ 'is-selected': value === option.value }"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="value === option.value"
          @change="$emit('update:value', option.value)"
          class="format-radio"
        />
        <span class="format-option-content">
          <span class="format-option-label">{{ option.label }}</span>
          <span v-if="option.description" class="format-option-desc">
            {{ option.description }}
          </span>
        </span>
        <span class="format-option-check">✓</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FormatOption {
  label: string;
  value: string;
  description?: string;
}

interface Props {
  title: string;
  name: string;
  options: FormatOption[];
  value: string;
}

defineProps<Props>();
defineEmits<{
  (e: 'update:value', value: string): void;
}>();
</script>

<style scoped>
.format-selector {
  margin-bottom: 20px;
}

.format-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 8px;
}

.format-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.format-option {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.format-option:hover {
  border-color: #d1d5db;
}

.format-option.is-selected {
  border-color: #007aff;
  background-color: #f0f7ff;
}

.format-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.format-option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.format-option-label {
  font-size: 13px;
  color: #111827;
  font-weight: 500;
}

.format-option-desc {
  font-size: 11px;
  color: #6b7280;
}

.format-option-check {
  font-size: 14px;
  color: #007aff;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}

.format-option.is-selected .format-option-check {
  opacity: 1;
}
</style>
