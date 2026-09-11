// GalleryCarousel.jsx
// Reconstructed from the bundle's carousel component: auto-advances every
// 5s, supports ArrowLeft/ArrowRight keyboard nav, and swipe on touch.
// Renders one of the four per-asset components based on the active item.

import { useCallback, useEffect, useRef, useState } from "react";
import { galleryItems, AUTO_ADVANCE_MS } from "../galleryData";
import HangarImage from "./HangarImage";
import FirstFlightVideo from "./FirstFlightVideo";
import CompetitionImage from "./CompetitionImage";
import CrewImage from "./CrewImage";

const SLIDES_BY_ID = {
  1: HangarImage,
  2: FirstFlightVideo,
  3: CompetitionImage,
  4: CrewImage,
};

export default function GalleryCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const touchStart = useRef({ x: 0, y: 0 });

  const go = useCallback((delta) => {
    setIndex((i) => (i + delta + galleryItems.length) % galleryItems.length);
    setProgress(0);
  }, []);

  // Auto-advance + progress bar
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

  // Keyboard nav
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const active = galleryItems[index];
  const ActiveSlide = SLIDES_BY_ID[active.id];

  return (
    <div
      className="relative"
      onTouchStart={(e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      <ActiveSlide />

      <div className="flex items-center justify-between mt-3">
        <button aria-label="Previous" onClick={() => go(-1)}>‹</button>
        <div className="flex-1 mx-3 h-1 bg-black/10 rounded overflow-hidden">
          <div className="h-full bg-current" style={{ width: `${progress}%` }} />
        </div>
        <button aria-label="Next" onClick={() => go(1)}>›</button>
      </div>
    </div>
  );
}
