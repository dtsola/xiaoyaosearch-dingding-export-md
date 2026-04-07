/**
 * 钉钉文档 API 封装
 * 通过 Content Script 与钉钉页面 lwpClient 通信
 */

import type {
  ApiResponse,
  ApiDentryItem,
  DocListResponse,
  DocumentDataResponse,
  ExportProgressCallback,
} from './types';
import type { ExportFormat } from '@/shared/types';

/**
 * 钉钉文档导出工具 API
 */
export class DingTalkAPI {
  /**
   * 获取当前活动标签页
   */
  private async getActiveTab(): Promise<chrome.tabs.Tab> {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          resolve(tabs[0]);
        } else {
          reject(new Error('无法获取当前标签页'));
        }
      });
    });
  }

  /**
   * 向 Content Script 发送消息调用 API
   */
  private async callContentScript(apiName: string, params: any = {}): Promise<any> {
    const tab = await this.getActiveTab();

    if (!tab.id) {
      throw new Error('无效的标签页 ID');
    }

    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(
        tab.id,
        {
          type: 'CALL_API',
          apiName,
          params,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * 获取文档列表
   */
  async getDocList(dentryUuid: string, pageToken = ''): Promise<DocListResponse> {
    const response = await this.callContentScript('getDocList', {
      dentryUuid,
      pageToken,
    });

    // 处理响应数据
    return {
      children: response.data?.children || response.children || [],
      hasMore: response.data?.hasMore || response.hasMore || false,
      loadMoreId: response.data?.loadMoreId || response.loadMoreId || '',
    };
  }

  /**
   * 获取文档数据
   */
  async getDocumentData(
    dentryKey: string,
    docKey = '',
    source = ''
  ): Promise<DocumentDataResponse> {
    const response = await this.callContentScript('getDocumentData', {
      dentryKey,
      docKey,
      source,
    });

    return response.data || response;
  }

  /**
   * 获取文档信息
   */
  async getDocInfo(dentryUuid: string): Promise<ApiDentryItem> {
    const response = await this.callContentScript('getDocList', {
      dentryUuid,
    });

    // 从列表中查找指定文档
    const items = response.data?.children || response.children || [];
    return items.find((item: ApiDentryItem) => item.dentryUuid === dentryUuid);
  }

  /**
   * 导出文档为指定格式（简化版，仅支持 Markdown）
   */
  async exportDocument(
    dentryUuid: string,
    docKey: string,
    dentryKey: string,
    contentType: string,
    name: string,
    size: number,
    exportFormat: ExportFormat,
    onProgress?: ExportProgressCallback
  ): Promise<string> {
    if (exportFormat === 'md') {
      return this.exportToMarkdown(dentryKey, name);
    }

    // 其他格式暂不支持，返回提示
    throw new Error(`目前仅支持导出为 Markdown 格式`);
  }

  /**
   * 导出为 Markdown
   */
  async exportToMarkdown(dentryKey: string, name: string): Promise<string> {
    const docData = await this.getDocumentData(dentryKey);

    // 导入转换器
    const { convertAdocToMarkdown } = await import('../utils/format');
    const markdown = convertAdocToMarkdown(
      docData.documentContent.checkpoint.content,
      name
    );

    // 创建 Blob 并返回 URL
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    return URL.createObjectURL(blob);
  }
}
