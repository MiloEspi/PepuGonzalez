"use client";

import { BarChart3, BrainCircuit, ClipboardCheck, MessagesSquare, Target, Workflow } from "lucide-react";
import { useEffect, useRef } from "react";

import { SectionShell } from "@/components/site/section-shell";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { animateFadeSlideIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

const differentiators = [
  {
    title: "No uso rutinas genericas",
    icon: ClipboardCheck,
    cardClass: "bg-[linear-gradient(135deg,#17181d_0%,#121318_100%)] border-border/80",
  },
  {
    title: "Programacion basada en progresion real",
    icon: Workflow,
    cardClass: "bg-[linear-gradient(140deg,rgba(122,14,14,0.28)_0%,#16171c_100%)] border-primary/28",
  },
  {
    title: "Enfoque en mentalidad y disciplina",
    icon: BrainCircuit,
    cardClass: "bg-[linear-gradient(140deg,#16171c_0%,#131419_100%)] border-border/80",
  },
  {
    title: "Resultados medibles",
    icon: BarChart3,
    cardClass: "bg-[linear-gradient(140deg,#17181d_0%,rgba(122,14,14,0.24)_100%)] border-primary/25",
  },
  {
    title: "Comunicacion directa",
    icon: MessagesSquare,
    cardClass: "bg-[linear-gradient(140deg,#15161a_0%,#121318_100%)] border-border/75",
  },
  {
    title: "Direccion clara por objetivo",
    icon: Target,
    cardClass: "bg-[linear-gradient(140deg,#17181d_0%,#101116_100%)] border-border/80",
  },
];

export function DifferentialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { hasEnteredView } = useInViewAnimation(sectionRef, { threshold: 0.12, rootMargin: "0px 0px -12% 0px" });

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !hasEnteredView) return;
    const targets = node.querySelectorAll<HTMLElement>("[data-reveal]");
    animateFadeSlideIn(targets, { distance: 16, duration: 500, staggerStep: 80 });
  }, [hasEnteredView]);

  return (
    <SectionShell
      id="diferenciales"
      eyebrow="COMPETENCIAS"
      title="Sistema, lectura de contexto y ejecucion"
      description="No se trata de entrenar mas. Se trata de entrenar mejor, con decisiones concretas y seguimiento."
    >
      <div ref={sectionRef} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              data-reveal
              className={cn(
                "group rounded-[8px] border p-4 opacity-0 transition-[transform,box-shadow,border-color] duration-[220ms] ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[0_24px_38px_-28px_rgba(122,14,14,0.9)]",
                item.cardClass
              )}
            >
              <div className="inline-flex rounded-lg border border-primary/30 bg-primary/14 p-2 text-primary transition-colors duration-200 group-hover:border-primary/55 group-hover:bg-primary/25">
                <Icon className="size-4" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
