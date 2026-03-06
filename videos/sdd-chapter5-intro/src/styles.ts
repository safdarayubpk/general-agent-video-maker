// === Brand Kit: AgentFactory — SDD Chapter 5 Intro ===

export const brand = {
  bgPrimary: "#0a0a0f",
  bgSecondary: "#1A1A1A",
  bgTertiary: "#262626",
  accentPrimary: "#3B82F6",
  accentGreen: "#22C55E",
  accentCyan: "#06B6D4",
  accentRed: "#EF4444",
  accentAmber: "#F59E0B",
  textPrimary: "rgba(255,255,255,0.95)",
  textSecondary: "rgba(255,255,255,0.65)",
  textDim: "rgba(255,255,255,0.4)",
  textCode: "#E2E8F0",
  vibeCodingTint: "rgba(239,68,68,0.08)",
  sddTint: "rgba(59,130,246,0.08)",
} as const;

export const fonts = {
  sans: "Inter, system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const typeScale = {
  display: { fontSize: 72, lineHeight: 1.1, fontWeight: 800, fontFamily: fonts.sans },
  h1: { fontSize: 56, lineHeight: 1.15, fontWeight: 700, fontFamily: fonts.sans },
  h2: { fontSize: 40, lineHeight: 1.2, fontWeight: 600, fontFamily: fonts.sans },
  h3: { fontSize: 32, lineHeight: 1.25, fontWeight: 600, fontFamily: fonts.sans },
  body: { fontSize: 24, lineHeight: 1.5, fontWeight: 400, fontFamily: fonts.sans },
  caption: { fontSize: 18, lineHeight: 1.4, fontWeight: 400, fontFamily: fonts.sans },
  code: { fontSize: 22, lineHeight: 1.6, fontWeight: 400, fontFamily: fonts.mono },
  codeSmall: { fontSize: 18, lineHeight: 1.5, fontWeight: 400, fontFamily: fonts.mono },
} as const;

export const iconSizes = { sm: 24, md: 48, lg: 64, xl: 80 } as const;

export const anim = {
  spring: { damping: 12, stiffness: 120, mass: 0.8 },
  springSnappy: { damping: 15, stiffness: 200, mass: 0.6 },
  springGentle: { damping: 14, stiffness: 80, mass: 1.0 },
  fadeIn: 10,
  fadeOut: 10,
  crossfade: 15,
  staggerDelay: 5,
} as const;

export const layout = {
  width: 1920,
  height: 1080,
  fps: 30,
  marginX: 120,
  marginY: 80,
  contentWidth: 1680,
  contentHeight: 920,
  panelWidth: 780,
  panelGap: 40,
  cardWidth: 1400,
  cardRadius: 16,
  terminalRadius: 12,
  terminalPadding: 32,
  windowDotSize: 12,
  windowDotGap: 8,
  windowChromeHeight: 40,
  captionBottomMargin: 60,
  captionMaxWidth: 1400,
} as const;

export const SCENE_TIMING = {
  scene1: { start: 0, duration: 150 },
  scene2: { start: 150, duration: 1500 },
  beat1: { start: 1650, duration: 45 },
  scene3: { start: 1695, duration: 1800 },
  beat2: { start: 3495, duration: 36 },
  scene4: { start: 3531, duration: 2250 },
  beat3: { start: 5781, duration: 30 },
  scene5: { start: 5811, duration: 900 },
  scene6: { start: 6711, duration: 489 },
} as const;

export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 7200,
} as const;
