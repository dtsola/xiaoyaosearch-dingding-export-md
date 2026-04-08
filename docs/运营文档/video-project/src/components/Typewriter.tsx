/**
 * Typewriter 打字机效果组件
 * @module Typewriter
 */

import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface TypewriterProps {
  text: string;
  delay?: number; // 延迟帧数
  speed?: number; // 每字符帧数
  className?: string;
  style?: React.CSSProperties;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  delay = 0,
  speed = 2,
  className = '',
  style,
}) => {
  const frame = useCurrentFrame();

  // 计算当前应该显示多少字符
  const effectiveFrame = Math.max(0, frame - delay);
  const charactersToShow = Math.min(
    Math.floor(effectiveFrame / speed),
    text.length
  );

  return (
    <span className={className} style={style}>
      {text.slice(0, charactersToShow)}
      {charactersToShow < text.length && (
        <span style={{
          animation: 'blink 1s step-end infinite'
        }}>|</span>
      )}
    </span>
  );
};
