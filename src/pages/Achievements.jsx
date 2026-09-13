// Achievements.jsx
// Reconstructed from the bundle's `v2` component and its `l2` dataset —
// a real competitive record, not placeholder copy. The bundle's version
// leans on framer-motion for a plane-flying-away flourish on the active
// year and layout animations; this rebuild keeps the same data, filters,
// and expand/collapse behavior using plain CSS transitions instead,
// since framer-motion isn't a dependency of this project.

import { useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import CountUp from "../components/CountUp.jsx";

const RECORDS = [
  {
    year: "2026",
    entries: [
      {
        team: "Garuda",
        title: "AmiTech 2026 Project Competition",
        rank: "AIR 1 (1st Place)",
        prize: "₹20,000 INR",
        isMajorVictory: true,
        category: "Fixed-Wing Design",
        text: "Secured Rank 1 overall for custom fixed-wing aircraft platform design and flight testing.",
      },
      {
        team: "Thestral",
        title: "SAEISS Autonomous Drone Development Competition (ADDC)",
        rank: "AIR 5 Overall",
        subRanks: ["AIR 1 in Safe Design System"],
        prize: "₹5,000 INR",
        isMajorVictory: true,
        category: "Autonomous Multirotors",
        text: "Awarded Rank 1 in Safe Design System alongside a top-5 overall national finish in autonomous delivery challenges.",
      },
      {
        team: "Garuda",
        title: "SAEISS Drone Development Competition (DDC)",
        rank: "AIR 7 Overall",
        isMajorVictory: false,
        category: "Fixed Wings",
        text: "Achieved 7th All India Rank in overall national competition standings.",
      },
      {
        team: "Thestral",
        title: "Datta Meghe ElectroWiz Competition",
        rank: "1st Place",
        isMajorVictory: true,
        category: "Avionics & Signal Processing",
        text: "Won 1st Place for custom autonomous flight control hardware and signal processing.",
      },
    ],
  },
  {
    year: "2025",
    entries: [
      {
        team: "Thestral",
        title: "SAEISS Autonomous Drone Development Competition (ADDC)",
        rank: "AIR 1 Overall",
        subRanks: ["AIR 3 in Safe Design System"],
        prize: "₹50,000 INR",
        isMajorVictory: true,
        category: "Autonomous Multirotors",
        text: "National Champions — Claimed All India Rank 1 Overall along with the Safe Design System podium award.",
      },
      {
        team: "Garuda",
        title: "SAEISS Drone Development Competition (DDC)",
        rank: "AIR 5 Overall",
        subRanks: ["AIR 3 in Best CFD Analysis", "AIR 4 in Technical Presentation", "AIR 8 in Innovation"],
        isMajorVictory: false,
        category: "Fixed Wings",
        text: "Secured top rankings across Aerodynamic CFD Analysis, Technical Presentation, and Innovation.",
      },
    ],
  },
  {
    year: "2024",
    entries: [
      {
        team: "Garuda",
        title: "SAEISS Drone Development Competition (DDC)",
        rank: "AIR 9 Overall",
        subRanks: ["AIR 2 in Best CFD Analysis"],
        isMajorVictory: false,
        category: "Fixed Wings",
        text: "Secured All India Rank 2 in Aerodynamic CFD Analysis and AIR 9 in Overall Performance.",
      },
      {
        team: "Thestral",
        title: "SAEISS Autonomous Drone Development Competition (ADDC)",
        rank: "AIR 7 Overall",
        isMajorVictory: false,
        category: "Autonomous Multirotors",
        text: "Ranked 7th nationally in autonomous multirotor delivery and mission tests.",
      },
      {
        team: "Thestral",
        title: "IIT Roorkee Cognizance",
        rank: "AIR 3 Overall",
        isMajorVictory: false,
        category: "Aeromodelling",
        text: "Podium rank (3rd Place overall) at the IIT Roorkee national technical festival.",
      },
    ],
  },
  {
    year: "2023",
    entries: [
      {
        team: "Thestral",
        title: "SAEISS Autonomous Drone Development Competition (ADDC)",
        rank: "AIR 1 Overall",
        prize: "₹1,00,000 INR",
        isMajorVictory: true,
        category: "Autonomous Multirotors",
        text: "Inaugural Season Champions — Took All India Rank 1 Overall and Grand Prize during Team Thestral's debut season.",
      },
      {
        team: "Garuda",
        title: "SAEISS Drone Development Competition (DDC)",
        rank: "AIR 6 Overall",
        subRanks: ["AIR 3 in Technical Report Presentation"],
        isMajorVictory: false,
        category: "Fixed Wings",
        text: "Secured AIR 3 in Technical Report Presentation and AIR 6 in Best Overall Performance.",
      },
    ],
  },
  {
    year: "2022",
    entries: [
      {
        team: "Garuda",
        title: "SAEISS Drone Development Competition (DDC)",
        rank: "AIR 10 Overall",
        isMajorVictory: false,
        category: "Fixed Wings",
        text: "Broke into the national top 10 with All India Rank 10 in Overall Performance.",
      },
    ],
  },
  {
    year: "2021",
    entries: [
      {
        team: "Garuda",
        title: "SAEISS Drone Development Competition (DDC)",
        rank: "2nd Runner-Up",
        isMajorVictory: false,
        category: "Fixed Wings",
        text: "Awarded 2nd Runner-Up in the Technical Report Presentation round.",
      },
    ],
  },
  {
    year: "2020",
    entries: [
      {
        team: "Garuda",
        title: "SAEISS Drone Development Competition (DDC)",
        rank: "47th Overall",
        subRanks: ["5th in Technical Presentation", "16th in Design Report"],
        isMajorVictory: false,
        category: "Fixed Wings",
        text: "Club inaugural competition run — Built foundational performance data across presentation and design reports.",
      },
    ],
  },
];

const TEAM_FILTERS = [
  { id: "ALL", label: "Entire Team" },
  { id: "GARUDA", label: "Team Garuda" },
  { id: "THESTRAL", label: "Team Thestral" },
];

const currency = new Intl.NumberFormat("en-IN");

function parsePrize(str) {
  if (!str) return 0;
  const digits = str.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

function Stat({ label, end, format }) {
  return (
    <div className="p-6 sm:p-8 text-left">
      <div className="font-display font-bold text-3xl sm:text-4xl leading-none text-brass tabular-nums">
        <CountUp end={end} format={format} duration={1200} />
      </div>
      <div className="font-mono text-[0.68rem] sm:text-xs tracking-wider uppercase text-inkdim mt-2">
        {label}
      </div>
    </div>
  );
}

export default function Achievements() {
  const [openYear, setOpenYear] = useState("2026");
  const [team, setTeam] = useState("ALL");

  const filtered = useMemo(
    () =>
      RECORDS.map((y) => ({
        year: y.year,
        entries: y.entries.filter((e) => team === "ALL" || e.team.toUpperCase() === team),
      })).filter((y) => y.entries.length > 0),
    [team]
  );

  const stats = useMemo(() => {
    const all = filtered.flatMap((y) => y.entries);
    return {
      totalRecords: all.length,
      majorVictories: all.filter((e) => e.isMajorVictory).length,
      totalPrize: all.reduce((sum, e) => sum + parsePrize(e.prize), 0),
      yearsCompeting: filtered.length,
    };
  }, [filtered]);

  return (
    <>
      <SectionHeader
        eyebrow="Flight Record"
        title="Achievements"
        description="A competitive chronology of national ranks, titles, and engineering recognitions earned by Team Garuda (Fixed Wings) and Team Thestral (Multirotors)."
      />

      <section className="border-y border-ink/10 bg-hangardeep">
        <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10">
          <Stat key={`records-${team}`} label="Total Records" end={stats.totalRecords} />
          <Stat key={`majors-${team}`} label="Major Victories" end={stats.majorVictories} />
          <Stat
            key={`prize-${team}`}
            label="Prize Money Won"
            end={stats.totalPrize}
            format={(v) => `₹${currency.format(v)}`}
          />
          <Stat key={`years-${team}`} label="Years Competing" end={stats.yearsCompeting} />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 pb-6 mb-12 border-b border-ink/10">
            <span className="font-mono text-xs font-semibold text-inkdim tracking-widest uppercase hidden sm:inline">
              Filter squad
            </span>
            <div className="flex gap-2 font-mono text-xs flex-wrap justify-center">
              {TEAM_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTeam(f.id)}
                  className={`px-4 py-2 rounded-lg uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                    team === f.id
                      ? "bg-brass text-[#171006]"
                      : "text-inkdim hover:text-ink bg-panel border border-ink/10 hover:border-ink/20"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative space-y-8">
            <div className="flight-path-line absolute top-0 bottom-0 left-6 sm:left-8 w-px -translate-x-1/2 bg-brass/25" />

            {filtered.map((y) => {
              const isOpen = openYear === y.year;
              const majors = y.entries.filter((e) => e.isMajorVictory).length;
              return (
                <div key={y.year} className="relative flex items-start">
                  <div className="absolute left-6 sm:left-8 top-1.5 -translate-x-1/2 z-10 w-5 h-5 rounded-full border-2 border-brass bg-hangardeep flex items-center justify-center">
                    <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-brass" : "bg-brass/40"}`} />
                  </div>

                  <div className="w-full pl-16 sm:pl-20">
                    <button
                      onClick={() => setOpenYear((cur) => (cur === y.year ? null : y.year))}
                      className="w-full flex items-center justify-between gap-3 pb-3 text-left border-b border-ink/10 group/btn cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4 flex-wrap">
                        <h2 className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-brass group-hover/btn:text-brass/80 transition-colors">
                          {y.year}
                        </h2>
                        {!isOpen && (
                          <span className="font-mono text-xs text-inkdim hidden sm:inline-block">
                            {majors > 0 && (
                              <span className="text-brass font-semibold mr-2">
                                ★ {majors} Major {majors === 1 ? "Victory" : "Victories"}
                              </span>
                            )}
                            • {y.entries.length} {y.entries.length === 1 ? "Record" : "Records"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs text-inkdim group-hover/btn:text-ink transition-colors uppercase tracking-wider font-medium shrink-0">
                        <span>{isOpen ? "Close" : "Expand"}</span>
                        <span
                          className={`inline-block text-brass font-bold transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          ↓
                        </span>
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-8 pb-4 space-y-8">
                          {y.entries.map((d, i) => (
                            <div
                              key={i}
                              className={`space-y-2.5 p-4 rounded-md transition-colors ${
                                d.isMajorVictory
                                  ? "border-l-4 border-brass bg-brass/[0.05]"
                                  : "border-l-2 border-transparent hover:border-brass/30 hover:bg-ink/[0.03]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 flex-wrap font-mono text-xs">
                                <span className="text-brass font-bold tracking-wider uppercase flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brass/80" />
                                  Team {d.team}{" "}
                                  <span className="text-inkdim font-normal">/ {d.category}</span>
                                </span>
                                <span
                                  className={`font-mono text-xs font-bold tracking-wider px-2.5 py-0.5 rounded ${
                                    d.isMajorVictory
                                      ? "bg-brass text-[#171006] font-extrabold uppercase"
                                      : "bg-ink/10 text-ink"
                                  }`}
                                >
                                  {d.isMajorVictory && "★ "}
                                  {d.rank}
                                </span>
                              </div>
                              <h3 className="font-display font-bold text-xl sm:text-2xl text-ink leading-tight tracking-tight">
                                {d.title}
                              </h3>
                              {(d.subRanks || d.prize) && (
                                <div className="flex flex-wrap gap-2 pt-0.5">
                                  {d.prize && (
                                    <span className="font-mono text-[0.75rem] font-bold text-brass bg-brass/10 px-2.5 py-0.5 rounded border border-brass/25">
                                      Prize: {d.prize}
                                    </span>
                                  )}
                                  {d.subRanks?.map((s, si) => (
                                    <span
                                      key={si}
                                      className="font-mono text-[0.75rem] font-medium text-inkdim bg-ink/5 px-2 py-0.5 rounded border border-ink/10"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <p className="text-inkdim text-[0.98rem] leading-relaxed max-w-[680px]">
                                {d.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
