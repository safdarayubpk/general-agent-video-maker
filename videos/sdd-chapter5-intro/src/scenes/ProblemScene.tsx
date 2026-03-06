import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Brain, Shuffle, GitBranch } from "lucide-react";
import { brand, typeScale, anim, layout, iconSizes } from "../styles";
import { TerminalWindow } from "../components/TerminalWindow";

// Pre-composed code states for the time-lapse
const CODE_STATES = [
  `import express from 'express';
import bcrypt from 'bcrypt';

const authRouter = express.Router();

// User authentication middleware
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  const valid = await bcrypt.compare(password, user.hash);
  res.json({ token: generateJWT(user) });
});`,
  `import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/auth/login', async (req, res) => {
  const { username, pass } = req.body;
  const account = await db.users.find({ username });
  const match = bcrypt.compareSync(pass, account.password);
  return res.status(200).send({ jwt: signToken(account) });
});`,
  `import { Router } from 'express';
import argon2 from 'argon2';

export default function authRoutes() {
  const r = Router();
  r.post('/api/v2/signin', async (request, response) => {
    const user = await findUser(request.body.email);
    if (await argon2.verify(user.pwd, request.body.pw)) {
      response.json(createSession(user));
    }
  });
  return r;
}`,
  `const auth = require('./utils/auth');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.post('/login', (req, res) => {
    auth.validate(req.body)
      .then(u => jwt.sign({ id: u._id }, SECRET))
      .then(token => res.send({ token }))
      .catch(err => res.status(401).send(err));
  });
};`,
  `import { Hono } from 'hono';
import { sign } from 'hono/jwt';

const app = new Hono();
app.post('/authenticate', async (c) => {
  const { email, password } = await c.req.json();
  const user = await Users.getByEmail(email);
  const token = await sign({ sub: user.id }, ENV.SECRET);
  return c.json({ access_token: token });
});`,
];

const FAILURE_CARDS = [
  { icon: Brain, label: "Context Amnesia", desc: "The AI forgets what it built three sessions ago" },
  { icon: Shuffle, label: "Assumption Drift", desc: "Each iteration makes guesses that compound" },
  { icon: GitBranch, label: "Pattern Fracture", desc: "Generated code stops matching your architecture" },
];

const SESSION_TITLES = ["Session 1", "Session 3", "Session 7", "Session 12"];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine which beat we're in
  const isBeat1 = frame < 450; // 0-450 (15s)
  const isBeat2 = frame >= 450 && frame < 900; // 450-900 (15s)
  const isBeat3 = frame >= 900 && frame < 1350; // 900-1350 (15s)
  const isBeat4 = frame >= 1350; // 1350-1500 (5s)

  // Beat 1: iteration counter
  const iterationNum = useMemo(() => {
    if (frame < 410) return 1;
    if (frame < 450) return 1;
    // Beat 2: accelerating count
    const t = interpolate(frame, [450, 900], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const eased = t * t; // quadratic easing
    return Math.min(14, Math.floor(1 + eased * 13));
  }, [frame]);

  // Code state index based on iteration
  const codeIdx = useMemo(() => {
    if (iterationNum <= 3) return 0;
    if (iterationNum <= 6) return 1;
    if (iterationNum <= 9) return 2;
    if (iterationNum <= 12) return 3;
    return 4;
  }, [iterationNum]);

  // Session title
  const sessionTitle = useMemo(() => {
    if (iterationNum <= 2) return SESSION_TITLES[0];
    if (iterationNum <= 5) return SESSION_TITLES[1];
    if (iterationNum <= 9) return SESSION_TITLES[2];
    return SESSION_TITLES[3];
  }, [iterationNum]);

  // Badge color
  const badgeColor = iterationNum < 8 ? brand.accentGreen : iterationNum < 12 ? brand.accentAmber : brand.accentRed;
  const badgeText = iterationNum < 12 ? "Success" : "Issues Found";

  // Typing animation for beat 1
  const typingProgress = interpolate(frame, [30, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const userMessage = '> "Add user authentication to my app"';
  const visibleChars = Math.floor(typingProgress * userMessage.length);

  // AI response visibility
  const aiResponseOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Badge visibility
  const badgeScale = frame >= 390
    ? spring({ frame: frame - 390, fps, from: 0, to: 1, config: anim.springSnappy })
    : 0;

  // Counter visibility
  const counterOpacity = interpolate(frame, [410, 420], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Glitch transition (frame 900-920)
  const isGlitching = frame >= 900 && frame < 908;
  const glitchFade = frame >= 908 && frame < 920
    ? interpolate(frame, [908, 920], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : frame < 908 ? 1 : 0;

  // Red edge pulse in beat 2
  const redPulseOpacity = isBeat2
    ? Math.sin((frame - 450) * 0.08) * 0.15 * interpolate(frame, [450, 900], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // Screen shake
  const shakeX = (isBeat2 && frame % 30 < 4) ? Math.sin(frame * 0.7) * 2 : 0;
  const shakeY = (isBeat2 && frame % 30 < 4) ? Math.cos(frame * 0.9) * 2 : 0;

  // Failure cards
  const card1Start = 920;
  const card2Start = 1070;
  const card3Start = 1200;

  const activeCard = frame >= card3Start ? 2 : frame >= card2Start ? 1 : frame >= card1Start ? 0 : -1;

  // Beat 4: compression
  const compressionProgress = isBeat4
    ? spring({ frame: frame - 1350, fps, from: 0, to: 1, config: anim.spring })
    : 0;

  // Question mark
  const questionPulse = isBeat4
    ? 1 + Math.sin((frame - 1350) * 0.05) * 0.05
    : 1;

  // Dim to black at end
  const endDim = interpolate(frame, [1470, 1500], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: brand.bgPrimary }}>
      {/* Red edge pulse */}
      {redPulseOpacity > 0 && (
        <AbsoluteFill
          style={{
            boxShadow: `inset 0 0 150px rgba(239,68,68,${redPulseOpacity})`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Terminal (Beat 1 & 2) */}
      {(isBeat1 || isBeat2) && glitchFade > 0 && (
        <div
          style={{
            position: "absolute",
            left: layout.marginX,
            top: layout.marginY,
            right: layout.marginX,
            bottom: layout.marginY,
            opacity: glitchFade,
            transform: `translate(${shakeX}px, ${shakeY}px)`,
          }}
        >
          {/* Glitch scanlines */}
          {isGlitching && (
            <AbsoluteFill style={{ zIndex: 10, pointerEvents: "none" }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${15 + i * 14}%`,
                    left: `${(i % 2 === 0 ? 1 : -1) * (3 + Math.sin(i * 2.7) * 3)}%`,
                    right: 0,
                    height: `${2 + Math.cos(i * 1.9) * 2 + 2}%`,
                    background: brand.bgTertiary,
                    opacity: 0.8,
                  }}
                />
              ))}
            </AbsoluteFill>
          )}

          <TerminalWindow title={`AI Chat — ${sessionTitle}`}>
            {/* User message */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ ...typeScale.code, color: brand.accentCyan }}>{">"} </span>
              <span style={{ ...typeScale.code, color: brand.textCode }}>
                {userMessage.slice(2, 2 + visibleChars)}
              </span>
            </div>

            {/* AI response code */}
            <div style={{ opacity: aiResponseOpacity }}>
              <pre
                style={{
                  ...typeScale.codeSmall,
                  color: brand.textCode,
                  whiteSpace: "pre-wrap",
                  margin: 0,
                }}
              >
                {CODE_STATES[codeIdx]}
              </pre>
            </div>

            {/* Success badge */}
            {badgeScale > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: layout.windowChromeHeight + 16,
                  right: 24,
                  background: badgeColor,
                  color: "white",
                  padding: "6px 16px",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "Inter, system-ui, sans-serif",
                  transform: `scale(${badgeScale})`,
                }}
              >
                {badgeText}
              </div>
            )}
          </TerminalWindow>

          {/* Iteration counter */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              opacity: counterOpacity,
              display: "flex",
              alignItems: "baseline",
              gap: 4,
            }}
          >
            <span style={{ ...typeScale.caption, color: brand.textDim }}>Iteration </span>
            <span style={{ ...typeScale.h3, color: brand.accentAmber }}>{iterationNum}</span>
            <span style={{ ...typeScale.caption, color: brand.textDim }}> of 14</span>
          </div>
        </div>
      )}

      {/* Failure Cards (Beat 3) */}
      {isBeat3 && activeCard >= 0 && (
        <AbsoluteFill style={{ opacity: endDim }}>
          {/* Glow background */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              width: 600,
              height: 600,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 70%)`,
            }}
          />

          {FAILURE_CARDS.map((card, idx) => {
            if (idx !== activeCard) return null;
            const cardFrame = frame - (idx === 0 ? card1Start : idx === 1 ? card2Start : card3Start);
            const iconY = spring({ frame: cardFrame, fps, from: -40, to: 0, config: anim.spring });
            const labelOpacity = interpolate(cardFrame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const descOpacity = interpolate(cardFrame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "35%",
                  transform: `translate(-50%, -50%) translateX(${idx * 10}px)`,
                  textAlign: "center",
                }}
              >
                <div style={{ transform: `translateY(${iconY}px)`, marginBottom: 24 }}>
                  <Icon size={iconSizes.xl} color={brand.accentRed} strokeWidth={1.5} />
                </div>
                <div style={{ ...typeScale.h1, color: brand.textPrimary, opacity: labelOpacity, marginBottom: 16 }}>
                  {card.label}
                </div>
                <div style={{ ...typeScale.body, color: brand.textSecondary, opacity: descOpacity, maxWidth: 600 }}>
                  {card.desc}
                </div>
              </div>
            );
          })}
        </AbsoluteFill>
      )}

      {/* Beat 4: Question mark */}
      {isBeat4 && (
        <AbsoluteFill style={{ opacity: endDim }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "45%",
              transform: `translate(-50%, -50%) scale(${compressionProgress * questionPulse})`,
            }}
          >
            <div
              style={{
                ...typeScale.h1,
                color: brand.accentPrimary,
                fontSize: 120,
                textAlign: "center",
              }}
            >
              ?
            </div>
            {/* Blue glow behind */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 300,
                height: 300,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)`,
                zIndex: -1,
              }}
            />
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
