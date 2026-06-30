"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
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

const SPEED = 0.5; // px/frame → ~30px/s a 60fps

export function TestimonialsSection({ results }: TestimonialsSectionProps) {
  const testimonialsData: TestimonialCard[] = results.map((item) => ({
    id: item._id,
    name: item.personName,
    resultMetric: item.resultMetric,
    beforeImage: item.beforeImageUrl,
    afterImage: item.afterImageUrl,
    quote: item.testimonial,
  }));

  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const [centerIndex, setCenterIndex] = useState(0);
  const centerIndexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!emblaApi || testimonialsData.length === 0) return;

    const tick = () => {
      // Avanzar la cinta
      if (!pausedRef.current) {
        emblaApi.scrollBy(SPEED);
      }

      // Viewport = padre del track interno de Embla
      const viewport = emblaApi.containerNode().parentElement;
      if (viewport) {
        const slideNodes = emblaApi.slideNodes() as HTMLElement[];
        const vpRect = viewport.getBoundingClientRect();
        const centerX = vpRect.left + vpRect.width / 2;

        // Leer todas las posiciones primero (batch read)
        const rects = slideNodes.map((s) => s.getBoundingClientRect());

        // Encontrar la tarjeta más cercana al centro
        let closestI = 0;
        let closestDist = Infinity;
        rects.forEach((rect, i) => {
          const dist = Math.abs(rect.left + rect.width / 2 - centerX);
          if (dist < closestDist) {
            closestDist = dist;
            closestI = i;
          }
        });

        // Mapear índice DOM → índice de datos (funciona también con los clones del loop)
        const raw = parseInt(slideNodes[closestI]?.dataset.slideIndex ?? "0", 10);
        const dataI = Number.isNaN(raw) ? 0 : raw % testimonialsData.length;
        if (dataI !== centerIndexRef.current) {
          centerIndexRef.current = dataI;
          setCenterIndex(dataI);
        }

        // Aplicar escala + opacidad a cada tarjeta (batch write)
        rects.forEach((rect, i) => {
          const dist = Math.abs(rect.left + rect.width / 2 - centerX);
          const progress = Math.min(dist / (vpRect.width * 0.55), 1);
          slideNodes[i].style.transform = `scale(${(1 - progress * 0.05).toFixed(3)})`;
          slideNodes[i].style.opacity = (1 - progress * 0.28).toFixed(3);
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onPointerDown = () => {
      pausedRef.current = true;
    };
    const onPointerUp = () => {
      setTimeout(() => {
        pausedRef.current = false;
      }, 600);
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, testimonialsData.length]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };
  const handleMouseLeave = () => {
    setTimeout(() => {
      pausedRef.current = false;
    }, 300);
  };

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

  return (
    <SectionShell
      id="resultados"
      eyebrow="RESULTADOS REALES"
      title="Lo que lograron mis alumnos"
      description="Antes y después reales. Deslizá para ver más."
    >
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Carousel
          setApi={setEmblaApi}
          opts={{
            loop: true,
            dragFree: true,
            align: "start",
          }}
          className="w-full overflow-x-clip [touch-action:pan-y]"
        >
          <CarouselContent className="-ml-3">
            {testimonialsData.map((item, i) => (
              <CarouselItem
                key={item.id}
                data-slide-index={i}
                className="basis-[68%] max-w-[68vw] pl-3 md:basis-[300px] md:max-w-[300px]"
              >
                <article className="overflow-hidden rounded-[14px] border border-white/14 bg-[linear-gradient(150deg,#17181e_0%,#101116_100%)] shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)]">

                  {/* Fotos antes/después fijas lado a lado — sin slider, sin trabarse */}
                  <div className="flex h-[62vw] w-full overflow-hidden border-b border-white/10 md:h-[280px]">

                    {/* ANTES */}
                    <div className="relative h-full w-1/2">
                      <Image
                        src={item.beforeImage}
                        alt={`Antes de ${item.name}`}
                        fill
                        sizes="(max-width: 768px) 34vw, 150px"
                        className="object-cover object-top brightness-[0.75] grayscale"
                      />
                      <Badge className="pointer-events-none absolute left-1.5 top-1.5 rounded-[6px] border border-white/20 bg-black/52 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white/80 backdrop-blur-[4px]">
                        ANTES
                      </Badge>
                    </div>

                    {/* Divisor vertical */}
                    <div className="w-px shrink-0 bg-white/18" />

                    {/* DESPUÉS */}
                    <div className="relative h-full w-1/2">
                      <Image
                        src={item.afterImage}
                        alt={`Después de ${item.name}`}
                        fill
                        sizes="(max-width: 768px) 34vw, 150px"
                        className="object-cover object-top brightness-[0.94] contrast-[1.04]"
                      />
                      <Badge className="pointer-events-none absolute right-1.5 top-1.5 rounded-[6px] border border-primary/35 bg-[rgba(122,14,14,0.5)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-[4px]">
                        DESPUÉS
                      </Badge>
                    </div>
                  </div>

                  {/* Info de la persona */}
                  <div className="p-3">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="mt-1 inline-flex rounded-[6px] border border-primary/35 bg-primary/14 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/90">
                      {item.resultMetric}
                    </p>
                    {/* Frase: solo en la tarjeta central */}
                    {centerIndex === i && item.quote ? (
                      <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-white/62">
                        "{item.quote}"
                      </p>
                    ) : null}
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </SectionShell>
  );
}
