"use client";

import { useReducedMotion } from "motion/react";
import { Voronoi } from "@/components/ui/voronoi";
import InViewMount from "@/components/ui/InViewMount";

/**
 * Dim voronoi cell field behind the footer — reads as organic turf cells
 * (on-brand for Mowtrix). Masked to fade upward, mounts only when the
 * footer scrolls into view, freezes under reduced motion.
 */
export default function FooterVoronoi() {
  const reduced = useReducedMotion();
  return (
    <InViewMount className="pointer-events-none absolute inset-0 opacity-15 [mask-image:linear-gradient(to_top,black_20%,transparent_85%)]">
      <Voronoi
        colors={["#0d2f1f", "#0a2418", "#050807"]}
        colorGlow="#34d399"
        colorGap="#050807"
        stepsPerColor={2}
        distortion={0.25}
        gap={0.03}
        glow={0.55}
        speed={reduced ? 0 : 0.12}
        scale={0.65}
        rotation={0}
        style={{ width: "100%", height: "100%" }}
      />
    </InViewMount>
  );
}
