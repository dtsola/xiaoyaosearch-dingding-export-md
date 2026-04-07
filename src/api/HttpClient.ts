/**
 * HTTP 客户端
 * 封装 axios 用于发送 HTTP 请求
 */
import axios, { AxiosInstance, AxiosError } from 'axios';

export class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://alidocs.dingtalk.com',
      timeout: 30000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
    });
  }

  /**
   * 发送 GET 请求
   */
  async get(url: string, headers?: Record<string, string>): Promise<any> {
    try {
      const response = await this.client.get(url, { headers });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 发送 POST 请求
   */
  async post(url: string, data?: any, headers?: Record<string, string>): Promise<any> {
    try {
      const response = await this.client.post(url, data, { headers });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 设置 Cookie
   */
  setCookie(cookieString: string): void {
    this.client.defaults.headers.common['Cookie'] = cookieString;
  }

  /**
   * 设置请求头
   */
  setHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }

  /**
   * 错误处理
   */
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(`HTTP 请求失败: ${axiosError.response.status} ${axiosError.response.statusText}`);
      } else if (axiosError.request) {
        throw new Error('网络请求失败，请检查网络连接');
      }
    }
    throw new Error(`请求失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}
