# 配音制作指南

## 🎙️ 使用微软 TTS 生成配音

### 方法一：Edge 浏览器（推荐，完全免费）

1. 打开 Microsoft Edge 浏览器
2. 访问任意网页
3. 选中旁白文本，右键 → "朗读" → "朗读至结尾"
4. 点击 "语音选项" → 选择中文语音
5. 使用系统录音工具或在线录音器录制

**推荐语音**：
- Microsoft Xiaoxiao Online (Natural) - 女声，自然
- Microsoft Yunxi Online (Natural) - 男声，温和

### 方法二：Azure TTS（需要付费）

1. 访问 [Azure Speech Studio](https://speech.microsoft.com/portal)
2. 注册 Azure 账号（有免费额度）
3. 在 Speech Studio 中输入文本
4. 选择语音：`zh-CN-XiaoxiaoNeural` 或 `zh-CN-YunxiNeural`
5. 调整语速（建议 0.9-1.0）
6. 下载音频

### 方法三：剪映（免费）

1. 打开剪映
2. 点击 "文本" → "文本朗读"
3. 粘贴旁白文本
4. 选择语音：推荐"阅读女声"或"解说男声"
5. 导出音频

---

## 📁 音频文件组织

创建以下目录结构：

```
audio/
├── voiceover/
│   ├── shot01.mp3      # 镜头01：背景故事
│   ├── shot02.mp3      # 镜头02：问题分析
│   ├── shot03.mp3      # 镜头03：解决方案标题
│   ├── shot04.mp3      # 镜头04：功能与场景
│   ├── shot05.mp3      # 镜头05：安装工具
│   ├── shot06.mp3      # 镜头06：初始化
│   ├── shot07.mp3      # 镜头07：单文档导出
│   ├── shot08.mp3      # 镜头08：批量导出
│   ├── shot09.mp3      # 镜头09：知识库导出
│   ├── shot10.mp3      # 镜头10：CTA
│   └── complete.mp3    # 合并后的完整配音
```

---

## 🎬 合并音频文件

### 方法一：使用 FFmpeg（推荐）

```bash
# Windows
cd audio/voiceover
ffmpeg -f concat -i filelist.txt -c copy complete.mp3

# 创建 filelist.txt 内容：
# file 'shot01.mp3'
# file 'shot02.mp3'
# ...
# file 'shot10.mp3'
```

### 方法二：使用在线工具

- [Audio Joiner](https://www123apps.com/audio-joiner/) - 在线音频合并
- [TwistedWave](https://twistedwave.com/online/audio-joiner) - 在线音频合并

### 方法三：使用 Audacity

1. 下载安装 [Audacity](https://www.audacityteam.org/)
2. 导入所有 shot01.mp3 ~ shot10.mp3
3. 按顺序排列
4. 导出为 complete.mp3

---

## ⚙️ 将配音添加到 Remotion

### 步骤 1：复制音频文件

将生成的 `complete.mp3` 复制到 Remotion 项目的 public 目录：

```bash
cp audio/voiceover/complete.mp3 public/audio/voiceover.mp3
```

### 步骤 2：在 Main 组件中添加音频

在 `src/compositions/Main.tsx` 中添加 Audio 组件：

```tsx
import { Audio } from '@remotion/media';
import { staticFile } from 'remotion';

export const Main: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 添加配音 */}
      <Audio
        src={staticFile('audio/voiceover.mp3')}
        volume={1.0}  // 音量 100%
      />

      <Series>
        {/* 各个场景 */}
      </Series>
    </AbsoluteFill>
  );
};
```

### 步骤 3：验证时长

确保音频时长与视频时长一致（150秒 @ 30fps = 4500帧）

---

## 🎛️ 音频参数调整

### 音量控制

```tsx
// 静态音量
<Audio src={staticFile('audio/voiceover.mp3')} volume={0.8} />

// 动态音量（淡入淡出）
<Audio
  src={staticFile('audio/voiceover.mp3')}
  volume={(f) => {
    // 前30帧淡入
    return Math.min(f / 30, 1);
  }}
/>
```

### 分段音频（可选）

如果使用分段音频，在每个镜头中添加对应的音频：

```tsx
// Shot01_BackgroundStory.tsx
<Audio
  src={staticFile('audio/shot01.mp3')}
  volume={1.0}
/>
```

---

## 📝 配音技巧

### 语速控制
- 正常语速：180-200 字/分钟
- 视频总时长 150 秒，总字数 548 字
- 平均语速约 219 字/分钟，略快于正常

### 情感表达
- **开头**：亲切、自然
- **问题**：稍微严肃
- **解决方案**：兴奋、自信
- **演示**：清晰、专业
- **结尾**：真诚、友好

### 停顿建议
- 段落之间：0.5-1秒
- 重点项目：稍微停顿强调
- 转场前：自然停顿

---

## ✅ 制作清单

- [ ] 生成 10 个镜头的配音文件（shot01.mp3 ~ shot10.mp3）
- [ ] 合并为完整配音文件（complete.mp3）
- [ ] 检查音频时长是否为 150 秒
- [ ] 复制到 Remotion 项目的 public/audio/ 目录
- [ ] 在 Main.tsx 中添加 Audio 组件
- [ ] 预览验证音频与画面同步
- [ ] 调整音量和时序

---

**提示**：配音文件应保存在 `audio/voiceover/` 目录中，便于管理和版本控制。
