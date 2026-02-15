"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass } from "lucide-react";

import { PlanFinderQuiz } from "@/components/site/plan-finder-quiz";
import { SectionShell } from "@/components/site/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";

export function PlanFinderTeaser() {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const { hasAnimated, prefersReducedMotion } = useInViewAnimation(cardRef, {
    threshold: 0.15,
    rootMargin: "0px 0px -20% 0px",
    skipInitialCheck: true,
  });

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain || !hasAnimated) return;

    curtain.style.transformOrigin = "top";
    curtain.style.transform = "scaleY(1)";

    if (prefersReducedMotion) {
      curtain.style.transform = "scaleY(0)";
      curtain.style.pointerEvents = "none";
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      console.debug("[PlanFinderTeaser] curtain reveal triggered");
    }

    const animation = animate(curtain, {
      scaleY: [1, 0],
      duration: 520,
      ease: "out(3)",
      complete: () => {
        curtain.style.pointerEvents = "none";
      },
    });

    return () => {
      animation.pause();
    };
  }, [hasAnimated, prefersReducedMotion]);

  return (
    <SectionShell id="encontra-tu-plan" className="pt-3 md:pt-4" panelClassName="bg-[linear-gradient(170deg,#15161a_0%,#111217_100%)]">
      <div ref={cardRef} className="relative z-20">
        <div ref={curtainRef} className="pointer-events-none absolute inset-0 z-30 origin-top bg-background" />

        <div className="rounded-[14px] bg-[linear-gradient(160deg,#15161a_0%,#131419_46%,#1a0f10_100%)] p-4 shadow-[0_34px_62px_-44px_rgba(122,14,14,0.9)] md:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-2">
                <Badge className="badge-shimmer w-fit border border-primary/45 bg-primary/90 text-primary-foreground">Plan Finder</Badge>
                <h3 className="max-w-2xl text-[1.7rem] font-semibold leading-tight md:text-[2.15rem]">
                  Descubri tu mejor plan en menos de un minuto.
                </h3>
                <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                  4 pasos, recomendacion directa y acceso inmediato por WhatsApp.
                </p>
              </div>
              <Compass className="hidden size-6 text-primary md:block" />
            </div>

            {!expanded ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="premium-cta w-full rounded-[10px] bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] px-5 py-5 text-sm font-semibold tracking-[0.02em] sm:w-auto"
                >
                  Empezar quiz
                  <ArrowRight className="premium-arrow size-4" />
                </Button>

                <details className="rounded-[10px] bg-black/22 px-4 py-2.5 text-sm text-muted-foreground sm:max-w-md">
                  <summary className="cursor-pointer font-medium text-foreground">Como funciona?</summary>
                  <p className="mt-1.5">Elegis objetivo, frecuencia y contexto. Te recomendamos un plan exacto para vos.</p>
                </details>
              </div>
            ) : null}

            {expanded ? (
              <div className="rounded-[10px] bg-background/42 p-2.5 md:p-3">
                <PlanFinderQuiz />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
