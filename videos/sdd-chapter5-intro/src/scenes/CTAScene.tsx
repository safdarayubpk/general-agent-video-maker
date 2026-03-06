import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ExternalLink } from "lucide-react";
import { brand, typeScale, anim, iconSizes } from "../styles";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade to black (0-60 frames = 2s)
  const fadeIn = interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Thesis reveal (60-240 frames = 6s)
  const thesisText1 = "Stop talking to AI.";
  const thesisText2 = "Start specifying.";

  const text1Progress = frame >= 60
    ? interpolate(frame, [60, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const text1Chars = Math.floor(text1Progress * thesisText1.length);

  const text2Progress = frame >= 140
    ? interpolate(frame, [140, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const text2Chars = Math.floor(text2Progress * thesisText2.length);

  // Glow behind thesis
  const glowRadius = frame >= 60
    ? interpolate(frame, [60, 180], [0, 800], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Branding (240+ frames)
  const brandingPhase = frame >= 240;
  const thesisShiftY = brandingPhase
    ? spring({ frame: frame - 240, fps, from: 0, to: -80, config: anim.spring })
    : 0;

  const logoScale = brandingPhase
    ? spring({ frame: frame - 240, fps, from: 0.8, to: 1, config: anim.springGentle })
    : 0;
  const logoOpacity = brandingPhase
    ? interpolate(frame, [240, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const chapterOpacity = brandingPhase
    ? interpolate(frame, [250, 270], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const urlOpacity = brandingPhase
    ? interpolate(frame, [260, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const freeOpacity = brandingPhase
    ? interpolate(frame, [270, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ background: brand.bgPrimary, opacity: fadeIn }}>
      {/* Blue glow */}
      {glowRadius > 0 && (
        <div
          style={{
            position: "absolute",
            left: "30%",
            top: "35%",
            width: glowRadius * 2,
            height: glowRadius * 2,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Thesis + branding container — positioned upper-left to avoid YouTube end screen */}
      <div
        style={{
          position: "absolute",
          left: 160,
          top: "30%",
          transform: `translateY(${thesisShiftY}px)`,
        }}
      >
        {/* Line 1 */}
        <div style={{ ...typeScale.display, color: brand.textPrimary, marginBottom: 8 }}>
          {thesisText1.slice(0, text1Chars)}
          {text1Chars < thesisText1.length && text1Chars > 0 && (
            <span style={{ opacity: 0.5 }}>|</span>
          )}
        </div>

        {/* Line 2 */}
        <div style={{ ...typeScale.display, color: brand.accentPrimary, marginBottom: 48 }}>
          {thesisText2.slice(0, text2Chars)}
          {text2Chars < thesisText2.length && text2Chars > 0 && (
            <span style={{ opacity: 0.5 }}>|</span>
          )}
        </div>

        {/* Branding */}
        {brandingPhase && (
          <>
            <div
              style={{
                ...typeScale.h2,
                color: brand.textPrimary,
                opacity: logoOpacity,
                transform: `scale(${logoScale})`,
                transformOrigin: "left center",
                marginBottom: 16,
              }}
            >
              AgentFactory
            </div>
            <div style={{ ...typeScale.body, color: brand.textSecondary, opacity: chapterOpacity, marginBottom: 12 }}>
              Chapter 5: Spec-Driven Development
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: urlOpacity, marginBottom: 12 }}>
              <ExternalLink size={iconSizes.sm} color={brand.accentPrimary} />
              <span style={{ ...typeScale.caption, color: brand.accentPrimary }}>
                agentfactory.panaversity.org
              </span>
            </div>
            <div style={{ ...typeScale.caption, color: brand.textSecondary, opacity: freeOpacity }}>
              Full course. Free. Link below.
            </div>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};
