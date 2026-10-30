/**
 * Ramă de telefon. Conținutul de exemplu e o ilustrație a aplicației —
 * înlocuiește `children` cu un <Image /> cu screenshot-ul real când îl ai.
 */
export function PhoneMockup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19] w-full rounded-[2.6rem] border border-white/15 bg-[#0d0d10] p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.04)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-bg">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

/** Ecran ilustrativ „Progres 100" — streak. */
export function StreakScreen() {
  const days = Array.from({ length: 28 }, (_, i) => i < 23);
  return (
    <div className="flex h-full flex-col gap-4 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.25),transparent_60%)] px-4 pb-4 pt-10">
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-muted">Streak curent</span>
      <div className="relative mx-auto mt-1 flex h-32 w-32 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--tech)" strokeWidth="6" strokeLinecap="round" strokeDasharray="276" strokeDashoffset="50" />
        </svg>
        <div className="text-center">
          <div className="font-display text-[34px] font-semibold leading-none">82</div>
          <div className="text-[9px] text-fg-muted">zile / 100</div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((done, i) => (
          <span key={i} className={`aspect-square rounded-[4px] ${done ? "bg-tech/80" : "bg-white/5"}`} />
        ))}
      </div>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <div className="text-[10px] text-fg-muted">Următoarea recompensă</div>
        <div className="mt-1 text-[12px] font-medium">🏆 90 de zile</div>
        <div className="mt-2 h-1.5 rounded-full bg-white/5">
          <div className="h-full w-[82%] rounded-full bg-tech" />
        </div>
      </div>
    </div>
  );
}

/** Ecran ilustrativ „Progres 100" — obiceiuri. */
export function HabitsScreen() {
  const habits = [
    { name: "Fără zahăr", streak: 34, pct: 85 },
    { name: "Sală 6:00", streak: 21, pct: 70 },
    { name: "Fără social media", streak: 12, pct: 40 },
    { name: "Citit 20 min", streak: 47, pct: 95 },
  ];
  return (
    <div className="flex h-full flex-col gap-3 px-4 pb-4 pt-10">
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-muted">Azi</span>
      <div className="font-display text-[20px] font-semibold leading-tight tracking-tight">Obiceiurile tale</div>
      {habits.map((h) => (
        <div key={h.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium">{h.name}</span>
            <span className="text-tech">{h.streak}🔥</span>
          </div>
          <div className="mt-2 h-1 rounded-full bg-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-tech to-cyan-300" style={{ width: `${h.pct}%` }} />
          </div>
        </div>
      ))}
      <div className="mt-auto rounded-2xl bg-tech/15 p-3 text-[10px] leading-snug text-tech-soft">
        ✦ Mod inteligent: „Ai trecut de momente mai grele. Respiră 2 minute.”
      </div>
    </div>
  );
}
