import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import SeoAeoGeo from "@/components/seo/SeoAeoGeo";
import Process from "@/components/sections/Process";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/atoms";

export const metadata: Metadata = {
  title: "Services — SEO, AEO & GEO",
  description:
    "How Mowtrix Designs makes you unmissable: technical SEO, Answer Engine Optimization, and Generative Engine Optimization for the AI era.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Get found <span className="text-glow-emerald">everywhere</span> that
            matters.
          </>
        }
        intro="Google. Featured snippets. Voice. ChatGPT, Gemini, Perplexity. We engineer your visibility across every surface your customers use to decide."
      />

      <Section>
        <SeoAeoGeo />
      </Section>

      <Section id="process" tone="light">
        <Process />
      </Section>

      <Section id="contact" tone="light">
        <ContactSection />
      </Section>
      <Footer />
    </>
  );
}
