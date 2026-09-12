// NotFound.jsx
// Catch-all 404 route. Matches the blueprint-grid / schematic voice
// used across the rest of the site instead of a generic error page.

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="relative min-h-[78vh] flex items-center overflow-hidden">
      <div className="blueprint-grid" />
      <div className="max-w-[640px] mx-auto px-5 sm:px-7 relative z-10 text-center py-24">
        <p className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-signal mb-4 flex items-center justify-center gap-2.5">
          <span className="w-6 h-px bg-signal inline-block" />
          Error 404
        </p>

        <h1 className="font-display font-extrabold uppercase leading-[0.94] text-[clamp(2.6rem,7vw,4.6rem)] mb-5">
          Mayday —
          <br />
          off radar
        </h1>

        <p className="text-inkdim text-[1.02rem] max-w-[440px] mx-auto mb-10">
          This page never filed a flight plan. Whatever you were looking for
          isn't at this coordinate.
        </p>

        <svg viewBox="0 0 400 110" className="mx-auto mb-10 w-full max-w-[420px] h-auto">
          <path
            d="M8 88 C 80 40, 160 96, 236 52"
            fill="none"
            stroke="var(--linecyan)"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.75"
          />
          <circle cx="8" cy="88" r="4" fill="var(--brass)" />
          <g transform="translate(224, 39) rotate(-20)">
            <path d="M0 4 L16 0 L16 8 L0 4 Z" fill="var(--brass)" />
          </g>
          <text
            x="248"
            y="46"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="10"
            letterSpacing="1"
            fill="var(--inkdim)"
          >
            SIGNAL LOST
          </text>
        </svg>

        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wider uppercase font-medium px-5 py-[11px] rounded-sm bg-signal text-[#171006] hover:bg-orange-400 transition-colors"
        >
          Return to base
        </Link>
      </div>
    </section>
  );
}
