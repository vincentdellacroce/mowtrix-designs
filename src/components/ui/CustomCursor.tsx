"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Emerald holographic cursor: a soft glow dot that trails the pointer and
 * a ring that grows + lights up its grid over interactive elements.
 * Only mounts on fine pointers (desktop) and when motion is allowed.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false); // hovering interactive
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let nx = -100;
    let ny = -100;
    const onMove = (e: MouseEvent) => {
      nx = e.clientX;
      ny = e.clientY;
      const t = e.target as HTMLElement;
      setActive(
        !!t.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="target"]'
        )
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    const tick = () => {
      x.set(nx);
      y.set(ny);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* core dot — snappy */}
      <motion.div
        style={{ x, y }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-emerald-glow"
      >
        <div className="h-full w-full rounded-full bg-[var(--color-emerald-glow)] shadow-[0_0_12px_4px_var(--color-emerald-glow)]" />
      </motion.div>

      {/* ring — springy, lights its grid on interactive targets */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: active ? 56 : 30,
          height: active ? 56 : 30,
          opacity: active ? 1 : 0.6,
          scale: down ? 0.82 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="absolute rounded-full border border-[color-mix(in_oklab,var(--color-emerald-400)_70%,transparent)]"
      >
        <div
          className="absolute inset-0 rounded-full transition-opacity duration-200 grid-lines"
          style={{
            opacity: active ? 0.5 : 0,
            backgroundSize: "8px 8px",
            WebkitMaskImage:
              "radial-gradient(circle, black 35%, transparent 70%)",
            maskImage: "radial-gradient(circle, black 35%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}
