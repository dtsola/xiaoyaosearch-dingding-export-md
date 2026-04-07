import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  // 构建配置
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

  // 开发服务器配置
  server: {
    port: 56860,
    open: true,
    hmr: true,
  },

  // CSS 配置
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true,
  },

  // 环境变量定义
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
