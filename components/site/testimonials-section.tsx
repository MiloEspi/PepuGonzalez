"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { SectionShell } from "@/components/site/section-shell";
import type { ResultDoc } from "@/lib/sanity";
import { cn } from "@/lib/utils";

type TestimonialCard = {
  id: string;
  name: string;
  duration?: string;
  resultMetric: string;
  beforeImage: string;
  afterImage: string;
  quote: string;
  tagLabel: string;
};

interface TestimonialsSectionProps {
  results: ResultDoc[];
}

export function TestimonialsSection({ results }: TestimonialsSectionProps) {
  const testimonialsData: TestimonialCard[] = results.map((item) => ({
    id: item._id,
    name: item.personName,
    duration: item.durationLabel,
    resultMetric: item.resultMetric,
    beforeImage: item.beforeImageUrl,
    afterImage: item.afterImageUrl,
    quote: item.testimonial,
    tagLabel: item.tagLabel,
  }));
  const [api, setApi] = useState<CarouselApi>();
  const [selectedSnap, setSelectedSnap] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setSelectedSnap(api.selectedScrollSnap());
    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  if (!testimonialsData.length) {
    return (
      <SectionShell
        id="resultados"
        eyebrow="RESULTADOS"
        title="Transformaciones reales"
        description="Carga documentos de tipo result en Sanity para mostrar este carrusel."
      >
        <div className="rounded-[12px] border border-white/14 bg-[linear-gradient(145deg,#17181d_0%,#111217_100%)] p-5">
          <p className="text-sm text-white/78">No se encontraron resultados en Sanity.</p>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell
      id="resultados"
      eyebrow="RESULTADOS"
      title="Transformaciones reales"
      description="Cada caso muestra su antes y despues. Desliza para ver cada proceso."
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps" }}
        className="w-full pb-16"
      >
        <CarouselContent className="-ml-3">
          {testimonialsData.map((item) => (
            <CarouselItem key={item.id} className="basis-auto pl-3">
              <article className="group flex h-full w-[min(82vw,18.5rem)] flex-col overflow-hidden rounded-[14px] border border-white/14 bg-[linear-gradient(150deg,#17181e_0%,#101116_100%)] shadow-[0_30px_58px_-38px_rgba(0,0,0,0.95)] transition-[transform,box-shadow] duration-[240ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[0_36px_62px_-34px_rgba(122,14,14,0.84)]">
                <div className="w-full overflow-hidden border-b border-white/10">
                  <div className="relative aspect-[4/3] w-full p-2.5">
                    <div className="grid h-full w-full grid-cols-2 gap-2.5">
                      <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                        <Image
                          src={item.beforeImage}
                          alt={`Antes de ${item.name}`}
                          fill
                          sizes="(max-width: 640px) 38vw, 140px"
                          className="object-cover object-center brightness-[0.78] contrast-[0.96] grayscale saturate-[0.74] transition-transform duration-[260ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                        />
                        <Badge className="absolute left-2 top-2 rounded-[999px] border border-white/20 bg-[rgba(9,10,14,0.56)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/92 backdrop-blur-[8px]">
                          ANTES
                        </Badge>
                      </div>

                      <div className="relative h-full w-full overflow-hidden rounded-[10px]">
                        <Image
                          src={item.afterImage}
                          alt={`Despues de ${item.name}`}
                          fill
                          sizes="(max-width: 640px) 38vw, 140px"
                          className="object-cover object-center brightness-[0.94] contrast-[1.04] saturate-[1.08] transition-transform duration-[260ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                        />
                        <Badge className="absolute left-2 top-2 rounded-[999px] border border-primary/35 bg-[rgba(122,14,14,0.46)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[8px]">
                          DESPUES
                        </Badge>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_60%)]" />
                    <Badge className="absolute bottom-3 left-3 rounded-[8px] border border-primary/45 bg-[linear-gradient(120deg,rgba(139,0,0,0.9)_0%,rgba(212,20,20,0.95)_100%)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                      {item.tagLabel}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <p className="line-clamp-3 text-sm leading-relaxed text-white/84">{item.quote}</p>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    {item.duration ? (
                      <p className="rounded-[8px] border border-white/14 bg-black/36 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/72">
                        {item.duration}
                      </p>
                    ) : null}
                  </div>
                  <p className="inline-flex rounded-[8px] border border-primary/35 bg-primary/14 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/92">
                    Resultado: {item.resultMetric}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="z-30 !bottom-4 !left-auto !right-[4.25rem] !top-auto !size-11 !translate-x-0 !translate-y-0 rounded-[12px] border-white/24 bg-[rgba(8,10,14,0.64)] text-white backdrop-blur-[10px] transition-[transform,border-color,background-color,opacity] duration-[220ms] hover:border-primary/42 hover:bg-primary/16 disabled:opacity-45" />
        <CarouselNext className="z-30 !bottom-4 !right-4 !top-auto !size-11 !translate-x-0 !translate-y-0 rounded-[12px] border-white/24 bg-[rgba(8,10,14,0.64)] text-white backdrop-blur-[10px] transition-[transform,border-color,background-color,opacity] duration-[220ms] hover:border-primary/42 hover:bg-primary/16 disabled:opacity-45" />

        <div className="absolute bottom-4 left-4 z-30 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {testimonialsData.map((item, index) => (
              <button
                key={`dot-${item.id}`}
                type="button"
                aria-label={`Ir al testimonio ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-[220ms]",
                  selectedSnap === index ? "w-6 bg-primary" : "w-2.5 bg-white/28 hover:bg-white/46"
                )}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </SectionShell>
  );
}
