"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavVariant } from "./NavProvider";
import { NAV_VARIANTS } from "./nav-config";
import { cn } from "@/lib/utils";

/**
 * TEMPORARY chooser so you can compare the three nav styles live.
 * Once you pick one: set the default in NavProvider, delete the other two
 * nav components, SiteNav's switch, and this file.
 */
export default function NavSwitcher() {
  const { variant, setVariant } = useNavVariant();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-[60] print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mb-3 w-56 rounded-2xl p-2"
          >
            <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-haze">
              Nav style · preview
            </p>
            {NAV_VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariant(v.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                  variant === v.id
                    ? "bg-emerald-500/15 text-mist"
                    : "text-fog hover:bg-white/5 hover:text-mist"
                )}
              >
                {v.label}
                {variant === v.id && (
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_var(--color-emerald-glow)]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="glass-strong flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-fog transition-shadow hover:glow-sm hover:text-mist"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Nav style
      </button>
    </div>
  );
}
