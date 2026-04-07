/**
 * 文件工具函数
 */

/**
 * 获取文件扩展名
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

/**
 * 更改文件扩展名
 */
export function changeExtension(filename: string, newExt: string): string {
  const parts = filename.split('.');
  if (parts.length > 1) {
    parts[parts.length - 1] = newExt;
    return parts.join('.');
  }
  return filename + '.' + newExt;
}

/**
 * 生成安全的文件名
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[<>:"/\\|?*]/g, '') // 移除不安全字符
    .replace(/\s+/g, '_') // 空格替换为下划线
    .substring(0, 200); // 限制长度
}

/**
 * 处理文件名冲突
 */
export function resolveDuplicateFilename(
  existingFiles: string[],
  filename: string,
  maxAttempts = 100
): string {
  if (!existingFiles.includes(filename)) {
    return filename;
  }

  const lastDotIndex = filename.lastIndexOf('.');
  let nameWithoutExt: string;
  let ext: string;

  if (lastDotIndex !== -1) {
    nameWithoutExt = filename.substring(0, lastDotIndex);
    ext = filename.substring(lastDotIndex);
  } else {
    nameWithoutExt = filename;
    ext = '';
  }

  for (let i = 1; i < maxAttempts; i++) {
    const newFilename = `${nameWithoutExt} (${i})${ext}`;
    if (!existingFiles.includes(newFilename)) {
      return newFilename;
    }
  }

  // 如果还是冲突，返回带时间戳的文件名
  return `${nameWithoutExt}_${Date.now()}${ext}`;
}

/**
 * 触发浏览器下载
 */
export function triggerDownload(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 下载文本内容为文件
 */
export function downloadText(content: string, filename: string, mimeType = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);

  // 延迟释放 URL
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 从 URL 获取文件名
 */
export function getFilenameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    return filename || 'download';
  } catch {
    return 'download';
  }
}

/**
 * 检查是否为图片文件
 */
export function isImageFile(filename: string): boolean {
  const ext = getFileExtension(filename).toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext);
}

/**
 * 检查是否为 PDF 文件
 */
export function isPdfFile(filename: string): boolean {
  return getFileExtension(filename).toLowerCase() === 'pdf';
}

/**
 * 获取文件图标
 */
export function getFileIcon(filename: string): string {
  const ext = getFileExtension(filename).toLowerCase();

  const iconMap: Record<string, string> = {
    // 文档
    md: '📝',
    doc: '📄',
    docx: '📄',
    pdf: '📕',

    // 表格
    xls: '📊',
    xlsx: '📊',
    csv: '📊',

    // 图片
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    svg: '🖼️',

    // 代码
    js: '📜',
    ts: '📜',
    html: '🌐',
    css: '🎨',
    json: '📋',

    // 压缩
    zip: '📦',
    rar: '📦',
    '7z': '📦',

    // 文件夹
    '': '📁',
  };

  return iconMap[ext] || '📄';
}
