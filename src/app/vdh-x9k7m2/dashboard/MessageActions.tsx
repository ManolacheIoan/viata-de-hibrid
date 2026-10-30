"use client";

import { useTransition } from "react";
import {
  markReadAction,
  deleteMessageAction,
  markAllReadAction,
} from "@/app/actions";

export function MarkReadButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => markReadAction(id))}
      disabled={pending}
      className="rounded-lg border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted transition-colors hover:border-tech hover:text-tech disabled:opacity-40"
    >
      {pending ? "…" : "Citit"}
    </button>
  );
}

export function DeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Ștergi mesajul?")) {
          startTransition(() => deleteMessageAction(id));
        }
      }}
      disabled={pending}
      className="rounded-lg border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted transition-colors hover:border-red-500 hover:text-red-400 disabled:opacity-40"
    >
      {pending ? "…" : "Șterge"}
    </button>
  );
}

export function MarkAllReadButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => markAllReadAction())}
      disabled={pending}
      className="rounded-lg border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted transition-colors hover:border-tech hover:text-tech disabled:opacity-40"
    >
      {pending ? "…" : "Marchează toate ca citite"}
    </button>
  );
}
