import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli/index.ts'],
  format: ['esm'],
  dts: false, // 暂时禁用类型声明生成
  splitting: false,
  sourcemap: true,
  clean: true,
  shims: true,
  target: 'es2022',
});
