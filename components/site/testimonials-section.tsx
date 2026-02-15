"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate } from "animejs";

import { animateFadeSlideIn } from "@/lib/animations";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { SectionShell } from "@/components/site/section-shell";
import { cn } from "@/lib/utils";

const transformations = [
  {
    id: "lucia",
    name: "Lucia R.",
    timeframe: "12 semanas",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    testimonial: "Baje grasa, gane fuerza y por primera vez sostuve el proceso sin abandonar.",
  },
  {
    id: "matias",
    name: "Matias G.",
    timeframe: "90 dias",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    testimonial: "Con sistema y seguimiento, deje de entrenar al azar y empece a progresar en serio.",
  },
  {
    id: "carla",
    name: "Carla V.",
    timeframe: "10 semanas",
    beforeImage: "/fitness-shirtless.jpg",
    afterImage: "/fitness-shirtless.jpg",
    testimonial: "Entrenando en casa logre recomposicion y mas confianza en mi fisico.",
  },
];

function HoverBeforeAfter({ beforeImage, afterImage, name }: { beforeImage: string; afterImage: string; name: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const beforeLayerRef = useRef<HTMLDivElement>(null);
  const afterLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const beforeLayer = beforeLayerRef.current;
    const afterLayer = afterLayerRef.current;
    if (!wrapper || !beforeLayer || !afterLayer) return;

    afterLayer.style.opacity = "0";

    const handleEnter = () => {
      animate(beforeLayer, {
        opacity: [1, 0.24],
        translateX: [0, -10],
        duration: 360,
        ease: "out(3)",
      });

      animate(afterLayer, {
        opacity: [0, 1],
        translateX: [10, 0],
        duration: 400,
        ease: "out(4)",
      });
    };

    const handleLeave = () => {
      animate(beforeLayer, {
        opacity: [0.24, 1],
        translateX: [-10, 0],
        duration: 360,
        ease: "out(3)",
      });

      animate(afterLayer, {
        opacity: [1, 0],
        translateX: [0, 10],
        duration: 320,
        ease: "out(3)",
      });
    };

    wrapper.addEventListener("mouseenter", handleEnter);
    wrapper.addEventListener("mouseleave", handleLeave);

    return () => {
      wrapper.removeEventListener("mouseenter", handleEnter);
      wrapper.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="group relative h-[280px] overflow-hidden rounded-[8px] border border-white/12 bg-black/65">
      <div ref={beforeLayerRef} className="absolute inset-0">
        <Image src={beforeImage} alt={`${name} antes`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
      </div>

      <div ref={afterLayerRef} className="absolute inset-0">
        <Image src={afterImage} alt={`${name} despues`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-black/26" />
      </div>

      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
        <span className="rounded-full border border-white/25 bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/85">
          Antes
        </span>
        <span className="rounded-full border border-primary/35 bg-primary/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
          Despues
        </span>
      </div>
    </div>
  );
}

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
      title="Resultados reales. Personas reales."
      description="Reemplaza estas imagenes y citas por casos concretos para reforzar prueba social."
    >
      <div ref={sectionRef} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {transformations.map((item, index) => (
          <article
            key={item.id}
            data-reveal
            className={cn(
              "textured-surface overflow-hidden rounded-[10px] border border-white/12 bg-card/86 opacity-0 shadow-[0_30px_48px_-40px_rgba(0,0,0,0.95)] transition-[transform,box-shadow] duration-[230ms] ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[0_34px_54px_-32px_rgba(122,14,14,0.72)]",
              index === 0 ? "md:col-span-2" : ""
            )}
          >
            <div className="p-1.5">
              <HoverBeforeAfter beforeImage={item.beforeImage} afterImage={item.afterImage} name={item.name} />
            </div>

            <div className="space-y-3 p-4">
              <p className="text-sm leading-relaxed text-white/86">&ldquo;{item.testimonial}&rdquo;</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="rounded-full border border-border/65 bg-background/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
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
