// Footer.jsx
// Brand mark, Explore / Club link columns, social links, and a large
// hover-reveal "AERO" wordmark treatment (adapted from the hover-footer
// component, recolored to the site's signal/brass/linecyan palette).

import { Link } from "react-router-dom";
import { TextHoverEffect, FooterBackgroundGradient } from "./ui/hover-footer.jsx";

// lucide-react v1 removed ALL brand/logo icons (Instagram, LinkedIn, Facebook,
// GitHub, etc.) for trademark reasons — see https://lucide.dev/guide/version-1.
// Using plain inline SVGs for these instead, per Lucide's own recommendation.
function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
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
