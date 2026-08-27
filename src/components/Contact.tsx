"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { contact } from "@/content/site";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useGsap(({ scope }) => revealIn(scope), root);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Contato pelo site — ${name}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-hairline-dark bg-transparent px-4 py-3 text-[17px] text-paper outline-none transition-colors focus:border-paper";

  return (
    <section
      ref={root}
      id="contato"
      aria-label="Contato"
      className="scroll-mt-16 bg-ink px-6 py-32 text-paper sm:px-10 sm:py-44"
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <h2 data-reveal className="t-title text-balance">
            {contact.title}
          </h2>
          <p data-reveal className="t-intro mt-7 max-w-md text-fog">
            {contact.intro}
          </p>

          <div className="mt-12 space-y-5">
            <a
              data-reveal
              href={`mailto:${contact.email}`}
              className="block w-fit text-[17px] text-paper underline decoration-hairline-dark underline-offset-[6px] transition-colors hover:decoration-paper"
            >
              {contact.email}
            </a>
            <a
              data-reveal
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar no WhatsApp"
              className="block w-fit text-[17px] text-paper underline decoration-hairline-dark underline-offset-[6px] transition-colors hover:decoration-paper"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <form data-reveal onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="t-caption text-fog">
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
            <label htmlFor="email" className="t-caption text-fog">
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
            <label htmlFor="message" className="t-caption text-fog">
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${fieldClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-paper px-8 py-3.5 text-[17px] font-medium text-ink transition-opacity hover:opacity-85"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
