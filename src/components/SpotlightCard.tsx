"use client";

import { useRef } from "react";

type Accent = "tech" | "sport";

const glow: Record<Accent, string> = {
  tech: "rgba(6,182,212,0.16)",
  sport: "rgba(249,115,22,0.16)",
};
const ring: Record<Accent, string> = {
  tech: "rgba(6,182,212,0.6)",
  sport: "rgba(249,115,22,0.6)",
};

/** Card cu lumină care urmărește cursorul, inclusiv pe margine. */
export function SpotlightCard({
  children,
  accent = "tech",
  className = "",
}: {
  children: React.ReactNode;
  accent?: Accent;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-surface/70 p-px transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${className}`}
      style={
        {
          "--glow": glow[accent],
          "--ring": ring[accent],
        } as React.CSSProperties
      }
    >
      {/* margine luminoasă */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), var(--ring), transparent 45%)",
        }}
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx) var(--my), var(--glow), transparent 45%)",
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
