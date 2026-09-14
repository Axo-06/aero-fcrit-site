"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

// Variants mapped to this site's existing signal / hangardeep / ink palette
// instead of shadcn's --primary/--ring CSS variables, which this repo doesn't define.
// The glass ripple is applied via a `::before` pseudo-element (see GlassStyles
// below) rather than a sibling <div>, so it works whether LiquidButton renders
// its own <button> or, via asChild, hands off to a single <a>/<Link> child
// through Slot (which requires exactly one child element).
const liquidButtonVariants = cva(
  "liquid-glass relative overflow-hidden inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap font-mono text-[0.72rem] 2xl:text-[0.78rem] tracking-wider uppercase font-medium rounded-full transition-[color,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        filled: "bg-signal text-[#171006]",
        outline: "border border-signal text-signal hover:bg-signal hover:text-[#171006]",
      },
      size: {
        default: "px-4 2xl:px-5 py-[10px]",
        mobile: "justify-center px-5 py-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
);

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(liquidButtonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
      <GlassStyles />
    </>
  );
}

// Renders once per LiquidButton instance, but the <style> content is identical
// and the browser dedupes/ignores the redundant rules cheaply. If you use many
// LiquidButtons on one page and want to be tidy, hoist a single <GlassStyles />
// to a layout root instead and drop it from here.
function GlassStyles() {
  return (
    <>
      <style>{`
        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          opacity: 0;
          backdrop-filter: url(#liquid-glass-filter);
          -webkit-backdrop-filter: url(#liquid-glass-filter);
          transition: opacity 300ms ease-out;
          pointer-events: none;
        }
        .liquid-glass:hover::before {
          opacity: 1;
        }
      `}</style>
      <GlassFilter />
    </>
  );
}

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export { LiquidButton, liquidButtonVariants };
