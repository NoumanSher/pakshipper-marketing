"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { m, LazyMotion, domAnimation, useInView } from "motion/react";
import { GridBackground } from "@/components/ui/GridBackground";
import { ShimmerButton } from "@/components/ui/MagicUI";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { DemoModal } from "@/components/landing/DemoModal";
import { ArrowRight, Play, Star } from "lucide-react";

const STATS = [
  { value: "500+", label: "Active Stores" },
  { value: "30 days", label: "Free Trial" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={ref}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#060810] px-6 pb-24 pt-28 text-center"
      >
        {/* Background */}
        <GridBackground />

        {/* Glow orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[120px]" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 -translate-y-1/4 translate-x-1/4"
        >
          <div className="h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>

        {/* Badge */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400"
        >
          <Star className="h-3 w-3 fill-current" />
          Pakistan&apos;s #1 E-commerce SaaS Platform
        </m.div>

        {/* Headline */}
        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tighter text-white sm:text-6xl lg:text-7xl"
        >
          Launch Your Online Store{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            in Minutes
          </span>
        </m.h1>

        {/* Sub-headline */}
        <m.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60"
        >
          PakShipper gives you a fully branded storefront, Stripe payments,
          order management, and powerful analytics — all from one dashboard.
          Built for Pakistani merchants, priced for everyone.
        </m.p>

        {/* CTAs */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/register?plan=trial" className="shrink-0">
            <ShimmerButton className="text-base whitespace-nowrap px-8 py-3.5">
              <span className="inline-flex items-center gap-2">
                Start Free — 30 Days
                <ArrowRight className="h-4 w-4 shrink-0" />
              </span>
            </ShimmerButton>
          </Link>
          <button
              onClick={() => setDemoOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
            >
              <Play className="h-4 w-4 fill-current text-cyan-400" />
              Watch Demo
            </button>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-xs text-white/30"
        >
          No credit card required &middot; Free 30-day trial &middot; Cancel anytime
        </m.p>

        {/* Hero Interactive Console Preview */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="relative mx-auto mt-14 max-w-5xl w-full text-left"
        >
          {/* Ambient Glow behind window */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/25 via-indigo-500/20 to-cyan-500/25 blur-2xl opacity-75"
          />

          <div className="relative">
            <BrowserMockup
              src="/screenshots/merchant/05-products-catalog.png?v=2"
              alt="PakShipper Merchant Console Preview - Products Catalog & Real-Time Stock"
              urlPath="admin.pakshipper.com/catalog/products"
              badge="Full 1080p HD"
              priority={true}
              heightPx={500}
              onExpand={() => setDemoOpen(true)}
            />
          </div>
        </m.div>

        {/* Stats row */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
              <p className="mt-1 text-sm text-white/40">{s.label}</p>
            </div>
          ))}
        </m.div>

        {/* Gradient divider bottom */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        />
      </section>

      {/* Demo Modal */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </LazyMotion>
  );
}
