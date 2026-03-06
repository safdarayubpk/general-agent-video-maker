import React from "react";
import { Composition } from "remotion";
import { SDDVideo } from "./SDDVideo";
import { VIDEO_CONFIG } from "./styles";

export const Root: React.FC = () => {
  return (
    <Composition
      id="SDDChapter5Intro"
      component={SDDVideo}
      durationInFrames={VIDEO_CONFIG.durationInFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};
