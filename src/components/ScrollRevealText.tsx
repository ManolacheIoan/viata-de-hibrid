"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight?: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline ${highlight ?? ""}`}>
      {children}{" "}
    </motion.span>
  );
}

/**
 * Paragraf care se „aprinde" cuvânt cu cuvânt pe măsură ce derulezi.
 * Cuvintele din `highlights` primesc clasa `highlightClassName`.
 */
export function ScrollRevealText({
  text,
  className = "",
  highlights = [],
  highlightClassName = "",
}: {
  text: string;
  className?: string;
  highlights?: string[];
  highlightClassName?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const start = i / words.length;
          const clean = w.replace(/[.,—]/g, "").toLowerCase();
          return (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start, start + 1 / words.length]}
              highlight={highlights.includes(clean) ? highlightClassName : undefined}
            >
              {w}
            </Word>
          );
        })}
      </span>
    </p>
  );
}
