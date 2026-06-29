"use client";

import { cn } from "@/lib/utils";

/**
 * The always-present (but quiet) Matrix grid. Sits behind content, masked
 * to a soft radial so it never competes with the foreground. Optional
 * perspective "floor" variant for hero/section bases.
 */
export default function AmbientGrid({
  variant = "plane",
  className,
  drift = true,
}: {
  variant?: "plane" | "floor";
  className?: string;
  drift?: boolean;
}) {
  if (variant === "floor") {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden [mask-image:linear-gradient(to_top,black,transparent)]",
          className
        )}
      >
        <div
          className={cn(
            "absolute inset-x-[-50%] bottom-0 h-[120%] grid-floor",
            drift && "animate-grid-drift"
          )}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 grid-lines grid-mask-radial opacity-[0.12]",
          drift && "animate-grid-drift"
        )}
      />
    </div>
  );
}
