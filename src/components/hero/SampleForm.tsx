"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import { NICHES } from "@/lib/data";
import { cn } from "@/lib/utils";

/* The "one form" — a white teaser card in chapter 2 that expands to fill
   the whole page when clicked (shared layoutId), holding the 30-second
   free-sample form. Light, minimal, black-on-white with one green accent. */

export function SampleCard({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      layoutId="sample-form"
      onClick={onOpen}
      whileHover={{ y: -3 }}
      className="w-full max-w-sm cursor-pointer rounded-xl bg-[#f6faf3] p-8 text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] md:justify-self-end"
    >
      <div className="font-display text-2xl font-semibold tracking-tight text-[#0a0f0d]">
        Get your free sample
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#3c4a42]">
        One 30-second form. One week. One call. A real homepage for your
        business — free, no strings.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#0a0f0d] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-emerald-300">
        Start the form <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </motion.button>
  );
}

export function SampleFormOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    business: "",
    niche: "Landscaping",
    area: "",
    different: "",
    email: "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "free-sample", ...form }),
        });
      } catch {
        /* best-effort */
      }
    }
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            layoutId="sample-form"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 overflow-y-auto bg-[#f6faf3] sm:inset-4 sm:rounded-xl lg:inset-8"
          >
            <button
              onClick={onClose}
              aria-label="Close form"
              className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#0a0f0d]/5 text-[#0a0f0d] transition-colors hover:bg-[#0a0f0d]/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-6 py-16 sm:px-10">
              {!sent ? (
                <>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#4b7a5e]">
                    Free sample · 30 seconds
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#0a0f0d] sm:text-4xl">
                    Tell us about your business.
                  </h2>
                  <p className="mt-3 text-[#3c4a42]">
                    We&apos;ll design a real homepage for you within one week —
                    then one quick call and it&apos;s live.
                  </p>

                  <form onSubmit={submit} className="mt-10 space-y-8">
                    <LightField
                      id="business"
                      label="Business name"
                      value={form.business}
                      onChange={(v) => update("business", v)}
                      required
                      placeholder="e.g. Evergreen Grounds Co."
                    />

                    <div>
                      <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#5a6b61]">
                        Your trade
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {NICHES.map((n) => (
                          <button
                            type="button"
                            key={n}
                            onClick={() => update("niche", n)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-sm transition-colors",
                              form.niche === n
                                ? "border-[#0a0f0d] bg-[#0a0f0d] text-emerald-300"
                                : "border-[#0a0f0d]/15 text-[#3c4a42] hover:border-[#0a0f0d]/40"
                            )}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <LightField
                      id="area"
                      label="Service area"
                      value={form.area}
                      onChange={(v) => update("area", v)}
                      placeholder="e.g. North Dallas suburbs"
                    />
                    <LightField
                      id="different"
                      label="What makes you different?"
                      value={form.different}
                      onChange={(v) => update("different", v)}
                      placeholder="Family-run, 15 years, same-week quotes…"
                    />
                    <LightField
                      id="email"
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(v) => update("email", v)}
                      required
                      placeholder="you@business.com"
                    />

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0a0f0d] px-6 py-4 font-mono text-sm uppercase tracking-[0.14em] text-emerald-300 transition-colors hover:text-emerald-200 sm:w-auto"
                    >
                      Send it <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#0a0f0d] text-emerald-300">
                    <Check className="h-8 w-8" />
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-semibold text-[#0a0f0d]">
                    We&apos;re on it.
                  </h2>
                  <p className="mx-auto mt-3 max-w-sm text-[#3c4a42]">
                    Your sample will be ready within one week. We&apos;ll email
                    you the moment it is.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 rounded-md bg-[#0a0f0d] px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-emerald-300"
                  >
                    Back to the site
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LightField({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#5a6b61]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-[#0a0f0d]/20 bg-transparent pb-2.5 text-lg text-[#0a0f0d] placeholder:text-[#9aa8a0] focus:border-[#0a0f0d] focus:outline-none"
      />
    </div>
  );
}
