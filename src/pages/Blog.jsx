// Blog.jsx
// Reconstructed from the bundle's `P2` component. The bundle's own
// copy here was placeholder content (marked as such), so this keeps
// the same placeholder posts — swap in real write-ups when ready.

import SectionHeader from "../components/SectionHeader.jsx";

const FEATURED = {
  title: "How we cut our drone build cycle from 6 weeks to 3",
  excerpt:
    "Placeholder featured post — replace with a real write-up of a recent build, decision, or lesson learned.",
  tag: "Build log",
  date: "Placeholder date",
};

const POSTS = [
  { title: "Choosing a flight controller for a first UAV build", tag: "Avionics", date: "Placeholder date" },
  { title: "Balsa vs. foam core: what we learned the hard way", tag: "Structures", date: "Placeholder date" },
  { title: "Prepping for an inter-college flight competition", tag: "Events", date: "Placeholder date" },
  { title: "A beginner guide to propeller pitch and diameter", tag: "Propulsion", date: "Placeholder date" },
  { title: "What we would do differently on our next glider", tag: "Build log", date: "Placeholder date" },
  { title: "Setting up a battery safety routine in the workshop", tag: "Safety", date: "Placeholder date" },
];

export default function Blog() {
  return (
    <>
      <SectionHeader
        eyebrow="Club Blog"
        title="Build logs & write-ups"
        description="Placeholder posts — swap in real build logs, lessons learned, and behind-the-scenes write-ups."
      />
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-7">
          <a
            href="#"
            className="group block rounded border border-ink/10 bg-panel p-8 sm:p-10 hover:border-brass/50 transition-colors mb-12"
          >
            <span className="font-mono text-[0.7rem] tracking-wider uppercase text-signal">
              {FEATURED.tag} · {FEATURED.date}
            </span>
            <h2 className="font-display font-extrabold uppercase text-2xl sm:text-3xl mt-3 mb-3 max-w-2xl">
              {FEATURED.title}
            </h2>
            <p className="text-inkdim max-w-xl">{FEATURED.excerpt}</p>
            <span className="inline-block mt-6 font-mono text-[0.72rem] uppercase tracking-wider text-brass group-hover:translate-x-1 transition-transform">
              Read post →
            </span>
          </a>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POSTS.map((p) => (
              <a
                key={p.title}
                href="#"
                className="group flex flex-col rounded border border-ink/10 bg-hangardeep p-6 hover:border-brass/50 transition-colors"
              >
                <span className="font-mono text-[0.66rem] tracking-wider uppercase text-linecyan mb-3">
                  {p.tag} · {p.date}
                </span>
                <h3 className="font-display font-bold uppercase text-lg leading-snug mb-4 flex-1">{p.title}</h3>
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-brass group-hover:translate-x-1 transition-transform">
                  Read post →
                </span>
              </a>
            ))}
          </div>

          <p className="font-mono text-[0.72rem] text-inkdim mt-10">
            <span className="text-signal">⚠ </span>
            Placeholder posts link nowhere yet — connect this page to your CMS or markdown source
            when you have real content.
          </p>
        </div>
      </section>
    </>
  );
}
