import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { NavProvider } from "@/components/nav/NavProvider";
import SiteNav from "@/components/nav/SiteNav";
import CustomCursor from "@/components/ui/CustomCursor";
import MatrixPreloader from "@/components/preloader/MatrixPreloader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://mowtrix.design";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mowtrix Designs — Websites engineered to rank | SEO · AEO · GEO",
    template: "%s · Mowtrix Designs",
  },
  description:
    "Mowtrix Designs builds hyper-optimized websites for trades and local businesses — engineered to rank #1 on Google and to be the answer AI assistants recommend. SEO, AEO & GEO done right.",
  keywords: [
    "SEO for trades",
    "landscaper website design",
    "AEO",
    "GEO",
    "generative engine optimization",
    "local SEO",
    "AI search optimization",
  ],
  authors: [{ name: "Mowtrix Designs" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Mowtrix Designs — Websites engineered to rank",
    description:
      "The growth engine for modern trades. Engineered to rank on Google and on the AI everyone now asks.",
    siteName: "Mowtrix Designs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mowtrix Designs — Websites engineered to rank",
    description:
      "The growth engine for modern trades. SEO · AEO · GEO.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050807",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <MatrixPreloader />
        <CustomCursor />
        <NavProvider>
          <SmoothScroll>
            <SiteNav />
            <main>{children}</main>
          </SmoothScroll>
        </NavProvider>
      </body>
    </html>
  );
}
