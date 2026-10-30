import type { Metadata } from "next";
import { TopBar } from "@/components/TopBar";
import { Container } from "@/components/Container";
import { Placeholder } from "@/components/Placeholder";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { BackToTop } from "@/components/BackToTop";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Studio — Viața de Hibrid",
  description:
    "De la idee la livrare — design, site-uri, aplicații mobile și platforme.",
};

const services = [
  {
    title: "Design & Brand",
    description: "UI/UX în Figma, design web, logouri și identitate vizuală.",
    items: ["Figma", "UI / UX", "Logo", "Identitate"],
    icon: (
      <path d="M12 3l2.6 5.6L20 11l-5.4 2.4L12 19l-2.6-5.6L4 11l5.4-2.4L12 3z" />
    ),
  },
  {
    title: "Dezvoltare Web",
    description: "React, Next.js — de la landing page la platformă completă.",
    items: ["React", "Next.js", "SEO", "Performanță"],
    icon: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  },
  {
    title: "Aplicații Mobile",
    description: "React Native, Expo — un singur cod, iOS + Android.",
    items: ["React Native", "Expo", "iOS", "Android"],
    icon: <path d="M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zM11 18h2" />,
  },
];

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Expo",
  "Firebase",
  "Tailwind CSS",
  "Figma",
  "Framer Motion",
  "AI",
];

const tags = ["React Native", "Expo", "Firebase", "AI"];

export default function StudioPage() {
  return (
    <>
      <ScrollProgress side="tech" />
      <TopBar />

      <main id="main-content" className="flex-1">
        <PageHero
          side="tech"
          eyebrow="Studio — Hibridul Digital"
          title="Construiesc produse *digitale.*"
          description="De la idee la livrare — design, site-uri, aplicații mobile și platforme."
          backdropWord="STUDIO"
          meta={[
            { label: "Rol", value: "Inginer software" },
            { label: "Focus", value: "Web · Mobile · UI/UX" },
            { label: "Stack", value: "React · Next.js · Expo" },
            { label: "Abordare", value: "Cap-coadă" },
          ]}
        >
          <Button href="#lucrari" variant="tech">
            Vezi lucrările
          </Button>
          <Button href="#contact" variant="ghost">
            Hai să vorbim
          </Button>
        </PageHero>

        {/* Stack */}
        <div className="border-y border-border py-6">
          <Marquee
            items={stack}
            duration={40}
            itemClassName="font-display text-[22px] font-medium tracking-[-0.02em] text-fg-secondary md:text-[28px]"
            separatorClassName="text-tech text-[14px]"
          />
        </div>

        {/* Servicii */}
        <section className="py-28 md:py-40">
          <Container>
            <SectionHeading
              side="tech"
              index="01"
              label="Servicii"
              title="Tot ce-ți trebuie, *sub un singur acoperiș.*"
            />
            <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
              {services.map((service, i) => (
                <Reveal key={service.title} delay={i * 0.1} className="h-full">
                  <SpotlightCard accent="tech" className="h-full">
                    <div className="flex h-full flex-col p-7 md:p-8">
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-tech/30 bg-tech/10 text-tech">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            {service.icon}
                          </svg>
                        </span>
                        <span className="font-mono text-[12px] text-fg-muted">0{i + 1}</span>
                      </div>
                      <h3 className="mt-16 font-display text-[28px] font-semibold leading-[1.05] tracking-[-0.03em]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[16px] leading-[1.6] text-fg-secondary">
                        {service.description}
                      </p>
                      <ul className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-secondary"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-10 flex items-center gap-3 text-[15px] text-fg-secondary">
                <span className="h-px w-8 bg-tech" />
                Totul livrat curat și testat.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Lucrări */}
        <section id="lucrari" className="relative scroll-mt-24 overflow-hidden border-t border-border py-28 md:py-40">
          <Container>
            <SectionHeading side="tech" index="02" label="Lucrări selectate" title="Proiect *în prim-plan.*" />

            <div className="mt-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-tech/30 bg-tech/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-tech">
                    Aplicație mobilă
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted">
                    iOS + Android
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[56px] font-semibold leading-[0.95] tracking-[-0.045em] md:text-[88px]">
                  Progres{" "}
                  <span className="bg-gradient-to-r from-tech to-cyan-200 bg-clip-text text-transparent">100</span>
                </h3>
                <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.6] text-fg-secondary">
                  Aplicație mobilă pentru monitorizarea obiceiurilor și
                  renunțarea la cele nocive. Streak-uri, recompense la etape,
                  sincronizare în cloud și un mod inteligent care te susține
                  în momentele dificile.
                </p>

                <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                  {[
                    ["Streak-uri", "Motivație zilnică"],
                    ["Recompense", "La fiecare etapă"],
                    ["Cloud sync", "Pe toate dispozitivele"],
                    ["Mod inteligent", "Sprijin cu AI"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-surface p-5">
                      <dt className="text-[15px] font-medium text-fg">{k}</dt>
                      <dd className="mt-1 text-[13px] text-fg-muted">{v}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[12px] uppercase tracking-[0.1em] text-fg-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <ProjectShowcase />
            </div>
          </Container>
        </section>

        {/* Proces */}
        <section className="border-t border-border py-28 md:py-40">
          <Container>
            <SectionHeading side="tech" index="03" label="Proces" title="De la idee *la livrare.*" />
            <ProcessTimeline />
          </Container>
        </section>

        {/* Despre */}
        <section className="border-t border-border py-28 md:py-40">
          <Container>
            <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_1.8fr] md:gap-20">
              <Reveal>
                <Placeholder label="Poză John" aspect="aspect-[4/5]" tone="tech" className="max-w-[360px]" />
              </Reveal>
              <div>
                <Reveal>
                  <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.16em]">
                    <span className="text-tech">04</span>
                    <span className="h-px w-10 bg-border" />
                    <span className="text-fg-muted">Despre</span>
                  </div>
                </Reveal>
                <ScrollRevealText
                  text="Sunt John, inginer software și absolvent de Automatică și Informatică Aplicată (UGAL). Combin design-ul, dezvoltarea și testarea ca să livrez produse întregi."
                  highlights={["john", "design-ul", "dezvoltarea", "testarea", "întregi"]}
                  highlightClassName="text-tech-soft"
                  className="mt-8 font-display text-[28px] font-medium leading-[1.25] tracking-[-0.025em] md:text-[40px]"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Contact */}
        <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-border py-28 md:py-40">
          <div aria-hidden="true" className="absolute left-1/2 top-0 h-[60%] w-[80%] -translate-x-1/2 rounded-full bg-tech/15 blur-[140px]" />
          <Container className="relative">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <div>
                <SectionHeading side="tech" index="05" label="Contact" title="Ai o idee? *Hai să o construim.*" />
                <Reveal delay={0.15}>
                  <p className="mt-8 max-w-[40ch] text-[17px] leading-[1.6] text-fg-secondary">
                    Spune-mi pe scurt ce ai în minte — un site, o aplicație sau
                    doar o idee. Îți răspund personal.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.1}>
                <div className="rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur-xl md:p-10">
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>

      <BackToTop side="tech" />
      <SiteFooter href="/arena" label="→ Arena" accent="tech" />
    </>
  );
}
