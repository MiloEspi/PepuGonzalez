import { Check, X } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";

const INCLUDES = [
  "Un plan de comidas con lo que ya comés. Milanesa, asado, fideos, todo entra.",
  "Rutina para los días que entrenás en serio, no para los que decís que vas a ir.",
  "Videos míos de cada ejercicio, para que no andes mirando qué hace el de al lado.",
  "Las 30 recetas que uso yo.",
  "Cada 30 días miramos fotos y medidas y ajusto lo que haga falta.",
  "Mi WhatsApp. Te contesto yo, no un asistente.",
  "Y lo que no te da nadie: qué hacer el día que te mandaste una cagada y tenés ganas de largar todo.",
];

const EXCLUDES = [
  "No hay suplementos mágicos ni atajos.",
  "No te voy a decir que en 30 días vas a estar irreconocible. Vas a estar mejor y sin haber largado, que es lo que importa.",
  "Los fines de semana no contesto. Tengo vida y quiero que vos también.",
  "No trabajo con menores de 18.",
];

export function IncludesSection() {
  return (
    <Section id="que-incluye" tone="a">
      <SectionEyebrow>LA LETRA CHICA</SectionEyebrow>
      <SectionTitle className="mt-3">
        QUÉ TE <AccentText>llevás</AccentText>
      </SectionTitle>

      <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-0">
        <div className="flex flex-col gap-4 md:pr-12">
          {INCLUDES.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Check className="mt-1 size-4 shrink-0 text-[var(--dorado)]" strokeWidth={2.5} />
              <p className="copy max-w-none text-[var(--texto)]">{item}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--dorado-suave)]/40 pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          {EXCLUDES.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <X className="mt-1 size-4 shrink-0 text-[var(--dorado-suave)]" strokeWidth={2.5} />
              <p className="copy max-w-none text-[var(--texto-gris)]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
