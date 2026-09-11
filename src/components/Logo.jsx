// Logo.jsx
// Reconstructed from the built app's navbar. The bundle references the
// logo as a single constant (`/assets/logo-BIueMZLx.png`) used in the
// top navigation next to the site's nav links (About, Drones, Aircraft,
// Achievements, ...).

import logoSrc from "../assets/logo.png";

export default function Logo({ className = "h-9 w-auto" }) {
  return (
    <a href="/" aria-label="Aero FCRIT home" className="flex items-center gap-2">
      <img src={logoSrc} alt="Aero FCRIT logo" className={className} />
    </a>
  );
}
