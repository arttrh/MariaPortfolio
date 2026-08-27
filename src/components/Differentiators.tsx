import Reveal from "@/components/Reveal";
import { differentiators } from "@/content/site";

export default function Differentiators() {
  return (
    <section
      aria-label="Diferenciais"
      className="bg-ink py-24 text-paper sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {differentiators.map((item, index) => (
            <Reveal key={item.label} delay={index * 100}>
              <div className="text-center sm:text-left">
                <p className="font-display text-5xl font-light sm:text-6xl">
                  {item.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-paper/60">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
