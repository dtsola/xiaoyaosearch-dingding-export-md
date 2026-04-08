/**
 * 镜头 07：生态介绍 - 小遥搜索集成
 * 时长：10秒
 * @module Shot07_EcoIntro
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot07_EcoIntro: React.FC = () => {
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
          导出后的文档可以直接导入小遥搜索
        </h2>
      </FadeIn>

      {/* 帮助界面截图 */}
      <FadeIn delay={30} duration={30}>
        <div style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
        }}>
          <Img
            src={staticFile('../../../../产品文档/产品截图/04-帮助界面.png')}
            style={{
              width: 1000,
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </FadeIn>

      {/* 生态价值 */}
      <FadeIn delay={90} duration={30}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 30,
          marginTop: 50,
        }}>
          <div style={{
            fontSize: FONT_SIZES.subtitle,
            color: COLORS.textPrimary,
            fontFamily: FONTS.title,
          }}>
            导出
          </div>

          <div style={{
            fontSize: 48,
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
            fontSize: 48,
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
      </FadeIn>

      {/* 示例问题 */}
      <FadeIn delay={150} duration={20}>
        <p style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textPrimary,
          margin: '40px 0 0 0',
          fontFamily: FONTS.body,
          textAlign: 'center',
          maxWidth: 1000,
          fontStyle: 'italic',
        }}>
          试试问："我上次写的关于微服务架构的文档在哪？"<br />
          AI 立刻帮你找到。
        </p>
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
            这就是小遥搜索生态的价值
          </div>
        </div>
      </FadeIn>

    </AbsoluteFill>
  );
};
