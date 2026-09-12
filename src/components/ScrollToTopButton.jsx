// ScrollToTopButton.jsx
// Fixed-position scroll-to-top control, styled as a propeller instead
// of a generic spinner. The blades sit still until hovered/focused —
// motion answers the person's action, it doesn't run continuously.

import { useEffect, useState } from "react";
import { playPropellerClick } from "../hooks/useClickSound.js";

const SHOW_AFTER_PX = 480;

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    playPropellerClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      aria-label="Scroll to top"
      onClick={handleClick}
      className={`group fixed bottom-6 right-5 sm:right-7 z-40 w-12 h-12 rounded-full border border-brass/40 bg-hangardeep/90 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-300 hover:border-brass ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg viewBox="0 0 48 48" className="propeller-spin w-7 h-7" fill="none">
        <g stroke="var(--linecyan)" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M24 24 C 20 14, 14 10, 8 11 C 10 17, 16 22, 24 24 Z" fill="rgba(127,200,190,0.22)" />
          <path d="M24 24 C 34 20, 40 14, 39 8 C 33 10, 27 16, 24 24 Z" fill="rgba(127,200,190,0.22)" />
          <path d="M24 24 C 28 34, 34 38, 40 37 C 38 31, 32 26, 24 24 Z" fill="rgba(127,200,190,0.22)" />
          <path d="M24 24 C 14 28, 8 34, 9 40 C 15 38, 21 32, 24 24 Z" fill="rgba(127,200,190,0.22)" />
        </g>
        <circle cx="24" cy="24" r="2.6" fill="var(--brass)" />
      </svg>
    </button>
  );
}
