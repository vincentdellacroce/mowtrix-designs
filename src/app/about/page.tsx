import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import StatsBand from "@/components/sections/StatsBand";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import Landscape from "@/components/ui/Landscape";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard, SectionHeading } from "@/components/ui/atoms";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mowtrix Designs is a web studio obsessed with one thing: getting trades and local businesses found first — on Google and on AI.",
};

const VALUES = [
  {
    title: "Outcomes over output",
    body: "We don't sell pages. We sell rankings, calls, and booked jobs. If it doesn't move the number, we don't ship it.",
  },
  {
    title: "Built for the AI era",
    body: "Search is changing fast. We engineer for the assistants your customers already ask — not just the Google of five years ago.",
  },
  {
    title: "Speed is a feature",
    body: "Every site loads in under a second. Fast sites rank higher, convert better, and feel expensive. No exceptions.",
  },
  {
    title: "A few clients, done right",
    body: "We take on a limited number of partners at a time so every build gets obsessive attention. Quality doesn't scale by cutting corners.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            We make small businesses{" "}
            <span className="text-glow-emerald">impossible to miss</span>.
          </>
        }
        intro="Mowtrix Designs started with a simple frustration: the best trades in town were invisible online while worse competitors took all the calls. So we fixed it — and kept fixing it."
      />

      <Section size="tight">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl glass">
            <Landscape
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80"
              alt="Misty green mountain landscape at sunrise"
              className="absolute inset-0"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="max-w-xl text-balance font-display text-xl text-mist sm:text-2xl">
                &ldquo;Get found first — or get forgotten. There&apos;s no third
                option anymore.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section size="tight">
        <StatsBand />
      </Section>

      <Section>
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="What we believe"
            title={
              <>
                The principles behind every{" "}
                <span className="text-glow-emerald">build</span>.
              </>
            }
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <GlassCard className="h-full p-7">
                <h3 className="font-display text-xl font-semibold text-mist">
                  {v.title}
                </h3>
                <p className="mt-3 leading-relaxed text-fog">{v.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <ContactSection />
      </Section>
      <Footer />
    </>
  );
}
