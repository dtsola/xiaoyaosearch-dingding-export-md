/**
 * 镜头 08：行动号召 CTA
 * 时长：20.5秒 (617帧)
 * @module Shot08_CTA
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot08_CTA: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${COLORS.bgPrimary} 0%, ${COLORS.bgSecondary} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60,
    }}>

      {/* 标题 */}
      <h1 style={{
        fontSize: FONT_SIZES.title,
        fontWeight: 'bold',
        color: COLORS.dingtalkBlue,
        margin: '0 0 20px 0',
        fontFamily: FONTS.title,
        textAlign: 'center',
      }}>
        小遥搜索钉钉导出工具
      </h1>

      {/* 副标题 */}
      <p style={{
        fontSize: FONT_SIZES.body,
        color: COLORS.textPrimary,
        margin: '0 0 30px 0',
        fontFamily: FONTS.body,
        textAlign: 'center',
      }}>
        生态扩展 · 核心价值
      </p>

      {/* 核心价值 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
        marginBottom: 30,
        flexWrap: 'wrap',
      }}>
        <div style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textPrimary,
          fontFamily: FONTS.body,
        }}>
          <span style={{ fontSize: 28, marginRight: 8 }}>⚡</span>
          高效导出：一键批量导出到本地
        </div>
        <div style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textPrimary,
          fontFamily: FONTS.body,
        }}>
          <span style={{ fontSize: 28, marginRight: 8 }}>🔍</span>
          AI搜索：配合小遥搜索秒级找到
        </div>
      </div>

      {/* GitHub 链接 */}
      <div style={{
        fontSize: FONT_SIZES.body,
        color: COLORS.textAccent,
        fontFamily: FONTS.mono,
        marginBottom: 20,
        textAlign: 'center',
      }}>
        🔗 https://github.com/dtsola/xiaoyaosearch-dingding-export-md
      </div>

      {/* 小遥社区 */}
      <div style={{
        fontSize: FONT_SIZES.body,
        color: COLORS.dingtalkBlue,
        fontFamily: FONTS.body,
        textAlign: 'center',
        marginBottom: 20,
      }}>
        🌐 小遥社区：https://project.xiaoyaosai.com
      </div>

      {/* 二维码和联系方式 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
      }}>
        {/* 二维码 - 自适应显示 */}
        <Img
          src={staticFile('images/加入-用户交流群.png')}
          style={{
            width: 'auto',
            height: 'auto',
            maxHeight: 500,
            maxWidth: '80%',
            border: `3px solid ${COLORS.dingtalkBlue}`,
            borderRadius: 16,
            boxShadow: `0 10px 40px ${COLORS.dingtalkBlue}30`,
            objectFit: 'contain',
          }}
        />

        {/* 二维码说明 */}
        <div style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textPrimary,
          fontFamily: FONTS.body,
          textAlign: 'center',
        }}>
          扫码加入用户交流群
        </div>
      </div>

      {/* Star 提示 */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        fontSize: FONT_SIZES.body,
        color: COLORS.dingtalkBlue,
        fontFamily: FONTS.title,
        textAlign: 'center',
      }}>
        ⭐ 欢迎给两个项目点 Star 支持独立开发
      </div>

    </AbsoluteFill>
  );
};
