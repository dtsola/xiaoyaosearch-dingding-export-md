/**
 * 后台服务 Worker
 */

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[小遥搜索] Background 收到消息:', message);

  if (message.type === 'SHOW_EXPORT_BUTTON') {
    // 设置 badge 标识
    if (chrome.action && sender.tab?.id) {
      chrome.action.setBadgeText({ text: '●', tabId: sender.tab.id });
      chrome.action.setBadgeBackgroundColor({ color: '#007AFF', tabId: sender.tab.id });
      chrome.action.setTitle({
        tabId: sender.tab.id,
        title: '点击导出钉钉文档',
      });
    }
  }

  return true;
});

// 监听扩展安装/更新事件
chrome.runtime.onInstalled.addListener((details) => {
  console.log('[小遥搜索] 扩展事件:', details.reason);

  if (details.reason === 'install') {
    console.log('[小遥搜索] 扩展已安装');
  } else if (details.reason === 'update') {
    console.log('[小遥搜索] 扩展已更新至', chrome.runtime.getManifest().version);
  }
});

console.log('[小遥搜索] Background Service Worker 已加载');
