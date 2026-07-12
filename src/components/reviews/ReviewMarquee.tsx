"use client";

import { Star } from "lucide-react";
import { REVIEWS, type Review } from "@/lib/data";

function Card({ review }: { review: Review }) {
  return (
    <div className="card-light w-[340px] shrink-0 rounded-3xl p-6">
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-[#157a43] text-[#157a43]"
          />
        ))}
      </div>
      <p className="mt-4 text-pretty leading-relaxed text-[#1c2620]">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-black/10 pt-4">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0a0f0d] font-display text-sm font-semibold text-emerald-300">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-[#0a0f0d]">{review.name}</div>
          <div className="text-xs text-[#5a6b61]">
            {review.role} · {review.business}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ items }: { items: Review[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex shrink-0 gap-5 pr-5 animate-marquee group-hover:[animation-play-state:paused]">
        {doubled.map((r, i) => (
          <Card key={i} review={r} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewMarquee() {
  return <Row items={REVIEWS} />;
}
