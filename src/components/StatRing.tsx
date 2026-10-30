"use client";

import { motion } from "framer-motion";

/** Card cu cifră animată și un inel care se umple la intrarea în ecran. */
export function StatRing({
  value,
  label,
  detail,
  fill,
}: {
  value: React.ReactNode;
  label: string;
  detail: string;
  fill: number;
}) {
  return (
    <div className="flex h-full flex-col justify-between gap-10 p-7 md:p-9">
      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">{label}</span>
        <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90" aria-hidden="true">
          <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="var(--sport)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: fill }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>
      <div>
        <div className="font-display text-[56px] font-semibold leading-none tracking-[-0.04em] text-fg md:text-[72px]">
          {value}
        </div>
        <p className="mt-3 text-[15px] text-fg-secondary">{detail}</p>
      </div>
    </div>
  );
}
