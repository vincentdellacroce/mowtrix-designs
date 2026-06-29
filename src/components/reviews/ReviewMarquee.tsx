"use client";

import { Star } from "lucide-react";
import { REVIEWS, type Review } from "@/lib/data";
import { GlassCard } from "@/components/ui/atoms";

function Card({ review }: { review: Review }) {
  return (
    <GlassCard className="w-[340px] shrink-0 p-6">
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-emerald-400 text-emerald-400"
            style={{ filter: "drop-shadow(0 0 4px var(--color-emerald-glow))" }}
          />
        ))}
      </div>
      <p className="mt-4 text-pretty leading-relaxed text-mist">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-emerald-400/10 pt-4">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500/15 font-display text-sm font-semibold text-emerald-300">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-mist">{review.name}</div>
          <div className="text-xs text-fog">
            {review.role} · {review.business}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function Row({
  items,
  reverse = false,
}: {
  items: Review[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex shrink-0 gap-5 pr-5 animate-marquee group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((r, i) => (
          <Card key={i} review={r} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewMarquee() {
  const half = Math.ceil(REVIEWS.length / 2);
  return (
    <div className="space-y-5">
      <Row items={REVIEWS.slice(0, half)} />
      <Row items={REVIEWS.slice(half)} reverse />
    </div>
  );
}
