// Constante de configurare — editezi aici valorile globale.

export const MONTHLY_GOAL = 10_000; // obiectiv lunar RON

export const SERVICE_OPTIONS = [
  "Dezvoltare Web",
  "Aplicații Mobile",
  "E-commerce",
  "Design & Brand",
  "Abonament",
  "Consultanță",
  "Revizie / Update",
  "Altele",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export function pctChange(now: number, before: number): number {
  if (before === 0) return 0;
  return Math.round(((now - before) / before) * 100);
}
