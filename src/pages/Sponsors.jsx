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

// Tiered sponsor logo wall — replace name/logo/url with each partner's real details.
// `logo` paths resolve from /public, so drop files in public/sponsors/ and point here.
const SPONSOR_LOGOS = {
  Title: [
    { name: "Titanium Aerostructures", logo: "/sponsors/placeholder-logo.svg", url: "https://example.com" },
  ],
  Gold: [
    { name: "Meridian Avionics", logo: "/sponsors/placeholder-logo.svg", url: "https://example.com" },
    { name: "Falcon Composites", logo: "/sponsors/placeholder-logo.svg", url: "https://example.com" },
  ],
  Silver: [
    { name: "Orbit Fasteners", logo: "/sponsors/placeholder-logo.svg", url: "https://example.com" },
    { name: "Harbor Machine Works", logo: "/sponsors/placeholder-logo.svg", url: "https://example.com" },
    { name: "Aegis Insurance", logo: "/sponsors/placeholder-logo.svg", url: "https://example.com" },
    { name: "Blueline Logistics", logo: "/sponsors/placeholder-logo.svg", url: "https://example.com" },
  ],
};

const SPONSORSHIP_DECK_URL = "/sponsors/AERO-FCRIT-Sponsorship-Deck.pdf";

export default function Sponsors() {
  return (
    <>
      <SectionHeader
        eyebrow="Partners"
        title="Sponsors"
        description="Placeholder tiers and perks — replace with your club's real sponsorship packages and logos."
      />
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-7 flex justify-center mb-16">
          <a
            href={SPONSORSHIP_DECK_URL}
            download
            className="inline-flex justify-center items-center gap-2 font-mono text-[0.72rem] tracking-wider uppercase font-medium px-5 py-3 rounded-sm bg-brass text-hangardeep hover:opacity-90 transition-opacity"
          >
            Download Sponsorship Deck (PDF)
          </a>
        </div>

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

        <div className="max-w-[1180px] mx-auto px-7 mt-16 space-y-12">
          {Object.entries(SPONSOR_LOGOS).map(([tier, sponsors]) => (
            <div key={tier}>
              <h4 className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mb-6">
                {tier} partners
              </h4>
              <div
                className={`grid grid-cols-2 gap-4 ${
                  tier === "Title" ? "md:grid-cols-1" : tier === "Gold" ? "md:grid-cols-2" : "md:grid-cols-4"
                }`}
              >
                {sponsors.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    title={s.name}
                    className="h-24 rounded border border-ink/15 bg-panel flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:border-brass transition-all"
                  >
                    <img
                      src={s.logo}
                      alt={`${s.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
