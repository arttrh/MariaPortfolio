"use client";

import { useState, type FormEvent } from "react";
import { regionalFilter } from "@/content/site";

type Result = { tone: "match" | "no-match" | "unconfigured"; text: string };

/**
 * Verificador de região com a menor fricção possível: um campo de texto,
 * sem exigir CEP ou localização precisa. A região real ainda não foi
 * confirmada por Maria, então com `servedLocations` vazio a resposta é
 * sempre honesta e cordial — nunca finge saber uma área que não existe.
 */
export default function RegionalFilter() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = city.trim();
    if (!query) return;

    if (regionalFilter.servedLocations.length === 0) {
      setResult({ tone: "unconfigured", text: regionalFilter.unconfiguredMessage });
      return;
    }

    const normalized = query.toLocaleLowerCase("pt-BR");
    const served = regionalFilter.servedLocations.some((location) =>
      location.toLocaleLowerCase("pt-BR").includes(normalized)
    );

    setResult(
      served
        ? { tone: "match", text: regionalFilter.matchMessage(query) }
        : { tone: "no-match", text: regionalFilter.noMatchMessage(query) }
    );
  };

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-paper-strong p-6 sm:p-8">
      <p className="t-eyebrow text-accent-strong">{regionalFilter.eyebrow}</p>
      <h3 className="t-title mt-3 text-balance text-ink">{regionalFilter.title}</h3>
      <p className="t-body mt-2 text-stone">{regionalFilter.description}</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row" noValidate>
        <label htmlFor="cidade" className="sr-only">
          {regionalFilter.placeholder}
        </label>
        <input
          id="cidade"
          name="cidade"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder={regionalFilter.placeholder}
          className="w-full rounded-xl border border-line bg-paper px-5 py-3 text-[16px] text-ink outline-none transition-colors focus:border-accent-strong sm:flex-1"
        />
        <button type="submit" className="btn btn-primary shrink-0">
          {regionalFilter.buttonLabel}
        </button>
      </form>

      <p aria-live="polite" className="t-body mt-4 min-h-6 text-stone">
        {result?.text ?? ""}
      </p>
    </div>
  );
}
