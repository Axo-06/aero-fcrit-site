// SectionHeader.jsx
// Reconstructed from the bundle's `et` component — the blueprint-grid
// header banner (eyebrow / title / description) that every inner page
// (About, Drones, Team, FAQ, etc.) opens with.

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <section className="relative pt-16 sm:pt-20 pb-16 border-b border-ink/10 overflow-hidden">
      <div className="blueprint-grid" />
      <div className="max-w-[640px] mx-auto px-5 sm:px-7 relative z-10">
        {eyebrow && (
          <p className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-linecyan mb-4 flex items-center gap-2.5">
            <span className="w-6 h-px bg-linecyan inline-block" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display font-extrabold uppercase leading-[0.98] text-[clamp(2.4rem,5.5vw,3.8rem)] mb-4">
          {title}
        </h1>
        {description && <p className="text-inkdim text-[1.02rem] max-w-[520px]">{description}</p>}
      </div>
    </section>
  );
}
