/**
 * 镜头 05：演示 - 安装工具
 * 时长：10秒
 * @module Shot05_Install
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn, CodeBlock } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot05_Install: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>
      {/* 步骤标题 */}
      <FadeIn delay={0} duration={20}>
        <div style={{
          fontSize: FONT_SIZES.heading,
          color: COLORS.textAccent,
          marginBottom: 40,
          fontFamily: FONTS.title,
        }}>
          第 1 步：安装工具
        </div>
      </FadeIn>

      {/* 代码块 */}
      <FadeIn delay={20} duration={20}>
        <CodeBlock style={{
          minWidth: 800,
          textAlign: 'center',
        }}>
          npm install -g xiaoyaosearch-feishu-export
        </CodeBlock>
      </FadeIn>

      {/* 平台图标 */}
      <FadeIn delay={60} duration={20}>
        <div style={{
          display: 'flex',
          gap: 40,
          marginTop: 60,
          alignItems: 'center',
        }}>
          {['Windows', 'macOS', 'Linux'].map((platform) => (
            <div key={platform} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: FONT_SIZES.body,
              color: COLORS.textSecondary,
              fontFamily: FONTS.body,
            }}>
              <span style={{ fontSize: 24 }}>💻</span>
              {platform}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* 说明文字 */}
      <FadeIn delay={90} duration={20}>
        <p style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textSecondary,
          marginTop: 40,
          margin: 0,
          fontFamily: FONTS.body,
          textAlign: 'center',
        }}>
          完全开源免费，支持多平台
        </p>
      </FadeIn>
    </AbsoluteFill>
  );
};
