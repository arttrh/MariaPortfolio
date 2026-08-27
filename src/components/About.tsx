import Reveal from "@/components/Reveal";
import { about } from "@/content/site";

export default function About() {
  return (
    <section id="sobre" aria-label="Quem sou" className="scroll-mt-24 bg-paper py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 sm:px-10 md:grid-cols-[0.4fr_0.6fr] md:gap-16">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-ash">
            {about.eyebrow}
          </p>
        </Reveal>
        <div className="space-y-6">
          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 120}>
              <p className="font-display text-2xl leading-relaxed font-light text-ink sm:text-3xl">
                {paragraph}
              </p>
            </Reveal>
          ))}
          <Reveal delay={about.paragraphs.length * 120}>
            <p className="pt-4 text-sm text-graphite">
              Atuando desde {about.yearsActive}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
