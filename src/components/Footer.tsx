import { brand, hero } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 text-xs text-caption sm:flex-row sm:px-10">
        <div className="flex items-baseline gap-3">
          <span className="type-heading text-sm lowercase text-heading">
            {brand.wordmark}
          </span>
          <span className="type-eyebrow text-[10px]">{hero.role}</span>
        </div>
        <p>
          © {year} {hero.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
