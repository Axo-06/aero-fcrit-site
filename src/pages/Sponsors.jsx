// Sponsors.jsx
// Reconstructed from the bundle's `w2` component.

import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";

const TIERS = [
  {
    name: "Technical Partner (₹25,000-₹50,000)",
    badge: "Most Impact",
    featured: true,
    icons: 3,
    perks: [
      "Logo placement on UAV platforms (drones and planes)",
      "Recognition as 'Official Components Partner' in all club communications",
      "Integration of sponsor components in competition UAVs (ADDC/DDC)",
      "Product showcase posts/reels featuring UAV builds",
      "Promotion during AeroFCRIT technical events",
      "Along with all  benefits of Outreach Partner",
    ],
  },
  {
    name: "Outreach Partner (₹15,000-₹30,000)",
    badge: null,
    featured: false,
    icons: 2,
    perks: [
      "On-campus seminar/workshop opportunity",
      "Pamphlet distribution and help desk during college events",
      "Logo on event banners",
      "1-2 dedicated social media posts",
      "Along with all benefits of Associate Partner",
    ],
  },
  {
    name: "Associate Partner (₹8,000-₹15,000)",
    badge: null,
    featured: false,
    icons: 1,
    perks: ["Logo on social media and teanm website", "Mentions in Instagram posts/stories","Acknowledgment in technical presentations and reports"],
  },
];

function TierIcons({ count }) {
  return (
    <div className="flex gap-1 mb-4" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i < count ? "text-brass" : "text-ink/15"}`}
          fill="currentColor"
        >
          <path d="M12 2 L13.5 9.5 L21 12 L13.5 13.2 L12 21 L10.5 13.2 L3 12 L10.5 9.5 Z" />
        </svg>
      ))}
    </div>
  );
}

const SPONSORSHIP_DECK_URL = "/sponsors/AERO-FCRIT-Sponsorship-Deck.pdf"; 

export default function Sponsors() {
  return (
    <>
      <SectionHeader
        eyebrow="Partners"
        title="Sponsors"
        description="We are always looking for new sponsors to support our initiatives and events.Please reach out to us if you are interested in sponsoring us or collaborating with us."
      />
      <section className="py-20">
        <div className="max-w-[1180px] mx-auto px-7 flex flex-wrap justify-center gap-4 mb-16">
          <Link
            to="/contact"
            className="inline-flex justify-center items-center gap-2 font-mono text-[0.72rem] tracking-wider uppercase font-medium px-6 py-3 rounded-sm bg-signal text-[#171006] hover:opacity-90 transition-opacity"
          >
            Become a Sponsor
          </Link>
          <a
            href={SPONSORSHIP_DECK_URL}
            download
            className="inline-flex justify-center items-center gap-2 font-mono text-[0.72rem] tracking-wider uppercase font-medium px-5 py-3 rounded-sm border border-brass text-brass hover:bg-brass hover:text-hangardeep transition-colors"
          >
            Download Sponsorship Deck (PDF)
          </a>
        </div>

        <div className="max-w-[1180px] mx-auto px-7 grid md:grid-cols-3 gap-6 items-start">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative rounded p-8 flex flex-col transition-transform duration-300 ${
                t.featured
                  ? "border-2 border-brass bg-panel shadow-[0_0_40px_-12px_rgba(206,158,82,0.45)] md:-translate-y-2"
                  : "border border-ink/10 bg-panel"
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-8 font-mono text-[0.65rem] tracking-wider uppercase font-bold bg-brass text-[#171006] px-3 py-1 rounded-sm">
                  {t.badge}
                </span>
              )}
              <TierIcons count={t.icons} />
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
                className={`inline-flex justify-center items-center gap-2 font-mono text-[0.72rem] tracking-wider uppercase font-medium px-4 py-2.5 rounded-sm transition-colors ${
                  t.featured
                    ? "bg-brass text-[#171006] hover:opacity-90"
                    : "border border-ink/25 hover:border-brass hover:text-brass"
                }`}
              >
                Inquire
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
