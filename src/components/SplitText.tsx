"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Titlu care apare cuvânt cu cuvânt, fiecare „ridicat" dintr-o mască.
 * Cuvintele încadrate în *asteriscuri* sunt redate în serif italic.
 */
/** Împarte textul în cuvinte. Accentul poate cuprinde mai multe cuvinte: *de la idee*. */
function splitWords(text: string) {
  const words: { word: string; accent: boolean }[] = [];
  let open = false;
  for (const raw of text.split(" ")) {
    if (raw.startsWith("*")) open = true;
    words.push({ word: raw.replace(/\*/g, ""), accent: open });
    if (raw.endsWith("*")) open = false;
  }
  return words;
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as = "h1",
  accentClassName = "",
  animateOnView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
  accentClassName?: string;
  animateOnView?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = splitWords(text);

  const trigger = animateOnView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { initial: "hidden", animate: "show" };

  return (
    <Tag
      className={className}
      aria-label={text.replace(/\*/g, "")}
      {...trigger}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map(({ word, accent }, i) => {
        return (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          >
            <motion.span
              className={`inline-block will-change-transform ${
                accent ? `font-serif font-normal italic tracking-normal ${accentClassName}` : ""
              }`}
              variants={{
                hidden: reduce ? { opacity: 0 } : { y: "110%", rotate: 4 },
                show: {
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                  transition: { duration: 0.9, ease },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </Tag>
  );
}
