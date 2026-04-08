/**
 * 镜头 03：解决方案标题
 * 时长：10秒
 * @module Shot03_SolutionTitle
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, Img, staticFile } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot03_SolutionTitle: React.FC = () => {
  const frame = useCurrentFrame();

  // Logo 缩放动画
  const scale = spring({
    frame,
    fps: 30,
    config: {
      damping: 100,
    },
  });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${COLORS.bgPrimary} 0%, ${COLORS.bgSecondary} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>
      {/* 产品 Logo */}
      <div style={{
        marginBottom: 60,
        transform: `scale(${scale})`,
      }}>
        <Img
          src={staticFile('images/logo.png')}
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            boxShadow: `0 20px 60px ${COLORS.feishuBlue}40`,
          }}
        />
      </div>

      {/* 主标题 */}
      <FadeIn delay={30} duration={30}>
        <h1 style={{
          fontSize: FONT_SIZES.title,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          margin: '0 0 20px 0',
          fontFamily: FONTS.title,
          textAlign: 'center',
        }}>
          小遥搜索飞书导出工具
        </h1>
      </FadeIn>

      {/* 副标题 */}
      <FadeIn delay={60} duration={30}>
        <p style={{
          fontSize: FONT_SIZES.subtitle,
          color: COLORS.feishuBlue,
          margin: 0,
          fontFamily: FONTS.title,
          textAlign: 'center',
        }}>
          完全开源 · 完全免费 · 功能强大
        </p>
      </FadeIn>
    </AbsoluteFill>
  );
};
