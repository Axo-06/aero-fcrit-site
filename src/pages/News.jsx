// News.jsx
// Reconstructed from the bundle's `E2` component.

import { useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";

const CATEGORIES = ["All", "Competitions", "Builds", "Sponsorship", "Events"];

const ITEMS = [
  { title: "Add your latest competition result here", category: "Competitions", date: "Placeholder date" },
  { title: "Placeholder — upcoming competition date", category: "Competitions", date: "Placeholder date" },
];

export default function News() {
  const [category, setCategory] = useState("All");
  const items = category === "All" ? ITEMS : ITEMS.filter((i) => i.category === category);

  return (
    <>
      <SectionHeader
        eyebrow="News Column"
        title="Latest updates"
        description="All the latest news, updates, and announcements from the team."
      />
      <section className="py-16">
        <div className="max-w-[780px] mx-auto px-5 sm:px-7">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`font-mono text-[0.7rem] uppercase tracking-wider px-4 py-2 rounded-full border transition-colors ${
                  category === c
                    ? "bg-brass border-brass text-[#171006]"
                    : "border-ink/20 text-inkdim hover:text-ink hover:border-ink/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div>
            {items.map((item, i) => (
              <div
                key={item.title}
                className={`py-6 border-t border-ink/10 ${i === items.length - 1 ? "border-b" : ""}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[0.66rem] uppercase tracking-wider text-linecyan">
                    {item.category}
                  </span>
                  <span className="text-inkdim text-xs">·</span>
                  <span className="font-mono text-[0.66rem] text-inkdim">{item.date}</span>
                </div>
                <h3 className="font-display font-bold uppercase text-xl">{item.title}</h3>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-inkdim py-10 text-center text-sm">No items in this category yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
