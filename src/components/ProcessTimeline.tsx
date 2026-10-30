"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "./Reveal";

const steps = [
  { title: "Descoperire", text: "Înțeleg problema, publicul și obiectivul. Stabilim clar ce construim și de ce." },
  { title: "Design", text: "Wireframe-uri și UI în Figma, iterate până când fluxul e simplu și arată impecabil." },
  { title: "Dezvoltare", text: "Cod curat în React, Next.js sau React Native — rapid, accesibil, ușor de extins." },
  { title: "Testare & livrare", text: "Testat pe dispozitive reale, lansat și susținut după. Totul livrat curat." },
];

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative mt-16 flex flex-col gap-14 pl-10 md:pl-16">
      <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-border md:left-[11px]" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-tech to-cyan-300 md:left-[11px]"
      />
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-10 top-2 flex h-4 w-4 items-center justify-center rounded-full border border-tech/60 bg-bg md:-left-16 md:h-6 md:w-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-tech md:h-2 md:w-2" />
          </span>
          <Reveal>
            <div className="grid gap-3 md:grid-cols-[80px_1fr_1.4fr] md:items-baseline md:gap-8">
              <span className="font-mono text-[12px] tracking-[0.14em] text-tech">0{i + 1}</span>
              <h3 className="font-display text-[28px] font-semibold tracking-[-0.03em] md:text-[36px]">{s.title}</h3>
              <p className="max-w-[46ch] text-[16px] leading-[1.6] text-fg-secondary">{s.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
