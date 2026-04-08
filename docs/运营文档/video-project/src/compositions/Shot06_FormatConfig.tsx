/**
 * 镜头 06：功能展示 - 格式配置
 * 时长：13.9秒 (417帧)
 * @module Shot06_FormatConfig
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot06_FormatConfig: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60,
    }}>

      {/* 标题 */}
      <h2 style={{
        fontSize: FONT_SIZES.title,
        color: COLORS.dingtalkBlue,
        margin: '0 0 30px 0',
        fontFamily: FONTS.title,
        textAlign: 'center',
      }}>
        支持多种格式转换
      </h2>

      {/* 格式列表 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 30,
        marginBottom: 30,
        flexWrap: 'wrap',
      }}>
        {['.docx', '.md', '.pdf', '.xlsx', '.jpg'].map((format) => (
          <div key={format} style={{
            backgroundColor: `${COLORS.dingtalkBlue}15`,
            border: `2px solid ${COLORS.dingtalkBlue}`,
            borderRadius: 12,
            padding: '12px 24px',
            fontFamily: FONTS.mono,
            fontSize: FONT_SIZES.body,
            color: COLORS.dingtalkBlue,
            fontWeight: 'bold',
          }}>
            {format}
          </div>
        ))}
      </div>

      {/* 设置界面截图 */}
      <div style={{
        maxWidth: '90%',
        maxHeight: '50%',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
      }}>
        <Img
          src={staticFile('images/03-设置界面.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* 说明文字 */}
      <p style={{
        fontSize: FONT_SIZES.body,
        color: COLORS.textPrimary,
        margin: '20px 0 0 0',
        fontFamily: FONTS.body,
        textAlign: 'center',
        maxWidth: 1000,
      }}>
        可以在设置中为不同类型的文档设置默认导出格式，满足不同使用场景。
      </p>

    </AbsoluteFill>
  );
};
