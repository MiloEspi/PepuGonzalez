"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Award, Dumbbell, ShieldCheck } from "lucide-react";

import { animateFadeSlideIn } from "@/lib/animations";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { SectionShell } from "@/components/site/section-shell";

const ABOUT_IMAGE = "/fitness-shirtless.jpg";

const credentials = [
  {
    title: "+5 ANOS",
    icon: Dumbbell,
    cardClass:
      "border-white/18 bg-[linear-gradient(138deg,#0f0f12_0%,#1b1014_45%,#7a0e0e_100%)] [background-image:linear-gradient(138deg,#0f0f12_0%,#1b1014_45%,#7a0e0e_100%),radial-gradient(circle_at_74%_18%,rgba(255,255,255,0.12),transparent_46%)]",
  },
  {
    title: "COMPETENCIAS",
    icon: Award,
    cardClass:
      "border-primary/22 bg-[linear-gradient(145deg,#0f0f12_0%,#1b1f27_58%,#232832_100%)] [background-image:linear-gradient(145deg,#0f0f12_0%,#1b1f27_58%,#232832_100%),radial-gradient(circle_at_80%_22%,rgba(255,255,255,0.18),transparent_42%)]",
  },
  {
    title: "MARCAS",
    icon: ShieldCheck,
    cardClass:
      "border-white/18 bg-[linear-gradient(150deg,#0f0f12_0%,#171b23_56%,#252b36_100%)] [background-image:linear-gradient(150deg,#0f0f12_0%,#171b23_56%,#252b36_100%),radial-gradient(circle_at_15%_88%,rgba(212,20,20,0.24),transparent_52%)]",
  },
];

export function AboutSection() {
  const [showFallback, setShowFallback] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { hasEnteredView } = useInViewAnimation(sectionRef, { threshold: 0.12, rootMargin: "0px 0px -16% 0px" });

  useEffect(() => {
    if (!hasEnteredView || !sectionRef.current) return;
    const targets = sectionRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
    animateFadeSlideIn(targets, { distance: 18, duration: 620, staggerStep: 90 });
  }, [hasEnteredView]);

  return (
    <SectionShell
      id="sobremi"
      eyebrow="SOBRE MI"
      title="Coaching con criterio, no con plantillas genericas"
      description="Direccion clara, decisiones medibles y ejecucion consistente para sostener progreso real."
      className="pt-6 md:pt-8"
    >
      <div ref={sectionRef} className="grid gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-start">
        <div className="space-y-4 md:pr-2">
          <article data-reveal className="textured-surface rounded-[14px] border border-border/80 bg-card/85 p-5 opacity-0">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Entrenar sin sistema desgasta.
              Entrenar con estructura acelera.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Trabajo con procesos medibles: seleccion de ejercicios, carga, adherencia y seguimiento.
            </p>
          </article>

          <article
            data-reveal
            className="rounded-[14px] border border-white/18 bg-[linear-gradient(120deg,rgba(122,14,14,0.35)_0%,rgba(122,14,14,0.16)_100%)] p-5 opacity-0"
          >
            <p className="text-3xl font-semibold leading-[1.06] text-foreground md:text-[2.35rem]">
              El resultado llega cuando la estrategia y la ejecucion se alinean.
            </p>
          </article>
        </div>

        <div data-reveal className="relative h-[320px] overflow-hidden rounded-[14px] border border-white/14 opacity-0 md:h-[500px]">
          {!showFallback ? (
            <Image
              src={ABOUT_IMAGE}
              alt="Pepu Gonzalez guiando una sesion de entrenamiento"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
              onError={() => setShowFallback(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#1a1b20_0%,#121318_55%,#0f0f12_100%)]">
              <span className="rounded-[8px] border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90">
                Foto de perfil en preparacion
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.42)_100%)]" />
        </div>

        <div className="grid grid-cols-3 gap-3 md:col-span-2">
          {credentials.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                data-reveal
                className={`group aspect-square rounded-[14px] border p-3 opacity-0 shadow-[0_18px_36px_-24px_rgba(0,0,0,0.88)] transition-[transform,box-shadow,filter] duration-[230ms] ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-20px_rgba(0,0,0,0.9)] ${item.cardClass}`}
              >
                <span className="inline-flex size-8 items-center justify-center rounded-[8px] border border-white/18 bg-black/24 text-white/90 transition-colors duration-[220ms] ease-[var(--ease-premium)] group-hover:border-primary/35 group-hover:text-primary">
                  <Icon className="size-3.5" />
                </span>
                <p className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-foreground">{item.title}</p>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
