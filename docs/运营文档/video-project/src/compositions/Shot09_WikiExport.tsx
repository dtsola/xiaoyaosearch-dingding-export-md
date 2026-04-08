/**
 * 镜头 09：演示 - 知识库导出
 * 时长：12秒
 * @module Shot09_WikiExport
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS, FONT_SIZES } from './utils/constants';

export const Shot09_WikiExport: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 100,
    }}>
      {/* 终端和说明 */}
      <div style={{
        display: 'flex',
        gap: 60,
        alignItems: 'center',
        width: '100%',
        maxWidth: 1400,
      }}>
        {/* 左侧：终端 */}
        <div style={{ flex: 1 }}>
          <FadeIn delay={0} duration={20}>
            <div style={{
              backgroundColor: '#000',
              borderRadius: 12,
              padding: 30,
              fontFamily: FONTS.mono,
              fontSize: FONT_SIZES.code,
              color: '#fff',
            }}>
              <div style={{ color: '#2EA043', marginBottom: 15 }}>
                $ feishu-export wiki wiki_node_token
              </div>
              <div style={{ color: '#58A6FF', marginBottom: 15 }}>
                ⏳ 正在导出知识库...
              </div>
              <div style={{ color: '#2EA043', marginBottom: 15 }}>
                ✅ 知识库已导出到: ./output/知识库名称/
              </div>

              {/* 目录结构示意 */}
              <div style={{ color: '#8B949E', marginTop: 20, fontSize: 16 }}>
                <div>📁 知识库名称/</div>
                <div style={{ paddingLeft: 20 }}>├── 📄 文档1.md</div>
                <div style={{ paddingLeft: 20 }}>├── 📄 文档2.md</div>
                <div style={{ paddingLeft: 20 }}>├── 📁 子文件夹/</div>
                <div style={{ paddingLeft: 40 }}>│   └── 📄 文档3.md</div>
                <div style={{ paddingLeft: 20 }}>└── 🖼️ images/</div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 右侧：说明卡片 */}
        <div style={{ flex: 0.4 }}>
          <FadeIn delay={30} duration={20}>
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
                🗂️
              </div>
              <div style={{
                fontSize: FONT_SIZES.heading,
                color: COLORS.textPrimary,
                fontFamily: FONTS.title,
                marginBottom: 10,
              }}>
                完整知识库
              </div>
              <div style={{
                fontSize: FONT_SIZES.small,
                color: COLORS.textSecondary,
                fontFamily: FONTS.body,
                marginBottom: 20,
              }}>
                一键迁移
              </div>

              {/* GitHub 链接 */}
              <div style={{
                fontSize: FONT_SIZES.small,
                color: COLORS.textAccent,
                fontFamily: FONTS.mono,
                wordBreak: 'break-all',
              }}>
                🔗 github.com/xiaoyaosearch/<br />
                &nbsp;&nbsp;&nbsp;&nbsp;xiaoyaosearch-feishu-export-md
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </AbsoluteFill>
  );
};
