// HangarImage.jsx
// One card/slide of the gallery — id 1 in galleryData.js.
// Image asset: assets/hangar.jpg (was hangar-BjsdU653.jpg in the build).

import hangarImg from "../assets/hangar.jpg";

export default function HangarImage({ className = "w-full h-full object-cover" }) {
  return (
    <figure>
      <img src={hangarImg} alt="Build days in the hangar" className={className} />
      <figcaption className="text-sm text-inkdim mt-2">
        <strong>Build days in the hangar</strong> — Design and fabrication sessions.
      </figcaption>
    </figure>
  );
}
