import Image from "next/image";
import { hero } from "@/content/site";

export default function Hero() {
  return (
    <section
      id="topo"
      aria-label="Abertura"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink text-paper"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-28 sm:px-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-32">
        <div className="order-2 md:order-1">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-paper/60">
            {hero.role}
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-light tracking-tight sm:text-6xl md:text-7xl">
            {hero.name}
          </h1>
          <p className="mt-8 max-w-md font-display text-xl italic text-paper/80 sm:text-2xl">
            {hero.headline}
          </p>
          <div className="mt-12 flex items-center gap-4">
            <a
              href="#contato"
              className="border border-paper/70 px-6 py-3 text-xs uppercase tracking-widest transition-colors hover:bg-paper hover:text-ink"
            >
              Falar com Maria
            </a>
            <a
              href="#sobre"
              className="text-xs uppercase tracking-widest text-paper/60 transition-colors hover:text-paper"
            >
              Conhecer o trabalho ↓
            </a>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-xs md:order-2 md:max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] border border-paper/15">
            <Image
              src={hero.photo}
              alt={`Retrato de ${hero.name}, ${hero.role.toLowerCase()}`}
              fill
              priority
              sizes="(min-width: 768px) 384px, 320px"
              className="object-cover grayscale"
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-paper/10"
      />
    </section>
  );
}
