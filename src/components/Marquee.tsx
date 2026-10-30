/** Bandă de text care curge continuu. */
export function Marquee({
  items,
  className = "",
  itemClassName = "",
  separator = "✦",
  separatorClassName = "",
  duration = 30,
  reverse = false,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  separatorClassName?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className={itemClassName}>{item}</span>
          <span className={`mx-6 md:mx-10 ${separatorClassName}`} aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`group flex overflow-hidden mask-fade-x ${className}`}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
