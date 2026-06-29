"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Matrix-rain preloader that ONLY appears on slow connections (or when the
 * page is genuinely still loading). Fast visitors skip straight to the hero.
 * Force-preview it any time with ?matrix=1 in the URL.
 */
export default function MatrixPreloader() {
  const [show, setShow] = useState(false);
  const [decided, setDecided] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- decide whether to show ---
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const params = new URLSearchParams(window.location.search);
    const forced =
      params.get("matrix") === "1" || window.location.hash === "#matrix";

    if (forced) {
      setShow(true);
      setDecided(true);
      return;
    }
    if (reduced) {
      setDecided(true);
      return;
    }

    // Network Information API — the "is the wifi bad?" check
    const conn = (
      navigator as Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      }
    ).connection;
    const slow =
      !!conn &&
      (conn.saveData === true ||
        ["slow-2g", "2g", "3g"].includes(conn.effectiveType || ""));

    // also show if the document is still genuinely loading after a beat
    const stillLoading = document.readyState !== "complete";

    if (slow || stillLoading) {
      setShow(slow || stillLoading);
    }
    setDecided(true);
  }, []);

  // --- dismiss timing ---
  useEffect(() => {
    if (!show) return;
    const start = performance.now();
    const MIN = 1300; // let the animation read
    const MAX = 4200;

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN - elapsed);
      window.setTimeout(() => setShow(false), wait);
    };

    if (document.readyState === "complete") {
      window.setTimeout(finish, 200);
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    const hardStop = window.setTimeout(() => setShow(false), MAX);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(hardStop);
    };
  }, [show]);

  // --- the rain ---
  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const font = 16;
    let cols = Math.floor(w / font);
    let drops = new Array(cols).fill(0).map(() => Math.random() * -40);
    const chars =
      "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈ0123456789MOWTRIX".split("");

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.floor(w / font);
      drops = new Array(cols).fill(0).map(() => Math.random() * -40);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(5, 8, 7, 0.16)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${font}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[(Math.random() * chars.length) | 0];
        const x = i * font;
        const y = drops[i] * font;
        // leading glyph bright, trail dim
        ctx.fillStyle = "rgba(43, 255, 158, 0.9)";
        ctx.shadowColor = "rgba(43,255,158,0.8)";
        ctx.shadowBlur = 8;
        ctx.fillText(ch, x, y);
        ctx.shadowBlur = 0;
        if (y > h && Math.random() > 0.975) drops[i] = Math.random() * -20;
        drops[i] += 0.6;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [show]);

  if (!decided) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-void"
        >
          <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(5,8,7,0.7))]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <div className="font-display text-3xl font-semibold tracking-[0.4em] text-mist text-shadow-glow">
              MOW<span className="text-emerald-300">TRIX</span>
            </div>
            <div className="mx-auto mt-5 h-px w-44 overflow-hidden bg-emerald-500/20">
              <div className="h-full w-1/2 shimmer" />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-haze">
              Optimizing the matrix
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
