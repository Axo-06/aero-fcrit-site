// HeroCarousel.jsx
// Reconstructed from the bundle's `k0` — the full-bleed background
// carousel behind the Hero headline. Auto-advances every 5s, supports
// arrow keys and swipe. This is the same 4 assets used in the earlier
// gallery reconstruction, reused here as the Hero backdrop.

import { useCallback, useEffect, useRef, useState } from "react";
import { galleryItems, AUTO_ADVANCE_MS } from "../galleryData";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0 });

  const go = useCallback((delta) => {
    setIndex((i) => (i + delta + galleryItems.length) % galleryItems.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / AUTO_ADVANCE_MS) * 100, 100));
    }, 50);
    const advance = setTimeout(() => {
      setIndex((i) => (i + 1) % galleryItems.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(advance);
    };
  }, [index]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onStart(e) {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    function onEnd(e) {
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    }
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [go]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden select-none">
      {galleryItems.map((item, i) => {
        const active = i === index;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <img
                src={item.src}
                alt={item.title}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            )}
            {/* Darkening overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-hangar via-hangar/60 to-hangar/20" />
          </div>
        );
      })}

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink/10 z-20">
        <div className="h-full bg-brass transition-[width] duration-75" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
