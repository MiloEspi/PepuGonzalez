import { SectionShell } from "@/components/site/section-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "En cuanto tiempo voy a ver resultados?",
    answer: "Si cumplis con el plan, normalmente los primeros cambios visibles aparecen entre semana 3 y 5.",
  },
  {
    question: "Esto es para mi nivel?",
    answer: "Si. Ajustamos el sistema a tu punto de partida para que puedas progresar sin lesionarte.",
  },
  {
    question: "Que pasa si no puedo cumplir todo perfecto?",
    answer: "No buscamos perfeccion, buscamos consistencia. Se adapta el plan para sostener avance real.",
  },
  {
    question: "Como se que esto va a funcionar?",
    answer: "Porque hay estructura, seguimiento y ajustes medibles. No dependes de motivacion aleatoria.",
  },
  {
    question: "Hay devoluciones?",
    answer: "Se evalua caso por caso segun avance y cumplimiento de la primera fase del programa.",
  },
];

export function FAQSection() {
  return (
    <SectionShell id="faq" eyebrow="FAQ" title="Preguntas frecuentes" description="Respuestas directas para que tomes una decision con claridad.">
      <div className="textured-surface rounded-[14px] border border-border/80 bg-card/90 px-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}
