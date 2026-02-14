"use client";

import { useEffect, useRef, useState } from "react";
import { Compass } from "lucide-react";

import { PlanFinderQuiz } from "@/components/site/plan-finder-quiz";
import { SectionShell } from "@/components/site/section-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { animateFadeSlideIn, morphDiscToPill, shouldReduceMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function PlanFinderTeaser() {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonLabelRef = useRef<HTMLSpanElement>(null);
  const quizWrapRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { hasAnimated } = useInViewAnimation(cardRef);

  useEffect(() => {
    if (!hasAnimated) return;
    animateFadeSlideIn(cardRef.current, { distance: 20, duration: 560 });
  }, [hasAnimated]);

  useEffect(() => {
    if (!expanded) return;
    animateFadeSlideIn(quizWrapRef.current, { distance: 16, duration: 480 });
  }, [expanded]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleExpand() {
    if (expanded) return;

    morphDiscToPill(buttonRef.current, buttonLabelRef.current);

    if (shouldReduceMotion()) {
      setExpanded(true);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setExpanded(true);
    }, 300);
  }

  return (
    <SectionShell id="plan-finder" className="-mt-10 pt-0 md:-mt-14 md:pt-0">
      <div ref={cardRef} className={cn("motion-safe:opacity-0", hasAnimated && "opacity-100")}>
        <Card className="rounded-3xl border-primary/25 bg-[linear-gradient(150deg,hsl(36_30%_98%)_0%,hsl(212_60%_95%)_100%)] p-6 shadow-[0_24px_60px_-56px_hsl(212_70%_30%)] md:p-8">
          <div className="flex flex-col gap-7">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <Badge className="w-fit rounded-full bg-primary/90 text-primary-foreground">Plan Finder</Badge>
                <h3 className="max-w-2xl text-2xl font-semibold md:text-3xl">
                  Descubri tu mejor plan en menos de un minuto.
                </h3>
                <p className="max-w-xl text-sm text-muted-foreground">
                  Responde 4 preguntas y te muestro la mejor opcion segun tu objetivo, nivel y dias disponibles.
                </p>
              </div>
              <Compass className="mt-1 hidden size-6 text-primary md:block" />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                ref={buttonRef}
                type="button"
                onClick={handleExpand}
                className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-[1.01]"
              >
                <span className="text-lg">+</span>
                <span ref={buttonLabelRef} className="pointer-events-none absolute right-5 text-sm font-semibold opacity-0">
                  Empezar quiz
                </span>
              </button>
              <p className="text-sm text-muted-foreground">Toque rapido: se abre inline, sin cambiar de pagina.</p>
            </div>

            {expanded ? (
              <div ref={quizWrapRef} className="space-y-4 opacity-0">
                <PlanFinderQuiz />
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}
