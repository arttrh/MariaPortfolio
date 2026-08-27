"use client";

import { useEffect, useRef, useState } from "react";
import Mark from "@/components/Mark";
import { gsap, EASE, useGsap, useReducedMotion } from "@/lib/gsap";

/**
 * Porte direto de SplashScreen.kt:
 *   1. escala 0 -> 1 com OvershootInterpolator(3f) em 900ms
 *   2. rotação 720° em 2000ms (FastOutSlowIn)
 *   3. pausa de 600ms e sai
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  const [finished, setFinished] = useState(false);
  const reduced = useReducedMotion();

  // Quem pede movimento reduzido nunca vê a splash — sem ela, a animação
  // que dispararia `setFinished` também não roda, então a checagem tem de
  // entrar aqui e não no callback do GSAP.
  const done = finished || reduced;

  // Trava o scroll enquanto a splash está visível.
  useEffect(() => {
    if (done) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [done]);

  useGsap(({ scope }) => {
    const mark = scope.querySelector("[data-mark]");
    const tl = gsap.timeline({ onComplete: () => setFinished(true) });

    tl.fromTo(
      mark,
      { scale: 0, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.9, ease: EASE.overshoot }
    )
      .to(mark, { rotation: 720, duration: 2, ease: EASE.fastOutSlowIn })
      .to(scope, { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.6");
  }, root);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
    >
      <div data-mark className="h-40 w-40">
        <Mark className="h-full w-full" />
      </div>
    </div>
  );
}
