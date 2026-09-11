// FAQ.jsx
// Reconstructed from the bundle's `L2` component.

import { useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";

const QUESTIONS = [
  {
    q: "Do I need prior flying or engineering experience to join?",
    a: "No — placeholder answer. Most clubs like this welcome complete beginners and pair them with an experienced lead on their first build.",
  },
  {
    q: "Which division should I join — Drones or Aircraft?",
    a: "Placeholder answer — describe how new members choose between the Unmanned Systems and Fixed Wing divisions.",
  },
  {
    q: "How much time does the club expect per week?",
    a: "Placeholder answer — fill in your club's real expectations around workshop hours and build sprints.",
  },
  {
    q: "Is there a membership fee?",
    a: "Placeholder answer — replace with your actual fee structure, if any.",
  },
  {
    q: "How can my company sponsor the club?",
    a: "Placeholder answer — link to the Sponsors page and outline the inquiry process.",
  },
  {
    q: "I graduated — how do I stay involved as an alum?",
    a: "Placeholder answer — point back to the Alumni page and contact details.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(() => new Set([0]));

  function toggle(i) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <>
      <SectionHeader
        eyebrow="Good to know"
        title="FAQ"
        description="Placeholder questions and answers — tap any question to expand it."
      />
      <section className="py-16">
        <div className="max-w-[780px] mx-auto px-5 sm:px-7">
          {QUESTIONS.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div key={item.q} className="border-b border-ink/10">
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display font-bold uppercase text-lg sm:text-xl">{item.q}</span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full border border-ink/25 flex items-center justify-center text-brass transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-inkdim pb-5 max-w-[620px]">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <p className="font-mono text-[0.72rem] text-inkdim mt-10">
            <span className="text-signal">⚠ </span>
            Placeholder Q&A — replace with your club's real, frequently-asked questions.
          </p>
        </div>
      </section>
    </>
  );
}
