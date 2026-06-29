import { cn } from "@/lib/utils";

/** Small mono eyebrow label with a leading grid tick. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-emerald-300/80",
        className
      )}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-[2px] bg-emerald-400 shadow-[0_0_8px_var(--color-emerald-glow)]" />
      {children}
    </span>
  );
}

export function GlassCard({
  children,
  className,
  strong = false,
}: {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : "glass",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display-xl mt-5 text-4xl text-balance text-mist sm:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-lg leading-relaxed text-fog text-pretty">
          {intro}
        </p>
      )}
    </div>
  );
}
