"use client";

import { useRef } from "react";
import { m, LazyMotion, domAnimation, useInView } from "motion/react";
import {
  Store,
  CreditCard,
  Palette,
  BarChart3,
  Shield,
  Globe,
  Truck,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Store,
    title: "Curated Storefronts",
    description:
      "Choose from our aesthetic Base theme (light) or AquaMist (dark). Tailored layouts built for high conversion.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: CreditCard,
    title: "Stripe Payments",
    description:
      "Connect your own Stripe account. Accept cards, wallets, and subscriptions with zero platform fees.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Palette,
    title: "Store Customizer",
    description:
      "Hero slides, carousel banners, promo cards, logos, and marketing blocks — easily managed from the merchant panel with live preview.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description:
      "Real-time order counts, revenue trends, and top products. See what's driving your business at a glance.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "Custom Domains + SSL",
    description:
      "Point your own .pk or .com domain. Free SSL provisioned automatically on all paid plans.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Shield,
    title: "Enterprise RBAC",
    description:
      "Invite team members with granular role permissions. Owners, managers, and staff — each with scoped access.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Truck,
    title: "Order Management",
    description:
      "Track orders from checkout to delivery. Update status, send customer notifications, handle returns.",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Register your store in 2 minutes. Your storefront is live immediately — no hosting hassle.",
    gradient: "from-yellow-500 to-amber-500",
  },
];

export function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <LazyMotion features={domAnimation}>
      <section id="features" className="relative bg-[#060810] py-28 px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <m.p
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-cyan-400"
          >
            Everything You Need
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            All-in-one platform for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Pakistani merchants
            </span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-white/50"
          >
            Stop paying for 5 separate tools. PakShipper brings everything
            under one roof.
          </m.p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <m.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
            >
              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-lg`}
              >
                <f.icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="mb-2 text-base font-semibold text-white">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {f.description}
              </p>

              {/* Hover bottom accent */}
              <div
                className={`absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl bg-gradient-to-r ${f.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  );
}
