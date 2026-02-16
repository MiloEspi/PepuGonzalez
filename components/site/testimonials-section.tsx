"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { SectionShell } from "@/components/site/section-shell";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const transformations = [
  {
    id: "nico",
    tag: "+8kg en 16 semanas",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    profile: "Volumen con estructura",
  },
  {
    id: "lucia",
    tag: "-12kg en 90 dias",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    profile: "Definicion y adherencia",
  },
  {
    id: "carla",
    tag: "+5kg magros en 14 semanas",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    profile: "Recomposicion completa",
  },
  {
    id: "franco",
    tag: "-9cm cintura en 12 semanas",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    profile: "Cambio visual total",
  },
];

export function TestimonialsSection() {
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

  return (
    <SectionShell
      id="resultados"
      eyebrow="RESULTADOS"
      title="Resultados visuales, no promesas"
      description="Desliza y mira procesos reales. Impacto primero: antes/despues, sin relleno."
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {transformations.map((item) => (
            <CarouselItem key={item.id} className="basis-[86%] pl-3 sm:basis-[64%] lg:basis-[42%]">
              <article className="group overflow-hidden rounded-[14px] border border-white/14 bg-[linear-gradient(150deg,#17181e_0%,#101116_100%)] shadow-[0_30px_58px_-38px_rgba(0,0,0,0.95)] transition-[transform,box-shadow] duration-[240ms] ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[0_36px_64px_-34px_rgba(122,14,14,0.84)]">
                <div className="relative overflow-hidden p-2">
                  <span className="absolute left-4 top-4 z-20 rounded-[9px] border border-primary/45 bg-[linear-gradient(120deg,rgba(139,0,0,0.92)_0%,rgba(212,20,20,0.96)_100%)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-white">
                    {item.tag}
                  </span>

                  <div className="relative grid h-[280px] grid-cols-2 overflow-hidden rounded-[10px] border border-white/12 bg-black/72">
                    <div className="relative">
                      <Image src={item.beforeImage} alt={`Antes de ${item.profile}`} fill sizes="(max-width: 768px) 86vw, 35vw" className="object-cover brightness-[0.74]" />
                      <div className="pointer-events-none absolute inset-0 bg-black/35" />
                      <span className="absolute bottom-3 left-3 rounded-[7px] border border-white/20 bg-black/56 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.11em] text-white/84">
                        Antes
                      </span>
                    </div>

                    <div className="relative">
                      <Image src={item.afterImage} alt={`Despues de ${item.profile}`} fill sizes="(max-width: 768px) 86vw, 35vw" className="object-cover brightness-[0.82]" />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(122,14,14,0.42)_100%)]" />
                      <span className="absolute bottom-3 left-3 rounded-[7px] border border-primary/45 bg-primary/26 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.11em] text-white">
                        Despues
                      </span>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-white/72" />
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/66">{item.profile}</p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {transformations.map((item, index) => (
              <button
                key={`dot-${item.id}`}
                type="button"
                aria-label={`Ir al resultado ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-200",
                  selectedSnap === index ? "w-6 bg-primary" : "w-2.5 bg-white/28 hover:bg-white/46"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CarouselPrevious className="!static !left-auto !right-auto !top-auto !size-10 !translate-y-0 rounded-[10px] border-white/18 bg-black/42 text-white hover:border-primary/45 hover:bg-primary/16 hover:text-white" />
            <CarouselNext className="!static !left-auto !right-auto !top-auto !size-10 !translate-y-0 rounded-[10px] border-white/18 bg-black/42 text-white hover:border-primary/45 hover:bg-primary/16 hover:text-white" />
          </div>
        </div>
      </Carousel>
    </SectionShell>
  );
}
