"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { problemSolution } from "@/content/site";

/**
 * Identificação → ponte → solução. A composição é literal: os problemas
 * vivem no fundo escuro; a solução emerge num cartão claro por cima —
 * "existe uma forma mais simples" ganha forma visual, não só textual.
 */
export default function ProblemSolution() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section ref={root} aria-label="Problema e solução" className="bg-ink px-6 pt-28 pb-0 text-paper sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-4xl text-center">
        <p data-reveal className="t-eyebrow text-accent-on-dark">
          {problemSolution.eyebrow}
        </p>
        <h2 data-reveal className="t-headline mt-5 text-balance">
          {problemSolution.title}
        </h2>
      </div>

      <ul className="mx-auto mt-14 flex max-w-3xl flex-col gap-6 sm:mt-16">
        {problemSolution.problems.map((problem, i) => (
          <li
            key={problem}
            data-reveal
            className="flex items-start gap-5 border-t border-line-dark pt-6 first:border-t-0 first:pt-0"
          >
            <span className="t-title shrink-0 text-fog/60" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="t-subheadline text-balance pt-1 text-paper">{problem}</p>
          </li>
        ))}
      </ul>

      <p data-reveal className="mx-auto mt-14 max-w-md text-center t-body text-fog sm:mt-16">
        {problemSolution.bridge}
      </p>

      <div className="relative mx-auto mt-14 max-w-4xl translate-y-1/3 px-2 sm:mt-16">
        <div
          data-reveal
          className="rounded-[var(--radius-stage)] bg-paper-strong px-8 py-12 text-center shadow-[0_30px_60px_-25px_rgba(23,19,15,0.35)] sm:px-14 sm:py-16"
        >
          <p className="t-eyebrow text-accent-strong">{problemSolution.solution.eyebrow}</p>
          <h3 className="t-headline mt-5 text-balance text-ink">
            {problemSolution.solution.title}
          </h3>
          <p className="t-body mx-auto mt-6 max-w-2xl text-balance text-stone">
            {problemSolution.solution.body}
          </p>
        </div>
      </div>

      {/* Espaço reservado para o cartão que transborda por cima da próxima seção. */}
      <div aria-hidden className="h-[9rem] sm:h-[10rem]" />
    </section>
  );
}
