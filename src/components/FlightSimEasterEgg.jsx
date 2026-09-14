// FlightSimEasterEgg.jsx
// "Aero Dash" — a tiny flappy-plane canvas mini-game, styled in the site's
// blueprint/brass/signal palette. Space, click, or tap to flap; dodge the
// pipes. Triggered by typing "game" (handled in EasterEggs.jsx) — this
// component only exists in the DOM while active, so it costs nothing idle.
//
// Ported from a standalone vanilla-JS build that had a server-backed
// leaderboard (api('/api/game-scores')). This site has no such endpoint, so
// scoring here is local-only: best score persists per-browser in
// localStorage, same as the sound preference and the secret unlock below.

import { useEffect, useRef, useState } from "react";
import firstFlightVideo from "../assets/Special_Clip.mp4";

const SOUND_KEY = "aero-fcrit-game-sound";
const SECRET_KEY = "aero-fcrit-game-secret-unlocked";
const BEST_KEY = "aero-fcrit-game-best";
const SPECIAL_CLIP_TARGET = 10;

// Rare unlock: a 1-in-50 shot at each 10-point milestone gives an alternate
// flap sound + a gold plane skin, permanently, for this browser.
const EASTER_MILESTONE_EVERY = 10;
const EASTER_ODDS = 1 / 50;

const GAME_W = 640;
const GAME_H = 360;
const GRAVITY = 0.45;
const FLAP = -7.5;
const PIPE_GAP = 140;
const PIPE_W = 46;
const PIPE_SPEED = 3.2;
const SPAWN_EVERY = 95;
const PLANE_X = 90;
const PLANE_R = 12;

let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  return audioCtx;
}
function beep(soundOn, freq, duration, type = "sine", gainStart = 0.15) {
  if (!soundOn) return;
  const ctx = ensureAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(gainStart, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export default function FlightSimEasterEgg({ onClose }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("ready"); // "ready" | "playing" | "done"
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem(BEST_KEY) ?? 0));
  const [soundOn, setSoundOn] = useState(() => (localStorage.getItem(SOUND_KEY) ?? "1") === "1");
  const [secretUnlocked, setSecretUnlocked] = useState(
    () => localStorage.getItem(SECRET_KEY) === "1"
  );
  const [specialClipUnlocked, setSpecialClipUnlocked] = useState(false);
  const [specialClipScore, setSpecialClipScore] = useState(0);
  const [unlockToast, setUnlockToast] = useState(false);

  const soundOnRef = useRef(soundOn);
  soundOnRef.current = soundOn;
  const secretRef = useRef(secretUnlocked);
  secretRef.current = secretUnlocked;
  const specialClipUnlockedRef = useRef(false);

  function sfxFlap() {
    if (secretRef.current) {
      beep(soundOnRef.current, 660, 0.06, "triangle", 0.09);
      setTimeout(() => beep(soundOnRef.current, 880, 0.06, "triangle", 0.07), 40);
    } else {
      beep(soundOnRef.current, 520, 0.09, "square", 0.08);
    }
  }
  function sfxScore() {
    beep(soundOnRef.current, 880, 0.12, "triangle", 0.12);
    setTimeout(() => beep(soundOnRef.current, 1180, 0.12, "triangle", 0.1), 60);
  }
  function sfxCrash() {
    beep(soundOnRef.current, 140, 0.4, "sawtooth", 0.16);
  }

  // Draw an idle blueprint frame before the first game starts.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const bgCache = buildBackgroundCache();
    drawBackground(ctx, bgCache);
    drawPlane(ctx, { y: GAME_H / 2, vy: 0 }, secretUnlocked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bgCache = buildBackgroundCache();

    const plane = { y: GAME_H / 2, vy: 0 };
    let obstacles = [];
    let frame = 0;
    let runScore = 0;
    let lastEasterCheckScore = 0;
    let rafId;
    let done = false;

    function maybeTriggerEasterEgg() {
      if (secretRef.current) return;
      if (runScore === 0 || runScore % EASTER_MILESTONE_EVERY !== 0) return;
      if (runScore === lastEasterCheckScore) return;
      lastEasterCheckScore = runScore;
      if (Math.random() < EASTER_ODDS) {
        secretRef.current = true;
        setSecretUnlocked(true);
        localStorage.setItem(SECRET_KEY, "1");
        setUnlockToast(true);
        setTimeout(() => setUnlockToast(false), 2600);
      }
    }

    function maybeTriggerSpecialClip(runScore) {
      if (specialClipUnlockedRef.current) return;
      if (runScore < SPECIAL_CLIP_TARGET) return;

      specialClipUnlockedRef.current = true;
      setSpecialClipUnlocked(true);
      setSpecialClipScore(runScore);
    }

    function onFlap() {
      if (done) return;
      plane.vy = FLAP;
      sfxFlap();
    }
    function onKeyDown(e) {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        onFlap();
      } else if (e.key === "Escape") {
        finish();
      }
    }
    window.addEventListener("keydown", onKeyDown);

    function finish() {
      if (done) return;
      done = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
      sfxCrash();
      setScore(runScore);
      setBest((prevBest) => {
        const next = Math.max(prevBest, runScore);
        localStorage.setItem(BEST_KEY, String(next));
        return next;
      });
      setPhase("done");
    }

    function loop() {
      frame++;
      plane.vy += GRAVITY;
      plane.y += plane.vy;

      if (frame % SPAWN_EVERY === 1) {
        const gapY = 40 + Math.random() * (GAME_H - 80 - PIPE_GAP);
        obstacles.push({ x: GAME_W, gapY, passed: false });
      }
      obstacles.forEach((o) => (o.x -= PIPE_SPEED));
      obstacles = obstacles.filter((o) => o.x > -PIPE_W);

      let crashed = plane.y - PLANE_R < 0 || plane.y + PLANE_R > GAME_H;
      obstacles.forEach((o) => {
        if (!o.passed && o.x + PIPE_W < PLANE_X) {
          o.passed = true;
          runScore++;
          setScore(runScore);
          sfxScore();
          maybeTriggerEasterEgg();
          maybeTriggerSpecialClip(runScore);
        }
        const withinX = PLANE_X + PLANE_R > o.x && PLANE_X - PLANE_R < o.x + PIPE_W;
        const hitsGap = plane.y - PLANE_R < o.gapY || plane.y + PLANE_R > o.gapY + PIPE_GAP;
        if (withinX && hitsGap) crashed = true;
      });

      drawBackground(ctx, bgCache);
      drawObstacles(ctx, obstacles);
      drawPlane(ctx, plane, secretRef.current);
      drawHud(ctx, runScore);

      if (crashed) {
        finish();
        return;
      }
      rafId = requestAnimationFrame(loop);
    }

    function onCanvasClick() {
      onFlap();
    }
    canvas.addEventListener("pointerdown", onCanvasClick);

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("pointerdown", onCanvasClick);
    };
  }, [phase]);

  function startGame() {
    ensureAudio();
    specialClipUnlockedRef.current = false;
    setSpecialClipUnlocked(false);
    setSpecialClipScore(0);
    setScore(0);
    setPhase("playing");
  }

  function toggleSound() {
    setSoundOn((prev) => {
      const next = !prev;
      localStorage.setItem(SOUND_KEY, next ? "1" : "0");
      if (next) ensureAudio();
      return next;
    });
  }

  // Global Escape-to-close and Space-to-start while not mid-run.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
      } else if ((e.code === "Space" || e.key === " ") && phase !== "playing") {
        e.preventDefault();
        startGame();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, onClose]);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-hangardeep/95 px-4">
      <div className="relative w-full max-w-[640px]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-extrabold uppercase text-xl text-ink">
            Aero <span className="text-signal">Dash</span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="font-mono text-[0.7rem] uppercase tracking-wider border border-ink/30 rounded-sm px-2.5 py-1.5 text-ink hover:border-brass hover:text-brass transition-colors"
            >
              {soundOn ? "Sound on" : "Sound off"}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close game"
              className="font-mono text-[0.7rem] uppercase tracking-wider border border-ink/30 rounded-sm px-2.5 py-1.5 text-ink hover:border-signal hover:text-signal transition-colors"
            >
              Esc
            </button>
          </div>
        </div>

        <div className="relative rounded-sm overflow-hidden border border-brass/30 shadow-2xl">
          <canvas
            ref={canvasRef}
            width={GAME_W}
            height={GAME_H}
            className="block w-full h-auto cursor-pointer touch-none"
          />

          {phase !== "playing" && (
            <div className="absolute inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-hangardeep/70 text-center px-6">
              {phase === "done" ? (
                <div className="w-full max-w-[420px] max-h-[80vh] overflow-y-auto rounded-sm border border-brass/40 bg-hangardeep/90 px-4 py-4">
                  <p className="font-display font-extrabold uppercase text-[clamp(1.3rem,2vw,2rem)] leading-tight text-ink mb-1 break-words">
                    Crashed — score {score}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink/80 mb-5">
                    Best: {best}
                  </p>

                  {specialClipUnlocked && (
                    <div className="mb-5 border border-brass/50 rounded-sm bg-hangardeep/70 px-4 py-3 text-left max-w-full">
                      <p className="font-display font-extrabold uppercase text-[clamp(1rem,1.8vw,1.4rem)] leading-tight text-ink break-words">
                        Congratulations on Scoring {specialClipScore || SPECIAL_CLIP_TARGET} points
                      </p>
                      <p className="font-mono text-[0.72rem] uppercase tracking-wider text-brass break-words">
                        You have unlocked a special clip
                      </p>
                      <video
                        src={firstFlightVideo}
                        className="w-full max-w-full h-auto mt-3 rounded-sm border border-brass/40"
                        controls
                        muted
                        playsInline
                      />
                      <p className="font-mono text-[0.72rem] uppercase tracking-wider text-ink/80 mt-2 break-words">
                        A small video clip I&apos;ll upload
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={startGame}
                    className="font-mono text-[0.72rem] uppercase tracking-wider font-medium px-5 py-[10px] rounded-sm bg-signal text-[#171006] hover:bg-orange-400 transition-colors"
                  >
                    Play again
                  </button>
                </div>
              ) : (
                <div>
                  <p className="font-display font-extrabold uppercase text-2xl text-ink mb-1">
                    Ready for takeoff?
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink/80 mb-5">
                    Space / click to flap
                  </p>
                  <button
                    type="button"
                    onClick={startGame}
                    className="font-mono text-[0.72rem] uppercase tracking-wider font-medium px-5 py-[10px] rounded-sm bg-signal text-[#171006] hover:bg-orange-400 transition-colors"
                  >
                    Start game
                  </button>
                </div>
              )}
            </div>
          )}

          {unlockToast && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] uppercase tracking-wider bg-hangardeep border border-brass/50 text-brass px-3.5 py-2 rounded-sm shadow-lg">
              Rare unlock: Golden Wings + secret flap sound
            </div>
          )}
        </div>

        <p className="font-mono text-[0.72rem] uppercase tracking-wider text-ink mt-3 text-center">
          Best: {best} {secretUnlocked && <span className="text-brass">— Golden Wings unlocked</span>}
        </p>
      </div>
    </div>
  );
}

// ---- Canvas drawing helpers (site blueprint palette) ----

function drawBackground(ctx, bgCache) {
  ctx.drawImage(bgCache, 0, 0);
}

function buildBackgroundCache() {
  const bg = document.createElement("canvas");
  bg.width = GAME_W;
  bg.height = GAME_H;
  const bctx = bg.getContext("2d");
  bctx.fillStyle = "#0c1a17"; // hangardeep
  bctx.fillRect(0, 0, GAME_W, GAME_H);
  bctx.strokeStyle = "rgba(127,200,190,0.12)"; // linecyan, faint
  bctx.lineWidth = 1;
  bctx.beginPath();
  for (let gx = 0; gx < GAME_W; gx += 28) {
    bctx.moveTo(gx, 0);
    bctx.lineTo(gx, GAME_H);
  }
  for (let gy = 0; gy < GAME_H; gy += 28) {
    bctx.moveTo(0, gy);
    bctx.lineTo(GAME_W, gy);
  }
  bctx.stroke();
  return bg;
}

function drawObstacles(ctx, obstacles) {
  obstacles.forEach((o) => {
    ctx.fillStyle = "#1a342c"; // panel
    ctx.fillRect(o.x, 0, PIPE_W, o.gapY);
    ctx.fillRect(o.x, o.gapY + PIPE_GAP, PIPE_W, GAME_H - (o.gapY + PIPE_GAP));
    ctx.strokeStyle = "#e2572b"; // signal
    ctx.lineWidth = 2;
    ctx.strokeRect(o.x, 0, PIPE_W, o.gapY);
    ctx.strokeRect(o.x, o.gapY + PIPE_GAP, PIPE_W, GAME_H - (o.gapY + PIPE_GAP));
  });
}

function drawPlane(ctx, plane, secretUnlocked) {
  ctx.save();
  ctx.translate(PLANE_X, plane.y);
  const angle = Math.max(-0.5, Math.min(0.9, plane.vy / 12));
  ctx.rotate(angle);

  // Golden plane always — the secret unlock adds a brighter highlight and
  // a small sparkle rather than swapping the whole color scheme.
  const bodyGrad = ctx.createLinearGradient(-PLANE_R, 0, PLANE_R + 8, 0);
  if (secretUnlocked) {
    bodyGrad.addColorStop(0, "#a9791f");
    bodyGrad.addColorStop(0.5, "#ffe9a8");
    bodyGrad.addColorStop(1, "#ffcf5c");
  } else {
    bodyGrad.addColorStop(0, "#8a6423");
    bodyGrad.addColorStop(0.5, "#e8bf6f");
    bodyGrad.addColorStop(1, "#ce9e52"); // brass
  }
  const finColor = secretUnlocked ? "#ffcf5c" : "#ce9e52";

  // Rear stabilizer fin
  ctx.fillStyle = finColor;
  ctx.beginPath();
  ctx.moveTo(-PLANE_R * 0.6, -PLANE_R * 0.15);
  ctx.lineTo(-PLANE_R * 1.15, -PLANE_R * 0.95);
  ctx.lineTo(-PLANE_R * 0.35, -PLANE_R * 0.15);
  ctx.closePath();
  ctx.fill();

  // Rear wing (lower)
  ctx.beginPath();
  ctx.moveTo(-PLANE_R * 0.2, PLANE_R * 0.15);
  ctx.lineTo(-PLANE_R * 0.9, PLANE_R * 1.05);
  ctx.lineTo(PLANE_R * 0.1, PLANE_R * 0.35);
  ctx.closePath();
  ctx.fill();

  // Fuselage body
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(PLANE_R + 8, 0);
  ctx.quadraticCurveTo(PLANE_R * 0.5, -PLANE_R * 0.85, -PLANE_R, -PLANE_R * 0.55);
  ctx.lineTo(-PLANE_R * 0.35, 0);
  ctx.lineTo(-PLANE_R, PLANE_R * 0.55);
  ctx.quadraticCurveTo(PLANE_R * 0.5, PLANE_R * 0.85, PLANE_R + 8, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(15,10,4,0.35)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Cockpit window
  ctx.fillStyle = "rgba(241,236,221,0.85)"; // ink, translucent
  ctx.beginPath();
  ctx.ellipse(PLANE_R * 0.15, -PLANE_R * 0.08, PLANE_R * 0.32, PLANE_R * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  if (secretUnlocked) {
    // Small sparkle to distinguish the unlocked skin from the base gold.
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(PLANE_R * 0.6, -PLANE_R * 0.35, 1.4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawHud(ctx, score) {
  ctx.font = "bold 30px monospace";
  ctx.textBaseline = "top";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(12,26,23,0.9)"; // hangardeep outline for contrast
  ctx.strokeText(String(score), 16, 14);
  ctx.fillStyle = "#f1ecdd"; // ink
  ctx.fillText(String(score), 16, 14);
}
