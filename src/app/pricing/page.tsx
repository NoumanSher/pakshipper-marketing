import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { PricingTable } from "@/components/landing/PricingTable";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { Footer } from "@/components/landing/Footer";
import { siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `PakShipper pricing plans. Start free for 30 days. Starter from PKR 2,999/month. Installment plans via JazzCash and Easypaisa for Pakistani merchants.`,
  openGraph: {
    url: `${siteConfig.url}/pricing`,
    title: `Pricing — ${siteConfig.name}`,
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PricingTable />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
