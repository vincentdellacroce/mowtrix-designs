"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Search, Loader2, TrendingDown, Bot } from "lucide-react";
import { runAudit, logAuditToSheet, validateBusinessName, type AuditResult, type Niche } from "@/lib/audit";
import { NICHES } from "@/lib/data";
import { Eyebrow } from "@/components/ui/atoms";
import GlowButton from "@/components/ui/GlowButton";
import ScanNeuro from "@/components/fx/ScanNeuro";
import CountUp from "@/components/ui/CountUp";
import GapVisual from "./GapVisual";
import { cn } from "@/lib/utils";

type Phase = "idle" | "scanning" | "done" | "error";

const SCAN_STEPS = [
  "Crawling Google index…",
  "Mapping local competitors…",
  "Checking AI-assistant citations…",
  "Auditing Core Web Vitals…",
  "Calculating your visibility gap…",
];

export default function AuditTool() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [business, setBusiness] = useState("");
  const [niche, setNiche] = useState<Niche>("Landscaping");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inputError, setInputError] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const start = () => {
    const err = validateBusinessName(business);
    if (err) { setInputError(err); return; }
    setInputError(null);
    setPhase("scanning");
    setStep(0);
    setProgress(0);

    const total = 2300;
    const tick = 30;
    let elapsed = 0;
    const id = window.setInterval(() => {
      elapsed += tick;
      setProgress(Math.min(100, (elapsed / total) * 100));
      setStep(Math.min(SCAN_STEPS.length - 1, Math.floor((elapsed / total) * SCAN_STEPS.length)));
      if (elapsed >= total) {
        clearInterval(id);
        const r = runAudit(business, niche);
        setResult(r);
        void logAuditToSheet(r);
        setPhase("done");
      }
    }, tick);
    timers.current.push(id as unknown as number);
  };

  const reset = () => {
    clearTimers();
    setPhase("idle");
    setResult(null);
  };

  return (
    <div className="card-dark relative overflow-hidden rounded-xl p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {/* ---------- IDLE ---------- */}
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative"
          >
            <Eyebrow>Free instant audit</Eyebrow>
            <h3 className="display-xl mt-4 text-3xl text-mist sm:text-4xl">
              See how many competitors are{" "}
              <span className="text-glow-emerald">ahead of you</span>.
            </h3>
            <p className="mt-3 max-w-lg text-fog">
              Enter your business and we&apos;ll estimate where you stand on
              Google and AI search right now — in seconds, no email required.
            </p>

            <div className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="biz"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-haze"
                >
                  Business name
                </label>
                <div className={cn(
                  "flex items-center gap-2 rounded-xl border bg-black-matte/60 px-4 focus-within:glow-sm",
                  inputError ? "border-red-400/50" : "border-emerald-400/20 focus-within:border-emerald-400/60"
                )}>
                  <Search className="h-4 w-4 text-emerald-400/70" />
                  <input
                    id="biz"
                    value={business}
                    onChange={(e) => { setBusiness(e.target.value); setInputError(null); }}
                    onKeyDown={(e) => e.key === "Enter" && start()}
                    placeholder="e.g. Evergreen Grounds Co."
                    className="w-full bg-transparent py-3.5 text-mist placeholder:text-haze focus:outline-none"
                  />
                </div>
                {inputError && (
                  <p className="mt-1.5 text-xs text-red-400">{inputError}</p>
                )}
              </div>

              <div>
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-haze">
                  Industry
                </span>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map((n) => (
                    <button
                      key={n}
                      onClick={() => setNiche(n)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200",
                        niche === n
                          ? "border-emerald-400/60 bg-emerald-500/15 text-mist glow-sm"
                          : "border-emerald-400/15 text-fog hover:border-emerald-400/40 hover:text-mist"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <GlowButton
                onClick={start}
                className="mt-2 w-full justify-center py-4 sm:w-auto"
              >
                Run my free audit <ArrowRight className="h-4 w-4" />
              </GlowButton>
            </div>
          </motion.div>
        )}

        {/* ---------- SCANNING ---------- */}
        {phase === "scanning" && (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex min-h-[360px] flex-col items-center justify-center text-center"
          >
            {/* neural field — only exists during the scan */}
            <div className="pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(90%_90%_at_50%_50%,black,transparent)]">
              <ScanNeuro />
            </div>

            {/* scan line */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-x-0 top-0 h-24 opacity-40"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-emerald-glow) 18%, transparent))",
                  animation: "scanline 2.2s linear infinite",
                }}
              />
            </div>

            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-400" />
              <div className="absolute inset-0 animate-glow-breathe rounded-full bg-emerald-400/20 blur-xl" />
            </div>

            <p className="relative mt-8 font-mono text-sm text-emerald-200">
              {SCAN_STEPS[step]}
            </p>
            <p className="relative mt-2 font-display text-lg text-mist">
              Analyzing {business}
            </p>

            <div className="relative mt-6 h-1 w-full max-w-sm overflow-hidden rounded-full bg-emerald-500/10">
              <motion.div
                className="h-full rounded-full bg-emerald-400 glow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="relative mt-3 font-mono text-[11px] tabular-nums text-haze">
              {Math.round(progress)}%
            </p>
          </motion.div>
        )}

        {/* ---------- DONE ---------- */}
        {phase === "done" && result && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Audit · {result.niche}</Eyebrow>
                <h3 className="display-xl mt-3 text-2xl text-mist sm:text-3xl">
                  {result.business}
                </h3>
              </div>
              {result.visit > 1 && (
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-200">
                  Checked {result.visit}× · gap widening
                </span>
              )}
            </div>

            {/* headline number */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div>
                <div className="flex items-end gap-3">
                  <CountUp
                    to={result.competitorsAhead}
                    className="font-display text-7xl font-bold leading-none text-glow-emerald sm:text-8xl"
                  />
                  <span className="pb-2 text-lg text-fog">competitors</span>
                </div>
                <p className="mt-2 text-xl text-mist">
                  are ranking <span className="text-emerald-300">ahead of you</span>.
                </p>

                <div className="mt-6 space-y-3">
                  <Metric
                    icon={<TrendingDown className="h-4 w-4" />}
                    label="Leads slipping to them / month"
                    value={<CountUp to={result.lostLeadsPerMonth} prefix="≈ " />}
                  />
                  <Metric
                    icon={<Bot className="h-4 w-4" />}
                    label="AI answers that skip you"
                    value={<CountUp to={result.aiInvisibility} suffix="%" />}
                  />
                  <Metric
                    icon={<Search className="h-4 w-4" />}
                    label="Your current best position"
                    value={<>#{result.currentRank}</>}
                  />
                </div>
              </div>

              {/* gap visual */}
              <div className="rounded-2xl border border-emerald-400/10 bg-black-matte/40 p-5">
                <GapVisual
                  competitorsAhead={result.competitorsAhead}
                  seedKey={`${result.business}-${result.visit}`}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 border-t border-emerald-400/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-fog">
                Good news: every one of those positions is winnable. We&apos;ve
                done it{" "}
                <span className="text-emerald-300">120+ times</span>.
              </p>
              <div className="flex gap-2">
                <GlowButton href="/contact">Close the gap →</GlowButton>
                <GlowButton onClick={reset} variant="ghost">
                  Run another
                </GlowButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-emerald-400/10 bg-white/[0.02] px-4 py-3">
      <span className="flex items-center gap-2.5 text-sm text-fog">
        <span className="text-emerald-400">{icon}</span>
        {label}
      </span>
      <span className="font-display text-lg font-semibold tabular-nums text-mist">
        {value}
      </span>
    </div>
  );
}
