// FlightSimEasterEgg.jsx
// A tiny 15-second dodge game rendered on a <canvas>, styled entirely in
// the site's blueprint/brass/cyan palette. Steer a paper plane with
// arrow keys or WASD, dodge the drifting "flak" circles, see how many
// you can clear before time's up. Triggered by typing "game" (handled
// in EasterEggs.jsx) — this component only exists in the DOM while
// active, so it costs nothing when idle.

import { useEffect, useRef, useState } from "react";

const GAME_DURATION_MS = 15000;
const CANVAS_W = 640;
const CANVAS_H = 360;
const PLANE_R = 10;
const MOVE_SPEED = 4.2;

export default function FlightSimEasterEgg({ onClose }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("playing"); // "playing" | "done"
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const keys = { up: false, down: false, left: false, right: false };
    const plane = { x: 70, y: CANVAS_H / 2 };
    let obstacles = [];
    let score = 0;
    let hitFlash = 0;
    let shake = 0;
    let lastSpawn = 0;
    let rafId;
    let done = false;
    const startTime = performance.now();

    function onKeyDown(e) {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "escape"].includes(k)) {
        e.preventDefault();
      }
      if (k === "escape") {
        finish();
        return;
      }
      if (k === "arrowup" || k === "w") keys.up = true;
      if (k === "arrowdown" || k === "s") keys.down = true;
      if (k === "arrowleft" || k === "a") keys.left = true;
      if (k === "arrowright" || k === "d") keys.right = true;
    }
    function onKeyUp(e) {
      const k = e.key.toLowerCase();
      if (k === "arrowup" || k === "w") keys.up = false;
      if (k === "arrowdown" || k === "s") keys.down = false;
      if (k === "arrowleft" || k === "a") keys.left = false;
      if (k === "arrowright" || k === "d") keys.right = false;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    function spawnObstacle() {
      const r = 12 + Math.random() * 12;
      obstacles.push({
        x: CANVAS_W + r,
        y: r + Math.random() * (CANVAS_H - r * 2),
        r,
        speed: 2.4 + Math.random() * 1.6,
        scored: false,
        hit: false,
      });
    }

    function finish() {
      if (done) return;
      done = true;
      setFinalScore(score);
      setPhase("done");
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      setTimeout(() => onClose(), 1800);
    }

    function drawPlane(x, y) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#ce9e52";
      ctx.strokeStyle = "#7fc8be";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(-10, -8);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-10, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    function loop(now) {
      const elapsed = now - startTime;
      if (elapsed >= GAME_DURATION_MS) {
        finish();
        return;
      }

      // movement
      if (keys.up) plane.y -= MOVE_SPEED;
      if (keys.down) plane.y += MOVE_SPEED;
      if (keys.left) plane.x -= MOVE_SPEED;
      if (keys.right) plane.x += MOVE_SPEED;
      plane.x = Math.max(PLANE_R + 4, Math.min(CANVAS_W * 0.6, plane.x));
      plane.y = Math.max(PLANE_R + 4, Math.min(CANVAS_H - PLANE_R - 4, plane.y));

      // spawn
      if (now - lastSpawn > 750) {
        spawnObstacle();
        lastSpawn = now;
      }

      // update obstacles
      obstacles.forEach((o) => {
        o.x -= o.speed;
        const dx = o.x - plane.x;
        const dy = o.y - plane.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (!o.hit && dist < o.r + PLANE_R - 4) {
          o.hit = true;
          hitFlash = 1;
          shake = 8;
        }
        if (!o.scored && o.x + o.r < plane.x) {
          o.scored = true;
          score += 1;
        }
      });
      obstacles = obstacles.filter((o) => o.x + o.r > -20);

      if (hitFlash > 0) hitFlash -= 0.04;
      if (shake > 0) shake *= 0.85;

      // draw
      ctx.save();
      const sx = (Math.random() - 0.5) * shake;
      const sy = (Math.random() - 0.5) * shake;
      ctx.translate(sx, sy);

      ctx.fillStyle = "#0c1a17";
      ctx.fillRect(-10, -10, CANVAS_W + 20, CANVAS_H + 20);

      // faint blueprint grid
      ctx.strokeStyle = "rgba(127,200,190,0.08)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < CANVAS_W; gx += 32) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, CANVAS_H);
        ctx.stroke();
      }
      for (let gy = 0; gy < CANVAS_H; gy += 32) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(CANVAS_W, gy);
        ctx.stroke();
      }

      obstacles.forEach((o) => {
        ctx.beginPath();
        ctx.fillStyle = o.hit ? "rgba(226,87,45,0.35)" : "rgba(127,200,190,0.16)";
        ctx.strokeStyle = o.hit ? "#e2572b" : "#7fc8be";
        ctx.lineWidth = 1.5;
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      drawPlane(plane.x, plane.y);

      if (hitFlash > 0) {
        ctx.fillStyle = `rgba(226,87,45,${hitFlash * 0.25})`;
        ctx.fillRect(-10, -10, CANVAS_W + 20, CANVAS_H + 20);
      }

      ctx.restore();

      // HUD (not shaken)
      ctx.fillStyle = "#f1ecdd";
      ctx.font = "12px 'IBM Plex Mono', monospace";
      ctx.fillText(`SCORE  ${score}`, 14, 22);
      const secondsLeft = Math.max(0, Math.ceil((GAME_DURATION_MS - elapsed) / 1000));
      ctx.fillText(`T-${secondsLeft}s`, CANVAS_W - 60, 22);

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="rounded border border-brass/40 shadow-[0_0_60px_-10px_rgba(206,158,82,0.35)] max-w-[92vw] h-auto"
        />
        {phase === "playing" && (
          <button
            onClick={onClose}
            aria-label="Close mini game"
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-hangardeep border border-brass/50 text-ink flex items-center justify-center font-mono text-sm hover:border-brass transition-colors"
          >
            ×
          </button>
        )}
        {phase === "playing" && (
          <p className="text-center font-mono text-[0.68rem] text-inkdim tracking-wider uppercase mt-3">
            Arrows / WASD to steer — dodge the flak — Esc to bail
          </p>
        )}
        {phase === "done" && (
          <p className="text-center font-display font-bold text-xl text-brass mt-4 uppercase tracking-wide">
            Mission complete — {finalScore} cleared
          </p>
        )}
      </div>
    </div>
  );
}
