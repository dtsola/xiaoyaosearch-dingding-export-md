/**
 * CodeBlock 代码块组件
 * @module CodeBlock
 */

import React from 'react';
import { COLORS, FONTS, FONT_SIZES } from '../compositions/utils/constants';

export interface CodeBlockProps {
  children: string;
  style?: React.CSSProperties;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  style,
}) => {
  return (
    <div style={{
      backgroundColor: COLORS.bgSecondary,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: 20,
      fontFamily: FONTS.mono,
      fontSize: FONT_SIZES.code,
      color: COLORS.textPrimary,
      overflow: 'auto',
      whiteSpace: 'pre',
      ...style,
    }}>
      <code>{children}</code>
    </div>
  );
};
