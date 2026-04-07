<template>
  <div class="sidepanel-app">
    <SidePanelHeader />
    <main class="sidepanel-main">
      <HomeView />
    </main>
    <SidePanelFooter />
    <ToastContainer :toasts="toast.toasts" @remove="toast.remove" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import SidePanelHeader from './components/layout/SidePanelHeader.vue';
import SidePanelFooter from './components/layout/SidePanelFooter.vue';
import HomeView from './views/HomeView.vue';
import ToastContainer from './components/Toast/ToastContainer.vue';
import { useToast } from './composables/useToast';

// 使用 Toast Composable
const toast = useToast();

// 组件挂载时，向 content script 请求页面信息
onMounted(() => {
  // 发送消息到当前 tab 的 content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: 'GET_PAGE_INFO' },
        (response) => {
          if (chrome.runtime.lastError) {
            console.log('[小遥搜索] 无法获取页面信息:', chrome.runtime.lastError.message);
            return;
          }
          console.log('[小遥搜索] 收到页面信息:', response);
        }
      );
    }
  });
});
</script>

<style scoped>
.sidepanel-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
}

.sidepanel-main {
  flex: 1;
  overflow-y: auto;
}
</style>
