import { Check } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";

const INCLUDES = [
  "Diagnóstico inicial: tu cuerpo, tus horarios y los días que tenés de verdad.",
  "Entrenamiento armado para vos en la app, con la técnica de cada ejercicio explicada.",
  "Te enseño a manejar calorías y proteína, con una guía de comidas que te gusten.",
  "Cada semana me mandás tu check-in y te grabo un video con los ajustes de tu semana.",
  "Una llamada conmigo cada 15 días para ver cómo venís.",
  "WhatsApp directo conmigo cuando te trabes.",
  "El recetario Definir comiendo rico, de regalo.",
];

const STEPS = [
  { weeks: "Semanas 1 y 2", headline: "Arrancás sin pasar hambre" },
  { weeks: "Semanas 3 a 8", headline: "Acá se te empieza a notar" },
  { weeks: "Semanas 9 a 12", headline: "Aprendés a sostenerlo" },
];

export function MethodSection() {
  return (
    <Section id="metodo" tone="b" glow="faint-left">
      <SectionEyebrow>EL MÉTODO</SectionEyebrow>
      <SectionTitle className="mt-3">
        QUÉ INCLUYE <AccentText>los 90 días</AccentText>
      </SectionTitle>

      <ul className="mt-10 flex flex-col gap-4 md:mt-12">
        {INCLUDES.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check className="mt-1 size-4 shrink-0 text-[var(--dorado)]" strokeWidth={2.5} />
            <p className="copy max-w-none text-[var(--texto)]">{item}</p>
          </li>
        ))}
      </ul>

      <ol className="relative mt-12 flex flex-col gap-6 border-l border-[var(--dorado-suave)]/50 pl-6 md:mt-14 md:grid md:grid-cols-3 md:gap-8 md:border-l-0 md:border-t md:pl-0 md:pt-6">
        {STEPS.map((step) => (
          <li key={step.weeks} className="relative">
            <span
              aria-hidden
              className="absolute -left-[29px] top-1 size-2.5 rounded-full bg-[var(--dorado)] md:-top-[29px] md:left-0"
            />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">{step.weeks}</p>
            <p className="mt-1.5 font-heading text-lg uppercase leading-snug text-[var(--texto)]">{step.headline}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
