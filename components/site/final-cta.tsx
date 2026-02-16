"use client";

import { ArrowRight } from "lucide-react";

import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { SectionShell } from "@/components/site/section-shell";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Button } from "@/components/ui/button";
import { getStickyWhatsAppHref } from "@/data/offers";

const APPLY_LINK = getStickyWhatsAppHref("Programa Transformacion");

export function FinalCTA() {
  return (
    <SectionShell id="aplicar-ahora" className="pb-20 pt-6 md:pt-10">
      <div className="rounded-[15px] border border-primary/36 bg-[linear-gradient(145deg,#7a0e0e_0%,#3f0f14_44%,#101116_100%)] p-7 text-primary-foreground shadow-[0_40px_78px_-42px_rgba(122,14,14,0.94)] md:p-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-white/80">CTA FINAL</p>
        <h2 className="mt-3 text-3xl font-semibold leading-[0.95] md:text-[2.7rem]">
          Elegi tu nivel y empeza hoy.
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-white/85 md:text-base">
          Inicio, Base, Transformacion o Mentoria 1 a 1.
          <br />
          Sistema claro, ejecucion disciplinada y seguimiento segun tu objetivo.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            size="lg"
            className="premium-cta h-12 w-full rounded-[12px] border border-primary/45 bg-[linear-gradient(120deg,#8b0000_0%,#d41414_74%,#ef2d2d_100%)] px-8 text-[0.79rem] font-bold tracking-[0.1em] text-white shadow-[0_24px_36px_-20px_rgba(212,20,20,0.95)] hover:shadow-[0_30px_42px_-16px_rgba(212,20,20,0.98)] sm:w-auto"
          >
            <SmoothScrollLink href="/#planes">
              ELEGIR MI PROGRAMA
              <ArrowRight className="premium-arrow size-4" />
            </SmoothScrollLink>
          </Button>

          <WhatsAppButton href={APPLY_LINK} size="lg" className="premium-cta h-12 w-full rounded-[12px] px-7 text-[0.78rem] font-semibold tracking-[0.06em] sm:w-auto">
            CONSULTAR POR WHATSAPP
          </WhatsAppButton>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="premium-cta h-12 w-full rounded-[12px] border-white/35 bg-black/35 px-7 text-[0.76rem] font-semibold tracking-[0.08em] text-white hover:border-white hover:bg-white hover:text-black sm:w-auto"
          >
            <SmoothScrollLink href="/#cuestionario">REPETIR ENCUESTA</SmoothScrollLink>
          </Button>
        </div>
        <p className="mt-4 text-xs text-white/72">Evaluacion rapida. Cupos limitados por programa y disponibilidad.</p>
      </div>
    </SectionShell>
  );
}
