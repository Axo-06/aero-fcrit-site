// useScrollExplode.js
// Reconstructed from the bundle's `im` hook: tracks how far a tall
// sticky section has been scrolled through and returns a 0–1 progress
// value used to "explode" a diagram's parts apart as the user scrolls.

import { useEffect, useRef, useState } from "react";

export default function useScrollExplode() {
  const scrollerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    function measure() {
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      let p = total > 0 ? scrolled / total : 0;
      p = Math.min(Math.max(p, 0), 1);
      if (reducedMotion) p = 0.85;
      setProgress(p);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return { scrollerRef, progress };
}
