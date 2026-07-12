import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Mowtrix Designs about your business, or book a free 20-minute strategy call. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s make you the{" "}
            <span className="text-glow-emerald">obvious choice</span>.
          </>
        }
        intro="Whether you need a brand-new site or a ranking turnaround, we'd love to hear what you're building."
      />
      <Section className="pt-4" tone="light">
        <ContactSection />
      </Section>
      <Footer />
    </>
  );
}
