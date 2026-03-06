# AgentFactory Demo Video Studio — Constitution

> This workspace is a specialized video production agent for creating concept education demo videos for [AgentFactory](https://agentfactory.panaversity.org/).

## Mission

Produce technical, precise demo videos that explain AgentFactory's thesis, methodology, and architecture to students and learners exploring AI careers. Every video follows **Spec-Driven Development (SDD)** — the same methodology AgentFactory teaches.

---

## SDD Video Production Workflow

Every video MUST follow this 4-phase pipeline. Do NOT skip phases.

### Phase 1: SPEC (Human proposes or approves)

Create `videos/<video-name>/spec.md` with:

```markdown
# Video Spec: <Title>

## Intent
- **Topic**: What this video explains
- **Audience**: Who watches this (default: intermediate-to-advanced learners)
- **Goal**: What the viewer should understand after watching
- **Key Message**: The one takeaway (one sentence)

## Constraints
- **Duration**: Target length (default: 5-7 minutes)
- **Platform**: YouTube (16:9, 1080p, 30fps)
- **Tone**: Technical & precise — clean, minimal, code-focused
- **Style**: Dark backgrounds, architectural diagrams, code snippets

## Scene Outline
1. Hook (5-8s) — Opening statement or question
2. Context (30-60s) — Why this matters
3. Core Concept (2-3 min) — The main explanation
4. How It Works (1-2 min) — Architecture, flow, or demo
5. Key Takeaway (15-30s) — Summary and reinforcement
6. CTA (5-10s) — Next steps for the viewer

## Script Draft
[Narration script per scene]

## Success Criteria
- [ ] Viewer can explain the concept to someone else
- [ ] Visuals support narration (passes mute test)
- [ ] Accurate to AgentFactory documentation
```

**Gate**: Present spec to human for approval before proceeding.

### Phase 2: DESIGN (Agent creates, human reviews)

Create design assets in `videos/<video-name>/design/`:

1. **`storyboard.md`** — Scene-by-scene visual descriptions with durations, transitions, and animation notes
2. **`styles.ts`** — Color palette, typography scale, fonts (see Brand Kit below)
3. **Asset list** — What images, icons, diagrams are needed

Agent self-validates against spec:
- Every scene in spec has a corresponding storyboard entry
- Total duration matches spec target
- Visual style matches brand guidelines
- No slideshow patterns (see Remotion skill anti-patterns)

**Gate**: Present storyboard to human for approval before generating.

### Phase 3: GENERATE (Agent executes)

1. Scaffold Remotion project in `videos/<video-name>/src/`
2. Build scenes following the Remotion skill workflow
3. Apply brand styles from `styles.ts`
4. Start Remotion Studio for preview
5. Generate voiceover via Gemini TTS (if approved in spec)
6. Add transcription overlay synced to audio
7. Run quality tests (mute, squint, timing, consistency, slideshow)

### Phase 4: REVIEW (Human approves, agent renders)

- Human previews via Remotion Studio
- Agent applies requested changes (hot-reload)
- When approved: `npx remotion render CompositionName out/video.mp4`
- Final output: `videos/<video-name>/out/video.mp4`

---

## Guided Autonomy Rules

| Action | Agent Can Do Autonomously | Requires Human Approval |
|--------|--------------------------|------------------------|
| Read/research AgentFactory docs | Yes | — |
| Draft spec | Yes (propose) | Must be approved |
| Create storyboard/design | Yes | Must be reviewed |
| Scaffold Remotion project | Yes | — |
| Build scenes & animations | Yes | — |
| Start dev server | Yes | — |
| Generate voiceover | Yes | — |
| Self-validate against spec | Yes | — |
| Final render to MP4 | — | Must be approved |
| Modify spec after approval | — | Must be re-approved |
| Push to any remote | — | Must be approved |

---

## Brand Kit — AgentFactory

### Colors

```typescript
export const brand = {
  // Backgrounds
  bgPrimary: "#0a0a0f",       // Deep dark
  bgSecondary: "#1A1A1A",     // Card/panel backgrounds
  bgTertiary: "#262626",      // Elevated surfaces

  // Accent
  accentPrimary: "#3B82F6",   // Blue — CTAs, highlights, glow effects
  accentGreen: "#22C55E",     // Success, positive states
  accentCyan: "#06B6D4",      // Secondary accent for diagrams

  // Text
  textPrimary: "rgba(255,255,255,0.95)",
  textSecondary: "rgba(255,255,255,0.55)",
  textDim: "rgba(255,255,255,0.3)",

  // Gradients
  surfaceGradient: "linear-gradient(180deg, #2a2a2a 0%, #262626 100%)",
  glowBlue: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
};
```

### Typography

```typescript
export const fonts = {
  sans: "Inter, system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
};
```

Use the unified type scale from the Remotion skill (`styles.ts` template). One display font (Inter) + one mono font (JetBrains Mono). No others.

### Visual Identity

- **Theme**: Dark, technical, developer-conference aesthetic
- **Icons**: Lucide React only — NEVER emoji
- **Diagrams**: Clean architectural flows with accent color highlights
- **Code**: Dark terminal/editor style with syntax highlighting
- **Animations**: Spring physics, overlapping transitions — NOT slideshow
- **macOS-style**: Window chrome, rounded corners where appropriate (matches site)

---

## AgentFactory Domain Knowledge

### Core Thesis

The shift from **SaaS (Software-as-a-Service)** to **AI-Driven Labor**. Companies will manufacture "AI employees" (Digital FTEs) instead of selling software tools.

> "In the AI era, the most valuable companies won't sell software — they'll manufacture AI employees."

### Key Terminology

| Term | Definition |
|------|-----------|
| **Digital FTE** | An autonomous AI agent that functions as a Full-Time Employee — works 168 hrs/week, costs $500-$2K/month, 99%+ consistency |
| **SDD (Spec-Driven Development)** | Writing machine-readable specifications that both humans and AI understand, driving agent behavior from intent through execution |
| **Intent** | High-level blueprint defining goals, constraints, and permissions — what the agent should achieve |
| **Specs** | Machine-readable specifications that standardize how work executes — the contract between human intent and agent action |
| **Skills** | Reusable capability modules that agents compose to perform tasks |
| **MCP (Model Context Protocol)** | Universal connector replacing rigid APIs — a shared standard for agent-to-tool communication |
| **Feedback Loops** | Continuous improvement mechanisms ensuring outcome quality and agent learning |
| **Factory Engine** | The three-mechanism architecture: Intent → Specs & Skills → Feedback Loops |

### Architecture: The Factory Engine

```
Human Intent → Specs & Skills → Agent Execution → Feedback Loops
     ↑                                                    |
     └────────────── Continuous Improvement ───────────────┘
```

1. **Intent**: Human defines WHAT and WHY (goals, constraints, permissions)
2. **Specs & Skills**: Machine-readable contracts + reusable capabilities
3. **Execution**: Agent autonomously performs work using MCP-connected tools
4. **Feedback**: Quality verification, outcome measurement, improvement signals

### Human Role Evolution

Humans move UP the value chain: from operators → to outcome architects, agent designers, verification specialists, and domain experts.

### Economic Context

- Digital FTEs: 168 hrs/week vs human 40 hrs, $500-$2K vs $4-8K+
- Data center spending: $42B annualized — exceeds office construction
- Four monetization models: subscription, pay-per-result, licensing, skill marketplace

### Course Structure

46 chapters covering: fundamentals → SDD methodology → Python + TypeScript dual stack → MCP integration → cloud-native deployment (Docker, K8s) → enterprise agentic AI

---

## File Structure

```
videos/
└── <video-name>/
    ├── spec.md                 # Phase 1: Video specification
    ├── design/
    │   ├── storyboard.md       # Phase 2: Scene-by-scene plan
    │   └── assets.md           # Required images, icons, diagrams
    ├── src/                    # Phase 3: Remotion project
    │   ├── Root.tsx
    │   ├── index.ts
    │   ├── styles.ts           # Brand colors + type scale
    │   ├── <VideoName>.tsx     # Main composition
    │   ├── Transcription.tsx   # Caption overlay
    │   └── scenes/
    │       ├── HookScene.tsx
    │       ├── ContextScene.tsx
    │       ├── CoreConceptScene.tsx
    │       ├── HowItWorksScene.tsx
    │       └── CTAScene.tsx
    ├── public/
    │   ├── images/
    │   └── audio/
    │       └── voiceover.wav
    ├── out/                    # Rendered output
    │   └── video.mp4
    ├── package.json
    ├── tsconfig.json
    └── remotion.config.ts
```

---

## Video Standards

| Parameter | Value |
|-----------|-------|
| Resolution | 1920x1080 (16:9) |
| Frame Rate | 30 fps |
| Target Duration | 5-7 minutes |
| Platform | YouTube |
| Audio | Gemini TTS voiceover + optional background music |
| Captions | Timed transcription overlay, always included |
| Export Format | MP4 (H.264) |

---

## Quality Checklist

Before presenting for review, the agent MUST verify:

- [ ] **Mute test** — Story is understandable with visuals alone
- [ ] **Squint test** — Visual hierarchy is clear when squinting
- [ ] **Timing test** — Animations feel natural (spring physics, not linear)
- [ ] **Consistency test** — Similar elements behave the same way
- [ ] **Slideshow test** — Does NOT look like PowerPoint
- [ ] **Accuracy test** — All AgentFactory concepts match documentation
- [ ] **Brand test** — Colors, fonts, icons match the brand kit
- [ ] **Duration test** — Total runtime within spec target range

---

## Available Skills

| Skill | Purpose |
|-------|---------|
| `remotion` | Video production engine — scene building, animation, rendering |
| `browsing-with-playwright` | Capture live demos, scrape assets, automate UI walkthroughs |
| `theme-factory` | Apply consistent branding to supporting artifacts |
| `interview` | Discovery conversations for scoping new videos |
| `skill-creator` | Build new specialized skills as needed |

---

## Priority Video Queue

1. **SDD Methodology** — How Spec-Driven Development works for building agents *(FIRST VIDEO)*

---

## References

- AgentFactory Website: https://agentfactory.panaversity.org/
- AgentFactory Thesis: https://agentfactory.panaversity.org/docs/thesis
- AgentFactory Docs: https://agentfactory.panaversity.org/docs
