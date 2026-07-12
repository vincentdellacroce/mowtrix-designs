"use client";

import { useReducedMotion } from "motion/react";
import BackgroundShapes from "@/components/ui/background-shapes";
import InViewMount from "@/components/ui/InViewMount";

/**
 * Sparse geometric cells flickering behind the Process cards — quiet
 * "engineering blueprint" texture. Low density (~70 cells), desktop only,
 * timers only run while the section is visible. Under reduced motion the
 * shapes render once and effectively never change.
 */
export default function ProcessShapes() {
  const reduced = useReducedMotion();
  const NEVER = 1e9; // ~11.5 days; static for any real visit
  return (
    <InViewMount className="pointer-events-none absolute inset-0 -z-10 hidden items-center justify-center overflow-hidden opacity-[0.10] md:flex">
      <BackgroundShapes
        width={1100}
        height={480}
        cellSize={56}
        strokeWidth={8}
        colors={["#157a43"]}
        minInterval={reduced ? NEVER : 1600}
        maxInterval={reduced ? NEVER : 6000}
        className="max-w-none"
      />
    </InViewMount>
  );
}
