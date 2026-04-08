/**
 * 镜头 05：功能展示 - 批量导出
 * 时长：20秒
 * @module Shot05_BatchExport
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot05_BatchExport: React.FC = () => {
  const frame = useCurrentFrame();

  // 第一张截图显示到第300帧（10秒）
  const showSecondImage = frame >= 300;
  const firstImageOpacity = showSecondImage ? interpolate(frame, [270, 300], [1, 0]) : 1;
  const secondImageOpacity = showSecondImage ? interpolate(frame, [300, 330], [0, 1]) : 0;

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
          支持单个文档导出、批量文档导出、文件夹递归导出
        </h2>
      </FadeIn>

      {/* 批量导出截图 */}
      <div style={{ position: 'relative', width: 1200 }}>
        {/* 第一张截图 - 批量选择 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          opacity: firstImageOpacity,
        }}>
          <Img
            src={staticFile('../../../../产品文档/产品截图/02-批量导出.png')}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 20,
              boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
            }}
          />
        </div>

        {/* 第二张截图 - 进度显示 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          opacity: secondImageOpacity,
        }}>
          <Img
            src={staticFile('../../../../产品文档/产品截图/02-批量导出-进度.png')}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 20,
              boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
            }}
          />
        </div>
      </div>

      {/* 说明文字 */}
      <FadeIn delay={60} duration={20}>
        <p style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textPrimary,
          margin: '40px 0 0 0',
          fontFamily: FONTS.body,
          textAlign: 'center',
          maxWidth: 1000,
        }}>
          勾选多个文档或文件夹，点击"下载选中"即可批量导出。<br />
          导出过程中会显示实时进度，让你清楚知道当前状态。
        </p>
      </FadeIn>

      {/* 效率提示 */}
      <FadeIn delay={150} duration={20}>
        <div style={{
          fontSize: FONT_SIZES.heading,
          color: COLORS.successGreen,
          fontWeight: 'bold',
          fontFamily: FONTS.title,
          textAlign: 'center',
          marginTop: 30,
        }}>
          100篇文档，5分钟搞定！
        </div>
      </FadeIn>

      {/* 右侧文字卡片 */}
      <FadeIn delay={180} duration={20}>
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
            批量导出效率极高
          </div>
        </div>
      </FadeIn>

    </AbsoluteFill>
  );
};
