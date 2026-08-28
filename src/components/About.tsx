"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGsap, revealIn } from "@/lib/gsap";
import { about } from "@/content/site";

/**
 * A pessoa por trás da marca. Prioriza personalidade profissional a
 * biografia extensa — `background` e `credentials` ficam prontos para
 * receber dado real sem fabricar nada enquanto isso.
 */
export default function About() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  const hasCredentials = about.credentials.length > 0;

  return (
    <section
      ref={root}
      id="sobre"
      aria-label="Sobre Maria"
      className="scroll-mt-16 bg-paper px-6 py-28 sm:px-10 sm:py-36"
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        <div data-reveal className="relative mx-auto w-full max-w-sm md:mx-0">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-stage)] bg-sand">
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              fill
              sizes="(min-width: 768px) 26rem, 85vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p data-reveal className="t-eyebrow text-accent-strong">
            {about.eyebrow}
          </p>
          <h2 data-reveal className="t-headline mt-5 text-balance text-ink">
            {about.name}
          </h2>
          <p data-reveal className="t-label mt-2 text-mute">
            {about.role}
          </p>

          <p data-reveal className="t-body mt-7 max-w-xl text-stone">
            {about.bio}
          </p>
          <p data-reveal className="t-body mt-5 max-w-xl text-mute italic">
            {about.background}
          </p>

          <ul data-reveal className="mt-9 flex flex-col gap-3">
            {about.principles.map((principle) => (
              <li key={principle} className="flex items-start gap-3 text-stone">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="t-body">{principle}</span>
              </li>
            ))}
          </ul>

          {hasCredentials ? (
            <dl data-reveal className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
              {about.credentials.map((item) => (
                <div key={item.label}>
                  <dt className="t-label text-mute">{item.label}</dt>
                  <dd className="t-body mt-1 text-ink">{item.detail}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
