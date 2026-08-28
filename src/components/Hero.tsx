"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, EASE, useGsap } from "@/lib/gsap";
import { hero } from "@/content/site";

/**
 * Palco de abertura. A fotografia de Maria é o elemento visual principal —
 * nenhum efeito decorativo compete com ela. Hierarquia: eyebrow → headline
 * → subheadline → ações, com a foto ancorando a composição ao lado.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);

    gsap
      .timeline({ delay: 0.1 })
      .fromTo(
        q("[data-hero-fade]"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: EASE.out, stagger: 0.1 }
      )
      .fromTo(
        q("[data-hero-photo]"),
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1, ease: EASE.out },
        "-=0.6"
      );
  }, root);

  return (
    <section
      ref={root}
      id="topo"
      aria-label="Abertura"
      className="relative isolate overflow-hidden bg-ink text-paper"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:px-10 sm:py-32 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16 md:py-36">
        <div>
          <p data-hero-fade className="t-eyebrow text-accent-on-dark">
            {hero.eyebrow}
          </p>

          <h1 data-hero-fade className="t-display mt-6 text-balance">
            {hero.headline}
          </h1>

          <p data-hero-fade className="t-subheadline mt-7 max-w-lg text-balance text-fog">
            {hero.subheadline}
          </p>

          <div data-hero-fade className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full sm:w-auto"
            >
              {hero.primaryCta.label}
              <span aria-hidden className="btn-arrow">→</span>
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-secondary-dark w-full sm:w-auto">
              {hero.secondaryCta.label}
              <span aria-hidden className="btn-arrow">→</span>
            </a>
          </div>

          <p data-hero-fade className="t-caption mt-8 flex items-center gap-2 text-fog">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-on-dark" />
            {hero.signal}
          </p>
        </div>

        <div data-hero-photo className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-stage)] bg-sand">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              priority
              sizes="(min-width: 768px) 32rem, 85vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute -bottom-5 -left-5 hidden h-24 w-24 rounded-2xl border border-line-dark sm:block"
          />
        </div>
      </div>
    </section>
  );
}
