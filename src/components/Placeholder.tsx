const tones = {
  neutral: "from-white/[0.06] via-transparent to-transparent",
  tech: "from-tech/25 via-tech/5 to-transparent",
  sport: "from-sport/25 via-sport/5 to-transparent",
} as const;

/** Spațiu rezervat pentru poze — înlocuiește cu <Image /> când ai pozele. */
export function Placeholder({
  label,
  className = "",
  aspect = "aspect-[4/5]",
  zoomOnHover = false,
  tone = "neutral",
  index,
}: {
  label: string;
  className?: string;
  aspect?: string;
  zoomOnHover?: boolean;
  tone?: keyof typeof tones;
  index?: number;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-surface ${aspect} ${className}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tones[tone]} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          zoomOnHover ? "group-hover:scale-110" : ""
        }`}
      />
      <div className="absolute inset-0 bg-grid opacity-40 mask-fade-b" />
      {index !== undefined && (
        <span className="absolute right-5 top-4 font-display text-[64px] font-semibold leading-none tracking-[-0.04em] text-stroke">
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
        {label}
      </span>
    </div>
  );
}
