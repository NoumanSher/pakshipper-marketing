"use client";

/**
 * BorderBeam — animated glowing moving border gradient.
 * Positioned on the perimeter without obstructing any text or inner content.
 * GPU-accelerated CSS keyframe animation.
 */
export function BorderBeam({
  className,
  duration = 8,
  colorFrom = "#0ea5e9",
  colorTo = "#6366f1",
}: {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <>
      <style>{`
        @keyframes border-beam-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-[2px] rounded-[inherit] overflow-hidden z-0 ${className ?? ""}`}
      >
        <div
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 45deg, ${colorTo} 90deg, transparent 135deg)`,
            animation: `border-beam-spin ${duration}s linear infinite`,
          }}
          className="absolute -inset-[150%] m-auto aspect-square"
        />
        {/* Inner mask to keep card body clean and let background show through */}
        <div className="absolute inset-[2px] rounded-[inherit] bg-[#0c1222]/95" />
      </div>
    </>
  );
}

// Shimmer button — glowing animated shimmer sweep with whitespace protection
export function ShimmerButton({
  children,
  className,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 font-semibold text-white whitespace-nowrap transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${className ?? ""}`}
      style={{
        background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
        boxShadow: "0 0 24px rgba(14,165,233,0.4)",
      }}
    >
      {/* Shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ animationTimingFunction: "linear" }}
      />
      <style>{`
        @keyframes shimmer { 100% { transform: translateX(200%); } }
      `}</style>
      <span className="relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}
