"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  FileText,
  Images,
  Mail as MailIcon,
  MapPin,
  MessageSquare,
  Share2,
  UserCircle,
  X,
} from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { cn, hashString, seededRandom } from "@/lib/utils";
import Landscape from "@/components/ui/Landscape";

/* The "one form" — a white teaser card in chapter 2 that expands to fill
   the whole page when clicked (shared layoutId). Two-part flow, no way to
   bail between them: Part 1 (name/business/phone/email) sends the lead
   immediately, then Part 2 (project details) follows right after. A logo
   upload becomes required if they pick the cheapest budget tier, since
   that tier skips the custom design pass. */

export function SampleCard({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      layoutId="sample-form"
      onClick={onOpen}
      whileHover={{ y: -3 }}
      className="w-full max-w-sm cursor-pointer bg-[#f6faf3] p-8 text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] md:justify-self-end"
    >
      <div className="font-display text-2xl font-semibold tracking-tight text-[#0a0f0d]">
        Get your free sample
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#3c4a42]">
        One 30-second form. One week. One call. A real homepage for your
        business — free, no strings.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 bg-[#0a0f0d] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-emerald-300">
        Start the form <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </motion.button>
  );
}

/* ---------- data ---------- */

const BUDGET_TIERS = [
  { id: "starting", label: "Starting Out", range: "Under $500/mo" },
  { id: "established", label: "Established", range: "$500 – $750/mo" },
  { id: "certified", label: "Certified", range: "$750 – $1,000/mo" },
  { id: "professional", label: "Professional", range: "$1,000+/mo" },
];

const COLOR_SWATCHES = [
  "#0a0f0d",
  "#f6faf3",
  "#157a43",
  "#2f6e4b",
  "#0f4c81",
  "#1b1f3b",
  "#b5482a",
  "#c9a227",
  "#5b3a29",
  "#6b7280",
  "#c0392b",
  "#5a3d8a",
];

const FEATURES = [
  { id: "contact-form", label: "Contact Form", icon: MessageSquare },
  { id: "quote-form", label: "Quote Request Form", icon: FileText },
  { id: "booking", label: "Appointment Booking", icon: CalendarIcon },
  { id: "maps", label: "Google Maps", icon: MapPin },
  { id: "gallery", label: "Before & After Gallery", icon: Images },
  { id: "social", label: "Social Media Links", icon: Share2 },
  { id: "newsletter", label: "Newsletter Signup", icon: MailIcon },
  { id: "portal", label: "Customer Portal", icon: UserCircle },
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

function nextWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** Deterministic per date+slot so the calendar doesn't reshuffle on re-render. */
function isSlotOpen(key: string, time: string) {
  return seededRandom(hashString(`${key}::${time}`))() > 0.35;
}

async function postLead(payload: Record<string, unknown>, file?: File | null) {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (!endpoint) return;
  try {
    if (file) {
      const fd = new FormData();
      for (const [k, v] of Object.entries(payload)) {
        if (v != null) fd.append(k, typeof v === "string" ? v : JSON.stringify(v));
      }
      fd.append("logo", file, file.name);
      await fetch(endpoint, { method: "POST", mode: "no-cors", body: fd });
    } else {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
  } catch {
    /* best-effort */
  }
}

/* ---------- form state ---------- */

type Step = "lead" | "details" | "done";

/** Cheapest tier skips the custom design pass, so a logo is required. */
const LOGO_REQUIRED_TIER = "starting";

interface LeadForm {
  name: string;
  business: string;
  phone: string;
  email: string;
}

interface DetailsForm {
  business: string;
  area: string;
  budget: string;
  colors: string[];
  theme: string;
  features: string[];
  date: string;
  time: string;
  logo: File | null;
}

const emptyLead: LeadForm = { name: "", business: "", phone: "", email: "" };
const emptyDetails: DetailsForm = {
  business: "",
  area: "",
  budget: "",
  colors: [],
  theme: "",
  features: [],
  date: "",
  time: "",
  logo: null,
};

export function SampleFormOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("lead");
  const [lead, setLead] = useState<LeadForm>(emptyLead);
  const [details, setDetails] = useState<DetailsForm>(emptyDetails);

  const updateLead = (k: keyof LeadForm, v: string) =>
    setLead((f) => ({ ...f, [k]: v }));
  const updateDetails = <K extends keyof DetailsForm>(k: K, v: DetailsForm[K]) =>
    setDetails((f) => ({ ...f, [k]: v }));

  // fresh form every time it's opened
  useEffect(() => {
    if (open) {
      setStep("lead");
      setLead(emptyLead);
      setDetails(emptyDetails);
    }
  }, [open]);

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

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    postLead({ type: "lead-intake", ...lead });
    updateDetails("business", lead.business);
    setStep("details");
  };

  const submitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    const { logo, ...rest } = details;
    postLead({ type: "lead-details", ...lead, ...rest }, logo);
    setStep("done");
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
            className="absolute inset-0 overflow-y-auto bg-[#f6faf3] sm:inset-4 lg:inset-8"
          >
            <button
              onClick={onClose}
              aria-label="Close form"
              className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#0a0f0d]/5 text-[#0a0f0d] transition-colors hover:bg-[#0a0f0d]/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-6 py-16 sm:px-10">
              <AnimatePresence mode="wait">
                {step === "lead" && (
                  <StepShell key="lead">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#4b7a5e]">
                      Free sample · 30 seconds
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#0a0f0d] sm:text-4xl">
                      Tell us about your business.
                    </h2>
                    <p className="mt-3 text-[#3c4a42]">
                      We&apos;ll design a real homepage for you within one
                      week — then one quick call and it&apos;s live.
                    </p>

                    <form onSubmit={submitLead} className="mt-10 space-y-8">
                      <LightField
                        id="name"
                        label="Your name"
                        value={lead.name}
                        onChange={(v) => updateLead("name", v)}
                        required
                        placeholder="Jordan Reyes"
                      />
                      <LightField
                        id="lead-business"
                        label="Business name"
                        value={lead.business}
                        onChange={(v) => updateLead("business", v)}
                        required
                        placeholder="e.g. Evergreen Grounds Co."
                      />
                      <LightField
                        id="phone"
                        label="Phone number"
                        type="tel"
                        value={lead.phone}
                        onChange={(v) => updateLead("phone", v)}
                        required
                        placeholder="(555) 123-4567"
                      />
                      <LightField
                        id="lead-email"
                        label="Email"
                        type="email"
                        value={lead.email}
                        onChange={(v) => updateLead("email", v)}
                        required
                        placeholder="you@business.com"
                      />

                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 bg-[#0a0f0d] px-6 py-4 font-mono text-sm uppercase tracking-[0.14em] text-emerald-300 transition-colors hover:text-emerald-200 sm:w-auto"
                      >
                        Send it <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  </StepShell>
                )}

                {step === "details" && (
                  <StepShell key="details" wide>
                    <span className="grid h-14 w-14 place-items-center bg-[#0a0f0d] text-emerald-300">
                      <Check className="h-7 w-7" />
                    </span>
                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-[#4b7a5e]">
                      Got it, {lead.name.split(" ")[0] || "thanks"} — one more step
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#0a0f0d] sm:text-4xl">
                      Help us prep for the call.
                    </h2>
                    <p className="mt-3 text-[#3c4a42]">
                      A little more on your project so we walk in already
                      prepared. Most of this is optional — fill in what you
                      know.
                    </p>

                    <form onSubmit={submitDetails} className="mt-10 space-y-10">
                      <div className="grid gap-8 sm:grid-cols-2">
                        <LightField
                          id="details-business"
                          label="Business name"
                          value={details.business}
                          onChange={(v) => updateDetails("business", v)}
                          placeholder="e.g. Evergreen Grounds Co."
                        />
                        <LightField
                          id="area"
                          label="Service area"
                          value={details.area}
                          onChange={(v) => updateDetails("area", v)}
                          placeholder="e.g. North Dallas suburbs"
                        />
                      </div>

                      <FieldGroup label="Monthly budget">
                        <div className="grid gap-2 sm:grid-cols-2">
                          {BUDGET_TIERS.map((tier) => (
                            <button
                              type="button"
                              key={tier.id}
                              onClick={() => updateDetails("budget", tier.id)}
                              className={cn(
                                "border px-4 py-3 text-left transition-colors",
                                details.budget === tier.id
                                  ? "border-[#0a0f0d] bg-[#0a0f0d] text-emerald-300"
                                  : "border-[#0a0f0d]/15 text-[#0a0f0d] hover:border-[#0a0f0d]/40"
                              )}
                            >
                              <span className="block text-sm font-medium">
                                {tier.label}
                              </span>
                              <span
                                className={cn(
                                  "block text-xs",
                                  details.budget === tier.id
                                    ? "text-emerald-300/70"
                                    : "text-[#5a6b61]"
                                )}
                              >
                                {tier.range}
                              </span>
                            </button>
                          ))}
                        </div>
                      </FieldGroup>

                      {details.budget === LOGO_REQUIRED_TIER && (
                        <FieldGroup label="Upload your logo (required at this tier)">
                          <p className="mb-3 text-xs text-[#5a6b61]">
                            The Starting Out tier skips a custom design pass,
                            so we build around your existing logo.
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) =>
                              updateDetails("logo", e.target.files?.[0] ?? null)
                            }
                            className="block w-full text-sm text-[#3c4a42] file:mr-4 file:border file:border-[#0a0f0d]/20 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#0a0f0d] file:transition-colors hover:file:border-[#0a0f0d]/40"
                          />
                          {details.logo && (
                            <p className="mt-2 text-xs text-[#5a6b61]">
                              Selected: {details.logo.name}
                            </p>
                          )}
                        </FieldGroup>
                      )}

                      <FieldGroup label="Business colors (up to 3)">
                        <div className="flex flex-wrap items-center gap-3">
                          {COLOR_SWATCHES.map((hex) => {
                            const selected = details.colors.includes(hex);
                            const disabled = !selected && details.colors.length >= 3;
                            return (
                              <button
                                type="button"
                                key={hex}
                                disabled={disabled}
                                aria-label={hex}
                                aria-pressed={selected}
                                onClick={() =>
                                  updateDetails(
                                    "colors",
                                    selected
                                      ? details.colors.filter((c) => c !== hex)
                                      : [...details.colors, hex]
                                  )
                                }
                                className={cn(
                                  "h-9 w-9 border-2 transition-all",
                                  selected
                                    ? "border-[#0a0f0d] scale-110"
                                    : "border-black/10",
                                  disabled && "opacity-30"
                                )}
                                style={{ background: hex }}
                              />
                            );
                          })}
                          <label
                            className={cn(
                              "grid h-9 w-9 cursor-pointer place-items-center border border-dashed text-[#5a6b61] transition-colors",
                              details.colors.length >= 3
                                ? "opacity-30"
                                : "border-[#0a0f0d]/30 hover:border-[#0a0f0d]"
                            )}
                          >
                            +
                            <input
                              type="color"
                              className="sr-only"
                              disabled={details.colors.length >= 3}
                              onChange={(e) => {
                                const hex = e.target.value;
                                if (!details.colors.includes(hex)) {
                                  updateDetails("colors", [...details.colors, hex]);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </FieldGroup>

                      <FieldGroup label="A site style you like">
                        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
                          {PROJECTS.map((p) => {
                            const selected = details.theme === p.slug;
                            return (
                              <button
                                type="button"
                                key={p.slug}
                                onClick={() => updateDetails("theme", p.slug)}
                                className={cn(
                                  "w-36 shrink-0 overflow-hidden border-2 text-left transition-colors",
                                  selected
                                    ? "border-[#0a0f0d]"
                                    : "border-transparent"
                                )}
                              >
                                <div className="relative aspect-[4/3]">
                                  <Landscape
                                    src={p.image}
                                    alt={p.name}
                                    className="absolute inset-0"
                                    sizes="144px"
                                  />
                                  {selected && (
                                    <span className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-[#0a0f0d] text-emerald-300">
                                      <Check className="h-3.5 w-3.5" />
                                    </span>
                                  )}
                                </div>
                                <div className="bg-white px-2.5 py-2 text-xs font-medium text-[#0a0f0d]">
                                  {p.name}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </FieldGroup>

                      <FieldGroup label="Website features">
                        <div className="grid gap-2 sm:grid-cols-2">
                          {FEATURES.map((f) => {
                            const selected = details.features.includes(f.id);
                            const Icon = f.icon;
                            return (
                              <button
                                type="button"
                                key={f.id}
                                onClick={() =>
                                  updateDetails(
                                    "features",
                                    selected
                                      ? details.features.filter((x) => x !== f.id)
                                      : [...details.features, f.id]
                                  )
                                }
                                className={cn(
                                  "flex items-center gap-2.5 border px-3.5 py-2.5 text-left text-sm transition-colors",
                                  selected
                                    ? "border-[#0a0f0d] bg-[#0a0f0d] text-emerald-300"
                                    : "border-[#0a0f0d]/15 text-[#3c4a42] hover:border-[#0a0f0d]/40"
                                )}
                              >
                                <span
                                  className={cn(
                                    "grid h-5 w-5 shrink-0 place-items-center border",
                                    selected
                                      ? "border-emerald-300 bg-emerald-300 text-[#0a0f0d]"
                                      : "border-[#0a0f0d]/25"
                                  )}
                                >
                                  {selected && <Check className="h-3.5 w-3.5" />}
                                </span>
                                <Icon className="h-4 w-4 shrink-0" />
                                {f.label}
                              </button>
                            );
                          })}
                        </div>
                      </FieldGroup>

                      <FieldGroup label="Pick a time for a quick call">
                        <CallScheduler
                          date={details.date}
                          time={details.time}
                          onPick={(date, time) => {
                            updateDetails("date", date);
                            updateDetails("time", time);
                          }}
                        />
                      </FieldGroup>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-[#0a0f0d] px-6 py-4 font-mono text-sm uppercase tracking-[0.14em] text-emerald-300 transition-colors hover:text-emerald-200"
                      >
                        Submit details <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  </StepShell>
                )}

                {step === "done" && (
                  <StepShell key="done" center>
                    <span className="mx-auto grid h-16 w-16 place-items-center bg-[#0a0f0d] text-emerald-300">
                      <Check className="h-8 w-8" />
                    </span>
                    <h2 className="mt-6 font-display text-3xl font-semibold text-[#0a0f0d]">
                      We&apos;re on it.
                    </h2>
                    {details.date && details.time ? (
                      <p className="mx-auto mt-3 max-w-sm text-[#3c4a42]">
                        You&apos;re set for{" "}
                        <span className="font-medium text-[#0a0f0d]">
                          {details.date} at {details.time}
                        </span>
                        . We&apos;ll call to confirm and go over everything
                        you shared.
                      </p>
                    ) : (
                      <p className="mx-auto mt-3 max-w-sm text-[#3c4a42]">
                        We&apos;ll call you within one business day to go
                        over the details.
                      </p>
                    )}
                    <button
                      onClick={onClose}
                      className="mt-8 bg-[#0a0f0d] px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-emerald-300"
                    >
                      Back to the site
                    </button>
                  </StepShell>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- shared pieces ---------- */

function StepShell({
  children,
  wide,
  center,
}: {
  children: React.ReactNode;
  wide?: boolean;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className={cn(wide && "mx-auto w-full max-w-2xl", center && "text-center")}
    >
      {children}
    </motion.div>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.2em] text-[#5a6b61]">
        {label}
      </span>
      {children}
    </div>
  );
}

function CallScheduler({
  date,
  time,
  onPick,
}: {
  date: string;
  time: string;
  onPick: (date: string, time: string) => void;
}) {
  const days = nextWeekdays(10);

  return (
    <div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {days.map((d) => {
          const key = dateKey(d);
          const label = formatDate(d);
          const selected = date === label;
          return (
            <button
              type="button"
              key={key}
              onClick={() => onPick(label, "")}
              className={cn(
                "shrink-0 border px-3.5 py-2.5 text-xs font-medium transition-colors",
                selected
                  ? "border-[#0a0f0d] bg-[#0a0f0d] text-emerald-300"
                  : "border-[#0a0f0d]/15 text-[#3c4a42] hover:border-[#0a0f0d]/40"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {date && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {TIME_SLOTS.map((slot) => {
            const open = isSlotOpen(date, slot);
            const selected = time === slot;
            return (
              <button
                type="button"
                key={slot}
                disabled={!open}
                onClick={() => onPick(date, slot)}
                className={cn(
                  "border px-2 py-2.5 text-xs font-medium transition-colors",
                  !open && "cursor-not-allowed border-black/5 text-[#c3ccc6] line-through",
                  open && !selected && "border-[#0a0f0d]/15 text-[#3c4a42] hover:border-[#0a0f0d]/40",
                  open && selected && "border-[#0a0f0d] bg-[#0a0f0d] text-emerald-300"
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}
    </div>
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
