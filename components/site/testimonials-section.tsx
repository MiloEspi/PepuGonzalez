"use client";

import { useEffect, useRef } from "react";

import { animateFadeSlideIn } from "@/lib/animations";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { SectionShell } from "@/components/site/section-shell";

const testimonials = [
  {
    name: "Lucia R.",
    quote: "En 8 semanas recupere energia, baje grasa y volvi a entrenar con orden.",
    metric: "-5.2 kg en 9 semanas",
  },
  {
    name: "Matias G.",
    quote: "Por primera vez tuve una rutina que pude sostener de verdad.",
    metric: "+14 kg en sentadilla",
  },
  {
    name: "Carla V.",
    quote: "Entrenando en casa logre definicion sin perder fuerza.",
    metric: "4 dias consistentes por semana",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { hasEnteredView } = useInViewAnimation(sectionRef, { threshold: 0.12, rootMargin: "0px 0px -12% 0px" });

  useEffect(() => {
    if (!hasEnteredView || !sectionRef.current) return;
    const targets = sectionRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
    animateFadeSlideIn(targets, { distance: 18, staggerStep: 110 });
  }, [hasEnteredView]);

  return (
    <SectionShell
      id="resultados"
      eyebrow="RESULTADOS"
      title="Historias reales, progreso medible"
      description="Ejemplos de alumnos que aplicaron el sistema y sostuvieron el cambio."
    >
      <div ref={sectionRef} className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            data-reveal
            className="space-y-4 rounded-2xl border border-border/80 bg-card p-5 opacity-0 shadow-[0_18px_30px_-28px_hsl(215_30%_20%)]"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-border/60 bg-[linear-gradient(135deg,hsl(213_20%_90%),hsl(213_20%_82%))] px-3 py-7 text-center text-xs font-medium text-muted-foreground">
                Antes
              </div>
              <div className="rounded-xl border border-border/60 bg-[linear-gradient(135deg,hsl(212_70%_92%),hsl(212_70%_82%))] px-3 py-7 text-center text-xs font-medium text-primary">
                Despues
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{item.quote}&rdquo;</p>
            <p className="font-semibold text-foreground">{item.metric}</p>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.name}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
