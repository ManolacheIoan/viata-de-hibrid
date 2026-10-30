"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "./Logo";

const links = [
  { href: "/studio", label: "Studio", accent: "bg-tech" },
  { href: "/arena", label: "Arena", accent: "bg-sport" },
];

export function TopBar({ minimal = false }: { minimal?: boolean }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 240);
  });

  const isStudio = pathname.startsWith("/studio");
  const contactHref = "/studio#contact";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4"
    >
      <nav
        aria-label="Navigare principală"
        className={`flex w-full max-w-[1120px] items-center justify-between rounded-full border px-3 py-2 pl-5 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? "border-white/10 bg-bg/70 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Logo />
        {!minimal && (
        <div className="flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative block rounded-full px-4 py-2 text-[14px] transition-colors duration-200 ${
                      active ? "text-fg" : "text-fg-secondary hover:text-fg"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${link.accent}`} />
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={contactHref}
            className={`ml-1 hidden rounded-full px-4 py-2 text-[14px] font-medium text-bg transition-transform duration-200 hover:scale-[1.04] active:scale-95 sm:block ${
              isStudio ? "bg-tech" : "bg-fg"
            }`}
          >
            Hai să vorbim
          </Link>
        </div>
        )}
      </nav>
    </motion.header>
  );
}
