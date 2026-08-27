"use client";

import {
  useLayoutEffect,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/*
  O briefing pede animações "muito sutis". Só entram curvas de saída suave —
  nada de overshoot, mola ou bounce, que chamariam atenção para si mesmas.
*/
export const EASE = {
  out: "power2.out",
  inOut: "power2.inOut",
} as const;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_QUERY).matches;
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Lê a media query de movimento reduzido como store externa (compatível com SSR). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    prefersReducedMotion,
    () => false
  );
}

/**
 * Cria um gsap.context com escopo em `scope`, revertido no unmount.
 * Com movimento reduzido o callback não roda e os elementos ficam no estado
 * final, garantido pelo CSS em globals.css.
 */
export function useGsap(
  setup: (ctx: { scope: HTMLElement }) => void | (() => void),
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;

    el.classList.add("reveal-ready");
    if (prefersReducedMotion()) return;

    // `setup` é capturado uma vez por mudança de `deps`: as timelines não
    // devem ser recriadas a cada render.
    const ctx = gsap.context(() => setup({ scope: el }), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Reveal padrão do site: fade curto com deslocamento de poucos pixels,
 * disparado quando a seção entra na viewport.
 */
export function revealIn(scope: HTMLElement, selector = "[data-reveal]") {
  const targets = scope.querySelectorAll(selector);
  if (!targets.length) return;

  gsap.fromTo(
    targets,
    { opacity: 0, y: 14 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: EASE.out,
      stagger: 0.07,
      scrollTrigger: { trigger: scope, start: "top 80%", once: true },
    }
  );
}

export { gsap, ScrollTrigger };
