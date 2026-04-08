/**
 * FadeIn 淡入动画组件
 * @module FadeIn
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number; // 延迟帧数
  duration?: number; // 动画持续帧数
  from?: number; // 起始透明度
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 30,
  from = 0,
  style,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [delay, delay + duration],
    [from, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ opacity, ...style }}>
      {children}
    </div>
  );
};
