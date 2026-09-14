// Team.jsx
// Reconstructed from the bundle's `C2` component and its `bf` roster
// dataset — real member names/roles, not placeholder copy. Card grid
// and filter-tab transitions now run on `motion` (the framer-motion
// successor, already a project dependency) for the sliding active-tab
// pill and animated card mount/filter/exit, matching the hangar theme.

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "../components/SectionHeader.jsx";

const ROSTER = [
  { name: "Yuvraj Nalavde", role: "Garuda Captain", division: "Leadership", team: "Team Garuda" },
  { name: "Vedang Vaishampayan", role: "Garuda Vice Captain", division: "Leadership", team: "Team Garuda" },
  { name: "Vinay Desai", role: "Thestral Captain", division: "Leadership", team: "Team Thestral" },
  { name: "Aditya Salgaonkar", role: "Thestral Vice Captain", division: "Leadership", team: "Team Thestral" },
  { name: "Yash Patil", role: "Sponsorship Head", division: "Propulsion", team: "Team Garuda" },
  { name: "Shreyas Chavan", role: "Propulsion Head · PR Head", division: "Propulsion", team: "Team Thestral" },
  { name: "Rucha Manorkar", role: "Documentation Head", division: "Propulsion", team: "Team Garuda" },
  { name: "Kunal Chaudhari", role: "Avionics Head", division: "Avionics", team: "Team Thestral" },
  { name: "Siddhee Mhatre", role: "Design Head", division: "Design", team: "Team Thestral" },
  { name: "Atharva Thakur", role: "Fabrication Head", division: "Fabrication", team: "Team Garuda" },
  { name: "Sahil Patil", role: "Structural Head", division: "Structural", team: "Team Garuda" },
  { name: "Sanskar Jagdish Gharal", role: "Member", division: "Avionics", team: "Team Thestral" },
  { name: "Amay Shetty", role: "Member", division: "Avionics", team: "Team Thestral" },
  { name: "Devesh Pathak", role: "Member", division: "Design", team: "Team Thestral" },
  {name: "Dhanraj Devadiga", role: "Member", division: "Propulsion", team: "Team Thestral" },
  { name: "Mithila Mane", role: "Member", division: "Avionics", team: "Team Thestral" },
  { name: "Kaustubh Prabhu", role: "Member", division: "Structural", team: "Team Garuda" },
  { name: "Varad Kurhekar", role: "Member", division: "Structural", team: "Team Garuda" },
  { name: "Naman Sharma", role: "Member", division: "Fabrication", team: "Team Garuda" },
  { name: "Vedant Harjai", role: "Member", division: "Fabrication", team: "Team Garuda" },
  { name: "Samuel Moses Christian", role: "Member", division: "Propulsion", team: "Team Thestral" },
  { name: "Chinmayee Ambrale", role: "Member", division: "Design", team: "Team Thestral" },
  { name: "Ved Yadav", role: "Member", division: "Design", team: "Team Thestral" },
  { name: "Dhruv Pancholi", role: "Member", division: "Design", team: "Team Thestral" },
  { name: "Shreya Pillai", role: "Member", division: "Propulsion", team: "Team Garuda" },
  { name: "Sashank Upadhyay", role: "Member", division: "Fabrication", team: "Team Garuda" },
  { name: "Aditya Roman", role: "Member", division: "Propulsion", team: "Team Thestral" },
  { name: "Mahi Dhok", role: "Member", division: "Avionics", team: "Team Thestral" },
  {name: "Dhruv Shetty", role: "Member", division: "Design", team: "Team Thestral" },
  {name: "Shubhra Deshpande", role: "Member", division: "Propulsion", team: "Team Thestral" },
  { name: "Samiksha Chakane", role: "Member", division: "Structural", team: "Team Garuda" },
  {name:"Joal Jestin ",role:"Member",division:"Avionics",team:"Team Thestral"},
  {name:"Nikita Dhanaji Dhulugade ",role:"Member",division:"Propulsion",team:"Team Thestral"},
  {name:"Saksham Vijay Kharat ",role:"Member",division:"Design",team:"Team Thestral"},
  { name:"Tanishka Murari", role: "Member", division: "Propulsion", team: "Team Thestral" },
  {name:"Aditi Sonar",role:"Member",division:"Design",team:"Team Thestral"},
  {name:"Ananya Bavdekar",role:"Member",division:"Propulsion",team:"Team Garuda"},
];

const MAIN_TABS = [
  { id: "ALL", label: "Entire Team" },
  { id: "GARUDA", label: "Team Garuda" },
  { id: "THESTRAL", label: "Team Thestral" },
];

const TEAM_ID_TO_NAME = {
  GARUDA: "Team Garuda",
  THESTRAL: "Team Thestral",
};

// Derive each team's available divisions straight from the roster, so the
// filter tabs never drift out of sync with the actual data.
function getDivisionsForTeam(teamId) {
  const teamName = TEAM_ID_TO_NAME[teamId]; 
  const divisions = new Set(
    ROSTER.filter((m) => m.team === teamName && m.division !== "Leadership").map((m) => m.division)
  );
  return ["ALL", ...Array.from(divisions).sort()];
}

const TEAM_DIVISIONS = {
  GARUDA: getDivisionsForTeam("GARUDA"),
  THESTRAL: getDivisionsForTeam("THESTRAL"),
};

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function Avatar({ member, className = "" }) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-panel via-hangar to-panel flex flex-col items-center justify-center p-4 text-center ${className}`}
    >
      <span className="font-display text-4xl font-extrabold text-brass">{initials(member.name)}</span>
      <span className="font-mono text-[0.6rem] text-inkdim mt-2 tracking-wide">Photo coming soon</span>
    </div>
  );
}

export default function Team() {
  const [mainTab, setMainTab] = useState("ALL");
  const [division, setDivision] = useState("ALL");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  function selectTab(id) {
    setMainTab(id);
    setDivision("ALL");
  }

  const filtered = useMemo(() => {
    let list = ROSTER.filter((m) => {
      if (mainTab !== "ALL") {
        const teamName = TEAM_ID_TO_NAME[mainTab];
        if (m.team !== teamName) return false;
        if (division !== "ALL" && m.division !== division) return false;
      }
      return true;
    });
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((m) =>
        [m.name, m.role, m.division, m.team].some((v) => v.toLowerCase().includes(q))
      );
    }
    return list;
  }, [mainTab, division, search]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SectionHeader
        eyebrow="AeroFCRIT Roster"
        title="Meet the Engineers"
        description="The researchers, designers, pilots, and fabricators powering Team Garuda and Team Thestral."
      />

      <section className="py-16 md:py-24 bg-hangardeep/40">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 mb-10 border-b border-ink/10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-ink">Active Personnel</h2>
              <p className="text-sm text-inkdim mt-1">
                Fr. Conceicao Rodrigues Institute of Technology, Vashi
              </p>
            </div>
            <div className="flex gap-4 sm:gap-8 font-mono text-xs">
              <div className="bg-panel px-4 py-3 rounded-lg border border-ink/10">
                <span className="block text-inkdim uppercase font-medium">Total Engineers</span>
                <span className="text-xl font-bold text-brass">{ROSTER.length} Active</span>
              </div>
              <div className="bg-panel px-4 py-3 rounded-lg border border-ink/10">
                <span className="block text-inkdim uppercase font-medium">Divisions</span>
                <span className="text-xl font-bold text-ink">Fixed-Wing & Drone</span>
              </div>
            </div>
          </div>

          <div className="relative max-w-md mx-auto mb-8">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-inkdim pointer-events-none"
            >
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <line x1="14" y1="14" x2="18" y2="18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, or division…"
              className="w-full bg-panel border border-ink/10 focus:border-brass/50 rounded-full pl-11 pr-10 py-3 text-sm placeholder:text-inkdim outline-none transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-ink/5 hover:bg-ink/10 text-inkdim hover:text-ink flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            {MAIN_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => selectTab(t.id)}
                className={`relative px-5 sm:px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  mainTab === t.id ? "text-[#171006]" : "text-inkdim hover:text-ink bg-panel border border-ink/10 hover:border-ink/20"
                }`}
              >
                {mainTab === t.id && (
                  <motion.span
                    layoutId="team-tab-pill"
                    className="absolute inset-0 rounded-xl bg-brass -z-0"
                    transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.6 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>

          {mainTab !== "ALL" && (
            <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12">
              <span className="font-mono text-[0.7rem] text-inkdim uppercase font-bold mr-2 shrink-0">
                {mainTab} sub-teams:
              </span>
              {TEAM_DIVISIONS[mainTab].map((d) => (
                <button
                  key={d}
                  onClick={() => setDivision(d)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    division === d
                      ? "bg-linecyan/15 text-linecyan border border-linecyan/40"
                      : "bg-ink/5 hover:bg-ink/10 text-inkdim hover:text-ink border border-transparent"
                  }`}
                >
                  {d === "ALL" ? "All divisions" : d}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-20"
            >
              <p className="text-inkdim">No one matches “{search}” in this division.</p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 font-mono text-xs uppercase tracking-wider text-brass hover:text-ink transition-colors duration-200"
              >
                Clear search
              </button>
            </motion.div>
          ) : (
            <motion.div layout transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              <AnimatePresence>
                {filtered.map((m, i) => (
                  <motion.button
                    layout
                    key={m.name}
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18, ease: "easeIn" } }}
                    transition={{
                      opacity: { duration: 0.35, delay: Math.min(i, 12) * 0.03, ease: [0.16, 1, 0.3, 1] },
                      y: { duration: 0.4, delay: Math.min(i, 12) * 0.03, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.4, delay: Math.min(i, 12) * 0.03, ease: [0.16, 1, 0.3, 1] },
                      layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    }}
                    whileHover={{ y: -6 }}
                    onClick={() => setActive(m)}
                    className="group relative text-left bg-panel rounded-2xl overflow-hidden ring-1 ring-black/25 hover:ring-brass/50 shadow-md hover:shadow-2xl hover:shadow-black/30 transition-shadow duration-300 cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/5] overflow-hidden">
                      <Avatar member={m} className="group-hover:scale-[1.06] transition-transform duration-500 ease-out" />
                      <div className="absolute top-3 left-3 bg-hangardeep/85 backdrop-blur-md px-2.5 py-1 rounded-md font-mono text-[0.62rem] font-bold text-brass">
                        {m.team}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-gradient-to-t from-hangardeep via-hangardeep/95 to-transparent pt-10 pb-3 px-4">
                        <span className="inline-flex items-center gap-1 font-mono text-[0.64rem] uppercase tracking-wider text-brass">
                          View profile
                          <svg viewBox="0 0 12 10" className="w-2.5 h-2.5" fill="none">
                            <path d="M1 5H11M11 5L7 1M11 5L7 9" stroke="currentColor" strokeWidth="1.4" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-base sm:text-lg text-ink leading-snug">{m.name}</h3>
                      <p className="font-mono text-[0.7rem] text-linecyan mt-1 font-medium">{m.role}</p>
                      <div className="mt-3 pt-3 border-t border-ink/10">
                        <span className="font-mono text-[0.66rem] uppercase tracking-wider text-inkdim">
                          {m.division}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-hangardeep/85 backdrop-blur-md overflow-y-auto"
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.18, ease: "easeIn" } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-panel rounded-2xl overflow-hidden my-auto text-ink shadow-2xl ring-1 ring-black/30"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close profile"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-hangardeep/70 hover:bg-hangardeep text-inkdim hover:text-ink flex items-center justify-center transition-colors duration-200"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="relative md:col-span-2 aspect-[4/5] md:aspect-auto">
                <Avatar member={active} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="font-mono text-[0.66rem] font-bold text-brass bg-brass/10 px-2.5 py-1 rounded uppercase tracking-wider">
                    {active.team}
                  </span>
                  <span className="font-mono text-[0.66rem] font-bold text-linecyan bg-linecyan/10 px-2.5 py-1 rounded uppercase tracking-wider">
                    {active.division}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight">{active.name}</h3>
                <p className="font-mono text-sm text-linecyan font-medium mt-1">{active.role}</p>
              </motion.div>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
