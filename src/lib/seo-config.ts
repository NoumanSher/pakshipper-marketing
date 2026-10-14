// ─── SEO / GEO / AEO Configuration ─────────────────────────────────────────
// Central source of truth for all metadata, structured data, and locale settings.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pakshipper.com";
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://pakshipper-backend.vercel.app";
export const MERCHANT_PANEL_URL = process.env.NEXT_PUBLIC_MERCHANT_PANEL_URL ?? "https://admin.pakshipper.com";

// ─── Site-wide Metadata ───────────────────────────────────────────────────
export const siteConfig = {
  name: "PakShipper",
  tagline: "Pakistan's #1 Multi-Store E-commerce Platform",
  description:
    "Launch your online store in minutes with PakShipper — the all-in-one SaaS platform built for Pakistani merchants. Custom storefronts, Stripe payments, order management & more.",
  url: SITE_URL,
  locale: "en_PK",
  geoRegion: "PK",
  geoPlaceName: "Pakistan",
  geoPosition: "30.3753;69.3451",
  ICBM: "30.3753, 69.3451",
  twitter: "@pakshipper",
  og: {
    image: `${SITE_URL}/og-image.png`,
    imageWidth: 1200,
    imageHeight: 630,
  },
};

// ─── Plans (mirrored for SEO / AEO use) ──────────────────────────────────
export const plans = [
  {
    id: "trial",
    name: "Free Trial",
    price: { pkr: 0, usd: 0 },
    duration: "30 days",
    highlight: false,
    badge: null,
  },
  {
    id: "starter",
    name: "Starter",
    price: { pkr: 2999, usd: 11 },
    duration: "month",
    highlight: false,
    badge: null,
  },
  {
    id: "growth",
    name: "Growth",
    price: { pkr: 5999, usd: 22 },
    duration: "month",
    highlight: true,
    badge: "Most Popular",
  },
  {
    id: "pro",
    name: "Pro",
    price: { pkr: 9999, usd: 36 },
    duration: "month",
    highlight: false,
    badge: null,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { pkr: 19999, usd: 72 },
    duration: "month",
    highlight: false,
    badge: "For Teams",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: { pkr: 49999, usd: 180 },
    duration: "one-time",
    highlight: false,
    badge: "Best Value",
  },
];

// ─── SoftwareApplication JSON-LD ─────────────────────────────────────────
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PakShipper",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description: siteConfig.description,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "PKR",
    lowPrice: "0",
    highPrice: "49999",
    offerCount: plans.length,
    offers: plans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price.pkr.toString(),
      priceCurrency: "PKR",
      description: `PakShipper ${p.name} plan`,
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "320",
    bestRating: "5",
  },
};

// ─── FAQ JSON-LD ─────────────────────────────────────────────────────────
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is PakShipper free to try?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every new store gets a 30-day free trial with no credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use my own domain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All paid plans support fully custom domains with free SSL.",
      },
    },
    {
      "@type": "Question",
      name: "How does PakShipper handle payments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PakShipper integrates with Stripe so merchants can accept cards and digital wallets. Your Stripe account is connected directly — PakShipper never touches your funds.",
      },
    },
    {
      "@type": "Question",
      name: "Does PakShipper support installment plans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can subscribe to paid plans in 6-month installments via JazzCash, Easypaisa, or bank transfer — perfect for Pakistani merchants.",
      },
    },
    {
      "@type": "Question",
      name: "How many products can I list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter allows up to 100 products, Growth up to 500, Pro up to 2,000, and Enterprise is unlimited.",
      },
    },
  ],
};
