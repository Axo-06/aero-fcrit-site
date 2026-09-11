// Drones.jsx
// Reconstructed from the bundle's `R0` (page) + `b0` (exploded quadcopter
// diagram) components.

import SectionHeader from "../components/SectionHeader.jsx";
import useScrollExplode from "../hooks/useScrollExplode.js";

const transform = (x, y, rot, p) => `translate(${x * p}px, ${y * p}px) rotate(${rot * p}deg)`;

const PART_LABELS = [
  { x: 50, y: 18, text: "LIPO BATTERY PACK" },
  { x: 50, y: 80, text: "GIMBAL CAMERA" },
  { x: 12, y: 12, text: "MOTOR + PROP 01" },
  { x: 88, y: 12, text: "MOTOR + PROP 02" },
  { x: 12, y: 88, text: "MOTOR + PROP 03" },
  { x: 88, y: 88, text: "MOTOR + PROP 04" },
];

const SPECS = [
  { label: "Frame class", value: "450mm quadcopter" },
  { label: "Motors", value: "4x brushless, placeholder KV" },
  { label: "Flight controller", value: "Placeholder — e.g. Pixhawk / F4" },
  { label: "Payload", value: "2-axis gimbal camera" },
  { label: "Endurance", value: "Placeholder — fill with test data" },
  { label: "Status", value: "In development" },
];

function ExplodedDrone() {
  const { scrollerRef, progress: p } = useScrollExplode();
  const labelsVisible = p > 0.4;

  return (
    <div ref={scrollerRef} className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden bg-panel blueprint-grid-fine">
        <div className="relative w-[86vw] sm:w-[70vw] md:w-[64vw] max-w-[660px] aspect-square">
          <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible">
            <g className="part" style={{ transform: transform(0, 0, 0, p) }}>
              <rect x="255" y="255" width="90" height="90" rx="16" />
            </g>
            <g className="part accent" style={{ transform: transform(0, -95, 0, p) }}>
              <rect x="252" y="205" width="96" height="34" rx="6" />
            </g>
            <g className="part accent" style={{ transform: transform(0, 95, 0, p) }}>
              <circle cx="300" cy="382" r="26" />
              <rect x="288" y="405" width="24" height="16" rx="3" />
            </g>
            <g className="part" style={{ transform: transform(-95, -95, -8, p) }}>
              <line x1="300" y1="300" x2="150" y2="150" />
              <circle cx="150" cy="150" r="24" />
              <ellipse cx="150" cy="150" rx="46" ry="7" />
            </g>
            <g className="part" style={{ transform: transform(95, -95, 8, p) }}>
              <line x1="300" y1="300" x2="450" y2="150" />
              <circle cx="450" cy="150" r="24" />
              <ellipse cx="450" cy="150" rx="46" ry="7" />
            </g>
            <g className="part" style={{ transform: transform(-95, 95, 8, p) }}>
              <line x1="300" y1="300" x2="150" y2="450" />
              <circle cx="150" cy="450" r="24" />
              <ellipse cx="150" cy="450" rx="46" ry="7" />
            </g>
            <g className="part" style={{ transform: transform(95, 95, -8, p) }}>
              <line x1="300" y1="300" x2="450" y2="450" />
              <circle cx="450" cy="450" r="24" />
              <ellipse cx="450" cy="450" rx="46" ry="7" />
            </g>
          </svg>

          <div className="part-label opacity-90" style={{ left: "50%", top: "50%" }}>
            FLIGHT CONTROLLER
          </div>
          {PART_LABELS.map((l) => (
            <div
              key={l.text}
              className="part-label"
              style={{ left: `${l.x}%`, top: `${l.y}%`, opacity: labelsVisible ? 1 : 0 }}
            >
              {l.text}
            </div>
          ))}

          <div className="absolute left-6 bottom-6 font-mono text-[0.72rem] text-inkdim tracking-wide">
            EXPLODE <b className="text-brass">{Math.round(p * 100)}%</b> — MODEL: QUADCOPTER MK.EX
            (PLACEHOLDER)
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Drones() {
  return (
    <>
      <SectionHeader
        eyebrow="Division 01 — Unmanned Systems"
        title="Drones"
        description="Quadcopter platforms built for aerial survey and payload delivery. Scroll to break the airframe below into its working parts."
      />
      <ExplodedDrone />
      <p className="max-w-[640px] mx-auto px-5 sm:px-7 mt-6 font-mono text-[0.78rem] text-inkdim">
        <span className="text-signal">⚠ </span>
        Exemplar schematic — this is a placeholder line-diagram. Swap in your team's own CAD render
        or photograph when ready.
      </p>
      <section className="py-24">
        <div className="max-w-[780px] mx-auto px-5 sm:px-7">
          <h2 className="font-display font-extrabold uppercase text-3xl mb-8">Spec sheet</h2>
          <div className="border-t border-ink/10">
            {SPECS.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-5 py-4 border-b border-ink/10"
              >
                <div className="font-mono text-[0.78rem] text-brass uppercase tracking-wide">
                  {s.label}
                </div>
                <div className="text-inkdim">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
