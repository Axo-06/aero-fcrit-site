// About.jsx
// Reconstructed from the bundle's `N0` component. This page had real
// (non-placeholder) copy baked into the original build.

import SectionHeader from "../components/SectionHeader.jsx";

const PRINCIPLES = [
  {
    title: "Build first",
    text: "We learn aerodynamics and controls by building airframes, not just simulating them.",
  },
  {
    title: "Student run",
    text: "Every design, test flight, and repair is planned and executed by club members.",
  },
  {
    title: "Open knowledge",
    text: "Build logs, failures, and fixes are documented so the next batch starts ahead.",
  },
];

const RECORDS = [
  { year: "2023", team: "Thestral", comp: "ADDC (SAE India)", rank: "AIR 1 — Overall Performance" },
  {
    year: "2024",
    team: "Garuda",
    comp: "DDC (SAE India)",
    rank: "AIR 2 — Best CFD Analysis | AIR 9 Overall",
  },
  { year: "2024", team: "Thestral", comp: "ADDC (SAE India)", rank: "AIR 7 — Overall Performance" },
  { year: "2024", team: "Thestral", comp: "IIT Roorkee Cognizance", rank: "AIR 3" },
  {
    year: "2025",
    team: "Garuda",
    comp: "DDC (SAE India)",
    rank: "AIR 3 — Best Aerodynamic Analysis (CFD) | AIR 4 Presentation | AIR 5 Overall",
  },
  {
    year: "2025",
    team: "Thestral",
    comp: "ADDC (SAE India)",
    rank: "AIR 1 — Overall Performance | Safe Design Award",
  },
  { year: "2026", team: "Garuda", comp: "DDC (SAE India)", rank: "AIR 7 — Overall Performance" },
  { year: "2026", team: "Thestral", comp: "ADDC (SAE India)", rank: "AIR 5 — Overall Performance" },
];

export default function About() {
  return (
    <>
      <SectionHeader
        eyebrow="About the club"
        title="Mission & History"
        description="Aero FCRIT is the aeromodelling and UAV design club at FCRIT. Operating across two specialized divisions—Team Garuda and Team Thestral—our squad brings together engineering students to design, fabricate, analyze, and flight-test custom drones and aircraft."
      />

      <section className="py-16 md:py-20">
        <div className="max-w-[840px] mx-auto px-6 md:px-7 space-y-10 text-inkdim text-[1.02rem] leading-relaxed">
          <div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide text-ink mb-4">
              Who We Are
            </h2>
            <p>
              Aero FCRIT is the premier aeromodelling and UAV design club at Fr. Conceicao
              Rodrigues Institute of Technology (FCRIT). Operating as an official student chapter
              under <strong className="text-ink">SAE India</strong>, we bring together passionate
              engineering students to design, fabricate, and fly everything from fixed-wing
              aircraft to custom multirotor drones. Our engineering process spans aerodynamic
              configuration, stability analysis, flight control tuning, and hands-on UAV
              prototyping.
            </p>
          </div>

          <hr className="border-ink/10" />

          <div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide text-ink mb-4">
              Our History & Milestones
            </h2>
            <p className="mb-4">
              Founded to bridge the gap between classroom theory and real-world aerospace
              engineering, Aero FCRIT has grown into a high-performance research and competition
              squad.
            </p>
            <ul className="list-disc list-inside space-y-2.5 marker:text-brass">
              <li>
                <strong className="text-ink">2019 — Establishment:</strong> Aero FCRIT was
                officially established under the SAE India Student Chapter.
              </li>
              <li>
                <strong className="text-ink">2019 — Team Garuda Formed:</strong> Launched as our
                dedicated division for Fixed-Wing UAV development.
              </li>
              <li>
                <strong className="text-ink">2022 — Team Thestral Formed:</strong> Expanded
                operations with a specialized division focused on Multirotor UAV development.
              </li>
            </ul>
          </div>

          <hr className="border-ink/10" />

          <div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide text-ink mb-4">
              Mission & Core Objectives
            </h2>
            <p className="mb-4">
              Our mission is to foster multidisciplinary engineering excellence by applying
              technical discipline to advanced aerial vehicles. Across every project cycle, we aim
              to:
            </p>
            <ol className="list-decimal list-inside space-y-2.5 marker:text-brass font-mono text-sm">
              <li className="text-inkdim">
                <strong className="text-ink font-sans text-[1.02rem]">
                  Design, Develop, & Fabricate:
                </strong>{" "}
                Construct reliable unmanned aerial vehicles (UAVs) and fixed-wing platforms.
              </li>
              <li className="text-inkdim">
                <strong className="text-ink font-sans text-[1.02rem]">
                  Apply Rigorous Engineering:
                </strong>{" "}
                Utilize advanced CAD, CFD, avionics, flight control programming, and flight
                testing procedures.
              </li>
              <li className="text-inkdim">
                <strong className="text-ink font-sans text-[1.02rem]">Compete Nationally:</strong>{" "}
                Represent our institution at top aerospace design competitions to achieve
                technical excellence.
              </li>
              <li className="text-inkdim">
                <strong className="text-ink font-sans text-[1.02rem]">
                  Build Industry-Ready Leaders:
                </strong>{" "}
                Develop leadership, project management, communication, and ethical engineering
                practices.
              </li>
            </ol>
          </div>

          <hr className="border-ink/10" />

          <div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide text-ink mb-6">
              Specialized Fleets
            </h2>
            <div className="space-y-6">
              <div className="p-6 rounded border border-ink/10 bg-hangardeep/40">
                <h3 className="text-lg font-display font-bold text-brass uppercase mb-2">
                  Team Garuda (Fixed-Wing Division)
                </h3>
                <p className="text-sm text-inkdim">
                  Specializes in large-format fixed-wing aircraft design, focusing on aerodynamic
                  lift optimization, structural integrity, payload capacity, and high-speed flight
                  stability.
                </p>
              </div>
              <div className="p-6 rounded border border-ink/10 bg-hangardeep/40">
                <h3 className="text-lg font-display font-bold text-brass uppercase mb-2">
                  Team Thestral (Multirotor Division)
                </h3>
                <p className="text-sm text-inkdim">
                  Focuses on autonomous multirotor systems, precision hover control, complex
                  flight controller tuning, custom frame design, and mission-specific payload
                  deployment.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-ink/10" />

          <div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide text-ink mb-4">
              Track Record of Excellence
            </h2>
            <p className="mb-6">
              Through rigorous engineering, Aero FCRIT consistently competes at premier national
              events, securing top positions year after year:
            </p>
            <div className="overflow-x-auto rounded border border-ink/10">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-hangardeep uppercase tracking-wider text-ink border-b border-ink/10">
                  <tr>
                    <th className="py-3 px-4">Year</th>
                    <th className="py-3 px-4">Team</th>
                    <th className="py-3 px-4">Competition</th>
                    <th className="py-3 px-4">Achievement / Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 bg-hangardeep/20">
                  {RECORDS.map((r, i) => (
                    <tr key={i} className="hover:bg-panel/50 transition-colors">
                      <td className="py-3 px-4 text-brass font-bold">{r.year}</td>
                      <td className="py-3 px-4 text-ink font-sans font-medium">{r.team}</td>
                      <td className="py-3 px-4 text-inkdim">{r.comp}</td>
                      <td className="py-3 px-4 text-ink font-sans">{r.rank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <hr className="border-ink/10" />

          <div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide text-ink mb-4">
              Faculty Guidance
            </h2>
            <p className="mb-4">
              Our technical progress and operational standards are guided under the continuous
              mentorship of our faculty advisors:
            </p>
            <ul className="list-disc list-inside space-y-2 marker:text-brass">
              <li>
                <strong className="text-ink">Prof. Afzal Ansari</strong> — Faculty Advisor
                (Mechanical Engineering)
              </li>
              <li>
                <strong className="text-ink">Dr. Shushil Thale</strong> — Faculty Advisor
                (Electrical Engineering)
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-panel border-y border-ink/10">
        <div className="max-w-[1180px] mx-auto px-6 md:px-7 grid md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="border border-ink/10 rounded p-8 bg-hangardeep">
              <h3 className="font-display font-bold uppercase text-xl mb-3 text-ink">{p.title}</h3>
              <p className="text-inkdim text-sm">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
