"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "./SplitText";
import { Container } from "./Container";

type Side = "tech" | "sport";

const ease = [0.16, 1, 0.3, 1] as const;

const tone = {
  tech: { text: "text-tech", bg: "bg-tech", blob: "bg-tech/35", blob2: "bg-cyan-300/15", serif: "text-tech-soft" },
  sport: { text: "text-sport", bg: "bg-sport", blob: "bg-sport/35", blob2: "bg-amber-300/15", serif: "text-sport-soft" },
} as const;

export function PageHero({
  side,
  eyebrow,
  title,
  description,
  backdropWord,
  children,
  meta,
}: {
  side: Side;
  eyebrow: string;
  /** Cuvintele între *asteriscuri* apar în serif italic. */
  title: string;
  description: string;
  backdropWord: string;
  children?: React.ReactNode;
  meta?: { label: string; value: string }[];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const t = tone[side];
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-36 md:pb-24">
      {/* Fundal */}
      <motion.div aria-hidden="true" style={{ scale: blobScale }} className="absolute inset-0">
        <div className={`absolute -top-[20%] left-[15%] h-[70%] w-[60%] rounded-full ${t.blob} blur-[140px] animate-aurora`} />
        <div className={`absolute right-[5%] top-[10%] h-[50%] w-[40%] rounded-full ${t.blob2} blur-[120px] animate-aurora [animation-delay:-7s]`} />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg to-transparent" />

      {/* Cuvânt uriaș pe fundal */}
      <motion.span
        aria-hidden="true"
        style={{ x: wordX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="pointer-events-none absolute left-0 top-[18%] select-none whitespace-nowrap font-display text-[28vw] font-bold leading-none tracking-[-0.06em] text-stroke"
      >
        {backdropWord}
      </motion.span>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full">
        <Container>
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className={`flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] ${t.text}`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${t.bg} opacity-60`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${t.bg}`} />
            </span>
            {eyebrow}
          </motion.span>

          <SplitText
            text={title}
            delay={0.2}
            accentClassName={t.serif}
            className="mt-6 max-w-[14ch] font-display text-[52px] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-[80px] lg:text-[120px]"
          />

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
              className="max-w-[44ch] text-[17px] leading-[1.6] text-fg-secondary md:text-[19px]"
            >
              {description}
            </motion.p>
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.85, ease }}
                className="flex flex-wrap gap-3"
              >
                {children}
              </motion.div>
            )}
          </div>

          {meta && (
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-4"
            >
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">{m.label}</dt>
                  <dd className="mt-1 text-[15px] text-fg">{m.value}</dd>
                </div>
              ))}
            </motion.dl>
          )}
        </Container>
      </motion.div>
    </section>
  );
}
