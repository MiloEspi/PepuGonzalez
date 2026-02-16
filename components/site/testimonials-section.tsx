"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { SectionShell } from "@/components/site/section-shell";
import { animateCounter } from "@/utils/animations";
import { cn } from "@/lib/utils";

const transformations = [
  {
    id: "lucia",
    name: "Lucia R.",
    timeframe: "12 semanas",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    testimonial: "Baje grasa, gane fuerza y por primera vez sostuve un proceso completo sin abandonar.",
  },
  {
    id: "matias",
    name: "Matias G.",
    timeframe: "90 dias",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    testimonial: "Con sistema y seguimiento, deje de entrenar al azar y empece a progresar cada semana.",
  },
  {
    id: "carla",
    name: "Carla V.",
    timeframe: "10 semanas",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    testimonial: "Entrenando en casa logre recomposicion, mas energia y mucha mas seguridad con mi fisico.",
  },
];

function BeforeAfterSlider({ beforeImage, afterImage, name }: { beforeImage: string; afterImage: string; name: string }) {
  const [position, setPosition] = useState(52);

  return (
    <div className="relative h-[260px] overflow-hidden rounded-[10px] border border-white/14 bg-black/65 md:h-[280px]">
      <div className="absolute inset-0">
        <Image src={afterImage} alt={`${name} despues`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-black/32" />
      </div>

      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={beforeImage} alt={`${name} antes`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-black/5" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 z-20" style={{ left: `calc(${position}% - 1px)` }}>
        <div className="h-full w-px bg-white/70" />
        <div className="absolute left-1/2 top-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[8px] border border-primary/55 bg-black/76 shadow-[0_0_0_1px_rgba(0,0,0,0.45),0_0_18px_rgba(212,20,20,0.46)]">
          <span className="h-3.5 w-px bg-white/78" />
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
        <span className="rounded-[8px] border border-white/25 bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/85">
          Antes
        </span>
        <span className="rounded-[8px] border border-primary/35 bg-primary/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
          Despues
        </span>
      </div>

      <input
        type="range"
        min={12}
        max={88}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Control deslizante antes y despues de ${name}`}
        className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export function TestimonialsSection() {
  const counterRef = useRef<HTMLSpanElement>(null);
  const didAnimateCounterRef = useRef(false);

  useEffect(() => {
    const node = counterRef.current;
    if (!node || didAnimateCounterRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || didAnimateCounterRef.current) return;
        didAnimateCounterRef.current = true;
        animateCounter(node, 100, { from: 0, duration: 1520, prefix: "+" });
        observer.disconnect();
      },
      { threshold: 0.48 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell
      id="resultados"
      eyebrow="RESULTADOS"
      title="RESULTADOS REALES. SIN EXCUSAS."
      description="El sistema funciona cuando se aplica con disciplina. No son casos aislados: es ejecucion sostenida."
    >
      <article
        data-reveal
        className="mb-4 rounded-[12px] border border-white/12 bg-[linear-gradient(120deg,rgba(15,15,18,0.92)_0%,rgba(45,10,12,0.76)_100%)] px-4 py-3.5 md:mb-5"
      >
        <p className="text-[1.55rem] font-semibold leading-none text-white md:text-[2rem]">
          <span ref={counterRef}>+0</span> procesos completados
        </p>
        <p className="mt-1.5 text-xs uppercase tracking-[0.12em] text-white/72">Cambios visibles construidos con estructura y consistencia</p>
      </article>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {transformations.map((item, index) => (
          <article
            key={item.id}
            data-reveal
            className={cn(
              "textured-surface overflow-hidden rounded-[14px] border border-white/12 bg-card/86 opacity-0 shadow-[0_30px_48px_-40px_rgba(0,0,0,0.95)] transition-[transform,box-shadow] duration-[230ms] ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[0_34px_54px_-32px_rgba(122,14,14,0.72)]",
              index === 0 ? "md:col-span-2" : ""
            )}
          >
            <div className="p-1.5">
              <BeforeAfterSlider beforeImage={item.beforeImage} afterImage={item.afterImage} name={item.name} />
            </div>

            <div className="space-y-3 p-4">
              <p className="text-sm leading-relaxed text-white/86">&ldquo;{item.testimonial}&rdquo;</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="rounded-[8px] border border-border/65 bg-background/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {item.timeframe}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
