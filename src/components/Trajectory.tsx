"use client";

import { useRef } from "react";
import { gsap, EASE, useGsap, revealIn } from "@/lib/gsap";
import { trajectory } from "@/content/site";

/**
 * Trilha de trabalho.
 *
 * Um trilho vertical que se desenha conforme a página desce, com um marcador
 * por etapa. A linha crescendo é o que transforma uma lista em percurso: o
 * visitante vê a carreira avançando, não um inventário de itens soltos.
 *
 * O trilho é puramente decorativo — a informação vive na lista ordenada, que
 * continua legível por leitor de tela e sem JavaScript.
 */
export default function Trajectory() {
  const root = useRef<HTMLElement>(null);

  useGsap(({ scope }) => {
    revealIn(scope);

    const rail = scope.querySelector<HTMLElement>("[data-rail-fill]");
    const list = scope.querySelector<HTMLElement>("[data-rail-list]");
    if (!rail || !list) return;

    // A linha acompanha a rolagem em vez de tocar uma vez: o percurso é
    // percorrido pelo usuário, não assistido por ele.
    gsap.fromTo(
      rail,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: list,
          start: "top 72%",
          end: "bottom 78%",
          scrub: 0.6,
        },
      }
    );

    gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node) => {
      gsap.fromTo(
        node,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: EASE.out,
          scrollTrigger: { trigger: node, start: "top 82%", once: true },
        }
      );
    });
  }, root);

  return (
    <section
      ref={root}
      id="trajetoria"
      aria-label="Trajetória profissional"
      className="scroll-mt-16 bg-mist px-6 py-32 sm:px-10 sm:py-44"
    >
      <div className="mx-auto max-w-4xl">
        <h2 data-reveal className="t-title text-ink">
          Trajetória
        </h2>
        <p data-reveal className="t-intro mt-6 max-w-xl text-graphite">
          O percurso até aqui, em ordem.
        </p>

        <ol data-rail-list className="relative mt-20">
          {/* Trilho decorativo, atrás dos marcadores. */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-hairline-light sm:left-[calc(6rem+7px)]"
          />
          <div
            data-rail-fill
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-ink sm:left-[calc(6rem+7px)]"
          />

          {trajectory.map((item) => (
            <li
              key={`${item.year}-${item.title}`}
              data-reveal
              className="relative pb-14 pl-9 last:pb-0 sm:pl-[calc(6rem+2.25rem)]"
            >
              {/* Ano à esquerda do trilho em telas largas. */}
              <span
                className="t-caption absolute left-0 top-0 hidden w-24 pt-px text-right tabular-nums text-slate sm:block"
                aria-hidden
              >
                {item.year}
              </span>

              <span
                data-node
                aria-hidden
                className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-[3px] border-mist bg-ink sm:left-24"
              />

              <span className="t-caption mb-2 block tabular-nums text-slate sm:hidden">
                {item.year}
              </span>

              <h3 className="t-headline text-ink">
                <span className="sr-only">{item.year} — </span>
                {item.title}
              </h3>
              <p className="t-body mt-1.5 text-graphite">{item.place}</p>

              {item.description ? (
                <p className="t-body mt-4 max-w-xl text-slate">
                  {item.description}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
