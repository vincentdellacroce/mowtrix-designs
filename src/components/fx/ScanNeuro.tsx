"use client";

import { useReducedMotion } from "motion/react";
import { NeuroNoise } from "@/components/ui/neuro-noise";

/**
 * Neural-noise field for the audit tool's scanning phase. Transient by
 * design — it only exists while the ~2s scan runs, so it has zero idle cost.
 * Emerald-on-void to read as "the machine is thinking".
 */
export default function ScanNeuro() {
  const reduced = useReducedMotion();
  return (
    <NeuroNoise
      colorFront="#2bff9e"
      colorMid="#059669"
      colorBack="#050807"
      brightness={0.42}
      contrast={0.55}
      speed={reduced ? 0 : 1}
      scale={1.15}
      rotation={0}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
