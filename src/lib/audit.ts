import { clamp, hashString, seededRandom } from "./utils";

/* ============================================================
   Audit engine
   - Deterministic: same business name + niche → same baseline.
   - Persistent: repeat visits stored in localStorage; the gap
     grows slightly each time (so a returning lead sees urgency).
   - "Database" hook: submitAudit() also fires a best-effort POST
     to a Google Form endpoint when configured (no backend needed).
   ============================================================ */

export type Niche =
  | "Landscaping"
  | "Trades"
  | "Food & Hospitality"
  | "Products & Retail"
  | "Personal";

export interface AuditResult {
  business: string;
  niche: Niche;
  /** competitors currently outranking them */
  competitorsAhead: number;
  /** estimated current rank position (higher = worse) */
  currentRank: number;
  /** monthly leads slipping to competitors */
  lostLeadsPerMonth: number;
  /** % of AI-search answers that cite a competitor instead of them */
  aiInvisibility: number;
  /** projected rank after Mowtrix */
  projectedRank: number;
  /** how many times this business has run the audit */
  visit: number;
}

const STORAGE_KEY = "mowtrix.audit.visits.v1";

function readVisits(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeVisits(map: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* storage blocked — degrade gracefully */
  }
}

/** Niche tunes how brutal the competitive landscape looks. */
const nicheWeight: Record<Niche, number> = {
  Landscaping: 1.0,
  Trades: 1.15,
  "Food & Hospitality": 1.3,
  "Products & Retail": 1.45,
  Personal: 0.7,
};

/**
 * Compute the audit. Pure given (business, niche, visit) so results are
 * reproducible; `visit` nudges the gap upward on each return.
 */
export function computeAudit(
  business: string,
  niche: Niche,
  visit: number
): AuditResult {
  const seed = hashString(`${business}::${niche}`);
  const rand = seededRandom(seed);
  const weight = nicheWeight[niche] ?? 1;

  // baseline competitors ahead: 18–64, scaled by niche
  const baseAhead = Math.round((18 + rand() * 46) * weight);
  // each repeat visit makes the gap feel a little worse (+3..+7 per visit)
  const visitBump = Math.round((visit - 1) * (3 + rand() * 4));
  const competitorsAhead = clamp(baseAhead + visitBump, 7, 140);

  const currentRank = competitorsAhead + 1;
  const lostLeadsPerMonth = clamp(
    Math.round(competitorsAhead * (1.4 + rand() * 1.8)),
    9,
    400
  );
  const aiInvisibility = clamp(Math.round(64 + rand() * 33), 60, 99);
  const projectedRank = 1;

  return {
    business: business.trim(),
    niche,
    competitorsAhead,
    currentRank,
    lostLeadsPerMonth,
    aiInvisibility,
    projectedRank,
    visit,
  };
}

/** Record a run (increments visit count) and return the result. */
export function runAudit(business: string, niche: Niche): AuditResult {
  const key = `${business.trim().toLowerCase()}::${niche}`;
  const visits = readVisits();
  const nextVisit = (visits[key] || 0) + 1;
  visits[key] = nextVisit;
  writeVisits(visits);
  return computeAudit(business, niche, nextVisit);
}

/**
 * Best-effort log to a Google Form acting as a lightweight database.
 * Configure NEXT_PUBLIC_AUDIT_FORM_URL + entry IDs to activate.
 * Uses no-cors so it never blocks the UX; failures are swallowed.
 */
export async function logAuditToSheet(result: AuditResult) {
  const formUrl = process.env.NEXT_PUBLIC_AUDIT_FORM_URL;
  if (!formUrl) return; // not configured yet — deterministic engine still works

  const fields: Record<string, string | undefined> = {
    [process.env.NEXT_PUBLIC_AUDIT_FIELD_BUSINESS || ""]: result.business,
    [process.env.NEXT_PUBLIC_AUDIT_FIELD_NICHE || ""]: result.niche,
    [process.env.NEXT_PUBLIC_AUDIT_FIELD_SCORE || ""]:
      String(result.competitorsAhead),
    [process.env.NEXT_PUBLIC_AUDIT_FIELD_VISIT || ""]: String(result.visit),
  };

  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(fields)) {
    if (k && v != null) body.append(k, v);
  }

  try {
    await fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch {
    /* logging is best-effort */
  }
}
