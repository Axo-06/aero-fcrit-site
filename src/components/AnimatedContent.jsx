// AnimatedContent.jsx
// Minimal "AnimatedContent"-style reveal wrapper, in the spirit of the
// React Bits component of the same name — but hand-rolled here with no
// extra dependency, since this site only needs a simple staggered
// slide-in (used to cascade the navbar links in instead of having them
// all appear at once).

import { useEffect, useRef, useState } from "react";

export default function AnimatedContent({
  children,
  delay = 0,
  distance = 14,
  direction = "left", // "left" | "up"
  duration = 420,
  className = "",
  as: Tag = "span",
}) {
  const [shown, setShown] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      setShown(true);
      return;
    }
    setShown(false);
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const axis = direction === "up" ? "Y" : "X";
  const from = direction === "up" ? distance : -distance;

  return (
    <Tag
      className={className}
      style={{
        display: Tag === "div" ? "block" : "inline-block",
        opacity: shown ? 1 : 0,
        transform: shown ? "translate(0, 0)" : `translate${axis}(${from}px)`,
        transition: `opacity ${duration}ms ease, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {children}
    </Tag>
  );
}
