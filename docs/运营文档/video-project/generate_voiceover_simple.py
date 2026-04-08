#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
小遥搜索飞书导出工具 - 配音生成脚本
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
    'shot01': '''大家好，我是 D-T-S-O-L-A，一个独立开发者。前段时间，我朋友遇到了一个很头疼的问题：他在飞书上整理了数百篇技术文档，但因为工作变动需要离职，想把所有文档导出到本地，却发现飞书官方的导出功能并不完善。''',

    'shot02': '''市面上的导出工具要么收费昂贵，要么功能有限：不能批量导出、无法保持目录结构、图片和附件下载失败、格式转换后丢失排版。这些痛点让我意识到：需要一个真正好用的飞书导出解决方案。''',

    'shot03': '''所以我开发了小遥搜索飞书导出工具。''',

    'shot04': '''这是一个完全开源、免费的 CLI 工具，专为飞书用户设计。核心功能包括：单个文档导出、完整知识库导出、批量导出、自动下载图片附件、增量导出。这个工具非常适合：知识管理爱好者备份文档、自由职业者迁移笔记、创业团队做知识库备份、技术文档维护者导出 Git、DevOps 工程师集成定时任务、以及学生用户跨平台使用。''',

    'shot05': '''使用非常简单，只需3步。第一步，安装工具。完全开源免费，支持 Windows、macOS 和 Linux。只需 npm 一键安装。''',

    'shot06': '''第二步，运行 feishu-export init，通过交互式向导快速配置飞书应用信息。''',

    'shot07': '''第三步，使用 feishu-export doc 加上文档 ID，就能导出单个文档。''',

    'shot08': '''如果需要批量导出，准备一个文档 ID 列表文件，运行 feishu-export docs --file。''',

    'shot09': '''要导出整个知识库，只需运行 feishu-export wiki 加上知识库 ID。所有文档都会转换为标准的 Markdown 格式，图片和附件自动下载，目录结构完美保持。详细使用文档和源码，请访问 github。''',

    'shot10': '''工具完全开源免费，欢迎试用。如果觉得有帮助，请给个三连支持独立开发。我是 D-T-S-O-L-A，我们下期见！''',
}

DEFAULT_VOICE = 'zh-CN-XiaoxiaoNeural'  # 女声
# 男声

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
    print("小遥搜索飞书导出工具 - 配音生成")
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
        print(f"[{i}/10] 正在处理 {shot}...")
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
    print("  选择中文语音，复制完整配音文本（见 QUICK_START.md）")
    print("  一次性生成并保存为 voiceover.mp3")
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
        help='使用的语音（默认：云希男声）'
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
