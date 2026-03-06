import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Layers, Orbit as OrbitIcon, FileCode } from "lucide-react";
import { brand, typeScale, anim, layout, iconSizes, fonts } from "../styles";

interface PreviewCardProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  caption: string;
  frame: number;
  fps: number;
  enterFrame: number;
  exitFrame: number;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ icon, children, caption, frame, fps, enterFrame, exitFrame }) => {
  const localFrame = frame - enterFrame;
  const isExiting = frame >= exitFrame;

  // 3D flip entrance
  const rotateY = localFrame >= 0
    ? spring({ frame: localFrame, fps, from: 90, to: 8, config: anim.springSnappy })
    : 90;

  // Exit
  const exitX = isExiting
    ? spring({ frame: frame - exitFrame, fps, from: 0, to: -400, config: anim.spring })
    : 0;
  const exitOpacity = isExiting
    ? interpolate(frame, [exitFrame, exitFrame + 15], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : localFrame >= 0 ? 1 : 0;

  if (exitOpacity <= 0 && localFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: `translate(-50%, -50%) translateX(${exitX}px) perspective(1000px) rotateY(${rotateY}deg)`,
        opacity: exitOpacity,
        backfaceVisibility: "hidden",
        width: layout.cardWidth,
      }}
    >
      {/* Card body */}
      <div
        style={{
          background: brand.bgSecondary,
          borderRadius: layout.cardRadius,
          border: `1px solid ${brand.accentPrimary}33`,
          padding: 48,
          minHeight: 400,
          position: "relative",
        }}
      >
        {/* Icon */}
        <div style={{ position: "absolute", top: 24, left: 24 }}>
          {icon}
        </div>
        {/* Content */}
        <div style={{ marginTop: 60 }}>
          {children}
        </div>
      </div>
      {/* Caption */}
      <div
        style={{
          ...typeScale.caption,
          color: brand.textSecondary,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

export const PreviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card timing (relative to scene)
  const card1Enter = 0;
  const card1Exit = 300;
  const card2Enter = 300;
  const card2Exit = 600;
  const card3Enter = 600;

  return (
    <AbsoluteFill style={{ background: brand.bgPrimary }}>
      {/* Card 1: Three SDD Levels */}
      <PreviewCard
        icon={<Layers size={iconSizes.lg} color={brand.accentPrimary} />}
        caption="Three levels — from guidance to full code generation from specs"
        frame={frame}
        fps={fps}
        enterFrame={card1Enter}
        exitFrame={card1Exit}
      >
        <div style={{ display: "flex", gap: 40, justifyContent: "center", alignItems: "flex-end", height: 200 }}>
          {["Spec-First", "Spec-Anchored", "Spec-as-Source"].map((label, i) => {
            const platformHeight = 60 + i * 50;
            const platformOpacity = 0.6 + i * 0.15;
            const platformDelay = 15 + i * 8;
            const scaleUp = frame >= platformDelay
              ? spring({ frame: Math.max(0, frame - platformDelay), fps, from: 0, to: 1, config: anim.spring })
              : 0;

            return (
              <div key={label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    ...typeScale.h3,
                    color: brand.textPrimary,
                    marginBottom: 12,
                    opacity: scaleUp,
                    fontSize: 20 + i * 4,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    width: 200 + i * 40,
                    height: platformHeight,
                    background: `${brand.accentPrimary}${Math.round(platformOpacity * 255).toString(16).padStart(2, "0")}`,
                    borderRadius: 8,
                    transform: `scaleY(${scaleUp})`,
                    transformOrigin: "bottom",
                    boxShadow: `0 0 ${20 + i * 10}px ${brand.accentPrimary}20`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </PreviewCard>

      {/* Card 2: Four-Phase Workflow */}
      <PreviewCard
        icon={<OrbitIcon size={iconSizes.lg} color={brand.accentPrimary} />}
        caption="A four-phase workflow — from investigation to atomic commits"
        frame={frame}
        fps={fps}
        enterFrame={card2Enter}
        exitFrame={card2Exit}
      >
        <div style={{ position: "relative", height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Center label */}
          <div style={{ ...typeScale.h3, color: brand.accentPrimary, zIndex: 2 }}>SDD</div>

          {/* Orbital nodes */}
          {["Research", "Specify", "Interview", "Implement"].map((label, i) => {
            const cardFrame = frame - card2Enter;
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 2 + cardFrame * 0.008;
            const radius = 110;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const nodeScale = cardFrame >= 20 + i * 6
              ? spring({ frame: Math.max(0, cardFrame - 20 - i * 6), fps, from: 0, to: 1, config: anim.springSnappy })
              : 0;

            return (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) scale(${nodeScale})`,
                  background: brand.bgTertiary,
                  border: `1px solid ${brand.accentCyan}60`,
                  borderRadius: 8,
                  padding: "8px 16px",
                }}
              >
                <span style={{ ...typeScale.caption, color: brand.textPrimary }}>{label}</span>
              </div>
            );
          })}

          {/* Orbital ring */}
          <svg style={{ position: "absolute", width: 300, height: 300, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <circle cx={150} cy={150} r={110} fill="none" stroke={brand.accentCyan} strokeWidth={1.5} opacity={0.35} strokeDasharray="4 8" />
          </svg>

          {/* Particles */}
          {[0, 1, 2].map((p) => {
            const cardFrame = frame - card2Enter;
            const pAngle = cardFrame * 0.03 + (p / 3) * Math.PI * 2;
            const px = Math.cos(pAngle) * 110;
            const py = Math.sin(pAngle) * 110;
            return (
              <div
                key={p}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${px}px)`,
                  top: `calc(50% + ${py}px)`,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: brand.accentCyan,
                  opacity: 0.6,
                  transform: "translate(-50%, -50%)",
                }}
              />
            );
          })}
        </div>
      </PreviewCard>

      {/* Card 3: Claude Code Native */}
      <PreviewCard
        icon={<FileCode size={iconSizes.lg} color={brand.accentPrimary} />}
        caption="Native implementation in Claude Code — no frameworks, built in"
        frame={frame}
        fps={fps}
        enterFrame={card3Enter}
        exitFrame={99999}
      >
        <div style={{ position: "relative", height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* CLAUDE.md center */}
          <div
            style={{
              background: brand.bgTertiary,
              borderRadius: 8,
              padding: "16px 24px",
              border: `1px solid ${brand.accentPrimary}40`,
              zIndex: 2,
            }}
          >
            <span style={{ ...typeScale.code, color: brand.textCode }}>CLAUDE.md</span>
          </div>

          {/* Radiating agent icons */}
          {[0, 1, 2, 3].map((i) => {
            const cardFrame = frame - card3Enter;
            const agentScale = cardFrame >= 20 + i * 6
              ? spring({ frame: Math.max(0, cardFrame - 20 - i * 6), fps, from: 0, to: 1, config: anim.spring })
              : 0;
            const angle = (i / 4) * Math.PI * 2 - Math.PI / 4;
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const labels = ["Subagent", "Tasks", "Interview", "Research"];

            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    position: "absolute",
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: brand.accentCyan,
                    transform: `translate(-50%, -50%) scale(${agentScale})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: brand.bgPrimary,
                    fontWeight: 700,
                    fontFamily: fonts.sans,
                  }}
                >
                  {labels[i][0]}
                </div>
                {/* Connection line */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: Math.sqrt(x * x + y * y),
                    height: 1,
                    background: brand.accentCyan,
                    opacity: agentScale * 0.4,
                    transformOrigin: "0 0",
                    transform: `rotate(${Math.atan2(y, x)}rad)`,
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
      </PreviewCard>
    </AbsoluteFill>
  );
};

