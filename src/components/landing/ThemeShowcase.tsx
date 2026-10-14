"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, LazyMotion, domAnimation, useInView } from "motion/react";
import { Sparkles, Moon, Sun, ExternalLink, Globe, ArrowRight } from "lucide-react";

const THEMES = [
  {
    id: "base",
    name: "Base Theme",
    badge: "Light Aesthetic",
    mode: "Light Mode",
    modeIcon: Sun,
    niche: "Fashion, Retail & General Storefronts",
    primary: "#0ea5e9",
    accent: "#6366f1",
    cardBg: "from-slate-900/90 via-slate-900/60 to-slate-950",
    previewBorder: "border-cyan-500/20",
    previewBg: "bg-gradient-to-b from-white via-slate-50 to-slate-100",
    previewTextColor: "text-slate-900",
    description:
      "A clean, elegant light-mode storefront crafted for lifestyle, apparel, and multi-category retail. Optimized for product visual clarity and smooth shopping.",
    features: ["Aesthetic light canvas", "Crisp typography", "Multi-category catalog"],
    liveUrl: "https://pakshipper.com/",
    liveLabel: "pakshipper.com",
    liveDomain: "pakshipper.com",
  },
  {
    id: "aquamist",
    name: "AquaMist Theme",
    badge: "Atmospheric Dark",
    mode: "Dark Mode",
    modeIcon: Moon,
    niche: "Humidifiers, Wellness & Air Care",
    primary: "#06b6d4",
    accent: "#0ea5e9",
    cardBg: "from-cyan-950/60 via-slate-950 to-slate-950",
    previewBorder: "border-cyan-500/40",
    previewBg: "bg-gradient-to-b from-[#061522] via-[#040e18] to-[#02070d]",
    previewTextColor: "text-cyan-200",
    description:
      "An atmospheric, high-contrast dark theme with glowing mist accents, tailored for wellness, aromatherapy, and modern air care appliances.",
    features: ["Glowing mist accents", "Immersive dark mode", "Niche category focus"],
    liveUrl: "https://alrehman.pakshipper.com/",
    liveLabel: "alrehman.pakshipper.com",
    liveDomain: "alrehman.pakshipper.com",
  },
];

export function ThemeShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <LazyMotion features={domAnimation}>
      <section id="themes" className="relative bg-[#060810] py-28 px-6 overflow-hidden">
        {/* Divider */}
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
            Curated Storefront Designs
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Two crafted themes for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              your brand identity
            </span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base text-white/50"
          >
            Start with our aesthetic light Base theme or switch to the immersive dark AquaMist theme — engineered specifically for high conversion.
          </m.p>
        </div>

        {/* 2-Theme Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {THEMES.map((theme, i) => {
            const Icon = theme.modeIcon;
            return (
              <m.div
                key={theme.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.cardBg} border border-white/[0.08] p-8 transition-all duration-300 hover:border-cyan-500/30 hover:scale-[1.01] shadow-2xl flex flex-col`}
              >
                {/* Visual Preview Box */}
                <div
                  className={`relative mb-6 flex h-52 flex-col justify-between rounded-2xl border ${theme.previewBorder} ${theme.previewBg} p-5 overflow-hidden shadow-lg`}
                >
                  {/* Mock browser header with live URL */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                    </div>
                    {/* Live URL bar */}
                    <div className="flex items-center gap-1 rounded-full bg-black/10 px-2.5 py-0.5">
                      <Globe className="h-2.5 w-2.5 text-black/40 dark:text-white/40" />
                      <span className="text-[9px] font-mono text-black/50 dark:text-white/50 truncate max-w-[130px]">
                        {theme.liveDomain}
                      </span>
                    </div>
                    <span className="rounded-full bg-black/10 px-2 py-0.5 text-[9px] font-semibold text-black/50 dark:text-white/50">
                      {theme.mode}
                    </span>
                  </div>

                  {/* Centered Mock Content */}
                  <div className="my-auto text-center">
                    <div className="inline-flex items-center gap-2 rounded-xl bg-black/5 dark:bg-white/10 px-4 py-2 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                      <span className={`text-base font-bold ${theme.previewTextColor}`}>
                        {theme.name}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-black/50 dark:text-white/40">
                      {theme.niche}
                    </p>
                  </div>

                  {/* Feature pills preview */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {theme.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-black/5 dark:bg-white/10 px-2 py-0.5 text-[10px] font-medium text-black/70 dark:text-white/70"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: `${theme.primary}18`,
                      color: theme.primary,
                      border: `1px solid ${theme.primary}40`,
                    }}
                  >
                    <Sparkles className="h-3 w-3" />
                    {theme.badge}
                  </span>
                  <span className="text-xs font-medium text-white/40">
                    {theme.mode}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white tracking-tight">
                  {theme.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-cyan-400">
                  {theme.niche}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60 flex-1">
                  {theme.description}
                </p>

                {/* Live store CTA */}
                <a
                  href={theme.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 transition-all hover:bg-white/10 hover:border-white/20 group/link"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-emerald-400">Live Store</p>
                      <p className="text-[10px] text-white/40">{theme.liveLabel}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-white/30 transition-all group-hover/link:text-white/70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </m.div>
            );
          })}
        </div>

        {/* Live Stores Strip */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-indigo-950/30 p-6"
        >
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  Real Stores — Live in Production
                </span>
              </div>
              <p className="text-sm text-white/50 max-w-md">
                These are actual merchant storefronts running on PakShipper today. Browse them to experience the themes firsthand.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:items-end">
              {THEMES.map((t) => (
                <a
                  key={t.id}
                  href={t.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
                >
                  <ExternalLink className="h-3 w-3 text-cyan-400" />
                  {t.liveLabel}
                </a>
              ))}
            </div>
          </div>
        </m.div>

        {/* Future expansion note + CTA */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <p className="text-center text-xs text-white/30">
            More niche layouts (Luxury Watches, Tech &amp; Electronics) will be released in future platform updates.
          </p>
          <Link
            href="/register?plan=trial"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 px-5 py-2 text-sm font-semibold text-cyan-300 transition-all hover:from-cyan-500/30 hover:to-indigo-500/30 hover:text-white"
          >
            Get your own storefront
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </m.div>
      </section>
    </LazyMotion>
  );
}
