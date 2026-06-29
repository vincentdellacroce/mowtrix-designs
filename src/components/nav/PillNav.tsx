"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/components/ui/Wordmark";
import GlowButton from "@/components/ui/GlowButton";
import { NAV_LINKS } from "./nav-config";
import { cn } from "@/lib/utils";

export default function PillNav() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass flex w-full max-w-4xl items-center justify-between rounded-full py-2 pl-3 pr-2">
        <Wordmark className="pl-2" />
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                    active
                      ? "text-mist"
                      : "text-fog hover:text-mist"
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30 glow-sm" />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <GlowButton href="/contact" className="px-5 py-2 text-sm">
          Book a call
        </GlowButton>
      </nav>
    </header>
  );
}
