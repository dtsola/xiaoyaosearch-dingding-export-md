import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  // 开发模式 - 构建书签脚本
  if (mode === 'development') {
    return {
      build: {
        lib: {
          entry: 'src/app.js',
          name: 'DingDocDownloader',
          formats: ['iife'],
          fileName: 'bookmarklet',
        },
        outDir: 'dev-bookmarklet',
        emptyOutDir: true,
        target: 'es2015',
        rollupOptions: {
          output: {
            inlineDynamicImports: true,
          },
        },
      },
      server: {
        port: 56860,
        open: true,
        hmr: true,
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Cross-Origin-Resource-Policy': 'cross-origin',
          'Cross-Origin-Embedder-Policy': 'credentialless',
        },
      },
      css: {
        postcss: './postcss.config.js',
        devSourcemap: true,
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(mode),
      },
      optimizeDeps: {
        include: [],
      },
    };
  }

  // 生产模式 - 标准构建
  return {
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2015',
      rollupOptions: {
        output: {
          format: 'iife',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    server: {
      port: 56860,
      open: true,
      hmr: true,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Cross-Origin-Embedder-Policy': 'credentialless',
      },
    },
    css: {
      postcss: './postcss.config.js',
      devSourcemap: true,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    optimizeDeps: {
      include: [],
    },
  };
});
