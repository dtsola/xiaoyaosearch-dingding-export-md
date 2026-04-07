<template>
  <Transition name="modal">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <!-- 头部 -->
        <div class="modal-header">
          <h2 class="modal-title">导出设置</h2>
          <button class="modal-close" @click="$emit('close')" aria-label="关闭">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5l10 10M5 15L15 5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <!-- 内容 -->
        <div class="modal-body">
          <FormatSelector
            title="📄 文档导出格式"
            name="adoc-format"
            :options="documentFormats"
            :value="configStore.exportFormats.adoc"
            @update:value="configStore.setFormat('adoc', $event)"
          />

          <FormatSelector
            title="📊 表格导出格式"
            name="axls-format"
            :options="spreadsheetFormats"
            :value="configStore.exportFormats.axls"
            @update:value="configStore.setFormat('axls', $event)"
          />

          <FormatSelector
            title="🎨 白板导出格式"
            name="adraw-format"
            :options="imageFormats"
            :value="configStore.exportFormats.adraw"
            @update:value="configStore.setFormat('adraw', $event)"
          />

          <FormatSelector
            title="🧠 脑图导出格式"
            name="amind-format"
            :options="imageFormats"
            :value="configStore.exportFormats.amind"
            @update:value="configStore.setFormat('amind', $event)"
          />

          <div class="settings-section">
            <h3 class="section-title">其他设置</h3>

            <label class="setting-item">
              <input
                type="checkbox"
                v-model="configStore.autoClose"
                class="setting-checkbox"
              />
              <span class="setting-label">导出完成后自动关闭侧边栏</span>
            </label>

            <div class="setting-item">
              <span class="setting-label">并发导出数量</span>
              <select
                v-model.number="configStore.concurrentLimit"
                class="setting-select"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="modal-footer">
          <button class="modal-btn secondary" @click="handleReset">
            重置默认
          </button>
          <div class="modal-footer-right">
            <button class="modal-btn secondary" @click="$emit('close')">
              取消
            </button>
            <button class="modal-btn primary" @click="handleSave">
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfigStore } from '@/sidepanel/stores/config';
import FormatSelector from './FormatSelector.vue';

interface Props {
  visible?: boolean;
}

withDefaults(defineProps<Props>(), {
  visible: true,
});

const emit = defineEmits<{
  close: [];
}>();

const configStore = useConfigStore();

const documentFormats = [
  { label: 'Markdown (.md)', value: 'md', description: '纯文本格式，支持版本控制' },
  { label: 'Word (.docx)', value: 'docx', description: 'Microsoft Word 文档' },
  { label: 'PDF (.pdf)', value: 'pdf', description: '便于打印和分享' },
];

const spreadsheetFormats = [
  { label: 'Excel (.xlsx)', value: 'xlsx', description: 'Microsoft Excel 表格' },
];

const imageFormats = [
  { label: 'JPEG (.jpg)', value: 'jpg', description: '通用图片格式' },
  { label: 'PNG (.png)', value: 'png', description: '支持透明背景' },
];

function handleSave() {
  configStore.saveConfig();
  emit('close');
}

function handleReset() {
  if (confirm('确定要重置所有设置为默认值吗？')) {
    configStore.resetConfig();
  }
}
</script>

<style scoped>
/* 遮罩层 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 16px;
}

/* 弹窗内容 */
.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* 头部 */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: #6b7280;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.modal-close:hover {
  background-color: #f3f4f6;
  color: #111827;
}

/* 内容区域 */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.settings-section {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  gap: 12px;
}

.setting-checkbox {
  width: 18px;
  height: 18px;
  border: 1.5px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
}

.setting-label {
  font-size: 13px;
  color: #374151;
}

.setting-select {
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
}

/* 底部 */
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.modal-footer-right {
  display: flex;
  gap: 8px;
}

.modal-btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.modal-btn.primary {
  background-color: #007aff;
  color: white;
}

.modal-btn.primary:hover {
  background-color: #0051d5;
}

.modal-btn.secondary {
  background-color: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.modal-btn.secondary:hover {
  background-color: #f3f4f6;
  color: #111827;
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}
</style>
