"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * A single wordmark letter that "renders in" from the grid as the user
 * scrolls. Each letter has a staggered scroll window. Transform/opacity
 * only → stays 60fps.
 */
export default function ScrollLetter({
  progress,
  index,
  total,
  char,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  char: string;
}) {
  const span = 0.4;
  const start = 0.08 + (index / total) * span;
  const end = start + 0.22;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [70, 0]);
  const blur = useTransform(progress, [start, end], [16, 0]);
  const rotateX = useTransform(progress, [start, end], [70, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const accent = char === "T" || char === "R" || char === "I" || char === "X";

  return (
    <motion.span
      style={{ opacity, y, rotateX, filter, transformPerspective: 800 }}
      className={
        "inline-block will-change-transform text-shadow-glow " +
        (accent ? "text-emerald-300" : "text-mist")
      }
    >
      {char}
    </motion.span>
  );
}
