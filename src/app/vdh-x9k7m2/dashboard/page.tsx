import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated, logoutAction } from "@/app/actions";
import { getMessages, getStats } from "@/lib/messages";
import {
  getProjects,
  computeMonthlyRevenue,
  computeServiceBreakdown,
  computeDashboardStats,
} from "@/lib/projects";
import { MarkReadButton, DeleteButton, MarkAllReadButton } from "./MessageActions";
import { RevenueSection } from "./RevenueSection";
import { AddProjectButton } from "./AddProjectModal";
import { DeleteProjectButton } from "./ProjectActions";
import { MONTHLY_GOAL, pctChange } from "./mock-data";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function ron(v: number) {
  return v.toLocaleString("ro-RO") + " RON";
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}

function formatShort(iso: string) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(iso));
}

function Delta({ v }: { v: number }) {
  if (v === 0) return null;
  const pos = v > 0;
  return (
    <span className={`ml-1.5 inline-flex items-center rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium ${pos ? "bg-emerald-950/60 text-emerald-400" : "bg-red-950/60 text-red-400"}`}>
      {pos ? "+" : ""}{v}%
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    activ:     "bg-emerald-950/50 text-emerald-400 border-emerald-900/50",
    finalizat: "bg-surface text-fg-muted border-border",
    pauza:     "bg-yellow-950/50 text-yellow-400 border-yellow-900/50",
  };
  return (
    <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${cls[status] ?? cls.finalizat}`}>
      {status}
    </span>
  );
}

export default async function DashboardPage() {
  if (!(await isAuthenticated())) redirect("/vdh-x9k7m2");

  const [projects, messages, msgStats] = await Promise.all([
    getProjects(),
    getMessages(),
    getStats(),
  ]);

  const stats   = computeDashboardStats(projects);
  const cy      = stats.currentYear;
  const py      = stats.prevYear;
  const revenue = computeMonthlyRevenue(projects, cy);
  const revPrev = computeMonthlyRevenue(projects, py);
  const svcBrk  = computeServiceBreakdown(projects, cy);

  const goalPct    = Math.min(100, Math.round((stats.currentMonth / MONTHLY_GOAL) * 100));
  const monthDelta = pctChange(stats.currentMonth, stats.prevMonth);
  const ytdDelta   = pctChange(stats.ytd, stats.ytdPrev);

  const dateLabel = new Intl.DateTimeFormat("ro-RO", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  }).format(new Date());

  return (
    <main className="min-h-screen bg-bg px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* ── Header ── */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
              Viața de Hibrid · Control Panel
            </p>
            <h1 className="mt-1 text-[26px] font-semibold tracking-[-0.02em] text-fg">
              Dashboard
            </h1>
            <p className="mt-1 text-[13px] capitalize text-fg-muted">{dateLabel}</p>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="rounded-lg border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted transition-colors hover:text-fg">
              Ieși
            </button>
          </form>
        </header>

        {/* ── KPI grid ── */}
        <section className="space-y-3">
          {/* 3 carduri mari — forțat 3 coloane pe desktop (dashboard-only) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {/* Luna aceasta */}
            <div className="rounded-2xl border border-border bg-surface px-5 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
                Luna aceasta
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-[32px] font-semibold tabular-nums leading-none tracking-[-0.02em] text-fg">
                  {stats.currentMonth.toLocaleString("ro-RO")}
                  <span className="ml-1.5 text-[16px] font-normal text-fg-muted">RON</span>
                </span>
                <Delta v={monthDelta} />
              </div>
              <p className="mt-2 text-[12px] text-fg-muted">
                vs {stats.prevMonth.toLocaleString("ro-RO")} RON luna trecută
              </p>
            </div>

            {/* Obiectiv */}
            <div className="rounded-2xl border border-border bg-surface px-5 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
                Obiectiv lunar
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className={`text-[32px] font-semibold tabular-nums leading-none tracking-[-0.02em] ${goalPct >= 100 ? "text-emerald-400" : "text-tech"}`}>
                  {goalPct}%
                </span>
                <span className="mb-0.5 text-[12px] text-fg-muted">din obiectiv</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={`h-full rounded-full transition-all ${goalPct >= 100 ? "bg-emerald-400" : "bg-tech"}`}
                  style={{ width: `${goalPct}%` }}
                />
              </div>
              <p className="mt-2 text-[12px] text-fg-muted">
                {stats.currentMonth.toLocaleString("ro-RO")} / {MONTHLY_GOAL.toLocaleString("ro-RO")} RON
              </p>
            </div>

            {/* YTD */}
            <div className="rounded-2xl border border-border bg-surface px-5 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
                Venit {cy} YTD
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-[32px] font-semibold tabular-nums leading-none tracking-[-0.02em] text-fg">
                  {stats.ytd.toLocaleString("ro-RO")}
                  <span className="ml-1.5 text-[16px] font-normal text-fg-muted">RON</span>
                </span>
                <Delta v={ytdDelta} />
              </div>
              <p className="mt-2 text-[12px] text-fg-muted">
                vs {stats.ytdPrev.toLocaleString("ro-RO")} RON în {py}
              </p>
            </div>
          </div>

          {/* 4 carduri mici */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            <SmallKpi label="Medie lunară" value={`${stats.avgMonthly.toLocaleString("ro-RO")} RON`} />
            <SmallKpi label="Proiecte active" value={String(stats.active)} accent={stats.active > 0} />
            <SmallKpi label="Total proiecte" value={String(stats.total)} />
            <SmallKpi label="Mesaje necitite" value={String(msgStats.unread)} accent={msgStats.unread > 0} />
          </div>
        </section>

        {/* ── Charts ── */}
        <RevenueSection
          revenue={revenue}
          revenueCompare={revPrev}
          serviceBreakdown={svcBrk}
          monthlyGoal={MONTHLY_GOAL}
          currentYear={cy}
          prevYear={py}
        />

        {/* ── Proiecte ── */}
        <section className="rounded-2xl border border-border bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h2 className="text-[15px] font-medium text-fg">Proiecte</h2>
              <p className="mt-0.5 font-mono text-[11px] text-fg-muted">
                {stats.total} total · {stats.active} active
              </p>
            </div>
            <AddProjectButton />
          </div>

          {projects.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <p className="text-[15px] text-fg-muted">Niciun proiect. Adaugă primul.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-border">
                    {["Client", "Serviciu", "Valoare", "Status", "Data", ""].map((h, i) => (
                      <th key={i} className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {projects.map((p) => (
                    <tr key={p.id} className="group transition-colors hover:bg-bg/40">
                      <td className="px-5 py-3.5">
                        <span className="text-[14px] font-medium text-fg">{p.client}</span>
                        {p.notes && (
                          <p className="mt-0.5 text-[11px] text-fg-muted">{p.notes}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-[13px] text-fg-secondary">{p.service}</td>
                      <td className="px-5 py-3.5 font-mono text-[13px] font-medium text-fg tabular-nums">
                        {ron(p.value)}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[12px] text-fg-muted">
                        {formatShort(p.date)}
                      </td>
                      <td className="px-5 py-3.5">
                        <DeleteProjectButton id={p.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border">
                    <td colSpan={2} className="px-5 py-3 font-mono text-[11px] text-fg-muted">
                      {stats.total} proiecte
                    </td>
                    <td className="px-5 py-3 font-mono text-[13px] font-semibold text-fg tabular-nums">
                      {ron(projects.reduce((s, p) => s + p.value, 0))}
                    </td>
                    <td colSpan={3} />
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </section>

        {/* ── Mesaje ── */}
        <section className="rounded-2xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-[15px] font-medium text-fg">Mesaje</h2>
              <p className="mt-0.5 font-mono text-[11px] text-fg-muted">
                {msgStats.total} total · {msgStats.unread} necitite
              </p>
            </div>
            {msgStats.unread > 0 && <MarkAllReadButton />}
          </div>

          {messages.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <p className="text-[15px] text-fg-muted">Niciun mesaj încă.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {messages.map((msg) => (
                <li key={msg.id} className="px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {!msg.read && (
                          <span className="h-2 w-2 flex-shrink-0 rounded-full bg-tech" aria-label="Necitit" />
                        )}
                        <span className="text-[15px] font-medium text-fg">{msg.name}</span>
                        <a href={`mailto:${msg.email}`} className="truncate font-mono text-[12px] text-fg-muted transition-colors hover:text-tech">
                          {msg.email}
                        </a>
                      </div>
                      <p className="mt-1 text-[14px] leading-[1.6] text-fg-secondary whitespace-pre-wrap">
                        {msg.message}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-fg-muted">
                        {formatDate(msg.timestamp)}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 flex-col gap-2">
                      {!msg.read && <MarkReadButton id={msg.id} />}
                      <DeleteButton id={msg.id} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  );
}

function SmallKpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted">{label}</p>
      <p className={`mt-2 text-[22px] font-semibold tabular-nums leading-none tracking-[-0.02em] ${accent ? "text-tech" : "text-fg"}`}>
        {value}
      </p>
    </div>
  );
}
