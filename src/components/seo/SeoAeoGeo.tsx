"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Sparkles, Bot, Check } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "seo", label: "SEO", icon: Search },
  { id: "aeo", label: "AEO", icon: Sparkles },
  { id: "geo", label: "GEO", icon: Bot },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function SeoAeoGeo() {
  const [tab, setTab] = useState<TabId>("seo");
  const service = SERVICES.find((s) => s.id === tab)!;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* left: tabs + copy */}
      <div>
        <div className="inline-flex gap-1 rounded-full glass p-1">
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                  active ? "text-mist" : "text-fog hover:text-mist"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="seo-tab"
                    className="absolute inset-0 rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/40"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <t.icon className="relative h-4 w-4" />
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <h3 className="font-display text-2xl font-semibold text-mist">
              {service.title}
            </h3>
            <p className="mt-3 max-w-md text-fog">{service.blurb}</p>
            <ul className="mt-6 space-y-3">
              {service.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-mist">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-300">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* right: the "show, don't tell" demo */}
      <div className="card-dark relative min-h-[380px] overflow-hidden rounded-xl p-6">
        <div className="relative mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-haze">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_var(--color-emerald-glow)]" />
          live demo
        </div>
        <AnimatePresence mode="wait">
          {tab === "seo" && <SeoDemo key="seo" />}
          {tab === "aeo" && <AeoDemo key="aeo" />}
          {tab === "geo" && <GeoDemo key="geo" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="relative space-y-2.5"
    >
      {children}
    </motion.div>
  );
}

function SeoDemo() {
  return (
    <Panel>
      <div className="flex items-center gap-2 rounded-full bg-black-matte/70 px-4 py-2.5 text-sm text-fog">
        <Search className="h-4 w-4 text-emerald-400/70" />
        landscaper near me
      </div>
      {/* winner */}
      <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-3 glow-sm">
        <div className="flex items-center gap-2">
          <span className="rounded bg-emerald-400 px-1.5 py-0.5 font-mono text-[9px] font-bold text-black-matte">
            #1
          </span>
          <span className="text-sm font-medium text-mist">
            Evergreen Grounds Co.
          </span>
        </div>
        <p className="mt-1 text-xs text-emerald-200/80">
          ★ 4.9 · 318 reviews · Open now · evergreengrounds.co
        </p>
      </div>
      {/* losers */}
      {["A Cut Above Lawns", "GreenLeaf Landscaping", "Yardworks Pro"].map(
        (n, i) => (
          <div
            key={n}
            className="rounded-xl border border-white/5 px-3 py-2.5 opacity-50"
          >
            <span className="font-mono text-[10px] text-haze">#{i + 4}</span>{" "}
            <span className="text-sm text-fog">{n}</span>
          </div>
        )
      )}
    </Panel>
  );
}

function AeoDemo() {
  return (
    <Panel>
      <p className="text-sm text-fog">Featured snippet · &ldquo;best time to aerate a lawn?&rdquo;</p>
      <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 glow-sm">
        <p className="text-sm leading-relaxed text-mist">
          The best time to aerate cool-season lawns is early fall, when grass
          recovers fastest…
        </p>
        <div className="mt-3 flex items-center gap-2 border-t border-emerald-400/15 pt-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-[10px] font-bold text-black-matte">
            E
          </span>
          <span className="text-xs text-emerald-200">
            Source: <span className="font-medium">Evergreen Grounds Co.</span>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {["People also ask", "Rich result", "Voice answer"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-emerald-400/20 px-2.5 py-1 font-mono text-[10px] text-fog"
          >
            {t}
          </span>
        ))}
      </div>
    </Panel>
  );
}

function GeoDemo() {
  return (
    <Panel>
      <div className="flex items-center gap-2 text-sm text-fog">
        <Bot className="h-4 w-4 text-emerald-400" /> You asked an AI assistant:
      </div>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-white/5 px-4 py-2.5 text-sm text-mist">
        Who should I hire to landscape my backyard?
      </div>
      <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm leading-relaxed text-mist glow-sm">
        Based on reviews and local results, I&apos;d recommend{" "}
        <span className="font-semibold text-emerald-200">
          Evergreen Grounds Co.
        </span>{" "}
        — they specialize in full design-build projects and have outstanding
        ratings.
        <div className="mt-2 flex items-center gap-1.5">
          <span className="rounded bg-emerald-400/20 px-1.5 py-0.5 font-mono text-[9px] text-emerald-200">
            cited ↗ evergreengrounds.co
          </span>
        </div>
      </div>
    </Panel>
  );
}
