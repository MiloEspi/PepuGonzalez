import { Check, X } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { PrimaryButton, WhatsAppGlyph } from "@/components/site/primary-button";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";
import { getStickyWhatsAppHref } from "@/data/offers";

const INCLUDES = [
  "Un plan de comidas con lo que ya comés. Milanesa, asado, fideos, todo entra.",
  "Rutina adaptada para los días que entrenás, y no te estanques mas.",
  "El plan se adapta 100% a vos solo.",
  "Me mandás el video haciendo el ejercicio y te corrijo la técnica.",
  "Las 30 recetas que uso yo.",
  "Cada 15 días miramos fotos y medidas y ajusto lo que haga falta.",
  "Mi WhatsApp. El mío.",
  "Y lo que no te da nadie: qué hacer el día que te mandaste una cagada y tenés ganas de largar todo.",
];

const EXCLUDES = [
  "Suplementos mágicos. Nada de eso hace falta.",
  "Caminos rápidos. Ni retos de 15 días ni bajar 10 kilos en un mes.",
  "si venís a intentar una semana. Esto es para el que ya se cansó de arrancar y dejar.",
];

export function AsesoriaPage() {
  return (
    <main>
      <Section id="asesoria" tone="a" glow="faint-left">
        <SectionEyebrow>LA ASESORÍA</SectionEyebrow>
        <SectionTitle className="mt-3">
          QUÉ TE <AccentText>llevás</AccentText>
        </SectionTitle>

        <div className="mt-12 flex flex-col gap-4 md:mt-14">
          {INCLUDES.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Check className="mt-1 size-4 shrink-0 text-[var(--dorado)]" strokeWidth={2.5} />
              <p className="copy max-w-none text-[var(--texto)]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="asesoria-que-no-incluye" tone="b" glow="faint-right">
        <SectionEyebrow>SEAMOS CLAROS</SectionEyebrow>
        <SectionTitle className="mt-3">
          QUÉ NO VAS A <AccentText>encontrar</AccentText>
        </SectionTitle>

        <div className="mt-10 flex flex-col gap-4">
          {EXCLUDES.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <X className="mt-1 size-4 shrink-0 text-[var(--dorado-suave)]" strokeWidth={2.5} />
              <p className="copy max-w-none text-[var(--texto-gris)]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="asesoria-cta" tone="a" glow="faint-left" containerClassName="flex flex-col items-center text-center">
        <PrimaryButton href={getStickyWhatsAppHref()} icon={<WhatsAppGlyph />} caption="Contame en qué andás y te digo si te puedo ayudar.">
          Escribime por WhatsApp
        </PrimaryButton>
      </Section>
    </main>
  );
}
