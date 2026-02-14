import { SectionShell } from "@/components/site/section-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Cuanto dura cada plan?",
    answer: "La mayoria de los planes estan pensados para ciclos de 8 a 12 semanas con ajustes semanales.",
  },
  {
    question: "El plan incluye nutricion?",
    answer:
      "Incluye lineamientos claros para organizar comidas y macros base. No es consulta clinica nutricional.",
  },
  {
    question: "Se adapta si viajo o cambio horarios?",
    answer: "Si. Se puede ajustar frecuencia, duracion y orden de sesiones segun tu semana.",
  },
  {
    question: "Necesito experiencia previa para arrancar?",
    answer: "No. Hay rutas para principiante, intermedio y avanzado.",
  },
  {
    question: "Como es el seguimiento?",
    answer: "Por WhatsApp, con feedback semanal y ajustes cuando sea necesario.",
  },
];

export function FAQSection() {
  return (
    <SectionShell eyebrow="FAQ" title="Preguntas frecuentes" description="Todo lo necesario para empezar con claridad desde el dia uno.">
      <div className="rounded-2xl border border-border/80 bg-card px-6">
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
