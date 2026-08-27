"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, EASE, useGsap, useReducedMotion } from "@/lib/gsap";
import { hero } from "@/content/site";

/**
 * Abertura tipográfica: o nome sobe atrás de uma máscara, uma régua se
 * desenha sob ele e a tela sai para cima. Curta de propósito — a splash não
 * deve atrasar quem veio ver o trabalho.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  const [finished, setFinished] = useState(false);
  const reduced = useReducedMotion();

  // Sem animação, a timeline que chamaria `setFinished` nunca roda — por isso
  // a checagem fica aqui e não no callback do GSAP.
  const done = finished || reduced;

  useEffect(() => {
    if (done) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [done]);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);
    const tl = gsap.timeline({ onComplete: () => setFinished(true) });

    tl.fromTo(
      q("[data-word]"),
      { yPercent: 115 },
      { yPercent: 0, duration: 0.95, ease: EASE.standard, stagger: 0.1 }
    )
      .fromTo(
        q("[data-rule]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
        "-=0.35"
      )
      .fromTo(
        q("[data-role]"),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .to(scope, {
        yPercent: -100,
        duration: 0.85,
        ease: "power3.inOut",
        delay: 0.45,
      });
  }, root);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream px-6"
    >
      <p className="type-display text-center text-heading">
        <span className="block overflow-hidden">
          <span
            data-word
            className="block"
            style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}
          >
            {hero.firstName}
          </span>
        </span>
        <span className="block overflow-hidden">
          <span
            data-word
            className="block"
            style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}
          >
            {hero.lastName}
          </span>
        </span>
      </p>

      <span
        data-rule
        className="mt-5 block h-px w-40 origin-center bg-heading/30"
      />

      <span data-role className="type-eyebrow mt-5 text-[10px] text-caption">
        {hero.role}
      </span>
    </div>
  );
}
