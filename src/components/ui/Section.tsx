import { cn } from "@/lib/utils";

/** Consistent section rhythm + max width. */
export default function Section({
  id,
  children,
  className,
  size = "default",
  tone = "dark",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "tight" | "wide";
  /** light = sage band with black type; dark = forest/void band */
  tone?: "dark" | "light";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-5 sm:px-8",
        size === "tight" ? "py-20 sm:py-24" : "py-28 sm:py-40",
        tone === "light" && "section-light",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          size === "wide" ? "max-w-7xl" : "max-w-6xl"
        )}
      >
        {children}
      </div>
    </section>
  );
}
