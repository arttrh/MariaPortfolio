"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { audience } from "@/content/site";
import RegionalFilter from "@/components/RegionalFilter";

/**
 * Filtro de público em duas camadas: perfil profissional (chips de
 * autoidentificação) e região de atendimento (verificador ao lado).
 * Juntas respondem "esse atendimento foi feito para alguém como eu?".
 */
export default function Audience() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section ref={root} aria-label="Público atendido" className="bg-paper px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1fr] md:gap-16">
        <div>
          <p data-reveal className="t-eyebrow text-accent-strong">
            {audience.eyebrow}
          </p>
          <h2 data-reveal className="t-headline mt-5 text-balance text-ink">
            {audience.title}
          </h2>
          <p data-reveal className="t-body mt-5 max-w-md text-stone">
            {audience.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {audience.profiles.map((profile) => (
              <li
                key={profile}
                data-reveal
                className="rounded-full border border-line bg-paper-strong px-5 py-2.5 text-[15px] text-stone"
              >
                {profile}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <RegionalFilter />
        </div>
      </div>
    </section>
  );
}
