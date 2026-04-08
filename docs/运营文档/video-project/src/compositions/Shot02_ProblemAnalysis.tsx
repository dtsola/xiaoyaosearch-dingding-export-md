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
  { icon: '❌', title: '云端无法访问', desc: '钉钉文档在云端，AI 无法直接访问' },
  { icon: '❌', title: '官方只能一篇篇导出', desc: '不支持批量操作' },
  { icon: '❌', title: '300篇文档需要一整天', desc: '手动效率极低' },
];

export const Shot02_ProblemAnalysis: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: '#000000',
      padding: 100,
    }}>
      {/* 标题 */}
      <FadeIn delay={0} duration={30}>
        <div style={{
          fontSize: FONT_SIZES.title,
          color: '#FFFFFF',
          marginBottom: 80,
          textAlign: 'center',
          fontFamily: FONTS.title,
        }}>
          我调研了一下，发现问题：
        </div>
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
          <FadeIn key={index} delay={30 + index * 30} duration={30}>
            <div style={{
              backgroundColor: '#1A1A1A',
              border: `2px solid ${COLORS.dingtalkBlue}`,
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
                color: '#FFFFFF',
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

      {/* 底部问题 */}
      <FadeIn delay={180} duration={30}>
        <p style={{
          fontSize: FONT_SIZES.heading,
          color: COLORS.dingtalkBlue,
          textAlign: 'center',
          marginTop: 80,
          fontFamily: FONTS.body,
        }}>
          所以问题变成了：<br />
          如何高效地把钉钉文档导出到本地，<br />
          然后配合小遥搜索实现 AI 搜索？
        </p>
      </FadeIn>
    </AbsoluteFill>
  );
};
