import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";
import { PrimaryButton, WhatsAppGlyph } from "@/components/site/primary-button";
import { getStickyWhatsAppHref } from "@/data/offers";

export function FinalCTA() {
  return (
    <Section id="arrancamos" tone="a" glow containerClassName="flex flex-col items-center text-center">
      <SectionTitle>¿ARRANCAMOS?</SectionTitle>
      <div className="mt-8">
        <PrimaryButton href={getStickyWhatsAppHref()} icon={<WhatsAppGlyph />} caption="Contame en qué andás y te digo si te puedo ayudar.">
          Escribime por WhatsApp
        </PrimaryButton>
      </div>
    </Section>
  );
}
