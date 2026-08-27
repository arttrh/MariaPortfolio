"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { overture } from "@/content/site";

/**
 * Uma frase, sozinha na tela. É a pausa entre o palco de abertura e os
 * capítulos — o espaço negativo aqui é o próprio recurso de design.
 */
export default function Overture() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section
      ref={root}
      id="sobre"
      aria-label={overture.eyebrow}
      className="scroll-mt-16 bg-paper px-6 py-36 sm:px-10 sm:py-52"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p data-reveal className="t-eyebrow uppercase text-slate">
          {overture.eyebrow}
        </p>
        <p data-reveal className="t-title mt-8 text-balance text-ink">
          {overture.statement}
        </p>
      </div>
    </section>
  );
}
