// CrewImage.jsx
// One card/slide of the gallery — id 4 in galleryData.js.
// Image asset: assets/crew.jpg (was crew-BRz-3hqM.jpg).

import crewImg from "../assets/crew.jpg";

export default function CrewImage({ className = "w-full h-full object-cover" }) {
  return (
    <figure>
      <img src={crewImg} alt="The crew" className={className} />
      <figcaption className="text-sm text-inkdim mt-2">
        <strong>The crew</strong> — AeroFCRIT Team
      </figcaption>
    </figure>
  );
}
