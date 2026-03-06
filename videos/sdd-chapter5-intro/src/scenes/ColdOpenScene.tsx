import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { CheckCircle } from "lucide-react";
import { brand, typeScale, anim, layout, iconSizes } from "../styles";

// Simplified spec document mockup
const SpecMockup: React.FC<{ opacity: number; x: number }> = ({ opacity, x }) => (
  <div
    style={{
      position: "absolute",
      left: `${10 + x}%`,
      top: "15%",
      width: "35%",
      height: "70%",
      background: brand.bgSecondary,
      borderRadius: layout.cardRadius,
      border: `1px solid rgba(255,255,255,0.08)`,
      padding: 32,
      opacity,
      backdropFilter: "blur(20px)",
    }}
  >
    <div style={{ ...typeScale.codeSmall, color: brand.accentPrimary, marginBottom: 16 }}>
      ## Intent
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode, marginBottom: 8 }}>
      POST /api/users/profile
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.accentPrimary, marginTop: 24, marginBottom: 16 }}>
      ## Constraints
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode, marginBottom: 6 }}>
      - Validation: Zod schema
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode, marginBottom: 6 }}>
      - Auth: bearerAuth middleware
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.accentPrimary, marginTop: 24, marginBottom: 16 }}>
      ## Success Criteria
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.accentGreen }}>
      [✓] All criteria met
    </div>
  </div>
);

// Simplified code block mockup
const CodeMockup: React.FC<{ opacity: number; x: number }> = ({ opacity, x }) => (
  <div
    style={{
      position: "absolute",
      right: `${10 - x}%`,
      top: "15%",
      width: "35%",
      height: "70%",
      background: brand.bgTertiary,
      borderRadius: layout.terminalRadius,
      border: `1px solid rgba(255,255,255,0.06)`,
      padding: 32,
      opacity,
    }}
  >
    <div style={{ ...typeScale.codeSmall, color: brand.textDim, marginBottom: 8 }}>
      <span style={{ color: brand.accentPrimary, fontWeight: 700 }}>import</span>
      <span style={{ color: brand.textCode }}> {"{ z }"} </span>
      <span style={{ color: brand.accentPrimary, fontWeight: 700 }}>from</span>
      <span style={{ color: brand.accentGreen }}> 'zod'</span>
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode, marginBottom: 4 }}>
      {" "}
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode, marginBottom: 4 }}>
      <span style={{ color: brand.accentPrimary, fontWeight: 700 }}>const</span> UserProfile = z.object({"{"}
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode, marginBottom: 4 }}>
      {"  "}name: z.string().min(1),
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode, marginBottom: 4 }}>
      {"  "}email: z.string().email(),
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode, marginBottom: 4 }}>
      {"  "}role: z.enum([<span style={{ color: brand.accentGreen }}>'admin'</span>, <span style={{ color: brand.accentGreen }}>'user'</span>]),
    </div>
    <div style={{ ...typeScale.codeSmall, color: brand.textCode }}>
      {"}"})
    </div>
  </div>
);

export const ColdOpenScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash phase (0-60)
  const specIn = spring({ frame, fps, from: -20, to: 0, durationInFrames: 20, config: anim.springSnappy });
  const codeIn = spring({ frame: Math.max(0, frame - 4), fps, from: 20, to: 0, durationInFrames: 20, config: anim.springSnappy });
  const flashOpacity = frame < 60 ? 1 : 0;

  // Checkmark
  const checkScale = frame >= 30
    ? spring({ frame: frame - 30, fps, from: 0, to: 1, durationInFrames: 15, config: anim.springSnappy })
    : 0;
  const checkPulse = frame >= 30 && frame < 45
    ? interpolate(frame, [30, 37, 45], [1, 1.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  // White flash at smash cut
  const whiteFlash = frame >= 61 && frame < 63
    ? interpolate(frame, [61, 63], [0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Question phase (75-150)
  const questionPhase = frame >= 75;
  const butFirstOpacity = questionPhase
    ? interpolate(frame, [80, 88], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const questionY = questionPhase
    ? spring({ frame: Math.max(0, frame - 95), fps, from: 30, to: 0, durationInFrames: 20, config: anim.spring })
    : 30;
  const questionOpacity = questionPhase
    ? interpolate(frame, [95, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ background: brand.bgPrimary }}>
      {/* Glow behind spec */}
      {frame < 60 && (
        <div
          style={{
            position: "absolute",
            left: "15%",
            top: "30%",
            width: 400,
            height: 400,
            background: `radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)`,
            opacity: flashOpacity,
          }}
        />
      )}

      {/* Flash content */}
      {frame < 60 && (
        <>
          <SpecMockup opacity={flashOpacity} x={specIn} />
          <CodeMockup opacity={flashOpacity} x={codeIn} />

          {/* Checkmark */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) scale(${checkScale * checkPulse})`,
            }}
          >
            <CheckCircle size={iconSizes.lg} color={brand.accentGreen} strokeWidth={2} />
          </div>
        </>
      )}

      {/* White flash overlay */}
      {whiteFlash > 0 && (
        <AbsoluteFill style={{ background: `rgba(255,255,255,${whiteFlash})` }} />
      )}

      {/* Question text */}
      {questionPhase && (
        <div
          style={{
            position: "absolute",
            left: layout.marginX,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <div
            style={{
              ...typeScale.h2,
              color: brand.textSecondary,
              opacity: butFirstOpacity,
              marginBottom: 16,
            }}
          >
            But first—
          </div>
          <div
            style={{
              ...typeScale.h1,
              color: brand.textPrimary,
              opacity: questionOpacity,
              transform: `translateY(${questionY}px)`,
              maxWidth: 1200,
            }}
          >
            how much of your AI-generated code actually ships?
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
