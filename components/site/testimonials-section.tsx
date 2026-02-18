"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
  const [activeIndex, setActiveIndex] = useState(0);
  const snapCount = api?.scrollSnapList().length ?? testimonialsData.length;
  const maxIndex = Math.max(snapCount - 1, 0);
  const clampIndex = useCallback((index: number) => Math.min(Math.max(index, 0), maxIndex), [maxIndex]);

  const goToIndex = useCallback((index: number) => {
    api?.scrollTo(clampIndex(index));
  }, [api, clampIndex]);

  const goToPrev = useCallback(() => {
    api?.scrollTo(clampIndex(activeIndex - 1));
  }, [api, activeIndex, clampIndex]);

  const goToNext = useCallback(() => {
    api?.scrollTo(clampIndex(activeIndex + 1));
  }, [api, activeIndex, clampIndex]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const safeMaxIndex = Math.max(api.scrollSnapList().length - 1, 0);
      setActiveIndex(Math.min(api.selectedScrollSnap(), safeMaxIndex));
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const isPrevDisabled = activeIndex <= 0;
  const isNextDisabled = activeIndex >= maxIndex;

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
      description="Cada caso muestra su antes y después. Usa las flechas para ver cada proceso."
    >
      {/* Causa raiz: combinacion de track con -ml/pl + padding del shell; sin min-w-0/max-w-full en el item de grid aparecia overflow horizontal y se sentia jank al scrollear sobre el carrusel. */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          containScroll: false,
          dragFree: false,
          slidesToScroll: 1,
        }}
        className="relative w-full max-w-full min-w-0 overflow-x-clip pb-4 [touch-action:pan-y]"
      >
        <CarouselContent className="-ml-2 max-w-full pr-2 sm:pr-4">
          {testimonialsData.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[80%] max-w-[80vw] pl-2 sm:basis-[72%] md:basis-[18.5rem] md:max-w-[18.5rem]"
            >
              <article className="group flex h-full w-full max-w-none flex-col overflow-hidden rounded-[14px] border border-white/14 bg-[linear-gradient(150deg,#17181e_0%,#101116_100%)] shadow-[0_30px_58px_-38px_rgba(0,0,0,0.95)] transition-[transform,box-shadow] duration-[240ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[0_36px_62px_-34px_rgba(122,14,14,0.84)]">
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
                          alt={`Después de ${item.name}`}
                          fill
                          sizes="(max-width: 640px) 38vw, 140px"
                          className="object-cover object-center brightness-[0.94] contrast-[1.04] saturate-[1.08] transition-transform duration-[260ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                        />
                        <Badge className="absolute left-2 top-2 rounded-[999px] border border-primary/35 bg-[rgba(122,14,14,0.46)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[8px]">
                          DESPUÉS
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

        <div className="mt-4 relative flex items-center justify-between gap-3 pb-2 z-[80]">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: snapCount }, (_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                aria-label={`Ir al resultado ${index + 1}`}
                onClick={() => goToIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-200",
                  activeIndex === index ? "w-6 bg-primary" : "w-2.5 bg-white/28 hover:bg-white/46"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 z-[90] shrink-0">
            <button
              type="button"
              aria-label="Ver testimonio anterior"
              onClick={goToPrev}
              disabled={isPrevDisabled}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-[rgba(8,10,14,0.62)] text-white/88 backdrop-blur-[10px] transition-[transform,border-color,background-color,opacity,box-shadow] duration-[220ms] ease-out hover:scale-[1.03] hover:border-primary/38 hover:bg-primary/12 hover:shadow-[0_12px_24px_-16px_rgba(255,0,0,0.7)] active:scale-[0.95] disabled:opacity-45"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Ver siguiente testimonio"
              onClick={goToNext}
              disabled={isNextDisabled}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-[rgba(8,10,14,0.62)] text-white/88 backdrop-blur-[10px] transition-[transform,border-color,background-color,opacity,box-shadow] duration-[220ms] ease-out hover:scale-[1.03] hover:border-primary/38 hover:bg-primary/12 hover:shadow-[0_12px_24px_-16px_rgba(255,0,0,0.7)] active:scale-[0.95] disabled:opacity-45"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Carousel>
    </SectionShell>
  );
}
