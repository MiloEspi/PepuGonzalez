"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { ArrowDownRight, ChevronDown } from "lucide-react";
import { animate, stagger } from "animejs";

import { AnimatedButton } from "@/components/AnimatedButton";
import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { getStickyWhatsAppHref } from "@/data/offers";
import { EASE_OUT_EXPO, PREMIUM_EASE, prefersReducedMotion } from "@/utils/animations";
import { cn } from "@/lib/utils";

const HERO_IMAGES = ["/pepu/hero.jpg", "/fitness-shirtless.jpg", "/images/hero-pepu.jpg"];

export function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [showGradientFallback, setShowGradientFallback] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const mediaMotionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollCue(window.scrollY < 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const heroRoot = heroRef.current;
    if (!heroRoot) return;

    const navbarShell = document.querySelector<HTMLElement>("[data-navbar-shell]");
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const ctaButtons = Array.from(heroRoot.querySelectorAll<HTMLElement>("[data-hero-cta]"));
    const scrollCue = heroRoot.querySelector<HTMLElement>("[data-hero-scroll-cue]");
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      if (title) {
        title.style.opacity = "1";
        title.style.transform = "translateY(0px)";
      }
      if (subtitle) {
        subtitle.style.opacity = "1";
        subtitle.style.transform = "translateY(0px)";
      }
      ctaButtons.forEach((button) => {
        button.style.opacity = "1";
        button.style.transform = "translateY(0px)";
      });
      if (scrollCue) {
        scrollCue.style.opacity = "1";
      }
      return;
    }

    if (navbarShell) {
      animate(navbarShell, {
        opacity: [0.7, 1],
        translateY: [-8, 0],
        duration: 190,
        ease: EASE_OUT_EXPO,
      });
    }

    if (title) {
      animate(title, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 290,
        delay: 110,
        ease: EASE_OUT_EXPO,
      });
    }

    if (subtitle) {
      animate(subtitle, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 280,
        delay: 180,
        ease: EASE_OUT_EXPO,
      });
    }

    if (ctaButtons.length) {
      animate(ctaButtons, {
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 250,
        delay: stagger(70, { start: 240 }),
        ease: EASE_OUT_EXPO,
      });
    }

    if (mediaMotionRef.current) {
      animate(mediaMotionRef.current, {
        scale: [1.02, 1],
        translateY: [8, 0],
        duration: 860,
        ease: PREMIUM_EASE,
      });
    }

    if (scrollCue) {
      animate(scrollCue, {
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 210,
        delay: 540,
        ease: EASE_OUT_EXPO,
      });
    }
  }, []);

  useEffect(() => {
    const mediaLayer = mediaMotionRef.current;
    if (!mediaLayer || prefersReducedMotion()) return;

    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const intensity = window.innerWidth < 480 ? 0.035 : 0.06;
        const offset = Math.min(window.scrollY * intensity, 12);
        mediaLayer.style.transform = `translateY(${offset}px) scale(1.01)`;
        frame = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScrollToQuiz(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const section = document.getElementById("cuestionario");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/#cuestionario");
  }

  function handleImageError() {
    if (imageIndex < HERO_IMAGES.length - 1) {
      setImageIndex((prev) => prev + 1);
      return;
    }

    setShowGradientFallback(true);
  }

  return (
    <section id="inicio" className="layout-shell scroll-mt-[calc(var(--navbar-height)+0.7rem)] pb-2 pt-2 md:pb-3 md:pt-3">
      <div ref={heroRef} className="relative isolate overflow-hidden rounded-[16px] border border-white/14 shadow-[0_34px_74px_-56px_rgba(0,0,0,0.95)]">
        <div className="relative h-[80svh] min-h-[500px] w-full max-h-[900px]">
          <div ref={mediaMotionRef} className="absolute inset-0 will-change-transform">
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
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[rgba(8,8,10,0.72)] via-[rgba(8,8,10,0.34)] to-transparent md:w-[68%]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/54 via-transparent to-black/20" />

        <div
          data-hero-reveal
          className="absolute inset-x-4 top-[48%] max-w-[42rem] -translate-y-1/2 sm:inset-x-5 md:left-10 md:inset-x-auto"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-white/72">COACHING DE RENDIMIENTO</p>
          <h1 ref={titleRef} data-hero-title className="mt-3 text-3xl font-extrabold leading-[0.92] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            Transforma tu fisico.
            <br />
            Construi tu mejor version.
          </h1>
          <p ref={subtitleRef} className="mt-4 max-w-xl text-sm text-white/84 sm:text-base md:text-lg">
            Sistema claro. Ejecucion consistente.
            Resultados medibles sin improvisar.
          </p>

          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row">
            <AnimatedButton
              href="#cuestionario"
              data-hero-primary
              data-hero-cta
              onClick={handleScrollToQuiz}
              className="premium-cta w-full rounded-[10px] bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] px-5 text-xs font-bold tracking-[0.05em] min-[420px]:w-auto md:text-sm"
            >
              INICIAR EVALUACION
              <ArrowDownRight className="premium-arrow size-4" />
            </AnimatedButton>

            <AnimatedButton
              href={getStickyWhatsAppHref()}
              target="_blank"
              rel="noreferrer"
              data-hero-cta
              className="premium-cta w-full rounded-[10px] border border-[#25D366] bg-[#25D366] px-5 text-xs font-semibold text-[#06361f] shadow-[0_12px_24px_-16px_rgba(37,211,102,0.82)] min-[420px]:w-auto hover:bg-[#1fbd5b] hover:text-[#052b17] md:text-sm"
            >
              APLICAR POR WHATSAPP
            </AnimatedButton>
          </div>
        </div>

        <div
          data-hero-scroll-cue
          data-hero-reveal
          className={cn(
            "scroll-cue-fade absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 md:bottom-6",
            showScrollCue ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          )}
        >
          <SmoothScrollLink
            href="#cuestionario"
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
