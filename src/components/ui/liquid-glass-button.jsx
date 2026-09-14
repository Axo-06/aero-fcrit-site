"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

// Variants mapped to this site's existing signal / hangardeep / ink palette
// instead of shadcn's --primary/--ring CSS variables, which this repo doesn't define.
const liquidButtonVariants = cva(
  "relative inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap font-mono text-[0.72rem] 2xl:text-[0.78rem] tracking-wider uppercase font-medium rounded-sm transition-[color,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        filled: "bg-signal text-[#171006] hover:scale-105",
        outline: "border border-signal text-signal hover:scale-105 hover:bg-signal hover:text-[#171006]",
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
    <Comp
      data-slot="button"
      className={cn("group", liquidButtonVariants({ variant, size, className }))}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backdropFilter: 'url("#liquid-glass-filter")' }}
      />
      <span className="pointer-events-none">{children}</span>
      <GlassFilter />
    </Comp>
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
