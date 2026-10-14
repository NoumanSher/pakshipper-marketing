"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Lock, Maximize2, ChevronDown, ChevronUp, MoveVertical } from "lucide-react";

interface BrowserMockupProps {
  src: string;
  alt: string;
  urlPath?: string;
  badge?: string;
  className?: string;
  priority?: boolean;
  scrollable?: boolean;
  heightPx?: number;
  onExpand?: () => void;
}

export function BrowserMockup({
  src,
  alt,
  urlPath = "admin.pakshipper.com/dashboard",
  badge,
  className = "",
  priority = false,
  scrollable = true,
  heightPx = 560,
  onExpand,
}: BrowserMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const total = scrollHeight - clientHeight;
    setScrollProgress(total > 0 ? (scrollTop / total) * 100 : 0);
  };

  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ top: amount, behavior: "smooth" });
  };

  // Ensure scroll event listener attaches cleanly
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/20 bg-[#070b14] shadow-2xl shadow-cyan-950/40 transition-all duration-300 hover:border-cyan-500/50 ${className}`}
    >
      {/* Chrome / Window Titlebar */}
      <div className="flex h-11 items-center justify-between border-b border-white/[0.1] bg-[#0a0f1f] px-4 select-none z-10 relative">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-sm shadow-red-500/50" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-sm shadow-yellow-500/50" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-sm shadow-green-500/50" />
          <span className="ml-2 hidden text-[11px] font-medium text-white/50 sm:inline">
            PakShipper Back-Office (1080p HD)
          </span>
        </div>

        {/* Address / Route bar */}
        <div className="flex max-w-[50%] sm:max-w-[60%] items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3.5 py-1 text-xs font-mono text-cyan-300">
          <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
          <span className="truncate">{urlPath}</span>
        </div>

        {/* Right side controls / badge */}
        <div className="flex items-center gap-2">
          {scrollable && (
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollByAmount(-350);
                }}
                className="p-1 text-white/70 hover:text-cyan-400 hover:bg-white/10 rounded transition-colors"
                title="Scroll Up"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollByAmount(350);
                }}
                className="p-1 text-white/70 hover:text-cyan-400 hover:bg-white/10 rounded transition-colors"
                title="Scroll Down"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {badge && (
            <span className="hidden md:inline-flex rounded-full bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-cyan-300">
              {badge}
            </span>
          )}

          {onExpand && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 px-2.5 py-1 text-xs font-semibold text-cyan-300 transition-colors shadow-sm"
              title="Click for full-screen crystal clear view"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Zoom HD</span>
            </button>
          )}
        </div>
      </div>

      {/* Screenshot Viewport with data-lenis-prevent to STOP Lenis from hijacking wheel events */}
      <div
        ref={scrollRef}
        data-lenis-prevent="true"
        style={{
          maxHeight: scrollable ? `${heightPx}px` : "auto",
          height: scrollable ? `${heightPx}px` : "auto",
          overflowY: scrollable ? "scroll" : "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "auto",
          scrollbarColor: "#06b6d4 rgba(255, 255, 255, 0.08)",
        }}
        className="relative w-full bg-[#080c16] scroll-smooth overscroll-contain"
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          unoptimized={true}
          priority={priority}
          className="w-full h-auto block select-none pointer-events-auto"
        />

        {/* Floating Scroll Indicator Pill */}
        {scrollable && (
          <div className="sticky bottom-3 right-4 ml-auto mr-4 w-fit flex items-center gap-2 rounded-full bg-black/90 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 text-[11px] font-medium text-white/90 shadow-xl pointer-events-none z-20">
            <MoveVertical className="h-3.5 w-3.5 text-cyan-400 animate-bounce" />
            <span>Scroll inside window ({Math.round(scrollProgress)}%)</span>
          </div>
        )}
      </div>
    </div>
  );
}
