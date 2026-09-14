// Footer.jsx
// Brand mark, Explore / Club link columns, social links, and a large
// hover-reveal "AERO" wordmark treatment (adapted from the hover-footer
// component, recolored to the site's signal/brass/linecyan palette).

import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "./ui/hover-footer.jsx";

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/aero_fcrit/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/aero-fcrit" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@aerofcrit" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-hangardeep">
      <FooterBackgroundGradient />

      <div className="relative z-10 pt-14 pb-10 max-w-[1180px] mx-auto px-5 sm:px-7 flex justify-between items-start flex-wrap gap-7">
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

          <div className="min-w-[110px]">
            <h5 className="font-mono text-[0.72rem] tracking-wider uppercase text-inkdim mb-3.5">
              Follow
            </h5>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 text-sm text-inkdim hover:text-brass transition-colors"
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1180px] mx-auto px-5 sm:px-7 mt-10 pt-6 border-t border-ink/10 text-xs text-inkdim">
        © {new Date().getFullYear()} Aero FCRIT — Father Conceicao Rodrigues Institute of Technology.
      </div>

      {/* Large hover-reveal wordmark, hidden on small screens like the source component */}
      <div className="relative z-10 lg:flex hidden h-[22rem] -mt-16 -mb-16 pointer-events-none">
        <div className="pointer-events-auto w-full h-full">
          <TextHoverEffect text="Aero" duration={0.3} />
        </div>
      </div>
    </footer>
  );
}
