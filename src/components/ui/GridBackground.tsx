/**
 * GridBackground — pure CSS GPU-accelerated moving grid with radial glow.
 * Zero JS. Rendered server-side.
 */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {/* Grid lines */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14,165,233,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14,165,233,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
        className="absolute inset-0"
      />
      {/* Radial fade centre */}
      <div
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,165,233,0.15) 0%, transparent 70%)",
        }}
        className="absolute inset-0"
      />
    </div>
  );
}
