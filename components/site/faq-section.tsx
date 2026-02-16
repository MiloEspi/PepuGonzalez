import { SectionShell } from "@/components/site/section-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "En cuanto tiempo voy a ver resultados?",
    answer: "Si aplicas el sistema con consistencia, los primeros cambios suelen aparecer entre la semana 3 y la 5.",
  },
  {
    question: "Esto es para mi nivel?",
    answer: "Si. El punto de partida cambia, pero el metodo se adapta para que progreses sin improvisar.",
  },
  {
    question: "Que pasa si no puedo cumplir todo perfecto?",
    answer: "No busco perfeccion. Ajusto carga, volumen y frecuencia para que puedas sostener avance semana a semana.",
  },
  {
    question: "Como se que esto va a funcionar?",
    answer: "Porque no depende de motivacion. Hay plan, seguimiento y ajustes segun tu respuesta real.",
  },
  {
    question: "Hay devoluciones?",
    answer: "Se revisa caso por caso despues de la primera fase, segun cumplimiento y ejecucion del sistema.",
  },
];

export function FAQSection() {
  return (
    <SectionShell id="faq" eyebrow="FAQ" title="Preguntas clave antes de aplicar" description="Respuestas con postura para que decidas con claridad y compromiso.">
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
