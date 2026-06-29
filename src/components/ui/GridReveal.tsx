"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps content and reveals tiny emerald grid-lines that follow the cursor
 * on hover — the project-card signature interaction. Pure CSS masking +
 * pointer position, no per-frame React state for the grid itself.
 */
export default function GridReveal({
  children,
  className,
  cellSize = 22,
  radius = 130,
}: {
  children: React.ReactNode;
  className?: string;
  cellSize?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn("group relative overflow-hidden", className)}
    >
      {/* grid layer revealed by a radial mask at the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-emerald-glow) 55%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-emerald-glow) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: `${cellSize}px ${cellSize}px`,
          WebkitMaskImage: `radial-gradient(${radius}px circle at var(--gx) var(--gy), black 0%, transparent 70%)`,
          maskImage: `radial-gradient(${radius}px circle at var(--gx) var(--gy), black 0%, transparent 70%)`,
        }}
      />
      {/* soft glow that tracks the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          background:
            "radial-gradient(180px circle at var(--gx) var(--gy), color-mix(in oklab, var(--color-emerald-500) 16%, transparent), transparent 65%)",
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
