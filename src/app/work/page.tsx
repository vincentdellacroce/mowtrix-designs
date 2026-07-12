import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import Showcase from "@/components/showcase/Showcase";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected websites engineered by Mowtrix Designs for trades, food, retail and personal brands — built to rank and convert.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Built to rank.{" "}
            <span className="text-glow-emerald">Built to convert.</span>
          </>
        }
        intro="A cross-section of sites we've engineered. Filter by industry, hover for the results, click through to the live build."
      />
      <Section tone="light">
        <Showcase />
      </Section>
      <Section id="contact" tone="light">
        <ContactSection />
      </Section>
      <Footer />
    </>
  );
}
