"use client";

import { SectionShell } from "@/components/site/section-shell";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { getStickyWhatsAppHref } from "@/data/offers";

const APPLY_LINK = getStickyWhatsAppHref("Sistema Pepu");

export function FinalCTA() {
  return (
    <SectionShell
      id="aplicar-ahora"
      className="pb-2 pt-1"
      cardClassName="border-primary/36 bg-[linear-gradient(145deg,#7a0e0e_0%,#3f0f14_44%,#101116_100%)] shadow-[0_40px_78px_-42px_rgba(122,14,14,0.94)]"
      contentClassName="pt-2.5"
    >
      <h2 className="text-[1.95rem] font-semibold leading-[0.95] text-white md:text-[2.5rem]">Tu transformación arranca hoy.</h2>
      <p className="max-w-3xl text-sm text-white/86 md:text-base">Si llegaste hasta acá, ya sabés que lo querés. El único paso que falta es escribirme.</p>

      <WhatsAppButton href={APPLY_LINK} size="lg" className="premium-cta h-11 w-full rounded-[12px] px-5 text-[0.73rem] font-semibold tracking-[0.05em]">
        Quiero mi lugar
      </WhatsAppButton>

      <p className="text-xs text-white/72">Cupos limitados por mes.</p>
    </SectionShell>
  );
}
