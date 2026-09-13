// Navbar.jsx
// Sticky header. All routes now live in a single row (no "More"
// dropdown): links cascade in with a staggered slide-in on mount
// (AnimatedContent-style), and a gooey brass/cyan indicator glides
// between items on hover/active state on desktop. The mobile menu uses
// a simpler sliding bar instead of the particle effect, since that's
// lighter for touch and small screens ("Option C").

import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import logoSrc from "../assets/logo.png";
import AnimatedContent from "./AnimatedContent.jsx";
import { playPropellerClick } from "../hooks/useClickSound.js";

const ALL_LINKS = [
  { to: "/about", label: "About", key: "a" },
  { to: "/drones", label: "Drones", key: "d" },
  { to: "/aircraft", label: "Aircraft", key: "i" },
  { to: "/achievements", label: "Achievements", key: "v" },
  { to: "/team", label: "Team", key: "t" },
  { to: "/blog", label: "Blog", key: "b" },
  { to: "/news", label: "News", key: "n" },
  { to: "/alumni", label: "Alumni", key: "u" },
  { to: "/sponsors", label: "Sponsors", key: "s" },
  { to: "/faq", label: "FAQ", key: "f" },
];

const KB_NAV_ARM_MS = 1600;

const STAGGER_MS = 40;

function GooeyIndicator({ containerRef, linkRefs, targetIndex }) {
  const [style, setStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    if (targetIndex == null) {
      setStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const container = containerRef.current;
    const el = linkRefs.current[targetIndex];
    if (!container || !el) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setStyle({
      left: eRect.left - cRect.left - 8,
      width: eRect.width + 16,
      opacity: 1,
    });
  }, [targetIndex, containerRef, linkRefs]);

  return (
    <span
      className="gooey-indicator"
      style={{ transform: `translateX(${style.left}px)`, width: style.width, opacity: style.opacity }}
    >
      <span className="gooey-indicator-blob" />
      <span className="gooey-indicator-particles" key={targetIndex}>
        <span className="gooey-indicator-particle p1" />
        <span className="gooey-indicator-particle p2" />
        <span className="gooey-indicator-particle p3" />
      </span>
    </span>
  );
}

function MobileIndicator({ containerRef, itemRefs, targetIndex }) {
  const [style, setStyle] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    if (targetIndex == null) {
      setStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const container = containerRef.current;
    const el = itemRefs.current[targetIndex];
    if (!container || !el) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setStyle({
      top: eRect.top - cRect.top + 4,
      height: eRect.height - 8,
      opacity: 1,
    });
  }, [targetIndex, containerRef, itemRefs]);

  return (
    <span
      className="mobile-nav-indicator"
      style={{ transform: `translateY(${style.top}px)`, height: style.height, opacity: style.opacity }}
    />
  );
}

export default function Navbar({ stickyTop = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [kbNavArmed, setKbNavArmed] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const desktopContainerRef = useRef(null);
  const desktopLinkRefs = useRef([]);
  const mobileContainerRef = useRef(null);
  const mobileLinkRefs = useRef([]);
  const logoClickRef = useRef({ count: 0, timer: null });
  const gameActiveRef = useRef(false);

  useEffect(() => {
    function onGameActive(e) {
      gameActiveRef.current = e.detail;
      if (e.detail) setKbNavArmed(false);
    }
    window.addEventListener("aero:game-active", onGameActive);
    return () => window.removeEventListener("aero:game-active", onGameActive);
  }, []);

  const activeIndex = useMemo(() => ALL_LINKS.findIndex((l) => l.to === pathname), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Keyboard nav mode: press "g" to arm, then a link's letter to jump
  // there (Gmail-style "g then i"). Hint badges appear while armed.
  useEffect(() => {
    let armTimer;

    function isTypingTarget(el) {
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
    }

    function onKeyDown(e) {
      if (gameActiveRef.current) return;
      if (isTypingTarget(document.activeElement)) return;

      if (!kbNavArmed && e.key.toLowerCase() === "g") {
        setKbNavArmed(true);
        clearTimeout(armTimer);
        armTimer = setTimeout(() => setKbNavArmed(false), KB_NAV_ARM_MS);
        return;
      }

      if (kbNavArmed) {
        if (e.key === "Escape") {
          setKbNavArmed(false);
          return;
        }
        const match = ALL_LINKS.find((l) => l.key === e.key.toLowerCase());
        if (match) {
          clearTimeout(armTimer);
          setKbNavArmed(false);
          playPropellerClick();
          navigate(match.to);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(armTimer);
    };
  }, [kbNavArmed, navigate]);

  const linkClass = ({ isActive }) =>
    `relative z-10 pb-1 transition-colors duration-300 ${isActive ? "text-ink" : "text-inkdim hover:text-ink"}`;

  function handleNavClick() {
    playPropellerClick();
  }

  function handleLogoClick() {
    playPropellerClick();
    const ref = logoClickRef.current;
    ref.count += 1;
    clearTimeout(ref.timer);
    if (ref.count >= 3) {
      ref.count = 0;
      window.dispatchEvent(new CustomEvent("aero:logo-triple-click"));
    } else {
      ref.timer = setTimeout(() => (ref.count = 0), 600);
    }
  }

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
        onClick={handleLogoClick}
        className="group flex items-center gap-2.5 font-display font-bold text-lg sm:text-xl tracking-wide transition-transform duration-300 ease-out hover:scale-105 active:scale-95 shrink-0"
      >
        <img
          src={logoSrc}
          alt="AERO FCRIT Logo"
          className="logo-mark h-8 sm:h-9 lg:h-11 w-auto mix-blend-screen object-contain transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-[-4deg]"
        />
        <span>
          <span className="logo-shine">AERO</span> <span className="text-brass">FCRIT</span>
        </span>
      </Link>

      {/* Desktop nav — every route in one row, staggered entrance + gooey indicator */}
      <nav
        ref={desktopContainerRef}
        onMouseLeave={() => setHoveredIndex(null)}
        className="hidden xl:flex items-center gap-4 2xl:gap-6 font-mono text-[0.72rem] 2xl:text-[0.78rem] tracking-wider uppercase relative"
      >
        <GooeyIndicator
          containerRef={desktopContainerRef}
          linkRefs={desktopLinkRefs}
          targetIndex={hoveredIndex ?? (activeIndex >= 0 ? activeIndex : null)}
        />
        {ALL_LINKS.map((l, i) => (
          <AnimatedContent key={l.to} delay={i * STAGGER_MS} direction="left" distance={12}>
            <NavLink
              to={l.to}
              ref={(el) => (desktopLinkRefs.current[i] = el)}
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={handleNavClick}
              className={linkClass}
            >
              {l.label}
              {kbNavArmed && <span className="kbd-hint">{l.key.toUpperCase()}</span>}
            </NavLink>
          </AnimatedContent>
        ))}
      </nav>

      {kbNavArmed && (
        <span className="hidden xl:inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-inkdim absolute left-1/2 -translate-x-1/2 top-full mt-1.5 bg-hangardeep/95 border border-brass/30 px-2.5 py-1 rounded-sm">
          Press a highlighted letter to jump — <span className="text-brass">Esc</span> to cancel
        </span>
      )}

      <div className="hidden xl:flex items-center gap-3 shrink-0">
        <a
          href="https://aerofcritops.vercel.app/"
          onClick={handleNavClick}
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] 2xl:text-[0.78rem] tracking-wider uppercase font-medium px-4 2xl:px-5 py-[10px] rounded-sm border border-signal text-signal transition-all duration-300 ease-out transform hover:scale-105 hover:bg-signal hover:text-[#171006] active:scale-95"
        >
          Member hub
        </a>
        <Link
          to="/contact"
          onClick={handleNavClick}
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] 2xl:text-[0.78rem] tracking-wider uppercase font-medium px-4 2xl:px-5 py-[10px] rounded-sm bg-signal text-[#171006] transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
        >
          Join the squadron
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((o) => !o)}
        className="xl:hidden flex flex-col gap-1.5 p-2 transition-transform duration-200 active:scale-90"
      >
        <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block w-6 h-px bg-ink transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-px bg-ink transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {mobileOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-hangardeep border-b border-ink/10 flex flex-col p-6 gap-1 font-mono text-sm uppercase tracking-wider max-h-[calc(100dvh-64px)] overflow-y-auto shadow-2xl">
          <div ref={mobileContainerRef} className="relative flex flex-col gap-1 pl-4">
            <MobileIndicator
              containerRef={mobileContainerRef}
              itemRefs={mobileLinkRefs}
              targetIndex={activeIndex >= 0 ? activeIndex : null}
            />
            {ALL_LINKS.map((l, i) => (
              <AnimatedContent key={l.to} delay={i * STAGGER_MS} direction="left" distance={16} as="div">
                <NavLink
                  to={l.to}
                  ref={(el) => (mobileLinkRefs.current[i] = el)}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `block py-2.5 transition-colors duration-300 ${isActive ? "text-ink" : "text-inkdim hover:text-ink"}`
                  }
                >
                  {l.label}
                </NavLink>
              </AnimatedContent>
            ))}
          </div>
          <div className="h-px bg-ink/10 my-2" />
          <a
            href="https://aerofcritops.vercel.app/"
            onClick={handleNavClick}
            className="inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-sm border border-signal text-signal mt-2 transition-all duration-300 active:scale-95"
          >
            Member hub
          </a>
          <Link
            to="/contact"
            onClick={handleNavClick}
            className="inline-flex items-center justify-center gap-2 font-medium px-5 py-3 rounded-sm bg-signal text-[#171006] transition-all duration-300 active:scale-95"
          >
            Join the squadron
          </Link>
        </div>
      )}
    </header>
  );
}
