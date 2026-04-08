/**
 * 镜头 01：背景故事
 * 时长：15秒
 * @module Shot01_BackgroundStory
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot01_BackgroundStory: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>
      {/* 背景装饰 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        background: 'radial-gradient(circle at 70% 50%, #3370FF 0%, transparent 50%)',
      }} />

      {/* 飞书 Logo/图标示意 */}
      <FadeIn delay={0} duration={30}>
        <div style={{
          fontSize: 120,
          marginBottom: 60,
          textAlign: 'center',
        }}>
          📄
        </div>
      </FadeIn>

      {/* 标题文字 */}
      <FadeIn delay={30} duration={30}>
        <h1 style={{
          fontSize: FONT_SIZES.title,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          margin: '0 0 30px 0',
          fontFamily: FONTS.title,
          textAlign: 'center',
        }}>
          我朋友遇到了一个头疼的问题
        </h1>
      </FadeIn>

      {/* 描述文字 */}
      <FadeIn delay={60} duration={30}>
        <p style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textSecondary,
          margin: 0,
          fontFamily: FONTS.body,
          textAlign: 'center',
          maxWidth: 1200,
          lineHeight: 1.8,
        }}>
          他在飞书上整理了数百篇技术文档，但因为工作变动需要离职，<br />
          想把所有文档导出到本地，却发现飞书官方的导出功能并不完善。
        </p>
      </FadeIn>

      {/* 问题图标 */}
      <FadeIn delay={120} duration={30}>
        <div style={{
          fontSize: 80,
          marginTop: 60,
        }}>
          ❓
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};
