import Link from "next/link";
import { Magnetic } from "./Magnetic";

type Variant = "tech" | "sport" | "neutral" | "ghost";

const variantClasses: Record<Variant, string> = {
  tech: "bg-tech text-bg shadow-[0_0_40px_-10px_var(--tech)]",
  sport: "bg-sport text-bg shadow-[0_0_40px_-10px_var(--sport)]",
  neutral: "bg-fg text-bg",
  ghost: "border border-white/15 text-fg hover:border-white/30 bg-white/[0.02]",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "neutral",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Magnetic>
      <Link
        href={href}
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-medium transition-transform duration-200 active:scale-95 ${variantClasses[variant]} ${className}`}
      >
        <span className="relative z-10">{children}</span>
        <Arrow className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      </Link>
    </Magnetic>
  );
}
