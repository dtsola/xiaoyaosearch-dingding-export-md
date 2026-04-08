/**
 * 镜头 01：背景故事
 * 时长：14.5秒 (436帧)
 * @module Shot01_BackgroundStory
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot01_BackgroundStory: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>

      {/* 逐行出现的文字 */}
      <FadeIn delay={0} duration={20}>
        <p style={{
          fontSize: FONT_SIZES.body,
          fontWeight: 'normal',
          color: '#FFFFFF',
          margin: '0 0 30px 0',
          fontFamily: FONTS.body,
          textAlign: 'center',
        }}>
          大家好，我是 <span style={{ color: COLORS.dingtalkBlue, fontWeight: 'bold' }}>dtsola</span>，一个独立开发者。
        </p>
      </FadeIn>

      <FadeIn delay={120} duration={30}>
        <p style={{
          fontSize: FONT_SIZES.body,
          fontWeight: 'normal',
          color: '#FFFFFF',
          margin: '0 0 30px 0',
          fontFamily: FONTS.body,
          textAlign: 'center',
        }}>
          我开发了"小遥搜索"——本地 AI 搜索工具，<br />
          已获得 1000+ GitHub Stars。
        </p>
      </FadeIn>

      <FadeIn delay={280} duration={40}>
        <p style={{
          fontSize: FONT_SIZES.body,
          fontWeight: 'bold',
          color: COLORS.dingtalkBlue,
          margin: 0,
          fontFamily: FONTS.body,
          textAlign: 'center',
        }}>
          "能搜索钉钉文档吗？我的技术文档都在钉钉上。"
        </p>
      </FadeIn>

    </AbsoluteFill>
  );
};
