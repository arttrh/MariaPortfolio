import { hero } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-paper py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-ash sm:flex-row sm:px-10">
        <p>
          © {year} {hero.name}. Todos os direitos reservados.
        </p>
        <p>{hero.role}</p>
      </div>
    </footer>
  );
}
