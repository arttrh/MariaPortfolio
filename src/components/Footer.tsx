import { brand } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline-light bg-paper px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-baseline gap-3">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-ink">
            {brand.wordmark}
          </span>
          <span className="t-caption text-slate">{brand.role}</span>
        </div>
        <p className="t-caption text-slate">
          © {year} {brand.wordmark}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
