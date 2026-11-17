import { Check, X } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";

const YES = [
  "Entrenás hace meses y no se te nota.",
  "Querés definirte sin dejar de comer lo que te gusta.",
  "Estás dispuesto a hacer un check-in por semana.",
];

const NO = [
  "Buscás un reto de 15 días o un suplemento mágico.",
  "Querés probar una semana y ver qué onda.",
  "No vas a mandar tus check-ins.",
];

export function ForWhomSection() {
  return (
    <Section id="para-quien" tone="b" glow="faint-left">
      <SectionTitle>
        ¿ES PARA <AccentText>vos?</AccentText>
      </SectionTitle>

      <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-0">
        <div className="md:pr-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">Es para vos si</p>
          <ul className="mt-5 flex flex-col gap-4">
            {YES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-1 size-4 shrink-0 text-[var(--dorado)]" strokeWidth={2.5} />
                <p className="copy max-w-none text-[var(--texto)]">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[var(--dorado-suave)]/40 pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--texto-gris)]">No es para vos si</p>
          <ul className="mt-5 flex flex-col gap-4">
            {NO.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <X className="mt-1 size-4 shrink-0 text-[var(--dorado-suave)]" strokeWidth={2.5} />
                <p className="copy max-w-none text-[var(--texto-gris)]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
