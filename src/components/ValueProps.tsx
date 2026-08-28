"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { valueProps } from "@/content/site";

/**
 * Faixa curta logo após o hero — responde "por que continuar olhando este
 * site" em poucos segundos, sem competir visualmente com a abertura.
 */
export default function ValueProps() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section ref={root} aria-label="Diferenciais rápidos" className="border-b border-line bg-paper-strong">
      <ul className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 sm:px-10 sm:py-16 lg:grid-cols-4 lg:gap-8">
        {valueProps.map((item) => (
          <li key={item.label} data-reveal className="flex flex-col gap-2 lg:border-l lg:border-line lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="t-body font-medium text-ink">{item.label}</p>
            <p className="t-caption text-mute">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
