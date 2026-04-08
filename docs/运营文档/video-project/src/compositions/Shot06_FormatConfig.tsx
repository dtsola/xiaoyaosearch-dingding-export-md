/**
 * 镜头 06：功能展示 - 格式配置
 * 时长：10秒
 * @module Shot06_FormatConfig
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot06_FormatConfig: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 80,
    }}>

      {/* 标题 */}
      <FadeIn delay={0} duration={20}>
        <h2 style={{
          fontSize: FONT_SIZES.title,
          color: COLORS.dingtalkBlue,
          margin: '0 0 40px 0',
          fontFamily: FONTS.title,
          textAlign: 'center',
        }}>
          支持多种格式转换
        </h2>
      </FadeIn>

      {/* 格式列表 */}
      <FadeIn delay={30} duration={20}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          marginBottom: 50,
        }}>
          {['.docx', '.md', '.pdf', '.xlsx', '.jpg'].map((format, index) => (
            <div key={format} style={{
              backgroundColor: `${COLORS.dingtalkBlue}15`,
              border: `2px solid ${COLORS.dingtalkBlue}`,
              borderRadius: 12,
              padding: '15px 30px',
              fontFamily: FONTS.mono,
              fontSize: FONT_SIZES.body,
              color: COLORS.dingtalkBlue,
              fontWeight: 'bold',
            }}>
              {format}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* 设置界面截图 */}
      <FadeIn delay={60} duration={30}>
        <div style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
        }}>
          <Img
            src={staticFile('../../../../产品文档/产品截图/03-设置界面.png')}
            style={{
              width: 1000,
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </FadeIn>

      {/* 说明文字 */}
      <FadeIn delay={120} duration={20}>
        <p style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textPrimary,
          margin: '40px 0 0 0',
          fontFamily: FONTS.body,
          textAlign: 'center',
          maxWidth: 1000,
        }}>
          可以在设置中为不同类型的文档设置默认导出格式，<br />
          满足不同使用场景。
        </p>
      </FadeIn>

      {/* 右侧文字卡片 */}
      <FadeIn delay={150} duration={20}>
        <div style={{
          position: 'absolute',
          right: 100,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: `${COLORS.dingtalkBlue}20`,
          border: `2px solid ${COLORS.dingtalkBlue}`,
          borderRadius: 12,
          padding: '20px 30px',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            fontSize: FONT_SIZES.heading,
            color: COLORS.dingtalkBlue,
            fontWeight: 'bold',
            fontFamily: FONTS.title,
          }}>
            自定义导出格式
          </div>
        </div>
      </FadeIn>

    </AbsoluteFill>
  );
};
