// Navbar.jsx
// Reconstructed from the bundle's `p0` component. Sticky header that
// gains a blurred background after 40px of scroll, a "More" dropdown
// for secondary nav links, and a slide-down mobile menu under 1024px.

import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logoSrc from "../assets/logo.png";

const PRIMARY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/drones", label: "Drones" },
  { to: "/aircraft", label: "Aircraft" },
  { to: "/achievements", label: "Achievements" },
  { to: "/team", label: "Team" },
];

const MORE_LINKS = [
  { to: "/blog", label: "Blog" },
  { to: "/news", label: "News" },
  { to: "/alumni", label: "Alumni" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar({ stickyTop = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Close "More" dropdown on outside click / Escape
  useEffect(() => {
    function onClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setMoreOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `relative pb-1 transition-all duration-300 transform inline-block hover:scale-105 active:scale-95 origin-center ${
      isActive ? "text-ink after:w-full" : "text-inkdim hover:text-ink"
    } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-brass after:transition-all after:duration-300 ${
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      style={{ top: stickyTop }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "py-3 px-4 sm:px-6 lg:px-7 bg-hangardeep/90 backdrop-blur-md border-b border-ink/10"
          : "py-4 sm:py-5 px-4 sm:px-6 lg:px-7"
      }`}
    >
      <Link
        to="/"
        className="group flex items-center gap-2.5 font-display font-bold text-lg sm:text-xl tracking-wide transition-transform duration-300 ease-out hover:scale-105 active:scale-95 shrink-0"
      >
        <img
          src={logoSrc}
          alt="AERO FCRIT Logo"
          className="h-8 sm:h-9 lg:h-11 w-auto mix-blend-screen object-contain transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-4deg]"
        />
        <span className="transition-colors duration-300 group-hover:text-white">
          AERO <span className="text-brass">FCRIT</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-[0.78rem] tracking-wider uppercase">
        {PRIMARY_LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} className={linkClass}>
            {l.label}
          </NavLink>
        ))}

        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen((o) => !o)}
            aria-expanded={moreOpen}
            className={`flex items-center gap-1.5 pb-1 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              moreOpen || MORE_LINKS.some((l) => l.to === pathname) ? "text-ink" : "text-inkdim hover:text-ink"
            }`}
          >
            More
            <svg
              viewBox="0 0 12 8"
              className={`w-2.5 h-2.5 transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
              fill="none"
            >
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          {moreOpen && (
            <div className="absolute right-0 mt-3 w-48 rounded border border-ink/15 bg-hangardeep/95 backdrop-blur-md shadow-2xl py-2 normal-case tracking-normal">
              {MORE_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-xs uppercase tracking-wider transition-all duration-200 transform hover:translate-x-1 ${
                      isActive ? "text-brass bg-panel/60 font-semibold" : "text-inkdim hover:text-ink hover:bg-panel/40"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="hidden lg:flex items-center gap-3 shrink-0">
        <a
          href="https://aerofcritops.vercel.app/"
          className="inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wider uppercase font-medium px-4 xl:px-5 py-[10px] rounded-sm border border-brass text-brass transition-all duration-300 ease-out transform hover:scale-105 hover:bg-brass hover:text-[#171006] active:scale-95"
        >
          Member hub
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-wider uppercase font-medium px-4 xl:px-5 py-[10px] rounded-sm bg-signal text-[#171006] transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
        >
          Join the squadron
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((o) => !o)}
        className="lg:hidden flex flex-col gap-1.5 p-2 transition-transform duration-200 active:scale-90"
      >
        <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block w-6 h-px bg-ink transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-hangardeep border-b border-ink/10 flex flex-col p-6 gap-5 font-mono text-sm uppercase tracking-wider max-h-[calc(100dvh-64px)] overflow-y-auto shadow-2xl">
          {PRIMARY_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <div className="h-px bg-ink/10 my-1" />
          {MORE_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <a
            href="https://aerofcritops.vercel.app/"
            className="inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-sm border border-brass text-brass mt-2 transition-all duration-300 active:scale-95"
          >
            Member hub
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-sm bg-signal text-[#171006] transition-all duration-300 active:scale-95"
          >
            Join the squadron
          </Link>
        </div>
      )}
    </header>
  );
}
