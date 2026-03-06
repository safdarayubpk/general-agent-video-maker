# Asset List — SDD Chapter 5 Intro Video

## Lucide Icons Required

| Icon Name | Size | Scene(s) | Usage |
|-----------|------|----------|-------|
| `Brain` | xl (80px) | 2 | Context Amnesia failure card |
| `Shuffle` | xl (80px) | 2 | Assumption Drift failure card |
| `GitBranch` | xl (80px) | 2 | Pattern Fracture failure card |
| `Check` | sm (24px) | 1, 2, 4 | Success badge icon, inline checkmarks |
| `CheckCircle` | lg (64px) | 1, 3, 4 | Scene 1 checkmark, flowline terminus, spec criteria met |
| `X` | sm (24px) | 4 | Vibe coding failure indicators |
| `FileText` | md (48px) | 1, 3, 4 | Spec document icon |
| `Code` | md (48px) | 1, 4 | Generated code icon |
| `Terminal` | sm (24px) | 2, 4 | Terminal/chat interface title bar |
| `MessageSquare` | sm (24px) | 2, 4 | Chat messages in vibe coding |
| `ArrowRight` | sm (24px) | 3 | Flowline direction arrows |
| `RotateCcw` | sm (24px) | 3 | Vibe coding infinite loop arrow |
| `Lock` | sm (24px) | 3 | "Spec locked" node icon |
| `Layers` | lg (64px) | 5 | Three SDD levels card icon |
| `Orbit` | lg (64px) | 5 | Four-phase workflow card icon |
| `FileCode` | lg (64px) | 5 | CLAUDE.md / Claude Code card icon |
| `ExternalLink` | sm (24px) | 6 | CTA link indicator |
| `Timer` | sm (24px) | 4 | Time comparison metric |
| `RefreshCw` | sm (24px) | 4 | Rewrite counter |
| `Network` | md (48px) | 4 | Spec constellation |

## Fonts to Load

| Font | Weight(s) | Source |
|------|-----------|--------|
| Inter | 400, 600, 700, 800 | Google Fonts |
| JetBrains Mono | 400, 700 | Google Fonts — 700 used for syntax-highlighted keywords |

## Custom UI Elements

| Element | Scene(s) | Notes |
|---------|----------|-------|
| macOS window chrome dots | 2, 4 | Three circles: #FF5F56 (red), #FFBD2E (amber), #27C93F (green). Size: `windowDotSize` (12px). Gap: `windowDotGap` (8px). Not Lucide icons — custom drawn circles. |
| Caption overlay bar | All | Semi-transparent dark bar at bottom of screen for subtitle text. Background: `bgPrimary` at 0.75 opacity. Text: `body` font, `textPrimary`. Max width: `captionMaxWidth`. |

## Generated Assets (built in code, not external files)

| Asset | Scene | Notes |
|-------|-------|-------|
| Terminal window chrome | 2, 4 | macOS-style dots + title bar (see Custom UI Elements above) |
| Spec document mockup | 1, 3, 4 | Markdown-rendered spec with `## Intent`, `## Constraints`, `## Success Criteria`. All monospace text uses `textCode` color unless syntax-highlighted. |
| Code block mockup | 1, 2, 4 | Syntax-highlighted TypeScript/JavaScript in dark theme. Keywords: `accentPrimary` + font-weight 700. Strings: `accentGreen`. Comments: `textDim`. Default text: `textCode`. |
| Flowline diagram | 3 | Two animated paths — vibe (red, wavy) vs SDD (blue, direct). Wavy paths: pre-compute 30 frames of SVG path data, cycle through via `useMemo`. |
| Stack metaphor | 3 | Three horizontal spec-section bars forming a foundation, code blocks stacking on top with spring physics. Replaces earlier "building" concept. |
| Iteration counter | 2 | Animated number with pulse effect |
| Failure cards | 2 | Three full-screen cards with icon (xl) + label + description |
| Comparison panels | 4 | Side-by-side terminal panels with metrics |
| Metric bar | 4 | Animated progress bar showing "~80% time saved" |
| Spec constellation | 4 | Multiple spec documents connected by lines, gently orbiting |
| Preview cards | 5 | Three 3D-perspective cards with parallax flip entrance. Use `backfaceVisibility: 'hidden'` and spring rotation. |
| Thesis text | 6 | Character-by-character reveal with blue glow spread |
| AgentFactory logo | 6 | Text-based logo with brand styling |
| Caption overlay | All | Persistent subtitle layer synced to voiceover. See Caption Overlay section. |

## Audio Assets Required

| Asset | Type | Source | Notes |
|-------|------|--------|-------|
| Background music | Music | Royalty-free / AI-generated | Minimal dark electronic ambient, ~4 min |
| Keyboard typing SFX | SFX | Sound library | Mechanical keyboard, used in Scene 1 hook |
| Digital glitch SFX | SFX | Sound library | Corruption/error sound for hook smash cut |
| Error ping SFX | SFX | Sound library | Three ascending alert tones (Scene 2) |
| Confirmation chime | SFX | Sound library | Satisfying lock-in sound (Scene 1, 3) |
| Soft whoosh | SFX | Sound library | Scene transition sound (understated, digital). Used at frames: 150, 1695, 3531, 5811, 6711. |
| Soft key taps | SFX | Sound library | Subtle typing for code generation (Scene 4) |
| Slide SFX | SFX | Sound library | Panel sliding/compressing sound (Scene 4, vibe terminal slides left) |
| Progress fill SFX | SFX | Sound library | Subtle fill/sweep sound for metric bar animation (Scene 4) |
| Card flip SFX | SFX | Sound library | Subtle paper/card flip (Scene 5, 3x — one per card) |
| Resonant hum | SFX | Sound library | Low building hum for CTA thesis reveal |
| Voiceover | VO | Gemini TTS | ~4 min narration, see spec for direction |

## External Assets

None required. All visuals are code-generated via Remotion components. No stock photos, no external images, no third-party logos.

## Caption / Transcription Overlay

Timed subtitle text synced to voiceover. Renders as a persistent bottom-center layer across all scenes.

| Property | Value |
|----------|-------|
| Position | Bottom center, `captionBottomMargin` (60px) from bottom edge |
| Max width | `captionMaxWidth` (1400px) |
| Background | `bgPrimary` at 0.75 opacity, rounded corners (8px) |
| Text style | `body` font (24px Inter), `textPrimary` color |
| Padding | `captionPadding` (12px) horizontal, 8px vertical |
| Behavior | Shows current narration phrase (1-2 lines max). Fades between phrases (8 frames). Hidden during beat pauses. |
