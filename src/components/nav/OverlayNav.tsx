"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Wordmark from "@/components/ui/Wordmark";
import GlowButton from "@/components/ui/GlowButton";
import { NAV_LINKS } from "./nav-config";

export default function OverlayNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Wordmark />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="glass group flex h-11 w-11 items-center justify-center rounded-full transition-shadow hover:glow-sm"
          >
            <div className="relative h-3.5 w-5">
              <span
                className="absolute left-0 top-0 h-[2px] w-full rounded bg-emerald-300 transition-all duration-300"
                style={{
                  transform: open ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="absolute left-0 top-[6px] h-[2px] w-full rounded bg-emerald-300 transition-all duration-200"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 top-[12px] h-[2px] w-full rounded bg-emerald-300 transition-all duration-300"
                style={{
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40"
          >
            <div className="absolute inset-0 bg-void/85 backdrop-blur-2xl" />
            <nav className="relative z-10 flex h-full flex-col items-center justify-center gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: 0.12 + i * 0.07,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    className="font-display text-5xl font-semibold tracking-tight text-mist transition-all duration-300 hover:text-glow-emerald hover:text-shadow-glow sm:text-7xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <GlowButton href="/contact" variant="primary">
                  Book a call →
                </GlowButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
