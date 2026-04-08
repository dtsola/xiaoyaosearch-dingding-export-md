/**
 * 镜头 04：功能展示 - 主界面
 * 时长：15秒
 * @module Shot04_MainInterface
 */

import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot04_MainInterface: React.FC = () => {
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
          这是一个完全开源、免费的浏览器扩展插件
        </h2>
      </FadeIn>

      {/* 主界面截图 */}
      <FadeIn delay={30} duration={30}>
        <div style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: `0 20px 60px ${COLORS.dingtalkBlue}30`,
        }}>
          <Img
            src={staticFile('../../../../产品文档/产品截图/01-主界面.png')}
            style={{
              width: 1200,
              height: 'auto',
              display: 'block',
            }}
          />

          {/* 高亮标注 - 文档列表 */}
          <FadeIn delay={90} duration={20}>
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '5%',
              width: '40%',
              height: '60%',
              border: `4px solid ${COLORS.dingtalkBlue}`,
              borderRadius: 10,
              backgroundColor: `${COLORS.dingtalkBlue}10`,
              pointerEvents: 'none',
            }} />
          </FadeIn>
        </div>
      </FadeIn>

      {/* 说明文字 */}
      <FadeIn delay={150} duration={20}>
        <p style={{
          fontSize: FONT_SIZES.body,
          color: COLORS.textPrimary,
          margin: '40px 0 0 0',
          fontFamily: FONTS.body,
          textAlign: 'center',
          maxWidth: 1000,
        }}>
          打开钉钉文档页面，点击插件图标，<br />
          插件会自动识别当前页面的文档列表，支持勾选导出。
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
            打开插件自动加载文档列表
          </div>
        </div>
      </FadeIn>

    </AbsoluteFill>
  );
};
