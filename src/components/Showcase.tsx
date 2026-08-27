"use client";

import { useRef, useState } from "react";
import { gsap, EASE, useGsap } from "@/lib/gsap";
import { specialties } from "@/content/site";

/**
 * Vitrine de especialidades apresentada dentro de uma moldura de janela.
 * A barra lateral troca o conteúdo do painel, com transição GSAP — o mesmo
 * padrão de navegação lateral usado nas telas do app de referência.
 */
export default function Showcase() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);

    gsap.fromTo(
      q("[data-title]"),
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE.standard,
        scrollTrigger: { trigger: scope, start: "top 78%", once: true },
      }
    );

    gsap.fromTo(
      q("[data-window]"),
      { opacity: 0, y: 56, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: EASE.spring,
        scrollTrigger: { trigger: scope, start: "top 70%", once: true },
      }
    );

    // Deriva lenta do grafismo de fundo.
    gsap.to(q("[data-bloom]"), {
      rotation: 18,
      scale: 1.06,
      duration: 22,
      ease: EASE.fastOutSlowIn,
      repeat: -1,
      yoyo: true,
    });
  }, root);

  const select = (index: number) => {
    if (index === active) return;
    setActive(index);

    const body = panel.current;
    if (!body) return;

    gsap.fromTo(
      body,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, ease: EASE.standard }
    );
  };

  const current = specialties[active];

  return (
    <section
      ref={root}
      id="especialidades"
      aria-label="Especialidades"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-surface py-28 sm:py-36"
    >
      {/* Grafismo desfocado atrás da janela — eco do render de abertura. */}
      <div
        data-bloom
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-[8%] hidden h-[46rem] w-[46rem] opacity-[0.07] blur-2xl lg:block"
        style={{
          background:
            "conic-gradient(from 0deg, var(--foreground) 0deg 40deg, transparent 40deg 72deg, var(--foreground) 72deg 112deg, transparent 112deg 144deg, var(--foreground) 144deg 184deg, transparent 184deg 216deg, var(--foreground) 216deg 256deg, transparent 256deg 288deg, var(--foreground) 288deg 328deg, transparent 328deg 360deg)",
          borderRadius: "50%",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <h2
          data-title
          className="type-display text-center text-4xl text-heading sm:text-6xl"
        >
          especialidades
        </h2>

        <div
          data-window
          className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-black/10"
        >
          {/* Barra de título */}
          <div className="flex items-center gap-2 border-b border-border bg-surface-container px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-border-strong" />
            <span className="h-3 w-3 rounded-full bg-border-strong" />
            <span className="h-3 w-3 rounded-full bg-border-strong" />
            <span className="ml-3 text-xs text-caption">
              Maria Eduarda — Áreas de atuação
            </span>
          </div>

          <div className="grid min-h-[19rem] grid-cols-1 sm:grid-cols-[13rem_1fr]">
            {/* Barra lateral */}
            <nav
              aria-label="Áreas de atuação"
              className="border-b border-border p-3 sm:border-b-0 sm:border-r"
            >
              <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-caption">
                Áreas
              </p>
              <ul className="space-y-0.5">
                {specialties.map((item, i) => (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={i === active ? "true" : undefined}
                      className={`flex w-full gap-2 rounded-lg px-3 py-2 text-left text-[13px] leading-snug transition-colors ${
                        i === active
                          ? "bg-surface-container font-semibold text-heading"
                          : "text-body hover:bg-surface"
                      }`}
                    >
                      <span className="tabular-nums text-caption">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="line-clamp-2">{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Painel */}
            <div ref={panel} className="p-7 sm:p-10">
              <h3 className="type-heading text-xl text-heading sm:text-2xl">
                {current.title}
              </h3>
              <p className="mt-4 max-w-prose text-[15px] leading-[1.75] text-body">
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
