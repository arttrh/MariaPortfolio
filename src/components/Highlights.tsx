"use client";

import { useCallback, useRef, useState } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { highlights } from "@/content/site";

/**
 * Especialidades numa galeria horizontal com rolagem por encaixe.
 *
 * Acessibilidade: o trilho recebe foco e `aria-label`, então o teclado rola
 * nativamente; os botões de avanço são um atalho, não o único caminho.
 */
export default function Highlights() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useGsap(({ scope }) => revealIn(scope), root);

  const syncEdges = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  const step = (direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      id="especialidades"
      aria-label="Especialidades"
      className="scroll-mt-16 bg-mist py-32 sm:py-44"
    >
      <div className="mx-auto mb-14 flex max-w-6xl items-end justify-between gap-6 px-6 sm:px-10">
        <h2 data-reveal className="t-title text-balance text-ink">
          Especialidades
        </h2>

        <div data-reveal className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Ver especialidade anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-light text-ink transition-opacity hover:bg-paper disabled:opacity-30"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Ver próxima especialidade"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-light text-ink transition-opacity hover:bg-paper disabled:opacity-30"
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <ul
        ref={rail}
        onScroll={syncEdges}
        tabIndex={0}
        aria-label="Áreas de atuação, lista rolável na horizontal"
        className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:px-10"
      >
        {highlights.map((item) => (
          <li
            key={item.index}
            data-reveal
            className="w-[78vw] max-w-[24rem] shrink-0 snap-start sm:w-[24rem]"
          >
            <article className="flex h-full min-h-[22rem] flex-col justify-between rounded-[var(--radius-stage)] bg-ink p-9 text-paper">
              <span className="t-caption text-fog tabular-nums">{item.index}</span>
              <div>
                <h3 className="t-headline text-balance">{item.title}</h3>
                <p className="t-body mt-4 text-fog">{item.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
