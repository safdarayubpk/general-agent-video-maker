import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { SCENE_TIMING, brand } from "./styles";
import { ColdOpenScene } from "./scenes/ColdOpenScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { ShiftScene } from "./scenes/ShiftScene";
import { ProofScene } from "./scenes/ProofScene";
import { PreviewScene } from "./scenes/PreviewScene";
import { CTAScene } from "./scenes/CTAScene";
import { Caption } from "./components/Caption";

export const SDDVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Crossfade opacity for scene transitions
  const scene2Enter = interpolate(
    frame,
    [SCENE_TIMING.scene2.start, SCENE_TIMING.scene2.start + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: brand.bgPrimary }}>
      {/* Scene 1: Cold Open (0-150) */}
      <Sequence from={SCENE_TIMING.scene1.start} durationInFrames={SCENE_TIMING.scene1.duration}>
        <ColdOpenScene />
      </Sequence>

      {/* Scene 2: Problem (150-1650) */}
      <Sequence from={SCENE_TIMING.scene2.start} durationInFrames={SCENE_TIMING.scene2.duration}>
        <div style={{ opacity: scene2Enter, width: "100%", height: "100%" }}>
          <ProblemScene />
        </div>
      </Sequence>

      {/* Beat 1: Black pause (1650-1695) — handled by bgPrimary background */}

      {/* Scene 3: The Shift (1695-3495) */}
      <Sequence from={SCENE_TIMING.scene3.start} durationInFrames={SCENE_TIMING.scene3.duration}>
        <ShiftScene />
      </Sequence>

      {/* Beat 2: Thesis holds (3495-3531) — ShiftScene's thesis text persists via background */}

      {/* Scene 4: Proof (3531-5781) */}
      <Sequence from={SCENE_TIMING.scene4.start} durationInFrames={SCENE_TIMING.scene4.duration}>
        <ProofScene />
      </Sequence>

      {/* Beat 3: Constellation dims (5781-5811) — handled by bgPrimary */}

      {/* Scene 5: Preview (5811-6711) */}
      <Sequence from={SCENE_TIMING.scene5.start} durationInFrames={SCENE_TIMING.scene5.duration}>
        <PreviewScene />
      </Sequence>

      {/* Scene 6: CTA (6711-7200) */}
      <Sequence from={SCENE_TIMING.scene6.start} durationInFrames={SCENE_TIMING.scene6.duration}>
        <CTAScene />
      </Sequence>

      {/* Background music — continuous ambient pad underneath narration */}
      <Audio src={staticFile("audio/bg_music.mp3")} volume={0.12} />

      {/* Voiceover audio — per-scene segments synced to visuals */}
      <Sequence from={SCENE_TIMING.scene1.start + 5}>
        <Audio src={staticFile("audio/vo_scene1.wav")} volume={0.9} />
      </Sequence>
      <Sequence from={SCENE_TIMING.scene2.start + 10}>
        <Audio src={staticFile("audio/vo_scene2.wav")} volume={0.9} />
      </Sequence>
      <Sequence from={SCENE_TIMING.scene3.start + 15}>
        <Audio src={staticFile("audio/vo_scene3.wav")} volume={0.9} />
      </Sequence>
      <Sequence from={SCENE_TIMING.scene4.start + 15}>
        <Audio src={staticFile("audio/vo_scene4.wav")} volume={0.9} />
      </Sequence>
      <Sequence from={SCENE_TIMING.scene5.start + 15}>
        <Audio src={staticFile("audio/vo_scene5.wav")} volume={0.9} />
      </Sequence>
      <Sequence from={SCENE_TIMING.scene6.start + 60}>
        <Audio src={staticFile("audio/vo_scene6.wav")} volume={0.9} />
      </Sequence>

      {/* Global caption overlay */}
      <Caption />
    </AbsoluteFill>
  );
};
