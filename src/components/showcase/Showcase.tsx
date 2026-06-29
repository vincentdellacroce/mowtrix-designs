"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROJECTS } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Trades", "Food", "Products", "Personal"] as const;
type Filter = (typeof FILTERS)[number];

export default function Showcase({
  limit,
  showFilters = true,
}: {
  limit?: number;
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("All");

  let list = PROJECTS.filter(
    (p) => filter === "All" || p.category === filter
  );
  if (limit) list = list.slice(0, limit);

  return (
    <div>
      {showFilters && (
        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                  active ? "text-mist" : "text-fog hover:text-mist"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full border border-emerald-400/40 bg-emerald-500/15 glow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
