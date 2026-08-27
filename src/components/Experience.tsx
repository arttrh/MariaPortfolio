import Reveal from "@/components/Reveal";
import { experience } from "@/content/site";

export default function Experience() {
  return (
    <section
      id="experiencia"
      aria-label="Formação e experiência"
      className="scroll-mt-24 bg-paper py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
            Trajetória
          </h2>
        </Reveal>

        <ol className="mt-14 divide-y divide-hairline border-t border-hairline">
          {experience.map((item, index) => (
            <li key={`${item.year}-${item.title}`}>
              <Reveal delay={index * 90}>
                <div className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-10">
                  <span className="font-display text-lg text-ash sm:w-24 sm:shrink-0">
                    {item.year}
                  </span>
                  <div>
                    <p className="text-lg text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-graphite">{item.place}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
