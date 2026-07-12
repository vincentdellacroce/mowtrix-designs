"use client";

import { useReducedMotion } from "motion/react";
import { MeshGradient } from "@/components/ui/mesh-gradient";
import InViewMount from "@/components/ui/InViewMount";

/**
 * Slow emerald mesh swirl behind sub-page headers. One instance per page,
 * top-of-page only, masked to nothing before the content starts. Unmounts
 * once scrolled past (InViewMount), freezes under reduced motion.
 */
export default function HeaderMesh() {
  const reduced = useReducedMotion();
  return (
    <InViewMount className="pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]">
      <MeshGradient
        colors={["#b3d2a6", "#e2eeda", "#f6f8f2", "#cfe3c0"]}
        distortion={0.8}
        swirl={0.6}
        grainMixer={0}
        grainOverlay={0}
        speed={reduced ? 0 : 0.3}
        scale={1}
        rotation={0}
        offsetX={0}
        offsetY={0}
        style={{ width: "100%", height: "100%" }}
      />
    </InViewMount>
  );
}
