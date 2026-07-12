"use client";

import { PROCESS } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/atoms";
import ProcessShapes from "@/components/fx/ProcessShapes";

export default function Process() {
  return (
    <div className="relative">
      <ProcessShapes />
      <Reveal>
        <SectionHeading
          tone="light"
          eyebrow="The method"
          title={
            <>
              How we put you <span className="text-glow-emerald">first</span>.
            </>
          }
          intro="A repeatable system — not guesswork. Every engagement runs the same four phases, tuned to your market."
        />
      </Reveal>

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((step) => (
          <RevealItem key={step.n}>
            <div className="card-light group relative h-full overflow-hidden p-6 transition-shadow duration-300">
              <div className="pointer-events-none absolute -right-6 -top-8 font-display text-8xl font-bold text-[#157a43]/10 transition-colors duration-300 group-hover:text-[#157a43]/20">
                {step.n}
              </div>
              <div className="relative">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2f6e4b]">
                  Phase {step.n}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#0a0f0d]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#41504a]">
                  {step.body}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
