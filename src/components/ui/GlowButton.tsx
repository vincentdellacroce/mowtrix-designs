"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  magnetic?: boolean;
  "aria-label"?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-emerald-500/15 text-mist border border-emerald-400/40 hover:bg-emerald-400/25",
  ghost: "text-fog hover:text-mist border border-transparent",
  outline:
    "text-mist border border-emerald-300/25 hover:border-emerald-300/60 bg-white/[0.02]",
};

/**
 * Magnetic, glowing button. Pulls subtly toward the cursor and emits a
 * faint emerald glow that intensifies on hover.
 */
export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  magnetic = true,
  ...rest
}: GlowButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 18 });
  const y = useSpring(my, { stiffness: 250, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    mx.set(relX * 0.28);
    my.set(relY * 0.32);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
    setHover(false);
  };

  const inner = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300",
        variants[variant],
        hover && variant === "primary" && "glow-md",
        hover && variant !== "primary" && "glow-sm",
        className
      )}
    >
      {/* sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120px 60px at var(--mx,50%) 50%, color-mix(in oklab, var(--color-emerald-glow) 28%, transparent), transparent 70%)",
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    const external = href.startsWith("http");
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    ) : (
      <Link href={href} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
