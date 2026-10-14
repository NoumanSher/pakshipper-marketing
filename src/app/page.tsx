import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { MerchantConsoleTour } from "@/components/landing/MerchantConsoleTour";
import { ThemeShowcase } from "@/components/landing/ThemeShowcase";
import { PricingTable } from "@/components/landing/PricingTable";
import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { CtaBanner } from "@/components/landing/CtaBanner";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid />
        <MerchantConsoleTour />
        <ThemeShowcase />
        <PricingTable />
        <FaqAccordion />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
