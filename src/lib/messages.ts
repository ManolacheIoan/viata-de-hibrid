import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const DATA_FILE = path.join(process.cwd(), "data", "messages.json");

async function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ messages: [] }, null, 2));
  }
}

export async function getMessages(): Promise<Message[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const data = JSON.parse(raw) as { messages: Message[] };
  return data.messages.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function saveMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  await ensureFile();
  const messages = await getMessages();
  const entry: Message = {
    id: crypto.randomUUID(),
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
    read: false,
  };
  messages.unshift(entry);
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify({ messages }, null, 2)
  );
}

export async function markRead(id: string): Promise<void> {
  await ensureFile();
  const messages = await getMessages();
  const updated = messages.map((m) =>
    m.id === id ? { ...m, read: true } : m
  );
  await fs.writeFile(DATA_FILE, JSON.stringify({ messages: updated }, null, 2));
}

export async function markAllRead(): Promise<void> {
  await ensureFile();
  const messages = await getMessages();
  const updated = messages.map((m) => ({ ...m, read: true }));
  await fs.writeFile(DATA_FILE, JSON.stringify({ messages: updated }, null, 2));
}

export async function deleteMessage(id: string): Promise<void> {
  await ensureFile();
  const messages = await getMessages();
  const updated = messages.filter((m) => m.id !== id);
  await fs.writeFile(DATA_FILE, JSON.stringify({ messages: updated }, null, 2));
}

export async function getStats() {
  const messages = await getMessages();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(todayStart.getDate() - 7);

  return {
    total: messages.length,
    unread: messages.filter((m) => !m.read).length,
    today: messages.filter((m) => new Date(m.timestamp) >= todayStart).length,
    thisWeek: messages.filter((m) => new Date(m.timestamp) >= weekStart).length,
  };
}
