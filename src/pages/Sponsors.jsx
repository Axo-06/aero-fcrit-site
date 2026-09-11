// Sponsors.jsx
// Reconstructed from the bundle's `w2` component.

import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";

const TIERS = [
  {
    name: "Technical Partner (₹25,000-₹50,000)",
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
    perks: ["Logo on social media and teanm website", "Mentions in Instagram posts/stories","Acknowledgment in technical presentations and reports"],
  },
];

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
      </section>
    </>
  );
}
