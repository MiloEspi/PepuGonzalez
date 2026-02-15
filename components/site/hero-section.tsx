"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownRight } from "lucide-react";
import { animate } from "animejs";

import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { Button } from "@/components/ui/button";
import { getStickyWhatsAppHref } from "@/data/offers";
import { animateFadeSlideIn, shouldReduceMotion } from "@/lib/animations";

const HERO_IMAGES = ["/pepu/hero.jpg", "/fitness-shirtless.jpg", "/images/hero-pepu.jpg"];

export function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [showGradientFallback, setShowGradientFallback] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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
    <section id="inicio" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-2 pt-5 md:scroll-mt-28 md:pb-3 md:pt-7">
      <div ref={heroRef} className="relative isolate overflow-hidden rounded-3xl border border-white/12 shadow-[0_34px_74px_-56px_rgba(0,0,0,0.95)]">
        <div className="relative h-[82svh] min-h-[540px] w-full max-h-[920px]">
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

        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[rgba(8,8,10,0.84)] via-[rgba(8,8,10,0.4)] to-transparent md:w-[70%]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/62 via-transparent to-black/25" />

        <div
          data-hero-reveal
          className="absolute inset-x-5 top-1/2 max-w-[39rem] -translate-y-1/2 opacity-0 md:left-8 md:inset-x-auto"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-white/72">COACHING DE RENDIMIENTO</p>
          <h1 className="mt-3 text-[2.5rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-white md:text-[4rem]">
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
              className="rounded-full bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] px-6 text-xs font-bold tracking-[0.05em] md:text-sm"
            >
              <SmoothScrollLink href="#encontra-tu-plan" data-hero-primary>
                ENCONTRA TU PLAN
                <ArrowDownRight className="size-4" />
              </SmoothScrollLink>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/45 bg-transparent px-6 text-xs font-semibold text-white hover:border-white hover:bg-white hover:text-black md:text-sm"
            >
              <a href={getStickyWhatsAppHref()} target="_blank" rel="noreferrer">
                HABLAR POR WHATSAPP
              </a>
            </Button>
          </div>
        </div>

        <div data-hero-reveal className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0">
          <SmoothScrollLink
            href="#encontra-tu-plan"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-medium tracking-[0.05em] text-white/82 transition-colors hover:border-white/35 hover:text-white"
            aria-label="Desliza para descubrir la siguiente seccion"
          >
            Desliza para descubrir
            <ArrowDown className="size-3.5" />
          </SmoothScrollLink>
        </div>
      </div>
    </section>
  );
}
