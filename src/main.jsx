import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

if (typeof window !== "undefined") {
  console.log(
    "%c" +
      "        ___\n" +
      "  _____/-**-\\_____\n" +
      " (____________()_D\n" +
      "        \\_+_/",
    "color: #ce9e52; font-family: monospace; font-size: 12px; line-height: 1.1;"
  );
  console.log(
    "%cCleared for takeoff 🛫",
    "color: #7fc8be; font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: bold;"
  );
  console.log(
    "%cAero FCRIT — students design what flies. Poking around the code? We like that.",
    "color: #afc0b6; font-family: 'IBM Plex Mono', monospace; font-size: 11px;"
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
