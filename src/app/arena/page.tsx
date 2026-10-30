import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { Container } from "@/components/Container";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { CountUp } from "@/components/CountUp";
import { BackToTop } from "@/components/BackToTop";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StatRing } from "@/components/StatRing";
import { HorizontalGallery } from "@/components/HorizontalGallery";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Arena — Viața de Hibrid",
  description: "Forță brută în sală, rezistență pe pistă. Hybrid athlete.",
};

const stats = [
  { value: <CountUp value={8} />, label: "Sală", detail: "ani de sală", fill: 0.8 },
  { value: <CountUp value={600} prefix="~" />, label: "Alergare", detail: "km alergați / an", fill: 0.6 },
  { value: "MMA & Box", label: "Luptă", detail: "discipline de luptă", fill: 1 },
];

const disciplines = [
  { name: "Sală", line: "Forță brută, construită repetare cu repetare.", tag: "Forță" },
  { name: "Alergare", line: "Rezistență pe pistă, kilometru după kilometru.", tag: "Rezistență" },
  { name: "MMA & Box", line: "Tehnică, reflexe și sânge rece sub presiune.", tag: "Luptă" },
];

const galleryItems = [
  "Poză sală 1",
  "Poză alergare 1",
  "Poză MMA / Box 1",
  "Poză sală 2",
  "Poză alergare 2",
  "Poză MMA / Box 2",
];

export default function ArenaPage() {
  return (
    <>
      <ScrollProgress side="sport" />
      <TopBar />

      <main id="main-content" className="flex-1">
        <PageHero
          side="sport"
          eyebrow="Arena — Hybrid athlete"
          title="Hibridul *Fizic.*"
          description="Forță brută în sală, rezistență pe pistă. Hybrid athlete."
          backdropWord="ARENA"
          meta={[
            { label: "Sală", value: "8 ani" },
            { label: "Alergare", value: "~600 km / an" },
            { label: "Luptă", value: "MMA & Box" },
            { label: "Start", value: "6:00 dimineața" },
          ]}
        >
          <Button href="#galerie" variant="sport">
            Vezi galeria
          </Button>
        </PageHero>

        {/* Bandă */}
        <div className="overflow-hidden py-8">
        <div className="-rotate-2 scale-105 border-y border-sport/30 bg-sport py-4 text-bg">
          <Marquee
            items={["Forță", "Rezistență", "Disciplină", "Prezență", "Zi de zi"]}
            duration={25}
            itemClassName="font-display text-[32px] font-bold uppercase tracking-[-0.03em] md:text-[48px]"
            separatorClassName="text-[20px]"
          />
        </div>
        </div>

        {/* Parcurs în cifre */}
        <section className="py-28 md:py-40">
          <Container>
            <SectionHeading side="sport" index="01" label="Parcurs în cifre" title="Nu e despre genetică. *E despre prezență.*" />
            <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1} className="h-full">
                  <SpotlightCard accent="sport" className="h-full">
                    <StatRing {...stat} />
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-10 flex items-center gap-3 text-[15px] text-fg-secondary">
                <span className="h-px w-8 bg-sport" />
                Nu e despre genetică. E despre prezență, zi de zi.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Discipline */}
        <section className="border-t border-border py-28 md:py-40">
          <Container>
            <SectionHeading side="sport" index="02" label="Discipline" title="Trei arene, *un singur atlet.*" />
          </Container>
          <ul className="mt-16 border-t border-border">
            {disciplines.map((d, i) => (
              <li key={d.name} className="group relative overflow-hidden border-b border-border">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-sport transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <Reveal>
                  <Container className="relative grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2 py-8 transition-colors duration-500 group-hover:text-bg md:grid-cols-[80px_1fr_1fr_auto] md:py-12">
                    <span className="font-mono text-[12px] tracking-[0.14em] text-sport transition-colors duration-500 group-hover:text-bg">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[44px] font-semibold leading-none tracking-[-0.045em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:text-[80px]">
                      {d.name}
                    </span>
                    <span className="col-span-2 max-w-[36ch] text-[16px] text-fg-secondary transition-colors duration-500 group-hover:text-bg/80 md:col-span-1">
                      {d.line}
                    </span>
                    <span className="hidden rounded-full border border-current px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted transition-colors duration-500 group-hover:text-bg md:block">
                      {d.tag}
                    </span>
                  </Container>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        {/* Galerie */}
        <div id="galerie" className="scroll-mt-0 border-t border-border">
          <HorizontalGallery
            heading={<SectionHeading side="sport" index="03" label="Galerie" title="Din sală, *de pe pistă, din ring.*" />}
          >
            {galleryItems.map((label, i) => (
              <Placeholder
                key={label}
                label={label}
                index={i + 1}
                tone={i % 2 === 0 ? "sport" : "neutral"}
                aspect="aspect-[4/5]"
                zoomOnHover
                className="w-[78vw] shrink-0 snap-center sm:w-[50vw] md:w-[34vw] lg:w-[28vw]"
              />
            ))}
          </HorizontalGallery>
        </div>

        {/* Manifesto */}
        <section className="relative overflow-hidden border-t border-border py-32 md:py-48">
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sport/10 blur-[140px]" />
          <Container className="relative">
            <Reveal>
              <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.16em]">
                <span className="text-sport">04</span>
                <span className="h-px w-10 bg-border" />
                <span className="text-fg-muted">Manifesto</span>
              </div>
            </Reveal>
            <ScrollRevealText
              text="Aceeași disciplină care mă ține în sală la 6 dimineața o pun și în fiecare proiect pe care îl construiesc. Corpul și mintea nu sunt două lumi separate — sunt același antrenament."
              highlights={["disciplină", "corpul", "mintea", "antrenament"]}
              highlightClassName="text-sport-soft"
              className="mt-10 font-display text-[32px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[56px]"
            />
          </Container>
        </section>
      </main>

      <BackToTop side="sport" />
      <SiteFooter href="/studio" label="→ Studio" accent="sport" />
    </>
  );
}
