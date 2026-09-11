import Link from "next/link";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";

interface MethodPhase {
  number: string;
  weeks: string;
  headline: string;
  description: string;
}

const PHASES: MethodPhase[] = [
  {
    number: "01",
    weeks: "Semanas 1 y 2",
    headline: "Arrancás sin pasar hambre",
    description:
      "Te armo el plan con la comida que ya hay en tu casa. Ordenamos horarios, cantidades y hábitos. Sin pesar todo, sin tuppers raros y sin tener que avisarle a nadie que estás a dieta. Casi siempre terminás comiendo más de lo que pensabas.",
  },
  {
    number: "02",
    weeks: "Semanas 3 a 8",
    headline: "Acá se te empieza a notar",
    description:
      "Ajustamos las calorías sobre lo que ya venís comiendo y entra la planificación del entrenamiento más a fondo, con los días que tengas de verdad. Acá te empieza a quedar mejor la ropa y la gente te empieza a preguntar qué estás haciendo.",
  },
  {
    number: "03",
    weeks: "Semanas 9 a 12",
    headline: "Que no vuelvas atrás",
    description:
      "Esta es la parte que ninguna dieta te dio nunca. Aprendés a mantener el peso comiendo normal, saliendo y sin contar nada. Mi objetivo es que a los 90 días no me necesites más y que en verano te saques la remera sin pensarlo.",
  },
];

export function MethodSection() {
  return (
    <Section id="metodo" tone="b" glow="soft-right">
      <SectionEyebrow>EL MÉTODO</SectionEyebrow>
      <SectionTitle className="mt-3">
        EL ÚLTIMO <AccentText>lunes</AccentText>
      </SectionTitle>
      <p className="copy mt-4 text-[var(--texto-gris)]">
        Doce semanas, tres fases. Ninguna arranca con que dejes de comer lo que te gusta.
      </p>

      <div className="mt-16 flex flex-col gap-14 md:mt-20 md:gap-20">
        {PHASES.map((phase) => (
          <article key={phase.number} className="relative overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 left-0 font-heading text-[4.5rem] font-bold leading-none text-white/[0.0225] sm:text-[6rem]"
            >
              {phase.number}
            </span>

            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">{phase.weeks}</p>
            <h3 className="relative mt-2 font-heading text-xl uppercase leading-snug text-[var(--texto)] sm:text-2xl">
              {phase.headline}
            </h3>
            <p className="copy relative mt-3 text-[var(--texto-gris)]">{phase.description}</p>
          </article>
        ))}
      </div>

      <p className="mt-[30px] text-sm text-[var(--texto-gris)]">
        ¿Querés ver todo lo que incluye?{" "}
        <Link href="/asesoria" className="text-[var(--dorado)] underline underline-offset-4">
          Mirá el detalle
        </Link>
      </p>
    </Section>
  );
}
