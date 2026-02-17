"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { animate, stagger } from "animejs";

import { AnimatedButton } from "@/components/AnimatedButton";
import { PageContainer } from "@/components/site/section-primitives";
import { EASE_OUT_EXPO, PREMIUM_EASE, prefersReducedMotion } from "@/utils/animations";

const HERO_IMAGES = ["/Hero.jpg", "/DSC02545.jpg", "/fitness-shirtless.jpg"];

export function HeroSection() {
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
      ctaButtons.forEach((button) => {
        button.style.opacity = "1";
        button.style.transform = "translateY(0px)";
      });
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

    if (ctaButtons.length) {
      animate(ctaButtons, {
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 250,
        delay: stagger(70, { start: 220 }),
        ease: EASE_OUT_EXPO,
      });
    }

    if (mediaMotionRef.current) {
      animate(mediaMotionRef.current, {
        scale: [1.015, 1],
        translateY: [6, 0],
        duration: 720,
        ease: PREMIUM_EASE,
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
    <section id="inicio" className="scroll-mt-[calc(var(--navbar-height)+0.7rem)] py-2 md:py-3">
      <PageContainer>
        <div ref={heroRef} className="relative isolate overflow-hidden rounded-[18px] shadow-[0_36px_74px_-56px_rgba(0,0,0,0.96)]">
          <div className="relative h-[74svh] min-h-[500px] w-full max-h-[860px]">
            <div ref={mediaMotionRef} className="absolute inset-0 will-change-transform">
              {!showGradientFallback ? (
                <Image
                  key={HERO_IMAGES[imageIndex]}
                  src={HERO_IMAGES[imageIndex]}
                  alt="Pepu Gonzalez en entrenamiento"
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

          <div className="pointer-events-none absolute inset-x-0 inset-y-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.28)_44%,rgba(0,0,0,0.66)_100%)]" />

          <div className="absolute inset-0 flex items-end justify-center p-4 pb-6 sm:p-6 md:p-8">
            <div data-hero-reveal className="mx-auto flex max-w-[34rem] flex-col items-center text-center">
              <h1 ref={titleRef} data-hero-title className="text-[2.05rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-white sm:text-[2.8rem] md:text-[3.2rem]">
                Transforma tu fisico.
                <br />
                Construi tu mejor version.
              </h1>

              <div className="mt-6 w-full max-w-[19rem]">
                <AnimatedButton
                  href="#cuestionario"
                  data-hero-primary
                  data-hero-cta
                  onClick={handleScrollToQuiz}
                  className="premium-cta h-12 w-full justify-center rounded-[10px] bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] px-4 text-[0.72rem] font-bold tracking-[0.08em] text-white shadow-[0_20px_34px_-20px_rgba(212,20,20,0.92)]"
                >
                  Iniciar evaluacion
                  <ArrowDownRight className="premium-arrow size-4" />
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
