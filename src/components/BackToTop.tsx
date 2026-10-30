"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { scrollToTarget } from "./SmoothScroll";

const accent = {
  tech: "var(--tech)",
  sport: "var(--sport)",
} as const;

export function BackToTop({ side }: { side: "tech" | "sport" }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));

  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      aria-label="Înapoi sus"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-bg/70 text-fg backdrop-blur-md transition-all duration-500 hover:scale-110 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <motion.circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke={accent[side]}
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 9l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
