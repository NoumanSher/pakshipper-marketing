"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, LazyMotion, domAnimation, useInView } from "motion/react";
import { ShimmerButton } from "@/components/ui/MagicUI";
import { GridBackground } from "@/components/ui/GridBackground";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-[#060810] py-28 px-6">
        <div
          aria-hidden
          className="mx-auto mb-20 h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-cyan-950/60 to-indigo-950/60 p-16 text-center">
          <GridBackground />

          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
          />

          <m.h2
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Ready to launch your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              dream store?
            </span>
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto mt-5 max-w-xl text-lg text-white/50"
          >
            Join hundreds of Pakistani merchants already selling online with
            PakShipper. No credit card. No commitment.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/register">
              <ShimmerButton className="gap-2 px-10 text-base">
                Create Your Store — Free
                <ArrowRight className="h-4 w-4" />
              </ShimmerButton>
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
