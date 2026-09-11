// FirstFlightVideo.jsx
// One card/slide of the gallery — id 2 in galleryData.js.
// Video asset: assets/first_flight.mp4 (was first_flight-UnzgYBhK.mp4).

import firstFlightVideo from "../assets/first_flight.mp4";

export default function FirstFlightVideo({ className = "w-full h-full object-cover" }) {
  return (
    <figure>
      <video
        src={firstFlightVideo}
        className={className}
        controls
        playsInline
        preload="metadata"
        aria-label="First flights"
      />
      <figcaption className="text-sm text-inkdim mt-2">
        <strong>First flights</strong> — Test flights and maiden voyages.
      </figcaption>
    </figure>
  );
}
