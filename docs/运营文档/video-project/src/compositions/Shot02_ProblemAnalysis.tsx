/**
 * 镜头 02：问题分析
 * 时长：20秒
 * @module Shot02_ProblemAnalysis
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

const problems = [
  { icon: '❌', title: '无法批量导出', desc: '需要逐个手动导出文档' },
  { icon: '❌', title: '格式丢失', desc: '导出后排版和图片失效' },
  { icon: '❌', title: '收费昂贵', desc: '第三方工具价格不菲' },
];

export const Shot02_ProblemAnalysis: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      padding: 100,
    }}>
      {/* 标题 */}
      <FadeIn delay={0} duration={30}>
        <h2 style={{
          fontSize: FONT_SIZES.title,
          color: COLORS.errorRed,
          marginBottom: 80,
          textAlign: 'center',
          fontFamily: FONTS.title,
        }}>
          你是否也遇到过这些问题？
        </h2>
      </FadeIn>

      {/* 问题卡片列表 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        maxWidth: 1600,
        margin: '0 auto',
      }}>
        {problems.map((problem, index) => (
          <FadeIn key={index} delay={index * 30} duration={30}>
            <div style={{
              backgroundColor: COLORS.bgSecondary,
              border: `2px solid ${COLORS.border}`,
              borderRadius: 20,
              padding: 40,
              textAlign: 'center',
              minWidth: 350,
            }}>
              {/* 图标 */}
              <div style={{
                fontSize: 64,
                marginBottom: 20,
              }}>
                {problem.icon}
              </div>

              {/* 标题 */}
              <h3 style={{
                fontSize: FONT_SIZES.heading,
                color: COLORS.textPrimary,
                margin: '0 0 15px 0',
                fontFamily: FONTS.title,
              }}>
                {problem.title}
              </h3>

              {/* 描述 */}
              <p style={{
                fontSize: FONT_SIZES.body,
                color: COLORS.textSecondary,
                margin: 0,
                fontFamily: FONTS.body,
              }}>
                {problem.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* 底部提示 */}
      <FadeIn delay={150} duration={30}>
        <p style={{
          fontSize: FONT_SIZES.small,
          color: COLORS.textAccent,
          textAlign: 'center',
          marginTop: 80,
          fontFamily: FONTS.body,
        }}>
          这些痛点让我意识到：需要一个真正好用的飞书导出解决方案
        </p>
      </FadeIn>
    </AbsoluteFill>
  );
};
