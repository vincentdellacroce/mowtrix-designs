"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "@/components/ui/Wordmark";
import GlowButton from "@/components/ui/GlowButton";
import { NAV_LINKS } from "./nav-config";
import { cn } from "@/lib/utils";

export default function PillNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-6 transition-all duration-500",
        scrolled
          ? "bg-void/80 py-3 backdrop-blur-md border-b border-white/5"
          : "py-5 bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Wordmark />
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200",
                    active ? "text-emerald-300" : "text-fog hover:text-mist"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <GlowButton href="/contact" variant="outline" className="px-5 py-2 text-sm">
          Book a call
        </GlowButton>
      </nav>
    </header>
  );
}
