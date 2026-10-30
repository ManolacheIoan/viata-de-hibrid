import Link from "next/link";
import { Container } from "./Container";
import { Marquee } from "./Marquee";
import { Arrow } from "./Button";

export function SiteFooter({
  href,
  label,
  accent,
}: {
  href: string;
  label: string;
  accent: "tech" | "sport";
}) {
  const accentText = accent === "tech" ? "text-sport" : "text-tech";
  const nextName = label.replace(/^→\s*/, "");
  const nextTitle = accent === "tech" ? "Hibridul Fizic" : "Hibridul Digital";

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Link mare spre cealaltă lume */}
      <Link href={href} className="group block py-20 md:py-28">
        <Container>
          <span className={`font-mono text-[12px] uppercase tracking-[0.14em] ${accentText}`}>
            Următoarea lume — {nextName}
          </span>
        </Container>
        <div className="mt-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
          <Marquee
            items={[nextTitle, nextName]}
            duration={22}
            itemClassName="font-display text-[56px] font-semibold tracking-[-0.04em] text-fg transition-colors duration-500 md:text-[120px] group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_var(--fg)]"
            separator="→"
            separatorClassName={`font-display text-[48px] md:text-[96px] ${accentText}`}
          />
        </div>
      </Link>

      <div className="border-t border-border py-8">
        <Container className="flex flex-col items-center justify-between gap-4 text-[13px] text-fg-muted md:flex-row">
          <p>© {new Date().getFullYear()} Viața de Hibrid. Două lumi, aceeași disciplină.</p>
          <Link
            href={href}
            className="group inline-flex items-center gap-2 text-fg-secondary transition-colors hover:text-fg"
          >
            {nextName}
            <Arrow className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </div>
    </footer>
  );
}
