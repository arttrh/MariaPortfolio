import { brand, contact, nav } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  const hasEmail = contact.email.trim().length > 0;

  return (
    <footer className="border-t border-line bg-paper px-6 py-14 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1fr_auto_auto]">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-medium text-accent-strong">M.</span>
            <span className="text-[15px] font-medium tracking-[-0.01em] text-ink">
              {brand.wordmark}
            </span>
          </div>
          <p className="t-caption mt-2 max-w-xs text-mute">
            Contabilidade que explica, organiza e acompanha o seu negócio.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé" className="flex flex-col gap-2.5">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="t-caption text-stone transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="t-caption text-stone transition-colors hover:text-ink"
          >
            WhatsApp · {contact.phoneLabel}
          </a>
          {hasEmail ? (
            <a href={`mailto:${contact.email}`} className="t-caption text-stone transition-colors hover:text-ink">
              {contact.email}
            </a>
          ) : null}
          <a
            href={contact.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="t-caption text-stone transition-colors hover:text-ink"
          >
            Instagram · {contact.instagram.handle}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-caption text-mute">
          © {year} {brand.wordmark}. Todos os direitos reservados.
        </p>
        <p className="t-caption text-mute">Atendimento sujeito a confirmação de região.</p>
      </div>
    </footer>
  );
}
