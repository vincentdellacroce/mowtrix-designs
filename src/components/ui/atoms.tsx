import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

/** Small mono eyebrow label with a leading tick. Tone-aware. */
export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em]",
        tone === "light" ? "text-[#2f6e4b]" : "text-emerald-300/80",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-1 w-1 rounded-full",
          tone === "light" ? "bg-[#157a43]" : "bg-emerald-400/80"
        )}
      />
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
  tone = "dark",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "display-xl mt-5 text-4xl text-balance sm:text-5xl",
          tone === "light" ? "text-[#0a0f0d]" : "text-mist"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            tone === "light" ? "text-[#41504a]" : "text-fog"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
