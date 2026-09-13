// CountUp.jsx
// A hand-rolled version of React Bits' "CountUp" component: animates a
// number counting up once it scrolls into view, using an
// IntersectionObserver + requestAnimationFrame — no extra dependency.
//
// Accepts either a plain number, or a pre-formatted string (e.g.
// "₹1,20,000") via `format`, so it can drive both simple counters and
// the currency stat on the Achievements page.

import { useEffect, useRef, useState } from "react";

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CountUp({
  end,
  duration = 1400,
  prefix = "",
  suffix = "",
  format,
  className = "",
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reducedMotion.current) {
      setValue(end);
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            const startTime = performance.now();
            function tick(now) {
              const progress = Math.min((now - startTime) / duration, 1);
              setValue(Math.round(easeOutExpo(progress) * end));
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration, started]);

  const display = format ? format(value) : `${prefix}${value}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
