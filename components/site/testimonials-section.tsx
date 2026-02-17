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
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: "nico",
    name: "Nicolas M.",
    duration: "16 semanas",
    resultMetric: "+8kg",
    beforeImage: "/DSC02489.jpg",
    afterImage: "/DSC02494.jpg",
    quote:
      "Pase de entrenar sin direccion a tener estructura clara. Subi masa y mejore fuerza sin romper adherencia.",
  },
  {
    id: "lucia",
    name: "Lucia R.",
    duration: "90 dias",
    resultMetric: "-12kg",
    beforeImage: "/DSC02498.jpg",
    afterImage: "/DSC02542.jpg",
    quote:
      "Con seguimiento y plan ordenado pude sostener constancia real. El cambio visual en 3 meses fue gigante.",
  },
  {
    id: "carla",
    name: "Carla V.",
    duration: "14 semanas",
    resultMetric: "+5kg magros",
    beforeImage: "/DSC02494.jpg",
    afterImage: "/DSC02545.jpg",
    quote:
      "Entendi como progresar semana a semana. Mejor postura, mas energia y mucho mas control de mi entrenamiento.",
  },
  {
    id: "franco",
    name: "Franco A.",
    duration: "12 semanas",
    resultMetric: "-9cm cintura",
    beforeImage: "/DSC02489.jpg",
    afterImage: "/DSC02542.jpg",
    quote:
      "Por primera vez deje de improvisar. El sistema fue simple de ejecutar y los resultados aparecieron rapido.",
  },
];
const sharedResultsImage = "/910 resultados.png";

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
      title="Transformaciones reales"
      description="Cada caso muestra su antes y despues. Desliza para ver cada proceso."
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {testimonials.map((item) => (
            <CarouselItem key={item.id} className="basis-[78%] pl-3 sm:basis-[58%] lg:basis-[38%]">
              <article className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-white/14 bg-[linear-gradient(150deg,#17181e_0%,#101116_100%)] shadow-[0_30px_58px_-38px_rgba(0,0,0,0.95)] transition-[transform,box-shadow] duration-[240ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[0_36px_62px_-34px_rgba(122,14,14,0.84)]">
                <div className="relative grid h-[200px] grid-cols-2 gap-2.5 overflow-hidden border-b border-white/10 p-2.5">
                  <div className="relative overflow-hidden rounded-[10px]">
                    <Image
                      src={sharedResultsImage}
                      alt={`Antes de ${item.name}`}
                      fill
                      sizes="(max-width: 768px) 39vw, 18vw"
                      className="object-cover object-center brightness-[0.78] contrast-[0.96] grayscale saturate-[0.74] transition-transform duration-[260ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                    />
                    <Badge className="absolute left-2 top-2 rounded-[999px] border border-white/20 bg-[rgba(9,10,14,0.56)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/92 backdrop-blur-[8px]">
                      ANTES
                    </Badge>
                  </div>

                  <div className="relative overflow-hidden rounded-[10px]">
                    <Image
                      src={sharedResultsImage}
                      alt={`Despues de ${item.name}`}
                      fill
                      sizes="(max-width: 768px) 39vw, 18vw"
                      className="object-cover object-center brightness-[0.94] contrast-[1.04] saturate-[1.08] transition-transform duration-[260ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                    />
                    <Badge className="absolute left-2 top-2 rounded-[999px] border border-primary/35 bg-[rgba(122,14,14,0.46)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[8px]">
                      DESPUES
                    </Badge>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_60%)]" />
                  <Badge className="absolute bottom-3 left-3 rounded-[8px] border border-primary/45 bg-[linear-gradient(120deg,rgba(139,0,0,0.9)_0%,rgba(212,20,20,0.95)_100%)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                    Transformacion real
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <p className="line-clamp-3 text-sm leading-relaxed text-white/84">{item.quote}</p>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="rounded-[8px] border border-white/14 bg-black/36 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/72">
                      {item.duration}
                    </p>
                  </div>
                  <p className="inline-flex rounded-[8px] border border-primary/35 bg-primary/14 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/92">
                    Resultado: {item.resultMetric}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="z-30 !left-2 !top-[42%] !size-11 !-translate-y-1/2 rounded-[12px] border-white/24 bg-[rgba(8,10,14,0.64)] text-white backdrop-blur-[10px] transition-[transform,border-color,background-color,opacity] duration-[220ms] hover:-translate-y-[52%] hover:border-primary/42 hover:bg-primary/16 disabled:opacity-45" />
        <CarouselNext className="z-30 !right-2 !top-[42%] !size-11 !-translate-y-1/2 rounded-[12px] border-white/24 bg-[rgba(8,10,14,0.64)] text-white backdrop-blur-[10px] transition-[transform,border-color,background-color,opacity] duration-[220ms] hover:-translate-y-[52%] hover:border-primary/42 hover:bg-primary/16 disabled:opacity-45" />

        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {testimonials.map((item, index) => (
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
