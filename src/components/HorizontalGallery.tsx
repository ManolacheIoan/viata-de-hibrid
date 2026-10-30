"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Galerie care derulează orizontal în timp ce pagina derulează vertical. */
export function HorizontalGallery({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <>
      {/* Desktop: secțiune lipicioasă cu derulare orizontală */}
      <section ref={ref} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1120px] px-10">{heading}</div>
          <motion.div style={{ x }} className="mt-14 flex w-max gap-6 pl-[max(2.5rem,calc((100vw-1120px)/2+2.5rem))]">
            {children}
          </motion.div>
        </div>
      </section>

      {/* Mobil: carusel nativ cu swipe */}
      <section className="py-24 md:hidden">
        <div className="px-6">{heading}</div>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none]">
          {children}
        </div>
      </section>
    </>
  );
}
