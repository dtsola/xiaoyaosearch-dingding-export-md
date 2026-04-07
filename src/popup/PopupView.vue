<template>
  <div class="popup-view">
    <SidePanelHeader />
    <main class="popup-main">
      <HomeView :is-popup="true" />
    </main>
    <SidePanelFooter />
    <ToastContainer :toasts="toast.toasts" @remove="toast.remove" />
  </div>
</template>

<script setup lang="ts">
import SidePanelHeader from '../sidepanel/components/layout/SidePanelHeader.vue';
import SidePanelFooter from '../sidepanel/components/layout/SidePanelFooter.vue';
import HomeView from '../sidepanel/views/HomeView.vue';
import ToastContainer from '../sidepanel/components/Toast/ToastContainer.vue';
import { useToast } from '../sidepanel/composables/useToast';

// 使用 Toast Composable
const toast = useToast();
</script>

<style scoped>
.popup-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
}

.popup-main {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
}
</style>
