import Link from "next/link";
import Wordmark from "@/components/ui/Wordmark";
import AmbientGrid from "@/components/ui/AmbientGrid";
import { NAV_LINKS } from "@/components/nav/nav-config";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-400/10 px-5 pt-20 sm:px-8">
      <AmbientGrid variant="floor" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-pretty text-fog">
              We engineer websites that get trades and local businesses found
              first — on Google, and on the AI everyone now asks.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-haze">
              SEO · AEO · GEO
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300/70">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-fog transition-colors hover:text-mist"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300/70">
              Get started
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/#audit"
                  className="text-fog transition-colors hover:text-mist"
                >
                  Free audit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-fog transition-colors hover:text-mist"
                >
                  Book a call
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@mowtrix.design"
                  className="text-fog transition-colors hover:text-mist"
                >
                  hello@mowtrix.design
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* giant ghost wordmark */}
        <div className="pointer-events-none select-none overflow-hidden">
          <div className="display-xl translate-y-[18%] bg-gradient-to-b from-emerald-500/10 to-transparent bg-clip-text text-center text-[24vw] leading-none text-transparent">
            MOWTRIX
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-emerald-400/10 py-6 text-sm text-haze sm:flex-row">
          <p>© {new Date().getFullYear()} Mowtrix Designs. All rights reserved.</p>
          <p className="font-mono text-xs">Engineered to rank.</p>
        </div>
      </div>
    </footer>
  );
}
