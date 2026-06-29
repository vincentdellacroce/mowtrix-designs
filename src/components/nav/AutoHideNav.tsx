"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Wordmark from "@/components/ui/Wordmark";
import GlowButton from "@/components/ui/GlowButton";
import { NAV_LINKS } from "./nav-config";
import { cn } from "@/lib/utils";

export default function AutoHideNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300",
          scrolled ? "glass" : "bg-transparent"
        )}
      >
        <Wordmark />
        <ul className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm transition-colors duration-200",
                    active ? "text-emerald-300" : "text-fog hover:text-mist"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <GlowButton href="/contact" className="px-5 py-2 text-sm">
          Book a call
        </GlowButton>
      </nav>
    </motion.header>
  );
}
