/**
 * 钉钉 API 封装
 * 负责与钉钉文档 API 交互
 */
import * as cheerio from 'cheerio';
import { HttpClient } from './HttpClient.js';
import { CookieManager } from '../core/CookieManager.js';

/**
 * 钉钉文档 API
 */
export class DingTalkAPI {
  protected http: HttpClient;
  protected cookieManager: CookieManager;

  constructor() {
    this.http = new HttpClient();
    this.cookieManager = new CookieManager();
  }

  /**
   * 确保已登录
   */
  protected async ensureAuthenticated(): Promise<void> {
    const cookieString = await this.cookieManager.getCookieString();
    this.http.setCookie(cookieString);
  }

  /**
   * 获取文档页面（提取 dentryKey）
   * @param nodeId 文档节点 ID
   */
  async fetchDocumentPage(nodeId: string): Promise<string> {
    await this.ensureAuthenticated();
    const response = await this.http.get(`/i/nodes/${nodeId}`);
    return response.data as string;
  }

  /**
   * 从 HTML 中提取 dentryKey
   * @param html 页面 HTML
   */
  extractDentryKey(html: string): string {
    const $ = cheerio.load(html);

    // 方法1: 从 script 标签中提取
    const scriptContent =
      $('#mainsite_server_content').html() ||
      $('script[id*="__NEXT_DATA__"]').html() ||
      $('script[type="application/json"]').html();

    if (scriptContent) {
      try {
        const data = JSON.parse(scriptContent);
        if (data.dentryKey) {
          return data.dentryKey;
        }
        // 尝试从其他可能的路径获取
        if (data.props?.pageProps?.dentryKey) {
          return data.props.pageProps.dentryKey;
        }
        if (data.initialState?.dentryKey) {
          return data.initialState.dentryKey;
        }
      } catch {
        // JSON 解析失败，尝试其他方法
      }
    }

    // 方法2: 从 window.__INITIAL_STATE__ 中提取
    const stateMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/s);
    if (stateMatch) {
      try {
        const state = JSON.parse(stateMatch[1]);
        if (state.dentryKey) {
          return state.dentryKey;
        }
      } catch {
        // 解析失败，继续尝试
      }
    }

    // 方法3: 从 URL 中提取
    const urlMatch = html.match(/"dentryKey":"([^"]+)"/);
    if (urlMatch) {
      return urlMatch[1];
    }

    throw new Error('无法从页面中提取 dentryKey');
  }

  /**
   * 获取文档内容
   * @param dentryKey 文档密钥
   */
  async fetchDocumentData(dentryKey: string): Promise<any> {
    await this.ensureAuthenticated();

    const response = await this.http.post(
      '/api/document/data',
      { dentryKey },
      {
        'a-dentry-key': dentryKey,
        'Content-Type': 'application/json',
      }
    );

    return response.data;
  }

  /**
   * 下载图片
   * @param url 图片 URL
   */
  async downloadImage(url: string): Promise<Buffer> {
    const response = await this.http.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  }

  /**
   * 下载附件
   * @param url 附件 URL
   */
  async downloadAttachment(url: string): Promise<Buffer> {
    return this.downloadImage(url);
  }

  /**
   * 刷新 Cookie（当 Cookie 失效时调用）
   */
  async refreshCookie(): Promise<void> {
    await this.cookieManager.refreshWithPlaywright();
  }
}
