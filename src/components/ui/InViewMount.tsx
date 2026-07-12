"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Perf gate for decorative effects (WebGL shaders, timer-driven SVG).
 * Children only mount while the wrapper is near the viewport, so offscreen
 * effects cost zero GPU/CPU. Ambient visuals restart on re-entry — fine for
 * noise/gradients, don't use for stateful UI.
 */
export default function InViewMount({
  children,
  className,
  rootMargin = "160px",
}: {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    // The spec guarantees an initial callback shortly after observe(). If it
    // never arrives (broken/emulated environments), fail OPEN — a decorative
    // effect that always runs beats one that never appears.
    let delivered = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        delivered = true;
        setInView(entry.isIntersecting);
      },
      { rootMargin }
    );
    io.observe(el);
    const failOpen = window.setTimeout(() => {
      if (!delivered) setInView(true);
    }, 600);
    return () => {
      io.disconnect();
      clearTimeout(failOpen);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} aria-hidden>
      {inView ? children : null}
    </div>
  );
}
