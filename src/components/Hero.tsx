"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, EASE, useGsap } from "@/lib/gsap";
import { hero } from "@/content/site";

/**
 * Abertura conduzida pelo retrato: quem chega vê Maria primeiro, o nome
 * funciona como marca e o cartão de credenciais entrega o sinal de confiança
 * (registro no CRC) antes de qualquer rolagem.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);

    const tl = gsap.timeline({ delay: 0.15 });

    tl.fromTo(
      q("[data-name-line]"),
      { yPercent: 112 },
      { yPercent: 0, duration: 1.05, ease: EASE.standard, stagger: 0.09 }
    )
      .fromTo(
        q("[data-rule]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.6"
      )
      .fromTo(
        q("[data-portrait]"),
        { yPercent: 8, autoAlpha: 0, scale: 1.03 },
        { yPercent: 0, autoAlpha: 1, scale: 1, duration: 1.5, ease: EASE.standard },
        "-=0.95"
      )
      .fromTo(
        q("[data-fade]"),
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.standard, stagger: 0.09 },
        "-=1.05"
      )
      .fromTo(
        q("[data-ghost]"),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.4, ease: "power2.out" },
        "-=1.3"
      );

    // Pulso do indicador de disponibilidade.
    gsap.to(q("[data-pulse]"), {
      opacity: 0.25,
      duration: 1.3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Paralaxe sutil: o retrato acompanha o cursor, o fundo vai na contramão.
    const portraitX = gsap.quickTo("[data-portrait]", "x", {
      duration: 0.9,
      ease: "power3.out",
    });
    const portraitY = gsap.quickTo("[data-portrait]", "y", {
      duration: 0.9,
      ease: "power3.out",
    });
    const ghostX = gsap.quickTo("[data-ghost]", "x", {
      duration: 1.2,
      ease: "power3.out",
    });

    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      portraitX(nx * 26);
      portraitY(ny * 14);
      ghostX(nx * -40);
    };

    const fine = window.matchMedia("(pointer: fine)");
    if (fine.matches) window.addEventListener("mousemove", onMove);

    return () => window.removeEventListener("mousemove", onMove);
  }, root);

  return (
    <section
      ref={root}
      id="topo"
      aria-label="Abertura"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream"
    >
      {/* Palavra-fantasma: dá escala e contexto sem competir com o retrato. */}
      <span
        data-ghost
        aria-hidden
        className="type-display pointer-events-none absolute left-1/2 top-[58%] -z-10 max-w-full -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-heading/[0.05]"
        style={{ fontSize: "clamp(2.4rem, 10.5vw, 10rem)" }}
      >
        {hero.ghostWord}
      </span>

      {/* Retrato — âncora visual da página, sangra na base. */}
      {/*
        A altura vive na própria imagem (com w-auto) para que a largura saia
        da proporção real do arquivo. Num wrapper `w-auto` o box encolhe antes
        de a imagem ser medida e o object-contain reduz o retrato à metade.
      */}
      {/*
        Centralização por flex, não por `left-1/2`: num absoluto com
        left:50% a largura shrink-to-fit fica limitada à metade da tela
        (195px no mobile) e o retrato achata. O flex também deixa o
        transform livre para o paralaxe do GSAP.
      */}
      <div
        data-portrait
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] flex justify-center"
      >
        <Image
          src={hero.cutout}
          alt={`${hero.name}, ${hero.role.toLowerCase()}`}
          width={620}
          height={860}
          priority
          className="h-[48svh] w-auto object-contain object-bottom sm:h-[62svh] lg:h-[80svh]"
        />
      </div>

      {/* Degradê na base: assenta o retrato no fundo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[4] h-40"
        style={{
          background:
            "linear-gradient(to top, var(--cream) 8%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-7 pt-7 sm:px-10 sm:pb-9 sm:pt-9">
        {/* ---- Topo: nome como marca + CTA ---- */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="type-display text-heading">
              <span className="sr-only">
                {hero.name} — {hero.role}
              </span>
              <span aria-hidden className="block overflow-hidden">
                <span
                  data-name-line
                  className="block"
                  style={{ fontSize: "clamp(2.6rem, 8.2vw, 7rem)" }}
                >
                  {hero.firstName}
                </span>
              </span>
              <span aria-hidden className="block overflow-hidden">
                <span
                  data-name-line
                  className="block"
                  style={{ fontSize: "clamp(2.6rem, 8.2vw, 7rem)" }}
                >
                  {hero.lastName}
                </span>
              </span>
            </h1>

            <div
              data-rule
              className="mt-4 h-px w-full max-w-[22rem] origin-left bg-heading/25"
            />

            <p
              data-fade
              className="type-eyebrow mt-4 text-[11px] text-caption sm:text-xs"
            >
              {hero.role}
            </p>

            {/*
              A promessa vem logo depois do nome: nome -> o que ela é ->
              o que ela entrega -> prova (cartão de credenciais abaixo).
            */}
            <p
              data-fade
              className="mt-6 max-w-[26rem] text-[15px] leading-relaxed text-body sm:text-base"
            >
              {hero.headline}
            </p>
          </div>

          <a
            data-fade
            href="#contato"
            className="shrink-0 rounded-full bg-inverse-bg px-5 py-3 text-[11px] font-semibold text-inverse-fg transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-xs"
          >
            {hero.ctaLabel}
          </a>
        </div>

        {/* ---- Base: credenciais + rolagem ---- */}
        <div className="mt-auto flex flex-col gap-6 pt-16 sm:flex-row sm:items-end sm:justify-between">
          <div
            data-fade
            className="w-full max-w-xs rounded-2xl border border-heading/10 bg-cream/70 p-5 backdrop-blur-md sm:max-w-sm"
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold text-heading">
              <span
                data-pulse
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-heading"
              />
              {hero.credential.status}
            </p>

            <dl className="mt-4 space-y-2.5 border-t border-heading/10 pt-4">
              {hero.credential.rows.map((row) => (
                <div key={row.label} className="flex gap-3 text-[12px]">
                  <dt className="w-16 shrink-0 text-caption">{row.label}</dt>
                  <dd className="text-body">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            data-fade
            href="#sobre"
            className="type-eyebrow shrink-0 self-start text-[10px] text-caption transition-colors hover:text-heading sm:self-end"
          >
            Rolar ↓
          </a>
        </div>
      </div>
    </section>
  );
}
