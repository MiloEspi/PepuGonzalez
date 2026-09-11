import { Section } from "@/components/site/section";
import { PrimaryButton, WhatsAppGlyph } from "@/components/site/primary-button";
import { getStickyWhatsAppHref } from "@/data/offers";

export function InlineCta() {
  return (
    <Section id="escribime" tone="b" glow="soft-left" containerClassName="flex justify-center">
      <PrimaryButton href={getStickyWhatsAppHref()} icon={<WhatsAppGlyph />} caption="Contame en qué andás y te digo si te puedo ayudar.">
        Escribime por WhatsApp
      </PrimaryButton>
    </Section>
  );
}
