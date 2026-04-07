import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json' with { type: 'json' };

export default defineConfig({
  plugins: [
    crx({
      manifest,
      contentScripts: {
        injectCss: true,
      },
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        content: 'src/content.js',
      },
    },
  },

  css: {
    postcss: './postcss.config.js',
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
