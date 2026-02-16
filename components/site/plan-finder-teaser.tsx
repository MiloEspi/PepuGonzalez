"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { PlanFinderQuiz } from "@/components/site/plan-finder-quiz";
import { SectionShell } from "@/components/site/section-shell";
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
    <SectionShell
      id="cuestionario"
      className="pb-3 pt-2 md:pb-4 md:pt-3"
      panelClassName="bg-[linear-gradient(168deg,#17181d_0%,#111217_44%,#18090b_100%)]"
    >
      <span id="encontra-tu-plan" aria-hidden className="sr-only" />
      <div ref={cardRef} className="relative z-20">
        <div ref={curtainRef} className="pointer-events-none absolute inset-0 z-30 origin-top bg-background" />

        <div className="rounded-[15px] border border-white/14 bg-[linear-gradient(160deg,#16171c_0%,#111217_44%,#220a0d_100%)] p-4 shadow-[0_40px_74px_-48px_rgba(122,14,14,0.95)] md:p-5">
          <div className="flex flex-col gap-3.5 md:gap-4">
            <div className="space-y-2.5">
              <h3 className="max-w-2xl text-[2rem] font-semibold leading-[0.95] tracking-[-0.02em] text-foreground md:text-[2.45rem]">
                Diagnostico inicial de transformacion
              </h3>
              <span className="block h-px w-20 rounded-full bg-[linear-gradient(90deg,rgba(212,20,20,0.9)_0%,rgba(212,20,20,0.08)_100%)]" />
              <p className="max-w-2xl text-sm text-white/78 md:text-base">
                Responde 7 preguntas estrategicas y obtene el programa exacto para tu etapa, disponibilidad y nivel de compromiso.
              </p>
              <p className="inline-flex w-fit rounded-[9px] border border-primary/38 bg-primary/12 px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-primary">
                Sin plantillas genericas. Recomendacion por perfil real.
              </p>
            </div>

            {!expanded ? (
              <div className="pt-1">
                <AnimatedButton
                  loadingOnClick
                  onClick={() => setExpanded(true)}
                  className="premium-cta w-full rounded-[12px] border border-primary/42 bg-[linear-gradient(120deg,#8b0000_0%,#d41414_72%,#ee2f2f_100%)] px-5 py-5 text-[0.8rem] font-bold tracking-[0.1em] shadow-[0_20px_38px_-22px_rgba(212,20,20,0.98)] hover:shadow-[0_24px_42px_-18px_rgba(212,20,20,0.98)] sm:w-auto sm:min-w-[340px]"
                >
                  INICIAR ENCUESTA ESTRATEGICA
                  <ArrowRight className="premium-arrow size-5" />
                </AnimatedButton>
              </div>
            ) : null}

            {expanded ? (
              <div className="rounded-[12px] border border-white/10 bg-background/38 p-2.5 md:p-3">
                <PlanFinderQuiz />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
