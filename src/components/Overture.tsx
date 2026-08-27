"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { overture } from "@/content/site";

/**
 * Uma frase, sozinha na tela — a pausa entre o palco de abertura e os
 * capítulos.
 *
 * É aqui que as folhas da pilha se soltam e caem. A seção é escura de
 * propósito: papel branco não teria leitura nenhuma sobre fundo claro.
 */
export default function Overture() {
  const root = useRef<HTMLElement>(null);
  const [Rain, setRain] = useState<ComponentType<{ className?: string }> | null>(
    null
  );

  useGsap(({ scope }) => revealIn(scope), root);

  useEffect(() => {
    let cancelled = false;

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

    import("@/components/PaperRain").then((mod) => {
      if (!cancelled) setRain(() => mod.default);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={root}
      id="sobre"
      aria-label={overture.eyebrow}
      className="relative isolate scroll-mt-16 overflow-hidden bg-ink px-6 py-44 text-paper sm:px-10 sm:py-60"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {Rain ? <Rain className="h-full w-full" /> : null}
      </div>

      {/* Sombra central: garante o contraste da frase sobre a chuva. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[9]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p data-reveal className="t-eyebrow uppercase text-fog">
          {overture.eyebrow}
        </p>
        <p data-reveal className="t-title mt-8 text-balance">
          {overture.statement}
        </p>
      </div>
    </section>
  );
}
