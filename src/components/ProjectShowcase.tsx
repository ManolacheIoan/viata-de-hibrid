"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PhoneMockup, StreakScreen, HabitsScreen } from "./PhoneMockup";

/** Două telefoane care se mișcă în sens opus la derulare. */
export function ProjectShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 120]);
  const r1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-8, -2]);
  const r2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [8, 3]);

  return (
    <div ref={ref} className="relative flex items-center justify-center py-10">
      <div aria-hidden="true" className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full bg-tech/25 blur-[120px]" />
      <div className="relative grid w-full max-w-[460px] grid-cols-2 gap-5">
        <motion.div style={{ y: y1, rotate: r1 }}>
          <PhoneMockup>
            <StreakScreen />
          </PhoneMockup>
        </motion.div>
        <motion.div style={{ y: y2, rotate: r2 }} className="mt-16">
          <PhoneMockup>
            <HabitsScreen />
          </PhoneMockup>
        </motion.div>
      </div>
    </div>
  );
}
