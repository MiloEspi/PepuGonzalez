"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowDown } from "lucide-react";

import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/data/plans";

const HERO_CANDIDATE_IMAGES = ["/pepu/hero.jpg", "/fitness-shirtless.jpg", "/images/hero-pepu.jpg"];
const HERO_WHATSAPP_LINK = getWhatsAppUrl("Hola Pepu, quiero orientacion para elegir mi plan ideal.");

export function HeroSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFallback, setShowFallback] = useState(false);

  function handleImageError() {
    if (activeImageIndex < HERO_CANDIDATE_IMAGES.length - 1) {
      setActiveImageIndex((prev) => prev + 1);
      return;
    }

    setShowFallback(true);
  }

  return (
    <section id="inicio" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-0 pt-6 md:scroll-mt-28 md:pb-2 md:pt-8">
      <div className="relative isolate overflow-hidden rounded-3xl border border-border/80">
        <div className="relative h-[85svh] min-h-[540px] w-full max-h-[920px]">
          {!showFallback ? (
            <Image
              src={HERO_CANDIDATE_IMAGES[activeImageIndex]}
              alt="Pepu Gonzalez entrenando con atletas"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="h-full w-full bg-[linear-gradient(120deg,hsl(214_30%_92%)_0%,hsl(212_52%_78%)_45%,hsl(213_42%_58%)_100%)]" />
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-slate-950/28" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/48 via-slate-950/14 to-transparent" />

        <div className="absolute inset-x-5 bottom-5 max-w-lg rounded-2xl border border-white/48 bg-white/70 p-5 shadow-[0_24px_45px_-32px_rgba(12,24,36,0.7)] backdrop-blur-md md:inset-x-auto md:left-8 md:bottom-8 md:p-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-700/88">COACHING PERSONALIZADO</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">Pepu Gonzalez</h1>
          <p className="mt-1 text-xl font-medium text-primary">Inicia tu cambio</p>
          <p className="mt-3 text-sm text-slate-700/90 md:text-base">
            Estructura, seguimiento y planes disenados para que avances sin improvisar.
            Menos ruido, mas resultados reales.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button asChild className="rounded-full px-6">
              <SmoothScrollLink href="#plan-finder">Encontra tu plan</SmoothScrollLink>
            </Button>
            <WhatsAppButton href={HERO_WHATSAPP_LINK} className="px-5">
              Hablar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        <SmoothScrollLink
          href="#plan-finder"
          aria-label="Desliza para descubrir el Plan Finder"
          className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/28 bg-black/35 px-4 py-2 text-xs text-white backdrop-blur transition hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <ArrowDown className="size-3.5" />
          <span>Desliza para descubrir</span>
        </SmoothScrollLink>
      </div>
    </section>
  );
}
