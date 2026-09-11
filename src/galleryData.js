// galleryData.js
// Reconstructed from the built app (assets/index-CcFUuBQh.js).
// Central list of gallery media — each entry points at one asset.
// The carousel/gallery component auto-advances every 5s (AUTO_ADVANCE_MS)
// and cycles id 1 -> 2 -> 3 -> 4 -> back to 1.

import hangarImg from "./assets/hangar.jpg";
import firstFlightVideo from "./assets/first_flight.mp4";
import competitionImg from "./assets/competition.jpg";
import crewImg from "./assets/crew.jpg";

export const AUTO_ADVANCE_MS = 5000;

export const galleryItems = [
  {
    id: 1,
    type: "image",
    title: "Build days in the hangar",
    caption: "Design and fabrication sessions.",
    src: hangarImg,
  },
  {
    id: 2,
    type: "video",
    title: "First flights",
    caption: "Test flights and maiden voyages.",
    src: firstFlightVideo,
  },
  {
    id: 3,
    type: "image",
    title: "Competition day",
    caption: "Technoxian 2026 competition.",
    src: competitionImg,
  },
  {
    id: 4,
    type: "image",
    title: "The crew",
    caption: "AeroFCRIT Team",
    src: crewImg,
  },
];
