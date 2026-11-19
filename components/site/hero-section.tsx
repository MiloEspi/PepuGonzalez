"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { animate, stagger } from "animejs";

import { AccentText } from "@/components/site/accent-text";
import { AmbientGlow } from "@/components/site/ambient-glow";
import { PageContainer } from "@/components/site/section-primitives";
import { PrimaryButton } from "@/components/site/primary-button";
import { StoryPhoto } from "@/components/site/story-photo";
import type { PublicAssetSlot } from "@/lib/public-asset";
import { EASE_OUT_EXPO, prefersReducedMotion } from "@/utils/animations";

const HERO_CHIPS = ["Video de ajustes cada semana", "Llamada cada 15 días", "Garantía de devolución", "5 cupos por mes"];

interface HeroSectionProps {
  antes: PublicAssetSlot;
  hoy: PublicAssetSlot;
}

export function HeroSection({ antes, hoy }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroRoot = heroRef.current;
    if (!heroRoot) return;

    const title = titleRef.current;
    const revealItems = Array.from(heroRoot.querySelectorAll<HTMLElement>("[data-hero-reveal-item]"));
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      if (title) {
        title.style.opacity = "1";
        title.style.transform = "translateY(0px)";
      }
      revealItems.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
      });
      return;
    }

    if (title) {
      animate(title, { opacity: [0, 1], translateY: [22, 0], duration: 460, ease: EASE_OUT_EXPO });
    }
    if (revealItems.length) {
      animate(revealItems, {
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 320,
        delay: stagger(80, { start: 180 }),
        ease: EASE_OUT_EXPO,
      });
    }
  }, []);

  // Parallax del resplandor: se desplaza hacia arriba a la mitad de la velocidad del scroll.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrapper = glowParallaxRef.current;
    if (!wrapper) return;

    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const offset = window.scrollY * -0.5;
        wrapper.style.transform = `translate3d(0, ${offset}px, 0)`;
        frame = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20">
      <div ref={glowParallaxRef} className="absolute inset-0">
        <AmbientGlow />
      </div>
      <PageContainer className="relative z-10">
        <div ref={heroRef} className="mx-auto flex max-w-[42rem] flex-col items-center gap-6 text-center">
          <div
            data-hero-reveal-item
            className="inline-flex items-center gap-2 rounded-full border border-[var(--dorado-suave)] bg-transparent px-3 py-1.5 text-xs font-semibold text-[var(--dorado)]"
          >
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-[var(--dorado)]" />
            Método El Último Lunes · 90 días
          </div>

          <h1
            ref={titleRef}
            className="font-heading text-[2.1rem] uppercase leading-[1.05] tracking-tight text-[var(--texto)] sm:text-[2.9rem] md:text-[3.4rem]"
          >
            Entrenás hace meses
            <br />
            <AccentText>y no se te nota</AccentText>
          </h1>

          <p
            data-hero-reveal-item
            className="max-w-[560px] text-[1.0625rem] leading-[1.65] text-[var(--texto-gris)]"
          >
            Bajás la grasa que te tapa el físico en 90 días, comiendo rico y con un check-in conmigo cada semana.
          </p>

          <div data-hero-reveal-item className="w-full">
            <div className="mx-auto grid max-w-[460px] grid-cols-2 gap-3 md:max-w-[520px] md:gap-4">
              <StoryPhoto slot={antes} label="Antes" priority />
              <StoryPhoto slot={hoy} label="Hoy" priority />
            </div>
            <p className="mt-3 text-xs text-[var(--texto-gris)]">Yo: de 85 kg a 78, con músculo</p>
          </div>

          <ul data-hero-reveal-item className="grid w-full max-w-[460px] grid-cols-2 gap-2 md:flex md:max-w-none md:flex-wrap md:justify-center">
            {HERO_CHIPS.map((chip) => (
              <li
                key={chip}
                className="flex items-center justify-center rounded-full border border-[var(--dorado-suave)]/60 px-3 py-1.5 text-center text-[11px] font-semibold leading-tight text-[var(--texto)] md:text-xs"
              >
                {chip}
              </li>
            ))}
          </ul>

          <div data-hero-reveal-item>
            <PrimaryButton href="#aplicar">Quiero aplicar</PrimaryButton>
          </div>

          <a
            href="#garantia"
            data-hero-reveal-item
            className="-mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--dorado-suave)]/50 bg-[var(--dorado)]/[0.06] px-3.5 py-1.5 text-xs font-semibold text-[var(--dorado)] transition-colors duration-200 hover:border-[var(--dorado)] hover:bg-[var(--dorado)]/[0.12]"
          >
            <ShieldCheck className="size-3.5 shrink-0" strokeWidth={2} />
            Garantía: si cumplís y no bajás, te devuelvo la plata.
          </a>

          <a
            href="#resultados"
            data-hero-reveal-item
            className="text-sm text-[var(--dorado-suave)] underline-offset-4 transition-colors duration-200 hover:text-[var(--dorado)] hover:underline"
          >
            Mirá los resultados reales ↓
          </a>

          <ChevronDown
            aria-hidden
            data-hero-reveal-item
            className="scroll-cue-chevron mt-1 size-6 text-[var(--dorado-suave)]"
          />
        </div>
      </PageContainer>
    </section>
  );
}
