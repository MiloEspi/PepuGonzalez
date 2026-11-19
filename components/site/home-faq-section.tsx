import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    question: "¿Cuánto es la inversión?",
    answer:
      "Pensalo así: ya estás invirtiendo. Pagás el gimnasio, quizás suplementos, y le ponés horas todas las semanas sin que se te note. Esto es lo que hace que todo eso empiece a rendir. Y si cumplís tus check-ins y no bajás, te devuelvo la plata. El precio te lo paso en tu moneda cuando aplicás.",
  },
  {
    question: "¿Cuántos días tengo que entrenar?",
    answer: "Con 3 días por semana alcanza. Armamos el plan según los días que tenés de verdad.",
  },
  {
    question: "¿Tengo que pesar todo lo que como?",
    answer: "No. Arrancamos ordenando horarios, cantidades y hábitos con la comida que ya hay en tu casa.",
  },
  { question: "¿Puedo hacerlo desde otro país?", answer: "Sí. Es todo online y te paso el precio en tu moneda." },
];

export function HomeFaqSection() {
  return (
    <Section id="faq" tone="b" glow="faint-right">
      <SectionTitle>
        PREGUNTAS <AccentText>frecuentes</AccentText>
      </SectionTitle>

      <Accordion type="single" collapsible className="mt-10 w-full max-w-[720px]">
        {FAQS.map((faq, index) => (
          <AccordionItem key={faq.question} value={`faq-${index}`} className="border-[var(--dorado-suave)]/30">
            <AccordionTrigger className="py-5 text-base font-semibold text-[var(--texto)] hover:no-underline [&>svg]:text-[var(--dorado)]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="copy text-[var(--texto-gris)]">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
