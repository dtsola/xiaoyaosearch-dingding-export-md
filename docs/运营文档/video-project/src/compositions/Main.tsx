/**
 * 主视频组件
 * 整合所有场景，使用 Series 顺序播放
 * 动态匹配配音时长
 * @module Main
 */

import React, { useEffect, useState } from 'react';
import { Series, AbsoluteFill, staticFile, delayRender, continueRender, Audio } from 'remotion';
import { getAudioDuration } from '@remotion/media-utils';
import {
  Shot01_BackgroundStory,
  Shot02_ProblemAnalysis,
  Shot03_SolutionTitle,
  Shot04_MainInterface,
  Shot05_BatchExport,
  Shot06_FormatConfig,
  Shot07_EcoIntro,
  Shot08_CTA,
  SCENE_DURATIONS,
  VIDEO_CONFIG,
} from './index';

interface SceneWithDuration {
  shot: string;
  component: React.FC;
  audioFile: string;
  originalDuration: number;
}

const SCENES: SceneWithDuration[] = [
  { shot: 'shot01', component: Shot01_BackgroundStory, audioFile: 'audio/shot01.mp3', originalDuration: SCENE_DURATIONS.shot01 },
  { shot: 'shot02', component: Shot02_ProblemAnalysis, audioFile: 'audio/shot02.mp3', originalDuration: SCENE_DURATIONS.shot02 },
  { shot: 'shot03', component: Shot03_SolutionTitle, audioFile: 'audio/shot03.mp3', originalDuration: SCENE_DURATIONS.shot03 },
  { shot: 'shot04', component: Shot04_MainInterface, audioFile: 'audio/shot04.mp3', originalDuration: SCENE_DURATIONS.shot04 },
  { shot: 'shot05', component: Shot05_BatchExport, audioFile: 'audio/shot05.mp3', originalDuration: SCENE_DURATIONS.shot05 },
  { shot: 'shot06', component: Shot06_FormatConfig, audioFile: 'audio/shot06.mp3', originalDuration: SCENE_DURATIONS.shot06 },
  { shot: 'shot07', component: Shot07_EcoIntro, audioFile: 'audio/shot07.mp3', originalDuration: SCENE_DURATIONS.shot07 },
  { shot: 'shot08', component: Shot08_CTA, audioFile: 'audio/shot08.mp3', originalDuration: SCENE_DURATIONS.shot08 },
];

export const Main: React.FC = () => {
  const [durations, setDurations] = useState<Record<string, number>>(SCENE_DURATIONS);
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    let mounted = true;

    async function loadDurations() {
      try {
        const newDurations: Record<string, number> = { ...SCENE_DURATIONS };

        for (const scene of SCENES) {
          const audioPath = staticFile(scene.audioFile);
          const audioDuration = await getAudioDuration(audioPath);
          const audioFrames = Math.ceil(audioDuration * VIDEO_CONFIG.fps);

          // 画面时长始终等于配音时长
          newDurations[scene.shot] = audioFrames;
          console.log(`${scene.shot}: 音频 ${audioFrames}帧 (${(audioFrames/30).toFixed(1)}秒) → 画面时长同步`);
        }

        if (mounted) {
          setDurations(newDurations);
          continueRender(handle);
        }
      } catch (error) {
        console.error('加载音频时长失败:', error);
        if (mounted) {
          continueRender(handle);
        }
      }
    }

    loadDurations();

    return () => {
      mounted = false;
    };
  }, [handle]);

  return (
    <AbsoluteFill>
      <Series>
        {SCENES.map((scene) => {
          const Component = scene.component;
          return (
            <Series.Sequence
              key={scene.shot}
              durationInFrames={durations[scene.shot]}
            >
              <Audio src={staticFile(scene.audioFile)} volume={1.0} />
              <Component />
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
