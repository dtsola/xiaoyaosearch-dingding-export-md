/**
 * 镜头 03：解决方案标题
 * 时长：10秒
 * @module Shot03_SolutionTitle
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot03_SolutionTitle: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, #000000 0%, #1A1A1A 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>

      {/* 文字标题 */}
      <FadeIn delay={0} duration={20}>
        <div style={{
          fontSize: FONT_SIZES.subtitle,
          color: '#FFFFFF',
          margin: '0 0 40px 0',
          fontFamily: FONTS.title,
          textAlign: 'center',
          opacity: 0.8,
        }}>
          作为一个独立开发者，遇到问题就解决问题。
        </div>
      </FadeIn>

      {/* 主标题 */}
      <FadeIn delay={30} duration={30}>
        <h1 style={{
          fontSize: FONT_SIZES.title,
          fontWeight: 'bold',
          color: COLORS.dingtalkBlue,
          margin: '0 0 40px 0',
          fontFamily: FONTS.title,
          textAlign: 'center',
        }}>
          小遥搜索钉钉导出工具
        </h1>
      </FadeIn>

      {/* 生态图 */}
      <FadeIn delay={90} duration={30}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          marginTop: 40,
        }}>
          <div style={{
            fontSize: FONT_SIZES.body,
            color: '#FFFFFF',
            fontFamily: FONTS.body,
          }}>
            小遥搜索（本地AI搜索）
          </div>

          <div style={{
            fontSize: 48,
            color: COLORS.dingtalkBlue,
          }}>
            ↓
          </div>

          <div style={{
            fontSize: FONT_SIZES.body,
            color: '#FFFFFF',
            fontFamily: FONTS.body,
          }}>
            钉钉导出工具 + 飞书导出工具
          </div>

          <div style={{
            fontSize: 48,
            color: COLORS.dingtalkBlue,
          }}>
            ↓
          </div>

          <div style={{
            fontSize: FONT_SIZES.body,
            color: COLORS.dingtalkBlue,
            fontWeight: 'bold',
            fontFamily: FONTS.body,
          }}>
            核心价值：高效导出 + AI 搜索
          </div>
        </div>
      </FadeIn>

    </AbsoluteFill>
  );
};
