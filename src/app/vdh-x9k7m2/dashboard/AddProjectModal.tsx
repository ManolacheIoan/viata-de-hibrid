"use client";

import { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addProjectAction } from "@/app/actions";
import { SERVICE_OPTIONS } from "./mock-data";

const inputCls =
  "w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-[14px] text-fg outline-none transition-colors focus:border-tech placeholder:text-fg-muted";
const selectCls =
  "w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-[14px] text-fg outline-none transition-colors focus:border-tech";

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-fg-secondary">
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-tech px-5 py-2.5 text-[14px] font-medium text-bg transition-[background-color,opacity] hover:bg-tech-hover disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Se salvează…" : "Salvează proiect"}
    </button>
  );
}

function Modal({ onClose }: { onClose: () => void }) {
  const [state, formAction] = useActionState(addProjectAction, null);

  useEffect(() => {
    if (state?.success) onClose();
  }, [state?.success, onClose]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-[480px] rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-fg">
            Proiect nou
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-border hover:text-fg"
            aria-label="Închide"
          >
            ✕
          </button>
        </div>

        <form action={formAction} className="space-y-4">
          <Field label="Client" id="client" required>
            <input
              id="client" name="client" type="text" required
              placeholder="ex. Cabinet Medical Dr. Pop"
              className={inputCls}
            />
          </Field>

          <Field label="Serviciu" id="service" required>
            <select id="service" name="service" required className={selectCls}>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Valoare (RON)" id="value" required>
              <input
                id="value" name="value" type="number"
                min="0" step="50" required
                placeholder="1500"
                className={inputCls}
              />
            </Field>
            <Field label="Status" id="status">
              <select id="status" name="status" className={selectCls}>
                <option value="activ">Activ</option>
                <option value="finalizat">Finalizat</option>
                <option value="pauza">Pauza</option>
              </select>
            </Field>
          </div>

          <Field label="Data (factură / livrare)" id="date" required>
            <input
              id="date" name="date" type="date" required
              defaultValue={today}
              className={inputCls}
            />
          </Field>

          <Field label="Note" id="notes">
            <textarea
              id="notes" name="notes" rows={2}
              placeholder="Detalii opționale…"
              className={`${inputCls} resize-none`}
            />
          </Field>

          {state?.error && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-[13px] text-red-400">
              {state.error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border px-5 py-2.5 text-[14px] text-fg-muted transition-colors hover:text-fg"
            >
              Anulează
            </button>
            <SubmitBtn />
          </div>
        </form>
      </div>
    </div>
  );
}

export function AddProjectButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-tech/40 bg-tech/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-tech transition-colors hover:bg-tech/20"
      >
        <span aria-hidden="true">+</span>
        Adaugă proiect
      </button>
      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  );
}
