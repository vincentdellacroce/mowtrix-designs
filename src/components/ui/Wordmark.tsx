import Link from "next/link";
import { cn } from "@/lib/utils";

/** Line-art "M" monogram — outer legs + diagonals in the current text
    color, inner chevron in brand emerald. Matches the standalone mark
    (no badge/container), so it works on any background. */
function MowtrixMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        d="M18 20 L18 80 M18 20 L46 54 M82 20 L82 80 M82 20 L54 54"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
      <path
        d="M34 46 L50 66 L66 46"
        fill="none"
        stroke="var(--color-emerald-400)"
        strokeWidth="7"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/** Compact MOWTRIX wordmark with the line-art "M" monogram. For nav/footer. */
export default function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string | null;
}) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <MowtrixMark className="h-6 w-6 text-mist" />
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
