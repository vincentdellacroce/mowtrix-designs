"use client";

import { STATS } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** Compact proof band of headline numbers. */
export default function StatsBand() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl glass lg:grid-cols-4">
      {STATS.map((s) => (
        <RevealItem
          key={s.label}
          className="bg-black-matte/20 p-8 text-center transition-colors duration-300 hover:bg-emerald-500/5"
        >
          <div className="font-display text-4xl font-bold text-glow-emerald sm:text-5xl">
            {s.value}
          </div>
          <div className="mt-2 text-sm text-fog">{s.label}</div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
