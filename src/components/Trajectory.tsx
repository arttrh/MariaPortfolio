"use client";

import { useRef } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { trajectory } from "@/content/site";

export default function Trajectory() {
  const root = useRef<HTMLElement>(null);
  useGsap(({ scope }) => revealIn(scope), root);

  return (
    <section
      ref={root}
      id="trajetoria"
      aria-label="Formação e experiência"
      className="scroll-mt-16 bg-mist px-6 py-32 sm:px-10 sm:py-44"
    >
      <div className="mx-auto max-w-6xl">
        <h2 data-reveal className="t-title text-ink">
          Trajetória
        </h2>

        <ol className="mt-16 border-t border-hairline-light">
          {trajectory.map((item) => (
            <li
              key={`${item.year}-${item.title}`}
              data-reveal
              className="border-b border-hairline-light"
            >
              <div className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-12">
                <span className="t-caption shrink-0 tabular-nums text-slate sm:w-24">
                  {item.year}
                </span>
                <div>
                  <p className="t-headline text-ink">{item.title}</p>
                  <p className="t-body mt-2 text-graphite">{item.place}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
