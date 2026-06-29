# MOWTRIX DESIGNS

> The growth engine for modern trades — websites engineered to rank on Google **and** on the AI everyone now asks.

A cinematic, conversion-first marketing site for **Mowtrix Designs**, a studio that builds hyper-optimized (SEO · AEO · GEO) websites for trades, food & retail, and personal brands.

**Aesthetic:** "Apple met the Matrix." Deep-forest green + matte black, glassmorphism, emerald-purist accents, a subtle Matrix grid woven throughout, and bright landscape photography — expensive, not busy.

---

## ✨ Signature features

| Feature | Where | Notes |
|---|---|---|
| **Scroll-driven logo reveal** | Hero | The `MOWTRIX` wordmark assembles letter-by-letter from the grid as you scroll a pinned, "scroll-hijacked" stage while a landscape resolves behind glass. (`src/components/hero/`) |
| **Interactive competitor audit** | `#audit` | Enter a business → animated scan → dramatized "X competitors are ahead of you" with a gap visual that surges **YOU** to #1. Deterministic per business name, and the gap grows on repeat visits. (`src/components/audit/`, `src/lib/audit.ts`) |
| **SEO / AEO / GEO explainer** | `#services` | Tabbed, show-don't-tell live demos: a mock SERP, a featured snippet, and an AI-assistant answer that cites the client. (`src/components/seo/`) |
| **Live-site showcase** | `#work` | Browser-frame project mockups with cursor-tracking grid reveal + glowing niche filter tabs. (`src/components/showcase/`) |
| **Connection-aware Matrix preloader** | global | A canvas Matrix-rain loader that **only appears on slow connections** (Network Information API). Fast visitors skip it. Preview anytime with `?matrix=1`. (`src/components/preloader/`) |
| **Three switchable navs** | global | Floating pill, full-screen overlay, and auto-hide — swap live via the bottom-left **Nav style** button (see "Choosing a nav" below). |
| **Holographic custom cursor** | global | Emerald glow dot + grid-lighting ring over interactive elements. Desktop + fine-pointer only. |

Everything respects `prefers-reduced-motion` and targets 60fps (transform/opacity-only animation).

---

## 🧱 Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens in `src/app/globals.css`)
- **Motion** (Framer Motion) for animation, **Lenis** for smooth scroll
- **lucide-react** icons
- Fonts via `next/font`: Space Grotesk (display), Inter (body), JetBrains Mono (labels)

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## ⚙️ Configuration (all optional)

The site is fully functional with **no** environment variables. To go live, copy `.env.example` → `.env.local`:

- `NEXT_PUBLIC_BOOKING_URL` — your Cal.com/Calendly link for "Book a call"
- `NEXT_PUBLIC_CONTACT_ENDPOINT` — form POST target (Formspree, an API route, etc.)
- `NEXT_PUBLIC_AUDIT_FORM_URL` + `NEXT_PUBLIC_AUDIT_FIELD_*` — a Google Form acting as a
  lightweight "database" that logs every audit run (so repeat visitors are tracked
  server-side too). The deterministic engine + `localStorage` already work without it.

## 🗺️ Structure

```
src/
  app/            # routes: / (scroll narrative), /work, /services, /about, /contact + sitemap/robots
  components/
    hero/         # scroll-driven wordmark reveal
    audit/        # audit tool + gap visual
    seo/          # SEO/AEO/GEO tabbed explainer
    showcase/     # browser-frame project cards + filters
    nav/          # 3 nav variants + live switcher + provider
    preloader/    # connection-aware Matrix rain
    reviews/ sections/ ui/  # marquee, process, contact, footer, primitives
  lib/            # audit engine, content data, utils
```

## 🎛️ Choosing a nav (then deleting the rest)

The bottom-left **Nav style** button lets you preview all three navs live (saved to `localStorage`). Once you pick one:

1. Set the default in `src/components/nav/NavProvider.tsx`.
2. In `src/components/nav/SiteNav.tsx`, replace the switch with just your chosen component and remove `<NavSwitcher />`.
3. Delete the two unused nav files + `NavSwitcher.tsx` + `nav-config`'s `NAV_VARIANTS`.

## 📝 Placeholder content to swap

- Projects, reviews, and stats → `src/lib/data.ts`
- Images → bright Unsplash landscapes (auto-fallback to an on-brand gradient if offline)
- Email `hello@mowtrix.design`, booking link, and the logo glyph in `src/components/ui/Wordmark.tsx`

---

© Mowtrix Designs. Engineered to rank.
