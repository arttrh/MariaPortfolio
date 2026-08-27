import Mark from "@/components/Mark";
import { brand, hero } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 text-xs text-caption sm:flex-row sm:px-10">
        <div className="flex items-center gap-3">
          <Mark className="h-7 w-7 opacity-70" />
          <span className="lowercase tracking-tight">{brand.wordmark}</span>
        </div>
        <p>
          © {year} {hero.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
