import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";

const PROBLEM_PHRASES = [
  "En verano no me saco la remera ni en la pileta.",
  "Entro al gimnasio mirando el piso.",
  "Sé perfecto lo que tengo que hacer. El tema es que el jueves ya lo dejé.",
  "Arranco el lunes, aguanto tres días, y el finde vuelvo a cero.",
  "No quiero vivir a pollo y arroz para siempre.",
];

export function ProblemSection() {
  return (
    <Section id="el-problema" tone="b">
      <SectionEyebrow>¿TE SUENA?</SectionEyebrow>
      <SectionTitle className="mt-3">
        EL <AccentText>problema</AccentText>
      </SectionTitle>

      <div className="mt-14 flex flex-col gap-7 md:mt-16">
        {PROBLEM_PHRASES.map((phrase) => (
          <p
            key={phrase}
            className="max-w-[620px] border-l border-[var(--dorado)] pl-5 text-[1.0625rem] italic leading-[1.4] text-[var(--texto)] md:text-[1.25rem]"
          >
            &ldquo;{phrase}&rdquo;
          </p>
        ))}
      </div>

      <p className="copy mt-10 font-semibold text-[var(--texto)] md:mt-12">
        Si leíste alguna y dijiste &ldquo;soy yo&rdquo;, seguí bajando.
      </p>

      <div className="mt-14 max-w-[620px] md:mt-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">Por qué fallaste</p>
        <p className="copy mt-3 text-[var(--texto)]">
          No fue falta de fuerza de voluntad. Todas las dietas que probaste te pedían dejar de vivir: comer aparte de
          tu familia, decir que no a todo, llevarte el tupper triste al laburo. Eso no lo aguanta nadie más de tres
          semanas. Y cuando lo dejás te convencés de que el problema sos vos. No sos vos, era el plan.
        </p>
      </div>
    </Section>
  );
}
