"use client";

import Image from "next/image";
import { useState } from "react";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";
import type { ResultDoc } from "@/lib/sanity";

type TestimonialCard = {
  id: string;
  name: string;
  resultMetric: string;
  durationLabel?: string;
  beforeImage: string;
  afterImage: string;
  quote: string;
};

interface TestimonialsSectionProps {
  results: ResultDoc[];
}

function TestimonialCardItem({ item }: { item: TestimonialCard }) {
  const pillLabel = [item.resultMetric, item.durationLabel].filter(Boolean).join(" EN ").toUpperCase();

  return (
    <article className="flex w-[280px] shrink-0 flex-col overflow-hidden rounded-[16px] bg-[var(--negro-2)] sm:w-[320px]">
      <div className="flex aspect-[6/5] w-full overflow-hidden">
        <div className="relative h-full w-1/2">
          <Image src={item.beforeImage} alt={`Antes de ${item.name}`} fill sizes="160px" className="object-cover object-top grayscale" />
          <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--texto)]">
            Antes
          </span>
        </div>
        <div className="relative h-full w-1/2">
          <Image src={item.afterImage} alt={`Después de ${item.name}`} fill sizes="160px" className="object-cover object-top" />
          <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--dorado)]">
            Después
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-heading text-lg uppercase tracking-tight text-[var(--dorado)]">{item.name}</p>
        {item.quote ? (
          <p className="mt-3 flex-1 text-sm italic leading-relaxed text-[var(--texto-gris)]">&ldquo;{item.quote}&rdquo;</p>
        ) : null}
        {pillLabel ? (
          <span className="mt-4 inline-flex w-fit items-center rounded-full bg-[var(--dorado)] px-3 py-1.5 text-xs font-bold text-black">
            {pillLabel}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function TestimonialsSection({ results }: TestimonialsSectionProps) {
  const testimonialsData: TestimonialCard[] = results
    .map((item) => ({
      id: item._id,
      name: item.personName,
      resultMetric: item.resultMetric,
      durationLabel: item.durationLabel,
      beforeImage: item.beforeImageUrl,
      afterImage: item.afterImageUrl,
      quote: item.testimonial,
    }))
    // Los casos de ganancia muscular quedan al final: el negocio hoy es bajar de peso.
    .sort((a, b) => Number(a.resultMetric.trim().startsWith("+")) - Number(b.resultMetric.trim().startsWith("+")));

  const [paused, setPaused] = useState(false);

  if (!testimonialsData.length) {
    return (
      <Section id="resultados" tone="a">
        <SectionEyebrow>RESULTADOS REALES</SectionEyebrow>
        <SectionTitle className="mt-3">
          LO QUE LOGRARON <AccentText>mis alumnos</AccentText>
        </SectionTitle>
        <p className="copy mt-6 text-[var(--texto-gris)]">Carga documentos de tipo result en Sanity para mostrar este carrusel.</p>
      </Section>
    );
  }

  const duration = Math.max(20, testimonialsData.length * 7);

  return (
    <Section id="resultados" tone="a" containerClassName="!max-w-none px-0 sm:px-0">
      <div className="page-container">
        <SectionEyebrow>RESULTADOS REALES</SectionEyebrow>
        <SectionTitle className="mt-3">
          LO QUE LOGRARON <AccentText>mis alumnos</AccentText>
        </SectionTitle>
      </div>

      <div
        className="relative mt-12 overflow-hidden md:mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="marquee-track flex w-max will-change-transform"
          style={{ animationDuration: `${duration}s`, animationPlayState: paused ? "paused" : "running" }}
        >
          <div className="flex gap-4 pr-4 pl-[clamp(1.125rem,4.8vw,1.25rem)]">
            {testimonialsData.map((item) => (
              <TestimonialCardItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex gap-4 pr-4" aria-hidden>
            {testimonialsData.map((item) => (
              <TestimonialCardItem key={`dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="page-container">
        <p className="mt-8 text-sm text-[var(--texto-gris)]">
          Son los casos que tengo hoy. Cuando termine el próximo grupo, subo los nuevos.
        </p>
      </div>
    </Section>
  );
}
