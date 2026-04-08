# 使用 Edge 浏览器在线 TTS 快速生成配音

## 🎙️ Edge 浏览器 TTS 使用方法（完全免费）

### 方法一：逐个录制（推荐）

1. **打开 Edge 浏览器**
   - 访问 https://www.microsoft.com/edge

2. **使用"大声朗读"功能**

   **镜头 01**（15秒）：
   - 新建标签页，访问任意网页
   - 按 `Ctrl + A` 全选，删除内容
   - 粘贴镜头 01 的旁白文本
   - 右键 → "大声朗读" → "朗读至结尾"
   - 点击右上角 "语音选项" 图标
   - 选择语音：`Microsoft Xiaoxiao Online (Natural)` 或 `Microsoft Yunxi Online (Natural)`
   - 调整语速滑块（建议不调整或调慢一点）
   - 使用系统录音工具（Windows 录音机或 Audacity）录制音频
   - 保存为 `shot01.mp3`

   **重复以上步骤**，依次录制 shot02 ~ shot10

### 方法二：使用在线 TTS 工具

推荐使用以下免费在线 TTS 工具：

1. [TTSMP3.com](https://ttsmp3.com/)
   - 选择语言：Chinese
   - 选择语音：微软晓晓或微软云希
   - 粘贴文本，点击 "转换"
   - 下载 MP3

2. [语音合成助手](https://www.text-to-speech.online/zh-CN)
   - 支持微软语音
   - 免费使用

3. [TTSMaker](https://ttsmaker.com/)
   - 支持多种语言
   - 可以调整语速和音调

---

## 🎛️ 音频合并工具

### Windows 用户

**使用 FFmpeg（推荐）**：
```bash
# 1. 下载 FFmpeg：https://ffmpeg.org/download.html
# 2. 解压后添加到系统 PATH
# 3. 在 audio/voiceover 目录运行：

cd audio/voiceover
ffmpeg -f concat -i filelist.txt -c copy complete.mp3
```

**使用在线工具**：
- [123APPS 音频合并](https://www.123apps.com/audio-joiner/)
- [Audio Online Joiner](https://audio.online-joiner.com/)

---

## 📋 完整操作流程

### 步骤 1：生成 10 个音频文件

| 文件名 | 旁白文本来源 | 预估时长 |
|--------|--------------|----------|
| shot01.mp3 | script.txt 镜头01 | 15秒 |
| shot02.mp3 | script.txt 镜头02 | 20秒 |
| shot03.mp3 | script.txt 镜头03 | 10秒 |
| shot04.mp3 | script.txt 镜头04 | 30秒 |
| shot05.mp3 | script.txt 镜头05 | 10秒 |
| shot06.mp3 | script.txt 镜头06 | 15秒 |
| shot07.mp3 | script.txt 镜头07 | 10秒 |
| shot08.mp3 | script.txt 镜头08 | 13秒 |
| shot09.mp3 | script.txt 镜头09 | 12秒 |
| shot10.mp3 | script.txt 镜头10 | 15秒 |

### 步骤 2：合并音频文件

```bash
cd audio/voiceover
ffmpeg -f concat -i filelist.txt -c copy complete.mp3
```

### 步骤 3：验证音频时长

确保 `complete.mp3` 的时长为 **150 秒（2分30秒）**

### 步骤 4：复制到 Remotion 项目

```bash
cp audio/voiceover/complete.mp3 public/audio/voiceover.mp3
```

### 步骤 5：预览效果

```bash
cd docs/运营文档/video-project
npm run dev
```

访问 http://localhost:3000 预览带配音的视频。

---

## ⚠️ 注意事项

1. **音频格式**：必须是 MP3 格式
2. **采样率**：建议 44.1kHz 或 48kHz
3. **比特率**：建议 128kbps 或更高
4. **时长匹配**：确保音频时长为 150 秒（允许 ±2秒误差）
5. **音量一致**：确保所有片段录制时的音量一致

---

## 🎯 快速开始

最简单的方法：

1. 使用 [TTSMaker.com](https://ttsmaker.com/)
2. 选择 "Chinese" → "Microsoft Xiaoxiao Neural"
3. 依次复制 script.txt 中每个镜头的文本
4. 下载对应的 MP3 文件
5. 使用在线工具合并所有文件
6. 复制到 `public/audio/voiceover.mp3`
7. 完成！
