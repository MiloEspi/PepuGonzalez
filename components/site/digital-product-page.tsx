import Link from "next/link";
import { Check, X } from "lucide-react";

import { AccentText } from "@/components/site/accent-text";
import { PreviewGallery } from "@/components/site/preview-gallery";
import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";
import { PrimaryButton, WhatsAppGlyph } from "@/components/site/primary-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type DigitalProduct } from "@/data/digital-products";
import { getWhatsAppUrl } from "@/data/offers";
import { formatPrecio, PRECIOS } from "@/data/precios";
import type { PublicAssetSlot } from "@/lib/public-asset";

interface DigitalProductPageProps {
  product: DigitalProduct;
  previewSlots: PublicAssetSlot[];
  showPackLine?: boolean;
}

function BuyButton({ product, showPackLine }: { product: DigitalProduct; showPackLine: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <PrimaryButton
        href={getWhatsAppUrl(product.whatsappMessage)}
        icon={<WhatsAppGlyph />}
        caption="Te paso el link de pago y te lo mando al mail el mismo día."
      >
        Lo quiero, escribime
      </PrimaryButton>
      {showPackLine ? (
        <p className="text-xs text-[var(--texto-gris)]">
          Llevando el recetario y una rutina juntos: {formatPrecio(PRECIOS.pack)}
        </p>
      ) : null}
    </div>
  );
}

export function DigitalProductPage({ product, previewSlots, showPackLine = true }: DigitalProductPageProps) {
  return (
    <main>
      <Section id="hero" tone="a" glow containerClassName="flex flex-col items-center text-center">
        <SectionTitle>
          <AccentText>{product.title.toLowerCase()}</AccentText>
        </SectionTitle>
        <p className="copy mt-5 text-[var(--texto)]">{product.tagline}</p>
        <p className="mt-3 text-sm text-[var(--texto-gris)]">{product.audience}</p>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--dorado)]">
          Precio: {formatPrecio(PRECIOS[product.priceKey])}
        </p>
        <div className="mt-6">
          <BuyButton product={product} showPackLine={showPackLine} />
        </div>
      </Section>

      <Section id="que-hay-adentro" tone="b">
        <SectionTitle>
          QUÉ HAY <AccentText>adentro</AccentText>
        </SectionTitle>

        <PreviewGallery slots={previewSlots} productTitle={product.title} />

        <div className="mt-10 flex flex-col gap-4 md:mt-12">
          {product.whatsInside.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Check className="mt-1 size-4 shrink-0 text-[var(--dorado)]" strokeWidth={2.5} />
              <p className="copy max-w-none text-[var(--texto)]">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="para-quien" tone="a">
        <SectionTitle>
          PARA QUIÉN <AccentText>es</AccentText>
        </SectionTitle>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-0">
          <div className="flex flex-col md:pr-12">
            <div className="flex flex-col gap-4">
              {product.audienceYes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-[var(--dorado)]" strokeWidth={2.5} />
                  <p className="copy max-w-none text-[var(--texto)]">{item}</p>
                </div>
              ))}
            </div>
            {product.audienceYesNote ? (
              <p className="copy mt-6 max-w-none text-[var(--texto-gris)]">{product.audienceYesNote}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-4 border-t border-[var(--dorado-suave)]/40 pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            {product.audienceNo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <X className="mt-1 size-4 shrink-0 text-[var(--dorado-suave)]" strokeWidth={2.5} />
                <p className="copy max-w-none text-[var(--texto-gris)]">
                  {typeof item === "string" ? (
                    item
                  ) : (
                    <>
                      {item.before}
                      <Link href={item.linkHref} className="text-[var(--dorado)] underline underline-offset-4">
                        {item.linkText}
                      </Link>
                      {item.after}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="preguntas" tone="b">
        <SectionTitle>
          <AccentText>Preguntas</AccentText>
        </SectionTitle>
        <div className="mt-10 max-w-[620px]">
          <Accordion type="single" collapsible className="w-full">
            {product.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-[var(--dorado-suave)]/30">
                <AccordionTrigger className="text-left text-[var(--texto)]">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[var(--texto-gris)]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section id="cierre" tone="a" containerClassName="flex flex-col items-center text-center">
        <BuyButton product={product} showPackLine={showPackLine} />
        <p className="mt-10 text-sm text-[var(--texto-gris)]">
          ¿Querés que te lo arme a medida?{" "}
          <Link href="/#metodo" className="text-[var(--dorado)] underline underline-offset-4">
            Mirá cómo trabajo 1 a 1
          </Link>
        </p>
      </Section>
    </main>
  );
}
