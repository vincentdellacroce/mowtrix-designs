"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Check, Mail, ArrowRight } from "lucide-react";
import { NICHES } from "@/lib/data";
import { Eyebrow } from "@/components/ui/atoms";
import GlowButton from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

/** Booking link — swap with your real Calendly/Cal.com URL. */
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/mowtrix";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    niche: "Landscaping",
    message: "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Best-effort POST to a form endpoint if configured; never blocks success.
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } catch {
        /* swallow — placeholder */
      }
    }
    setSent(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      {/* left */}
      <div>
        <Eyebrow tone="light">Start the climb</Eyebrow>
        <h2 className="display-xl mt-5 text-4xl text-[#0a0f0d] sm:text-5xl">
          Let&apos;s get you to{" "}
          <span className="text-glow-emerald">#1</span>.
        </h2>
        <p className="mt-5 max-w-md text-lg text-[#41504a]">
          Tell us about your business, or skip the form and grab a time
          directly. We reply to every message within one business day.
        </p>

        <div className="mt-8 space-y-3">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-light group flex items-center justify-between rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0a0f0d] text-emerald-300">
                <Calendar className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-medium text-[#0a0f0d]">
                  Book a strategy call
                </span>
                <span className="block text-sm text-[#5a6b61]">
                  20 min · free · no pressure
                </span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 text-[#157a43] transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="mailto:hello@mowtrix.design"
            className="card-light group flex items-center gap-3 rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0a0f0d] text-emerald-300">
              <Mail className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-medium text-[#0a0f0d]">
                hello@mowtrix.design
              </span>
              <span className="block text-sm text-[#5a6b61]">Prefer email? Say hi.</span>
            </span>
          </a>
        </div>
      </div>

      {/* right: form — dark panel floating on the light band */}
      <div className="card-dark relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Your name"
                  id="name"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  required
                />
                <Field
                  label="Business name"
                  id="business"
                  value={form.business}
                  onChange={(v) => update("business", v)}
                />
              </div>
              <Field
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                required
              />

              <div>
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-haze">
                  Industry
                </span>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => update("niche", n)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-all",
                        form.niche === n
                          ? "border-emerald-400/60 bg-emerald-500/15 text-mist"
                          : "border-emerald-400/15 text-fog hover:border-emerald-400/40"
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-haze"
                >
                  What do you need?
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={4}
                  placeholder="A new site, better rankings, more leads…"
                  className="w-full resize-none rounded-xl border border-emerald-400/20 bg-black-matte/60 px-4 py-3 text-mist placeholder:text-haze transition-colors focus:border-emerald-400/60 focus:outline-none focus:glow-sm"
                />
              </div>

              <GlowButton type="submit" className="w-full justify-center py-4">
                Send it <ArrowRight className="h-4 w-4" />
              </GlowButton>
            </motion.form>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <div className="relative">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-300 glow-md">
                  <Check className="h-8 w-8" />
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-mist">
                Message received.
              </h3>
              <p className="mt-2 max-w-xs text-fog">
                We&apos;ll be in touch within one business day. Want to talk
                sooner?
              </p>
              <GlowButton href={BOOKING_URL} className="mt-6" variant="outline">
                Book a call now
              </GlowButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-haze"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-emerald-400/20 bg-black-matte/60 px-4 py-3 text-mist placeholder:text-haze transition-colors focus:border-emerald-400/60 focus:outline-none focus:glow-sm"
      />
    </div>
  );
}
