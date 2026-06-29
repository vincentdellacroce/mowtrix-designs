"use client";

import { PROCESS } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GlassCard, SectionHeading } from "@/components/ui/atoms";

export default function Process() {
  return (
    <div>
      <Reveal>
        <SectionHeading
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
            <GlassCard className="group relative h-full overflow-hidden p-6 transition-colors duration-300 hover:border-emerald-400/30">
              <div className="pointer-events-none absolute -right-6 -top-8 font-display text-8xl font-bold text-emerald-500/10 transition-colors duration-300 group-hover:text-emerald-500/20">
                {step.n}
              </div>
              <div className="relative">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300/70">
                  Phase {step.n}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-mist">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">
                  {step.body}
                </p>
              </div>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
