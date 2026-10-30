export function Eyebrow({
  children,
  className = "",
  as = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h2";
}) {
  const Tag = as;
  return (
    <Tag
      className={`block font-mono text-[13px] uppercase tracking-[0.1em] ${className}`}
    >
      {children}
    </Tag>
  );
}
