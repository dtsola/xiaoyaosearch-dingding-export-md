const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const manifestPath = path.join(distDir, 'manifest.json');
const assetsDir = path.join(distDir, 'assets');

// 复制 background.js 到 dist 根目录
const bgSrc = path.resolve(__dirname, '../src/background.js');
const bgDest = path.join(distDir, 'background.js');
fs.copyFileSync(bgSrc, bgDest);

// 读取 manifest
let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// 添加 background service worker 配置
manifest.background = {
  service_worker: 'background.js'
};

// 获取 assets 目录中的文件
const jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));

if (jsFiles.length === 0 || cssFiles.length === 0) {
  console.error('No assets found!');
  process.exit(1);
}

// 找到 content script 文件（排除 background 相关的）
const contentJs = jsFiles.find(f => !f.includes('background') && !f.includes('service-worker'));
const contentCss = cssFiles[0];

// 添加 content_scripts 配置（声明实际文件，但通过 background 控制何时执行）
manifest.content_scripts = [{
  matches: [
    'https://alidocs.dingtalk.com/*',
    'https://docs.dingtalk.com/*'
  ],
  js: [`assets/${contentJs}`],
  css: [`assets/${contentCss}`],
  run_at: 'document_idle'
}];

// 写回 manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ Manifest fixed!');
console.log(`Background: background.js`);
console.log(`Content JS: assets/${contentJs}`);
console.log(`Content CSS: assets/${contentCss}`);
