import "./index.css";
import { Composition } from "remotion";
import { Main, TOTAL_DURATION, VIDEO_CONFIG } from "./compositions";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 主视频 */}
      <Composition
        id="Main"
        component={Main}
        durationInFrames={TOTAL_DURATION}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};
