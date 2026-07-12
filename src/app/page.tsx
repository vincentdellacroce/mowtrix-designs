import Link from "next/link";
import Hero from "@/components/hero/Hero";
import Section from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/atoms";
import AuditTool from "@/components/audit/AuditTool";
import SeoAeoGeo from "@/components/seo/SeoAeoGeo";
import Showcase from "@/components/showcase/Showcase";
import ReviewMarquee from "@/components/reviews/ReviewMarquee";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import GlowButton from "@/components/ui/GlowButton";

export default function Home() {
  return (
    <>
      <Hero />

      {/* the audit — the hook */}
      <Section id="audit" tone="light">
        <Reveal className="mb-12">
          <SectionHeading
            tone="light"
            eyebrow="Reality check"
            align="center"
            title={
              <>
                Where do you{" "}
                <span className="text-glow-emerald">actually</span> rank?
              </>
            }
            intro="Most trade businesses are losing leads to competitors they've never heard of. Run the 10-second audit and see the gap for yourself."
            className="mx-auto"
          />
        </Reveal>
        <Reveal delay={0.1} className="mx-auto max-w-4xl">
          <AuditTool />
        </Reveal>
      </Section>

      {/* SEO / AEO / GEO explainer */}
      <Section id="services">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Three ways we make you{" "}
                <span className="text-glow-emerald">unmissable</span>.
              </>
            }
            intro="Ranking on Google is table stakes. We also make you the answer assistants quote and the business AI recommends by name."
          />
        </Reveal>
        <SeoAeoGeo />
      </Section>

      {/* showcase */}
      <Section id="work" tone="light">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="light"
            eyebrow="Selected work"
            title={
              <>
                Sites that <span className="text-glow-emerald">perform</span>.
              </>
            }
            intro="Real builds, real results. Hover any project to feel the craft — then go see it live."
          />
          <GlowButton href="/work" variant="solid">
            View all work
          </GlowButton>
        </Reveal>
        <Showcase limit={2} showFilters={false} columns={1} />
      </Section>

      {/* reviews */}
      <Section id="reviews" className="overflow-hidden">
        <Reveal className="mb-12">
          <SectionHeading
            align="center"
            eyebrow="What owners say"
            title={
              <>
                Trusted by people who{" "}
                <span className="text-glow-emerald">build</span> things.
              </>
            }
            className="mx-auto"
          />
        </Reveal>
        <Reveal>
          <ReviewMarquee />
        </Reveal>
      </Section>

      {/* contact */}
      <Section id="contact" tone="light">
        <ContactSection />
      </Section>

      <Footer />
    </>
  );
}
