"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { animateFadeSlideIn } from "@/lib/animations";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { SectionShell } from "@/components/site/section-shell";

const ABOUT_IMAGE = "/fitness-shirtless.jpg";

const aboutBullets = [
  {
    title: "Autoridad",
    text: "10+ anos entrenando personas reales con foco en resultados sostenibles y tecnica correcta.",
  },
  {
    title: "Metodo",
    text: "Planificacion por bloques, carga progresiva y ajustes semanales segun tu recuperacion.",
  },
  {
    title: "Lo que recibis",
    text: "Rutina personalizada, seguimiento por WhatsApp y feedback concreto para mejorar mas rapido.",
  },
];

export function AboutSection() {
  const [showFallback, setShowFallback] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { hasEnteredView } = useInViewAnimation(sectionRef, { threshold: 0.18, rootMargin: "0px 0px -14% 0px" });

  useEffect(() => {
    if (!hasEnteredView || !sectionRef.current) return;
    const targets = sectionRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
    animateFadeSlideIn(targets, { distance: 22, duration: 760, staggerStep: 120 });
  }, [hasEnteredView]);

  return (
    <SectionShell
      id="sobremi"
      eyebrow="SOBRE MI"
      title="Coaching con criterio, no con plantillas genéricas"
      description="Cada plan se construye con tus horarios, tu nivel y tu objetivo real para que puedas sostenerlo en el tiempo."
      className="pt-10"
    >
      <div ref={sectionRef} className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div
          data-reveal
          className="relative h-[420px] overflow-hidden rounded-2xl border border-border/80 opacity-0"
        >
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
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,hsl(213_30%_88%)_0%,hsl(213_42%_72%)_55%,hsl(213_45%_60%)_100%)]">
              <span className="rounded-full border border-white/50 bg-white/20 px-4 py-2 text-sm text-white">
                Foto de perfil en preparacion
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {aboutBullets.map((item) => (
            <article
              key={item.title}
              data-reveal
              className="rounded-xl border border-border/75 bg-card/90 p-5 opacity-0 shadow-[0_10px_24px_-22px_hsl(215_30%_24%)]"
            >
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
                <CheckCircle2 className="size-4 text-primary" />
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
