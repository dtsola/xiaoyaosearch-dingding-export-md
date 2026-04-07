import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import manifest from './src/manifest.json' with { type: 'json' };

export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest, contentScripts: { injectCss: true } }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'pinia'],
          'utils': ['@vueuse/core'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@sidepanel': '/src/sidepanel',
      '@content': '/src/content',
      '@shared': '/src/shared',
      '@background': '/src/background',
      '@popup': '/src/popup',
    },
  },
});
