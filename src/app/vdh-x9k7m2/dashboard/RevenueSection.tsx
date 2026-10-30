"use client";

import { useState } from "react";
import { BarChart } from "./BarChart";
import type { MonthSeries, ServiceSlice } from "@/lib/projects";

interface Props {
  revenue: MonthSeries[];
  revenueCompare: MonthSeries[];
  serviceBreakdown: ServiceSlice[];
  monthlyGoal: number;
  currentYear: number;
  prevYear: number;
}

export function RevenueSection({
  revenue,
  revenueCompare,
  serviceBreakdown,
  monthlyGoal,
  currentYear,
  prevYear,
}: Props) {
  const [compare, setCompare] = useState(false);
  const total = serviceBreakdown.reduce((s, x) => s + x.value, 0);

  return (
    <div className="space-y-4">
      {/* Bar chart */}
      <div className="rounded-2xl border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
              Venit lunar
            </p>
            <p className="mt-0.5 text-[15px] font-medium text-fg">{currentYear}</p>
          </div>
          <div className="flex items-center gap-3">
            {compare && (
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-tech opacity-80" />
                  {currentYear}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sport opacity-50" />
                  {prevYear}
                </span>
              </div>
            )}
            <button
              onClick={() => setCompare((c) => !c)}
              className={`rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors ${
                compare
                  ? "border-tech text-tech"
                  : "border-border text-fg-muted hover:border-fg-muted hover:text-fg"
              }`}
            >
              vs {prevYear}
            </button>
          </div>
        </div>

        <div className="px-5 pb-2 pt-5">
          {revenue.every((m) => m.value === 0) ? (
            <p className="py-12 text-center text-[14px] text-fg-muted">
              Niciun proiect înregistrat. Adaugă primul proiect.
            </p>
          ) : (
            <BarChart
              primary={revenue}
              secondary={compare ? revenueCompare : undefined}
              goal={monthlyGoal}
              primaryLabel={String(currentYear)}
              secondaryLabel={String(prevYear)}
            />
          )}
        </div>

        <div className="border-t border-border px-5 py-3">
          <p className="font-mono text-[10px] text-fg-muted">
            Linie punctată = obiectiv {monthlyGoal.toLocaleString("ro-RO")} RON/lună
            {compare && " · Portocaliu = " + prevYear}
            {" · Luna curentă marcată cu transparență"}
          </p>
        </div>
      </div>

      {/* Service breakdown */}
      {serviceBreakdown.length > 0 && (
        <div className="rounded-2xl border border-border bg-surface px-5 py-5">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-muted">
            Distribuție servicii — {currentYear} YTD
          </p>
          <div className="space-y-3">
            {serviceBreakdown.map((s) => {
              const pct = total > 0 ? Math.round((s.value / total) * 100) : 0;
              return (
                <div key={s.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[13px] text-fg-secondary">{s.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-fg-muted">{pct}%</span>
                      <span className="w-[90px] text-right font-mono text-[13px] font-medium text-fg">
                        {s.value.toLocaleString("ro-RO")} RON
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-tech opacity-70"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 border-t border-border pt-3 text-right font-mono text-[11px] text-fg-muted">
            Total:{" "}
            <span className="text-[13px] font-medium text-fg">
              {total.toLocaleString("ro-RO")} RON
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
