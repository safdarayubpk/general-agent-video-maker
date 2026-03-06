import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { FileText, RefreshCw, CheckCircle, Network } from "lucide-react";
import { brand, typeScale, anim, layout, iconSizes } from "../styles";
import { TerminalWindow } from "../components/TerminalWindow";

const VIBE_MESSAGES = [
  { prompt: '"Add a user profile endpoint"', response: "app.post('/profile', (req, res) => {\n  const user = req.body;\n  db.save(user);\n});" },
  { prompt: '"No, use Zod for validation"', response: "// Rewriting with Zod...\nconst schema = z.object({...});" },
  { prompt: '"You forgot the error handling"', response: "// Sorry, adding try/catch...\ntry { ... } catch(e) { ... }" },
  { prompt: '"That\'s not how our auth works"', response: "// Updating auth approach...\nconst auth = passport.use(...);" },
  { prompt: '"Start over, keep Zod from v2"', response: "// Starting fresh...\nimport { z } from 'zod';" },
];

const SPEC_LINES = [
  "## Intent",
  "POST /api/users/profile — Create/update user profile",
  "",
  "## Constraints",
  "- Validation: Zod schema, strict mode",
  "- Auth: existing bearerAuth middleware",
  "- Errors: RFC 7807 problem details",
  "",
  "## Success Criteria",
  "- [ ] Validates against UserProfile schema",
  "- [ ] Returns 201 on create, 200 on update",
  "- [ ] Matches existing error pattern",
];

export const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase markers (relative to scene start)
  const isSetup = frame < 300; // 0-10s
  const isVibePanel = frame >= 300 && frame < 1050; // 10-35s
  const isSddPanel = frame >= 1050 && frame < 1800; // 35-60s (includes comparison)
  const isInsight = frame >= 1800 && frame < 2100; // 60-70s (insight + constellation setup)
  const isConstellation = frame >= 1950; // 65-75s

  // Setup text
  const setupTextOpacity = isSetup
    ? spring({ frame, fps, from: 0, to: 1, config: anim.spring })
    : 0;
  const setupTextScale = isSetup
    ? spring({ frame, fps, from: 0.9, to: 1, config: anim.spring })
    : 1;
  const taskLabelOpacity = isSetup
    ? interpolate(frame, [135, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const challengeOpacity = isSetup
    ? interpolate(frame, [0, 135, 160], [1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Task banner
  const bannerY = frame >= 300
    ? spring({ frame: frame - 300, fps, from: 400, to: 0, config: anim.springSnappy })
    : 400;

  // Vibe coding panel
  const vibeTerminalX = frame >= 300
    ? spring({ frame: frame - 300, fps, from: -layout.width, to: 0, config: anim.spring })
    : -layout.width;

  // When SDD panel appears, vibe slides left
  const vibeSlideLeft = frame >= 1050
    ? spring({ frame: frame - 1050, fps, from: 0, to: -layout.marginX, config: anim.spring })
    : 0;
  const vibeWidth = frame >= 1050
    ? spring({ frame: frame - 1050, fps, from: layout.contentWidth, to: layout.panelWidth, config: anim.spring })
    : layout.contentWidth;
  const vimeDim = frame >= 1050
    ? interpolate(frame, [1050, 1080], [1, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  // Visible messages count
  const visibleMessages = useMemo(() => {
    if (frame < 300) return 0;
    const messageFrame = frame - 300;
    return Math.min(5, Math.floor(messageFrame / 90) + 1);
  }, [frame]);

  // Rewrite count
  const rewriteCount = useMemo(() => {
    if (visibleMessages <= 1) return 0;
    const counts = [0, 1, 3, 5, 7];
    return counts[Math.min(visibleMessages - 1, 4)];
  }, [visibleMessages]);

  // SDD panel
  const sddTerminalX = frame >= 1050
    ? spring({ frame: frame - 1050, fps, from: layout.width, to: 0, config: anim.spring })
    : layout.width;

  // Spec typing progress
  const specTypingProgress = frame >= 1080
    ? interpolate(frame, [1080, 1500], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const specFullText = SPEC_LINES.join("\n");
  const visibleSpecLength = Math.floor(specTypingProgress * specFullText.length);
  const visibleSpec = specFullText.slice(0, visibleSpecLength);

  // Checkmarks
  const checkmark1 = frame >= 1550 ? spring({ frame: frame - 1550, fps, from: 0, to: 1, config: anim.springSnappy }) : 0;
  const checkmark2 = frame >= 1560 ? spring({ frame: frame - 1560, fps, from: 0, to: 1, config: anim.springSnappy }) : 0;
  const checkmark3 = frame >= 1570 ? spring({ frame: frame - 1570, fps, from: 0, to: 1, config: anim.springSnappy }) : 0;

  // Comparison metrics
  const metricsOpacity = frame >= 1600
    ? interpolate(frame, [1600, 1620], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Metric bar
  const metricBarProgress = frame >= 1650
    ? interpolate(frame, [1650, 1680], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Insight zoom
  const insightScale = isInsight
    ? spring({ frame: frame - 1800, fps, from: 1, to: 1.5, config: anim.springGentle })
    : 1;
  const insightOpacity = isInsight
    ? interpolate(frame, [1800, 1830], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Constellation
  const constellationOpacity = isConstellation
    ? interpolate(frame, [1950, 1990], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // End dim
  const endDim = interpolate(frame, [2220, 2250], [1, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: brand.bgPrimary, opacity: endDim }}>
      {/* Setup: challenge text */}
      {challengeOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: `translate(-50%, -50%) scale(${setupTextScale})`,
            opacity: challengeOpacity,
            textAlign: "center",
          }}
        >
          <div style={{ ...typeScale.h2, color: brand.textPrimary }}>
            Same task. Two approaches.
          </div>
        </div>
      )}

      {/* Task banner */}
      {frame >= 160 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: isSetup ? "45%" : 24,
            transform: `translate(-50%, ${isSetup ? "-50%" : "0"}) translateY(${isSetup ? 0 : bannerY}px)`,
            opacity: taskLabelOpacity,
            display: "flex",
            alignItems: "center",
            gap: 12,
            zIndex: 5,
          }}
        >
          <FileText size={iconSizes.md} color={brand.accentPrimary} />
          <span style={{ ...typeScale.h3, color: brand.accentPrimary }}>
            Build an API endpoint for user profiles with validation
          </span>
        </div>
      )}

      {/* Vibe coding panel */}
      {frame >= 300 && (
        <div
          style={{
            position: "absolute",
            left: layout.marginX + vibeSlideLeft,
            top: layout.marginY + 50,
            width: vibeWidth,
            bottom: frame >= 1600 ? 180 : layout.marginY,
            transform: `translateX(${vibeTerminalX}px)`,
            opacity: vimeDim,
          }}
        >
          <TerminalWindow title="AI Chat — Vibe Coding" tint={brand.vibeCodingTint}>
            <div style={{ overflow: "hidden", height: "100%" }}>
              {VIBE_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ ...typeScale.codeSmall, color: brand.accentCyan, marginBottom: 4 }}>
                    {">"} {msg.prompt}
                  </div>
                  <div style={{ ...typeScale.codeSmall, color: brand.textDim, paddingLeft: 16 }}>
                    {msg.response}
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>

          {/* Rewrite counter */}
          {rewriteCount > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <RefreshCw size={iconSizes.sm} color={brand.accentRed} />
              <span style={{ ...typeScale.h3, color: brand.accentRed }}>{rewriteCount}</span>
            </div>
          )}

          {/* Vibe label */}
          {metricsOpacity > 0 && (
            <div style={{ marginTop: 12, opacity: metricsOpacity }}>
              <span style={{ ...typeScale.caption, color: brand.textDim }}>Typical: </span>
              <span style={{ ...typeScale.body, color: brand.accentRed }}>
                ~7 rewrites · ~20+ min · pattern mismatch
              </span>
            </div>
          )}
        </div>
      )}

      {/* SDD panel */}
      {frame >= 1050 && (
        <div
          style={{
            position: "absolute",
            right: layout.marginX,
            top: layout.marginY + 50,
            width: layout.panelWidth,
            bottom: frame >= 1600 ? 180 : layout.marginY,
            transform: `translateX(${sddTerminalX}px)`,
          }}
        >
          <TerminalWindow title="Spec → Implementation" tint={brand.sddTint}>
            <pre
              style={{
                ...typeScale.codeSmall,
                color: brand.textCode,
                whiteSpace: "pre-wrap",
                margin: 0,
              }}
            >
              {visibleSpec.split("\n").map((line, i) => (
                <div key={i}>
                  {line.startsWith("##") ? (
                    <span style={{ color: brand.accentPrimary }}>{line}</span>
                  ) : line.startsWith("- [") ? (
                    <span>
                      {(i === 9 && checkmark1 > 0) || (i === 10 && checkmark2 > 0) || (i === 11 && checkmark3 > 0)
                        ? <span style={{ color: brand.accentGreen }}>- [✓]{line.slice(4)}</span>
                        : line
                      }
                    </span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </pre>
          </TerminalWindow>

          {/* SDD label */}
          {metricsOpacity > 0 && (
            <div style={{ marginTop: 12, opacity: metricsOpacity }}>
              <span style={{ ...typeScale.body, color: brand.accentGreen }}>
                1 pass · ~4 min · all criteria met
              </span>
            </div>
          )}
        </div>
      )}

      {/* Metric bar */}
      {metricsOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            opacity: metricsOpacity,
            textAlign: "center",
          }}
        >
          <div style={{ ...typeScale.caption, color: brand.textDim, marginBottom: 8 }}>
            Typical scenario
          </div>
          <div
            style={{
              height: 32,
              background: brand.bgTertiary,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${metricBarProgress}%`,
                background: brand.accentGreen,
                borderRadius: 16,
                transition: "width 0.1s",
              }}
            />
          </div>
          <div style={{ ...typeScale.h2, color: brand.textPrimary, marginTop: 12 }}>
            Typical time saved: ~{Math.round(metricBarProgress)}%
          </div>
        </div>
      )}

      {/* Insight zoom overlay */}
      {insightOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: `translate(-50%, -50%) scale(${insightScale})`,
            opacity: insightOpacity,
            background: `${brand.bgSecondary}f0`,
            borderRadius: layout.cardRadius,
            padding: 40,
            border: `2px solid ${brand.accentPrimary}40`,
            zIndex: 20,
          }}
        >
          <div style={{ ...typeScale.code, color: brand.accentPrimary, marginBottom: 16 }}>
            ## Constraints
          </div>
          <div style={{ ...typeScale.code, color: brand.textCode, marginBottom: 8 }}>
            - Validation: Zod schema, strict mode
          </div>
          <div
            style={{
              ...typeScale.code,
              color: brand.textCode,
              padding: "8px 16px",
              background: `${brand.accentPrimary}20`,
              border: `1px solid ${brand.accentPrimary}60`,
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            - Auth: existing bearerAuth middleware
          </div>
          <div style={{ ...typeScale.caption, color: brand.textSecondary, marginTop: 16, fontStyle: "italic" }}>
            Institutional knowledge
          </div>
        </div>
      )}

      {/* Constellation */}
      {constellationOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            opacity: constellationOpacity,
            zIndex: 15,
          }}
        >
          {/* Central spec */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Network size={iconSizes.md} color={brand.accentCyan} style={{ opacity: 0.4 }} />
          </div>
          {/* Orbiting spec thumbnails */}
          {[...Array(7)].map((_, i) => {
            const angle = (i / 7) * Math.PI * 2 + frame * 0.003;
            const radius = 200 + i * 30;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.5;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  width: 120,
                  height: 80,
                  background: `${brand.bgSecondary}cc`,
                  borderRadius: 8,
                  border: `1px solid rgba(255,255,255,0.06)`,
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ ...typeScale.codeSmall, color: brand.textDim, fontSize: 10, opacity: 0.5 }}>
                  spec.md
                </span>
              </div>
            );
          })}
          {/* Connecting lines via SVG */}
          <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
            {[...Array(7)].map((_, i) => {
              const angle = (i / 7) * Math.PI * 2 + frame * 0.003;
              const radius = 200 + i * 30;
              const x = 960 + Math.cos(angle) * radius;
              const y = 540 + Math.sin(angle) * radius * 0.5;
              return (
                <line key={i} x1={960} y1={540} x2={x} y2={y} stroke={brand.accentCyan} strokeWidth={1} opacity={0.2} />
              );
            })}
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};
