"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, EASE, useGsap } from "@/lib/gsap";
import { editorial, hero } from "@/content/site";

export default function Editorial() {
  const root = useRef<HTMLElement>(null);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);

    gsap.fromTo(
      q("[data-col]"),
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: EASE.standard,
        stagger: 0.14,
        scrollTrigger: { trigger: scope, start: "top 76%", once: true },
      }
    );

    gsap.fromTo(
      q("[data-portrait]"),
      { opacity: 0, scale: 1.04 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: EASE.standard,
        scrollTrigger: {
          trigger: q("[data-portrait]")[0],
          start: "top 88%",
          once: true,
        },
      }
    );
  }, root);

  return (
    <section
      ref={root}
      id="sobre"
      aria-label="Sobre o trabalho"
      className="scroll-mt-24 bg-background py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {editorial.map((column) => (
            <article key={column.heading} data-col>
              <h2 className="type-heading text-3xl text-heading sm:text-4xl">
                {column.heading}
              </h2>
              <p className="mt-6 text-[15px] leading-[1.75] text-body">
                {column.body}
              </p>
            </article>
          ))}
        </div>

        {/*
          Retrato de Maria. Trocar `hero.photo` em src/content/site.ts pelo
          arquivo real (ex.: /images/maria.jpg) — o placeholder atual é um SVG.
        */}
        <figure
          data-portrait
          className="relative mt-24 aspect-[16/7] w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface"
        >
          <Image
            src={hero.photo}
            alt={`Retrato de ${hero.name}, ${hero.role.toLowerCase()}`}
            fill
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="object-cover grayscale"
          />
        </figure>
      </div>
    </section>
  );
}
