import { cn } from "@/lib/utils";

/** Consistent section rhythm + max width. */
export default function Section({
  id,
  children,
  className,
  size = "default",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "tight" | "wide";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-5 sm:px-8",
        size === "tight" ? "py-16 sm:py-20" : "py-24 sm:py-32",
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
