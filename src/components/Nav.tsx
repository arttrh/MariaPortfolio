"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/content/site";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#numeros", label: "Números" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#contato", label: "Contato" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.6);
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
      className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 sm:px-10">
        <a
          href="#topo"
          className="hidden shrink-0 text-sm font-semibold lowercase tracking-tight text-heading sm:block"
        >
          {brand.wordmark}
        </a>
        {/* Em telas estreitas os cinco itens não cabem: a lista rola na
            horizontal em vez de cortar o último link. */}
        <ul className="scrollbar-none flex w-full items-center gap-5 overflow-x-auto text-[10px] sm:w-auto sm:gap-7 sm:overflow-visible sm:text-[11px]">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <a
                href={link.href}
                className="type-eyebrow whitespace-nowrap text-caption transition-colors hover:text-heading"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
