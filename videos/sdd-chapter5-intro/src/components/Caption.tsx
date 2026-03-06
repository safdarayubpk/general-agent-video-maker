import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { brand, typeScale, layout } from "../styles";

export interface CaptionLine {
  start: number;
  end: number;
  text: string;
}

export const CAPTIONS: CaptionLine[] = [
  // Scene 1: audio starts frame 5, duration 5.89s = 177 frames (5-182)
  { start: 8, end: 105, text: "This is what AI coding looks like when it works." },
  { start: 110, end: 178, text: "But for most teams... it doesn't." },
  // Scene 2: audio starts frame 160, duration 20.77s = 623 frames (160-783)
  { start: 164, end: 310, text: "This is vibe coding. You talk, the AI builds, and iteration one looks amazing." },
  { start: 320, end: 375, text: "But by iteration fourteen..." },
  { start: 385, end: 420, text: "...context is lost." },
  { start: 430, end: 475, text: "Assumptions have drifted." },
  { start: 485, end: 600, text: "And the generated code no longer matches your architecture." },
  { start: 610, end: 775, text: "This is the ceiling. And every developer using AI hits it." },
  // Scene 3: audio starts frame 1710, duration 27.25s = 818 frames (1710-2528)
  { start: 1714, end: 1810, text: "Spec-Driven Development inverts the relationship." },
  { start: 1820, end: 1970, text: "Instead of talking to AI and hoping it remembers, you write a specification —" },
  { start: 1980, end: 2130, text: "a structured contract that defines intent, constraints, and success criteria." },
  { start: 2140, end: 2245, text: "The AI doesn't guess. It implements against the spec." },
  { start: 2255, end: 2395, text: "And the spec doesn't drift — it's the foundation everything is built on." },
  { start: 2405, end: 2465, text: "The specification is the product." },
  { start: 2475, end: 2524, text: "The code... is just the compiled output." },
  // Scene 4: audio starts frame 3546, duration 26.53s = 796 frames (3546-4342)
  { start: 3550, end: 3650, text: "Let me show you what this actually looks like." },
  { start: 3660, end: 3770, text: "Vibe coding: multiple rewrites. Twenty-plus minutes." },
  { start: 3780, end: 3900, text: "And the code still doesn't match your codebase patterns." },
  { start: 3910, end: 4060, text: "Spec-driven: one spec. One pass. A few minutes. Every criterion met." },
  { start: 4070, end: 4185, text: "See this line? This is where vibe coding always breaks." },
  { start: 4195, end: 4335, text: "A spec captures institutional knowledge that conversation can't carry." },
  // Scene 5: audio starts frame 5826, duration 12.77s = 383 frames (5826-6209)
  { start: 5830, end: 5930, text: "Chapter 5 goes deep. Three levels of SDD." },
  { start: 5940, end: 6080, text: "A four-phase workflow from parallel research to atomic commits." },
  { start: 6090, end: 6205, text: "And native Claude Code integration. No frameworks required." },
  // Scene 6: audio starts frame 6771, duration 7.73s = 232 frames (6771-7003)
  { start: 6775, end: 6860, text: "Stop talking to AI. Start specifying." },
  { start: 6870, end: 6998, text: "Chapter 5 of AgentFactory. It's free. Link in the description." },
];

export const Caption: React.FC = () => {
  const frame = useCurrentFrame();
  const activeLine = CAPTIONS.find((l) => frame >= l.start && frame <= l.end);
  if (!activeLine) return null;

  const dur = activeLine.end - activeLine.start;
  const fade = Math.max(3, Math.min(10, Math.floor(dur / 3)));

  const opacity = interpolate(
    frame,
    [activeLine.start, activeLine.start + fade, activeLine.end - fade, activeLine.end],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: layout.captionBottomMargin,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: layout.captionMaxWidth,
          padding: "8px 24px",
          borderRadius: 8,
          background: `${brand.bgPrimary}bf`,
        }}
      >
        <span
          style={{
            ...typeScale.body,
            color: brand.textPrimary,
          }}
        >
          {activeLine.text}
        </span>
      </div>
    </div>
  );
};
