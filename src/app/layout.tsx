import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema, siteConfig } from "@/lib/seo-config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.og.image,
        width: siteConfig.og.imageWidth,
        height: siteConfig.og.imageHeight,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitter,
    creator: siteConfig.twitter,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.og.image],
  },
  // GEO meta tags injected via viewport / other() in Next.js
  other: {
    "geo.region": siteConfig.geoRegion,
    "geo.placename": siteConfig.geoPlaceName,
    "geo.position": siteConfig.geoPosition,
    ICBM: siteConfig.ICBM,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* SoftwareApplication JSON-LD for AEO */}
        <JsonLd data={softwareApplicationSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-[#060810] font-sans">
        <LenisProvider>
          {children}
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
