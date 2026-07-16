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
    slug: "peters-mowing",
    name: "Peters Mowing",
    niche: "Landscaping",
    category: "Trades",
    tagline: "Residential lawn care & mowing",
    url: "petersmowing.com",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "#1", label: "for 'lawn mowing near me'" },
    results: [
      { value: "New site", label: "built from scratch" },
      { value: "Fast", label: "sub-second loads" },
      { value: "Local SEO", label: "engineered in" },
    ],
    summary:
      "A clean, fast site built to win the local 'near me' searches homeowners actually type when they need their lawn mowed.",
  },
  {
    slug: "alb-lawn-services",
    name: "A.L.B. Lawn Services",
    niche: "Landscaping",
    category: "Trades",
    tagline: "Lawn care & property maintenance",
    url: "alb-lawn-services.vercel.app",
    image:
      "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "Built", label: "by Mowtrix Designs" },
    results: [
      { value: "New site", label: "built from scratch" },
      { value: "Mobile-first", label: "booking flow" },
      { value: "Local SEO", label: "engineered in" },
    ],
    summary:
      "A mobile-first site for a growing lawn care operation — built to turn 'near me' searches into booked jobs.",
  },
  {
    slug: "varro-lawncare",
    name: "Varro Lawncare",
    niche: "Landscaping",
    category: "Trades",
    tagline: "Lawn care & yard maintenance",
    url: "varro-lawncare.vercel.app",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    accentStat: { value: "Built", label: "by Mowtrix Designs" },
    results: [
      { value: "New site", label: "built from scratch" },
      { value: "Fast", label: "sub-second loads" },
      { value: "Local SEO", label: "engineered in" },
    ],
    summary:
      "A fast, conversion-focused site engineered to get Varro found first when locals search for lawn care.",
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
      "I used to be on page 3 for every mowing search in my area. Three months after the new site went up I was on top and staying there.",
    name: "Danny Osei",
    role: "Owner",
    business: "Osei Lawn Care",
    rating: 5,
  },
  {
    quote:
      "Had three roofers quote a site before Mowtrix. Only these guys actually explained why my old one wasn't showing up on Google. Worth it.",
    name: "Ray Kowalski",
    role: "Owner",
    business: "Kowalski Roofing",
    rating: 5,
  },
  {
    quote:
      "It's a lawn care company, so I wasn't expecting much from a website. Now half my new customers say they found me on Google before they even asked a neighbor.",
    name: "Priya Nair",
    role: "Owner",
    business: "Northline HVAC Services",
    rating: 5,
  },
  {
    quote:
      "Called Mowtrix after a burst pipe emergency site went down mid-storm season. New one hasn't so much as hiccuped since, and it ranks better too.",
    name: "Marcus Bell",
    role: "Owner",
    business: "Bell Plumbing & Drain",
    rating: 5,
  },
  {
    quote:
      "Didn't think a website could get us more electrical inspections but here we are. Booked out two weeks since it launched.",
    name: "Tasha Reyes",
    role: "Owner",
    business: "Reyes Electric",
    rating: 5,
  },
  {
    quote:
      "The old site looked like it was built in 2009 because it was. New one loads instantly and somehow that alone got us more quote requests.",
    name: "Curtis Vance",
    role: "Owner",
    business: "Vance Fencing & Decks",
    rating: 5,
  },
  {
    quote:
      "Someone told me they asked ChatGPT for a painter in town and we came up. Didn't believe it until I tried it myself.",
    name: "Ana Delgado",
    role: "Owner",
    business: "Delgado Painting Co.",
    rating: 5,
  },
  {
    quote:
      "Reservations picked up the same month the new site went live. It actually loads fast on a phone, which our old one never did.",
    name: "Tom Whitfield",
    role: "Chef / Owner",
    business: "The Harvest Table",
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
    title: "SEO — Get found on Google",
    blurb:
      "When someone in your area searches “landscaper near me,” you show up first — not your competitor. First spot gets the call. That call is a paying job.",
    points: [
      "Show up first when locals search for what you do",
      "A page for every suburb you serve — so you win every area",
      "A faster site that Google ranks above the competition",
      "Every month you rank #1 is another month of free leads",
    ],
  },
  {
    id: "aeo",
    title: "AEO — Be the answer at the top",
    blurb:
      "When people ask Google a question, one business gets the big answer box at the top. We make that your business — customers see you first and call you before anyone else.",
    points: [
      "Your business in the answer box above every other result",
      "Get picked when customers ask Siri or Google by voice",
      "Answer the exact questions your customers are asking",
      "More calls without paying a cent for ads",
    ],
  },
  {
    id: "geo",
    title: "GEO — Get recommended by AI",
    blurb:
      "People now ask ChatGPT “who’s the best roofer near me?” — and hire whoever it names. We make sure it names you. That’s clients your competitors never even see coming.",
    points: [
      "ChatGPT, Gemini & Perplexity recommend you by name",
      "Be the one business AI trusts and mentions first",
      "Win the customers who skip Google entirely",
      "We track what AI says about you — and keep you on top",
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
  { value: "85+", label: "Sites engineered" },
  { value: "100%", label: "Reach page 2 or higher" },
  { value: "A.I.", label: "Recognition" },
  { value: "2.9×", label: "Average lead growth" },
];

/** Chapter 2 of the hero journey — "One Form, One Week, One Call". */
export const ONE_FORM = {
  title: "One Form, One Week, One Call",
  paragraphs: [
    "At Mowtrix, we come from a trade background, so we know your time is valuable. That's why we've made the process as simple as possible.",
    "Fill out one 30-second form so we can understand your business, your style, your service area, and what makes you different.",
    "Give us one week to design your website. Then, after one quick call to review the final details, we'll publish it and get your business online.",
  ],
};
