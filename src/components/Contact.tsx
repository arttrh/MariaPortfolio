"use client";

import { useRef, useState, type FormEvent } from "react";
import { gsap, EASE, useGsap } from "@/lib/gsap";
import ParticleField from "@/components/ParticleField";
import { contact } from "@/content/site";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
  }, root);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Contato pelo site — ${name}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const fieldClass =
    "mt-2 w-full border-0 border-b border-border bg-transparent py-2 text-inverse-fg outline-none transition-colors focus:border-inverse-fg placeholder:text-inverse-fg/50";

  return (
    <section
      ref={root}
      id="contato"
      aria-label="Contato"
      className="relative scroll-mt-24 overflow-hidden bg-inverse-bg py-28 text-inverse-fg sm:py-36"
    >
      <ParticleField className="opacity-60" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 sm:px-10 md:grid-cols-2 md:gap-20">
        <div>
          <h2
            data-anim
            className="type-display text-4xl sm:text-6xl"
          >
            {contact.cta}
          </h2>
          <div className="mt-10 space-y-4 text-sm">
            <a
              data-anim
              href={`mailto:${contact.email}`}
              className="block w-fit border-b border-inverse-fg/30 pb-1 transition-colors hover:border-current"
            >
              {contact.email}
            </a>
            <a
              data-anim
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar no WhatsApp"
              className="block w-fit border-b border-inverse-fg/30 pb-1 transition-colors hover:border-current"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <form data-anim onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label
              htmlFor="name"
              className="type-eyebrow text-[10px] text-inverse-fg/70"
            >
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="type-eyebrow text-[10px] text-inverse-fg/70"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="type-eyebrow text-[10px] text-inverse-fg/70"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${fieldClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            className="rounded-[var(--radius-card)] border border-current px-6 py-3 type-eyebrow text-[10px] transition-colors hover:bg-inverse-fg hover:text-inverse-bg"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
