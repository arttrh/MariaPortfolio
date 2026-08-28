"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { process } from "@/content/site";

/**
 * Contratar uma contadora não precisa ser complicado — a sequência é curta
 * de propósito. Números grandes em serifa fazem o ritmo, sem precisar de
 * ícones ou ilustração.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section
      ref={root}
      id="como-funciona"
      aria-label="Como funciona"
      className="scroll-mt-16 bg-ink px-6 py-28 text-paper sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p data-reveal className="t-eyebrow text-accent-on-dark">
            Do primeiro contato ao dia a dia
          </p>
          <h2 data-reveal className="t-headline mt-5 text-balance">
            Como funciona
          </h2>
        </div>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-4">
          {process.map((step) => (
            <li key={step.index} data-reveal>
              <span className="t-display block text-fog/50" aria-hidden>
                {step.index}
              </span>
              <h3 className="t-title mt-3 text-balance text-paper">{step.title}</h3>
              <p className="t-body mt-3 text-fog">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
