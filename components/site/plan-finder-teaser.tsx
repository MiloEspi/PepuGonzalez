"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass } from "lucide-react";

import { PlanFinderQuiz } from "@/components/site/plan-finder-quiz";
import { SectionShell } from "@/components/site/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";

export function PlanFinderTeaser() {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const { hasAnimated, prefersReducedMotion } = useInViewAnimation(cardRef, {
    threshold: 0.22,
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
      duration: 560,
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
    <SectionShell id="encontra-tu-plan" className="pt-6 md:pt-8">
      <div ref={cardRef} className="relative z-20 -mt-8 overflow-hidden rounded-[1.65rem] md:-mt-12">
        <div ref={curtainRef} className="pointer-events-none absolute inset-0 z-30 origin-top bg-background" />

        <Card className="rounded-3xl border-primary/25 bg-[linear-gradient(150deg,hsl(36_30%_98%)_0%,hsl(212_60%_95%)_100%)] p-5 shadow-[0_24px_60px_-56px_hsl(212_70%_30%)] md:p-7">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge className="w-fit rounded-full bg-primary/90 text-primary-foreground">Plan Finder</Badge>
                <h3 className="max-w-2xl text-2xl font-semibold md:text-[2rem]">
                  Descubri tu mejor plan en menos de un minuto.
                </h3>
                <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                  4 preguntas, recomendacion clara y acceso directo al plan ideal para vos.
                </p>
              </div>
              <Compass className="mt-1 hidden size-6 text-primary md:block" />
            </div>

            {!expanded ? (
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="w-full rounded-full px-6 py-6 text-base font-semibold md:w-auto"
                >
                  Empezar quiz
                  <ArrowRight className="size-4" />
                </Button>

                <details className="rounded-xl border border-border/75 bg-background/65 px-4 py-3 text-sm text-muted-foreground md:max-w-md">
                  <summary className="cursor-pointer font-medium text-foreground">Como funciona?</summary>
                  <p className="mt-2">
                    Te recomiendo un plan segun objetivo, nivel, dias por semana y lugar de entrenamiento.
                  </p>
                </details>
              </div>
            ) : null}

            {expanded ? (
              <div className="rounded-2xl border border-border/70 bg-background/55 p-3 md:p-4">
                <PlanFinderQuiz />
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}
