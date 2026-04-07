const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const manifestPath = path.join(distDir, 'manifest.json');
const assetsDir = path.join(distDir, 'assets');

// 读取 manifest
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// 获取 assets 目录中的文件
const jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));

if (jsFiles.length === 0 || cssFiles.length === 0) {
  console.error('No assets found!');
  process.exit(1);
}

// 更新 content_scripts
manifest.content_scripts = [{
  matches: [
    'https://alidocs.dingtalk.com/*',
    'https://docs.dingtalk.com/*'
  ],
  js: [`assets/${jsFiles[0]}`],
  css: [`assets/${cssFiles[0]}`],
  run_at: 'document_idle'
}];

// 写回 manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ Manifest fixed!');
console.log(`JS: assets/${jsFiles[0]}`);
console.log(`CSS: assets/${cssFiles[0]}`);
