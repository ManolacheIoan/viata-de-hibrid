import { Gateway } from "@/components/Gateway";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  return (
    <>
      <TopBar minimal />
      <main id="main-content" className="relative">
        <h1 className="sr-only">Viața de Hibrid — două lumi, aceeași disciplină</h1>
        <Gateway />
      </main>
    </>
  );
}
