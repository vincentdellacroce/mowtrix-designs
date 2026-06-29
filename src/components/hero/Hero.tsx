"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Landscape from "@/components/ui/Landscape";
import GlowButton from "@/components/ui/GlowButton";
import { Eyebrow } from "@/components/ui/atoms";
import ScrollLetter from "./ScrollLetter";

const WORD = "MOWTRIX".split("");

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // background landscape resolves from grid
  const bgScale = useTransform(scrollYProgress, [0, 0.6], [1.18, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [0.14, 0.42, 0.72]);
  const bgBrightness = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["brightness(0.4) saturate(0.7)", "brightness(0.95) saturate(1.1)"]
  );
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.25, 0.08]);
  const floorY = useTransform(scrollYProgress, [0, 1], [40, -10]);

  // eyebrow fades in early, scroll-hint fades out early
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0.45, 1, 1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // value-prop block appears after the wordmark assembles
  const propOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const propY = useTransform(scrollYProgress, [0.55, 0.85], [40, 0]);

  // ---- reduced-motion: static, no scroll choreography ----
  if (reduced) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 text-center">
        <Landscape
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80"
          alt="Sunlit green valley landscape"
          className="absolute inset-0 opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-void/70" />
        <div className="relative z-10">
          <Eyebrow>SEO · AEO · GEO</Eyebrow>
          <h1 className="display-xl mt-6 text-6xl sm:text-8xl">
            MOW<span className="text-emerald-300">TRIX</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-fog">
            The growth engine for modern trades — engineered to rank on Google
            and the AI everyone now asks.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <GlowButton href="#audit">Run your free audit</GlowButton>
            <GlowButton href="/work" variant="outline">
              See the work
            </GlowButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300vh]">
      {/* sticky stage — the scroll "hijack" */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden grain">
        {/* background landscape, masked by grid early on */}
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity, filter: bgBrightness }}
          className="absolute inset-0"
        >
          <Landscape
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80"
            alt="Sunlit green valley landscape"
            className="absolute inset-0"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent,rgba(5,8,7,0.85))]" />

        {/* receding perspective grid floor */}
        <motion.div
          style={{ opacity: gridOpacity, y: floorY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] [mask-image:linear-gradient(to_top,black,transparent)]"
        >
          <div className="absolute inset-x-[-50%] bottom-0 h-[130%] grid-floor animate-grid-drift" />
        </motion.div>

        {/* content */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <motion.div style={{ opacity: eyebrowOpacity }}>
            <Eyebrow>SEO · AEO · GEO · for modern trades</Eyebrow>
          </motion.div>

          {/* scroll-driven wordmark */}
          <h1
            aria-label="MOWTRIX"
            className="display-xl mt-7 flex text-[19vw] leading-none sm:text-[15vw] lg:text-[13rem]"
          >
            {WORD.map((c, i) => (
              <ScrollLetter
                key={i}
                progress={scrollYProgress}
                index={i}
                total={WORD.length}
                char={c}
              />
            ))}
          </h1>

          {/* value prop appears after assembly */}
          <motion.div
            style={{ opacity: propOpacity, y: propY }}
            className="mt-8 flex max-w-xl flex-col items-center"
          >
            <p className="text-balance text-lg text-fog sm:text-xl">
              The growth engine for modern trades — engineered to rank on
              Google, and on the AI everyone now asks.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <GlowButton href="#audit">Run your free audit</GlowButton>
              <GlowButton href="/work" variant="outline">
                See the work
              </GlowButton>
            </div>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-haze">
            Scroll to enter
            <span className="flex h-9 w-5 justify-center rounded-full border border-emerald-400/40 pt-1.5">
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-1.5 w-1 rounded-full bg-emerald-400"
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
