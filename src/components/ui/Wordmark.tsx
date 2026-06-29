import Link from "next/link";
import { cn } from "@/lib/utils";

/** Compact MOWTRIX wordmark with a glowing grid-glyph "M". For nav/footer. */
export default function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string | null;
}) {
  const mark = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-7 w-7 place-items-center rounded-[7px] border border-emerald-400/40 bg-emerald-500/10 transition-shadow duration-300 group-hover:shadow-[0_0_18px_-2px_var(--color-emerald-glow)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path
            d="M3 19V6l5.5 6L12 7l3.5 5L21 6v13"
            fill="none"
            stroke="var(--color-emerald-400)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <span className="pointer-events-none absolute inset-0 rounded-[7px] grid-lines opacity-30 [background-size:6px_6px]" />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-[0.14em] text-mist">
        MOW<span className="text-emerald-300">TRIX</span>
      </span>
    </span>
  );

  if (href === null) return mark;
  return (
    <Link href={href} aria-label="Mowtrix Designs — home">
      {mark}
    </Link>
  );
}
