"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { gsap, EASE, useGsap } from "@/lib/gsap";
import { hero } from "@/content/site";

/**
 * Palco de abertura: fundo preto sangrando, objeto escultural ao centro e
 * tipografia de display sobre ele. A hierarquia é a do briefing —
 * nome → função → frase curta de impacto → ação.
 *
 * O objeto 3D entra por import dinâmico depois da montagem: ele nunca deve
 * atrasar a primeira pintura do texto, que é o conteúdo que importa.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [Stage, setStage] = useState<ComponentType<{ className?: string }> | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;

    // Sem WebGL não há palco 3D — o degradê de fundo já sustenta a cena.
    const supportsWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return Boolean(
          window.WebGLRenderingContext &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    })();

    if (!supportsWebGL) return;

    import("@/components/Stage3D").then((mod) => {
      if (!cancelled) setStage(() => mod.default);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);

    gsap
      .timeline({ delay: 0.1 })
      .fromTo(
        q("[data-hero-line]"),
        { yPercent: 108 },
        { yPercent: 0, duration: 0.95, ease: EASE.out, stagger: 0.08 }
      )
      .fromTo(
        q("[data-hero-fade]"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: EASE.out, stagger: 0.09 },
        "-=0.55"
      );

    gsap.fromTo(
      q("[data-stage]"),
      { opacity: 0 },
      { opacity: 1, duration: 1.4, ease: EASE.out, delay: 0.25 }
    );
  }, root);

  return (
    <section
      ref={root}
      id="topo"
      aria-label="Abertura"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-6 pt-20 text-center sm:px-10">
        <p data-hero-fade className="t-eyebrow uppercase text-fog">
          {hero.role}
        </p>

        <h1 className="mt-5">
          <span className="sr-only">
            {hero.name} — {hero.role}
          </span>
          <span aria-hidden className="block overflow-hidden">
            <span data-hero-line className="t-display block">
              {hero.name}
            </span>
          </span>
        </h1>

        <p
          data-hero-fade
          className="t-headline mt-7 max-w-3xl text-balance text-paper"
        >
          {hero.statement}
        </p>

        <p
          data-hero-fade
          className="t-intro mt-6 max-w-xl text-balance text-fog"
        >
          {hero.intro}
        </p>

        <div
          data-hero-fade
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-paper px-8 py-3.5 text-[17px] font-medium text-ink transition-opacity hover:opacity-85"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full border border-hairline-dark px-8 py-3.5 text-[17px] font-medium text-paper transition-colors hover:border-paper"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      {/*
        O objeto fica em fluxo, abaixo do texto — nunca sobreposto a ele.
        Assim o contraste do display é garantido pela estrutura, e não por
        ajustes finos de iluminação que quebrariam em outra tela.
      */}
      <div className="relative h-[30svh] w-full shrink-0 sm:h-[34svh]">
        <div data-stage className="absolute inset-0 opacity-0">
          {Stage ? <Stage className="h-full w-full" /> : null}
        </div>

        {/* Assenta o objeto na base da seção. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background: "linear-gradient(to top, #000 12%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
