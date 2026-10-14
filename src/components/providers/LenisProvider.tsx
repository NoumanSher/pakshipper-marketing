"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * LenisProvider — instantiates Lenis smooth scroll globally.
 * Must be a Client Component since it subscribes to scroll/raf events.
 * Syncs with Framer Motion's `useScroll` via the `lenis` instance on window.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Expose on window so Framer Motion useScroll can sync if needed
    (window as typeof window & { lenis?: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
