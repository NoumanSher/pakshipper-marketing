"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  m,
  LazyMotion,
  domAnimation,
  AnimatePresence,
} from "motion/react";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Store,
  Tag,
  Package,
  Truck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────
   STEP DEFINITIONS
───────────────────────────────────────────── */
const STEPS = [
  {
    id: 1,
    icon: Store,
    label: "Brand & Store Setup",
    color: "cyan",
    tagline: "Upload logos, mascot favicon, and custom banner carousels",
  },
  {
    id: 2,
    icon: Tag,
    label: "Category Hierarchy",
    color: "indigo",
    tagline: "Build structured catalog trees with cross-sell suggestions",
  },
  {
    id: 3,
    icon: Package,
    label: "Catalog & HTML Editor",
    color: "violet",
    tagline: "Split-mode live HTML product rendering and profit calculators",
  },
  {
    id: 4,
    icon: Truck,
    label: "Orders & Fulfillment",
    color: "emerald",
    tagline: "Real-time order statuses and customer dispatch timelines",
  },
];

/* ─────────────────────────────────────────────
   STEP 1 — REAL BRAND SETUP SCREENSHOT
───────────────────────────────────────────── */
function StepBrand() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-bold text-white">Full Brand &amp; Banner Customizer</span>
          <span className="text-xs text-white/40">|</span>
          <span className="text-xs text-cyan-300">Logo, Mascot Favicon &amp; Multi-Slide Carousels</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/70">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-cyan-400" /> Desktop &amp; Mobile Banners</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-cyan-400" /> WhatsApp Contact</span>
        </div>
      </div>
      <BrowserMockup
        src="/screenshots/merchant/02-store-settings-branding.png"
        alt="Real Store Settings Branding and Carousel Panel"
        urlPath="admin.pakshipper.com/settings/branding"
        badge="Branding & Carousel"
        heightPx={460}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 2 — REAL CATEGORY HIERARCHY SCREENSHOT
───────────────────────────────────────────── */
function StepCategories() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-bold text-white">Structured Category Architecture</span>
          <span className="text-xs text-white/40">|</span>
          <span className="text-xs text-indigo-300">11+ Parent Categories &amp; Subcategories</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/70">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-indigo-400" /> Auto SEO Slugs</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-indigo-400" /> Cross-Sell Linking</span>
        </div>
      </div>
      <BrowserMockup
        src="/screenshots/merchant/03-category-management.png"
        alt="Real Category Management Interface"
        urlPath="admin.pakshipper.com/catalog/categories"
        badge="11 Categories"
        heightPx={460}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 3 — REAL PRODUCT SPLIT EDITOR SCREENSHOT
───────────────────────────────────────────── */
function StepProducts() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-violet-500/10 border border-violet-500/20 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-violet-400" />
          <span className="text-xs font-bold text-white">Live Split-Screen Marketing Engine</span>
          <span className="text-xs text-white/40">|</span>
          <span className="text-xs text-violet-300">Side-by-side HTML Code &amp; Storefront Preview</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/70">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-violet-400" /> PKR Margin Calculator</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-violet-400" /> Gallery Alt SEO</span>
        </div>
      </div>
      <BrowserMockup
        src="/screenshots/merchant/07-edit-product-rich-editor.png"
        alt="Real Split Product Editor with Live Preview"
        urlPath="admin.pakshipper.com/catalog/products/edit"
        badge="Split HTML Editor"
        heightPx={460}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 4 — REAL ORDER DISPATCH & TIMELINE SCREENSHOT
───────────────────────────────────────────── */
function StepAnalytics() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold text-white">Full Dispatch &amp; Tracking Timeline</span>
          <span className="text-xs text-white/40">|</span>
          <span className="text-xs text-emerald-300">Order #0052 Timeline &amp; COD Tracking</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/70">
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> Lahore Delivery Address</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> Status Chronology</span>
        </div>
      </div>
      <BrowserMockup
        src="/screenshots/merchant/09-order-detail-modal.png"
        alt="Real Order Detail Modal with Status Timeline"
        urlPath="admin.pakshipper.com/sales/orders/0052"
        badge="Order Timeline"
        heightPx={460}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP CONTENT MAP
───────────────────────────────────────────── */
const STEP_CONTENT: Record<number, React.ReactNode> = {
  1: <StepBrand />,
  2: <StepCategories />,
  3: <StepProducts />,
  4: <StepAnalytics />,
};

const COLOR_MAP: Record<string, string> = {
  cyan: "text-cyan-400 bg-cyan-500/20 border-cyan-500/30",
  indigo: "text-indigo-400 bg-indigo-500/20 border-indigo-500/30",
  violet: "text-violet-400 bg-violet-500/20 border-violet-500/30",
  emerald: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
};

const ACTIVE_BAR: Record<string, string> = {
  cyan: "bg-cyan-400",
  indigo: "bg-indigo-400",
  violet: "bg-violet-400",
  emerald: "bg-emerald-400",
};

/* ─────────────────────────────────────────────
   MAIN MODAL
───────────────────────────────────────────── */
export function DemoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSteps = STEPS.length;
  const currentStep = STEPS[step];

  const goNext = useCallback(() => setStep((s) => (s + 1) % totalSteps), [totalSteps]);
  const goPrev = useCallback(() => setStep((s) => (s - 1 + totalSteps) % totalSteps), [totalSteps]);

  // Auto-advance every 7s
  useEffect(() => {
    if (!isOpen || paused) return;
    timerRef.current = setInterval(goNext, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, paused, step, goNext]);

  // Reset to step 0 when modal opens
  useEffect(() => {
    if (isOpen) setStep(0);
  }, [isOpen]);

  // Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
            />

            {/* Modal panel */}
            <m.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-5xl -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e] shadow-2xl shadow-black/80 max-h-[92vh] flex flex-col"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Top progress bar */}
              <div className="flex gap-1 p-3 pb-0">
                {STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setStep(i)}
                    className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                  >
                    {i === step && (
                      <m.div
                        key={`bar-${step}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: paused ? 0 : 7, ease: "linear" }}
                        className={`absolute inset-y-0 left-0 rounded-full ${ACTIVE_BAR[currentStep.color]}`}
                      />
                    )}
                    {i < step && (
                      <div className={`absolute inset-0 rounded-full ${ACTIVE_BAR[s.color]}`} />
                    )}
                  </button>
                ))}
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-4 pb-2">
                {/* Step tabs */}
                <div className="hidden sm:flex gap-1.5">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setStep(i)}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                          i === step
                            ? COLOR_MAP[s.color]
                            : "border-white/10 text-white/40 bg-transparent hover:text-white/70"
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile: step counter */}
                <div className="sm:hidden text-xs text-white/50">
                  Step {step + 1} of {totalSteps}
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-all hover:bg-white/20 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Step headline */}
              <div className="px-6 pb-2">
                <AnimatePresence mode="wait">
                  <m.div
                    key={`title-${step}`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h2 className="text-xl font-extrabold tracking-tight text-white">
                      {currentStep.label}
                    </h2>
                    <p className="text-xs text-white/40">{currentStep.tagline}</p>
                  </m.div>
                </AnimatePresence>
              </div>

              {/* Step content */}
              <div
                data-lenis-prevent="true"
                className="px-6 py-2 overflow-y-auto flex-1 overscroll-contain"
              >
                <AnimatePresence mode="wait">
                  <m.div
                    key={`content-${step}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    {STEP_CONTENT[step + 1]}
                  </m.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-white/10 px-6 py-3 bg-[#080d1a]">
                {/* Prev / Next */}
                <div className="flex gap-2">
                  <button
                    onClick={goPrev}
                    disabled={step === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* CTA */}
                <Link
                  href="/register?plan=trial"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 hover:scale-105"
                >
                  Start Free 30-Day Trial
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
