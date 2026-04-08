/**
 * 镜头 06：演示 - 初始化
 * 时长：15秒
 * @module Shot06_Init
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot06_Init: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>
      {/* 步骤标题 */}
      <FadeIn delay={0} duration={20}>
        <div style={{
          fontSize: FONT_SIZES.heading,
          color: COLORS.textAccent,
          marginBottom: 40,
          fontFamily: FONTS.title,
        }}>
          第 2 步：初始化配置
        </div>
      </FadeIn>

      {/* 终端模拟 */}
      <div style={{
        display: 'flex',
        gap: 60,
        alignItems: 'center',
        width: '100%',
        maxWidth: 1400,
      }}>
        {/* 左侧：终端 */}
        <div style={{ flex: 1 }}>
          <FadeIn delay={20} duration={20}>
            <div style={{
              backgroundColor: '#000',
              borderRadius: 12,
              padding: 30,
              fontFamily: FONTS.mono,
              fontSize: FONT_SIZES.code,
              color: '#fff',
            }}>
              <div style={{ color: '#2EA043', marginBottom: 15 }}>
                $ feishu-export init
              </div>
              <div style={{ color: '#58A6FF', marginBottom: 15 }}>
                ? 请输入飞书应用的 App ID: <span style={{ color: '#FFA657' }}>cli_xxxxxxxxx</span>
              </div>
              <div style={{ color: '#58A6FF', marginBottom: 15 }}>
                ? 请输入飞书应用的 App Secret: <span style={{ color: '#8B949E' }}>**********</span>
              </div>
              <div style={{ color: '#58A6FF', marginBottom: 15 }}>
                ? 请输入默认输出目录: <span style={{ color: '#FFA657' }}>./output</span>
              </div>
              <div style={{ color: '#2EA043' }}>
                ✅ 配置已保存到 ~/.feishu-export/config.json
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 右侧：说明卡片 */}
        <div style={{ flex: 0.4 }}>
          <FadeIn delay={60} duration={20}>
            <div style={{
              backgroundColor: COLORS.bgSecondary,
              border: `2px solid ${COLORS.feishuBlue}`,
              borderRadius: 16,
              padding: 30,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 48,
                marginBottom: 15,
              }}>
                ⚙️
              </div>
              <div style={{
                fontSize: FONT_SIZES.heading,
                color: COLORS.textPrimary,
                fontFamily: FONTS.title,
                marginBottom: 10,
              }}>
                交互式配置向导
              </div>
              <div style={{
                fontSize: FONT_SIZES.small,
                color: COLORS.textSecondary,
                fontFamily: FONTS.body,
              }}>
                只需3步完成配置
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};
