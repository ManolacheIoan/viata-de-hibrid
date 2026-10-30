import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.14em] text-fg-secondary transition-colors duration-150 hover:text-fg focus-visible:text-fg ${className}`}
      aria-label="Acasă — Viața de Hibrid"
    >
      <span aria-hidden="true" className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute left-0 h-3.5 w-3.5 rounded-full bg-tech mix-blend-screen transition-transform duration-500 group-hover:-translate-x-0.5" />
        <span className="absolute right-0 h-3.5 w-3.5 rounded-full bg-sport mix-blend-screen transition-transform duration-500 group-hover:translate-x-0.5" />
      </span>
      <span className="hidden sm:inline">Viața de Hibrid</span>
    </Link>
  );
}
