"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { verifyPinAction } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-tech px-6 py-3 text-[16px] font-medium text-bg shadow-[0_0_24px_-8px_var(--tech)] transition-[background-color,opacity] duration-150 hover:bg-tech-hover disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Se verifică…" : "Intră"}
    </button>
  );
}

export function PinForm() {
  const [state, formAction] = useActionState(verifyPinAction, null);

  return (
    <form
      action={formAction}
      className="flex w-full max-w-[280px] flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="pin" className="text-[13px] font-mono uppercase tracking-[0.1em] text-fg-muted">
          PIN
        </label>
        <input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          maxLength={8}
          required
          autoFocus
          autoComplete="current-password"
          className="rounded-xl border border-border bg-surface px-4 py-3 text-center text-[24px] font-mono tracking-[0.3em] text-fg outline-none transition-colors duration-150 focus:border-tech"
        />
      </div>
      {state?.error && (
        <p className="text-center text-[13px] text-red-400">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}
