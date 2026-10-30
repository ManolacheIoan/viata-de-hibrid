"use client";

import { useTransition } from "react";
import { deleteProjectAction } from "@/app/actions";

export function DeleteProjectButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Ștergi proiectul?")) {
          startTransition(() => deleteProjectAction(id));
        }
      }}
      disabled={pending}
      className="rounded-lg border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted transition-colors hover:border-red-500 hover:text-red-400 disabled:opacity-40"
    >
      {pending ? "…" : "Șterge"}
    </button>
  );
}
