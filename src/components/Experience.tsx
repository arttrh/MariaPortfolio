"use client";

import { useRef } from "react";
import { gsap, EASE, useGsap } from "@/lib/gsap";
import { experience } from "@/content/site";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);

    gsap.fromTo(
      q("[data-title]"),
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: EASE.standard,
        scrollTrigger: { trigger: scope, start: "top 80%", once: true },
      }
    );

    gsap.fromTo(
      q("[data-row]"),
      { opacity: 0, x: -18 },
      {
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: EASE.standard,
        stagger: 0.1,
        scrollTrigger: { trigger: q("[data-list]")[0], start: "top 84%", once: true },
      }
    );

    // A régua da timeline se desenha conforme a seção entra.
    gsap.fromTo(
      q("[data-rule]"),
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.1,
        ease: "power2.inOut",
        scrollTrigger: { trigger: q("[data-list]")[0], start: "top 84%", once: true },
      }
    );
  }, root);

  return (
    <section
      ref={root}
      id="trajetoria"
      aria-label="Formação e experiência"
      className="scroll-mt-24 bg-background py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <h2
          data-title
          className="type-heading text-3xl text-heading sm:text-4xl"
        >
          Trajetória
        </h2>

        <div data-list className="mt-14">
          <div data-rule className="h-px w-full bg-border" />
          <ol>
            {experience.map((item) => (
              <li
                key={`${item.year}-${item.title}`}
                data-row
                className="border-b border-border"
              >
                <div className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-10">
                  <span className="text-sm tabular-nums text-caption sm:w-24 sm:shrink-0">
                    {item.year}
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-heading">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-caption">{item.place}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
