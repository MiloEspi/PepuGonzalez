"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

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

interface TestimonialQuoteProps {
  cardId: string;
  quote: string;
}

// Slider drag-to-reveal. ANTES cubre el lado izquierdo, DESPUÉS el derecho.
// Dimensiones originales de las fotos pueden diferir; ambas llenan el contenedor
// con aspect-ratio fijo + object-fit:cover para que el slider nunca se deforme.
function TestimonialSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  tagLabel,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  tagLabel: string;
}) {
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);
  const isHorizontal = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Native listeners on the target element fire in the target/bubble phase
  // BEFORE the event reaches Embla's container (an ancestor). Calling
  // stopPropagation() here prevents Embla from ever seeing the event.
  // React synthetic handlers (onPointerDown etc.) on this element fire
  // via delegation at the React root — which is *after* Embla in the bubble
  // chain — so React's e.stopPropagation() alone cannot stop Embla.
  //
  // Direction detection: we only capture + preventDefault once we know the
  // gesture is horizontal. Vertical swipes fall through to native scroll.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = (clientX: number) => {
      const { left, width } = el.getBoundingClientRect();
      setPosition(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
    };

    const onDown = (e: PointerEvent) => {
      e.stopPropagation();
      isDragging.current = true;
      isHorizontal.current = false;
      startX.current = e.clientX;
      startY.current = e.clientY;
      // Don't capture yet — wait until direction is confirmed horizontal.
      update(e.clientX);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      e.stopPropagation();

      if (!isHorizontal.current) {
        const dx = Math.abs(e.clientX - startX.current);
        const dy = Math.abs(e.clientY - startY.current);
        if (dx < 4 && dy < 4) return;
        if (dy > dx) {
          // Vertical swipe — release drag so native scroll takes over.
          isDragging.current = false;
          return;
        }
        isHorizontal.current = true;
        el.setPointerCapture(e.pointerId);
      }

      e.preventDefault();
      update(e.clientX);
    };
    const onUp = (e: PointerEvent) => {
      e.stopPropagation();
      isDragging.current = false;
      isHorizontal.current = false;
    };
    const onCancel = (e: PointerEvent) => {
      e.stopPropagation();
      isDragging.current = false;
      isHorizontal.current = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove, { passive: false });
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] w-full select-none overflow-hidden rounded-[11px] cursor-ew-resize [touch-action:pan-y]"
      role="slider"
      tabIndex={0}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Comparador antes y después"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
      }}
    >
      {/* DESPUÉS — imagen base (lado derecho) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 640px) 80vw, 296px"
          className="object-cover object-center brightness-[0.94] contrast-[1.04] saturate-[1.08]"
        />
      </div>

      {/* ANTES — imagen superpuesta (lado izquierdo) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 640px) 80vw, 296px"
          className="object-cover object-center brightness-[0.78] contrast-[0.96] grayscale saturate-[0.74]"
        />
      </div>

      {/* Divisor con handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-20"
        style={{ left: `calc(${position}% - 1px)` }}
      >
        <span className="absolute inset-y-0 block w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.24)]" />
        <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/60 shadow-[0_16px_28px_-18px_rgba(0,0,0,0.9)]">
          <MoveHorizontal className="size-4 text-white/90" />
        </span>
      </div>

      {/* Badges ANTES / DESPUÉS */}
      <Badge className="pointer-events-none absolute left-2 top-2 z-10 rounded-[999px] border border-white/20 bg-[rgba(9,10,14,0.56)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/92 backdrop-blur-[8px]">
        ANTES
      </Badge>
      <Badge className="pointer-events-none absolute right-2 top-2 z-10 rounded-[999px] border border-primary/35 bg-[rgba(122,14,14,0.46)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-[8px]">
        DESPUÉS
      </Badge>

      {/* Gradiente + badge tag en la base */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_60%)]" />
      <Badge className="absolute bottom-3 left-3 z-10 rounded-[8px] border border-primary/45 bg-[linear-gradient(120deg,rgba(139,0,0,0.9)_0%,rgba(212,20,20,0.95)_100%)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
        {tagLabel}
      </Badge>
    </div>
  );
}

function TestimonialQuote({ cardId, quote }: TestimonialQuoteProps) {
  const quoteRef = useRef<HTMLParagraphElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasDesktopOverflow, setHasDesktopOverflow] = useState(false);
  const quoteElementId = `testimonial-quote-${cardId}`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncDesktopState = () => {
      const desktop = mediaQuery.matches;
      setIsDesktop(desktop);
      if (!desktop) {
        setIsExpanded(false);
        setHasDesktopOverflow(false);
      }
    };

    syncDesktopState();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncDesktopState);
      return () => mediaQuery.removeEventListener("change", syncDesktopState);
    }

    mediaQuery.addListener(syncDesktopState);
    return () => mediaQuery.removeListener(syncDesktopState);
  }, []);

  useEffect(() => {
    if (!isDesktop || isExpanded) return;

    const measureOverflow = () => {
      const element = quoteRef.current;
      if (!element) return;
      setHasDesktopOverflow(element.scrollHeight - element.clientHeight > 1);
    };

    measureOverflow();
    window.addEventListener("resize", measureOverflow);
    return () => window.removeEventListener("resize", measureOverflow);
  }, [isDesktop, isExpanded, quote]);

  return (
    <div className="space-y-2">
      <p
        ref={quoteRef}
        id={quoteElementId}
        className={cn("line-clamp-3 text-sm leading-relaxed text-white/84", isDesktop && isExpanded ? "lg:line-clamp-none" : "")}
      >
        {quote}
      </p>

      {isDesktop && hasDesktopOverflow ? (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={quoteElementId}
          onClick={() => setIsExpanded((current) => !current)}
          className="inline-flex rounded-[8px] border border-white/20 px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] text-white/84 transition-colors duration-200 hover:border-white/34 hover:text-white"
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      ) : null}
    </div>
  );
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
      description="Cada caso muestra su antes y después. Arrastrá el divisor para comparar."
    >
      {/* Causa raiz: combinacion de track con -ml/pl + padding del shell; sin min-w-0/max-w-full en el item de grid aparecia overflow horizontal y se sentia jank al scrollear sobre el carrusel. */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          containScroll: false,
          dragFree: false,
          slidesToScroll: 1,
          watchDrag: false,
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
                <div className="w-full overflow-hidden border-b border-white/10 p-2.5">
                  <TestimonialSlider
                    beforeSrc={item.beforeImage}
                    afterSrc={item.afterImage}
                    beforeAlt={`Antes de ${item.name}`}
                    afterAlt={`Después de ${item.name}`}
                    tagLabel={item.tagLabel}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-4">
                  <TestimonialQuote cardId={item.id} quote={item.quote} />
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
