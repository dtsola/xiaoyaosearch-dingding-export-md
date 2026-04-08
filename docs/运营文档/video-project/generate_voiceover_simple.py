#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
小遥搜索钉钉导出工具 - 配音生成脚本
使用 edge-tts 库生成 Microsoft Edge TTS 配音（完全免费）
"""

import asyncio
import edge_tts
import os
import sys

# 设置输出编码为 UTF-8
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 配音文本（按镜头）
VOICEOVER_TEXTS = {
    'shot01': '''大家好，我是 D T S O L A。我开发了小遥搜索本地 AI 搜索工具，已获一千多颗星。有用户问我，能搜索钉钉文档吗，我的技术文档都在钉钉上。''',

    'shot02': '''钉钉文档在云端，本地人工智能无法访问。官方只能一篇篇手动导出，不支持批量。三百篇文档需要一整天。''',

    'shot03': '''作为一个独立开发者，遇到问题就解决问题。所以，我开发了小遥搜索钉钉导出工具。它的核心价值是：高效导出、AI 搜索。''',

    'shot04': '''这是一个完全开源、免费的浏览器扩展插件。打开钉钉文档页面，点击插件图标，插件会自动识别当前页面的文档列表，支持勾选导出。''',

    'shot05': '''支持单个文档导出、批量文档导出、文件夹递归导出。勾选多个文档或文件夹，点击"下载选中"即可批量导出。导出过程中会显示实时进度，让你清楚知道当前状态。100篇文档，5分钟搞定。''',

    'shot06': '''支持多种格式转换：docx、md、pdf、xlsx、jpg。可以在设置中为不同类型的文档设置默认导出格式，满足不同使用场景。''',

    'shot07': '''导出后的文档可以直接导入小遥搜索，实现本地 AI 搜索。试试问："我上次写的关于微服务架构的文档在哪？"AI 立刻帮你找到。这就是小遥搜索生态的价值：导出、备份、AI 搜索。''',

    'shot08': '''工具完全开源免费，欢迎试用。如果觉得有帮助，请给两个项目都点星支持独立开发。扫码加入用户交流群，一起探讨知识管理和人工智能搜索。让搜索像聊天一样简单。我是 D T S O L A，我们下期见。''',
}

DEFAULT_VOICE = 'zh-CN-XiaoxiaoNeural'  # 女声
# 男声选项：'zh-CN-YunxiNeural'

# 语速设置（正常语速）
SPEECH_RATE = '+0%'  # 正常语速

async def text_to_speech(text: str, output_file: str, voice: str = DEFAULT_VOICE, rate: str = SPEECH_RATE) -> None:
    """使用 edge-tts 将文本转换为语音"""
    print(f"正在生成: {output_file}")
    print(f"  语音: {voice}")
    print(f"  语速: {rate}")

    try:
        # 创建 communicate 对象，设置语速
        communicate = edge_tts.Communicate(text, voice, rate=rate)

        # 生成音频
        await communicate.save(output_file)

        # 验证文件是否生成
        if os.path.exists(output_file):
            file_size = os.path.getsize(output_file)
            print(f"  完成: {output_file} ({file_size} bytes)")
        else:
            print(f"  警告: 文件未生成: {output_file}")
    except Exception as e:
        print(f"  错误: {e}")
        raise

async def generate_all_voiceovers(output_dir: str = 'public/audio', voice: str = DEFAULT_VOICE) -> None:
    """生成所有镜头的配音文件"""
    print("=" * 60)
    print("小遥搜索钉钉导出工具 - 配音生成")
    print("=" * 60)
    print(f"语音: {voice}")
    print(f"输出目录: {output_dir}")
    print("=" * 60)
    print()

    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)

    # 生成每个镜头的配音
    audio_files = []
    for i, (shot, text) in enumerate(VOICEOVER_TEXTS.items(), 1):
        output_file = os.path.join(output_dir, f'{shot}.mp3')
        print(f"[{i}/8] 正在处理 {shot}...")
        await text_to_speech(text, output_file, voice)
        if os.path.exists(output_file):
            audio_files.append(output_file)
        print()

    print("=" * 60)
    print(f"音频文件生成完成！共 {len(audio_files)} 个文件")
    print("=" * 60)
    print()

    # 生成分段配音的合并列表文件
    filelist_path = os.path.join(output_dir, 'filelist.txt')
    with open(filelist_path, 'w', encoding='utf-8') as f:
        for audio_file in audio_files:
            f.write(f"file '{os.path.basename(audio_file)}'\n")

    print("下一步：合并音频文件")
    print("-" * 40)
    print("方法1：使用 ffmpeg（推荐）")
    print(f"  cd {output_dir}")
    print('  ffmpeg -f concat -i filelist.txt -c copy voiceover.mp3')
    print()
    print("方法2：使用在线工具")
    print("  访问：https://www.123apps.com/audio-joiner/")
    print("  上传所有 mp3 文件，按顺序合并后下载为 voiceover.mp3")
    print()
    print("方法3：最快方法 - 使用在线 TTS 一次生成")
    print("  访问：https://ttsmaker.com/")
    print("  选择中文语音，复制完整配音文本（见下方）")
    print("  一次性生成并保存为 voiceover.mp3")
    print()
    print("=" * 60)
    print("完整配音文本（用于一次性生成）")
    print("-" * 40)
    full_text = ' '.join(VOICEOVER_TEXTS.values())
    print(full_text)
    print()
    print("=" * 60)

def main():
    """主函数"""
    import argparse

    parser = argparse.ArgumentParser(description='生成视频配音')
    parser.add_argument(
        '--voice',
        type=str,
        default=DEFAULT_VOICE,
        help='使用的语音（默认：云希女声）'
    )
    parser.add_argument(
        '--output',
        type=str,
        default='public/audio',
        help='输出目录（默认：public/audio）'
    )

    args = parser.parse_args()

    # 生成配音
    asyncio.run(generate_all_voiceovers(args.output, args.voice))

if __name__ == '__main__':
    main()
