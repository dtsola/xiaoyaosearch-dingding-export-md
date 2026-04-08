/**
 * 镜头 05：功能展示 - 批量导出
 * 时长：19秒 (570帧)
 * @module Shot05_BatchExport
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot05_BatchExport: React.FC = () => {
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
        支持单个文档导出、批量文档导出、文件夹递归导出
      </h2>

      {/* 批量导出截图 */}
      <div style={{
        maxWidth: '90%',
        maxHeight: '60%',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
      }}>
        <Img
          src={staticFile('images/02-批量导出-进度.png')}
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
        margin: '20px 0 10px 0',
        fontFamily: FONTS.body,
        textAlign: 'center',
        maxWidth: 1000,
      }}>
        勾选多个文档或文件夹，点击"下载选中"即可批量导出。
        导出过程中会显示实时进度，让你清楚知道当前状态。
      </p>

      {/* 效率提示 */}
      <div style={{
        fontSize: FONT_SIZES.heading,
        color: COLORS.successGreen,
        fontWeight: 'bold',
        fontFamily: FONTS.title,
        textAlign: 'center',
      }}>
        100篇文档，5分钟搞定！
      </div>

    </AbsoluteFill>
  );
};
