// Sponsors.jsx
// Reconstructed from the bundle's `w2` component.

import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";

const TIERS = [
  {
    name: "Title Sponsor",
    perks: [
      "Logo on all airframes",
      "Named flight-test day",
      "Top billing on every page",
      "Dedicated build feature",
    ],
  },
  {
    name: "Gold Sponsor",
    perks: ["Logo on drone division", "Feature in flight log", "Social media shoutouts"],
  },
  {
    name: "Silver Sponsor",
    perks: ["Logo on sponsors page", "Mention at events"],
  },
];

export default function Sponsors() {
  return (
    <>
      <SectionHeader
        eyebrow="Partners"
        title="Sponsors"
        description="Placeholder tiers and perks — replace with your club's real sponsorship packages and logos."
      />
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-7 grid md:grid-cols-3 gap-6">
          {TIERS.map((t) => (
            <div key={t.name} className="border border-ink/10 rounded p-8 bg-panel flex flex-col">
              <h3 className="font-display font-extrabold uppercase text-2xl mb-5">{t.name}</h3>
              <ul className="space-y-2.5 mb-8 flex-1">
                {t.perks.map((p) => (
                  <li key={p} className="text-inkdim text-sm flex gap-2">
                    <span className="text-brass">—</span> {p}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex justify-center items-center gap-2 font-mono text-[0.72rem] tracking-wider uppercase font-medium px-4 py-2.5 rounded-sm border border-ink/25 hover:border-brass hover:text-brass transition-colors"
              >
                Inquire
              </Link>
            </div>
          ))}
        </div>

        <div className="max-w-[1180px] mx-auto px-7 mt-16">
          <h4 className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mb-6">
            Current partners (placeholder logos)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-20 rounded border border-dashed border-ink/20 flex items-center justify-center font-mono text-xs text-inkdim"
              >
                Logo {n}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
