// ContrailCursor.jsx
// A soft cyan trail follows the mouse, like a jet's contrail — only on
// pages where it adds atmosphere (home, about) and only on fine-pointer
// devices (mouse/trackpad), since it means nothing on touch.

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ACTIVE_PATHS = ["/", "/about"];
const POINT_LIFESPAN_MS = 550;
const MAX_POINTS = 40;

export default function ContrailCursor() {
  const { pathname } = useLocation();
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const rafRef = useRef(null);

  const isActivePage = ACTIVE_PATHS.includes(pathname);

  useEffect(() => {
    if (!isActivePage) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e) {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (pointsRef.current.length > MAX_POINTS) pointsRef.current.shift();
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    function draw() {
      const now = performance.now();
      pointsRef.current = pointsRef.current.filter((p) => now - p.t < POINT_LIFESPAN_MS);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = pointsRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const age = (now - p.t) / POINT_LIFESPAN_MS; // 0 -> fresh, 1 -> gone
        const alpha = (1 - age) * 0.5;
        const radius = 5 * (1 - age) + 1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(127, 200, 190, ${alpha})`;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      pointsRef.current = [];
    };
  }, [isActivePage]);

  if (!isActivePage) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    />
  );
}
