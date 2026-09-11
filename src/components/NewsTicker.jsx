// NewsTicker.jsx
// Reconstructed from the bundle: a dismissible ticker bar above the
// navbar. The bundle takes the headline list as a prop (its actual
// source — CMS/JSON/hardcoded array — wasn't recoverable from the
// minified code), so it's exposed as a prop here with a sample default.

import { Link } from "react-router-dom";

export default function NewsTicker({
  headlines = ["Aero FCRIT is heading to Technoxian 2026"],
  onDismiss,
}) {
  return (
    <div className="relative flex items-center bg-panel border-b border-ink/10 h-9 overflow-hidden">
      <span className="shrink-0 px-4 font-mono text-[0.66rem] uppercase tracking-wider bg-brass text-[#171006] font-semibold h-full flex items-center">
        News
      </span>

      <div className="relative flex-1 overflow-hidden flex items-center">
        <div className="ticker-track flex items-center gap-10 whitespace-nowrap font-mono text-[0.7rem] text-inkdim pr-10 pl-6">
          {headlines.map((headline, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>{headline}</span>
              <span className="text-brass">◆</span>
            </span>
          ))}
        </div>
      </div>

      <Link
        to="/news"
        className="hidden sm:flex items-center shrink-0 px-4 font-mono text-[0.66rem] uppercase tracking-wider text-brass hover:text-ink transition-colors"
      >
        All news →
      </Link>

      <button
        aria-label="Dismiss news bar"
        onClick={onDismiss}
        className="shrink-0 px-3 text-inkdim hover:text-ink transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
