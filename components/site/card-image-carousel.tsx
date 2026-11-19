"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CarouselSlide {
  src: string;
  alt: string;
  // "cover" llena el marco (fotos); "contain" muestra la imagen entera sobre fondo oscuro (tablas, páginas).
  fit: "cover" | "contain";
  position?: string;
}

export function CardImageCarousel({ slides }: { slides: CarouselSlide[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const index = Math.round(scroller.scrollLeft / scroller.clientWidth);
    if (index !== active) setActive(index);
    if (!hasSwiped && scroller.scrollLeft > 8) setHasSwiped(true);
  }

  function goTo(index: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    scroller.scrollTo({ left: clamped * scroller.clientWidth, behavior: "smooth" });
  }

  const multiple = slides.length > 1;

  return (
    <div className="group/carousel">
      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex aspect-[4/5] w-full snap-x snap-mandatory overflow-x-auto bg-[var(--negro)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, index) => (
            <div key={slide.src} className="relative h-full w-full shrink-0 snap-center">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className={slide.fit === "cover" ? "object-cover" : "object-contain"}
                style={slide.position ? { objectPosition: slide.position } : undefined}
                draggable={false}
                aria-hidden={index !== active}
              />
            </div>
          ))}
        </div>

        {multiple ? (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-[var(--texto)] backdrop-blur-sm transition-opacity duration-300",
              hasSwiped ? "opacity-0" : "opacity-100"
            )}
          >
            Deslizá para ver adentro →
          </span>
        ) : null}

        {multiple ? (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-[var(--texto)] opacity-0 transition-opacity duration-200 hover:bg-black/80 disabled:!opacity-0 group-hover/carousel:opacity-100 md:flex"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === slides.length - 1}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-[var(--texto)] opacity-0 transition-opacity duration-200 hover:bg-black/80 disabled:!opacity-0 group-hover/carousel:opacity-100 md:flex"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}
      </div>

      {multiple ? (
        <div className="flex justify-center gap-1.5 pt-3">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ver imagen ${index + 1} de ${slides.length}`}
              aria-current={index === active}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                index === active ? "w-4 bg-[var(--dorado)]" : "w-1.5 bg-white/25 hover:bg-white/45"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
