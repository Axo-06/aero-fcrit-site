// Hero.jsx
// Reconstructed from the bundle's `C0` component: full-bleed carousel
// backdrop (HeroCarousel), headline + CTAs that fade after a moment of
// no interaction, a 4-stat bar, and division cards (Drones / Aircraft —
// the bundle likely has more cards below this point that weren't
// captured; add further divisions the same way if you have them).

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel.jsx";
import { LiquidButton } from "./ui/liquid-glass-button.jsx";

const STATS = [
  { num: "40+", label: "Active members" },
  { num: "12", label: "Airframes flown" },
  { num: "06", label: "Competitions entered" },
  { num: "03", label: "Years operating" },
];

const IDLE_MS = 1500;

export default function Hero() {
  const [visible, setVisible] = useState(true);
  const timer = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return;
    schedule();
    return () => clearTimeout(timer.current);
  }, []);

  function schedule() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), IDLE_MS);
  }

  function wake() {
    if (reducedMotion.current) return;
    setVisible(true);
    schedule();
  }

  return (
    <>
      <section
        onMouseMove={wake}
        onTouchStart={wake}
        className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_75%_20%,rgba(206,158,82,0.10),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(127,200,190,0.09),transparent_50%)]"
      >
        <HeroCarousel />
        <div className="blueprint-grid z-[1] pointer-events-none" />

        <div
          className={`max-w-[1180px] mx-auto px-5 sm:px-7 relative z-10 w-full py-28 md:py-0 transition-opacity duration-[1200ms] ease-out ${
            visible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-[640px]">
            <p className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-linecyan mb-4.5 flex items-center gap-2.5">
              <span className="w-6 h-px bg-linecyan inline-block" />
              Aeromodelling & UAV Design Club
            </p>

            <h1 className="font-display font-extrabold uppercase leading-[0.94] text-[clamp(3rem,7.2vw,5.6rem)] mb-5">
              We design
              <br />
              what <em className="not-italic text-brass">flies.</em>
            </h1>

            <p className="text-inkdim text-[1.08rem] max-w-[520px] mb-8">
              Aero FCRIT builds fixed-wing aircraft and unmanned systems from first
              principles — airframes, propulsion, and flight control, engineered by
              students and flown by students.
            </p>

            <div className="flex gap-3.5 flex-wrap">
              <LiquidButton asChild variant="filled">
                <Link to="/drones">See the builds</Link>
              </LiquidButton>
              <LiquidButton asChild variant="outline">
                <Link to="/sponsors">Sponsor the club</Link>
              </LiquidButton>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-8 left-7 hidden sm:flex items-center gap-2.5 transition-opacity duration-[1200ms] ease-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-px h-9 bg-gradient-to-b from-brass to-transparent" />
          Scroll to explore
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-ink/10 bg-hangardeep">
        <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`p-8 text-left ${i !== 0 ? "border-l border-ink/10" : ""} ${
                i === 2 ? "md:border-l border-l-0" : ""
              }`}
            >
              <div className="font-display font-bold text-[2.6rem] leading-none text-brass">{s.num}</div>
              <div className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Division cards */}
      <section className="py-28">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-7 grid md:grid-cols-2 gap-6">
          <Link
            to="/drones"
            className="group relative rounded border border-ink/10 bg-panel p-10 overflow-hidden hover:border-brass/50 transition-colors"
          >
            <span className="font-mono text-[0.72rem] tracking-wider uppercase text-signal">Division 01</span>
            <h3 className="font-display font-extrabold uppercase text-3xl mt-3 mb-3">Drones</h3>
            <p className="text-inkdim max-w-[380px]">
              Quadcopter platforms for aerial survey and payload delivery. Scroll
              through an exploded build diagram on the dedicated page.
            </p>
            <span className="inline-block mt-6 font-mono text-[0.72rem] uppercase tracking-wider text-brass group-hover:translate-x-1 transition-transform">
              Explore division →
            </span>
          </Link>

          <Link
            to="/aircraft"
            className="group relative rounded border border-ink/10 bg-panel p-10 overflow-hidden hover:border-brass/50 transition-colors"
          >
            <span className="font-mono text-[0.72rem] tracking-wider uppercase text-signal">Division 02</span>
            <h3 className="font-display font-extrabold uppercase text-3xl mt-3 mb-3">Aircraft</h3>
            <p className="text-inkdim max-w-[380px]">
              Fixed-wing airframes tuned for endurance and payload — the club's
              original discipline since 2019.
            </p>
            <span className="inline-block mt-6 font-mono text-[0.72rem] uppercase tracking-wider text-brass group-hover:translate-x-1 transition-transform">
              Explore division →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
