/**
 * 钉钉文档页面类型
 */
export enum PageType {
  MY_SPACE = 'my_space',       // 我的空间
  SPACE = 'space',             // 指定空间
  DOCUMENT = 'document',       // 文档/目录
  UNKNOWN = 'unknown'          // 未知页面
}

/**
 * 检测当前页面类型
 */
export function detectPageType(): PageType {
  const url = window.location.href;
  const pathname = window.location.pathname;

  // 检测"我的空间"页面
  if (pathname.includes('/workspace/mySpace')) {
    return PageType.MY_SPACE;
  }

  // 检测"指定空间"页面
  if (pathname.includes('/workspace/space')) {
    return PageType.SPACE;
  }

  // 检测"文档/目录"页面
  if (pathname.includes('/doc/') || pathname.includes('/docnew/')) {
    return PageType.DOCUMENT;
  }

  return PageType.UNKNOWN;
}

/**
 * 获取当前空间 ID
 */
export function getCurrentSpaceId(): string | null {
  const url = new URL(window.location.href);
  const spaceId = url.searchParams.get('spaceId');
  return spaceId;
}

/**
 * 获取当前文档 ID
 */
export function getCurrentDocId(): string | null {
  const url = new URL(window.location.href);
  const paths = url.pathname.split('/');
  const docIndex = paths.findIndex(p => p === 'doc' || p === 'docnew');

  if (docIndex !== -1 && paths[docIndex + 1]) {
    return paths[docIndex + 1];
  }

  return null;
}

/**
 * 页面信息接口
 */
export interface PageInfo {
  type: PageType;
  spaceId: string | null;
  docId: string | null;
  url: string;
}

/**
 * 获取完整页面信息
 */
export function getPageInfo(): PageInfo {
  return {
    type: detectPageType(),
    spaceId: getCurrentSpaceId(),
    docId: getCurrentDocId(),
    url: window.location.href,
  };
}
