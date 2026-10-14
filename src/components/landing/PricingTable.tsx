"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { m, LazyMotion, domAnimation, useInView } from "motion/react";
import { BorderBeam } from "@/components/ui/MagicUI";
import { plans } from "@/lib/seo-config";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const PLAN_FEATURES: Record<string, string[]> = {
  trial: [
    "30 days free",
    "1 parent category",
    "Up to 10 products",
    "PakShipper subdomain",
    "Email support",
  ],
  starter: [
    "100 products",
    "5 categories",
    "Custom domain + SSL",
    "Stripe payments",
    "Basic analytics",
    "Email support",
  ],
  growth: [
    "500 products",
    "20 categories",
    "Custom domain + SSL",
    "Stripe payments",
    "Advanced analytics",
    "Team members (3)",
    "Priority support",
  ],
  pro: [
    "2,000 products",
    "50 categories",
    "Custom domain + SSL",
    "Stripe payments",
    "Full analytics suite",
    "Team members (10)",
    "Priority + chat support",
    "Theme customizer",
  ],
  enterprise: [
    "Unlimited products",
    "Unlimited categories",
    "Multi-domain support",
    "Dedicated account manager",
    "SLA 99.9% uptime",
    "Custom integrations",
    "White-label option",
  ],
  lifetime: [
    "All Pro features",
    "Lifetime access",
    "All future updates",
    "One-time payment",
    "6-month installments (PK)",
    "Priority forever",
  ],
};

type Currency = "PKR" | "USD";

export function PricingTable() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currency, setCurrency] = useState<Currency>("PKR");

  return (
    <LazyMotion features={domAnimation}>
      <section id="pricing" className="relative bg-[#060810] py-28 px-6">
        <div
          aria-hidden
          className="mx-auto mb-20 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="mx-auto max-w-2xl text-center">
          <m.p
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-cyan-400"
          >
            Simple Pricing
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Start free,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              scale as you grow
            </span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-white/50"
          >
            30-day free trial on every account. Installment payments available
            for Pakistani merchants.
          </m.p>

          {/* Currency toggle */}
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1"
          >
            {(["PKR", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={cn(
                  "rounded-full px-5 py-1.5 text-sm font-semibold transition-all duration-200",
                  currency === c
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {c}
              </button>
            ))}
          </m.div>
        </div>

        {/* Plan cards */}
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const isPopular = plan.highlight;
            const features = PLAN_FEATURES[plan.id] ?? [];
            const price =
              plan.price[currency === "PKR" ? "pkr" : "usd"];
            const isLifetime = plan.id === "lifetime";
            const isFree = plan.price.pkr === 0;

            return (
              <m.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.08 * i,
                  ease: "easeOut",
                }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 flex flex-col",
                  isPopular
                    ? "border-cyan-500/50 bg-[#0c1322] scale-105 shadow-2xl shadow-cyan-500/20"
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14]"
                )}
              >
                {isPopular && <BorderBeam />}

                <div className="relative z-10 flex flex-col h-full">
                  {plan.badge && (
                    <span
                      className={cn(
                        "mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                        isPopular
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "bg-white/10 text-white/60 border border-white/10"
                      )}
                    >
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>

                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {isFree
                        ? "Free"
                        : currency === "PKR"
                        ? `PKR ${price.toLocaleString()}`
                        : `$${price}`}
                    </span>
                    {!isFree && (
                      <span className="mb-1 text-sm text-white/40">
                        /{isLifetime ? "once" : "mo"}
                      </span>
                    )}
                  </div>

                  {isLifetime && (
                    <p className="mt-1 text-xs text-cyan-400">
                      Or 6 installments of{" "}
                      {currency === "PKR"
                        ? `PKR ${Math.ceil(49999 / 6).toLocaleString()}`
                        : `$${Math.ceil(180 / 6)}`}
                    </p>
                  )}

                  {/* Feature list */}
                  <ul className="mt-6 space-y-3 flex-1">
                    {features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-white/70"
                      >
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            isPopular ? "text-cyan-400" : "text-emerald-500"
                          )}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/register?plan=${plan.id}`}
                    className={cn(
                      "mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300",
                      isPopular
                        ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:scale-105"
                        : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {isFree ? "Start Free Trial" : `Choose ${plan.name}`}
                    {isPopular && <Zap className="h-3.5 w-3.5" />}
                  </Link>
                </div>
              </m.div>
            );
          })}
        </div>

        <m.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center text-sm text-white/30"
        >
          All prices in {currency}. Installment plans available via JazzCash,
          Easypaisa, or bank transfer.
        </m.p>
      </section>
    </LazyMotion>
  );
}
