"use client";

import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/components/site/section-shell";
import type { ResultDoc } from "@/lib/sanity";

type TestimonialCard = {
  id: string;
  name: string;
  resultMetric: string;
  beforeImage: string;
  afterImage: string;
  quote: string;
};

interface TestimonialsSectionProps {
  results: ResultDoc[];
}

function TestimonialCardItem({ item }: { item: TestimonialCard }) {
  return (
    <article className="w-[215px] shrink-0 overflow-hidden rounded-[14px] border border-white/14 bg-[linear-gradient(150deg,#17181e_0%,#101116_100%)] shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-premium)] motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.025] motion-safe:hover:shadow-[0_32px_56px_-28px_rgba(0,0,0,0.95)] md:w-[250px]">
      <div className="flex aspect-[6/5] w-full overflow-hidden border-b border-white/10">
        {/* ANTES */}
        <div className="relative h-full w-1/2">
          <Image
            src={item.beforeImage}
            alt={`Antes de ${item.name}`}
            fill
            sizes="120px"
            className="object-cover object-top brightness-[0.75] grayscale"
          />
          <Badge className="pointer-events-none absolute left-1.5 top-1.5 rounded-[6px] border border-white/20 bg-black/52 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white/80 backdrop-blur-[4px]">
            ANTES
          </Badge>
        </div>

        <div className="w-px shrink-0 bg-white/18" />

        {/* DESPUÉS */}
        <div className="relative h-full w-1/2">
          <Image
            src={item.afterImage}
            alt={`Después de ${item.name}`}
            fill
            sizes="120px"
            className="object-cover object-top brightness-[0.94] contrast-[1.04]"
          />
          <Badge className="pointer-events-none absolute right-1.5 top-1.5 rounded-[6px] border border-primary/40 bg-[rgba(40,30,8,0.58)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#e2c584] backdrop-blur-[4px]">
            DESPUÉS
          </Badge>
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-semibold text-white">{item.name}</p>
        <p className="mt-1 inline-flex rounded-[6px] border border-primary/35 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#c9a961]">
          {item.resultMetric}
        </p>
        {item.quote ? (
          <p className="mt-1.5 line-clamp-1 text-[10px] leading-snug text-white/36">"{item.quote}"</p>
        ) : null}
      </div>
    </article>
  );
}

export function TestimonialsSection({ results }: TestimonialsSectionProps) {
  const testimonialsData: TestimonialCard[] = results.map((item) => ({
    id: item._id,
    name: item.personName,
    resultMetric: item.resultMetric,
    beforeImage: item.beforeImageUrl,
    afterImage: item.afterImageUrl,
    quote: item.testimonial,
  }));

  const [paused, setPaused] = useState(false);

  if (!testimonialsData.length) {
    return (
      <SectionShell
        id="resultados"
        eyebrow="RESULTADOS REALES"
        title="Lo que lograron mis alumnos"
        description="Carga documentos de tipo result en Sanity para mostrar este carrusel."
      >
        <div className="rounded-[12px] border border-white/14 bg-[linear-gradient(145deg,#17181d_0%,#111217_100%)] p-5">
          <p className="text-sm text-white/78">No se encontraron resultados en Sanity.</p>
        </div>
      </SectionShell>
    );
  }

  // Duración proporcional a la cantidad de tarjetas: mantiene siempre la misma velocidad de avance.
  const duration = Math.max(20, testimonialsData.length * 7);

  return (
    <SectionShell
      id="resultados"
      eyebrow="RESULTADOS REALES"
      title="Lo que lograron mis alumnos"
      description="Antes y después reales de mis alumnos."
    >
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-heading text-[18vw] font-bold leading-none tracking-[0.025em] text-white opacity-[0.03]"
        >
          PEPU
        </span>
        <div
          className="marquee-track flex w-max will-change-transform"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          <div className="flex gap-3 pr-3">
            {testimonialsData.map((item) => (
              <TestimonialCardItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex gap-3 pr-3" aria-hidden>
            {testimonialsData.map((item) => (
              <TestimonialCardItem key={`dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
