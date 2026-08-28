"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { faq, primaryContact } from "@/content/site";

/**
 * `<details>`/`<summary>` nativos: acordeão acessível por teclado e leitor
 * de tela sem JavaScript extra, com o ícone só como reforço visual.
 */
export default function FAQ() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section
      ref={root}
      id="duvidas"
      aria-label="Perguntas frequentes"
      className="scroll-mt-16 bg-sand px-6 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <p data-reveal className="t-eyebrow text-accent-strong">
            Dúvidas
          </p>
          <h2 data-reveal className="t-headline mt-5 text-balance text-ink">
            Perguntas frequentes
          </h2>
          <p data-reveal className="t-body mt-5 max-w-sm text-stone">
            Não encontrou sua dúvida? Fale direto com Maria.
          </p>
          <a
            data-reveal
            href={primaryContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary-light mt-6 inline-flex"
          >
            Falar com Maria
          </a>
        </div>

        <div data-reveal className="flex flex-col gap-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-[var(--radius-card)] border border-line bg-paper-strong px-6 py-5 open:pb-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="t-body font-medium text-ink">{item.question}</span>
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="t-body mt-3 max-w-xl text-stone">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
