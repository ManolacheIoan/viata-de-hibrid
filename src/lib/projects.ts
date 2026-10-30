import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export interface Project {
  id: string;
  client: string;
  service: string;
  value: number;
  status: "activ" | "finalizat" | "pauza";
  date: string;
  notes?: string;
}

export interface MonthSeries {
  month: string;
  value: number;
  current?: boolean;
}

export interface ServiceSlice {
  label: string;
  value: number;
}

const MONTHS_RO = [
  "Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
  "Iul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DATA_FILE = path.join(process.cwd(), "data", "projects.json");

// ⚠️  DATE DE TEST — înlocuiești cu date reale când ești gata.
const SEED: Project[] = [
  // ── 2026 ──────────────────────────────────────────────────────────────────

  // Ian — 6.500 RON
  { id: "s01", client: "Cabinet Avocat Ionescu", service: "Dezvoltare Web",   value: 3_500, status: "finalizat", date: "2026-01-22", notes: "Site prezentare + blog" },
  { id: "s02", client: "Sport Club Galati",      service: "Design & Brand",   value: 2_200, status: "finalizat", date: "2026-01-28", notes: "Identitate vizuala completa" },
  { id: "s03", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2026-01-31", notes: "Mentenanta lunara" },

  // Feb — 6.800 RON
  { id: "s04", client: "Cabinet Stomatologic",   service: "Dezvoltare Web",   value: 4_200, status: "finalizat", date: "2026-02-18", notes: "Site + programari online" },
  { id: "s05", client: "TechStartup",            service: "Consultanță",      value: 1_800, status: "finalizat", date: "2026-02-25", notes: "Arhitectura backend, 8h" },
  { id: "s06", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2026-02-28", notes: "Mentenanta lunara" },

  // Mar — 14.300 RON (luna mare cu app)
  { id: "s07", client: "eHealth SRL",            service: "Aplicații Mobile", value: 9_500, status: "finalizat", date: "2026-03-20", notes: "React Native iOS + Android" },
  { id: "s08", client: "Boutique Moda",          service: "E-commerce",       value: 3_200, status: "finalizat", date: "2026-03-25", notes: "Shopify custom + integrare plata" },
  { id: "s09", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2026-03-31", notes: "Mentenanta lunara" },
  { id: "s10", client: "Sport Club Galati",      service: "Revizie / Update", value:   800, status: "finalizat", date: "2026-03-10", notes: "Actualizare site + SEO" },

  // Apr — 10.500 RON
  { id: "s11", client: "Agentie Imobiliara",     service: "Dezvoltare Web",   value: 5_500, status: "finalizat", date: "2026-04-15", notes: "Platforma listings + filtre" },
  { id: "s12", client: "Firma Constructii",      service: "Dezvoltare Web",   value: 2_800, status: "finalizat", date: "2026-04-22", notes: "Site prezentare + portofoliu" },
  { id: "s13", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2026-04-30", notes: "Mentenanta lunara" },
  { id: "s14", client: "Retainer Client B",      service: "Abonament",        value: 1_200, status: "finalizat", date: "2026-04-30", notes: "Mentenanta + suport prioritar" },
  { id: "s15", client: "eHealth SRL",            service: "Revizie / Update", value:   200, status: "finalizat", date: "2026-04-08", notes: "Bugfix post-lansare" },

  // Mai — 12.400 RON
  { id: "s16", client: "FinTech Startup",        service: "Aplicații Mobile", value: 7_200, status: "finalizat", date: "2026-05-20", notes: "Dashboard + API integrare" },
  { id: "s17", client: "Restaurant Lux",         service: "Dezvoltare Web",   value: 3_000, status: "finalizat", date: "2026-05-26", notes: "Site + meniu digital + rezervari" },
  { id: "s18", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2026-05-31", notes: "Mentenanta lunara" },
  { id: "s19", client: "Retainer Client B",      service: "Abonament",        value: 1_200, status: "finalizat", date: "2026-05-31", notes: "Mentenanta + suport prioritar" },
  { id: "s20", client: "FinTech Startup",        service: "Consultanță",      value:   200, status: "finalizat", date: "2026-05-05", notes: "Sprint planning, 2h" },

  // Iun — 12.000 RON
  { id: "s21", client: "eHealth SRL",            service: "Aplicații Mobile", value: 4_800, status: "finalizat", date: "2026-06-12", notes: "Functionalitati noi (transa 2)" },
  { id: "s22", client: "Clinica Medicala",       service: "Dezvoltare Web",   value: 4_500, status: "finalizat", date: "2026-06-20", notes: "Site + programari + integrare CRM" },
  { id: "s23", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2026-06-30", notes: "Mentenanta lunara" },
  { id: "s24", client: "Retainer Client B",      service: "Abonament",        value: 1_200, status: "finalizat", date: "2026-06-30", notes: "Mentenanta + suport prioritar" },
  { id: "s25", client: "Clinica Medicala",       service: "Consultanță",      value:   700, status: "finalizat", date: "2026-06-05", notes: "Analiza cerinte, 4h" },

  // Iul — 9.500 RON in curs
  { id: "s26", client: "Logistica SRL",          service: "Aplicații Mobile", value: 5_000, status: "activ",     date: "2026-07-01", notes: "Avans 50% din 10.000 RON — app livrari" },
  { id: "s27", client: "Cafenea Artizanala",     service: "Dezvoltare Web",   value: 2_500, status: "activ",     date: "2026-07-03", notes: "Site + meniu digital QR" },
  { id: "s28", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "activ",     date: "2026-07-31", notes: "Mentenanta lunara" },
  { id: "s29", client: "Retainer Client B",      service: "Abonament",        value: 1_200, status: "activ",     date: "2026-07-31", notes: "Mentenanta + suport prioritar" },

  // ── 2025 ──────────────────────────────────────────────────────────────────

  // Ian '25 — 4.300 RON
  { id: "s30", client: "Firma Audit",            service: "Dezvoltare Web",   value: 2_800, status: "finalizat", date: "2025-01-20", notes: "Site prezentare" },
  { id: "s31", client: "ONG Cultural",           service: "Design & Brand",   value: 1_500, status: "finalizat", date: "2025-01-28", notes: "Identitate vizuala" },

  // Feb '25 — 6.500 RON
  { id: "s32", client: "Companie IT",            service: "Dezvoltare Web",   value: 2_200, status: "finalizat", date: "2025-02-14", notes: "Landing page campanie" },
  { id: "s33", client: "Cabinet Medical",        service: "Dezvoltare Web",   value: 3_500, status: "finalizat", date: "2025-02-25", notes: "Site + programari online" },
  { id: "s34", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2025-02-28", notes: "Mentenanta lunara" },

  // Mar '25 — 9.100 RON
  { id: "s35", client: "RetailChain",            service: "Aplicații Mobile", value: 7_500, status: "finalizat", date: "2025-03-18", notes: "App inventar iOS + Android" },
  { id: "s36", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2025-03-31", notes: "Mentenanta lunara" },
  { id: "s37", client: "RetailChain",            service: "Consultanță",      value:   800, status: "finalizat", date: "2025-03-05", notes: "Analiza cerinte, 4h" },

  // Apr '25 — 9.000 RON
  { id: "s38", client: "Platforma Educationala", service: "Dezvoltare Web",   value: 5_500, status: "finalizat", date: "2025-04-16", notes: "MVP platforma cursuri online" },
  { id: "s39", client: "Firma Logistica",        service: "Dezvoltare Web",   value: 2_200, status: "finalizat", date: "2025-04-24", notes: "Site prezentare" },
  { id: "s40", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2025-04-30", notes: "Mentenanta lunara" },
  { id: "s41", client: "Platforma Educationala", service: "Consultanță",      value:   500, status: "finalizat", date: "2025-04-03", notes: "UX review, 3h" },

  // Mai '25 — 8.300 RON
  { id: "s42", client: "eCommerce Fashion",      service: "E-commerce",       value: 4_800, status: "finalizat", date: "2025-05-20", notes: "Magazin online Shopify custom" },
  { id: "s43", client: "Startup HR",             service: "Consultanță",      value: 1_500, status: "finalizat", date: "2025-05-27", notes: "Consultanta produs, 6h" },
  { id: "s44", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2025-05-31", notes: "Mentenanta lunara" },
  { id: "s45", client: "eCommerce Fashion",      service: "Revizie / Update", value: 1_200, status: "finalizat", date: "2025-05-10", notes: "Ajustari post-lansare" },

  // Iun '25 — 9.000 RON
  { id: "s46", client: "Clinica Stomatologica",  service: "Dezvoltare Web",   value: 3_500, status: "finalizat", date: "2025-06-15", notes: "Site + CMS + integrare recenzii" },
  { id: "s47", client: "DeliveryApp",            service: "Aplicații Mobile", value: 4_200, status: "finalizat", date: "2025-06-22", notes: "Avans 60% din proiect" },
  { id: "s48", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2025-06-30", notes: "Mentenanta lunara" },
  { id: "s49", client: "Clinica Stomatologica",  service: "Consultanță",      value:   500, status: "finalizat", date: "2025-06-03", notes: "Analiza cerinte, 3h" },

  // Iul '25 — 8.800 RON
  { id: "s50", client: "DeliveryApp",            service: "Aplicații Mobile", value: 2_800, status: "finalizat", date: "2025-07-15", notes: "Rest din proiect" },
  { id: "s51", client: "Agentie Turism",         service: "Dezvoltare Web",   value: 3_500, status: "finalizat", date: "2025-07-22", notes: "Site + sistem rezervari" },
  { id: "s52", client: "Retainer Client A",      service: "Abonament",        value:   800, status: "finalizat", date: "2025-07-31", notes: "Mentenanta lunara" },
  { id: "s53", client: "Agentie Turism",         service: "Revizie / Update", value: 1_700, status: "finalizat", date: "2025-07-08", notes: "Adaugare modul chat + fix-uri" },
];

async function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  try { await fs.access(dir); }
  catch { await fs.mkdir(dir, { recursive: true }); }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ projects: SEED }, null, 2));
  }
}

export async function getProjects(): Promise<Project[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const data = JSON.parse(raw) as { projects: Project[] };
  return data.projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function addProject(p: Omit<Project, "id">): Promise<void> {
  await ensureFile();
  const projects = await getProjects();
  projects.unshift({ ...p, id: crypto.randomUUID() });
  await fs.writeFile(DATA_FILE, JSON.stringify({ projects }, null, 2));
}

export async function deleteProjectById(id: string): Promise<void> {
  await ensureFile();
  const projects = await getProjects();
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify({ projects: projects.filter((p) => p.id !== id) }, null, 2)
  );
}

// ── Computations ──────────────────────────────────────────────────────────────

export function computeMonthlyRevenue(projects: Project[], year: number): MonthSeries[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const count = year === currentYear ? currentMonth + 1 : 12;

  return MONTHS_RO.slice(0, count).map((month, i) => ({
    month,
    value: projects
      .filter((p) => {
        const d = new Date(p.date);
        return d.getFullYear() === year && d.getMonth() === i;
      })
      .reduce((sum, p) => sum + p.value, 0),
    current: year === currentYear && i === currentMonth,
  }));
}

export function computeServiceBreakdown(projects: Project[], year: number): ServiceSlice[] {
  const map: Record<string, number> = {};
  for (const p of projects.filter((p) => new Date(p.date).getFullYear() === year)) {
    map[p.service] = (map[p.service] ?? 0) + p.value;
  }
  return Object.entries(map)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export function computeDashboardStats(projects: Project[]) {
  const now = new Date();
  const cy = now.getFullYear();
  const cm = now.getMonth();
  const pm = cm === 0 ? 11 : cm - 1;
  const py = cm === 0 ? cy - 1 : cy;

  const sum = (ps: Project[]) => ps.reduce((s, p) => s + p.value, 0);

  const ytd = sum(projects.filter((p) => new Date(p.date).getFullYear() === cy));
  const ytdPrev = sum(
    projects.filter((p) => {
      const d = new Date(p.date);
      return d.getFullYear() === cy - 1 && d.getMonth() <= cm;
    })
  );
  const currentMonth = sum(
    projects.filter((p) => {
      const d = new Date(p.date);
      return d.getFullYear() === cy && d.getMonth() === cm;
    })
  );
  const prevMonth = sum(
    projects.filter((p) => {
      const d = new Date(p.date);
      return d.getFullYear() === py && d.getMonth() === pm;
    })
  );

  const monthsElapsed = cm + 1;
  const avgMonthly = monthsElapsed > 0 ? Math.round(ytd / monthsElapsed) : 0;

  return {
    ytd,
    ytdPrev,
    currentMonth,
    prevMonth,
    avgMonthly,
    active: projects.filter((p) => p.status === "activ").length,
    total: projects.length,
    currentYear: cy,
    prevYear: cy - 1,
  };
}
