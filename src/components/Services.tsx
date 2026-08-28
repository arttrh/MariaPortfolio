"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { services } from "@/content/site";

/**
 * Serviços organizados por necessidade do cliente ("Começar", "Manter",
 * "Organizar", "Decidir"), não por nome técnico de produto contábil —
 * cada cartão responde o que é, para que serve e quando importa.
 */
export default function Services() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section
      ref={root}
      id="servicos"
      aria-label="Serviços"
      className="scroll-mt-16 bg-sand px-6 pb-28 pt-20 sm:px-10 sm:pb-36 sm:pt-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p data-reveal className="t-eyebrow text-accent-strong">
            O que Maria pode resolver
          </p>
          <h2 data-reveal className="t-headline mt-5 text-balance text-ink">
            Serviços organizados pelo que você precisa agora
          </h2>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-8">
          {services.map((group) => (
            <li key={group.id} data-reveal>
              <article className="flex h-full flex-col rounded-[var(--radius-stage)] bg-paper-strong p-8 sm:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="t-eyebrow text-accent-strong">{group.need}</span>
                  <span className="t-title text-mute/50" aria-hidden>
                    {group.index}
                  </span>
                </div>

                <h3 className="t-title mt-4 text-balance text-ink">{group.title}</h3>
                <p className="t-body mt-3 text-stone">{group.description}</p>

                <ul className="mt-6 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="t-body text-stone">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="t-caption mt-7 border-t border-line pt-5 text-mute">
                  {group.when}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
