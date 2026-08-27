"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#sobre", label: "Quem sou" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#experiencia", label: "Trajetória" },
  { href: "#contato", label: "Contato" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#topo"
          className="hidden font-display text-sm tracking-wide text-ink sm:inline-block"
        >
          Maria Eduarda
        </a>
        <ul className="flex w-full items-center justify-between text-[10px] uppercase tracking-widest sm:w-auto sm:justify-start sm:gap-8 sm:text-xs">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-graphite transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto h-px max-w-6xl bg-hairline" />
    </nav>
  );
}
