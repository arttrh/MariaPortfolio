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
  Eases equivalentes aos interpoladores do Flora (Compose):

  - OvershootInterpolator(3f)  -> "back.out(3)"        (SplashScreen.kt)
  - Spring(LowBouncy/VeryLow)  -> "back.out(1.4)"      (EnvironmentCard.kt)
  - FastOutSlowInEasing        -> "power2.inOut"       (FloatingLightsBackground.kt)
*/
export const EASE = {
  overshoot: "back.out(3)",
  spring: "back.out(1.4)",
  fastOutSlowIn: "power2.inOut",
  standard: "power3.out",
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

/**
 * Lê a media query de movimento reduzido como uma store externa — o caminho
 * idiomático no React para dados do browser com SSR (o servidor renderiza
 * como `false` e o cliente corrige na hidratação).
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    prefersReducedMotion,
    () => false
  );
}

/**
 * Cria um gsap.context com escopo em `scope`, revertido automaticamente no
 * unmount. Quando o usuário pede movimento reduzido, o callback não roda e os
 * elementos ficam no estado final (garantido pelo CSS em globals.css).
 */
export function useGsap(
  setup: (ctx: { scope: HTMLElement }) => void,
  scope: RefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;

    el.classList.add("anim-ready");
    if (prefersReducedMotion()) return;

    // `setup` é intencionalmente capturado uma vez por mudança de `deps`:
    // as timelines não devem ser recriadas a cada render.
    const ctx = gsap.context(() => setup({ scope: el }), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Reveal padrão do site: fade + subida curta, disparado ao entrar na viewport.
 * Espelha o ritmo de entrada das telas do Flora.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  options: { stagger?: number; y?: number; delay?: number; trigger?: Element } = {}
) {
  const { stagger = 0.09, y = 24, delay = 0, trigger } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: EASE.standard,
      stagger,
      delay,
      scrollTrigger: trigger
        ? { trigger, start: "top 82%", once: true }
        : undefined,
    }
  );
}

export { gsap, ScrollTrigger };
