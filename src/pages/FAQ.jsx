// FAQ.jsx
// Reconstructed from the bundle's `L2` component.

import { useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";

const QUESTIONS = [
  {
    q: "Do I need prior flying or engineering experience to join?",
    a: "No -you don't need any prior flying or engineering experience to join. We welcome complete beginners and pair you with an experienced lead on your first build..",
  },
  {
    q: "Which division should I join — Drones or Aircraft?",
    a: "It depends on your skills and interests, and on availability in each division at the time you join.",
  },
  {
    q: "How much time does the club expect per week?",
    a: "Placeholder answer — fill in your club's real expectations around workshop hours and build sprints.",
  },
  {
    q: "Is there a membership fee?",
    a: "Yes — there's a membership fee of ₹3,000, which goes towards keeping the club running and funding components for builds.",
  },
  {
    q: "How can my company sponsor the club?",
    a: "We'd love to have you on board. Reach out to us at aerofcrit0@gmail.com, or send us a message through our Contact page, and our team will get back to you with sponsorship details and partnership opportunities.",
  },
  {
    q: "I graduated — how do I stay involved as an alum?",
    a: "Head over to our Alumni page, or reach out to us directly through the Contact page  we'd love to stay in touch.",
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
