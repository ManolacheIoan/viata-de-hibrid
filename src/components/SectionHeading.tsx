import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

/** Antet de secțiune: număr + etichetă + titlu mare animat. */
export function SectionHeading({
  index,
  label,
  title,
  side,
  className = "",
}: {
  index: string;
  label: string;
  title: string;
  side: "tech" | "sport";
  className?: string;
}) {
  const text = side === "tech" ? "text-tech" : "text-sport";
  const serif = side === "tech" ? "text-tech-soft" : "text-sport-soft";
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.16em]">
          <span className={text}>{index}</span>
          <span className="h-px w-10 bg-border" />
          <span className="text-fg-muted">{label}</span>
        </div>
      </Reveal>
      <SplitText
        as="h2"
        animateOnView
        text={title}
        accentClassName={serif}
        stagger={0.04}
        className="mt-6 max-w-[18ch] font-display text-[40px] font-semibold leading-[1] tracking-[-0.04em] md:text-[64px]"
      />
    </div>
  );
}
