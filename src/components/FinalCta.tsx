"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGsap, revealIn } from "@/lib/gsap";
import { finalCta, primaryContact } from "@/content/site";

/**
 * CTA de conversão final. O formulário não depende de backend: monta uma
 * mensagem e abre o WhatsApp de Maria já preenchido — o canal real de
 * contato dela, com o mínimo de fricção possível.
 */
export default function FinalCta() {
  const root = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [serviceType, setServiceType] = useState(finalCta.form.serviceOptions[0] ?? "");
  const [message, setMessage] = useState("");

  useGsap(({ scope }) => revealIn(scope), root);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = [
      `Olá, Maria! Meu nome é ${name}.`,
      city ? `Cidade: ${city}` : null,
      serviceType ? `Interesse: ${serviceType}` : null,
      message ? `Mensagem: ${message}` : null,
    ].filter(Boolean);

    const url = `${primaryContact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-line-dark bg-transparent px-4 py-3 text-[16px] text-paper outline-none transition-colors focus:border-paper";

  return (
    <section ref={root} id="contato" aria-label="Contato" className="scroll-mt-16 bg-ink px-6 py-28 text-paper sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1fr] md:gap-20">
        <div>
          <p data-reveal className="t-eyebrow text-accent-on-dark">
            {finalCta.eyebrow}
          </p>
          <h2 data-reveal className="t-headline mt-5 text-balance">
            {finalCta.title}
          </h2>
          <p data-reveal className="t-body mt-6 max-w-md text-fog">
            {finalCta.description}
          </p>

          <a
            data-reveal
            href={finalCta.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-8 inline-flex"
          >
            {finalCta.primaryCta.label}
            <span aria-hidden className="btn-arrow">→</span>
          </a>
        </div>

        <form data-reveal onSubmit={handleSubmit} className="space-y-5" noValidate>
          <p className="t-body font-medium text-paper">{finalCta.form.title}</p>
          <p className="t-caption text-fog">{finalCta.form.description}</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fc-name" className="t-caption text-fog">
                Nome
              </label>
              <input
                id="fc-name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="fc-city" className="t-caption text-fog">
                Cidade
              </label>
              <input
                id="fc-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="fc-service" className="t-caption text-fog">
              Tipo de serviço
            </label>
            <select
              id="fc-service"
              value={serviceType}
              onChange={(event) => setServiceType(event.target.value)}
              className={`${fieldClass} appearance-none`}
            >
              {finalCta.form.serviceOptions.map((option) => (
                <option key={option} value={option} className="bg-ink text-paper">
                  {option}
                </option>
              ))}
              <option value="" className="bg-ink text-paper">
                Ainda não sei
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="fc-message" className="t-caption text-fog">
              Mensagem (opcional)
            </label>
            <textarea
              id="fc-message"
              rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Enviar para o WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
