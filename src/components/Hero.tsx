"use client";

import { useRef } from "react";
import Mark from "@/components/Mark";
import FloatingLights from "@/components/FloatingLights";
import { gsap, EASE, useGsap } from "@/lib/gsap";
import { hero } from "@/content/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      q("[data-hero-mark]"),
      { scale: 0.4, autoAlpha: 0, rotation: -60 },
      { scale: 1, autoAlpha: 1, rotation: 0, duration: 1.4, ease: EASE.overshoot }
    )
      .fromTo(
        q("[data-petal]"),
        { scale: 0.72, transformOrigin: "0px 0px" },
        { scale: 1, duration: 1.1, ease: EASE.spring, stagger: 0.07 },
        "-=1.05"
      )
      .fromTo(
        q("[data-hero-line]"),
        { yPercent: 118 },
        { yPercent: 0, duration: 1, ease: EASE.standard, stagger: 0.08 },
        "-=0.85"
      )
      .fromTo(
        q("[data-hero-fade]"),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.standard, stagger: 0.1 },
        "-=0.5"
      );

    // Deriva contínua da marca depois da entrada.
    gsap.to(q("[data-hero-mark]"), {
      y: -14,
      duration: 6,
      ease: EASE.fastOutSlowIn,
      repeat: -1,
      yoyo: true,
      delay: 1.8,
    });
  }, root);

  return (
    <section
      ref={root}
      id="topo"
      aria-label="Abertura"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-cream"
    >
      <FloatingLights />

      {/* Vinheta suave — reproduz o fundo do render de referência. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, transparent 38%, color-mix(in srgb, var(--cream-deep) 70%, transparent) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-8 sm:px-10">
        <header className="flex items-start justify-between">
          <span
            data-hero-fade
            className="text-lg font-medium lowercase tracking-tight text-heading sm:text-xl"
          >
            {hero.name.toLowerCase()}
          </span>
          <span
            data-hero-fade
            className="type-eyebrow text-[10px] text-caption sm:text-xs"
          >
            {hero.role}
          </span>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center py-10">
          <div data-hero-mark className="w-44 sm:w-56 md:w-64">
            <Mark className="h-full w-full" />
          </div>

          <h1 className="sr-only">
            {hero.name} — {hero.role}
          </h1>

          <div
            aria-hidden
            className="mt-12 overflow-hidden text-center sm:mt-16"
          >
            <span
              data-hero-line
              className="type-display block text-5xl text-heading sm:text-7xl md:text-8xl"
            >
              {hero.name.split(" ")[0]}
            </span>
          </div>
          <div aria-hidden className="overflow-hidden text-center">
            <span
              data-hero-line
              className="type-display block text-5xl text-caption sm:text-7xl md:text-8xl"
            >
              {hero.name.split(" ").slice(1).join(" ")}
            </span>
          </div>

          <p
            data-hero-fade
            className="mt-8 max-w-md text-center text-base leading-relaxed text-body sm:text-lg"
          >
            {hero.headline}
          </p>
        </div>

        <footer className="flex items-center justify-between pb-4">
          <a
            data-hero-fade
            href="#numeros"
            className="type-eyebrow text-[10px] text-caption transition-colors hover:text-heading sm:text-xs"
          >
            Rolar ↓
          </a>
          <a
            data-hero-fade
            href="#contato"
            className="rounded-[var(--radius-card)] border border-border-strong px-5 py-2.5 type-eyebrow text-[10px] text-heading transition-colors hover:bg-inverse-bg hover:text-inverse-fg sm:text-xs"
          >
            Falar com Maria
          </a>
        </footer>
      </div>
    </section>
  );
}
