"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { animate, stagger } from "animejs";

import { AnimatedButton } from "@/components/AnimatedButton";
import { PageContainer } from "@/components/site/section-primitives";
import type { SiteSettingsDoc } from "@/lib/sanity";
import { EASE_OUT_EXPO, PREMIUM_EASE, prefersReducedMotion } from "@/utils/animations";

type HeroContent = Pick<SiteSettingsDoc, "heroImageUrl" | "whatsappCtaHref">;

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const heroImages = [content.heroImageUrl].filter((v): v is string => Boolean(v));
  const hasHeroImage = heroImages.length > 0;
  const [imageIndex, setImageIndex] = useState(0);
  const [showGradientFallback, setShowGradientFallback] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const mediaMotionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heroRoot = heroRef.current;
    if (!heroRoot) return;

    const navbarShell = document.querySelector<HTMLElement>("[data-navbar-shell]");
    const title = titleRef.current;
    const ctaButtons = Array.from(heroRoot.querySelectorAll<HTMLElement>("[data-hero-cta]"));
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
      if (title) {
        title.style.opacity = "1";
        title.style.transform = "translateY(0px)";
      }
      ctaButtons.forEach((btn) => {
        btn.style.opacity = "1";
        btn.style.transform = "translateY(0px)";
      });
      return;
    }

    if (navbarShell) {
      animate(navbarShell, { opacity: [0.7, 1], translateY: [-8, 0], duration: 190, ease: EASE_OUT_EXPO });
    }
    if (title) {
      animate(title, { opacity: [0, 1], translateY: [38, 0], duration: 520, delay: 80, ease: EASE_OUT_EXPO });
    }
    if (ctaButtons.length) {
      animate(ctaButtons, { opacity: [0, 1], translateY: [14, 0], duration: 250, delay: stagger(70, { start: 220 }), ease: EASE_OUT_EXPO });
    }
    if (mediaMotionRef.current) {
      animate(mediaMotionRef.current, { scale: [1.015, 1], translateY: [6, 0], duration: 720, ease: PREMIUM_EASE });
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

  function handleScrollToResults(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const section = document.getElementById("resultados");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/#resultados");
  }

  function handleImageError() {
    if (!hasHeroImage) return;
    if (imageIndex < heroImages.length - 1) {
      setImageIndex((prev) => prev + 1);
      return;
    }
    setShowGradientFallback(true);
  }

  return (
    <section id="inicio" className="scroll-mt-[calc(var(--navbar-height)+0.7rem)] py-2 md:py-3">
      <PageContainer>
        <div
          ref={heroRef}
          className="relative isolate overflow-hidden rounded-[18px] shadow-[0_36px_74px_-56px_rgba(0,0,0,0.96)]"
        >
          {/* Background image — sets card height */}
          <div className="relative min-h-[780px] w-full sm:min-h-[860px] md:min-h-[900px]">
            <div ref={mediaMotionRef} className="absolute inset-0 will-change-transform">
              {!showGradientFallback && hasHeroImage ? (
                <Image
                  key={heroImages[imageIndex]}
                  src={heroImages[imageIndex]}
                  alt="Pepu González en entrenamiento"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[center_32%] scale-[1.06] sm:scale-[1.04]"
                  onError={handleImageError}
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(120deg,#0f0f12_0%,#15161a_45%,#230b0b_100%)]" />
              )}
            </div>
          </div>

          {/* Gradient overlay — image visible at top, dark at bottom for readability */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.12)_16%,rgba(0,0,0,0.65)_38%,rgba(0,0,0,0.88)_56%,rgba(0,0,0,0.96)_74%,rgba(0,0,0,0.98)_100%)]" />

          {/* Content — anchored to bottom of card */}
          <div className="absolute inset-0 flex items-end justify-center p-4 pb-7 sm:p-6 sm:pb-9 md:p-8 md:pb-11">
            <div data-hero-reveal className="mx-auto flex w-full max-w-[34rem] flex-col items-center text-center gap-4">

              <h1
                ref={titleRef}
                className="text-[1.8rem] font-extrabold leading-[1.1] text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.88)] sm:text-[2.7rem] md:text-[3.1rem]"
              >
                Construí el físico de tus sueños y sacate tus inseguridades guardadas.
              </h1>

              <p className="max-w-[30rem] text-sm leading-relaxed text-white/82 [text-shadow:0_1px_10px_rgba(0,0,0,0.9)] sm:text-base">
                Fui el gordito que se odiaba y el flaco que no crecía. Diseñé el sistema exacto que me hubiera servido a mí — y hoy es para vos.
              </p>

              {/* Video placeholder — listo para reemplazar con un embed cuando el video esté editado */}
              <div
                data-hero-cta
                className="flex w-full aspect-video flex-col items-center justify-center gap-2.5 rounded-[12px] border border-white/18 bg-black/52 backdrop-blur-[6px]"
              >
                <div className="flex size-12 items-center justify-center rounded-full border border-white/28 bg-white/10">
                  <Play className="size-5 translate-x-0.5 text-white/76" />
                </div>
                <p className="text-xs font-medium tracking-wide text-white/46">Video próximamente</p>
              </div>

              <div className="w-full max-w-[20rem] space-y-2.5">
                <AnimatedButton
                  href={content.whatsappCtaHref}
                  target="_blank"
                  rel="noreferrer"
                  data-hero-cta
                  className="h-12 w-full justify-center rounded-[10px] border-transparent bg-[#1DAA61] px-4 text-[0.78rem] font-bold tracking-[0.05em] text-white shadow-[0_16px_30px_-18px_rgba(29,170,97,0.85)] hover:bg-[#17a05a]"
                >
                  Escribime y arrancamos
                </AnimatedButton>

                <AnimatedButton
                  href="#resultados"
                  data-hero-cta
                  onClick={handleScrollToResults}
                  className="h-10 w-full justify-center rounded-[10px] border-white/22 bg-black/30 px-4 text-[0.72rem] font-semibold tracking-[0.05em] text-white/80 hover:bg-black/48 hover:text-white"
                >
                  Mirá las transformaciones reales
                </AnimatedButton>
              </div>

              <div data-hero-cta className="flex items-center gap-3 text-[0.72rem] text-white/52">
                <span className="h-px w-8 rounded bg-white/24" />
                <span>+15 alumnos transformados</span>
                <span className="h-px w-8 rounded bg-white/24" />
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
