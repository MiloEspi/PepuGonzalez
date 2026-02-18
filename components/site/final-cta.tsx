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
    <SectionShell
      id="aplicar-ahora"
      className="pb-2 pt-1"
      cardClassName="border-primary/36 bg-[linear-gradient(145deg,#7a0e0e_0%,#3f0f14_44%,#101116_100%)] shadow-[0_40px_78px_-42px_rgba(122,14,14,0.94)]"
      contentClassName="pt-1.5"
    >
      <h2 className="text-[1.95rem] font-semibold leading-[0.95] text-white md:text-[2.5rem]">Tu transformacion arranca hoy.</h2>
      <p className="max-w-3xl text-sm text-white/86 md:text-base">Elegi tu plan y empeza con una estrategia real, clara y sostenible.</p>

      <div className="grid gap-2.5 sm:grid-cols-2">
        <Button
          asChild
          size="lg"
          className="premium-cta h-11 w-full rounded-[12px] border border-primary/45 bg-[linear-gradient(120deg,#8b0000_0%,#d41414_74%,#ef2d2d_100%)] px-5 text-[0.73rem] font-bold tracking-[0.1em] text-white shadow-[0_24px_36px_-20px_rgba(212,20,20,0.95)] hover:shadow-[0_30px_42px_-16px_rgba(212,20,20,0.98)]"
        >
          <SmoothScrollLink href="/#planes">
            Elegir mi programa
            <ArrowRight className="premium-arrow size-4" />
          </SmoothScrollLink>
        </Button>

        <WhatsAppButton href={APPLY_LINK} size="lg" className="premium-cta h-11 w-full rounded-[12px] px-5 text-[0.73rem] font-semibold tracking-[0.05em]">
          Aplicar por WhatsApp
        </WhatsAppButton>
      </div>

      <p className="text-xs text-white/72">Evaluacion rapida. Cupos limitados por programa.</p>
    </SectionShell>
  );
}
