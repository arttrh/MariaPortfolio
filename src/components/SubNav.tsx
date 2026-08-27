"use client";

import { useEffect, useRef, useState } from "react";
import { brand, nav } from "@/content/site";

/**
 * Barra discreta que aparece depois do palco de abertura, como o briefing
 * pede em <site_architecture>: âncoras para cada seção, surgindo após o
 * scroll inicial. Fundo translúcido para não brigar com o conteúdo.
 */
export default function SubNav() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.75);
        ticking.current = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 border-b border-hairline-light bg-paper/80 backdrop-blur-xl transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
        <a
          href="#topo"
          className="shrink-0 text-[15px] font-semibold tracking-[-0.02em] text-ink"
        >
          {brand.wordmark}
        </a>

        <div className="flex min-w-0 items-center gap-5">
          <ul className="scrollbar-none flex min-w-0 items-center gap-5 overflow-x-auto sm:gap-7">
            {nav.map((item) => (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  className="t-caption whitespace-nowrap text-graphite transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contato"
            className="hidden shrink-0 rounded-full bg-ink px-4 py-1.5 text-[13px] font-medium text-paper transition-opacity hover:opacity-85 sm:block"
          >
            Falar
          </a>
        </div>
      </div>
    </nav>
  );
}
