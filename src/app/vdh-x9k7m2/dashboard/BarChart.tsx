"use client";

import { useRef, useState } from "react";
import type { MonthSeries } from "@/lib/projects";

interface Props {
  primary: MonthSeries[];
  secondary?: MonthSeries[];
  goal?: number;
  primaryLabel?: string;
  secondaryLabel?: string;
  unit?: string;
}

interface Tooltip {
  index: number;
  series: "primary" | "secondary";
}

const VB_W = 1200;
const VB_H = 190;
const PAD = { top: 16, right: 90, bottom: 30, left: 90 };
const CHART_W = VB_W - PAD.left - PAD.right;
const CHART_H = VB_H - PAD.top - PAD.bottom;

function niceMax(values: number[]) {
  const raw = Math.max(...values) * 1.2;
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  return Math.ceil(raw / magnitude) * magnitude;
}

function fmt(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`;
  return String(v);
}

export function BarChart({
  primary,
  secondary,
  goal,
  primaryLabel = "2026",
  secondaryLabel = "2025",
  unit = "RON",
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<Tooltip | null>(null);

  const hasSecondary = secondary && secondary.length > 0;
  const allValues = [
    ...primary.map((d) => d.value),
    ...(hasSecondary ? secondary!.map((d) => d.value) : []),
    goal ?? 0,
  ];
  const maxVal = niceMax(allValues);

  const n = primary.length;
  const groupW = CHART_W / n;
  const innerPad = hasSecondary ? 0.22 : 0.50;
  const barsWidth = groupW * (1 - innerPad);
  const barW = hasSecondary ? barsWidth / 2 - 1.5 : barsWidth;

  const TICKS = 4;
  const ticks = Array.from({ length: TICKS + 1 }, (_, i) => (maxVal / TICKS) * i);

  function toY(v: number) {
    return PAD.top + CHART_H - (v / maxVal) * CHART_H;
  }

  function barX(groupIndex: number, series: "primary" | "secondary") {
    const gx = PAD.left + groupIndex * groupW + (groupW * innerPad) / 2;
    if (!hasSecondary || series === "primary") return gx;
    return gx + barW + 3;
  }

  function tooltipData(): { label: string; value: number; x: number; y: number } | null {
    if (!hovered || !svgRef.current) return null;
    const { index, series } = hovered;
    const entry = series === "primary" ? primary[index] : secondary![index];
    if (!entry) return null;

    const svgEl = svgRef.current;
    const rect = svgEl.getBoundingClientRect();
    const scaleX = rect.width / VB_W;
    const scaleY = rect.height / VB_H;

    const gx = PAD.left + index * groupW + groupW / 2;
    const gy = toY(entry.value) - 12;

    const label =
      series === "primary"
        ? entry.current
          ? `${entry.month} ${primaryLabel} (în curs)`
          : `${entry.month} ${primaryLabel}`
        : `${entry.month} ${secondaryLabel}`;

    return {
      label,
      value: entry.value,
      x: gx * scaleX,
      y: gy * scaleY,
    };
  }

  const tip = tooltipData();

  return (
    <div className="relative w-full select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ display: "block", width: "100%", height: "auto" }}
        onMouseLeave={() => setHovered(null)}
        aria-label="Grafic venit lunar"
      >
        {/* Grid + Y ticks */}
        {ticks.map((tick, i) => {
          const y = toY(tick);
          return (
            <g key={i}>
              <line
                x1={PAD.left} y1={y}
                x2={VB_W - PAD.right} y2={y}
                stroke="var(--border)" strokeWidth={1}
              />
              <text
                x={PAD.left - 7} y={y + 4}
                textAnchor="end"
                fill="var(--fg-muted)"
                fontSize={10}
                fontFamily="var(--font-mono)"
              >
                {fmt(tick)}
              </text>
            </g>
          );
        })}

        {/* Goal dashed line */}
        {goal && goal <= maxVal && (
          <g>
            <line
              x1={PAD.left} y1={toY(goal)}
              x2={VB_W - PAD.right} y2={toY(goal)}
              stroke="var(--tech)" strokeWidth={1}
              strokeDasharray="5 4" opacity={0.45}
            />
            <text
              x={VB_W - PAD.right - 2} y={toY(goal) - 5}
              textAnchor="end"
              fill="var(--tech)"
              fontSize={9}
              fontFamily="var(--font-mono)"
              opacity={0.6}
              letterSpacing="0.08em"
            >
              GOAL
            </text>
          </g>
        )}

        {/* Bars */}
        {primary.map((bar, i) => {
          const bh = (bar.value / maxVal) * CHART_H;
          const px = barX(i, "primary");
          const py = toY(bar.value);
          const isHov = hovered?.index === i;
          const dimmed = hovered !== null && !isHov;

          return (
            <g key={i}>
              {/* Secondary bar */}
              {hasSecondary && secondary![i] && (() => {
                const sec = secondary![i];
                const sh = (sec.value / maxVal) * CHART_H;
                const sx = barX(i, "secondary");
                return (
                  <rect
                    x={sx} y={toY(sec.value)}
                    width={barW} height={sh}
                    fill="var(--sport)"
                    opacity={dimmed ? 0.2 : isHov && hovered?.series === "secondary" ? 0.7 : 0.38}
                    rx={3}
                    style={{ transition: "opacity 120ms ease" }}
                    onMouseEnter={() => setHovered({ index: i, series: "secondary" })}
                  />
                );
              })()}

              {/* Primary bar */}
              <rect
                x={px} y={py}
                width={barW} height={bh}
                fill="var(--tech)"
                opacity={
                  dimmed
                    ? 0.2
                    : bar.current
                    ? isHov ? 0.75 : 0.5
                    : isHov ? 1 : 0.82
                }
                rx={3}
                style={{ transition: "opacity 120ms ease" }}
                onMouseEnter={() => setHovered({ index: i, series: "primary" })}
              />

              {/* Hit area — full height, covers both bars */}
              <rect
                x={PAD.left + i * groupW}
                y={PAD.top}
                width={groupW}
                height={CHART_H}
                fill="transparent"
                onMouseEnter={() =>
                  setHovered({ index: i, series: "primary" })
                }
              />

              {/* X label */}
              <text
                x={PAD.left + i * groupW + groupW / 2}
                y={VB_H - PAD.bottom + 16}
                textAnchor="middle"
                fill="var(--fg-muted)"
                fontSize={10}
                fontFamily="var(--font-mono)"
              >
                {bar.month}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating tooltip */}
      {tip && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-xl border border-border bg-surface px-3 py-2 shadow-xl"
          style={{ left: tip.x, top: tip.y }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
            {tip.label}
          </p>
          <p className="mt-0.5 text-[16px] font-semibold tabular-nums text-fg">
            {tip.value.toLocaleString("ro-RO")}
            <span className="ml-1 text-[12px] font-normal text-fg-muted">{unit}</span>
          </p>
        </div>
      )}
    </div>
  );
}
