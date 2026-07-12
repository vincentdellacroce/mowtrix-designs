"use client";

import { STATS } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/** Compact proof band of headline numbers. */
export default function StatsBand() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {STATS.map((s) => (
        <RevealItem
          key={s.label}
          className="card-light rounded-2xl p-8 text-center"
        >
          <div className="font-display text-4xl font-bold text-glow-emerald sm:text-5xl">
            {s.value}
          </div>
          <div className="mt-2 text-sm text-[#5a6b61]">{s.label}</div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
