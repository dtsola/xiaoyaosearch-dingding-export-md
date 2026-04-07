/**
 * Cookie 管理器
 * 使用 Playwright 实现浏览器自动化登录，自动获取和保存 Cookie
 */
import { chromium } from 'playwright';
import path from 'path';
import os from 'os';
import fs from 'fs/promises';
import type { Cookie } from '../types/config.js';

export class CookieManager {
  private cookiePath: string;

  constructor() {
    this.cookiePath = path.join(os.homedir(), '.dingding-export', 'cookies.json');
  }

  /**
   * 验证 Cookie 是否有效
   */
  async validate(): Promise<boolean> {
    try {
      const cookies = await this.loadCookie();
      return cookies && cookies.length > 0;
    } catch {
      return false;
    }
  }

  /**
   * 获取 Cookie 字符串（用于 HTTP 请求）
   */
  async getCookieString(): Promise<string> {
    const cookies = await this.loadCookie();
    return cookies.map((c: Cookie) => `${c.name}=${c.value}`).join('; ');
  }

  /**
   * 使用 Playwright 自动登录并获取 Cookie
   */
  async refreshWithPlaywright(): Promise<void> {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      console.log('🌐 正在打开浏览器...');
      console.log('📝 请在浏览器中完成钉钉登录...');

      // 导航到钉钉文档首页
      await page.goto('https://alidocs.dingtalk.com');

      console.log('⏳ 等待登录完成...');

      // 等待用户登录（等待跳转到首页或 URL 包含特定标识）
      try {
        // 等待页面加载完成，最多等待 120 秒
        await page.waitForLoadState('networkidle', { timeout: 120000 });
      } catch {
        // 超时不处理，继续尝试获取 Cookie
      }

      // 获取 Cookie
      const cookies = await context.cookies();

      if (cookies.length === 0) {
        throw new Error('未获取到 Cookie，请确保已登录');
      }

      // 保存 Cookie
      await this.saveCookie(cookies);

      console.log(`✅ Cookie 已保存 (${cookies.length} 个)`);
      console.log(`📁 保存路径: ${this.cookiePath}`);
    } finally {
      await browser.close();
    }
  }

  /**
   * 确保有有效的 Cookie，如果没有则提示用户登录
   */
  async ensureValidCookie(): Promise<void> {
    const isValid = await this.validate();

    if (!isValid) {
      console.log('⚠️ Cookie 不存在或已过期');
      console.log('🔄 正在启动自动登录...');
      await this.refreshWithPlaywright();
    } else {
      console.log('✅ Cookie 有效');
    }
  }

  /**
   * 加载保存的 Cookie
   */
  private async loadCookie(): Promise<Cookie[]> {
    const content = await fs.readFile(this.cookiePath, 'utf-8');
    return JSON.parse(content);
  }

  /**
   * 保存 Cookie 到文件
   */
  private async saveCookie(cookies: any[]): Promise<void> {
    const cookieDir = path.dirname(this.cookiePath);
    await fs.mkdir(cookieDir, { recursive: true });

    // 转换 Playwright Cookie 格式到我们的格式
    const formattedCookies: Cookie[] = cookies
      .filter((c) => c.domain.includes('dingtalk') || c.domain.includes('alibaba'))
      .map((c) => ({
        name: c.name,
        value: c.value,
        domain: c.domain,
        path: c.path,
        expires: c.expires,
        httpOnly: c.httpOnly,
        secure: c.secure,
      }));

    await fs.writeFile(this.cookiePath, JSON.stringify(formattedCookies, null, 2));
  }
}
