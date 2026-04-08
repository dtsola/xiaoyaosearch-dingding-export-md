/**
 * 镜头 07：演示 - 单文档导出
 * 时长：10秒
 * @module Shot07_SingleDoc
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot07_SingleDoc: React.FC = () => {
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
          第 3 步：导出文档
        </div>
      </FadeIn>

      {/* 终端和说明 */}
      <div style={{
        display: 'flex',
        gap: 60,
        alignItems: 'center',
        width: '100%',
        maxWidth: 1400,
      }}>
        {/* 左侧：终端 */}
        <div style={{ flex: 1 }}>
          <FadeIn delay={20} duration={20}>
            <div style={{
              backgroundColor: '#000',
              borderRadius: 12,
              padding: 30,
              fontFamily: FONTS.mono,
              fontSize: FONT_SIZES.code,
              color: '#fff',
            }}>
              <div style={{ color: '#2EA043', marginBottom: 15 }}>
                $ feishu-export doc doxcnXXXXXXXX
              </div>
              <div style={{ color: '#58A6FF', marginBottom: 15 }}>
                ⏳ 正在导出文档...
              </div>
              <div style={{ color: '#2EA043' }}>
                ✅ 文档已导出到: ./output/文档标题.md
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 右侧：说明卡片 */}
        <div style={{ flex: 0.4 }}>
          <FadeIn delay={60} duration={20}>
            <div style={{
              backgroundColor: COLORS.bgSecondary,
              border: `2px solid ${COLORS.successGreen}`,
              borderRadius: 16,
              padding: 30,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 48,
                marginBottom: 15,
              }}>
                📄
              </div>
              <div style={{
                fontSize: FONT_SIZES.heading,
                color: COLORS.textPrimary,
                fontFamily: FONTS.title,
                marginBottom: 10,
              }}>
                单个文档
              </div>
              <div style={{
                fontSize: FONT_SIZES.small,
                color: COLORS.textSecondary,
                fontFamily: FONTS.body,
              }}>
                一键导出
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};
