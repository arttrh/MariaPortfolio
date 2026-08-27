"use client";

import { useRef } from "react";
import { gsap, EASE, useGsap, ScrollTrigger } from "@/lib/gsap";
import { metrics } from "@/content/site";

/**
 * Se o valor for numérico (ex.: "72%", "4.4/5"), anima a contagem até ele.
 * Placeholders como "[N]" passam intactos.
 */
function countUp(el: HTMLElement) {
  const raw = el.dataset.value ?? "";
  const match = raw.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return;

  const [, prefix, numText, suffix] = match;
  const decimals = (numText.split(/[.,]/)[1] ?? "").length;
  const separator = numText.includes(",") ? "," : ".";
  const target = parseFloat(numText.replace(",", "."));
  const counter = { value: 0 };

  gsap.to(counter, {
    value: target,
    duration: 1.6,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
    onUpdate: () => {
      const shown = counter.value
        .toFixed(decimals)
        .replace(".", separator);
      el.textContent = `${prefix}${shown}${suffix}`;
    },
  });
}

export default function Metrics() {
  const root = useRef<HTMLElement>(null);

  useGsap(({ scope }) => {
    const q = gsap.utils.selector(scope);

    gsap.fromTo(
      q("[data-anim]"),
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: EASE.standard,
        stagger: 0.08,
        scrollTrigger: { trigger: scope, start: "top 78%", once: true },
      }
    );

    gsap.fromTo(
      q("[data-note]"),
      { opacity: 0, y: 22, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: EASE.spring,
        stagger: 0.1,
        scrollTrigger: { trigger: q("[data-notes]")[0], start: "top 85%", once: true },
      }
    );

    q("[data-count]").forEach((el) => countUp(el as HTMLElement));

    ScrollTrigger.refresh();
  }, root);

  return (
    <section
      ref={root}
      id="numeros"
      aria-label="Números"
      className="scroll-mt-24 border-t border-border bg-surface py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            data-anim
            className="type-heading text-3xl text-heading sm:text-5xl"
          >
            {metrics.title}
          </h2>
          <p data-anim className="mt-5 text-base leading-relaxed text-caption">
            {metrics.subtitle}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {metrics.stats.map((stat) => (
            <div key={stat.label} data-anim className="text-center">
              <p
                data-count
                data-value={stat.value}
                className="type-display text-5xl text-heading sm:text-6xl"
              >
                {stat.value}
              </p>
              <p className="mt-4 text-sm font-semibold text-heading">
                {stat.label}
              </p>
              <p className="mx-auto mt-2 max-w-[22ch] text-sm leading-relaxed text-caption">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        <div
          data-notes
          className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {metrics.notes.map((note, i) => (
            <blockquote
              key={i}
              data-note
              className="rounded-[var(--radius-card)] border border-border bg-background p-7"
            >
              <span
                aria-hidden
                className="block text-3xl leading-none text-border-strong"
              >
                &ldquo;
              </span>
              <p className="mt-3 text-sm leading-relaxed text-body">{note}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
