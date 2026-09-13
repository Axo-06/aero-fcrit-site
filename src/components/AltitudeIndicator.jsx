// AltitudeIndicator.jsx
// A vertical "altimeter tape" fixed on the right edge — reads high
// altitude at the top of the page, ticks down toward "GND" as you
// scroll toward the footer. Purely decorative flavor, not a real
// scrollbar replacement.

import { useEffect, useRef, useState } from "react";

const TAPE_HEIGHT = 168;
const MAX_ALT_FT = 9500;

export default function AltitudeIndicator() {
  const [percent, setPercent] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const p = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        setPercent(p);
        tickingRef.current = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const altitude = Math.round(MAX_ALT_FT * (1 - percent));
  const markerTop = percent * TAPE_HEIGHT;
  const isGround = percent > 0.985;

  return (
    <div
      className="hidden md:flex fixed right-3 top-1/2 -translate-y-1/2 z-30 flex-col items-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <span className="font-mono text-[0.6rem] text-inkdim mb-1.5 tracking-wider">ALT</span>
      <div
        className="relative w-[3px] rounded-full bg-ink/10 overflow-hidden"
        style={{ height: TAPE_HEIGHT }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-px bg-ink/20"
            style={{ top: `${(i / 8) * 100}%` }}
          />
        ))}
        <span
          className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brass shadow-[0_0_6px_1px_rgba(206,158,82,0.6)] transition-[top] duration-150 ease-out"
          style={{ top: markerTop - 4 }}
        />
      </div>
      <span className="font-mono text-[0.62rem] text-brass mt-1.5 tracking-wider tabular-nums">
        {isGround ? "GND" : `${altitude.toLocaleString()} FT`}
      </span>
    </div>
  );
}
