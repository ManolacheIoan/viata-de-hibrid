"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const bg = { tech: "bg-tech", sport: "bg-sport" } as const;

export function ScrollProgress({ side }: { side: "tech" | "sport" }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={`fixed inset-x-0 top-0 z-50 h-[2px] origin-left ${bg[side]}`}
    />
  );
}
