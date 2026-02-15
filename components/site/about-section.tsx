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
    title: "10+ anos de experiencia",
    icon: Dumbbell,
  },
  {
    title: "Competencias y preparaciones",
    icon: Award,
  },
  {
    title: "Marcas y sponsors",
    icon: ShieldCheck,
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
      description="Cada plan se construye con tu agenda, tu nivel y tu objetivo real para sostener progreso en el tiempo."
      className="pt-12"
    >
      <div ref={sectionRef} className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="space-y-4 md:pr-2">
          <article data-reveal className="textured-surface rounded-[10px] border border-border/80 bg-card/85 p-5 opacity-0">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              Entrenar sin estructura genera cansancio y frustracion.
              Entrenar con sistema genera progreso.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Trabajo con procesos medibles: seleccion de ejercicios, carga, adherencia y seguimiento real.
            </p>
          </article>

          <article
            data-reveal
            className="rounded-[10px] border border-primary/35 bg-[linear-gradient(120deg,rgba(122,14,14,0.35)_0%,rgba(122,14,14,0.16)_100%)] p-5 opacity-0"
          >
            <p className="text-3xl font-semibold leading-[1.06] text-foreground md:text-[2.35rem]">
              El resultado llega cuando la estrategia y la ejecucion se alinean.
            </p>
          </article>

          <div className="grid gap-3 md:grid-cols-3">
            {credentials.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  data-reveal
                  className="textured-surface rounded-[8px] border border-border/75 bg-[linear-gradient(145deg,#17181d_0%,#131419_100%)] p-4 opacity-0"
                >
                  <Icon className="size-4 text-primary" />
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-foreground">{item.title}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div data-reveal className="relative h-[440px] overflow-hidden rounded-[10px] border border-white/12 opacity-0 md:h-[500px]">
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
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90">
                Foto de perfil en preparacion
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.42)_100%)]" />
        </div>
      </div>
    </SectionShell>
  );
}
