"use client";

import { useRef, useState } from "react";
import { m, LazyMotion, domAnimation, useInView, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { faqSchema } from "@/lib/seo-config";
import { JsonLd } from "@/components/seo/JsonLd";

const FAQS = faqSchema.mainEntity as Array<{
  "@type": string;
  name: string;
  acceptedAnswer: { "@type": string; text: string };
}>;

export function FaqAccordion() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      {/* Inject FAQ JSON-LD */}
      <JsonLd data={faqSchema} />

      <section id="faq" className="relative bg-[#060810] py-28 px-6">
        <div
          aria-hidden
          className="mx-auto mb-20 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <m.p
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-widest text-cyan-400"
            >
              Got Questions?
            </m.p>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-4xl font-extrabold tracking-tight text-white"
            >
              Frequently Asked Questions
            </m.h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <m.div
                  key={faq.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.04]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-white">
                      {faq.name}
                    </span>
                    <span className="ml-4 shrink-0 rounded-full border border-white/10 bg-white/5 p-1.5 transition-colors">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-cyan-400" />
                      ) : (
                        <Plus className="h-4 w-4 text-white/50" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-white/50">
                          {faq.acceptedAnswer.text}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
