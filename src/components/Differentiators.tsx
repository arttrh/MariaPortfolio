"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { differentiators } from "@/content/site";

/**
 * Faixa de diferenciais. O briefing é explícito: só publicar o que for real.
 * Se algum item não tiver dado concreto, apague-o em `content/site.ts` em vez
 * de estimar um número.
 */
export default function Differentiators() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section
      ref={root}
      aria-label="Diferenciais"
      className="bg-paper px-6 py-32 sm:px-10 sm:py-44"
    >
      <dl className="mx-auto grid max-w-6xl gap-14 sm:grid-cols-3 sm:gap-10">
        {differentiators.map((item) => (
          <div key={item.label} data-reveal className="text-center sm:text-left">
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span className="t-display block text-ink">{item.value}</span>
              <span className="t-body mt-4 block text-graphite">
                {item.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
