"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { trust } from "@/content/site";

/**
 * Confiança construída com o que já é verificável — princípios de trabalho,
 * não números inflados. `testimonials` aparece automaticamente assim que
 * houver depoimentos reais para publicar.
 */
export default function Trust() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  const hasTestimonials = trust.testimonials.length > 0;

  return (
    <section ref={root} aria-label="Confiança" className="bg-paper px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p data-reveal className="t-eyebrow text-accent-strong">
            {trust.eyebrow}
          </p>
          <h2 data-reveal className="t-headline mt-5 text-balance text-ink">
            {trust.title}
          </h2>
        </div>

        <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.principles.map((principle) => (
            <div key={principle.label} data-reveal>
              <dt className="t-title text-ink">{principle.label}</dt>
              <dd className="t-body mt-3 text-stone">{principle.description}</dd>
            </div>
          ))}
        </dl>

        {hasTestimonials ? (
          <ul className="mt-20 grid gap-8 border-t border-line pt-16 sm:grid-cols-2">
            {trust.testimonials.map((item) => (
              <li key={item.author} data-reveal className="rounded-[var(--radius-card)] bg-sand p-8">
                <p className="t-body text-balance text-ink">&ldquo;{item.quote}&rdquo;</p>
                <p className="t-caption mt-4 text-mute">
                  {item.author} · {item.role}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
