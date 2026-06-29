"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Landscape from "@/components/ui/Landscape";
import GridReveal from "@/components/ui/GridReveal";
import type { Project } from "@/lib/data";

/** A live-site mockup in a sleek browser frame. Hover lights the grid. */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      layout
      href={`https://${project.url}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group block"
    >
      <GridReveal className="rounded-2xl glass transition-transform duration-500 group-hover:-translate-y-1">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-emerald-400/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/10" />
          <div className="ml-3 flex-1 truncate rounded-md bg-black-matte/60 px-3 py-1 font-mono text-[11px] text-haze">
            {project.url}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-300/70">
            {project.category}
          </span>
        </div>

        {/* screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Landscape
            src={project.image}
            alt={`${project.name} website`}
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            imgClassName="transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-matte via-black-matte/10 to-transparent" />

          {/* accent stat chip */}
          <div className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1.5">
            <span className="font-display text-sm font-bold text-emerald-300">
              {project.accentStat.value}
            </span>{" "}
            <span className="text-[11px] text-fog">
              {project.accentStat.label}
            </span>
          </div>

          {/* results — slide up on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex gap-4">
              {project.results.map((r) => (
                <div key={r.label}>
                  <div className="font-display text-lg font-bold text-emerald-300">
                    {r.value}
                  </div>
                  <div className="text-[11px] leading-tight text-fog">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-mist">
              {project.name}
            </h3>
            <p className="text-sm text-fog">{project.tagline}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/20 text-emerald-300 transition-all duration-300 group-hover:border-emerald-400/60 group-hover:glow-sm">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </GridReveal>
    </motion.a>
  );
}
