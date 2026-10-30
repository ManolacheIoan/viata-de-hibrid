"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Arrow } from "./Button";

type Side = "tech" | "sport";

const ease = [0.16, 1, 0.3, 1] as const;

const panels: Record<
  Side,
  {
    eyebrow: string;
    index: string;
    title: [string, string];
    description: string;
    href: string;
    cta: string;
    tags: string[];
  }
> = {
  tech: {
    eyebrow: "Studio",
    index: "01",
    title: ["Hibridul", "Digital"],
    description: "Site-uri, aplicații și platforme, construite cap-coadă.",
    href: "/studio",
    cta: "Intră în Studio",
    tags: ["Design", "Web", "Mobile"],
  },
  sport: {
    eyebrow: "Arena",
    index: "02",
    title: ["Hibridul", "Fizic"],
    description: "Forță în sală, rezistență pe pistă.",
    href: "/arena",
    cta: "Intră în Arenă",
    tags: ["Forță", "Alergare", "MMA"],
  },
};

const accent = {
  tech: {
    text: "text-tech",
    bg: "bg-tech",
    blobA: "bg-tech/40",
    blobB: "bg-cyan-300/20",
    serif: "text-tech-soft",
    glow: "shadow-[0_0_48px_-12px_var(--tech)]",
  },
  sport: {
    text: "text-sport",
    bg: "bg-sport",
    blobA: "bg-sport/40",
    blobB: "bg-amber-300/20",
    serif: "text-sport-soft",
    glow: "shadow-[0_0_48px_-12px_var(--sport)]",
  },
} as const;

function Panel({
  side,
  hovered,
  setHovered,
}: {
  side: Side;
  hovered: Side | null;
  setHovered: (s: Side | null) => void;
}) {
  const p = panels[side];
  const a = accent[side];
  const reduce = useReducedMotion();
  const isActive = hovered === side;
  const isDimmed = hovered !== null && hovered !== side;
  const fromLeft = side === "tech";

  return (
    <Link
      href={p.href}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(side)}
      onPointerLeave={() => setHovered(null)}
      onFocus={() => setHovered(side)}
      onBlur={() => setHovered(null)}
      className={`group relative flex min-h-[50svh] flex-col justify-end overflow-hidden px-6 pb-20 pt-28 transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:px-12 lg:min-h-screen lg:pb-20 ${
        isActive ? "lg:grow-[1.6]" : "lg:grow"
      } ${fromLeft ? "lg:items-start" : "lg:items-end lg:text-right"} grow lg:basis-0`}
    >
      {/* Fundal animat */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className={`absolute -inset-1/4 transition-opacity duration-700 ${
            isDimmed ? "opacity-30" : isActive ? "opacity-100" : "opacity-60"
          }`}
        >
          <div
            className={`absolute ${fromLeft ? "left-[10%]" : "right-[10%]"} top-[20%] h-[55%] w-[55%] rounded-full ${a.blobA} blur-[110px] animate-aurora`}
          />
          <div
            className={`absolute ${fromLeft ? "left-[35%]" : "right-[35%]"} top-[45%] h-[40%] w-[40%] rounded-full ${a.blobB} blur-[100px] animate-aurora [animation-delay:-6s]`}
          />
        </div>
        <div className="absolute inset-0 bg-grid opacity-50 mask-fade-b" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      </div>

      {/* Număr mare decorativ */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-24 ${fromLeft ? "left-4 md:left-10" : "right-4 md:right-10"} select-none font-display text-[140px] font-bold leading-none tracking-[-0.06em] text-stroke transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:text-[220px] ${
          isActive ? (fromLeft ? "translate-x-4" : "-translate-x-4") : ""
        }`}
      >
        {p.index}
      </span>

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: fromLeft ? 0.35 : 0.5, ease }}
        className={`relative z-10 flex flex-col gap-5 ${fromLeft ? "items-start" : "items-start lg:items-end"}`}
      >
        <span className={`flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] ${a.text}`}>
          <span className={`h-px w-8 ${a.bg}`} />
          {p.eyebrow}
        </span>

        <h2 className="font-display text-[52px] font-semibold leading-[0.92] tracking-[-0.045em] sm:text-[72px] xl:text-[104px]">
          {p.title[0]}
          <br />
          <span className={`font-serif font-normal italic tracking-[-0.02em] ${a.serif}`}>
            {p.title[1]}
          </span>
        </h2>

        <p className="max-w-[30ch] text-[16px] leading-[1.55] text-fg-secondary md:text-[17px]">
          {p.description}
        </p>

        <ul className={`flex flex-wrap gap-2 ${fromLeft ? "" : "lg:justify-end"}`}>
          {p.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-secondary backdrop-blur-sm"
            >
              {t}
            </li>
          ))}
        </ul>

        <span
          className={`mt-2 inline-flex items-center gap-3 rounded-full ${a.bg} py-2 pl-6 pr-2 text-[15px] font-medium text-bg ${a.glow} transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-95`}
        >
          {p.cta}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bg/90 text-fg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45">
            <Arrow />
          </span>
        </span>
      </motion.div>
    </Link>
  );
}

function RotatingBadge() {
  const text = "VIAȚA DE HIBRID • DOUĂ LUMI • O DISCIPLINĂ • ";
  return (
    <div className="relative h-32 w-32 md:h-40 md:w-40">
      <div className="absolute inset-0 rounded-full border border-white/10 bg-bg/70 backdrop-blur-xl" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-fg-secondary font-mono text-[13px] tracking-[0.2em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-10 w-14 items-center justify-center">
          <span className="absolute left-0 h-10 w-10 rounded-full bg-tech mix-blend-screen" />
          <span className="absolute right-0 h-10 w-10 rounded-full bg-sport mix-blend-screen" />
        </span>
      </div>
    </div>
  );
}

export function Gateway() {
  const [hovered, setHovered] = useState<Side | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row">
      <Panel side="tech" hovered={hovered} setHovered={setHovered} />

      {/* separator luminos */}
      <div className="relative z-20 h-px w-full bg-border lg:h-auto lg:w-px">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-tech via-white/40 to-sport opacity-60 lg:bg-gradient-to-b" />

        {/* Insigna centrală, mereu pe linia dintre lumi */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <RotatingBadge />
        </motion.div>
      </div>

      <Panel side="sport" hovered={hovered} setHovered={setHovered} />

    </div>
  );
}
