// Footer.jsx
// Reconstructed from the bundle's `m0` component: brand mark, two link
// columns (Explore / Club), matching the nav's route list.

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="pt-14 pb-10 bg-hangardeep">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 flex justify-between items-start flex-wrap gap-7">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          AERO <span className="text-brass">FCRIT</span>
        </Link>

        <div className="flex gap-10 sm:gap-14 flex-wrap">
          <div className="min-w-[110px]">
            <h5 className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mb-3.5">
              Explore
            </h5>
            <ul className="flex flex-col gap-2">
              {[
                ["/drones", "Drones"],
                ["/aircraft", "Aircraft"],
                ["/achievements", "Achievements"],
                ["/blog", "Blog"],
                ["/news", "News"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-brass transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-[110px]">
            <h5 className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mb-3.5">
              Club
            </h5>
            <ul className="flex flex-col gap-2">
              {[
                ["/about", "About"],
                ["/team", "Team"],
                ["/alumni", "Alumni"],
                ["/sponsors", "Sponsors"],
                ["/faq", "FAQ"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-brass transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-5 sm:px-7 mt-10 pt-6 border-t border-ink/10 text-xs text-inkdim">
        © {new Date().getFullYear()} Aero FCRIT — Father Conceicao Rodrigues Institute of Technology.
      </div>
    </footer>
  );
}
