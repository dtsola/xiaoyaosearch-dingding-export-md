/**
 * 镜头 04：功能与场景
 * 时长：30秒
 * @module Shot04_FeaturesAndScenes
 */

import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FadeIn } from '../components';
import { COLORS, FONTS } from './utils/constants';

// 精简为核心功能，只保留最重要的5个
const features = [
  { icon: '📄', title: '单个文档导出' },
  { icon: '📚', title: '完整知识库导出' },
  { icon: '⚡', title: '批量导出' },
  { icon: '🖼️', title: '自动下载图片附件' },
  { icon: '🔄', title: '增量导出' },
];

const scenarios = [
  { icon: '👨‍💻', title: '知识管理爱好者', desc: '备份珍贵文档' },
  { icon: '💼', title: '自由职业者', desc: '迁移到 Obsidian/Logseq' },
  { icon: '🏢', title: '创业团队 IT', desc: '企业知识库备份' },
  { icon: '📝', title: '技术文档维护', desc: '导出到 Git 仓库' },
  { icon: '🚀', title: 'DevOps 工程师', desc: '集成定时任务' },
  { icon: '🎓', title: '学生用户', desc: '跨平台使用' },
];

export const Shot04_FeaturesAndScenes: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bgPrimary,
      padding: '60px 80px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 核心功能 - 上半部分 */}
      <div style={{ marginBottom: 50 }}>
        <FadeIn delay={0} duration={20}>
          <h2 style={{
            fontSize: 40,
            color: COLORS.feishuBlue,
            marginBottom: 30,
            fontFamily: FONTS.title,
            textAlign: 'center',
          }}>
            核心功能
          </h2>
        </FadeIn>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 30,
        }}>
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 10} duration={20}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: COLORS.bgSecondary,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: '15px 25px',
              }}>
                <span style={{ fontSize: 32 }}>
                  {feature.icon}
                </span>
                <span style={{
                  fontSize: 22,
                  color: COLORS.textPrimary,
                  fontFamily: FONTS.body,
                }}>
                  {feature.title}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* 适用场景 - 下半部分 */}
      <div>
        <FadeIn delay={60} duration={20}>
          <h2 style={{
            fontSize: 40,
            color: COLORS.feishuBlue,
            marginBottom: 30,
            fontFamily: FONTS.title,
            textAlign: 'center',
          }}>
            适用场景
          </h2>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 30,
        }}>
          {scenarios.map((scenario, index) => (
            <FadeIn key={index} delay={70 + index * 10} duration={20}>
              <div style={{
                backgroundColor: COLORS.bgSecondary,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: 25,
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 36,
                  marginBottom: 8,
                }}>
                  {scenario.icon}
                </div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: COLORS.textPrimary,
                  marginBottom: 6,
                  fontFamily: FONTS.title,
                }}>
                  {scenario.title}
                </div>
                <div style={{
                  fontSize: 16,
                  color: COLORS.textSecondary,
                  fontFamily: FONTS.body,
                }}>
                  {scenario.desc}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
