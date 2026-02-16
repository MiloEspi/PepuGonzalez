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
    time: "16 semanas",
    result: "+8kg",
    image: "/fitness-shirtless.jpg",
    testimonial:
      "Pase de entrenar sin direccion a tener estructura clara. Subi masa y mejore fuerza sin romper adherencia.",
  },
  {
    id: "lucia",
    name: "Lucia R.",
    time: "90 dias",
    result: "-12kg",
    image: "/fitness-shirtless.jpg",
    testimonial:
      "Con seguimiento y plan ordenado pude sostener constancia real. El cambio visual en 3 meses fue gigante.",
  },
  {
    id: "carla",
    name: "Carla V.",
    time: "14 semanas",
    result: "+5kg magros",
    image: "/fitness-shirtless.jpg",
    testimonial:
      "Entendi como progresar semana a semana. Mejor postura, mas energia y mucho mas control de mi entrenamiento.",
  },
  {
    id: "franco",
    name: "Franco A.",
    time: "12 semanas",
    result: "-9cm cintura",
    image: "/fitness-shirtless.jpg",
    testimonial:
      "Por primera vez deje de improvisar. El sistema fue simple de ejecutar y los resultados aparecieron rapido.",
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
      title="Transformaciones reales"
      description="Procesos aplicados con disciplina y estructura. Desliza para ver casos reales."
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {testimonials.map((item) => (
            <CarouselItem key={item.id} className="basis-[86%] pl-3 sm:basis-[62%] lg:basis-[40%]">
              <article className="group overflow-hidden rounded-[14px] border border-white/14 bg-[linear-gradient(150deg,#17181e_0%,#101116_100%)] shadow-[0_30px_58px_-38px_rgba(0,0,0,0.95)] transition-[transform,box-shadow] duration-[240ms] ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[0_36px_62px_-34px_rgba(122,14,14,0.84)]">
                <div className="relative h-[220px] overflow-hidden border-b border-white/10">
                  <Image
                    src={item.image}
                    alt={`Resultado de ${item.name}`}
                    fill
                    sizes="(max-width: 768px) 86vw, 34vw"
                    className="object-cover brightness-[0.82] transition-transform duration-[260ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.58)_100%)]" />
                  <Badge className="absolute left-3 top-3 rounded-[8px] border border-primary/45 bg-[linear-gradient(120deg,rgba(139,0,0,0.9)_0%,rgba(212,20,20,0.95)_100%)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                    Transformacion real
                  </Badge>
                </div>

                <div className="space-y-3 p-4">
                  <p className="text-sm leading-relaxed text-white/84">{item.testimonial}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="rounded-[8px] border border-white/14 bg-black/36 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/72">
                      {item.time}
                    </p>
                  </div>
                  <p className="inline-flex rounded-[8px] border border-primary/35 bg-primary/14 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/92">
                    Resultado: {item.result}
                  </p>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-4 flex items-center justify-between gap-3">
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

          <div className="flex items-center gap-2">
            <CarouselPrevious className="!static !left-auto !right-auto !top-auto !size-10 !translate-y-0 rounded-[10px] border-white/18 bg-black/42 text-white hover:border-primary/45 hover:bg-primary/16 hover:text-white" />
            <CarouselNext className="!static !left-auto !right-auto !top-auto !size-10 !translate-y-0 rounded-[10px] border-white/18 bg-black/42 text-white hover:border-primary/45 hover:bg-primary/16 hover:text-white" />
          </div>
        </div>
      </Carousel>
    </SectionShell>
  );
}
