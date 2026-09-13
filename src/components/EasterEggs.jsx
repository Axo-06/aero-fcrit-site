// EasterEggs.jsx
// Three hidden flourishes, mounted once near the root:
//
// 1. Konami code (↑ ↑ ↓ ↓ ← → ← → b a) — a paper plane flies across
//    the screen along a curved path.
// 2. Typing "cleared" anywhere on the page — a brief "CLEARED FOR
//    TAKEOFF" banner with a burst of small paper planes, plus the
//    longer designed chime from useClickSound.js finally gets used.
// 3. Triple-clicking the navbar logo (dispatched as a CustomEvent from
//    Navbar.jsx) — a small acknowledgement toast + a click sound.
//
// All three are inert by default and only ever fire from a real user
// gesture, so none of this fights the browser's autoplay restrictions.

import { useEffect, useState } from "react";
import { playPropellerClick, playTakeoffChime } from "../hooks/useClickSound.js";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const TAKEOFF_PHRASE = "cleared";

function isTypingTarget(el) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

export default function EasterEggs() {
  const [planeFlyover, setPlaneFlyover] = useState(false);
  const [takeoffBanner, setTakeoffBanner] = useState(false);
  const [toast, setToast] = useState(null);

  // Konami code + typed phrase listener
  useEffect(() => {
    let konamiProgress = 0;
    let typedBuffer = "";
    let typedResetTimer;

    function onKeyDown(e) {
      if (isTypingTarget(document.activeElement)) return;

      // Konami progress (arrow keys are case-insensitive by nature; b/a are letters)
      const expected = KONAMI_SEQUENCE[konamiProgress];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        konamiProgress += 1;
        if (konamiProgress === KONAMI_SEQUENCE.length) {
          konamiProgress = 0;
          triggerPlaneFlyover();
        }
      } else {
        konamiProgress = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }

      // Typed phrase progress (letters only)
      if (/^[a-z]$/i.test(e.key)) {
        typedBuffer = (typedBuffer + e.key.toLowerCase()).slice(-TAKEOFF_PHRASE.length);
        clearTimeout(typedResetTimer);
        typedResetTimer = setTimeout(() => (typedBuffer = ""), 2000);
        if (typedBuffer === TAKEOFF_PHRASE) {
          typedBuffer = "";
          triggerTakeoffBanner();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(typedResetTimer);
    };
  }, []);

  // Logo triple-click listener (event dispatched from Navbar.jsx)
  useEffect(() => {
    function onLogoTriple() {
      playPropellerClick();
      setToast("Squadron Command acknowledges.");
      setTimeout(() => setToast(null), 2400);
    }
    window.addEventListener("aero:logo-triple-click", onLogoTriple);
    return () => window.removeEventListener("aero:logo-triple-click", onLogoTriple);
  }, []);

  function triggerPlaneFlyover() {
    console.log("%cKonami code accepted — bandit flight cleared for departure.", "color:#7fc8be;font-family:monospace;");
    setPlaneFlyover(true);
    setTimeout(() => setPlaneFlyover(false), 2600);
  }

  function triggerTakeoffBanner() {
    playTakeoffChime();
    setTakeoffBanner(true);
    setTimeout(() => setTakeoffBanner(false), 2800);
  }

  return (
    <>
      {planeFlyover && (
        <div className="fixed inset-0 z-[999] pointer-events-none overflow-hidden">
          <svg viewBox="0 0 100 100" className="konami-plane w-16 h-16 absolute" fill="none">
            <path
              d="M50 10 L58 40 L90 50 L58 58 L50 90 L42 58 L10 50 L42 40 Z"
              fill="var(--brass)"
              stroke="var(--linecyan)"
              strokeWidth="2"
            />
          </svg>
        </div>
      )}

      {takeoffBanner && (
        <div className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="takeoff-burst absolute inset-0" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                className={`takeoff-particle tp-${i} w-5 h-5 absolute`}
                fill="var(--linecyan)"
              >
                <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
              </svg>
            ))}
          </div>
          <div className="takeoff-banner-text font-display font-extrabold uppercase text-[clamp(1.8rem,5vw,3.2rem)] text-ink tracking-wide text-center px-6">
            Cleared for takeoff <span className="inline-block">🛫</span>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-24 right-5 sm:right-7 z-[999] font-mono text-xs uppercase tracking-wider bg-hangardeep border border-brass/40 text-ink px-4 py-3 rounded-sm shadow-lg animate-toast-in">
          {toast}
        </div>
      )}
    </>
  );
}
