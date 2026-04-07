import { detectPageType, getPageInfo, PageType } from './pageDetector';

/**
 * 检测当前页面是否是钉钉文档页面
 */
function isDingTalkPage(): boolean {
  const url = window.location.href;
  return url.includes('dingtalk.com');
}

/**
 * 初始化内容脚本
 */
function init() {
  // 如果不是钉钉页面，直接返回
  if (!isDingTalkPage()) {
    return;
  }

  const pageInfo = getPageInfo();

  console.log('[小遥搜索] 当前页面信息:', {
    type: pageInfo.type,
    spaceId: pageInfo.spaceId,
    docId: pageInfo.docId,
    url: pageInfo.url,
  });

  // 根据页面类型执行不同的逻辑
  switch (pageInfo.type) {
    case PageType.MY_SPACE:
    case PageType.SPACE:
    case PageType.DOCUMENT:
      // 发送消息到 Background，显示侧边栏按钮
      chrome.runtime.sendMessage({
        type: 'SHOW_EXPORT_BUTTON',
        pageInfo: pageInfo,
      });
      break;

    default:
      console.log('[小遥搜索] 不是支持的钉钉文档页面类型');
  }

  // 监听来自 sidepanel 的消息
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('[小遥搜索] Content 收到消息:', message);

    if (message.type === 'GET_PAGE_INFO') {
      sendResponse({
        pageInfo: getPageInfo(),
      });
    } else if (message.type === 'CALL_API') {
      // 处理 API 调用
      handleApiCall(message).then(sendResponse);
      return true; // 保持消息通道开放以支持异步响应
    }
  });
}

/**
 * 处理 API 调用
 */
async function handleApiCall(message: any) {
  const { apiName, params } = message;
  const lwpClient = (window as any).lwpClient;

  if (!lwpClient) {
    throw new Error('lwpClient 不可用，请确保在钉钉页面使用');
  }

  console.log('[小遥搜索] 调用 API:', apiName, params);

  switch (apiName) {
    case 'getDocList': {
      const { dentryUuid, pageToken } = params;
      const response = await lwpClient.request({
        url: `/box/api/v2/dentry/list?pageSize=100&dentryUuid=${encodeURIComponent(dentryUuid)}${pageToken ? `&loadMoreId=${encodeURIComponent(pageToken)}` : ''}`,
        method: 'GET',
      });
      return response;
    }

    case 'getDocumentData': {
      const { dentryKey, docKey, source } = params;
      const data: any = {
        dentryKey,
        pageMode: 2,
        fetchBody: true,
      };
      if (source) {
        data.source = source;
      }
      const response = await lwpClient.request({
        url: '/api/document/data',
        method: 'POST',
        data: data,
      });
      return response;
    }

    default:
      throw new Error(`未知的 API: ${apiName}`);
  }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
