import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Lock, CheckCircle, RotateCcw } from "lucide-react";
import { brand, typeScale, anim, layout, iconSizes } from "../styles";

const VIBE_NODES = ["Human speaks", "AI interprets", "Code appears", "Human reacts", "AI re-interprets", "Code changes"];
const SDD_NODES = ["Human specifies", "Spec locked", "AI implements", "Code verified ✓"];

const FlowNode: React.FC<{
  label: string;
  color: string;
  x: number;
  y: number;
  opacity: number;
  jitter?: boolean;
  frame: number;
  icon?: React.ReactNode;
}> = ({ label, color, x, y, opacity, jitter, frame, icon }) => {
  const jitterX = jitter ? Math.sin(frame * 0.3) * 1 : 0;
  const jitterY = jitter ? Math.cos(frame * 0.4) * 1 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translate(${jitterX}px, ${jitterY}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          background: brand.bgSecondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ ...typeScale.caption, color: brand.textCode, whiteSpace: "nowrap" }}>
        {label}
      </span>
    </div>
  );
};

// Wavy SVG line
const WavyLine: React.FC<{ y1: number; y2: number; x: number; color: string; opacity: number; frame: number }> = ({
  y1, y2, x, color, opacity, frame,
}) => {
  const pathData = useMemo(() => {
    const points: string[] = [];
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const py = y1 + (y2 - y1) * t;
      const px = x + Math.sin(t * Math.PI * 3 + frame * 0.1) * 6;
      points.push(`${i === 0 ? "M" : "L"} ${px} ${py}`);
    }
    return points.join(" ");
  }, [y1, y2, x, frame]);

  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <path d={pathData} fill="none" stroke={color} strokeWidth={1.5} opacity={opacity} />
    </svg>
  );
};

// Straight SVG line
const StraightLine: React.FC<{ y1: number; y2: number; x: number; color: string; opacity: number }> = ({
  y1, y2, x, color, opacity,
}) => (
  <svg style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
    <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth={1.5} opacity={opacity} />
  </svg>
);

export const ShiftScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat phases
  const isBeat1 = frame < 600; // 0-600 (20s)
  const isBeat2 = frame >= 600 && frame < 1050; // 600-1050 (15s)
  const isBeat3 = frame >= 1050 && frame < 1500; // 1050-1500 (15s)
  const isBeat4 = frame >= 1500; // 1500-1800 (10s)

  // Beat 1: Flowline visibility
  const vibeOpacity = isBeat1
    ? interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : isBeat2
    ? interpolate(frame, [600, 615], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const sddLabelOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Beat 2: SDD expansion
  const sddCenterX = isBeat2
    ? spring({ frame: frame - 600, fps, from: 1300, to: 960, config: anim.spring })
    : isBeat1 ? 1300 : 960;
  const sddScale = isBeat2
    ? spring({ frame: frame - 600, fps, from: 1, to: 1.2, config: anim.spring })
    : isBeat1 ? 1 : 1.2;

  // Spec document reveal in beat 2
  const specRevealProgress = isBeat2
    ? spring({ frame: Math.max(0, frame - 650), fps, from: 0, to: 1, config: anim.springGentle })
    : isBeat3 || isBeat4 ? 1 : 0;

  // Beat 3: Stack metaphor
  const stackProgress = isBeat3
    ? spring({ frame: frame - 1050, fps, from: 0, to: 1, config: anim.spring })
    : isBeat4 ? 1 : 0;

  // Beat 4: Pull back + thesis
  const pullBackScale = isBeat4
    ? interpolate(frame, [1500, 1530], [1, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const pullBackOpacity = isBeat4
    ? interpolate(frame, [1500, 1530], [1, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const thesisLine1Opacity = isBeat4
    ? interpolate(frame, [1530, 1545], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const thesisLine2Y = isBeat4
    ? spring({ frame: Math.max(0, frame - 1565), fps, from: 30, to: 0, config: anim.spring })
    : 30;
  const thesisLine2Opacity = isBeat4
    ? interpolate(frame, [1565, 1580], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Glow behind thesis
  const glowRadius = isBeat4
    ? interpolate(frame, [1530, 1600], [0, 800], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Positions for vibe coding flowline
  const vibeX = 500;
  const vibeStartY = 120;
  const vibeGap = 120;

  // Spec document sections
  const specSections = ["## Intent", "## Constraints", "## Success Criteria"];

  return (
    <AbsoluteFill style={{ background: brand.bgPrimary }}>
      {/* Vibe coding flowline (left side) */}
      {vibeOpacity > 0 && (
        <>
          <div style={{ ...typeScale.h3, color: brand.accentRed, opacity: vibeOpacity * 0.8, position: "absolute", left: vibeX - 80, top: 40 }}>
            VIBE CODING
          </div>
          {VIBE_NODES.map((label, i) => {
            const nodeOpacity = interpolate(frame, [i * 8, i * 8 + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <React.Fragment key={label}>
                <FlowNode
                  label={label}
                  color={brand.accentRed}
                  x={vibeX}
                  y={vibeStartY + i * vibeGap}
                  opacity={Math.min(nodeOpacity, vibeOpacity)}
                  jitter
                  frame={frame}
                />
                {i < VIBE_NODES.length - 1 && (
                  <WavyLine
                    y1={vibeStartY + i * vibeGap + 24}
                    y2={vibeStartY + (i + 1) * vibeGap - 24}
                    x={vibeX - 24}
                    color={brand.accentRed}
                    opacity={Math.min(nodeOpacity, vibeOpacity) * 0.4}
                    frame={frame}
                  />
                )}
              </React.Fragment>
            );
          })}
          {/* Loop arrow */}
          <div style={{ position: "absolute", left: vibeX - 80, top: vibeStartY + 5 * vibeGap + 40, opacity: vibeOpacity * 0.5 }}>
            <RotateCcw size={iconSizes.sm} color={brand.accentRed} />
          </div>
        </>
      )}

      {/* SDD flowline (right side, moves to center in beat 2) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          transform: `scale(${sddScale * pullBackScale})`,
          transformOrigin: `${sddCenterX}px 400px`,
          opacity: pullBackOpacity,
        }}
      >
        <div style={{ ...typeScale.h3, color: brand.accentPrimary, opacity: sddLabelOpacity * 0.8, position: "absolute", left: sddCenterX - 80, top: 40 }}>
          SPEC-DRIVEN
        </div>
        {SDD_NODES.map((label, i) => {
          const nodeOpacity = interpolate(frame, [15 + i * 8, 25 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <React.Fragment key={label}>
              <FlowNode
                label={label}
                color={brand.accentPrimary}
                x={sddCenterX}
                y={vibeStartY + i * 160}
                opacity={nodeOpacity}
                frame={frame}
                icon={
                  label === "Spec locked" ? <Lock size={16} color={brand.accentPrimary} /> :
                  label === "Code verified ✓" ? <CheckCircle size={16} color={brand.accentGreen} /> :
                  undefined
                }
              />
              {i < SDD_NODES.length - 1 && (
                <StraightLine
                  y1={vibeStartY + i * 160 + 24}
                  y2={vibeStartY + (i + 1) * 160 - 24}
                  x={sddCenterX - 24}
                  color={brand.accentPrimary}
                  opacity={nodeOpacity * 0.6}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Spec document (Beat 2) */}
      {specRevealProgress > 0 && !isBeat3 && !isBeat4 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${specRevealProgress})`,
            width: "55%",
            background: `${brand.bgSecondary}e6`,
            borderRadius: layout.cardRadius,
            padding: 40,
            border: `1px solid rgba(255,255,255,0.08)`,
          }}
        >
          {specSections.map((section, i) => {
            const sectionGlowStart = 700 + i * 60;
            const isGlowing = frame >= sectionGlowStart && frame < sectionGlowStart + 20;
            return (
              <div key={section} style={{ marginBottom: 24 }}>
                <div style={{ ...typeScale.code, color: isGlowing ? brand.accentPrimary : brand.textPrimary, transition: "color 0.3s" }}>
                  {section}
                </div>
                <div style={{ ...typeScale.codeSmall, color: brand.textDim, marginTop: 8 }}>
                  {i === 0 && "Define what the system should accomplish"}
                  {i === 1 && "Technical boundaries and requirements"}
                  {i === 2 && "Measurable verification checkpoints"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stack metaphor (Beat 3) */}
      {(isBeat3 || isBeat4) && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${pullBackScale})`,
            opacity: pullBackOpacity,
            width: layout.contentWidth * 0.6,
          }}
        >
          {/* Foundation bars (spec sections) */}
          {specSections.map((section, i) => {
            const stackFrame = Math.max(0, frame - 1050 - i * 8);
            const barProgress = spring({ frame: stackFrame, fps, from: 0, to: 1, config: anim.spring });
            return (
              <div
                key={section}
                style={{
                  height: 20,
                  background: brand.accentPrimary,
                  opacity: barProgress * 0.8,
                  borderRadius: 4,
                  marginBottom: 8,
                  transform: `scaleX(${barProgress})`,
                  transformOrigin: "left",
                }}
              />
            );
          })}

          {/* Code blocks stacking on top */}
          {[0, 1, 2, 3, 4].map((i) => {
            const blockDelay = 20 + i * 6;
            const stackFrame = Math.max(0, frame - 1050 - blockDelay);
            const blockProgress = spring({ frame: stackFrame, fps, from: 0, to: 1, config: anim.spring });
            const blockX = spring({ frame: stackFrame, fps, from: 200, to: 0, config: anim.spring });
            const heights = [60, 45, 70, 40, 55];
            return (
              <div
                key={i}
                style={{
                  height: heights[i],
                  background: brand.bgTertiary,
                  opacity: blockProgress * 0.9,
                  borderRadius: 6,
                  marginBottom: 4,
                  transform: `translateX(${blockX}px)`,
                  border: `1px solid rgba(255,255,255,0.04)`,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 16,
                }}
              >
                <span style={{ ...typeScale.codeSmall, color: brand.textDim, opacity: 0.4 }}>
                  {"const "}{["handler", "schema", "middleware", "validate", "respond"][i]}{" = ..."}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Thesis text (Beat 4) */}
      {isBeat4 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: glowRadius * 2,
              height: glowRadius * 2,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div style={{ ...typeScale.display, color: brand.textPrimary, opacity: thesisLine1Opacity, marginBottom: 16 }}>
            The specification is the primary
          </div>
          <div style={{ ...typeScale.display, color: brand.textPrimary, opacity: thesisLine1Opacity, marginBottom: 24 }}>
            development artifact.
          </div>
          <div
            style={{
              ...typeScale.display,
              color: brand.textPrimary,
              opacity: thesisLine2Opacity,
              transform: `translateY(${thesisLine2Y}px)`,
            }}
          >
            Code is the <span style={{ color: brand.accentPrimary }}>compiled output.</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
