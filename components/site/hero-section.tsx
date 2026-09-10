"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { animate, stagger } from "animejs";

import { AccentText } from "@/components/site/accent-text";
import { AmbientGlow } from "@/components/site/ambient-glow";
import { PageContainer } from "@/components/site/section-primitives";
import { PrimaryButton, WhatsAppGlyph } from "@/components/site/primary-button";
import { getStickyWhatsAppHref } from "@/data/offers";
import type { PublicAssetSlot } from "@/lib/public-asset";
import { EASE_OUT_EXPO, prefersReducedMotion } from "@/utils/animations";

interface HeroSectionProps {
  video: PublicAssetSlot;
  poster: PublicAssetSlot;
}

export function HeroSection({ video: VIDEO, poster: POSTER }: HeroSectionProps) {
  const [videoActive, setVideoActive] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  function handlePlayClick() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    void video.play();
    setVideoActive(true);
  }

  return (
    <section id="inicio" className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20">
      <div ref={glowParallaxRef} className="absolute inset-0">
        <AmbientGlow />
      </div>
      <PageContainer className="relative z-10">
        <div ref={heroRef} className="mx-auto flex max-w-[42rem] flex-col items-center gap-6 text-center">
          <h1
            ref={titleRef}
            className="font-heading text-[2.1rem] uppercase leading-[1.05] tracking-tight text-[var(--texto)] sm:text-[2.9rem] md:text-[3.4rem]"
          >
            Este es tu último lunes <AccentText>empezando de cero</AccentText>
          </h1>

          {/* Video — /public/hero.mp4 + /public/hero-poster.jpg, subidos directo por GitHub Desktop */}
          <div
            data-hero-reveal-item
            className="relative w-full overflow-hidden rounded-[16px] bg-[var(--negro-2)]"
            style={{ aspectRatio: "16 / 9" }}
          >
            {!VIDEO.exists ? (
              <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
                <span className="text-xs uppercase tracking-[0.14em] text-[var(--texto-gris)]">{VIDEO.filename}</span>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={VIDEO.src}
                  poster={POSTER.exists ? POSTER.src : undefined}
                  controls={videoActive}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                {!POSTER.exists && !videoActive ? (
                  <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
                    <span className="text-xs uppercase tracking-[0.14em] text-[var(--texto-gris)]">{POSTER.filename}</span>
                  </div>
                ) : null}
                {!videoActive ? (
                  <button
                    type="button"
                    onClick={handlePlayClick}
                    className="group absolute inset-0 flex items-center justify-center"
                    aria-label="Reproducir video"
                  >
                    <span className="grid size-14 place-items-center rounded-full bg-[var(--dorado)] shadow-[0_0_36px_-12px_rgba(227,179,65,0.55)] transition-transform duration-200 group-hover:scale-105 sm:size-20">
                      <Play className="size-5 translate-x-0.5 text-black sm:size-7" />
                    </span>
                  </button>
                ) : null}
              </>
            )}
          </div>

          <p
            data-hero-reveal-item
            className="max-w-[560px] text-[1.0625rem] leading-[1.65] text-[var(--texto-gris)]"
          >
            Bajás de peso comiendo lo que te gusta. 90 días. Yo también odiaba mi físico.
          </p>

          <div data-hero-reveal-item>
            <PrimaryButton
              href={getStickyWhatsAppHref()}
              icon={<WhatsAppGlyph />}
              caption="Contame en qué andás y te digo si te puedo ayudar."
            >
              Escribime por WhatsApp
            </PrimaryButton>
          </div>

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
