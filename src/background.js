// background.js - Chrome 扩展后台服务

// 监听插件图标点击
chrome.action.onClicked.addListener(async (tab) => {
  // 只在钉钉文档页面生效
  const url = tab.url || '';
  if (!url.includes('alidocs.dingtalk.com') && !url.includes('docs.dingtalk.com')) {
    // 尝试在当前页面显示提示
    chrome.tabs.sendMessage(tab.id, { action: 'showAlert', message: '请在钉钉文档页面使用本插件' }).catch(() => {
      // 如果 content script 未加载，忽略
    });
    return;
  }

  // 脚本已通过 content_scripts 自动注入，只需发送显示消息
  chrome.tabs.sendMessage(tab.id, { action: 'showDownloader' }).catch(() => {
    // 如果消息发送失败（页面刚加载），稍后重试
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, { action: 'showDownloader' });
    }, 100);
  });
});

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ping') {
    sendResponse({ status: 'ok' });
  } else if (request.action === 'closeExtension') {
    // 可以在这里处理关闭逻辑
  }
  return true;
});
