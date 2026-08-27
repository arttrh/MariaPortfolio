"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Contato pelo site — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contato"
      aria-label="Contato"
      className="scroll-mt-24 bg-paper py-28 sm:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 sm:px-10 md:grid-cols-2 md:gap-20">
        <Reveal>
          <h2 className="font-display text-4xl font-light text-ink sm:text-5xl">
            {contact.cta}
          </h2>
          <div className="mt-10 space-y-4 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="block text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-ink"
            >
              {contact.email}
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar no WhatsApp"
              className="block text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-ink"
            >
              WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-widest text-ash"
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
                className="mt-2 w-full border-0 border-b border-hairline bg-transparent py-2 text-ink outline-none transition-colors focus:border-ink"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-widest text-ash"
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
                className="mt-2 w-full border-0 border-b border-hairline bg-transparent py-2 text-ink outline-none transition-colors focus:border-ink"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-widest text-ash"
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
                className="mt-2 w-full resize-none border-0 border-b border-hairline bg-transparent py-2 text-ink outline-none transition-colors focus:border-ink"
              />
            </div>
            <button
              type="submit"
              className="border border-ink px-6 py-3 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Enviar
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
