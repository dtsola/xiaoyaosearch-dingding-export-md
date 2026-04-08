# 配音快速生成脚本
# 使用 Azure TTS API 批量生成配音
# 需要先安装 azure-cognitiveservices-speech 库

"""
安装依赖：
pip install azure-cognitiveservices-speech

使用方法：
1. 设置环境变量 AZURE_SPEECH_KEY（你的 Azure Speech API Key）
2. 设置环境变量 AZURE_SPEECH_REGION（区域，如 eastasia）
3. 运行此脚本：python generate_voiceover.py
"""

import os
from azure.cognitiveservices.speech import SpeechConfig, SpeechSynthesizer, SpeechSynthesisOutputFormat

# 配置
SPEECH_KEY = os.environ.get('AZURE_SPEECH_KEY', 'YOUR_KEY_HERE')
SPEECH_REGION = os.environ.get('AZURE_SPEECH_REGION', 'eastasia')

# 配音文本
VOICEOVER_SCRIPTS = {
    'shot01': '''大家好，我是 dtsola，一个独立开发者。
前段时间，我朋友遇到了一个很头疼的问题：
他在飞书上整理了数百篇技术文档，但因为工作变动需要离职，
想把所有文档导出到本地，却发现飞书官方的导出功能并不完善。''',

    'shot02': '''市面上的导出工具要么收费昂贵，要么功能有限：
不能批量导出、无法保持目录结构、图片和附件下载失败、格式转换后丢失排版。
这些痛点让我意识到：需要一个真正好用的飞书导出解决方案。''',

    'shot03': '''所以我开发了"小遥搜索飞书导出工具"。''',

    'shot04': '''这是一个完全开源、免费的 CLI 工具，专为飞书用户设计。
核心功能包括：单个文档导出、完整知识库导出、批量导出、自动下载图片附件、增量导出。
这个工具非常适合：知识管理爱好者备份文档、自由职业者迁移笔记、创业团队做知识库备份、技术文档维护者导出 Git、DevOps 工程师集成定时任务、以及学生用户跨平台使用。''',

    'shot05': '''使用非常简单，只需3步。
第一步，安装工具。完全开源免费，支持 Windows、macOS 和 Linux。
只需运行：npm install -g xiaoyaosearch-feishu-export''',

    'shot06': '''第二步，运行 feishu-export init，通过交互式向导快速配置飞书应用信息。''',

    'shot07': '''第三步，使用 feishu-export doc 加上文档 ID，就能导出单个文档。''',

    'shot08': '''如果需要批量导出，准备一个文档 ID 列表文件，运行 feishu-export docs --file。''',

    'shot09': '''要导出整个知识库，只需运行 feishu-export wiki 加上知识库 ID。
所有文档都会转换为标准的 Markdown 格式，图片和附件自动下载，目录结构完美保持。
详细使用文档和源码，请访问：github.com/xiaoyaosearch/xiaoyaosearch-feishu-export-md''',

    'shot10': '''工具完全开源免费，欢迎试用。
如果觉得有帮助，请给个 Star 支持独立开发。
我是 dtsola，我们下期见！''',
}

def generate_voiceover():
    """生成所有配音文件"""

    # 配置语音合成器
    speech_config = SpeechConfig(
        subscription=SPEECH_KEY,
        region=SPEECH_REGION
    )

    # 设置语音（推荐使用自然语音）
    speech_config.speech_synthesis_voice_name = 'zh-CN-YunxiNeural'  # 男声，温和
    # 或者使用：speech_config.speech_synthesis_voice_name = 'zh-CN-XiaoxiaoNeural'  # 女声，自然

    # 设置输出格式
    speech_config.set_speech_synthesis_output_format(SpeechSynthesisOutputFormat.AudioDataRateMp3With128Kbps)

    # 创建合成器
    synthesizer = SpeechSynthesizer(speech_config=speech_config, audio_config=None)

    # 生成每个镜头的配音
    for shot, text in VOICEOVER_SCRIPTS.items():
        print(f"正在生成 {shot}...")

        # 执行语音合成
        result = synthesizer.speak_text_async(text).get()

        # 保存音频文件
        filename = f'{shot}.mp3'
        with open(filename, 'wb') as audio_file:
            audio_file.write(result.audio_data)

        print(f"✅ {shot} 生成完成：{filename}")

    print("\n所有配音文件生成完成！")
    print("接下来请使用 FFmpeg 或其他工具合并这些文件。")

if __name__ == '__main__':
    # 检查环境变量
    if SPEECH_KEY == 'YOUR_KEY_HERE':
        print("❌ 错误：请先设置 AZURE_SPEECH_KEY 环境变量")
        print("获取 API Key：https://portal.azure.com/#create/MicrosoftCognitiveServicesSpeechServices")
    else:
        generate_voiceover()
