# AgentFactory Video Studio

An AI-powered video production pipeline that creates professional motion graphics videos **entirely from specifications** — no video editors, no timelines, no manual keyframing.

Built with Claude Code as the production agent, React/Remotion as the rendering engine, and Spec-Driven Development as the methodology.

**Watch the first video:** [Why Specs Beat Vibe Coding](https://www.youtube.com/watch?v=7NoWCL33IUQ)

## What This Is

This project proves a radical idea: **you can produce broadcast-quality videos by writing specifications instead of using video editors.**

Every frame is a React component. Every animation uses spring physics. Every scene is code. The AI agent reads the spec and builds the entire video — scenes, transitions, voiceover, captions, and final render.

No Premiere Pro. No After Effects. No timeline dragging. Just specs.

## The Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **AI Agent** | Claude Code (Opus) | Orchestrates the entire pipeline — builds scenes, generates code, iterates on feedback |
| **Video Engine** | Remotion (React) | Programmatic video rendering — every frame is a React component |
| **Voiceover** | Gemini TTS (Orus voice) | AI-generated narration synced to visuals |
| **Animations** | Spring physics | Organic, natural motion — never linear easing |
| **Icons** | Lucide React | Clean, consistent iconography |
| **Typography** | Inter + JetBrains Mono | Sans-serif headings + monospace code |

## Production Pipeline

Every video follows a **4-phase Spec-Driven Development workflow**:

```
Phase 1: SPEC          Phase 2: DESIGN         Phase 3: GENERATE       Phase 4: REVIEW
─────────────────      ─────────────────       ─────────────────       ─────────────────
Write video spec  →    Storyboard + styles  →  Build scenes + audio →  Preview + render
(human proposes)       (agent creates)         (agent executes)        (human approves)
```

- **Phase 1 — SPEC**: Define intent, audience, constraints, scene outline, narration script, and success criteria
- **Phase 2 — DESIGN**: Create frame-by-frame storyboard, brand styles, and asset list
- **Phase 3 — GENERATE**: Claude Code scaffolds the Remotion project, builds all scenes with animations, generates voiceover via Gemini TTS, syncs captions, and adds background music
- **Phase 4 — REVIEW**: Human previews via Remotion Studio, requests changes (hot-reload), and approves final render

## Project Structure

```
.
├── CLAUDE.md                          # Project constitution & brand guidelines
├── README.md
├── .claude/
│   └── skills/                        # AI agent capabilities
│       ├── remotion/                   # Video production skill
│       ├── browsing-with-playwright/   # Browser automation
│       ├── interview/                  # Discovery conversations
│       ├── skill-creator/              # Build new skills
│       └── theme-factory/              # Styling toolkit
│
└── videos/
    └── sdd-chapter5-intro/            # First video project
        ├── spec.md                    # Phase 1: Video specification
        ├── design/
        │   ├── storyboard.md          # Phase 2: Scene-by-scene blueprint
        │   ├── styles.ts              # Brand colors & typography
        │   └── assets.md              # Required assets & icons
        ├── src/                       # Phase 3: Remotion source
        │   ├── Root.tsx               # Composition config
        │   ├── SDDVideo.tsx           # Main composition (scenes + audio)
        │   ├── styles.ts              # Shared design tokens
        │   ├── components/
        │   │   ├── Caption.tsx         # Timed caption overlay
        │   │   └── TerminalWindow.tsx  # macOS-style terminal UI
        │   └── scenes/
        │       ├── ColdOpenScene.tsx   # Scene 1: Hook
        │       ├── ProblemScene.tsx    # Scene 2: Vibe coding's ceiling
        │       ├── ShiftScene.tsx     # Scene 3: SDD paradigm shift
        │       ├── ProofScene.tsx     # Scene 4: Side-by-side comparison
        │       ├── PreviewScene.tsx   # Scene 5: Chapter 5 preview
        │       └── CTAScene.tsx       # Scene 6: Call to action
        ├── public/audio/              # Voiceover + background music
        ├── out/
        │   └── video.mp4              # Final rendered output
        ├── package.json
        ├── tsconfig.json
        └── remotion.config.ts
```

## First Video: Why Specs Beat Vibe Coding

**Duration:** 4 minutes | **Resolution:** 1920x1080 | **FPS:** 30

A motion graphics explainer for AgentFactory Chapter 5 — the paradigm shift from conversational AI coding to Spec-Driven Development.

### Scene Breakdown

| Scene | Duration | Content |
|-------|----------|---------|
| 1. Cold Open | 5s | Result teaser flash + hook question |
| 2. The Problem | 50s | Vibe coding's ceiling — context amnesia, assumption drift, pattern fracture |
| 3. The Shift | 60s | SDD definition — dual flowlines, spec document reveal, foundation metaphor |
| 4. The Proof | 75s | Side-by-side comparison — 7 rewrites vs 1 pass |
| 5. Preview | 30s | Three SDD levels, four-phase workflow, Claude Code integration |
| 6. CTA | 16s | Thesis statement + AgentFactory link |

### Key Visual Techniques

- **Spring physics animations** with 3 configs (default, snappy, gentle)
- **3D card rotations** with perspective transforms
- **Orbital diagrams** with rotating nodes and particles
- **Terminal UI** with typing animations and code state transitions
- **Glitch effects** with deterministic scanline displacement
- **Crossfade transitions** between all scenes

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Run Locally

```bash
# Navigate to a video project
cd videos/sdd-chapter5-intro

# Install dependencies
npm install

# Start Remotion Studio (opens in browser)
npm run dev

# Render to MP4
npx remotion render SDDChapter5Intro out/video.mp4
```

### Create a New Video

1. Create a spec at `videos/<video-name>/spec.md`
2. Design the storyboard at `videos/<video-name>/design/storyboard.md`
3. Define styles at `videos/<video-name>/design/styles.ts`
4. Use Claude Code with the remotion skill to generate the project

## Brand Kit

```
Backgrounds:    #0a0a0f (deep dark)  ·  #1A1A1A (panels)  ·  #262626 (elevated)
Accent Blue:    #3B82F6 (CTAs, highlights, glow)
Accent Green:   #22C55E (success states)
Accent Cyan:    #06B6D4 (secondary diagrams)
Typography:     Inter (headings)  ·  JetBrains Mono (code)
Icons:          Lucide React — never emoji
Animations:     Spring physics — never linear easing
```

## Available Skills

| Skill | Purpose |
|-------|---------|
| **remotion** | Video production — scene building, animation, voiceover, rendering |
| **browsing-with-playwright** | Browser automation — screenshots, form filling, web scraping |
| **interview** | Discovery conversations — clarify intent before building |
| **skill-creator** | Create new specialized skills |
| **theme-factory** | Apply professional themes to artifacts |

## The Meta Story

This project practices what it preaches:

> We used **Spec-Driven Development** to build a video about **Spec-Driven Development**.

The spec defined every scene. The AI agent implemented against the spec. The code was the compiled output. No guessing. No vibe coding.

That's the whole point.

## Links

- **YouTube:** [Why Specs Beat Vibe Coding](https://www.youtube.com/watch?v=7NoWCL33IUQ)
- **GitHub:** [github.com/safdarayubpk/general-agent-video-maker](https://github.com/safdarayubpk/general-agent-video-maker)
- **AgentFactory:** [agentfactory.panaversity.org](https://agentfactory.panaversity.org/)

## License

MIT
