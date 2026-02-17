import { SectionShell } from "@/components/site/section-shell";
import type { FaqDoc } from "@/lib/sanity";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQSectionProps {
  items: FaqDoc[];
}

export function FAQSection({ items }: FAQSectionProps) {
  const faqItems = items.map((item) => ({
    id: item._id,
    question: item.question,
    answer: item.answer,
  }));

  if (!faqItems.length) {
    return (
      <SectionShell
        id="faq"
        eyebrow="FAQ"
        title="Preguntas clave antes de aplicar"
        description="Carga documentos de tipo faq en Sanity para mostrar esta seccion."
      >
        <div className="rounded-[12px] border border-white/14 bg-[linear-gradient(145deg,#17181d_0%,#111217_100%)] p-5">
          <p className="text-sm text-white/78">No se encontraron preguntas frecuentes en Sanity.</p>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="faq" eyebrow="FAQ" title="Preguntas clave antes de aplicar" description="Respuestas con postura para que decidas con claridad y compromiso.">
      <div className="rounded-[12px] bg-black/22 px-4">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((faq, index) => (
            <AccordionItem key={faq.id} value={`faq-${index}`}>
              <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
}
