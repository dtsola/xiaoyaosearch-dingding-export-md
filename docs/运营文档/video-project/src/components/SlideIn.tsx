/**
 * SlideIn 滑入动画组件
 * @module SlideIn
 */

import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  distance?: number; // 滑动距离（像素）
  style?: React.CSSProperties;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  duration = 30,
  direction = 'left',
  distance = 100,
  style,
}) => {
  const frame = useCurrentFrame();

  // 根据方向设置起始值
  const getStartValue = () => {
    switch (direction) {
      case 'left': return [-distance, 0];
      case 'right': return [distance, 0];
      case 'top': return [0, -distance];
      case 'bottom': return [0, distance];
    }
  };

  const [from, to] = getStartValue();

  const isHorizontal = direction === 'left' || direction === 'right';

  const value = interpolate(
    frame,
    [delay, delay + duration],
    [from, to],
    { extrapolateRight: 'clamp' }
  );

  const opacity = interpolate(
    frame,
    [delay, delay + duration / 2],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const transformStyle = isHorizontal
    ? { transform: `translateX(${value}px)`, opacity }
    : { transform: `translateY(${value}px)`, opacity };

  return (
    <div style={{ ...transformStyle, ...style }}>
      {children}
    </div>
  );
};
