"use client";

import { CheckCircle2 } from "lucide-react";

import { SectionShell } from "@/components/site/section-shell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const coreDifferentials = [
  "Planificacion segun objetivo, disponibilidad y nivel real.",
  "Ajustes periodicos para mantener progreso medible.",
  "Comunicacion clara para ejecutar sin improvisar.",
];

const extendedDifferentials = [
  "La estructura se adapta a tu contexto actual sin perder foco en resultados.",
  "Se prioriza adherencia: lo que podes sostener en el tiempo.",
  "Seguimiento y decisiones orientadas a datos de progreso.",
];

export function DifferentialsSection() {
  return (
    <SectionShell
      id="diferenciales"
      eyebrow="DIFERENCIALES"
      title="Un sistema simple de ejecutar"
      description="Proceso claro para entrenar mejor, sostener consistencia y medir avance real."
    >
      <article className="rounded-[12px] border border-white/14 bg-[linear-gradient(145deg,#17181d_0%,#101116_100%)] p-4 md:p-5">
        <ul className="space-y-2.5">
          {coreDifferentials.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-white/84">
              <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[8px] border border-primary/38 bg-primary/16 text-primary">
                <CheckCircle2 className="size-3.5" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Accordion type="single" collapsible className="mt-4 rounded-[10px] border border-white/10 bg-black/22 px-3.5">
          <AccordionItem value="ver-mas" className="border-b-0">
            <AccordionTrigger className="py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/74 hover:no-underline">
              Ver mas
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <ul className="space-y-2">
                {extendedDifferentials.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-white/74">
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </article>
    </SectionShell>
  );
}
