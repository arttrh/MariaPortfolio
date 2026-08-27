"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGsap, revealIn } from "@/lib/gsap";
import { chapters, portrait, type Chapter } from "@/content/site";

/**
 * Capítulos full-bleed alternando claro e escuro. Cada um carrega uma ideia
 * só: rótulo, título e um parágrafo — hierarquia forte e muito espaço em
 * volta, como pede <design_direction>.
 */
function ChapterBlock({ chapter }: { chapter: Chapter }) {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  const dark = chapter.tone === "dark";

  return (
    <section
      ref={root}
      id={chapter.id}
      aria-label={chapter.eyebrow}
      className={`scroll-mt-16 px-6 py-32 sm:px-10 sm:py-44 ${
        dark ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-20">
        <div>
          <p
            data-reveal
            className={`t-eyebrow uppercase ${dark ? "text-fog" : "text-slate"}`}
          >
            {chapter.eyebrow}
          </p>
          <h2 data-reveal className="t-headline mt-5 text-balance">
            {chapter.title}
          </h2>
        </div>

        <p
          data-reveal
          className={`t-intro max-w-2xl self-end ${
            dark ? "text-fog" : "text-graphite"
          }`}
        >
          {chapter.body}
        </p>
      </div>
    </section>
  );
}

/** Faixa editorial com o retrato em preto e branco, entre os capítulos. */
function PortraitBand() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section ref={root} aria-label="Retrato" className="bg-paper px-6 pb-32 sm:px-10 sm:pb-44">
      <figure
        data-reveal
        className="relative mx-auto aspect-[16/7] w-full max-w-6xl overflow-hidden rounded-[var(--radius-stage)] bg-mist"
      >
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="(min-width: 1024px) 72rem, 100vw"
          className="object-cover grayscale"
        />
      </figure>
    </section>
  );
}

export default function Chapters() {
  return (
    <>
      {chapters.map((chapter, i) => (
        <div key={chapter.id}>
          <ChapterBlock chapter={chapter} />
          {i === 0 ? <PortraitBand /> : null}
        </div>
      ))}
    </>
  );
}
