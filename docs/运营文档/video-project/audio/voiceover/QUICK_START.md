# 一键生成配音 - 快速指南

## 🎙️ 最快方法（3分钟完成）

### 使用 TTSMaker.com 生成完整配音

#### 步骤 1：访问网站

打开浏览器，访问：https://ttsmaker.com/

#### 步骤 2：配置语音

1. Language: 选择 **Chinese** (中文)
2. Voice: 选择 **Microsoft Xiaoxiao Neural** (女声) 或 **Microsoft Yunxi Neural** (男声)
3. Speed: 保持默认（1.0x）

#### 步骤 3：生成音频

1. 将下方完整配音文本复制到文本框
2. 点击 **"Convert to MP3"** 按钮
3. 等待处理完成
4. 下载 MP3 文件

#### 完整配音文本（直接复制）

```
大家好，我是 dtsola，一个独立开发者。前段时间，我朋友遇到了一个很头疼的问题：他在飞书上整理了数百篇技术文档，但因为工作变动需要离职，想把所有文档导出到本地，却发现飞书官方的导出功能并不完善。市面上的导出工具要么收费昂贵，要么功能有限：不能批量导出、无法保持目录结构、图片和附件下载失败、格式转换后丢失排版。这些痛点让我意识到：需要一个真正好用的飞书导出解决方案。所以我开发了"小遥搜索飞书导出工具"。这是一个完全开源、免费的 CLI 工具，专为飞书用户设计。核心功能包括：单个文档导出、完整知识库导出、批量导出、自动下载图片附件、增量导出。这个工具非常适合：知识管理爱好者备份文档、自由职业者迁移笔记、创业团队做知识库备份、技术文档维护者导出 Git、DevOps 工程师集成定时任务、以及学生用户跨平台使用。使用非常简单，只需3步。第一步，安装工具。完全开源免费，支持 Windows、macOS 和 Linux。只需运行：npm install -g xiaoyaosearch-feishu-export。第二步，运行 feishu-export init，通过交互式向导快速配置飞书应用信息。第三步，使用 feishu-export doc 加上文档 ID，就能导出单个文档。如果需要批量导出，准备一个文档 ID 列表文件，运行 feishu-export docs --file。要导出整个知识库，只需运行 feishu-export wiki 加上知识库 ID。所有文档都会转换为标准的 Markdown 格式，图片和附件自动下载，目录结构完美保持。详细使用文档和源码，请访问：github.com/xiaoyaosearch/xiaoyaosearch-feishu-export-md。工具完全开源免费，欢迎试用。如果觉得有帮助，请给个 Star 支持独立开发。我是 dtsola，我们下期见！
```

#### 步骤 4：保存文件

1. 将下载的文件重命名为 `voiceover.mp3`
2. 复制到以下位置：
   ```
   docs/运营文档/video-project/public/audio/voiceover.mp3
   ```

---

## 📝 文本分段版本（如需分段生成）

如果需要分段生成再合并，以下是各镜头的文本：

### Shot01（15秒）
```
大家好，我是 dtsola，一个独立开发者。前段时间，我朋友遇到了一个很头疼的问题：他在飞书上整理了数百篇技术文档，但因为工作变动需要离职，想把所有文档导出到本地，却发现飞书官方的导出功能并不完善。
```

### Shot02（20秒）
```
市面上的导出工具要么收费昂贵，要么功能有限：不能批量导出、无法保持目录结构、图片和附件下载失败、格式转换后丢失排版。这些痛点让我意识到：需要一个真正好用的飞书导出解决方案。
```

### Shot03（10秒）
```
所以我开发了"小遥搜索飞书导出工具"。
```

### Shot04（30秒）
```
这是一个完全开源、免费的 CLI 工具，专为飞书用户设计。核心功能包括：单个文档导出、完整知识库导出、批量导出、自动下载图片附件、增量导出。这个工具非常适合：知识管理爱好者备份文档、自由职业者迁移笔记、创业团队做知识库备份、技术文档维护者导出 Git、DevOps 工程师集成定时任务、以及学生用户跨平台使用。
```

### Shot05（10秒）
```
使用非常简单，只需3步。第一步，安装工具。完全开源免费，支持 Windows、macOS 和 Linux。只需运行：npm install -g xiaoyaosearch-feishu-export
```

### Shot06（15秒）
```
第二步，运行 feishu-export init，通过交互式向导快速配置飞书应用信息。
```

### Shot07（10秒）
```
第三步，使用 feishu-export doc 加上文档 ID，就能导出单个文档。
```

### Shot08（13秒）
```
如果需要批量导出，准备一个文档 ID 列表文件，运行 feishu-export docs --file。
```

### Shot09（12秒）
```
要导出整个知识库，只需运行 feishu-export wiki 加上知识库 ID。所有文档都会转换为标准的 Markdown 格式，图片和附件自动下载，目录结构完美保持。详细使用文档和源码，请访问：github.com/xiaoyaosearch/xiaoyaosearch-feishu-export-md
```

### Shot10（15秒）
```
工具完全开源免费，欢迎试用。如果觉得有帮助，请给个 Star 支持独立开发。我是 dtsola，我们下期见！
```

---

## 🔄 分段生成后合并（可选）

如果分段生成了 shot01.mp3 ~ shot10.mp3，使用以下方法合并：

### Windows 命令行
```bash
cd audio/voiceover
ffmpeg -f concat -i filelist.txt -c copy complete.mp3
```

### 在线合并工具
- [123APPS 音频合并](https://www.123apps.com/audio-joiner/)
- 上传 shot01.mp3 到 shot10.mp3（按顺序）
- 合并后下载为 complete.mp3

---

## ✅ 完成检查

生成完成后，确认：
- [ ] 文件名为 voiceover.mp3
- [ ] 文件时长约 150 秒（2分30秒）
- [ ] 文件格式为 MP3
- [ ] 已放在 docs/运营文档/video-project/public/audio/ 目录

然后运行：
```bash
cd docs/运营文档/video-project
npm run dev
```

预览带配音的视频效果！
