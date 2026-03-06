# Storyboard — Why Specs Beat Vibe Coding

> Scene-by-scene visual blueprint. Every frame description, animation, transition, and timing decision lives here.

## Global Layers

These layers persist across all scenes:

| Layer | Element | Behavior |
|-------|---------|----------|
| CAPTION | Transcription overlay | Bottom-center of screen. Semi-transparent bar (`bgPrimary` at 0.75 opacity, 8px radius). `body` font (24px Inter), `textPrimary` color. Max width `captionMaxWidth` (1400px). Shows current narration phrase (1-2 lines). Fades between phrases (8 frames). **Hidden during beat pauses.** Position: `captionBottomMargin` (60px) from bottom edge. |

## Implementation Notes

These apply globally across all scenes:

- **All monospace text** in terminals uses `textCode` (#E2E8F0) color unless syntax-highlighted. Syntax highlighting: keywords = `accentPrimary` + font-weight 700, strings = `accentGreen`, comments = `textDim`.
- **Code state arrays** (Scene 2 time-lapse): Store in `useMemo`. Crossfade between states using opacity interpolation — never re-render code strings per frame.
- **Wavy SVG paths** (Scene 3 flowlines): Pre-compute 30 frames of SVG path data (1-second loop), store in `useMemo`, cycle through. Avoids per-frame recalculation.
- **3D card rotations** (Scene 5): Use `backfaceVisibility: 'hidden'` on card containers. Animate rotation via spring (springSnappy), not linear interpolation.
- **Icon sizes** reference `iconSizes` from styles.ts: sm=24, md=48, lg=64, xl=80.

---

## Scene 1: Cold Open — Result Teaser + Hook
**Frames**: 0–150 (5s) | **Audio**: VO starts frame 1 + confirmation chime + glitch SFX

### Frame-by-frame breakdown

**Frames 0–60 (0:00–0:02) — The Flash**

| Layer | Element | Animation |
|-------|---------|-----------|
| BG | `bgPrimary` (#0a0a0f) solid | Static |
| L1 | Spec document mockup (left 40% of screen) | Spring-in from left (springSnappy). Frosted glass panel with visible `## Intent`, `## Constraints` headings in `codeSmall` font, `textCode` color. Subtle `glowBlue` behind it. |
| L2 | Generated code block (right 40% of screen) | Spring-in from right, staggered +4 frames after L1. Dark terminal window with syntax-highlighted TypeScript. Green line numbers. |
| L3 | Green checkmark (center, between panels) | Scale-in with spring at frame 30. `accentGreen` color. `CheckCircle` Lucide icon at `iconSizes.lg` (64px). Pulses once (scale 1.0 → 1.15 → 1.0 over 15 frames). |
| SFX | Confirmation chime | Triggers at frame 30 (on checkmark appearance) |

**Frames 60–75 (0:02–0:02.5) — Smash Cut**

| Layer | Element | Animation |
|-------|---------|-----------|
| ALL | Every element | Opacity → 0 in 3 frames (hard cut feel). Simultaneously, a white flash frame at frame 61 (opacity 0.4, 2 frames). |
| SFX | Digital glitch/cut sound | Frame 60 |
| SFX | Soft whoosh | Frame 60 (transition SFX) |

**Frames 75–150 (0:02.5–0:05) — The Question**

| Layer | Element | Animation |
|-------|---------|-----------|
| BG | `bgPrimary` solid black | Static |
| L1 | Text: "But first—" | `h2` font, `textSecondary` color. Fade-in over 8 frames starting frame 80. Centered vertically, left-aligned at `marginX`. |
| L2 | Text: "how much of your AI-generated code actually ships?" | `h1` font, `textPrimary` color. Springs in from below (y+30→0) starting frame 95. Same left-alignment. |

**VO timing**: "This is what AI coding looks like when it works." (frames 1–50) — "But for most teams... it doesn't." (frames 70–140, with a 0.5s pause before "it doesn't")

**CAPTION**: "This is what AI coding looks like when it works." → "But for most teams... it doesn't."

---

## Scene 2: The Problem — Vibe Coding's Ceiling
**Frames**: 150–1650 (50s) | **Audio**: VO continuous + error pings + ambient music builds

**SFX**: Soft whoosh at frame 150 (scene transition)

### Beat 1: Iteration One Looks Great (frames 150–600, 15s)

| Layer | Element | Animation |
|-------|---------|-----------|
| BG | `bgPrimary` with subtle `vibeCodingTint` vignette at edges | Fade-in over crossfade (15 frames) |
| L1 | Terminal window (full-width, 85% height) | Spring-in (springGentle). macOS chrome: three custom dots (12px circles — #FF5F56, #FFBD2E, #27C93F), title bar "AI Chat — Session 1". Background `bgTertiary`. Rounded corners `terminalRadius`. |
| L2 | User message: `> "Add user authentication to my app"` | Types character-by-character starting frame 180. `code` font, `textCode` color. `accentCyan` for the `>` prompt. 2 chars/frame typing speed. |
| L3 | AI response streaming | Starts frame 240. Code block appears line-by-line (3 lines/second). Shows a plausible Express.js auth middleware snippet. `codeSmall` font with syntax highlighting (see Implementation Notes). |
| L4 | Success badge | Springs in at frame 540. Pill shape: `accentGreen` bg, white text "Success", `Check` icon (`iconSizes.sm`). Position: top-right of terminal. |
| L5 | Iteration counter | Fades in at frame 560. Bottom-right corner. `caption` font, `textDim` color. Text: "Iteration 1 of 14". The "1" is `h3` font, `accentAmber`. |

### Beat 2: Time-Lapse Degradation (frames 600–1050, 15s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L5 | Iteration counter | Number accelerates: holds "1" for 60 frames, then cycles through 2→14 over remaining frames. Easing: slow start, accelerates. Each number change triggers a subtle screen shake (2px random offset, 4 frames). |
| L3 | Code in terminal | With each iteration tick, code morphs: function names change, indentation shifts, imports reorder, comments vanish. NOT a full rewrite each time — subtle mutations. Use 5-6 pre-composed code states (stored in `useMemo`) that crossfade between each other via opacity interpolation. |
| L1 | Terminal title bar | Updates: "Session 1" → "Session 3" → "Session 7" → "Session 12" |
| L4 | Success badge | At iteration 8, color shifts from `accentGreen` to `accentAmber`. At iteration 12, shifts to `accentRed` and text changes to "Issues Found". |
| NEW | Red edge pulse | Starting iteration 6, a `glowRed` vignette begins pulsing at the screen edges. Pulse frequency increases with iteration count. |
| SFX | Subtle tension tone | Low frequency hum building under the music |

### Beat 3: Failure Cards (frames 1050–1500, 15s)

**Transition into cards (frames 1050–1070)**: The terminal rapidly **glitches** — horizontal scan-line displacement (random Y-offset of 3-8px horizontal bands, alternating direction) for 8 frames. Then fades to black in 4 frames. No gap — Card 1 enters immediately at frame 1070.

**Card 1 — Context Amnesia (frames 1070–1200, ~4.3s)**

| Layer | Element | Animation |
|-------|---------|-----------|
| BG | `bgPrimary` with `glowRed` center | Gentle pulse |
| L1 | `Brain` Lucide icon (`iconSizes.xl` — 80px) | Springs in from above. `accentRed` color. Centered horizontally, 35% from top. |
| L2 | Label: "Context Amnesia" | `h1` font, `textPrimary`. Springs in +5 frames after icon. Below icon with 24px gap. |
| L3 | Description: "The AI forgets what it built three sessions ago" | `body` font, `textSecondary`. Fades in +5 frames after label. Below label with 16px gap. |
| SFX | Error ping #1 (lowest pitch) | Frame 1070 |

**Card 2 — Assumption Drift (frames 1200–1350, 5s)**

| Layer | Element | Animation |
|-------|---------|-----------|
| Same structure as Card 1 | `Shuffle` icon (`iconSizes.xl`) | Card 1 fades out (10 frames). Card 2 springs in with slight rightward offset to create directional flow. |
| SFX | Error ping #2 (mid pitch) | Frame 1200 |

**Card 3 — Pattern Fracture (frames 1350–1470, 4s)**

| Layer | Element | Animation |
|-------|---------|-----------|
| Same structure | `GitBranch` icon (`iconSizes.xl`) | Same entrance pattern, rightward flow continues. |
| SFX | Error ping #3 (highest pitch) | Frame 1350 |

### Beat 4: Compression to Question (frames 1470–1650, 6s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L1-L3 | All three card icons | Simultaneously scale down (spring) and move to center, converging into a single point. |
| L4 | Glowing question mark | Emerges from the convergence point. `h1` size, `accentPrimary` color with `glowBlue` behind it. Gently pulses (scale 1.0 ↔ 1.05, 2s cycle). |
| ALL | Full screen | Dims to near-black over last 30 frames leading into beat. |

**CAPTION**: Tracks narration through all beats. Hidden during Beat 4's final dim.

### Beat Pause (frames 1650–1695, 1.5s)

| Layer | Element | Animation |
|-------|---------|-----------|
| BG | `bgPrimary` pure black | Static |
| AUDIO | Music drops to near-silence | Just a low ambient pulse, -24dB |
| CAPTION | Hidden | No narration during beat |
| | No visual elements | Intentional void — let the problem settle |

---

## Scene 3: The Shift — What Is SDD?
**Frames**: 1695–3495 (60s) | **Audio**: VO + music rises + confirmation chime

**SFX**: Soft whoosh at frame 1695 (scene transition)

### Beat 1: Dual Flowlines (frames 1695–2295, 20s)

| Layer | Element | Animation |
|-------|---------|-----------|
| BG | `bgPrimary` | Crossfade in (15 frames) |
| L1 | Left label: "VIBE CODING" | `h3` font, `accentRed`, opacity 0.8. Position: left third, top. Fades in over 10 frames. |
| L2 | Vibe coding flowline | Vertical chain of nodes, left third of screen. Nodes are circles (24px radius, `accentRed` border, `bgSecondary` fill). Labels inside/beside in `caption` font, `textCode` color: "Human speaks" → "AI interprets" → "Code appears" → "Human reacts" → "AI re-interprets" → "Code changes". Nodes appear one-by-one (spring, staggered 8 frames). Connecting lines are **wavy** SVG paths (sine wave, amplitude 6px, pre-computed 30-frame loop in `useMemo`). After all nodes appear, an arrow (`RotateCcw` icon, `iconSizes.sm`) loops from bottom to top — infinite cycle. Lines colored `accentRed` at 0.4 opacity. |
| L3 | Right label: "SPEC-DRIVEN" | `h3` font, `accentPrimary`, opacity 0.8. Position: right third, top. Fades in +15 frames after L1. |
| L4 | SDD flowline | Vertical chain, right third. Same node style but `accentPrimary` border. Labels: "Human specifies" → "Spec locked" (has `Lock` icon `iconSizes.sm`) → "AI implements" → "Code verified ✓". Only 4 nodes vs 6. Connecting lines are **straight, clean**. Final node has `CheckCircle` icon (`iconSizes.sm`) in `accentGreen`. NO loop — it terminates. Lines colored `accentPrimary` at 0.6 opacity. |

**Visual contrast**: Left side subtly jitters (1px random offset, continuous). Right side is perfectly still.

### Beat 2: SDD Expands + Spec Reveal (frames 2295–2745, 15s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L1-L2 | Vibe coding flowline + label | Fade out over 15 frames. Simultaneous slight leftward drift (20px) as it disappears. |
| L4 | SDD flowline | Smoothly translates to center of screen (spring, 20 frames). Scale up 1.2x. |
| L5 | Spec document | Zooms out from the "Spec locked" node. A frosted-glass panel (`bgSecondary` at 0.9 opacity, `cardRadius` corners) expands to ~60% screen width. Contains rendered markdown in `code` font, `textCode` color: |

Spec document content:
```
## Intent
Define what the system should accomplish

## Constraints
Technical boundaries and requirements

## Success Criteria
Measurable verification checkpoints
```

Each `##` heading glows `accentPrimary` for 20 frames as narration mentions it, then returns to `textPrimary`.

### Beat 3: Stack Metaphor (frames 2745–3195, 15s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L5 | Spec document | Morphs: the panel stretches vertically. Each `##` section separates and becomes a horizontal bar/beam shape (rounded rectangle, `accentPrimary` fill at 0.8 opacity, 20px height, full content width). The three bars stack vertically with 8px gaps — forming a foundation/base. This takes ~30 frames (spring). |
| L6 | Code block stack | On top of the three foundation bars, code blocks (represented as solid rectangular panels in `bgTertiary`, ~60% width, varying heights 40-80px) slide into place from the right — stacking upward like building blocks placed on the foundation. 4-5 code panels, staggered entrance (6 frames apart, spring physics). Each has a faint code texture (low-opacity monospace text in `textDim`). |
| L7 | Progress indicator | As each code panel locks into place, a subtle `accentGreen` pulse ripples from the foundation bar it rests on. Suggests verification against spec. |

### Beat 4: Thesis Statement (frames 3195–3495, 10s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L5-L7 | Stack structure | Scale 1.0 → 0.7 over 30 frames (ease-out via interpolation). Structure becomes a silhouette in the background. |
| L8 | Thesis text | `display` font, `textPrimary`. Centered. Two lines: |

Line 1: "The specification is the primary development artifact."
Line 2: "Code is the compiled output."

Line 1 fades in over 15 frames. Line 2 springs up from below +20 frames later, with `accentPrimary` color on "compiled output". A `glowBlue` radial expands behind the text (40 frames to full spread, opacity 0.12).

| SFX | Confirmation chime | Frame 3220 (on thesis text appearance) |

**CAPTION**: Tracks narration. Thesis statement duplicated in caption for emphasis.

### Beat Pause (frames 3495–3531, 1.2s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L8 | Thesis text | Holds on screen. Gentle pulse (opacity 0.95 ↔ 1.0). |
| AUDIO | Music holds low, steady | VO silent — let the idea breathe |
| CAPTION | Hidden | No narration during beat |

---

## Scene 4: Proof — Live Spec vs Vibe Coding
**Frames**: 3531–5781 (75s) | **Audio**: VO + soft key taps + music steady

**SFX**: Soft whoosh at frame 3531 (scene transition)

### Setup (frames 3531–3831, 10s)

| Layer | Element | Animation |
|-------|---------|-----------|
| BG | Previous scene fades out via crossfade (15 frames) | |
| L1 | Challenge text: "Same task. Two approaches." | `h2` font, `textPrimary`. Center screen. Springs in. Holds 45 frames. |
| L2 | Task label | Replaces L1 (L1 fades, L2 springs in). `h3` font. `FileText` icon (`iconSizes.md`) + "Build an API endpoint for user profiles with validation". `accentPrimary` on the task text. |

### Left Panel — Vibe Coding (frames 3831–4581, 25s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L2 | Task label | Slides up and shrinks to a top banner (spring, 15 frames). Becomes persistent header. |
| L3 | Vibe coding terminal | Springs in from left. Full-screen width (minus margins). macOS window chrome (custom dots — #FF5F56, #FFBD2E, #27C93F), title: "AI Chat — Vibe Coding". `vibeCodingTint` background. |
| L4 | Chat messages | Type out sequentially with 90-frame gaps between messages: |

Message sequence (each types at 3 chars/frame, `code` font, `textCode` color, `accentCyan` prompt):
1. `> "Add a user profile endpoint"` — AI response appears (collapsed, shows 3 lines of code)
2. `> "No, use Zod for validation"` — AI rewrites (code shifts)
3. `> "You forgot the error handling from earlier"` — AI apologizes + rewrites
4. `> "That's not how our auth middleware works"` — AI rewrites again
5. `> "Start over, but keep the Zod schema from v2"` — conversation scrolls up, more code

| L5 | Rewrite counter | Bottom-right. `RefreshCw` icon (`iconSizes.sm`) + number. Updates: 1→3→5→7. Each increment pulses `accentRed`. `h3` font. |
| SFX | Soft key taps | On each user message typing |

### Right Panel — SDD (frames 4581–5331, 25s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L3 | Vibe coding terminal | Slides to left half (spring, 20 frames). Scales to `panelWidth`. Dims slightly (opacity 0.7). A red "7 rewrites" badge persists. |
| L6 | SDD terminal | Springs in from right to right half. macOS chrome (custom dots), title: "Spec → Implementation". `sddTint` background. |
| L7 | Spec document typing | Types out the spec content character-by-character (2.5 chars/frame), `code` font, `textCode` color: |
| SFX | Slide SFX | Frame 4581 (when vibe terminal compresses to left) |

```markdown
## Intent
POST /api/users/profile

## Constraints
- Validation: Zod schema, strict mode
- Auth: existing bearerAuth middleware
- Errors: RFC 7807 problem details

## Success Criteria
- [ ] Validates against UserProfile schema
- [ ] Returns 201 on create, 200 on update
- [ ] Matches existing error pattern
```

| L8 | Implementation command | After spec completes, a divider line appears. Below: `> "Implement against this spec"`. Code generates in a single clean block (fast, ~60 frames). |
| L9 | Success checkmarks | Each `[ ]` in the spec transforms to `[✓]` with `accentGreen`. Sequential, 10 frames apart. Spring scale on each checkmark (1.0 → 1.3 → 1.0). Uses `CheckCircle` icon inline (`iconSizes.sm`). |
| SFX | Confirmation chimes (quiet, 3x) | On each checkmark |

### Comparison Metrics (frames 5331–5481, 5s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L3 | Left panel | Label appears below: "~7 rewrites · ~20+ min · pattern mismatch". `accentRed` color. `body` font. Fades in 10 frames. Prefixed with "Typical:" in `caption` font, `textDim`. |
| L6 | Right panel | Label appears below: "1 pass · ~4 min · all criteria met". `accentGreen` color. `body` font. Fades in 10 frames. |
| L10 | Metric bar | Center, below both panels. An animated bar fills left-to-right: "Typical time saved: ~80%" — the bar is `accentGreen`, background `bgTertiary`. Number counts up 0→80 over 30 frames. `h2` font. Labeled "Typical scenario" in `caption` font, `textDim` above the bar. |
| SFX | Progress fill SFX | Starts when bar begins filling |

### The Insight Zoom (frames 5481–5631, 5s)

| Layer | Element | Animation |
|-------|---------|-----------|
| ALL | Both panels + metrics | Scale down and shift upward (spring, 15 frames). |
| L11 | Zoomed spec section | The `## Constraints` section from the right panel expands to center screen. The line `Auth: existing bearerAuth middleware` gets a glowing `accentPrimary` highlight box around it. |
| | Annotation label | A subtle line points to the highlighted text with label: "Institutional knowledge" in `caption` font, `textSecondary`. |

### Constellation Cooldown (frames 5631–5781, 5s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L11 | Zoomed spec | Scales down to become one node in a larger pattern. |
| L12 | Spec constellation | 7-8 spec document thumbnails (small frosted-glass rectangles, `bgSecondary` at 0.8 opacity, ~120x80px, with faint `textDim` monospace texture) appear around the central spec. Connected by thin lines (`accentCyan`, opacity 0.3). Gentle orbital rotation (0.5 degrees/frame). Each node has a subtle `glowBlue`. Resembles a project architecture map. Uses `Network` icon (`iconSizes.md`) faintly at center. |

### Beat Pause (frames 5781–5811, 1s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L12 | Constellation | Continues gentle orbit. Dims slightly. |
| AUDIO | Music dips briefly | 1s breathing room |
| CAPTION | Hidden | No narration during beat |

---

## Scene 5: Depth Preview — What Chapter 5 Teaches
**Frames**: 5811–6711 (30s) | **Audio**: VO + music rises + card flip SFX

**SFX**: Soft whoosh at frame 5811 (scene transition)

### Card 1: Three SDD Levels (frames 5811–6111, 10s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L12 | Constellation | Fades out (crossfade 15 frames) |
| L1 | Preview card | A 3D-perspective card (CSS `transform: perspective(1000px) rotateY(8deg)`, animated from 90deg via springSnappy, `backfaceVisibility: 'hidden'`). `bgSecondary` background, `cardRadius` corners, subtle border (`accentPrimary` at 0.2 opacity). Size: `cardWidth` x 500px. |
| L2 | Three glass platforms inside card | Ascending left-to-right with depth (parallax — back platforms slightly smaller/dimmer). Labels float above each: "Spec-First" → "Spec-Anchored" → "Spec-as-Source" in `h3` font. `Layers` Lucide icon (`iconSizes.lg`) top-left of card, `accentPrimary`. |
| L3 | Caption below card | "Three levels — from guidance to full code generation from specs". `caption` font, `textSecondary`. |
| SFX | Card flip SFX #1 | Frame 5811 |

### Card 2: Four-Phase Workflow (frames 6111–6411, 10s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L1 | Card 1 | Slides left and fades (spring + opacity, 15 frames) |
| L4 | Card 2 | Same 3D flip entrance (rotateY 90→8deg, springSnappy, `backfaceVisibility: 'hidden'`). `Orbit` icon (`iconSizes.lg`). Contains: circular/orbital diagram with 4 nodes — "Research", "Specify", "Interview", "Implement" in `caption` font — with animated particles (`accentCyan`, 4px circles, opacity 0.6) flowing clockwise between them. Center text: "SDD" in `h3` font, `accentPrimary`. |
| L5 | Caption | "A four-phase workflow — from investigation to atomic commits" |
| SFX | Card flip SFX #2 | Frame 6111 |

### Card 3: Claude Code Native (frames 6411–6711, 10s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L4 | Card 2 | Same exit as Card 1 |
| L6 | Card 3 | Same entrance. `FileCode` icon (`iconSizes.lg`). Contains: a terminal-style panel showing `CLAUDE.md` text at center in `code` font, `textCode` color. From it, 4 small agent icons (circles, 16px, `accentCyan` fill) radiate outward (spring, staggered 6 frames). Thin lines (`accentCyan`, 1px, opacity 0.4) connect back to the CLAUDE.md text. |
| L7 | Caption | "Native implementation in Claude Code — no frameworks, built in" |
| SFX | Card flip SFX #3 | Frame 6411 |

**CAPTION**: Tracks narration across all three cards.

---

## Scene 6: Key Takeaway + CTA
**Frames**: 6711–7200 (16.3s) | **Audio**: VO + resonant hum + music resolves

**SFX**: Soft whoosh at frame 6711 (scene transition)

### Fade to Black (frames 6711–6771, 2s)

| Layer | Element | Animation |
|-------|---------|-----------|
| ALL | Previous scene | Fade to pure black over 20 frames |
| AUDIO | Music drops to a low hum | Resonant, steady |
| CAPTION | Hidden | Pause before thesis |

### Thesis Reveal (frames 6771–6951, 6s)

| Layer | Element | Animation |
|-------|---------|-----------|
| BG | `bgPrimary` with expanding `glowBlue` from center | Glow starts at 0 radius, expands to fill screen over 60 frames, max opacity 0.15 |
| L1 | Thesis: "Stop talking to AI." | `display` font, `textPrimary`. Character-by-character reveal (2 chars/frame). Each character triggers a tiny blue glow spread at its position (radial gradient, 20px radius, `accentPrimary` at 0.2 opacity, fades over 15 frames). Positioned in **upper-left area** (top 40%, left 60%) to avoid YouTube end screen zones. |
| L2 | Thesis: "Start specifying." | Same font but `accentPrimary` color. Appears 20 frames after L1 completes. Same character reveal. Same positioning zone. |
| SFX | Resonant hum builds | Starts frame 6771, peaks at frame 6900 |

**CAPTION**: "Stop talking to AI. Start specifying."

### Branding + CTA (frames 6951–7200, 8.3s)

| Layer | Element | Animation |
|-------|---------|-----------|
| L1-L2 | Thesis text | Shifts upward 80px (spring, 20 frames) to make room. Stays in upper-left zone. |
| L3 | AgentFactory text logo | `h2` font, `textPrimary`. Scale-in from 0.8 → 1.0 (springGentle). Below thesis, same left zone. 60px gap. |
| L4 | Chapter label | "Chapter 5: Spec-Driven Development" in `body` font, `textSecondary`. Fades in +10 frames after L3. |
| L5 | URL | "agentfactory.panaversity.org" in `caption` font, `accentPrimary`. `ExternalLink` icon (`iconSizes.sm`) inline. Fades in +10 frames after L4. |
| L6 | Free label | "Full course. Free. Link below." in `caption` font, `textSecondary`. Fades in +10 frames after L5. |
| HOLD | Extended branding | All elements hold static from frame 7161 to 7200 (39 extra frames = 1.3s hold for clean ending). |
| AUDIO | Music resolves to silence | Fade out over last 60 frames |

**CAPTION**: "Chapter 5 of AgentFactory teaches the complete methodology. It's free. Link in the description."

**YouTube end screen zone**: Bottom-right quadrant and center-right are left empty for YouTube's end screen overlay (subscribe button, next video card). All text elements positioned in upper-left / center-left.

---

## Self-Validation Checklist

### Spec Alignment
- [x] Every scene in spec has a corresponding storyboard entry (6 scenes + 3 beats)
- [x] Total duration matches spec target (7200 frames = 4:00 at 30fps)
- [x] Visual style matches brand guidelines (all colors reference `brand.*`, all fonts reference `fonts.*` / `typeScale.*`)
- [x] No slideshow patterns — spring physics, animated flowlines, 3D parallax cards, stack metaphor
- [x] Captions present — global CAPTION layer defined, tracked per scene, hidden during beats
- [x] All icon sizes reference `iconSizes.*` consistently
- [x] All monospace text uses `textCode` color (documented in Implementation Notes)
- [x] YouTube end screen zones respected (Scene 6 layout avoids bottom-right / center-right)
- [x] Thumbnail frame identified (Scene 4, ~frame 5400)
- [x] Metrics framed as illustrative ("Typical", "~80%") — no unsourced empirical claims

### Quality Tests
- [x] **Mute test**: Iteration counter time-lapse (Scene 2), side-by-side code comparison (Scene 4), "~80%" metric bar (Scene 4), and caption overlay tell the story visually without audio
- [x] **Squint test**: Each scene has 1-2 dominant visual elements. No split-screen text overload. Sequential reveals.
- [x] **Timing test**: All animations use spring physics (3 variants defined). No linear easing. Stagger delays specified.
- [x] **Consistency test**: Terminal windows always use same chrome style (custom dots, same colors). Cards always use same radius/padding. Failure=red. Success=green. SDD=blue. Icons use `iconSizes.*`.
- [x] **Slideshow test**: Flowlines are animated (wavy SVG vs straight). Cards have 3D spring rotation. Stack has spring-physics stacking. Constellation orbits continuously.
- [x] **Re-hook cadence**: 7 pattern breaks from spec, all have corresponding visual moments in storyboard
- [x] **Accessibility**: `textSecondary` at 0.65 opacity (~5.1:1 contrast). `textDim` at 0.4 (decorative only).
- [x] **Mobile**: Critical text uses `body` (24px) or larger. Scene 4 code is atmospheric, not required reading.

### Transition Verification
- [x] Scene 1→2: Crossfade (15 frames) at frame 150 + whoosh SFX
- [x] Scene 2→beat: Dim to black over 30 frames
- [x] Beat→Scene 3: Crossfade from black + whoosh SFX at frame 1695
- [x] Scene 3→beat: Thesis holds, no transition
- [x] Beat→Scene 4: Crossfade (15 frames) + whoosh SFX at frame 3531
- [x] Scene 4→beat: Constellation dims
- [x] Beat→Scene 5: Constellation fades, card flips in + whoosh SFX at frame 5811
- [x] Scene 5→6: Fade to pure black (20 frames) + whoosh SFX at frame 6711

### SFX Mapping Verification
- [x] Frame 30: Confirmation chime (Scene 1 checkmark)
- [x] Frame 60: Digital glitch + whoosh (Scene 1 smash cut)
- [x] Frame 150: Whoosh (transition to Scene 2)
- [x] Frame 1070: Error ping #1
- [x] Frame 1200: Error ping #2
- [x] Frame 1350: Error ping #3
- [x] Frame 1695: Whoosh (transition to Scene 3)
- [x] Frame 3220: Confirmation chime (thesis reveal)
- [x] Frame 3531: Whoosh (transition to Scene 4)
- [x] Frame 4581: Slide SFX (vibe terminal compresses)
- [x] Frames 5331+: Progress fill SFX (metric bar)
- [x] Frame 5811: Whoosh + card flip #1
- [x] Frame 6111: Card flip #2
- [x] Frame 6411: Card flip #3
- [x] Frame 6711: Whoosh (transition to Scene 6)
- [x] Frame 6771: Resonant hum begins
