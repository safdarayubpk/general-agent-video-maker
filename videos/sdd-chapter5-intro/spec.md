# Video Spec: Why Specs Beat Vibe Coding

## Intent
- **Topic**: AgentFactory Part 1, Chapter 5 — The paradigm shift from vibe coding to Spec-Driven Development. ONE deep concept: why specifications must replace conversational AI coding for production systems.
- **Audience**: Developers who actively use AI coding tools (Cursor, Copilot, Claude Code) and have hit the wall — things work in prototypes but fall apart at scale.
- **Goal**: The viewer walks away viscerally understanding WHY vibe coding fails, WHAT a spec-driven approach looks like in practice, and feeling the urgency to learn the methodology.
- **Key Message**: "Stop talking to AI. Start specifying. The spec is the product — code is just the compiled output."
- **Scope Boundary**: This video covers the WHY and the WHAT. The HOW (three SDD levels, four-phase workflow, Claude Code implementation) are teased at the end as "Chapter 5 goes deep on this" — future videos.

## Constraints
- **Duration**: 4-5 minutes (tight, high-density, no filler)
- **Platform**: YouTube (16:9, 1080p, 30fps)
- **Tone**: Technical & precise — confident authority, not lecture-mode. Speak like a senior engineer at a conference, not a professor.
- **Style**: Dark backgrounds, architectural diagrams, code snippets, developer-conference aesthetic

## Transitions
All scene transitions use a **15-frame (0.5s) crossfade** with a slight 1.02x scale-up on the incoming scene. No hard cuts between scenes. Within scenes, elements enter via **spring physics** (damping: 12, stiffness: 120, mass: 0.8) — never linear easing. Elements exit via **opacity fade** (10 frames). Overlapping element entrances are staggered by 4-6 frames to create visual flow.

## Sound Design

### Music
- **Track style**: Minimal dark electronic ambient — think Tycho meets dark UI soundscapes
- **Energy curve**: Low pulse during hook → builds subtly through problem scene → drops to near-silence at the "shift" moment (Scene 3 definition reveal) → steady mid-energy through demo → rises for CTA
- **Volume**: -18dB under narration, -8dB during visual-only moments and transitions

### Sound Effects
- **Hook**: Keyboard typing SFX (mechanical), then a digital glitch/corruption sound
- **Failure modes (Scene 2)**: Subtle error tones — three ascending "alert" pings as each failure appears
- **Spec reveal (Scene 3)**: A satisfying "lock-in" / confirmation chime when the spec definition lands
- **Scene transitions**: Soft whoosh (understated, digital) on every crossfade — at 0:05, 0:57, 1:58, 3:14, 3:44
- **Code typing (Scene 4)**: Soft keyboard taps at 0.3x speed, not literal keystroke sounds
- **Panel slide (Scene 4)**: Subtle slide SFX when vibe terminal compresses to left
- **Metric fill (Scene 4)**: Subtle progress/sweep SFX for the metric bar animation
- **Card flips (Scene 5)**: Three subtle card-flip sounds, one per preview card
- **CTA glow**: A low resonant hum as the thesis statement illuminates

### Voiceover Direction
- **Pace**: 145-155 WPM (measured, authoritative — not rushed)
- **Energy by scene**:
  - Hook: Sharp, punchy — drops to a pause after "it doesn't"
  - Problem: Calm diagnosis — a doctor explaining symptoms, not alarming
  - The Shift: Energy rises — this is the revelation moment
  - Live Demo: Focused, precise — narrating what you see
  - CTA: Warm, inviting — "come learn this with us"
- **Pauses**: 0.8s pause before each new scene concept. 1.2s pause at the "shift" moment before revealing SDD.

## Captions
Timed transcription overlay is **always visible** during narration. Renders as a semi-transparent bar at the bottom center of the screen. Hidden during beat pauses. See `assets.md` for full caption spec.

## Scene Outline

### Scene 1: Cold Open — Result Teaser + Hook (5s)
**Visual**: A 2-second flash montage — a clean spec document on the left, clean generated code on the right, a green checkmark pulsing. Feels like the "after" — polished, working, satisfying. Then SMASH CUT to black.

Text slams onto screen: **"But first — how much of your AI-generated code actually ships?"**

**Narration** (starts at frame 1, no silence): "This is what AI coding looks like when it works. But for most teams... it doesn't."
**SFX**: Confirmation chime on the flash, then a hard digital cut sound.
**Purpose**: Show the destination first (2s), then yank it away and create the gap. Viewer is hooked by the contrast.
**Duration**: 5 seconds total.

### Scene 2: The Problem — Vibe Coding's Ceiling (50s)
**Visual sequence** (NOT split screen — full-screen sequential reveals):

**Beat 1 (0-15s)**: A terminal/chat interface fills the screen. A human types: `"Add user authentication to my app"`. An AI response streams in — code blocks appear, looks impressive. The code WORKS. A green "Success" badge flashes. Then a subtle counter in the corner: `Iteration 1 of 14`.

**Beat 2 (15-30s)**: Time-lapse. The iteration counter speeds up: 2... 5... 8... 11... 14. With each iteration, the code on screen subtly shifts — functions rename, structures change, comments disappear. By iteration 14, the code looks completely different from iteration 1. A red pulse begins at the edges of the screen.

**Beat 3 (30-45s)**: The terminal rapidly glitches — horizontal scan-line displacement for 8 frames, then fades to black in 4 frames. Three failure cards emerge from the black, each filling the screen for ~4s with a Lucide icon + bold label + one-line explanation:

1. `Brain` icon — **"Context Amnesia"** — "The AI forgets what it built three sessions ago"
2. `Shuffle` icon — **"Assumption Drift"** — "Each iteration makes guesses that compound"
3. `GitBranch` icon — **"Pattern Fracture"** — "Generated code stops matching your architecture"

**Beat 4 (45-50s)**: The three cards compress into a single glowing question mark. Screen darkens.

**Narration**: "This is vibe coding. You talk, the AI builds, and iteration one looks amazing. But by iteration fourteen, context is lost, assumptions have drifted, and the generated code no longer matches your architecture. This is the ceiling. And every developer using AI hits it."

**Re-hook**: The iteration counter time-lapse IS the pattern break — it visually demonstrates the problem rather than just listing it.

**[BEAT — 1.5s of near-silence, just ambient music pulse]**

### Scene 3: The Shift — What Is SDD? (60s)
**Visual sequence**:

**Beat 1 (0-20s)**: From the darkness, two parallel timelines materialize — NOT a static comparison card, but two **animated flowlines** running top-to-bottom simultaneously:

LEFT (red-tinted, labeled "VIBE CODING"):
```
Human speaks → AI interprets → Code appears → Human reacts → AI re-interprets → Code changes → ...
```
Each node pulses uncertainly. The line between nodes is wavy, jittery. The flow loops endlessly — a hamster wheel.

RIGHT (blue-tinted, labeled "SPEC-DRIVEN"):
```
Human specifies → Spec locked → AI implements → Code verified against spec ✓
```
Each node is solid, stable. The line is clean and direct. The flow terminates with a checkmark.

**Beat 2 (20-35s)**: The vibe coding timeline fades out. The SDD timeline expands to fill the screen. From the "Spec locked" node, the spec document zooms into view — a real-looking markdown document with visible sections: `## Intent`, `## Constraints`, `## Success Criteria`. These sections glow as they're mentioned.

**Beat 3 (35-50s)**: The spec document transforms — its three sections separate into three horizontal bars forming a foundation/base. Code blocks stack on top with spring physics, like walls built on a foundation. Visual metaphor: the spec is the foundation, code is built on it.

**Beat 4 (50-60s)**: The structure completes. Scale pulls back (1.0 → 0.7) to reveal it standing solid. Text overlays:
> **"The specification is the primary development artifact. Code is the compiled output."**

**Narration**: "Spec-Driven Development inverts the relationship. Instead of talking to AI and hoping it remembers, you write a specification — a structured contract that defines intent, constraints, and success criteria. The AI doesn't guess. It implements against the spec. And the spec doesn't drift — it's the foundation everything is built on."

"The specification is the product. The code... is just the compiled output."

**[BEAT — 1.2s pause. Let the thesis land.]**

### Scene 4: Proof — Live Spec vs Vibe Coding Side-by-Side (75s)
**Visual**: A concrete demonstration. NOT abstract theory — show a real scenario.

**Setup (0-10s)**: Text overlay: `"Same task. Two approaches. Watch what happens."`
Task label appears: **"Build an API endpoint for user profiles with validation"**

**Left panel (10-35s) — VIBE CODING approach**:
A chat interface. The developer types increasingly frustrated messages:
```
> "Add a user profile endpoint"
> "No, use Zod for validation"
> "You forgot the error handling from earlier"
> "That's not how our auth middleware works"
> "Start over, but keep the Zod schema from v2"
```
Each response from the AI is partially visible — code that keeps shifting. An error count ticks up: `3 rewrites... 5 rewrites... 7 rewrites...`. The conversation scrolls endlessly.

**Right panel (10-35s) — SDD approach** (appears after left panel, NOT simultaneously):
A spec document types itself out — clean, structured:
```markdown
## Intent
POST /api/users/profile — Create/update user profile

## Constraints
- Validation: Zod schema, strict mode
- Auth: existing bearerAuth middleware
- Errors: RFC 7807 problem details format

## Success Criteria
- [ ] Validates against UserProfile schema
- [ ] Returns 201 on create, 200 on update
- [ ] Matches existing error handling pattern in /api/users/*
```
The spec completes. A single command: `"Implement against this spec"`. Clean code generates in one pass. Green checkmarks appear next to each success criterion.

**Comparison (35-50s)**: Both panels shrink to show results side-by-side. Labels framed as "Typical scenario":
- Left: "~7 rewrites · ~20+ min · pattern mismatch"
- Right: "1 pass · ~4 min · all criteria met"

A simple metric bar animates: **"Typical time saved: ~80%"**

**The Re-hook (50-60s)**: Zoom into the spec's `## Constraints` section. Highlight: `"Auth: existing bearerAuth middleware"`.

**Narration shifts tone** — this is the insight moment: "See this line? This is where vibe coding always breaks. The AI doesn't know your codebase conventions unless you specify them. A spec captures institutional knowledge that conversation can't carry."

**Cooldown (60-75s)**: The spec zooms back out. Other specs appear around it — a constellation of spec documents connected by lines, forming a project architecture. Each spec governs a different part of the system.

**Narration**: "And it scales. One spec governs one unit of work. A project becomes a constellation of specs — each one a contract, each one verifiable. This isn't just a coding technique. It's a paradigm for building with AI."

**[BEAT — 1s ambient visual, specs gently orbiting]**

### Scene 5: The Depth Preview — What Chapter 5 Teaches (30s)
**Visual**: A quick-reveal sequence — three concepts flash on screen as "cards" that flip into view with depth/parallax, each visible for ~6s:

**Card 1**: Three ascending glass platforms with labels floating above them:
`Spec-First → Spec-Anchored → Spec-as-Source`
Caption: "Three levels — from guidance to full code generation from specs"

**Card 2**: An orbital diagram with four nodes circling a center:
`Research → Specify → Interview → Implement`
Particles flow between nodes. Caption: "A four-phase workflow — from investigation to atomic commits"

**Card 3**: A terminal showing `CLAUDE.md` with subagent icons radiating from it:
Caption: "Native implementation in Claude Code — no frameworks, built in"

**Narration**: "Chapter 5 goes deep. Three levels of SDD — from spec-first guidance to full code regeneration. A four-phase workflow from research to implementation. And native Claude Code integration using CLAUDE.md, subagents, and the Tasks system. This is the full methodology."

**Purpose**: Tease the depth without teaching it. Create curiosity for the next videos.

### Scene 6: Key Takeaway + CTA (16s)
**Visual**: All elements fade to black. A 2-second pause with just the ambient music hum.

Then the thesis statement materializes — not slammed, but emerging character-by-character with a subtle blue glow spreading behind each word:

> **"Stop talking to AI. Start specifying."**

Below it, after a 1.5s pause (text positioned in **top-left quadrant** to avoid YouTube end screen overlay zone):
- AgentFactory logo (subtle scale-in)
- "Chapter 5: Spec-Driven Development"
- URL: agentfactory.panaversity.org
- "Full course. Free. Link below."

**Narration**: "Stop talking to AI. Start specifying. Chapter 5 of AgentFactory teaches the complete methodology. It's free. Link in the description."

**SFX**: Low resonant hum builds behind the thesis, resolves to silence.

**YouTube end screen**: Last 15s. Branding elements positioned to avoid bottom-right and center-right overlay zones.

## Duration Breakdown

| Scene | Content | Duration | Running Total |
|-------|---------|----------|---------------|
| 1 | Cold open + hook | 5s | 0:05 |
| 2 | Vibe coding problem | 50s | 0:55 |
| — | Beat (breathing room) | 1.5s | 0:57 |
| 3 | What is SDD | 60s | 1:57 |
| — | Beat (thesis lands) | 1.2s | 1:58 |
| 4 | Live proof / demo | 75s | 3:13 |
| — | Beat (breathing room) | 1s | 3:14 |
| 5 | Chapter 5 depth preview | 30s | 3:44 |
| 6 | Takeaway + CTA | 16s | 4:00 |
| **Total** | | **4:00** | |

Target: **4 minutes**. Tight, no filler, high rewatch value.

## Re-hook Map

| Timestamp | Re-hook Technique | Purpose |
|-----------|-------------------|---------|
| 0:00 | Result teaser flash (show outcome first) | Curiosity gap |
| 0:15 | Iteration counter time-lapse | Visual pattern break — shows degradation |
| 0:57 | 1.5s silence + darkness | Pattern break — reset attention |
| 1:58 | Thesis beat + pause | Let the core idea land |
| 2:10 | "Same task. Two approaches." | Challenge framing — viewer wants to compare |
| 2:50 | "~80% time saved" metric | Data hook — illustrative proof |
| 3:00 | "See this line?" — zoom into spec detail | Insight moment — unexpected depth |

## Thumbnail

**Design**: Dark background. Left side: messy AI chat with red tint, scrolling conversation, visible frustration. Right side: clean spec document with green checkmarks, blue tint. Diagonal split between them. Bold text overlay: **"STOP Vibe Coding"** in white with blue glow. AgentFactory logo bottom-right, small. Designed for high contrast at YouTube thumbnail size (1280x720) — readable at mobile preview scale.

**Source frame**: Extract from Scene 4 comparison moment (frame ~5400), then overlay with text.

## Mobile Considerations

50%+ of YouTube views are on mobile. Design decisions:
- **Minimum readable text**: `body` (24px) for any content that must be read. `caption` (18px) and `codeSmall` (18px) are decorative/atmospheric — viewers don't need to read individual code characters.
- **Scene 4 side-by-side**: At mobile scale, the comparison pattern matters more than code readability. The visual contrast (messy left vs clean right) tells the story even when text is too small to read.
- **Failure cards (Scene 2)**: Full-screen with large type (`h1` at 56px) — fully legible on mobile.
- **Thesis text (Scene 6)**: `display` at 72px — fully legible on mobile.

## Script Draft

**[Scene 1 — 5s]**
*[Flash: clean spec + generated code + green checkmark. SMASH CUT to black. Text slams in.]*
"This is what AI coding looks like when it works. But for most teams... it doesn't."

**[Scene 2 — 50s]**
*[Terminal: human types "Add user authentication". AI generates code. Success badge. Counter: "Iteration 1 of 14"]*
"This is vibe coding. You talk, the AI builds, and iteration one looks amazing."

*[Time-lapse: counter accelerates 2... 5... 8... 14. Code shifts and mutates with each iteration.]*
"But by iteration fourteen..."

*[Terminal glitches and fades to black. Three failure cards emerge.]*
"...context is lost."
*[Card 1: Context Amnesia]*
"Assumptions have drifted."
*[Card 2: Assumption Drift]*
"And the generated code no longer matches your architecture."
*[Card 3: Pattern Fracture]*

*[Cards compress into a question mark.]*
"This is the ceiling. And every developer using AI hits it."

**[BEAT — 1.5s silence]**

**[Scene 3 — 60s]**
*[Two flowlines materialize — vibe coding (red, looping) vs SDD (blue, direct)]*
"Spec-Driven Development inverts the relationship."

"Instead of talking to AI and hoping it remembers, you write a specification — a structured contract that defines intent, constraints, and success criteria."

*[SDD timeline expands. Spec document zooms into view with glowing sections.]*
"The AI doesn't guess. It implements against the spec. And the spec doesn't drift — it's the foundation everything is built on."

*[Spec sections separate into foundation bars. Code blocks stack on top.]*
"The specification is the product."

*[Structure completes. Scale pulls back.]*
"The code... is just the compiled output."

**[BEAT — 1.2s]**

**[Scene 4 — 75s]**
*[Text overlay: "Same task. Two approaches."]*
"Let me show you what this actually looks like."

*[Left panel: vibe coding chat — frustration mounts over 7 rewrites]*
"Vibe coding: multiple rewrites. Twenty-plus minutes. And the code still doesn't match your codebase patterns."

*[Right panel: spec types out cleanly, single implementation pass, green checkmarks]*
"Spec-driven: one spec. One pass. A few minutes. Every criterion met."

*[Metric bar: "Typical time saved: ~80%"]*

*[Zoom into spec Constraints section]*
"See this line — 'Auth: existing bearerAuth middleware'? This is where vibe coding always breaks. The AI doesn't know your conventions unless you specify them. A spec captures institutional knowledge that conversation can't carry."

*[Zoom out to constellation of connected specs]*
"And it scales. One spec per unit of work. A project becomes a constellation of contracts — each one verifiable, each one a source of truth."

"This isn't just a coding technique. It's a paradigm for building with AI."

**[BEAT — 1s]**

**[Scene 5 — 30s]**
*[Three cards flip in with parallax depth]*
"Chapter 5 goes deep. Three levels of SDD — from spec-first guidance to full code regeneration."

"A four-phase workflow from parallel research to atomic commits."

"And native Claude Code integration. No frameworks required. It's all built in."

**[Scene 6 — 16s]**
*[Fade to black. Thesis emerges character by character with blue glow.]*
"Stop talking to AI. Start specifying."

"Chapter 5 of AgentFactory teaches the complete methodology. It's free. Link in the description."

## Success Criteria
- [ ] Viewer viscerally understands WHY vibe coding fails (not just told — shown via iteration time-lapse)
- [ ] Viewer can articulate the core SDD principle: "spec is the product, code is compiled output"
- [ ] Viewer has seen a concrete before/after comparison (not just abstract theory)
- [ ] Viewer is curious about Chapter 5's depth (three levels, four phases, Claude Code)
- [ ] **Mute test** — Story is understandable from visuals alone (iteration counter, code comparison, metrics)
- [ ] **Squint test** — Visual hierarchy is clear (no split-screen text overload, sequential reveals)
- [ ] **3-second hook** — Viewer is engaged before the 3s mark (result teaser flash)
- [ ] **Re-hook cadence** — Pattern break every 30-60 seconds (7 re-hooks mapped above)
- [ ] **No slideshow patterns** — Spring physics on all entrances, animated flowlines not static diagrams, 3D parallax cards not flat tables
- [ ] **Breathing room** — Three explicit beats (1-1.5s pauses) between major sections
- [ ] **Sound design** — Music energy curve matches scene energy, SFX reinforce key moments, transition whooshes on every crossfade
- [ ] **Captions** — Timed transcription overlay present during all narration
- [ ] **Duration** — Total runtime 4:00
- [ ] **Brand-compliant** — Dark theme, Inter + JetBrains Mono, Lucide icons only, accent blue (#3B82F6)
- [ ] **Accessibility** — Text carrying meaning uses `textSecondary` (0.65 opacity, ~5.1:1 contrast) or higher
- [ ] **Mobile-safe** — Critical content legible at mobile viewport sizes
- [ ] **YouTube-ready** — Thumbnail designed, end screen zone respected in Scene 6, branding avoids overlay zones
- [ ] Accurate to AgentFactory Chapter 5 documentation
- [ ] **No unsourced statistics** — All metrics framed as illustrative ("typical", "~80%"), not empirical claims
