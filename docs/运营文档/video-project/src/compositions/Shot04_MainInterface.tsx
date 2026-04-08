/**
 * 镜头 04：功能展示 - 主界面
 * 时长：13.4秒 (402帧)
 * @module Shot04_MainInterface
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot04_MainInterface: React.FC = () => {
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
        这是一个完全开源、免费的浏览器扩展插件
      </h2>

      {/* 主界面截图 */}
      <div style={{
        maxWidth: '90%',
        maxHeight: '70%',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
      }}>
        <Img
          src={staticFile('images/01-主界面.png')}
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
        margin: '30px 0 0 0',
        fontFamily: FONTS.body,
        textAlign: 'center',
        maxWidth: 1000,
      }}>
        打开钉钉文档页面，点击插件图标，插件会自动识别当前页面的文档列表，支持勾选导出。
      </p>

    </AbsoluteFill>
  );
};
