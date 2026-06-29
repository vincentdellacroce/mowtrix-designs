import type { Niche } from "./audit";

export const NICHES: Niche[] = [
  "Landscaping",
  "Trades",
  "Food & Hospitality",
  "Products & Retail",
  "Personal",
];

export interface Project {
  slug: string;
  name: string;
  niche: Exclude<Niche, never>;
  category: "Trades" | "Food" | "Products" | "Personal";
  tagline: string;
  url: string;
  image: string;
  accentStat: { value: string; label: string };
  results: { value: string; label: string }[];
  summary: string;
}

/**
 * Placeholder showcase. Images are bright outdoor/landscape Unsplash shots
 * (with graceful in-app fallback). Swap `url`/`image`/copy with real work.
 */
export const PROJECTS: Project[] = [
  {
    slug: "evergreen-grounds",
    name: "Evergreen Grounds Co.",
    niche: "Landscaping",
    category: "Trades",
    tagline: "Full-service landscape design & build",
    url: "evergreengrounds.co",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "#1", label: "for 'landscaper near me'" },
    results: [
      { value: "+340%", label: "organic leads" },
      { value: "92 days", label: "to page one" },
      { value: "18×", label: "ROI in year one" },
    ],
    summary:
      "Rebuilt from a dated template into a conversion-first site engineered for local + AI search. Now the default answer when homeowners ask AI for a landscaper.",
  },
  {
    slug: "ironside-roofing",
    name: "Ironside Roofing",
    niche: "Trades",
    category: "Trades",
    tagline: "Residential & commercial roofing",
    url: "ironsideroofing.com",
    image:
      "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "47→1", label: "rank in 4 months" },
    results: [
      { value: "+512%", label: "quote requests" },
      { value: "Top 3", label: "in 11 service areas" },
      { value: "#1", label: "cited by ChatGPT" },
    ],
    summary:
      "A storm-season landing system with location pages tuned for every suburb. AEO schema makes them the source AI assistants quote first.",
  },
  {
    slug: "northvalley-hvac",
    name: "Northvalley HVAC",
    niche: "Trades",
    category: "Trades",
    tagline: "Heating, cooling & air quality",
    url: "northvalleyhvac.com",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "+260%", label: "booked calls" },
    results: [
      { value: "0.9s", label: "load time" },
      { value: "100", label: "Lighthouse SEO" },
      { value: "+260%", label: "booked calls" },
    ],
    summary:
      "Speed-obsessed rebuild — sub-second loads, perfect Core Web Vitals, and a booking flow that turns emergency searches into scheduled jobs.",
  },
  {
    slug: "harvest-table",
    name: "The Harvest Table",
    niche: "Food & Hospitality",
    category: "Food",
    tagline: "Farm-to-table restaurant",
    url: "harvesttable.dining",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "+88%", label: "reservations" },
    results: [
      { value: "+88%", label: "online reservations" },
      { value: "#1", label: "'best brunch' local" },
      { value: "4.9★", label: "review velocity" },
    ],
    summary:
      "An appetite-first site with menu schema that wins the local food pack and shows up the moment someone asks AI where to eat tonight.",
  },
  {
    slug: "atlas-supply",
    name: "Atlas Supply Co.",
    niche: "Products & Retail",
    category: "Products",
    tagline: "Premium outdoor gear",
    url: "atlassupply.co",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "+214%", label: "store revenue" },
    results: [
      { value: "+214%", label: "store revenue" },
      { value: "3.1×", label: "organic traffic" },
      { value: "-41%", label: "ad spend" },
    ],
    summary:
      "Product pages structured for both shoppers and AI shopping agents — rich results, fast checkout, and a content engine that compounds.",
  },
  {
    slug: "marin-studio",
    name: "Marin — Photographer",
    niche: "Personal",
    category: "Personal",
    tagline: "Landscape & adventure photography",
    url: "marin.studio",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "+5×", label: "inbound bookings" },
    results: [
      { value: "+5×", label: "inbound bookings" },
      { value: "#1", label: "regional portfolio" },
      { value: "Featured", label: "in AI overviews" },
    ],
    summary:
      "A cinematic, gallery-led personal site that loads instantly and ranks — proof the Mowtrix system works beyond the trades.",
  },
];

export interface Review {
  quote: string;
  name: string;
  role: string;
  business: string;
  rating: number;
}

export const REVIEWS: Review[] = [
  {
    quote:
      "We went from invisible to the first result for every service we offer. The phone genuinely does not stop now.",
    name: "Marcus Bell",
    role: "Owner",
    business: "Evergreen Grounds Co.",
    rating: 5,
  },
  {
    quote:
      "I didn't even know 'AI search' was a thing you could win. Now ChatGPT recommends us by name. Wild.",
    name: "Dana Cruz",
    role: "Founder",
    business: "Ironside Roofing",
    rating: 5,
  },
  {
    quote:
      "Fastest site I've ever owned and it actually books jobs. Paid for itself in the first three weeks.",
    name: "Priya Nair",
    role: "GM",
    business: "Northvalley HVAC",
    rating: 5,
  },
  {
    quote:
      "Our reservations doubled in a season. The site looks like a million bucks and works even better.",
    name: "Tom Whitfield",
    role: "Chef / Owner",
    business: "The Harvest Table",
    rating: 5,
  },
  {
    quote:
      "Cut our ad budget almost in half because organic finally carries its weight. Should've done this years ago.",
    name: "Sofia Almeida",
    role: "CEO",
    business: "Atlas Supply Co.",
    rating: 5,
  },
  {
    quote:
      "Mowtrix made my work the first thing anyone — or any AI — sees. Bookings are up five times over.",
    name: "Marin Lowe",
    role: "Photographer",
    business: "marin.studio",
    rating: 5,
  },
];

export interface Service {
  id: string;
  title: string;
  blurb: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    id: "seo",
    title: "SEO — Search Engine Optimization",
    blurb:
      "Own the searches your customers already type. Technical foundations, local dominance, and content that compounds.",
    points: [
      "Local pack & 'near me' domination",
      "Per-suburb service-area pages",
      "Core Web Vitals & technical SEO",
      "Authority content engine",
    ],
  },
  {
    id: "aeo",
    title: "AEO — Answer Engine Optimization",
    blurb:
      "Be the answer, not a link. Structured data and entity modeling so you win featured snippets and voice results.",
    points: [
      "Schema & rich-result markup",
      "Featured-snippet targeting",
      "FAQ & entity optimization",
      "Voice-search readiness",
    ],
  },
  {
    id: "geo",
    title: "GEO — Generative Engine Optimization",
    blurb:
      "Get recommended by ChatGPT, Gemini & Perplexity. We make your business the source AI cites first.",
    points: [
      "AI-citation engineering",
      "LLM-readable content structure",
      "Brand entity authority",
      "Generative-answer monitoring",
    ],
  },
];

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
}

export const PROCESS: ProcessStep[] = [
  {
    n: "01",
    title: "Diagnose",
    body: "We audit your visibility across Google, AI assistants, and the map pack — then quantify exactly what each lost position is costing you.",
  },
  {
    n: "02",
    title: "Architect",
    body: "We design a fast, conversion-first site engineered from the ground up for SEO, AEO, and GEO — not bolted on after.",
  },
  {
    n: "03",
    title: "Engineer",
    body: "We build with sub-second loads, perfect schema, and content structured for both humans and the machines that recommend you.",
  },
  {
    n: "04",
    title: "Dominate",
    body: "We track rankings, AI citations, and booked leads — and keep compounding your lead over every competitor in your area.",
  },
];

export const STATS = [
  { value: "120+", label: "Sites engineered" },
  { value: "94%", label: "Reach page one" },
  { value: "8.4×", label: "Avg. lead growth" },
  { value: "#1", label: "AI-search citations" },
];
