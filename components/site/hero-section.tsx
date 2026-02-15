"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ChevronDown } from "lucide-react";
import { animate } from "animejs";

import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { Button } from "@/components/ui/button";
import { getStickyWhatsAppHref } from "@/data/offers";
import { animateFadeSlideIn, shouldReduceMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

const HERO_IMAGES = ["/pepu/hero.jpg", "/fitness-shirtless.jpg", "/images/hero-pepu.jpg"];

export function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [showGradientFallback, setShowGradientFallback] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollCue(window.scrollY < 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const targets = heroRef.current.querySelectorAll<HTMLElement>("[data-hero-reveal]");
    animateFadeSlideIn(targets, { distance: 26, duration: 760, delay: 60, staggerStep: 120 });

    const primaryButton = heroRef.current.querySelector<HTMLElement>("[data-hero-primary]");
    if (!primaryButton) return;

    const reducedMotion = shouldReduceMotion();
    const restingShadow = "0 16px 34px -20px rgba(212,20,20,0.88)";
    primaryButton.style.boxShadow = restingShadow;

    const handleEnter = () => {
      if (reducedMotion) return;
      animate(primaryButton, {
        scale: [1, 1.03],
        boxShadow: [restingShadow, "0 24px 48px -18px rgba(212,20,20,0.95)"],
        duration: 240,
        ease: "out(6)",
      });
    };

    const handleLeave = () => {
      if (reducedMotion) return;
      animate(primaryButton, {
        scale: [1.03, 1],
        boxShadow: ["0 24px 48px -18px rgba(212,20,20,0.95)", restingShadow],
        duration: 220,
        ease: "out(4)",
      });
    };

    primaryButton.addEventListener("mouseenter", handleEnter);
    primaryButton.addEventListener("mouseleave", handleLeave);

    return () => {
      primaryButton.removeEventListener("mouseenter", handleEnter);
      primaryButton.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  function handleImageError() {
    if (imageIndex < HERO_IMAGES.length - 1) {
      setImageIndex((prev) => prev + 1);
      return;
    }

    setShowGradientFallback(true);
  }

  return (
    <section id="inicio" className="layout-shell scroll-mt-24 pb-2 pt-5 md:scroll-mt-28 md:pb-3 md:pt-7">
      <div ref={heroRef} className="relative isolate overflow-hidden rounded-[16px] border border-white/14 shadow-[0_34px_74px_-56px_rgba(0,0,0,0.95)]">
        <div className="relative h-[80svh] min-h-[500px] w-full max-h-[900px]">
          {!showGradientFallback ? (
            <Image
              key={HERO_IMAGES[imageIndex]}
              src={HERO_IMAGES[imageIndex]}
              alt="Pepu Gonzalez en entrenamiento"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_22%]"
              onError={handleImageError}
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(120deg,#0f0f12_0%,#15161a_45%,#230b0b_100%)]" />
          )}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[rgba(8,8,10,0.72)] via-[rgba(8,8,10,0.34)] to-transparent md:w-[68%]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/54 via-transparent to-black/20" />

        <div
          data-hero-reveal
          className="absolute inset-x-5 top-[48%] max-w-[42rem] -translate-y-1/2 opacity-0 md:left-10 md:inset-x-auto"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-white/72">COACHING DE RENDIMIENTO</p>
          <h1 className="mt-3 text-[2.2rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-white md:text-[4rem]">
            Potencia tu fisico con
            <br />
            un sistema real.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/84 md:text-lg">
            Entrenamiento estructurado para resultados medibles.
            Menos ruido, mas avance.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button
              asChild
              size="lg"
              className="premium-cta rounded-[10px] bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] px-6 text-xs font-bold tracking-[0.05em] md:text-sm"
            >
              <SmoothScrollLink href="#encontra-tu-plan" data-hero-primary>
                ENCONTRA TU PLAN
                <ArrowDownRight className="premium-arrow size-4" />
              </SmoothScrollLink>
            </Button>

            <Button
              asChild
              size="lg"
              className="premium-cta rounded-[10px] border border-[#25D366] bg-[#25D366] px-6 text-xs font-semibold text-[#06361f] shadow-[0_12px_24px_-16px_rgba(37,211,102,0.82)] hover:bg-[#1fbd5b] hover:text-[#052b17] md:text-sm"
            >
              <a href={getStickyWhatsAppHref()} target="_blank" rel="noreferrer">
                HABLAR POR WHATSAPP
              </a>
            </Button>
          </div>
        </div>

        <div
          data-hero-reveal
          className={cn(
            "scroll-cue-fade absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 md:bottom-6",
            showScrollCue ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          )}
        >
          <SmoothScrollLink
            href="#encontra-tu-plan"
            className="inline-flex items-center gap-2 rounded-[10px] border border-white/22 bg-black/42 px-4 py-2 text-xs font-medium tracking-[0.05em] text-white/86 transition-colors duration-[220ms] ease-[var(--ease-premium)] hover:border-white/35 hover:text-white"
            aria-label="Desliza para descubrir la siguiente seccion"
          >
            Desliza para descubrir
            <ChevronDown className="scroll-cue-chevron size-3.5" />
          </SmoothScrollLink>
        </div>
      </div>
    </section>
  );
}
