"use client";

import { BarChart3, BrainCircuit, ClipboardCheck, MessagesSquare, Target, Workflow } from "lucide-react";

import { SectionShell } from "@/components/site/section-shell";
import { cn } from "@/lib/utils";

const differentiators = [
  {
    title: "No recibis rutinas genericas",
    icon: ClipboardCheck,
    cardClass: "bg-[linear-gradient(135deg,#17181d_0%,#121318_100%)] border-white/14",
  },
  {
    title: "Diagnostico real antes de programar",
    icon: Workflow,
    cardClass: "bg-[linear-gradient(140deg,rgba(122,14,14,0.28)_0%,#16171c_100%)] border-white/14",
  },
  {
    title: "Disciplina aplicada al contexto",
    icon: BrainCircuit,
    cardClass: "bg-[linear-gradient(140deg,#16171c_0%,#131419_100%)] border-white/14",
  },
  {
    title: "Ajustes semanales con criterio",
    icon: BarChart3,
    cardClass: "bg-[linear-gradient(140deg,#17181d_0%,rgba(122,14,14,0.24)_100%)] border-white/14",
  },
  {
    title: "Comunicacion directa y util",
    icon: MessagesSquare,
    cardClass: "bg-[linear-gradient(140deg,#15161a_0%,#121318_100%)] border-white/14",
  },
  {
    title: "Decisiones inteligentes para tu objetivo",
    icon: Target,
    cardClass: "bg-[linear-gradient(140deg,#17181d_0%,#101116_100%)] border-white/14",
  },
];

export function DifferentialsSection() {
  return (
    <SectionShell
      id="diferenciales"
      eyebrow="COMPETENCIAS"
      title="Por que entrenar conmigo?"
      description="No soy un coach mas. Leo tu contexto, tomo decisiones con criterio y ejecuto un sistema que se sostiene."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              data-reveal
              className={cn(
                "group rounded-[10px] border p-4 opacity-0 transition-[transform,box-shadow,border-color] duration-[220ms] ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[0_24px_38px_-28px_rgba(122,14,14,0.9)]",
                item.cardClass
              )}
            >
              <div className="inline-flex rounded-[8px] border border-primary/30 bg-primary/14 p-2 text-primary transition-colors duration-200 group-hover:border-primary/55 group-hover:bg-primary/25">
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
