"use client";

import { useRef } from "react";
import { gsap, EASE, useGsap } from "@/lib/gsap";

/**
 * Porte de FloatingLightsBackground.kt.
 *
 * Três halos radiais que derivam lentamente pela tela (ciclos de 15–115s,
 * FastOutSlowIn, repetição em reverse) com o alpha pulsando entre 0.15 e 0.35.
 * Os valores originais estão em milissegundos; aqui em segundos.
 */
const LIGHTS = [
  { x: 18, y: 24, size: 46, driftX: 46, driftY: 32, dx: 38, dy: 29, pulse: 5.2 },
  { x: 72, y: 38, size: 54, driftX: -38, driftY: 44, dx: 61, dy: 47, pulse: 6.4 },
  { x: 44, y: 74, size: 40, driftX: 34, driftY: -28, dx: 52, dy: 38, pulse: 4.6 },
];

export default function FloatingLights({
  className = "",
}: {
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGsap(({ scope }) => {
    const nodes = scope.querySelectorAll<HTMLElement>("[data-light]");

    nodes.forEach((node, i) => {
      const cfg = LIGHTS[i];

      // O -50/-50 substitui o translate de centralização: a partir daqui o
      // GSAP é o dono exclusivo do transform deste elemento.
      gsap.set(node, { xPercent: -50, yPercent: -50 });

      gsap.to(node, {
        xPercent: -50 + cfg.driftX,
        duration: cfg.dx,
        ease: EASE.fastOutSlowIn,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(node, {
        yPercent: -50 + cfg.driftY,
        duration: cfg.dy,
        ease: EASE.fastOutSlowIn,
        repeat: -1,
        yoyo: true,
      });

      gsap.fromTo(
        node,
        { opacity: 0.15 },
        {
          opacity: 0.35,
          duration: cfg.pulse,
          ease: EASE.fastOutSlowIn,
          repeat: -1,
          yoyo: true,
        }
      );
    });
  }, root);

  return (
    <div
      ref={root}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {LIGHTS.map((light, i) => (
        <div
          key={i}
          data-light
          className="absolute rounded-full opacity-20"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: `${light.size}vmax`,
            height: `${light.size}vmax`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--caption) 55%, transparent) 0%, transparent 68%)",
            filter: "blur(28px)",
          }}
        />
      ))}
    </div>
  );
}
