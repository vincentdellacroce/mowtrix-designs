"use client";

import { motion } from "motion/react";
import { STATS } from "@/lib/data";

/* Scene content for the hero journey. Content moves smoothly (fade/slide
   only — the design never glitches; only headline TEXT scrambles). */

/* ---------- Rank chart — solid dark card on the neon chapter ---------- */

export function RankChart() {
  // rank #47 (bottom-left) climbing to #1 (top-right) over 90 days
  const d = "M12 150 C 70 148, 96 132, 140 108 S 232 52, 308 26";
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0a0f0d] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-6">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-haze">
        <span>Google rank · 90 days</span>
        <span className="text-emerald-300/80">live client avg.</span>
      </div>
      <svg
        viewBox="0 0 320 180"
        className="h-auto w-full"
        aria-label="Ranking improving from position 47 to position 1 over 90 days"
      >
        {[45, 90, 135].map((y) => (
          <line
            key={y}
            x1="8"
            x2="312"
            y1={y}
            y2={y}
            stroke="var(--color-emerald-400)"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        ))}
        <text x="12" y="142" fill="var(--color-haze)" fontSize="10" fontFamily="var(--font-mono)">#47</text>
        <text x="12" y="172" fill="var(--color-haze)" fontSize="9" fontFamily="var(--font-mono)">day 0</text>
        <text x="278" y="172" fill="var(--color-haze)" fontSize="9" fontFamily="var(--font-mono)">day 90</text>

        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-emerald-glow)"
          strokeOpacity="0.25"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-emerald-400)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.25, duration: 0.3 }}
          style={{ transformOrigin: "308px 26px" }}
        >
          <circle cx="308" cy="26" r="5" fill="var(--color-emerald-glow)" />
          <circle cx="308" cy="26" r="10" fill="var(--color-emerald-glow)" opacity="0.25" />
          <rect x="266" y="8" width="34" height="16" rx="8" fill="var(--color-emerald-400)" />
          <text x="283" y="19" textAnchor="middle" fill="#0a0f0d" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">#1</text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ---------- Stat tiles — clean white cards, black type ---------- */

export function StatTiles() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-[#f6faf3] p-5 text-center shadow-[0_18px_45px_-20px_rgba(0,0,0,0.55)] sm:p-6"
        >
          <div className="font-display text-2xl font-bold text-[#0a0f0d] sm:text-3xl">
            {s.value}
          </div>
          <div className="mt-1 text-xs leading-snug text-[#3c4a42] sm:text-sm">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
