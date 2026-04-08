/**
 * 镜头 07：生态介绍 - 小遥搜索集成
 * 时长：18.6秒 (560帧)
 * @module Shot07_EcoIntro
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot07_EcoIntro: React.FC = () => {
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
        导出后的文档可以直接导入小遥搜索
      </h2>

      {/* 帮助界面截图 */}
      <div style={{
        maxWidth: '90%',
        maxHeight: '55%',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
      }}>
        <Img
          src={staticFile('images/04-小遥搜索界面.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* 生态价值 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        marginTop: 25,
      }}>
        <div style={{
          fontSize: FONT_SIZES.subtitle,
          color: COLORS.textPrimary,
          fontFamily: FONTS.title,
        }}>
          导出
        </div>

        <div style={{
          fontSize: 40,
          color: COLORS.dingtalkBlue,
        }}>
          →
        </div>

        <div style={{
          fontSize: FONT_SIZES.subtitle,
          color: COLORS.textPrimary,
          fontFamily: FONTS.title,
        }}>
          备份
        </div>

        <div style={{
          fontSize: 40,
          color: COLORS.dingtalkBlue,
        }}>
          →
        </div>

        <div style={{
          fontSize: FONT_SIZES.subtitle,
          color: COLORS.dingtalkBlue,
          fontWeight: 'bold',
          fontFamily: FONTS.title,
        }}>
          AI 搜索
        </div>
      </div>

      {/* 示例问题 */}
      <p style={{
        fontSize: FONT_SIZES.body,
        color: COLORS.textPrimary,
        margin: '20px 0 0 0',
        fontFamily: FONTS.body,
        textAlign: 'center',
        maxWidth: 1000,
        fontStyle: 'italic',
      }}>
        试试问："我上次写的关于微服务架构的文档在哪？"
        AI 立刻帮你找到。
      </p>

    </AbsoluteFill>
  );
};
