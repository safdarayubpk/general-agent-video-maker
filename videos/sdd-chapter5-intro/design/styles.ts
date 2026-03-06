// === Brand Kit: AgentFactory — SDD Chapter 5 Intro ===
// Single source of truth for all visual constants

// --- Colors ---
export const brand = {
  // Backgrounds
  bgPrimary: "#0a0a0f",       // Deep dark — main canvas
  bgSecondary: "#1A1A1A",     // Card/panel backgrounds
  bgTertiary: "#262626",      // Elevated surfaces (code blocks, terminals)

  // Accent
  accentPrimary: "#3B82F6",   // Blue — CTAs, highlights, glow effects
  accentGreen: "#22C55E",     // Success states, checkmarks, "spec-driven" side
  accentCyan: "#06B6D4",      // Secondary accent for diagrams, flowlines
  accentRed: "#EF4444",       // Error states, vibe coding failure indicators
  accentAmber: "#F59E0B",     // Warning, iteration counter

  // Text
  textPrimary: "rgba(255,255,255,0.95)",
  textSecondary: "rgba(255,255,255,0.65)",   // [Fix 7.4] Bumped from 0.55 → 0.65 for WCAG AA contrast (~5.1:1 on bgPrimary)
  textDim: "rgba(255,255,255,0.4)",          // [Fix 7.4] Bumped from 0.3 → 0.4 (~3.1:1). Decorative only — WCAG exempts.
  textCode: "#E2E8F0",        // Code text — slightly blue-tinted white. Used for all monospace in terminals unless syntax-highlighted.

  // Gradients
  surfaceGradient: "linear-gradient(180deg, #2a2a2a 0%, #262626 100%)",
  glowBlue: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
  glowGreen: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
  glowRed: "radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 70%)",

  // Scene-specific
  vibeCodingTint: "rgba(239,68,68,0.08)",   // Red tint for vibe coding panels
  sddTint: "rgba(59,130,246,0.08)",          // Blue tint for SDD panels
} as const;

// --- Typography ---
export const fonts = {
  sans: "Inter, system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

// Modular type scale (1.250 — Major Third)
export const typeScale = {
  // Display — scene titles, thesis statement
  display: { fontSize: 72, lineHeight: 1.1, fontWeight: 800, fontFamily: fonts.sans },
  // H1 — section headers, failure card labels
  h1: { fontSize: 56, lineHeight: 1.15, fontWeight: 700, fontFamily: fonts.sans },
  // H2 — sub-headers, card captions
  h2: { fontSize: 40, lineHeight: 1.2, fontWeight: 600, fontFamily: fonts.sans },
  // H3 — labels, counters
  h3: { fontSize: 32, lineHeight: 1.25, fontWeight: 600, fontFamily: fonts.sans },
  // Body — narration text overlays, descriptions
  body: { fontSize: 24, lineHeight: 1.5, fontWeight: 400, fontFamily: fonts.sans },
  // Caption — timestamps, small labels
  caption: { fontSize: 18, lineHeight: 1.4, fontWeight: 400, fontFamily: fonts.sans },
  // Code — terminal text, spec documents, code blocks
  code: { fontSize: 22, lineHeight: 1.6, fontWeight: 400, fontFamily: fonts.mono },
  // Code small — dense code views
  codeSmall: { fontSize: 18, lineHeight: 1.5, fontWeight: 400, fontFamily: fonts.mono },
} as const;

// --- Icon Sizes --- [Fix 4.2]
export const iconSizes = {
  sm: 24,    // Inline icons, small labels
  md: 48,    // Mid-size indicators, card icons
  lg: 64,    // Scene 1 checkmark, Scene 5 card icons
  xl: 80,    // Scene 2 failure card icons (full-screen cards)
} as const;

// --- Animation Constants ---
export const animation = {
  // Spring physics — primary entrance animation
  spring: {
    damping: 12,
    stiffness: 120,
    mass: 0.8,
  },
  // Spring — snappy variant for UI elements
  springSnappy: {
    damping: 15,
    stiffness: 200,
    mass: 0.6,
  },
  // Spring — gentle variant for large elements
  springGentle: {
    damping: 14,
    stiffness: 80,
    mass: 1.0,
  },
  // Fade durations (in frames at 30fps)
  fadeIn: 10,           // 0.33s
  fadeOut: 10,          // 0.33s
  crossfade: 15,        // 0.5s — scene transitions
  staggerDelay: 5,      // 0.17s — between sequential element entrances
  // Beat pauses (in frames at 30fps)
  beatShort: 30,        // 1.0s
  beatMedium: 36,       // 1.2s
  beatLong: 45,         // 1.5s
} as const;

// --- Layout Constants ---
export const layout = {
  width: 1920,
  height: 1080,
  fps: 30,
  // Safe margins
  marginX: 120,         // Horizontal safe area
  marginY: 80,          // Vertical safe area
  // Content area
  contentWidth: 1680,   // 1920 - 2*120
  contentHeight: 920,   // 1080 - 2*80
  // Panel sizing (for Scene 4 comparison)
  panelWidth: 780,      // ~half content width with gap
  panelGap: 40,
  // Card sizing (for Scene 2 failure cards, Scene 5 preview cards)
  cardWidth: 1400,
  cardHeight: 280,
  cardRadius: 16,
  // Terminal/code block
  terminalRadius: 12,
  terminalPadding: 32,
  // macOS window chrome
  windowDotSize: 12,
  windowDotGap: 8,
  windowChromeHeight: 40,
  // Caption overlay
  captionBottomMargin: 60,  // Distance from bottom edge
  captionMaxWidth: 1400,    // Max width for caption text
  captionPadding: 12,       // Padding inside caption background
} as const;

// --- Video Configuration ---
export const videoConfig = {
  width: layout.width,
  height: layout.height,
  fps: layout.fps,
  durationInFrames: 7200,  // [Fix 1.1] 4:00 = 7200 frames. Last 39 frames are extended branding hold.
} as const;

// --- Scene Timing (in frames at 30fps) ---
export const sceneTiming = {
  scene1_coldOpen: { start: 0, duration: 150 },              // 0:00 — 0:05 (5s)
  scene2_problem: { start: 150, duration: 1500 },            // 0:05 — 0:55 (50s)
  beat1: { start: 1650, duration: 45 },                       // 0:55 — 0:57 (1.5s)
  scene3_shift: { start: 1695, duration: 1800 },             // 0:57 — 1:57 (60s)
  beat2: { start: 3495, duration: 36 },                       // 1:57 — 1:58 (1.2s)
  scene4_proof: { start: 3531, duration: 2250 },             // 1:58 — 3:13 (75s)
  beat3: { start: 5781, duration: 30 },                       // 3:13 — 3:14 (1s)
  scene5_preview: { start: 5811, duration: 900 },            // 3:14 — 3:44 (30s)
  scene6_cta: { start: 6711, duration: 489 },                // 3:44 — 4:00 (16.3s) [Fix 1.1] Extended to fill 7200 frames. Extra time = branding hold.
} as const;
