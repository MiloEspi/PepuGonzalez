import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { getOfferPrimaryHref, getStickyWhatsAppHref, type Offer } from "@/data/offers";
import { cn } from "@/lib/utils";

const detailThemeByOffer: Record<Offer["theme"], { title: string; shell: string; chip: string; button: string }> = {
  inicio: {
    title: "text-white",
    shell:
      "border-white/12 bg-[linear-gradient(140deg,rgba(21,23,30,0.94)_0%,rgba(12,13,18,0.98)_100%)]",
    chip: "border-white/18 bg-black/42 text-white/88",
    button: "bg-[linear-gradient(120deg,#222832_0%,#3a414f_100%)] text-white hover:brightness-110",
  },
  base: {
    title: "text-white",
    shell:
      "border-white/14 bg-[linear-gradient(138deg,rgba(23,24,32,0.95)_0%,rgba(12,13,18,0.98)_100%)]",
    chip: "border-primary/30 bg-primary/14 text-white/88",
    button: "bg-[linear-gradient(120deg,#700708_0%,#bf1a1a_100%)] text-white hover:brightness-110",
  },
  transformacion: {
    title: "text-[#ff4a4a]",
    shell:
      "border-primary/34 bg-[linear-gradient(138deg,rgba(52,8,11,0.94)_0%,rgba(13,12,16,0.98)_62%)]",
    chip: "border-primary/40 bg-primary/16 text-white/94",
    button: "bg-[linear-gradient(120deg,#9E0808_0%,#D41414_64%,#EF2D2D_100%)] text-white hover:brightness-110",
  },
  mentoria: {
    title: "text-[#f4dba4]",
    shell:
      "border-[#c8a34f]/34 bg-[linear-gradient(138deg,rgba(40,31,17,0.94)_0%,rgba(12,12,14,0.98)_62%)]",
    chip: "border-[#c8a34f]/42 bg-[#c8a34f]/14 text-[#f7e1ab]",
    button: "border border-[#c8a34f]/64 bg-black text-[#e3c57d] hover:border-[#d6b86d] hover:bg-[#c8a34f] hover:text-black",
  },
};

interface OfferDetailPageProps {
  offer: Offer;
}

export function OfferDetailPage({ offer }: OfferDetailPageProps) {
  const theme = detailThemeByOffer[offer.theme];
  const primaryHref = getOfferPrimaryHref(offer);
  const whatsappHref = getStickyWhatsAppHref(offer.title);
  const isCheckoutPlan = offer.ctaType === "checkout";

  return (
    <main className="pb-16 pt-4 md:pt-6">
      <section className="layout-shell">
        <Link
          href="/#planes"
          className="group inline-flex items-center gap-2 rounded-[9px] border border-white/12 bg-black/24 px-3 py-2 text-sm text-white/78 transition-[border-color,color,transform] duration-200 hover:-translate-x-0.5 hover:border-white/28 hover:text-white"
        >
          <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Volver
        </Link>

        <article className={cn("mt-4 overflow-hidden rounded-[18px] border shadow-[0_34px_62px_-44px_rgba(0,0,0,0.95)]", theme.shell)}>
          <div className="grid gap-5 p-4 sm:p-5 md:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="relative overflow-hidden rounded-[14px] border border-white/14 bg-black/26">
              <div className="relative aspect-[5/6] w-full sm:aspect-[16/11] lg:aspect-[5/6]">
                <Image
                  src={offer.coverImage ?? "/programa-base.jpg"}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-[center_20%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.48)_100%)]" />
                <Badge className={cn("absolute left-3 top-3 rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", theme.chip)}>
                  {offer.shortLabel}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">Detalle completo</p>
              <h1 className={cn("text-[1.9rem] font-black leading-[0.95] tracking-[0.03em] sm:text-[2.2rem]", theme.title)}>{offer.title}</h1>
              {offer.strapline ? <p className="text-sm leading-relaxed text-white/84 sm:text-[0.95rem]">{offer.strapline}</p> : null}
              {offer.badgeLabel ? (
                <p className="inline-flex w-fit rounded-[8px] border border-primary/40 bg-primary/16 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                  {offer.badgeLabel}
                </p>
              ) : null}
              {offer.limits ? <p className="text-xs uppercase tracking-[0.08em] text-white/74">{offer.limits}</p> : null}

              <div className="rounded-[12px] border border-white/14 bg-black/28 px-4 py-3.5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/62">Precio</p>
                <p className="mt-1.5 text-2xl font-bold leading-none text-white sm:text-[2rem]">
                  {offer.priceArs}
                  <span className="px-2 text-white/36">|</span>
                  <span className="text-lg font-semibold text-white/84 sm:text-xl">{offer.priceUsd}</span>
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-white/74">Duración: {offer.durationLabel}</p>
                {offer.pricingNote ? <p className="mt-1 text-xs text-white/70">{offer.pricingNote}</p> : null}
              </div>

              <div className="space-y-2.5">
                <AnimatedButton
                  href={primaryHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("h-12 w-full justify-between rounded-[11px] px-4 text-[0.74rem] font-bold tracking-[0.1em]", theme.button)}
                >
                  <span>{offer.ctaLabel}</span>
                  <ArrowUpRight className="size-4 shrink-0" />
                </AnimatedButton>
                <WhatsAppButton href={whatsappHref} className="h-12 w-full justify-center rounded-[11px] text-[0.74rem] font-semibold tracking-[0.08em]">
                  Hablar por WhatsApp
                </WhatsAppButton>
                <p className="text-[11px] text-white/58">
                  {isCheckoutPlan
                    ? "Pago directo disponible para este plan. Si tenés dudas, escribí por WhatsApp."
                    : "Este plan se activa por WhatsApp con mensaje predefinido para iniciar tu evaluación."}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-5 md:px-6 md:pb-6">
            <h2 className="text-lg font-semibold text-white">Incluye este plan</h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {offer.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 rounded-[10px] border border-white/12 bg-[linear-gradient(140deg,rgba(18,19,24,0.86)_0%,rgba(12,13,17,0.96)_100%)] px-3 py-2.5 text-sm text-white/86"
                >
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[7px] border border-primary/42 bg-primary/14 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-5 md:px-6 md:pb-6">
            <h2 className="text-lg font-semibold text-white">Descripción</h2>
            <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-white/84">
              {offer.descriptionLong.split("\n").map((line, index) => (
                <p key={`${offer.slug}-description-${index}`}>{line}</p>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-5 md:px-6 md:pb-6">
            <h2 className="text-lg font-semibold text-white">Ideal para</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/84">{offer.idealFor}</p>
          </div>

          {offer.resultExpected ? (
            <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-5 md:px-6 md:pb-6">
              <h2 className="text-lg font-semibold text-white">Resultado esperado</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/84">{offer.resultExpected}</p>
            </div>
          ) : null}

          {offer.conversionFlow ? (
            <div className="border-t border-white/10 px-4 pb-5 pt-4 sm:px-5 md:px-6 md:pb-6">
              <h2 className="text-lg font-semibold text-white">Flujo de conversión</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/84">{offer.conversionFlow}</p>
            </div>
          ) : null}

        </article>
      </section>
    </main>
  );
}
