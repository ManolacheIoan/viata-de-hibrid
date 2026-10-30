import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/actions";
import { PinForm } from "./PinForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PinPage() {
  if (await isAuthenticated()) {
    redirect("/vdh-x9k7m2/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-4">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-fg-muted">
            Viața de Hibrid
          </span>
          <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-fg">
            Control Panel
          </h1>
        </div>
        <PinForm />
      </div>
    </main>
  );
}
