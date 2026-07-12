"use client";

import { motion } from "motion/react";
import { STATS } from "@/lib/data";

/* ---------- Traffic chart — realistic Search Console style ---------- */

// Weekly organic clicks over 13 weeks (realistic growth curve)
const WEEKS = [82, 91, 78, 104, 138, 192, 258, 323, 408, 481, 544, 596, 621];
const MAX_Y = 700;

// Chart area: x 44–314 (270px wide), y 14–158 (144px high)
const X0 = 44, X1 = 314, Y0 = 14, Y1 = 158;
const W = X1 - X0, H = Y1 - Y0;

function toSvg(val: number, idx: number) {
  const x = X0 + (idx / (WEEKS.length - 1)) * W;
  const y = Y1 - (val / MAX_Y) * H;
  return { x, y };
}

const pts = WEEKS.map((v, i) => toSvg(v, i));
const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
const areaPath = linePath + ` L${X1},${Y1} L${X0},${Y1} Z`;

// Inflection marker (week 5, idx 4)
const inflect = pts[4];

export function RankChart() {
  return (
    <div className="relative overflow-hidden bg-[#080f0a] p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] sm:p-6">
      {/* header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-haze">
            Organic clicks · 13 weeks
          </div>
          <div className="mt-0.5 font-display text-2xl font-semibold text-mist">
            621<span className="ml-1 text-sm text-emerald-400">+657%</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/15 px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-breathe" />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-emerald-300">live</span>
        </div>
      </div>

      <svg
        viewBox="0 0 320 180"
        className="h-auto w-full"
        aria-label="Organic traffic growing from 82 to 621 clicks per week over 13 weeks"
      >
        <defs>
          <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis grid + labels */}
        {[0, 200, 400, 600].map((v) => {
          const y = Y1 - (v / MAX_Y) * H;
          return (
            <g key={v}>
              <line x1={X0} x2={X1} y1={y} y2={y} stroke="#1a3322" strokeWidth="1" />
              <text x={X0 - 5} y={y + 3.5} textAnchor="end" fill="#4a6456" fontSize="9" fontFamily="var(--font-mono)">
                {v === 0 ? "0" : `${v}`}
              </text>
            </g>
          );
        })}

        {/* X-axis month labels */}
        {[
          { label: "Aug", idx: 0 },
          { label: "Sep", idx: 3 },
          { label: "Oct", idx: 6 },
          { label: "Nov", idx: 9 },
          { label: "Dec", idx: 12 },
        ].map(({ label, idx }) => {
          const x = X0 + (idx / (WEEKS.length - 1)) * W;
          return (
            <text key={label} x={x} y={Y1 + 11} textAnchor="middle" fill="#4a6456" fontSize="9" fontFamily="var(--font-mono)">
              {label}
            </text>
          );
        })}

        {/* area fill */}
        <motion.path
          d={areaPath}
          fill="url(#tg)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />

        {/* line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* inflection annotation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <line
            x1={inflect.x} x2={inflect.x}
            y1={inflect.y - 4} y2={Y1}
            stroke="#4ade80" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3"
          />
          <rect x={inflect.x - 32} y={inflect.y - 22} width={64} height={16} rx="3" fill="#157a43" />
          <text x={inflect.x} y={inflect.y - 10} textAnchor="middle" fill="#fff" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="600">
            Mowtrix live ↑
          </text>
        </motion.g>

        {/* end dot */}
        <motion.g
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.55 }}
          style={{ transformOrigin: `${X1}px ${pts[pts.length - 1].y}px` }}
        >
          <circle cx={X1} cy={pts[pts.length - 1].y} r="4" fill="#4ade80" />
          <circle cx={X1} cy={pts[pts.length - 1].y} r="8" fill="#4ade80" opacity="0.2" />
        </motion.g>
      </svg>
    </div>
  );
}

/* ---------- Stat tiles ---------- */

export function StatTiles() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#f6faf3] p-5 text-center shadow-[0_18px_45px_-20px_rgba(0,0,0,0.55)] sm:p-6"
        >
          <div className="font-display text-2xl font-bold text-[#0a0f0d] sm:text-3xl">{s.value}</div>
          <div className="mt-1 text-xs leading-snug text-[#3c4a42] sm:text-sm">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
