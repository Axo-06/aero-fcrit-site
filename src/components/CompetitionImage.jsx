// CompetitionImage.jsx
// One card/slide of the gallery — id 3 in galleryData.js.
// Image asset: assets/competition.jpg (was competition-CHMrQou2.jpg).

import competitionImg from "../assets/competition.jpg";

export default function CompetitionImage({ className = "w-full h-full object-cover" }) {
  return (
    <figure>
      <img src={competitionImg} alt="Competition day" className={className} />
      <figcaption className="text-sm text-inkdim mt-2">
        <strong>Competition day</strong> — Technoxian 2026 competition.
      </figcaption>
    </figure>
  );
}
