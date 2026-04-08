/**
 * 镜头 08：演示 - 批量导出
 * 时长：13秒
 * @module Shot08_BatchExport
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot08_BatchExport: React.FC = () => {
  const frame = useCurrentFrame();

  // 进度条动画
  const progress = interpolate(
    frame,
    [30, 120],
    [0, 100],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>
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
          <FadeIn delay={0} duration={20}>
            <div style={{
              backgroundColor: '#000',
              borderRadius: 12,
              padding: 30,
              fontFamily: FONTS.mono,
              fontSize: FONT_SIZES.code,
              color: '#fff',
            }}>
              <div style={{ color: '#2EA043', marginBottom: 15 }}>
                $ feishu-export docs --file docs.txt
              </div>
              <div style={{ color: '#58A6FF', marginBottom: 15 }}>
                ⏳ 正在批量导出文档...
              </div>
              {/* 进度条 */}
              <div style={{
                backgroundColor: '#30363D',
                borderRadius: 4,
                height: 20,
                overflow: 'hidden',
                marginBottom: 15,
              }}>
                <div style={{
                  backgroundColor: '#2EA043',
                  height: '100%',
                  width: `${progress}%`,
                }} />
              </div>
              <div style={{ color: '#58A6FF', marginBottom: 15 }}>
                █████████████████████████████████ {Math.round(progress)}%
              </div>
              <div style={{ color: '#2EA043' }}>
                ✅ 已导出 50 个文档
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 右侧：说明卡片 */}
        <div style={{ flex: 0.4 }}>
          <FadeIn delay={30} duration={20}>
            <div style={{
              backgroundColor: COLORS.bgSecondary,
              border: `2px solid ${COLORS.feishuBlue}`,
              borderRadius: 16,
              padding: 30,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 48,
                marginBottom: 15,
              }}>
                📚
              </div>
              <div style={{
                fontSize: FONT_SIZES.heading,
                color: COLORS.textPrimary,
                fontFamily: FONTS.title,
                marginBottom: 10,
              }}>
                批量导出
              </div>
              <div style={{
                fontSize: FONT_SIZES.small,
                color: COLORS.textSecondary,
                fontFamily: FONTS.body,
              }}>
                效率极高
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};
