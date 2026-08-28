"use client";

import { useState } from "react";
import { brand, nav, primaryContact } from "@/content/site";

/**
 * Cabeçalho institucional, sempre visível — diferente de uma sub-nav que só
 * aparece depois do scroll, aqui o visitante precisa localizar navegação e
 * CTA principal desde o primeiro segundo, como em uma página de conversão.
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
        <a href="#topo" className="flex shrink-0 items-baseline gap-2">
          <span className="font-serif text-lg font-medium text-accent-strong">
            {brand.monogram}
          </span>
          <span className="text-[15px] font-medium tracking-[-0.01em] text-ink">
            {brand.wordmark}
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="t-label text-stone transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={primaryContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden px-5 py-2.5 text-[14px] sm:inline-flex"
          >
            Falar com Maria
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-line bg-paper px-6 py-5 md:hidden">
          <nav aria-label="Navegação, versão móvel" className="flex flex-col gap-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="t-body text-stone transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={primaryContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-2 w-full"
            >
              Falar com Maria
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
