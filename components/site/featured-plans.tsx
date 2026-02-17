"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, Crown, Flame, Rocket, ShieldCheck, type LucideIcon } from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import { PlanCard } from "@/components/PlanCard";
import { SectionShell } from "@/components/site/section-shell";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { getOfferPrimaryHref, getStickyWhatsAppHref, offers } from "@/data/offers";
import { rememberSelectedPlan } from "@/lib/plan-interest";
import { cn } from "@/lib/utils";

const PLAN_FALLBACK_IMAGE = "/fitness-shirtless.jpg";

type OfferTheme = (typeof offers)[number]["theme"];

interface ThemeConfig {
  icon: LucideIcon;
  shell: string;
  surface: string;
  media: string;
  overlay: string;
  title: string;
  text: string;
  badge: string;
  accentBadge: string;
  benefitIcon: string;
  iconWrap: string;
  iconColor: string;
  cta: string;
  price: string;
  tableHead: string;
  tableCell: string;
}

const themeClasses: Record<OfferTheme, ThemeConfig> = {
  inicio: {
    icon: Rocket,
    shell:
      "border-[rgba(255,255,255,0.06)] bg-[linear-gradient(135deg,rgba(28,30,36,0.9)_0%,rgba(12,13,16,0.96)_100%)] shadow-[0_24px_46px_-36px_rgba(0,0,0,0.94)]",
    surface: "bg-[linear-gradient(146deg,#15171d_0%,#0f1013_100%)]",
    media: "border-[rgba(255,255,255,0.08)] bg-[linear-gradient(160deg,#282c34_0%,#181b22_100%)]",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.54)_100%)]",
    title: "text-white",
    text: "text-white/78",
    badge: "border-[rgba(255,255,255,0.18)] bg-black/48 text-white/84",
    accentBadge: "border-[rgba(255,255,255,0.12)] bg-black/36 text-white/74",
    benefitIcon: "border-white/25 bg-white/8 text-white/90",
    iconWrap: "border-[rgba(255,255,255,0.15)] bg-black/40",
    iconColor: "text-white/84",
    cta: "bg-[linear-gradient(120deg,#222832_0%,#3a414f_100%)] text-white hover:brightness-110",
    price: "border-white/14 bg-black/28 text-white",
    tableHead: "bg-[linear-gradient(160deg,#242933_0%,#181b23_100%)] text-white",
    tableCell: "bg-[linear-gradient(160deg,rgba(27,30,38,0.84)_0%,rgba(17,19,25,0.92)_100%)] text-white/84",
  },
  base: {
    icon: ShieldCheck,
    shell:
      "border-[rgba(255,255,255,0.09)] bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.9)_100%)] shadow-[0_24px_46px_-36px_rgba(0,0,0,0.94)] before:pointer-events-none before:absolute before:left-7 before:right-7 before:top-0 before:h-px before:content-[''] before:bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.42),transparent)]",
    surface: "bg-[linear-gradient(145deg,#17181f_0%,#101217_56%,#0f1014_100%)]",
    media: "border-[rgba(255,255,255,0.1)] bg-[linear-gradient(160deg,#2c3038_0%,#191c22_100%)]",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(122,14,14,0.34)_100%)]",
    title: "text-white",
    text: "text-white/82",
    badge: "border-[rgba(255,255,255,0.18)] bg-black/56 text-white/88",
    accentBadge: "border-primary/26 bg-primary/14 text-white/86",
    benefitIcon: "border-primary/35 bg-primary/16 text-primary",
    iconWrap: "border-primary/34 bg-primary/12",
    iconColor: "text-[#ff7272]",
    cta: "bg-[linear-gradient(120deg,#700708_0%,#bf1a1a_100%)] text-white hover:brightness-110",
    price: "border-white/14 bg-black/28 text-white",
    tableHead: "bg-[linear-gradient(160deg,#26272f_0%,#171921_100%)] text-white",
    tableCell: "bg-[linear-gradient(160deg,rgba(26,27,34,0.86)_0%,rgba(16,17,23,0.95)_100%)] text-white/84",
  },
  transformacion: {
    icon: Flame,
    shell:
      "border-[rgba(255,0,0,0.25)] bg-[linear-gradient(135deg,rgba(255,0,0,0.22)_0%,rgba(0,0,0,0.92)_60%)] shadow-[0_36px_68px_-36px_rgba(170,20,20,0.72)]",
    surface: "bg-[linear-gradient(152deg,rgba(34,7,9,0.92)_0%,rgba(12,12,14,0.98)_70%)]",
    media: "border-[rgba(255,0,0,0.36)] bg-[linear-gradient(170deg,#2d2427_0%,#17151a_100%)]",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(120,10,10,0.64)_100%)]",
    title: "text-[#ff4d4d]",
    text: "text-white/88",
    badge: "border-[rgba(255,0,0,0.42)] bg-[rgba(35,8,10,0.56)] text-white/96 backdrop-blur-[8px]",
    accentBadge: "border-[rgba(255,0,0,0.4)] bg-[rgba(24,8,10,0.58)] text-white backdrop-blur-[10px]",
    benefitIcon: "border-primary/50 bg-primary/20 text-white",
    iconWrap: "border-[rgba(255,0,0,0.42)] bg-[rgba(25,8,10,0.6)]",
    iconColor: "text-[#ff3434]",
    cta: "bg-[linear-gradient(120deg,#9E0808_0%,#D41414_64%,#EF2D2D_100%)] text-white hover:brightness-110",
    price: "border-primary/40 bg-[linear-gradient(128deg,rgba(122,14,14,0.35)_0%,rgba(212,20,20,0.24)_100%)] text-white",
    tableHead: "border-primary/50 bg-[linear-gradient(155deg,#8f0c0c_0%,#55090b_100%)] text-white",
    tableCell: "border-primary/30 bg-[linear-gradient(160deg,rgba(92,12,14,0.65)_0%,rgba(47,9,11,0.84)_100%)] text-white",
  },
  mentoria: {
    icon: Crown,
    shell:
      "border-[rgba(255,200,80,0.28)] bg-[linear-gradient(135deg,rgba(255,200,80,0.18)_0%,rgba(0,0,0,0.92)_60%)] shadow-[0_34px_66px_-38px_rgba(190,146,64,0.62)] before:pointer-events-none before:absolute before:-top-10 before:-right-8 before:size-40 before:content-[''] before:bg-[radial-gradient(circle_at_80%_0%,rgba(255,200,80,0.3),transparent_55%)] before:blur-[24px] before:opacity-80",
    surface: "bg-[linear-gradient(146deg,#14110d_0%,#111216_52%,#0c0c0f_100%)]",
    media: "border-[rgba(255,200,80,0.4)] bg-[linear-gradient(165deg,#31291d_0%,#19140e_100%)]",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(145,104,40,0.44)_100%)]",
    title: "text-[#f6e8c3]",
    text: "text-white/86",
    badge: "border-[rgba(255,200,80,0.38)] bg-[rgba(62,44,18,0.48)] text-[#f7e0a7] backdrop-blur-[8px]",
    accentBadge: "border-[rgba(255,200,80,0.34)] bg-[rgba(41,30,13,0.5)] text-[#f6db9a] backdrop-blur-[10px]",
    benefitIcon: "border-[#c8a34f]/52 bg-[#c8a34f]/14 text-[#d9b661]",
    iconWrap: "border-[rgba(255,200,80,0.38)] bg-[rgba(49,36,16,0.52)]",
    iconColor: "text-[#f3cf84]",
    cta: "border border-[#c8a34f]/64 bg-black text-[#e3c57d] hover:border-[#d6b86d] hover:bg-[#c8a34f] hover:text-black",
    price: "border-[#c8a34f]/42 bg-black/34 text-[#f1d99d]",
    tableHead: "border-[#c8a34f]/48 bg-[linear-gradient(155deg,#8e7238_0%,#4b3919_100%)] text-[#f6e8c3]",
    tableCell: "border-[#c8a34f]/24 bg-[linear-gradient(160deg,rgba(72,56,28,0.7)_0%,rgba(26,20,12,0.92)_100%)] text-white/88",
  },
};

const comparisonRows: Array<{
  label: string;
  getter: (offer: (typeof offers)[number]) => string;
}> = [
  { label: "Duracion", getter: (offer) => offer.comparison.duration },
  { label: "Nivel de personalizacion", getter: (offer) => offer.comparison.personalization },
  { label: "Plan nutricional", getter: (offer) => offer.comparison.nutrition },
  { label: "Seguimiento", getter: (offer) => offer.comparison.followUp },
  { label: "Soporte WhatsApp", getter: (offer) => offer.comparison.whatsappSupport },
  { label: "Ideal para", getter: (offer) => offer.comparison.idealFor },
];

const mediaObjectPositionBySlug: Partial<Record<(typeof offers)[number]["slug"], string>> = {
  "programa-inicio": "object-[center_29%]",
  "programa-base": "object-[center_23%]",
  "programa-transformacion": "object-[center_18%]",
  "mentoria-1-1": "object-[center_16%]",
};

const mediaZoomBySlug: Partial<Record<(typeof offers)[number]["slug"], string>> = {
  "programa-inicio": "scale-[1.03] group-hover:scale-[1.08]",
  "programa-base": "scale-[1.03] group-hover:scale-[1.08]",
  "programa-transformacion": "scale-[1.1] group-hover:scale-[1.15]",
  "mentoria-1-1": "scale-[1.1] group-hover:scale-[1.15]",
};

export function FeaturedPlans() {
  const initialComparisonSlug = offers.find((offer) => offer.slug === "programa-transformacion")?.slug ?? offers[0]?.slug ?? "programa-base";
  const [selectedComparisonSlug, setSelectedComparisonSlug] = useState(initialComparisonSlug);

  if (!offers.length) {
    return (
      <SectionShell
        id="planes"
        eyebrow="PLANES"
        title="No se pudieron cargar los planes"
        description="Reintenta para volver a cargar el catalogo."
      >
        <div className="rounded-[12px] border border-white/14 bg-[linear-gradient(145deg,#17181d_0%,#111217_100%)] p-5">
          <p className="text-sm text-white/78">No se pudieron cargar los planes. Reintenta.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 inline-flex h-10 items-center justify-center rounded-[10px] border border-primary/45 bg-primary/16 px-4 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-primary/28"
          >
            Reintentar
          </button>
        </div>
      </SectionShell>
    );
  }
  const selectedComparisonOffer = offers.find((offer) => offer.slug === selectedComparisonSlug) ?? offers[0];

  return (
    <SectionShell
      id="planes"
      eyebrow="PLANES"
      title="Elegi tu nivel de transformacion"
      description="Cuatro niveles claros. Un solo objetivo: progreso real con estructura."
    >
      <article className="mb-5 rounded-[12px] border border-primary/35 bg-[linear-gradient(126deg,rgba(122,14,14,0.3)_0%,rgba(40,12,15,0.72)_100%)] px-4 py-3 text-sm text-white/86">
        Cada nivel suma personalizacion y soporte. Transformacion y Mentoria concentran la experiencia premium completa.
      </article>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {offers.map((offer) => {
          const styles = themeClasses[offer.theme];
          const Icon = styles.icon;
          const imageSrc = offer.coverImage ?? PLAN_FALLBACK_IMAGE;
          const isTransformacion = offer.slug === "programa-transformacion";
          const isMentoria = offer.slug === "mentoria-1-1";
          const isPremium = isTransformacion || isMentoria;
          const visibleBenefits = offer.benefits.slice(0, 3);
          const duplicatedBadgeLabel =
            typeof offer.badgeLabel === "string" && offer.badgeLabel.toLowerCase().trim() === offer.shortLabel.toLowerCase().trim();
          const mediaHeightClass = isPremium ? "h-[200px] md:h-[212px]" : "h-[160px] md:h-[180px]";
          const mediaObjectPositionClass = mediaObjectPositionBySlug[offer.slug] ?? "object-[center_20%]";
          const mediaZoomClass = mediaZoomBySlug[offer.slug] ?? "scale-[1.02] group-hover:scale-[1.06]";
          const mediaImageClass = cn(
            "object-cover brightness-[0.92] saturate-[1.06] transition-transform duration-[260ms] ease-[var(--ease-premium)]",
            mediaObjectPositionClass,
            mediaZoomClass
          );

          return (
            <PlanCard
              data-reveal
              id={`plan-${offer.slug}`}
              key={offer.slug}
              className={cn(
                "relative overflow-hidden rounded-[16px] border p-[1px] transition-[transform,box-shadow] duration-[280ms] ease-[var(--ease-premium)] hover:-translate-y-1.5",
                styles.shell,
                isTransformacion ? "md:-translate-y-2 md:scale-[1.04] md:shadow-[0_50px_84px_-42px_rgba(122,14,14,0.98)]" : "",
                isMentoria ? "md:shadow-[0_42px_74px_-40px_rgba(210,170,86,0.58)]" : ""
              )}
            >
              <div className={cn("relative flex h-full flex-col rounded-[15px] p-5 md:p-5", styles.surface)}>
                <div
                  className={cn(
                    "relative z-10 mb-4 overflow-hidden rounded-[11px] border",
                    mediaHeightClass,
                    styles.media
                  )}
                >
                  <Image
                    data-plan-media-image
                    src={imageSrc}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 25vw"
                    className={mediaImageClass}
                  />

                  <div className={cn("pointer-events-none absolute inset-0", styles.overlay)} />
                  <div data-plan-media-overlay className="pointer-events-none absolute inset-0 bg-black/38" />

                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <Badge
                      className={cn(
                        "rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                        isPremium ? "badge-shimmer relative overflow-hidden" : "",
                        styles.badge
                      )}
                    >
                      {offer.shortLabel}
                    </Badge>
                    {isTransformacion ? (
                      <Badge
                        className={cn(
                          "badge-shimmer relative overflow-hidden rounded-[999px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,0,0,0.22)_26%,rgba(10,10,14,0.58)_100%)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-[0_14px_24px_-18px_rgba(212,20,20,0.92)]",
                          styles.accentBadge
                        )}
                      >
                        <Flame className="size-3.5 text-[#ff2a2a]" />
                        Mas elegido
                      </Badge>
                    ) : null}
                    {offer.badgeLabel && !isTransformacion && !duplicatedBadgeLabel ? (
                      <Badge
                        className={cn(
                          "rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                          isMentoria ? "badge-shimmer relative overflow-hidden" : "",
                          styles.accentBadge
                        )}
                      >
                        {offer.badgeLabel}
                      </Badge>
                    ) : null}
                  </div>

                  <span className={cn("absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-[8px] border", styles.iconWrap)}>
                    <Icon className={cn("size-4", styles.iconColor)} />
                  </span>
                </div>

                <div data-plan-copy className="space-y-3.5">
                  {isTransformacion ? (
                    <div className="relative isolate space-y-1.5 before:pointer-events-none before:absolute before:-left-5 before:-top-6 before:h-24 before:w-44 before:rounded-full before:bg-[radial-gradient(circle_at_20%_10%,rgba(255,0,0,0.35),transparent_55%)] before:blur-[24px] before:opacity-90 before:content-['']">
                      <h3 className="relative z-10 text-[1.6rem] font-black leading-[0.94] tracking-[0.04em] text-[#ff3b3b] md:text-[1.82rem]">
                        TRANSFORMACION
                      </h3>
                      <p className="relative z-10 text-[0.95rem] font-semibold leading-tight text-white/92 md:text-[1.02rem]">
                        90 dias para cambiar tu fisico
                      </p>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "space-y-1.5",
                        isMentoria
                          ? "relative isolate before:pointer-events-none before:absolute before:-right-4 before:-top-5 before:h-20 before:w-36 before:rounded-full before:bg-[radial-gradient(circle_at_80%_0%,rgba(255,200,80,0.3),transparent_55%)] before:blur-[24px] before:opacity-90 before:content-['']"
                          : ""
                      )}
                    >
                      <h3 className={cn("relative z-10 text-[1.52rem] leading-[0.96] md:text-[1.72rem]", styles.title)}>{offer.title}</h3>
                      <p className={cn("line-clamp-2 text-[0.92rem] font-medium leading-snug", styles.text)}>{offer.strapline}</p>
                    </div>
                  )}
                  <p className={cn("line-clamp-2 text-sm leading-relaxed", styles.text)}>{offer.pitch}</p>

                  {offer.surveyStatement ? (
                    <p className="line-clamp-2 rounded-[10px] border border-primary/42 bg-primary/14 px-3 py-2 text-xs font-semibold tracking-[0.04em] text-white">
                      {offer.surveyStatement}
                    </p>
                  ) : null}

                  <ul className="space-y-2.5">
                    {visibleBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-white/88">
                        <span className={cn("mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[8px] border", styles.benefitIcon)}>
                          <Check className="size-3.5" />
                        </span>
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  {offer.benefits.length > visibleBenefits.length ? (
                    <p className="text-xs text-white/64">+{offer.benefits.length - visibleBenefits.length} puntos extra segun tu diagnostico.</p>
                  ) : null}

                  <div className={cn("rounded-[11px] border px-3.5 py-3", styles.price)}>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/68">Precio</p>
                    <p className="mt-1 text-lg font-semibold">
                      {offer.priceArs}
                      <span className="px-2 text-white/40">|</span>
                      <span className="text-base font-medium text-white/86">{offer.priceUsd}</span>
                    </p>
                    <p className="mt-1 text-xs text-white/72">Duracion: {offer.durationLabel}</p>
                  </div>
                </div>

                <AnimatedButton
                  href={getOfferPrimaryHref(offer)}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("premium-cta mt-4 h-11 w-full justify-between rounded-[10px] px-4 text-[0.69rem] font-bold tracking-[0.1em]", styles.cta)}
                  onClick={() => rememberSelectedPlan(offer.title)}
                >
                  <span className="pr-2 text-left leading-[1.2]">{offer.ctaLabel}</span>
                  <ArrowRight className="premium-arrow size-4 shrink-0" />
                </AnimatedButton>

                <WhatsAppButton href={getStickyWhatsAppHref(offer.title)} size="sm" className="mt-2 w-full justify-center">
                  WhatsApp
                </WhatsAppButton>
              </div>
            </PlanCard>
          );
        })}
      </div>

      <div className="mt-7 rounded-[16px] border border-white/14 bg-[linear-gradient(145deg,#17181d_0%,#111217_100%)] p-4 md:p-5">
        <div className="space-y-3.5">
          <div className="flex items-center gap-2">
            <Badge className="rounded-[8px] border border-primary/45 bg-primary/18 text-primary">Comparativa</Badge>
            <p className="text-xs uppercase tracking-[0.12em] text-white/62">Sin scroll horizontal</p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            {offers.map((offer) => {
              const active = offer.slug === selectedComparisonOffer.slug;
              const isTransformacion = offer.slug === "programa-transformacion";

              return (
                <button
                  key={`compact-comparison-${offer.slug}`}
                  type="button"
                  onClick={() => setSelectedComparisonSlug(offer.slug)}
                  className={cn(
                    "h-10 rounded-[10px] border px-3 text-xs font-semibold uppercase tracking-[0.08em] transition-[border-color,background-color,color,box-shadow] duration-[220ms]",
                    active
                      ? "border-primary/68 bg-[linear-gradient(122deg,#8b0000_0%,#d41414_100%)] text-white shadow-[0_16px_28px_-20px_rgba(212,20,20,0.92)]"
                      : "border-white/16 bg-black/28 text-white/76 hover:border-white/30 hover:text-white",
                    isTransformacion && !active ? "border-primary/35 text-white/86" : ""
                  )}
                  aria-pressed={active}
                >
                  {offer.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-4 space-y-2.5">
          {comparisonRows.map((row) => (
            <li
              key={`compact-row-${row.label}`}
              className="rounded-[11px] border border-white/12 bg-[linear-gradient(140deg,rgba(20,21,28,0.92)_0%,rgba(13,14,18,0.98)_100%)] px-4 py-3.5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-white/56">{row.label}</p>
              <p className="mt-1.5 text-sm font-medium text-white/90">{row.getter(selectedComparisonOffer)}</p>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[11px] text-white/58">Cambia de plan arriba para comparar en segundos.</p>
      </div>
    </SectionShell>
  );
}
