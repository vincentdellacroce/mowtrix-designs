import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Compact MOWTRIX wordmark with the client's "M" logo mark (white legs/
    diagonals + emerald inner chevron, transparent background — recolored
    from the source art for use on dark nav/footer surfaces). */
export default function Wordmark({
  className,
  href = "/",
}: {
  className?: string;
  href?: string | null;
}) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo-mark.png"
        alt=""
        aria-hidden
        width={558}
        height={463}
        priority
        className="h-6 w-auto"
      />
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
