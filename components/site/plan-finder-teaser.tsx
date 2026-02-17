"use client";

import { PlanFinderQuiz } from "@/components/site/plan-finder-quiz";
import { SectionShell } from "@/components/site/section-shell";

export function PlanFinderTeaser() {
  return (
    <SectionShell
      id="cuestionario"
      className="pt-1"
      cardClassName="bg-[linear-gradient(168deg,#181a1f_0%,#101217_44%,#18090b_100%)]"
      contentClassName="gap-5"
    >
      <span id="encontra-tu-plan" aria-hidden className="sr-only" />

      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-[18px] border border-primary/45 bg-[linear-gradient(122deg,rgba(132,8,8,0.94)_0%,rgba(212,20,20,0.96)_52%,rgba(116,11,11,0.94)_100%)] px-5 py-4 shadow-[0_24px_42px_-24px_rgba(212,20,20,0.92)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.2),transparent_48%),radial-gradient(circle_at_80%_120%,rgba(255,150,150,0.26),transparent_52%)]" />
          <p className="relative text-[0.92rem] font-extrabold uppercase tracking-[0.12em] text-white">ENCONTRA TU PLAN IDEAL</p>
        </div>

        <header className="space-y-2">
          <h2 data-section-title className="section-shell-title text-[1.85rem] font-semibold leading-[0.98] text-white sm:text-[2.2rem]">
            Descubri tu plan ideal
          </h2>
          <p className="text-sm text-white/76">Responde 7 preguntas y empeza con el programa correcto.</p>
          <span data-section-line aria-hidden className="section-shell-active-bar" />
        </header>
      </div>

      <PlanFinderQuiz />
    </SectionShell>
  );
}
