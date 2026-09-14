// Alumni.jsx
// Reconstructed from the bundle's `A2` component.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";

const ROSTER = [
  { initial: "A", name: "Name Surname", batch: "2022", role: "Placeholder — current role" },
  { initial: "B", name: "Name Surname", batch: "2022", role: "Placeholder — current role" },
  { initial: "C", name: "Name Surname", batch: "2023", role: "Placeholder — current role" },
  { initial: "D", name: "Name Surname", batch: "2023", role: "Placeholder — current role" },
  { initial: "E", name: "Name Surname", batch: "2024", role: "Placeholder — current role" },
  { initial: "F", name: "Name Surname", batch: "2024", role: "Placeholder — current role" },
];
//Test
const TESTIMONIALS = [
  {
    quote:
      "Placeholder testimonial — swap in a real quote from an alum about their time in the club.",
    name: "Name Surname, Batch 2022",
  },
  {
    quote: "Placeholder testimonial — this is where a second alum quote would go.",
    name: "Name Surname, Batch 2023",
  },
  {
    quote: "Placeholder testimonial — a third quote rotates in automatically every few seconds.",
    name: "Name Surname, Batch 2024",
  },
];

export default function Alumni() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <SectionHeader
        eyebrow="Where they are now"
        title="Alumni"
        description="Placeholder roster and quotes — replace with your real alumni network."
      />
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
          <div className="relative rounded border border-ink/10 bg-panel p-8 sm:p-12 text-center mb-16 overflow-hidden">
            <span className="font-display text-5xl text-brass/40 leading-none">“</span>
            <p className="font-display text-xl sm:text-2xl leading-snug max-w-2xl mx-auto -mt-4 mb-5">
              {TESTIMONIALS[active].quote}
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-wider text-linecyan">
              {TESTIMONIALS[active].name}
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-brass" : "w-4 bg-ink/15 hover:bg-ink/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {ROSTER.map((n) => (
              <div key={n.name + n.batch} className="rounded border border-ink/10 bg-hangardeep p-6">
                <div className="w-12 h-12 rounded-full border border-ink/25 flex items-center justify-center font-display font-bold text-brass mb-4">
                  {n.initial}
                </div>
                <h4 className="font-medium text-base mb-1">{n.name}</h4>
                <div className="font-mono text-[0.68rem] text-linecyan uppercase tracking-wide mb-2">
                  Batch {n.batch}
                </div>
                <p className="text-inkdim text-sm">{n.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-inkdim mb-5">Are you an alum? We would love to hear from you.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wider uppercase font-medium px-5 py-3 rounded-sm bg-signal text-[#171006] hover:bg-orange-400 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
