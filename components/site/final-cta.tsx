import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { SectionShell } from "@/components/site/section-shell";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/data/plans";

const WHATSAPP_LINK = getWhatsAppUrl("Hola Pepu, quiero empezar hoy y necesito ayuda para elegir mi plan.");

export function FinalCTA() {
  return (
    <SectionShell className="pb-20 pt-6 md:pt-10">
      <div className="rounded-3xl border border-primary/25 bg-[linear-gradient(145deg,hsl(212_90%_46%)_0%,hsl(213_78%_42%)_100%)] p-7 text-primary-foreground md:p-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-white/80">LISTO PARA ARRANCAR?</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Inicia tu cambio hoy</h2>
        <p className="mt-3 max-w-2xl text-sm text-white/85 md:text-base">
          Elegi un plan, empeza con estructura y sostene el progreso semana a semana con acompanamiento real.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg" className="rounded-full bg-white text-slate-900 hover:bg-white/90">
            <SmoothScrollLink href="/#plan-finder">Encontra tu plan</SmoothScrollLink>
          </Button>
          <WhatsAppButton href={WHATSAPP_LINK} size="lg">
            Hablar por WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </SectionShell>
  );
}
