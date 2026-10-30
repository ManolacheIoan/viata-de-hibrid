"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import {
  saveMessage,
  markRead,
  markAllRead,
  deleteMessage,
} from "@/lib/messages";
import { addProject, deleteProjectById } from "@/lib/projects";

// Both values come only from the server environment (see .env.example).
// If either is missing, the dashboard stays locked: there is no default PIN.
const DASHBOARD_PIN = process.env.DASHBOARD_PIN ?? "";
const SECRET_SALT = process.env.DASHBOARD_SECRET ?? "";
const COOKIE_NAME = "vdh-session";
const dashboardEnabled = DASHBOARD_PIN.length > 0 && SECRET_SALT.length > 0;

function makeToken(pin: string): string {
  return crypto
    .createHmac("sha256", SECRET_SALT)
    .update(pin)
    .digest("hex");
}

/** Constant-time string comparison, so response timing doesn't leak the PIN. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export async function isAuthenticated(): Promise<boolean> {
  if (!dashboardEnabled) return false;
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session) return false;
  return safeEqual(session.value, makeToken(DASHBOARD_PIN));
}

export async function verifyPinAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const pin = formData.get("pin")?.toString().trim() ?? "";

  if (!dashboardEnabled || !safeEqual(pin, DASHBOARD_PIN)) {
    return { error: "PIN incorect. Încearcă din nou." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, makeToken(DASHBOARD_PIN), {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/vdh-x9k7m2/dashboard");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/vdh-x9k7m2");
}

export async function contactAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email || !message) {
    return { error: "Completează toate câmpurile obligatorii." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Adresa de email nu este validă." };
  }

  try {
    await saveMessage(name, email, message);
    return { success: true };
  } catch {
    return { error: "A apărut o eroare. Încearcă din nou." };
  }
}

export async function markReadAction(id: string): Promise<void> {
  if (!(await isAuthenticated())) return;
  await markRead(id);
  revalidatePath("/vdh-x9k7m2/dashboard");
}

export async function markAllReadAction(): Promise<void> {
  if (!(await isAuthenticated())) return;
  await markAllRead();
  revalidatePath("/vdh-x9k7m2/dashboard");
}

export async function deleteMessageAction(id: string): Promise<void> {
  if (!(await isAuthenticated())) return;
  await deleteMessage(id);
  revalidatePath("/vdh-x9k7m2/dashboard");
}

export async function addProjectAction(
  _prev: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  if (!(await isAuthenticated())) return { error: "Neautorizat." };

  const client  = formData.get("client")?.toString().trim() ?? "";
  const service = formData.get("service")?.toString().trim() ?? "";
  const valStr  = formData.get("value")?.toString().trim() ?? "";
  const status  = (formData.get("status")?.toString() ?? "activ") as "activ" | "finalizat" | "pauza";
  const date    = formData.get("date")?.toString() ?? "";
  const notes   = formData.get("notes")?.toString().trim() ?? "";

  if (!client || !service || !valStr || !date) {
    return { error: "Completează câmpurile obligatorii." };
  }

  const value = parseFloat(valStr);
  if (isNaN(value) || value < 0) {
    return { error: "Valoarea trebuie să fie un număr pozitiv." };
  }

  await addProject({ client, service, value, status, date, notes });
  revalidatePath("/vdh-x9k7m2/dashboard");
  return { success: true };
}

export async function deleteProjectAction(id: string): Promise<void> {
  if (!(await isAuthenticated())) return;
  await deleteProjectById(id);
  revalidatePath("/vdh-x9k7m2/dashboard");
}
