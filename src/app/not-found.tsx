import { TopBar } from "@/components/TopBar";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
      <TopBar />
      <div aria-hidden="true" className="absolute left-[10%] top-[20%] h-[50%] w-[40%] rounded-full bg-tech/20 blur-[120px] animate-aurora" />
      <div aria-hidden="true" className="absolute right-[10%] top-[30%] h-[50%] w-[40%] rounded-full bg-sport/20 blur-[120px] animate-aurora [animation-delay:-7s]" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50 mask-fade-b" />

      <main id="main-content" className="relative flex flex-1 items-center justify-center py-32">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="font-display text-[120px] font-bold leading-none tracking-[-0.06em] text-stroke md:text-[200px]">
            404
          </span>
          <h1 className="font-display text-[36px] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[56px]">
            Pagina nu a fost <span className="font-serif font-normal italic">găsită.</span>
          </h1>
          <p className="max-w-[44ch] text-[17px] leading-[1.6] text-fg-secondary">
            Ai nimerit într-un loc care nu există în niciuna dintre cele
            două lumi.
          </p>
          <div className="mt-4">
            <Button href="/" variant="neutral">
              Înapoi la pagina principală
            </Button>
          </div>
        </Container>
      </main>
    </div>
  );
}
