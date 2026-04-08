/**
 * 镜头 10：行动号召 CTA
 * 时长：15秒
 * @module Shot10_CTA
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot10_CTA: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>
      {/* 产品 Logo */}
      <FadeIn delay={0} duration={30}>
        <Img
          src={staticFile('images/logo.png')}
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            marginBottom: 50,
            boxShadow: `0 20px 60px ${COLORS.feishuBlue}40`,
          }}
        />
      </FadeIn>

      {/* 产品名称 */}
      <FadeIn delay={30} duration={30}>
        <h1 style={{
          fontSize: FONT_SIZES.title,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          margin: '0 0 50px 0',
          fontFamily: FONTS.title,
          textAlign: 'center',
        }}>
          小遥搜索飞书导出工具
        </h1>
      </FadeIn>

      {/* GitHub 链接 */}
      <FadeIn delay={60} duration={20}>
        <div style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textAccent,
          fontFamily: FONTS.mono,
          marginBottom: 60,
          textAlign: 'center',
        }}>
          🔗 https://github.com/xiaoyaosearch/<br />
          &nbsp;&nbsp;&nbsp;&nbsp;xiaoyaosearch-feishu-export-md
        </div>
      </FadeIn>

      {/* 二维码和联系方式 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        marginBottom: 60,
      }}>
        {/* 二维码 */}
        <FadeIn delay={90} duration={20}>
          <Img
            src={staticFile('images/qr-code.png')}
            style={{
              width: 180,
              height: 180,
              border: `2px solid ${COLORS.border}`,
              borderRadius: 12,
            }}
          />
        </FadeIn>

        {/* 联系方式 */}
        <FadeIn delay={110} duration={20}>
          <div style={{
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: FONT_SIZES.heading,
              color: COLORS.textPrimary,
              fontFamily: FONTS.title,
              marginBottom: 15,
            }}>
              微信：dtsola
            </div>
            <div style={{
              fontSize: FONT_SIZES.body,
              color: COLORS.textSecondary,
              fontFamily: FONTS.body,
            }}>
              欢迎交流反馈
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 行动号召 */}
      <FadeIn delay={150} duration={20}>
        <div style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.feishuBlue,
          fontFamily: FONTS.title,
          textAlign: 'center',
        }}>
          ⭐ Star 支持独立开发
        </div>
      </FadeIn>

      {/* 结束语 */}
      <FadeIn delay={180} duration={20}>
        <div style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textSecondary,
          fontFamily: FONTS.body,
          textAlign: 'center',
          marginTop: 30,
        }}>
          我是 dtsola，我们下期见！
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};
