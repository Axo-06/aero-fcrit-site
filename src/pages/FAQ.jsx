// FAQ.jsx
// Reconstructed from the bundle's `L2` component. Accordion animation
// upgraded from the CSS `grid-rows` trick to `motion` (already a project
// dependency) for a true, jank-free height/opacity transition, a spring
// icon rotation, and a subtle stagger on first mount — same content,
// same hangar theme, smoother motion throughout.

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    a: "The club expects a commitment of 8-10 hours per week, but this can vary depending on the upcoming competitions and deadlines.",
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
        description="Frequently asked questions and answers — tap any question to expand it."
      />
      <section className="py-16">
        <div className="max-w-[780px] mx-auto px-5 sm:px-7">
          {QUESTIONS.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-ink/10"
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group w-full flex items-center justify-between gap-4 py-5 text-left rounded-lg px-2 -mx-2 transition-colors duration-200 hover:bg-panel/60"
                >
                  <span
                    className={`font-display font-bold uppercase text-lg sm:text-xl transition-colors duration-200 ${
                      isOpen ? "text-brass" : "text-ink group-hover:text-brass/90"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-200 ${
                      isOpen ? "border-brass/60 text-brass bg-brass/10" : "border-ink/25 text-brass"
                    }`}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.25, ease: "easeInOut" },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-inkdim pb-5 max-w-[620px]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          <p className="font-mono text-[0.72rem] text-inkdim mt-10">
            <span className="text-signal">⚠ </span>
            If you have any other questions, feel free to reach out to us at the email address listed on our Contact page, or send us a message through the Contact form. We will get back to you as soon as possible.
          </p>
        </div>
      </section>
    </>
  );
}
