"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { hashString, seededRandom } from "@/lib/utils";

/**
 * Dramatizes the ranking gap: competitors tower as tall emerald peaks while
 * "YOU" sit as a tiny sliver — then, on the flip, your peak surges past
 * everyone to #1. Makes the difference feel enormous, then solved.
 */
export default function GapVisual({
  competitorsAhead,
  seedKey,
}: {
  competitorsAhead: number;
  seedKey: string;
}) {
  const [phase, setPhase] = useState<"before" | "after">("before");

  useEffect(() => {
    setPhase("before");
    const t = setTimeout(() => setPhase("after"), 1500);
    return () => clearTimeout(t);
  }, [seedKey]);

  const shown = Math.min(competitorsAhead, 12);
  const rand = seededRandom(hashString(seedKey));
  // stable tall-ish heights for competitor peaks
  const peaks = Array.from({ length: shown }, () => 52 + Math.round(rand() * 42));

  return (
    <div className="relative">
      {/* summit line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300/70">
          #1 · summit
        </span>
        <span className="h-px flex-1 bg-emerald-400/25" />
      </div>

      <div className="flex h-56 items-end justify-center gap-1.5 sm:gap-2">
        {peaks.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: "8%" }}
            animate={{
              height: phase === "before" ? `${h}%` : `${Math.max(14, h - 46)}%`,
              opacity: phase === "before" ? 0.85 : 0.32,
            }}
            transition={{
              duration: 0.8,
              delay: phase === "before" ? i * 0.04 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-[26px] flex-1 rounded-t-md bg-gradient-to-t from-emerald-900/40 to-emerald-500/40"
          >
            <div className="absolute inset-0 rounded-t-md grid-lines opacity-20 [background-size:8px_8px]" />
          </motion.div>
        ))}

        {competitorsAhead > 12 && (
          <div className="self-end pb-1 pl-1 font-mono text-[10px] text-haze">
            +{competitorsAhead - 12}
          </div>
        )}

        {/* YOU peak */}
        <motion.div
          initial={{ height: "8%" }}
          animate={{ height: phase === "before" ? "12%" : "100%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative ml-3 w-full max-w-[34px] flex-1 rounded-t-md"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--color-emerald-500) 40%, transparent), var(--color-emerald-glow))",
            boxShadow:
              phase === "after"
                ? "0 0 30px -4px var(--color-emerald-glow)"
                : "none",
          }}
        >
          <div className="absolute inset-0 rounded-t-md grid-lines opacity-25 [background-size:8px_8px]" />
          {/* flag */}
          <motion.div
            animate={{
              opacity: phase === "after" ? 1 : 0,
              y: phase === "after" ? 0 : 8,
            }}
            transition={{ delay: 0.5 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-400 px-2.5 py-1 font-mono text-[10px] font-bold text-black-matte shadow-[0_0_16px_var(--color-emerald-glow)]"
          >
            YOU · #1
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-emerald-400/10 pt-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-haze">
          {phase === "before" ? "Today" : "With Mowtrix"}
        </span>
        <button
          onClick={() => setPhase(phase === "before" ? "after" : "before")}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/80 transition-colors hover:text-emerald-200"
        >
          {phase === "before" ? "▶ show the fix" : "↺ replay"}
        </button>
      </div>
    </div>
  );
}
