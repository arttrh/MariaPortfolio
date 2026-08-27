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

/**
 * Faixa editorial com o retrato.
 *
 * Quadro 4:5 e largura contida: a foto é vertical, e forçá-la num banner
 * panorâmico cortaria o rosto. O preto e branco vem do filtro CSS, para a
 * imagem não brigar com a paleta do site.
 */
function PortraitBand() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  const hasCaption =
    portrait.caption.trim().length > 0 && !portrait.caption.startsWith("[INSIRA");

  return (
    <section
      ref={root}
      aria-label="Retrato"
      className="bg-paper px-6 pb-32 sm:px-10 sm:pb-44"
    >
      <figure data-reveal className="mx-auto w-full max-w-sm">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-stage)] bg-mist">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            fill
            sizes="(min-width: 640px) 24rem, 100vw"
            className="object-cover grayscale"
          />
        </div>
        {hasCaption ? (
          <figcaption className="t-caption mt-4 text-center text-slate">
            {portrait.caption}
          </figcaption>
        ) : null}
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
