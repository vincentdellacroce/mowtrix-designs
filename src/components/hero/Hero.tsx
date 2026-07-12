"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { MeshGradient } from "@/components/ui/mesh-gradient";
import { ScrambleText } from "@/components/ui/modern-animated-hero-section";
import GlowButton from "@/components/ui/GlowButton";
import { ONE_FORM } from "@/lib/data";
import { cn, mixHex } from "@/lib/utils";
import { RankChart, StatTiles } from "./scenes";
import { SampleCard, SampleFormOverlay } from "./SampleForm";

/* ⬇️ EDIT THIS to change the journey: phrase = what the title scrambles to,
   colors = the mesh-gradient mood for that chapter, until = where the
   chapter ends in scroll progress (0–1). */
const CHAPTERS = [
  {
    phrase: "MOWTRIX DESIGNS",
    until: 0.3,
    colors: ["#b3d2a6", "#dcead2", "#f4f6ef", "#fcfdfb"], // light sage → white
    dark: false,
  },
  {
    phrase: "One Form, One Week, One Call",
    until: 0.66,
    colors: ["#020d07", "#0d2f1f", "#14522f", "#03130a"], // deep forest
    dark: true,
  },
  {
    phrase: "Rank Higher, Grow Quicker",
    until: 1.01,
    colors: ["#3fe62e", "#9dff62", "#0b3a15", "#041a09"], // neon green
    dark: true,
  },
] as const;

function chapterAt(v: number) {
  for (let i = 0; i < CHAPTERS.length; i++) {
    if (v < CHAPTERS[i].until) return i;
  }
  return CHAPTERS.length - 1;
}

/* Gradient isolated in its own component so the 60fps color tween only
   re-renders the shader, never the whole stage. */
function HeroGradient({ chapter, frozen }: { chapter: number; frozen: boolean }) {
  const [colors, setColors] = useState<string[]>([...CHAPTERS[0].colors]);
  const current = useRef<string[]>([...CHAPTERS[0].colors]);
  const anim = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const to = CHAPTERS[chapter].colors;
    const from = [...current.current];
    anim.current?.stop();
    anim.current = animate(0, 1, {
      duration: frozen ? 0 : 1.2,
      ease: "easeInOut",
      onUpdate: (t) => {
        const mixed = from.map((f, i) => mixHex(f, to[i], t));
        current.current = mixed;
        setColors(mixed);
      },
    });
    return () => anim.current?.stop();
  }, [chapter, frozen]);

  return (
    <MeshGradient
      colors={colors}
      distortion={0.9}
      swirl={0.65}
      grainMixer={0.26}
      grainOverlay={0.1}
      speed={frozen ? 0 : 0.4}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [chapter, setChapter] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const c = chapterAt(v);
    setChapter((prev) => (prev === c ? prev : c));
  });

  const exitFade = useTransform(scrollYProgress, [0.92, 1], [0, 1]);

  const docked = chapter > 0;
  const dark = CHAPTERS[chapter].dark;

  /* ---- reduced motion: no pinning, chapters stack as calm sections ---- */
  if (reduced) {
    return (
      <>
        <section className="relative overflow-hidden">
          <div
            className="px-6 pb-24 pt-44 text-center"
            style={{ background: "linear-gradient(160deg,#cfe3c4,#f4f6ef 70%)" }}
          >
            <h1 className="font-display text-5xl font-semibold tracking-tight text-[#0a0f0d] sm:text-7xl">
              MOWTRIX DESIGNS
            </h1>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <GlowButton variant="solid" onClick={() => setFormOpen(true)}>
                Get a free sample
              </GlowButton>
              <GlowButton variant="solid" href="/work">
                View the work
              </GlowButton>
            </div>
          </div>
          <div className="bg-[#06120b] px-6 py-24">
            <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-semibold text-mist">
                  {ONE_FORM.title}
                </h2>
                <div className="mt-6 space-y-5">
                  {ONE_FORM.paragraphs.map((p) => (
                    <p key={p.slice(0, 16)} className="leading-relaxed text-[#cfe6d8]">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <SampleCard onOpen={() => setFormOpen(true)} />
            </div>
          </div>
          <div className="bg-[#0d3f1c] px-6 py-24">
            <div className="mx-auto max-w-5xl">
              <h2 className="font-display text-3xl font-semibold text-mist">
                Rank Higher, Grow Quicker
              </h2>
              <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
                <RankChart />
                <StatTiles />
              </div>
            </div>
          </div>
        </section>
        <SampleFormOverlay open={formOpen} onClose={() => setFormOpen(false)} />
      </>
    );
  }

  return (
    <>
      <section ref={ref} className="relative h-[400vh]">
        {/* pinned stage */}
        <div className="sticky top-0 h-screen overflow-hidden bg-void">
          {/* the moving gradient — colors morph per chapter */}
          <div className="absolute inset-0">
            <HeroGradient chapter={chapter} frozen={false} />
          </div>

          {/* soft edge vignette on dark chapters for depth (never glitches) */}
          <motion.div
            animate={{ opacity: dark ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_100%_at_50%_45%,transparent_55%,rgba(2,8,5,0.55))]"
          />

          {/* title — center stage, then glitches while docking TOP-LEFT */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-20 flex px-[6vw]",
              docked
                ? "items-start justify-start pt-[9vh]"
                : "items-center justify-center"
            )}
          >
            <motion.h1
              layout
              transition={{ layout: { type: "spring", stiffness: 110, damping: 22 } }}
              animate={{ color: dark ? "#f2fbf5" : "#0a0f0d" }}
              className={cn(
                "font-display font-semibold tracking-tight",
                docked
                  ? "text-2xl sm:text-4xl lg:text-5xl"
                  : "whitespace-nowrap text-[9vw] sm:text-6xl lg:text-8xl"
              )}
            >
              <ScrambleText text={CHAPTERS[chapter].phrase} />
            </motion.h1>
          </div>

          {/* chapter content — smooth fade/slide, NO glitch on design */}
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-[6vw] bottom-[6vh] top-[20vh] z-10"
            >
              {chapter === 0 && (
                <div className="flex h-full items-center justify-center pt-[26vh]">
                  <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
                    <GlowButton variant="solid" onClick={() => setFormOpen(true)}>
                      Get a free sample
                    </GlowButton>
                    <GlowButton variant="solid" href="/work">
                      View the work
                    </GlowButton>
                  </div>
                </div>
              )}

              {chapter === 1 && (
                <div className="flex h-full items-center">
                  <div className="grid w-full items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
                    <div className="max-w-xl space-y-5 sm:space-y-7">
                      {ONE_FORM.paragraphs.map((p, i) => (
                        <motion.p
                          key={p.slice(0, 16)}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.12 }}
                          className="text-sm leading-relaxed text-[#d3ecdd] sm:text-base"
                        >
                          {p}
                        </motion.p>
                      ))}
                    </div>
                    <div className="pointer-events-auto flex md:justify-end">
                      <SampleCard onOpen={() => setFormOpen(true)} />
                    </div>
                  </div>
                </div>
              )}

              {chapter === 2 && (
                <div className="flex h-full items-center">
                  <div className="grid w-full items-center gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
                    <RankChart />
                    <StatTiles />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* scroll hint — bottom right, adapts to chapter mood */}
          <motion.div
            animate={{
              color: dark ? "rgba(235,255,244,0.55)" : "rgba(10,15,13,0.5)",
              opacity: chapter === 2 ? 0 : 1,
            }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute bottom-7 right-[6vw] z-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            Scroll for more
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </motion.div>

          {/* hand-off fade into the dark page below */}
          <motion.div
            style={{ opacity: exitFade }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-void to-transparent"
          />
        </div>
      </section>

      <SampleFormOverlay open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
