# 配音文件目录

## 📝 待添加配音

请将生成的配音文件 `voiceover.mp3` 放在此目录下。

## 🎙️ 快速生成配音

### 方法一：使用在线 TTS（最快）

1. 访问 [TTSMaker.com](https://ttsmaker.com/)
2. 选择语言：Chinese
3. 选择语音：Microsoft Xiaoxiao Neural（女声）或 Microsoft Yunxi Neural（男声）
4. 复制下方完整文本：
```
大家好，我是 dtsola，一个独立开发者。前段时间，我朋友遇到了一个很头疼的问题：他在飞书上整理了数百篇技术文档，但因为工作变动需要离职，想把所有文档导出到本地，却发现飞书官方的导出功能并不完善。市面上的导出工具要么收费昂贵，要么功能有限：不能批量导出、无法保持目录结构、图片和附件下载失败、格式转换后丢失排版。这些痛点让我意识到：需要一个真正好用的飞书导出解决方案。所以我开发了"小遥搜索飞书导出工具"。这是一个完全开源、免费的 CLI 工具，专为飞书用户设计。核心功能包括：单个文档导出、完整知识库导出、批量导出、自动下载图片附件、增量导出。这个工具非常适合：知识管理爱好者备份文档、自由职业者迁移笔记、创业团队做知识库备份、技术文档维护者导出 Git、DevOps 工程师集成定时任务、以及学生用户跨平台使用。使用非常简单，只需3步。第一步，安装工具。完全开源免费，支持 Windows、macOS 和 Linux。只需运行：npm install -g xiaoyaosearch-feishu-export。第二步，运行 feishu-export init，通过交互式向导快速配置飞书应用信息。第三步，使用 feishu-export doc 加上文档 ID，就能导出单个文档。如果需要批量导出，准备一个文档 ID 列表文件，运行 feishu-export docs --file。要导出整个知识库，只需运行 feishu-export wiki 加上知识库 ID。所有文档都会转换为标准的 Markdown 格式，图片和附件自动下载，目录结构完美保持。详细使用文档和源码，请访问：github.com/xiaoyaosearch/xiaoyaosearch-feishu-export-md。工具完全开源免费，欢迎试用。如果觉得有帮助，请给个 Star 支持独立开发。我是 dtsola，我们下期见！
```
5. 点击 "转换为 MP3"
6. 下载文件并重命名为 `voiceover.mp3`
7. 放在此目录下

### 方法二：使用 Azure TTS（高质量）

参考 `audio/voiceover/edge_tts_guide.md` 获取详细说明。

## ✅ 音频要求

- **格式**：MP3
- **时长**：150 秒（2分30秒）
- **采样率**：44.1kHz 或 48kHz
- **比特率**：128kbps 或更高
- **文件名**：voiceover.mp3

## 📂 文件位置

配音文件应放在：
```
public/audio/voiceover.mp3
```

这样 Remotion 就能自动加载配音了。
