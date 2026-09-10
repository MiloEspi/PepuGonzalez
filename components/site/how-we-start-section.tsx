import { SectionShell } from "@/components/site/section-shell";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { getStickyWhatsAppHref } from "@/data/offers";

export function HowWeStartSection() {
  return (
    <SectionShell
      id="como-empezamos"
      eyebrow="CÓMO EMPEZAMOS"
      title="Cómo empezamos"
      contentClassName="gap-6"
    >
      <p className="max-w-2xl text-sm leading-relaxed text-white/84 sm:text-base">
        Tomo pocos alumnos por mes porque los sigo yo, uno por uno. Me escribís, te hago dos preguntas para ver si
        te puedo ayudar de verdad, y si encaja hablamos 15 minutos. Si no es para vos, te lo digo yo.
      </p>

      <WhatsAppButton
        href={getStickyWhatsAppHref()}
        size="lg"
        className="w-full justify-center sm:w-auto"
      >
        Escribime y vemos si es para vos
      </WhatsAppButton>
    </SectionShell>
  );
}
