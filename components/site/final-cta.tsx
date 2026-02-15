"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { SectionShell } from "@/components/site/section-shell";
import { Button } from "@/components/ui/button";
import { getStickyWhatsAppHref } from "@/data/offers";

const APPLY_LINK = getStickyWhatsAppHref("Programa Transformacion");

export function FinalCTA() {
  const applyButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = applyButtonRef.current;
    if (!button) return;

    const timer = window.setInterval(() => {
      animate(button, {
        scale: [1, 1.04, 1],
        duration: 520,
        ease: "out(4)",
      });
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <SectionShell id="aplicar-ahora" className="pb-20 pt-6 md:pt-10">
      <div className="rounded-[10px] border border-primary/35 bg-[linear-gradient(145deg,#7a0e0e_0%,#3c1013_48%,#101116_100%)] p-7 text-primary-foreground shadow-[0_34px_70px_-44px_rgba(122,14,14,0.9)] md:p-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-white/80">CTA FINAL</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          No necesitas mas motivacion.
          <br />
          Necesitas direccion.
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-white/85 md:text-base">
          El fisico que queres no se construye con ganas.
          <br />
          Se construye con sistema.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg" className="premium-cta rounded-[8px] px-7 font-bold tracking-[0.04em]">
            <a href={APPLY_LINK} target="_blank" rel="noreferrer" ref={applyButtonRef}>
              APLICAR AHORA
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="premium-cta rounded-[8px] border-white/35 bg-black/35 px-7 text-white hover:border-white hover:bg-white hover:text-black">
            <SmoothScrollLink href="/#encontra-tu-plan">Rehacer evaluacion</SmoothScrollLink>
          </Button>
        </div>
        <p className="mt-4 text-xs text-white/72">Evaluacion rapida. Cupos limitados segun programa.</p>
      </div>
    </SectionShell>
  );
}
