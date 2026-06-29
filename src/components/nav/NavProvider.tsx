"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { NavVariant } from "./nav-config";

interface NavCtx {
  variant: NavVariant;
  setVariant: (v: NavVariant) => void;
}

const Ctx = createContext<NavCtx | null>(null);
const KEY = "mowtrix.nav.variant";

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariantState] = useState<NavVariant>("pill");

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as NavVariant | null;
    if (saved === "pill" || saved === "overlay" || saved === "autohide") {
      setVariantState(saved);
    }
  }, []);

  const setVariant = (v: NavVariant) => {
    setVariantState(v);
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(() => ({ variant, setVariant }), [variant]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNavVariant() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useNavVariant must be used within NavProvider");
  return ctx;
}
