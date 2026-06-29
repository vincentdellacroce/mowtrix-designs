"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { hashString } from "@/lib/utils";

/**
 * Bright landscape image with a guaranteed-good fallback: if the remote
 * photo fails (offline / blocked), we render an on-brand emerald gradient
 * + grid so the layout never breaks or looks unintentional.
 */
export default function Landscape({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hue = 140 + (hashString(src) % 40); // emerald-ish variance

  return (
    <div className={cn("relative overflow-hidden bg-black-matte", className)}>
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <div
          aria-label={alt}
          role="img"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 90% at 30% 20%, hsl(${hue} 70% 30%), transparent 60%), linear-gradient(160deg, #0d2f1f, #050807 70%)`,
          }}
        >
          <div className="absolute inset-0 grid-lines opacity-20 [background-size:34px_34px]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 grid-floor opacity-40" />
        </div>
      )}
    </div>
  );
}
