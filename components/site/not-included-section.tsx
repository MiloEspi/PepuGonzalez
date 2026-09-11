import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";

const PHRASES = [
  "No hay suplementos mágicos.",
  "No hay retos de 15 días ni atajos.",
  "No es para el que quiere probar una semana. Es para el que ya se cansó de arrancar y dejar.",
];

export function NotIncludedSection() {
  return (
    <Section id="lo-que-no-incluye" tone="b" glow="soft-right">
      <SectionTitle>
        LO QUE NO VAS A <AccentText>encontrar acá</AccentText>
      </SectionTitle>

      <div className="mt-12 flex flex-col gap-7 md:mt-14">
        {PHRASES.map((phrase) => (
          <p key={phrase} className="copy text-[var(--texto-gris)]">
            {phrase}
          </p>
        ))}
      </div>
    </Section>
  );
}
