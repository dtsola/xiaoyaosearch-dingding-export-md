import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'content': 'src/content/index.js',
        'popup': 'src/popup/index.html'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Content Script 输出为 content.js
          if (chunkInfo.name === 'content') {
            return 'content.js';
          }
          return '[name].js';
        },
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  }
});
