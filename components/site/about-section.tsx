"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

import { SectionShell } from "@/components/site/section-shell";
import { cn } from "@/lib/utils";

const ABOUT_IMAGE = "/fitness-shirtless.jpg";

export function AboutSection() {
  const [showFallback, setShowFallback] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <SectionShell id="sobre-mi" eyebrow="SOBRE MI" className="pt-6 md:pt-8">
      <span id="sobremi" aria-hidden className="sr-only" />
      <div className="space-y-4 md:space-y-5">
        <article data-reveal className="relative h-[420px] overflow-hidden rounded-[14px] border border-white/14 opacity-0 md:h-[560px]">
          {!showFallback ? (
            <Image
              src={ABOUT_IMAGE}
              alt="Pepu Gonzalez en sesion de entrenamiento"
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover object-[center_28%]"
              onError={() => setShowFallback(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#1a1b20_0%,#121318_55%,#0f0f12_100%)]">
              <span className="rounded-[8px] border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90">
                Placeholder foto principal
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.58)_72%,rgba(0,0,0,0.72)_100%)]" />

          <div className="absolute inset-x-4 bottom-4 z-10 space-y-2 md:inset-x-6 md:bottom-6">
            <p className="text-[1.55rem] font-semibold leading-none tracking-[-0.02em] text-white md:text-[2.1rem]">
              Pepu Gonzalez
            </p>
            <p className="max-w-2xl text-sm font-medium leading-relaxed text-white/92 md:text-base">
              El fisico no cambia por motivacion. Cambia por sistema.
            </p>
          </div>
        </article>

        <article data-reveal className="textured-surface rounded-[14px] border border-border/80 bg-card/85 p-5 opacity-0 md:p-6">
          <h3 className="text-[1.72rem] font-semibold leading-[1.02] text-foreground md:text-[2.2rem]">
            No siempre entrene con claridad.
          </h3>
          <div className="mt-3.5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>Durante mucho tiempo no me senti comodo con mi fisico.</p>
            <p>Entrenaba sin estructura. Sin estrategia. Sin resultados reales.</p>
            <p>Hoy ayudo a otros a transformar su fisico sin perder anos probando cosas que no funcionan.</p>
          </div>
        </article>

        <article
          data-reveal
          className="rounded-[14px] border border-white/18 bg-[linear-gradient(120deg,rgba(122,14,14,0.35)_0%,rgba(122,14,14,0.12)_100%)] p-5 opacity-0 md:p-6"
        >
          <div className="space-y-3 text-sm leading-relaxed text-white/88 md:text-base">
            <p>No vendo rutinas genericas. Construyo procesos.</p>
            <p>Cada plan se disena para tu contexto, tu nivel y tu objetivo real.</p>
          </div>

          <div
            className={cn(
              "grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-[320ms] ease-[var(--ease-premium)]",
              expanded ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="space-y-3 text-sm leading-relaxed text-white/84 md:text-base">
                <p>Trabajo con datos concretos: carga, volumen, tecnica, adherencia y recuperacion.</p>
                <p>El objetivo es simple: que avances con claridad y sostengas resultados en el tiempo.</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-[9px] border border-white/22 bg-black/18 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/38 hover:bg-black/30"
            aria-expanded={expanded}
          >
            {expanded ? "Ver menos" : "Ver mas"}
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </article>
      </div>
    </SectionShell>
  );
}
