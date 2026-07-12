"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Landscape from "@/components/ui/Landscape";
import type { Project } from "@/lib/data";

/** A live-site mockup in a clean white browser frame (light bands). */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      layout
      href={`https://${project.url}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group block"
    >
      <div className="card-light relative overflow-hidden rounded-3xl transition-transform duration-500 group-hover:-translate-y-1">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-black/5 bg-[#edf2e8] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/5" />
          <div className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 font-mono text-[11px] text-[#5a6b61]">
            {project.url}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#2f6e4b]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-transparent opacity-70" />

          {/* accent stat chip */}
          <div className="absolute left-4 top-4 rounded-full bg-[#0a0f0d]/90 px-3 py-1.5">
            <span className="font-display text-sm font-bold text-emerald-300">
              {project.accentStat.value}
            </span>{" "}
            <span className="text-[11px] text-white/70">
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
                  <div className="text-[11px] leading-tight text-white/75">
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
            <h3 className="font-display text-lg font-semibold text-[#0a0f0d]">
              {project.name}
            </h3>
            <p className="text-sm text-[#5a6b61]">{project.tagline}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#0a0f0d] transition-all duration-300 group-hover:border-[#0a0f0d] group-hover:bg-[#0a0f0d] group-hover:text-emerald-300">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}
