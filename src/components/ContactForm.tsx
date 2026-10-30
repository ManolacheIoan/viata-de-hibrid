"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { contactAction } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-tech px-6 py-4 text-[16px] font-medium text-bg shadow-[0_0_40px_-10px_var(--tech)] transition-[background-color,transform,opacity] duration-200 hover:bg-tech-soft active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Se trimite…" : "Trimite mesajul"}
      {!pending && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(contactAction, null);

  if (state?.success) {
    return (
      <div className="flex w-full flex-col items-center gap-3 px-6 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tech/15 text-[24px] text-tech" aria-hidden="true">✓</span>
        <p className="text-[16px] font-medium text-fg">Mesaj trimis!</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
          Îți mulțumesc. Te contactez în curând.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex w-full flex-col gap-5 text-left"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
          Numele tău
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded-2xl border border-white/10 bg-bg/60 px-4 py-3.5 text-[16px] text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-fg-muted/60 focus:border-tech focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
          Email-ul tău
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-2xl border border-white/10 bg-bg/60 px-4 py-3.5 text-[16px] text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-fg-muted/60 focus:border-tech focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
          Mesajul tău
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="resize-none rounded-2xl border border-white/10 bg-bg/60 px-4 py-3.5 text-[16px] text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-fg-muted/60 focus:border-tech focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
        />
      </div>
      {state?.error && (
        <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-2 text-[14px] text-red-400">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
