import Reveal from "@/components/Reveal";
import { specialties } from "@/content/site";

export default function Specialties() {
  return (
    <section
      id="especialidades"
      aria-label="Especialidades"
      className="scroll-mt-24 border-y border-hairline bg-mist py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
            Especialidades
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          {specialties.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className="border-t border-hairline pt-6">
                <h3 className="font-display text-xl font-normal text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
