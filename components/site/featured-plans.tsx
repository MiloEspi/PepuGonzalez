"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Crown, Flame, Rocket, ShieldCheck, Star, type LucideIcon } from "lucide-react";

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
  cta: string;
  price: string;
  tableHead: string;
  tableCell: string;
}

const themeClasses: Record<OfferTheme, ThemeConfig> = {
  inicio: {
    icon: Rocket,
    shell:
      "border-white/16 bg-[linear-gradient(138deg,rgba(52,56,64,0.82)_0%,rgba(26,29,36,0.92)_48%,rgba(16,17,22,0.96)_100%)] shadow-[0_26px_48px_-34px_rgba(0,0,0,0.95)]",
    surface: "bg-[linear-gradient(148deg,#17191f_0%,#111216_58%,#0f1014_100%)]",
    media: "border-white/14 bg-black/70",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(80,87,101,0.5)_100%)]",
    title: "text-white",
    text: "text-white/82",
    badge: "border-white/18 bg-black/42 text-white/85",
    accentBadge: "border-white/16 bg-white/6 text-white/78",
    benefitIcon: "border-white/25 bg-white/8 text-white/90",
    cta: "bg-[linear-gradient(120deg,#222832_0%,#3a414f_100%)] text-white hover:brightness-110",
    price: "border-white/14 bg-black/28 text-white",
    tableHead: "bg-[linear-gradient(160deg,#242933_0%,#181b23_100%)] text-white",
    tableCell: "bg-[linear-gradient(160deg,rgba(27,30,38,0.84)_0%,rgba(17,19,25,0.92)_100%)] text-white/84",
  },
  base: {
    icon: ShieldCheck,
    shell:
      "border-white/16 bg-[linear-gradient(136deg,rgba(98,102,112,0.7)_0%,rgba(45,48,56,0.92)_64%,rgba(33,35,42,0.96)_100%)] shadow-[0_26px_48px_-36px_rgba(0,0,0,0.95)]",
    surface: "bg-[linear-gradient(145deg,#18191f_0%,#121318_54%,#111216_100%)]",
    media: "border-white/14 bg-[linear-gradient(145deg,#111216_0%,#0d0e12_100%)]",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(122,14,14,0.3)_100%)]",
    title: "text-white",
    text: "text-white/82",
    badge: "border-white/16 bg-black/58 text-white/88",
    accentBadge: "border-white/14 bg-black/46 text-white/78",
    benefitIcon: "border-primary/35 bg-primary/16 text-primary",
    cta: "bg-[linear-gradient(120deg,#8B0000_0%,#D41414_100%)] text-white hover:brightness-110",
    price: "border-white/14 bg-black/28 text-white",
    tableHead: "bg-[linear-gradient(160deg,#26272f_0%,#171921_100%)] text-white",
    tableCell: "bg-[linear-gradient(160deg,rgba(26,27,34,0.86)_0%,rgba(16,17,23,0.95)_100%)] text-white/84",
  },
  transformacion: {
    icon: Flame,
    shell:
      "border-primary/52 bg-[linear-gradient(145deg,rgba(212,20,20,0.9)_0%,rgba(122,14,14,0.88)_58%,rgba(44,8,9,0.96)_100%)] shadow-[0_40px_70px_-36px_rgba(122,14,14,0.96)]",
    surface:
      "bg-[linear-gradient(154deg,#270708_0%,#170709_48%,#101116_100%)] [background-image:linear-gradient(154deg,#270708_0%,#170709_48%,#101116_100%),repeating-linear-gradient(132deg,rgba(255,255,255,0.014)_0_1px,transparent_1px_6px)]",
    media: "border-primary/58 bg-black/74",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(122,14,14,0.72)_100%)]",
    title: "text-white",
    text: "text-white/88",
    badge: "border-primary/45 bg-primary text-primary-foreground",
    accentBadge: "border-primary/50 bg-black/45 text-white",
    benefitIcon: "border-primary/50 bg-primary/20 text-white",
    cta: "bg-[linear-gradient(120deg,#9E0808_0%,#D41414_64%,#EF2D2D_100%)] text-white hover:brightness-110",
    price: "border-primary/40 bg-[linear-gradient(128deg,rgba(122,14,14,0.35)_0%,rgba(212,20,20,0.24)_100%)] text-white",
    tableHead: "border-primary/50 bg-[linear-gradient(155deg,#8f0c0c_0%,#55090b_100%)] text-white",
    tableCell: "border-primary/30 bg-[linear-gradient(160deg,rgba(92,12,14,0.65)_0%,rgba(47,9,11,0.84)_100%)] text-white",
  },
  mentoria: {
    icon: Crown,
    shell:
      "border-[#c8a34f]/56 bg-[linear-gradient(138deg,rgba(200,163,79,0.92)_0%,rgba(144,118,58,0.7)_48%,rgba(22,18,12,0.97)_100%)] shadow-[0_34px_62px_-40px_rgba(200,163,79,0.66)]",
    surface:
      "bg-[linear-gradient(146deg,#0c0c0f_0%,#101116_54%,#0d0d10_100%)] [background-image:linear-gradient(146deg,#0c0c0f_0%,#101116_54%,#0d0d10_100%),radial-gradient(circle_at_80%_22%,rgba(200,163,79,0.22),transparent_46%)]",
    media: "border-[#c8a34f]/55 bg-black/82",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(200,163,79,0.42)_100%)]",
    title: "text-[#f6e8c3]",
    text: "text-white/86",
    badge: "border-[#c8a34f]/56 bg-[#c8a34f]/94 text-black",
    accentBadge: "border-[#c8a34f]/44 bg-black/56 text-[#debf76]",
    benefitIcon: "border-[#c8a34f]/52 bg-[#c8a34f]/14 text-[#d9b661]",
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

export function FeaturedPlans() {
  const comparisonViewportRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [comparisonProgress, setComparisonProgress] = useState({
    hasOverflow: false,
    progress: 0,
    thumbWidth: 100,
    hasInteracted: false,
  });

  const updateComparisonMetrics = useCallback(() => {
    const node = comparisonViewportRef.current;
    if (!node) return;

    const maxScroll = node.scrollWidth - node.clientWidth;
    const hasOverflow = maxScroll > 2;
    const progress = hasOverflow ? Math.min(Math.max(node.scrollLeft / maxScroll, 0), 1) : 0;
    const thumbWidth = hasOverflow ? Math.max((node.clientWidth / node.scrollWidth) * 100, 14) : 100;

    setComparisonProgress((prev) => {
      const hasInteracted = prev.hasInteracted || node.scrollLeft > 6;
      if (
        prev.hasOverflow === hasOverflow &&
        Math.abs(prev.progress - progress) < 0.005 &&
        Math.abs(prev.thumbWidth - thumbWidth) < 0.5 &&
        prev.hasInteracted === hasInteracted
      ) {
        return prev;
      }

      return { hasOverflow, progress, thumbWidth, hasInteracted };
    });
  }, []);

  const scheduleComparisonMetricsUpdate = useCallback(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateComparisonMetrics();
    });
  }, [updateComparisonMetrics]);

  useEffect(() => {
    scheduleComparisonMetricsUpdate();
    window.addEventListener("resize", scheduleComparisonMetricsUpdate);

    return () => {
      window.removeEventListener("resize", scheduleComparisonMetricsUpdate);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scheduleComparisonMetricsUpdate]);

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

  return (
    <SectionShell
      id="planes"
      eyebrow="PLANES"
      title="Elegi tu nivel de transformacion"
      description="Cuatro niveles claros. Un solo objetivo: progreso real con estructura."
    >
      <article className="mb-5 rounded-[12px] border border-primary/35 bg-[linear-gradient(126deg,rgba(122,14,14,0.3)_0%,rgba(40,12,15,0.72)_100%)] px-4 py-3 text-sm text-white/86">
        Se envia encuesta detallada para diseñar tu plan completamente adaptado. En el sistema Transformacion, esta personalizacion es total.
      </article>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {offers.map((offer) => {
          const styles = themeClasses[offer.theme];
          const Icon = styles.icon;
          const imageSrc = offer.coverImage ?? PLAN_FALLBACK_IMAGE;
          const isTransformacion = offer.slug === "programa-transformacion";
          const isMentoria = offer.slug === "mentoria-1-1";

          return (
            <PlanCard
              data-reveal
              id={`plan-${offer.slug}`}
              key={offer.slug}
              className={cn(
                "relative overflow-hidden rounded-[16px] border p-[1px] transition-[transform,box-shadow] duration-[280ms] ease-[var(--ease-premium)] hover:-translate-y-1.5",
                styles.shell,
                isTransformacion ? "md:-translate-y-2 md:scale-[1.04] md:shadow-[0_50px_84px_-42px_rgba(122,14,14,0.98)]" : "",
                isMentoria
                  ? "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_82%_14%,rgba(255,214,120,0.18),transparent_44%)]"
                  : ""
              )}
            >
              <div className={cn("relative flex h-full flex-col rounded-[15px] p-3.5 md:p-4", styles.surface)}>
                <div className={cn("relative mb-4 h-40 overflow-hidden rounded-[11px] border md:h-44", styles.media)}>
                  <Image
                    data-plan-media-image
                    src={imageSrc}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 25vw"
                    className="object-cover grayscale contrast-[1.14] brightness-[0.78] transition-transform duration-[260ms] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
                  />
                  <div className={cn("pointer-events-none absolute inset-0", styles.overlay)} />
                  <div data-plan-media-overlay className="pointer-events-none absolute inset-0 bg-black/45" />

                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <Badge className={cn("rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.badge)}>
                      {offer.shortLabel}
                    </Badge>
                    {isTransformacion ? (
                      <Badge className={cn("rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.accentBadge)}>
                        <Star className="size-3.5" />
                        Mas elegido
                      </Badge>
                    ) : null}
                    {offer.badgeLabel && !isTransformacion ? (
                      <Badge className={cn("rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.accentBadge)}>
                        {offer.badgeLabel}
                      </Badge>
                    ) : null}
                  </div>

                  <span className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-[8px] border border-white/16 bg-black/38">
                    <Icon className="size-4 text-white/86" />
                  </span>
                </div>

                <div data-plan-copy className="space-y-3.5">
                  <h3 className={cn("text-[1.52rem] leading-[0.96] md:text-[1.72rem]", styles.title)}>{offer.title}</h3>
                  <p className={cn("text-[0.92rem] font-medium leading-snug", styles.text)}>{offer.strapline}</p>
                  <p className={cn("text-sm leading-relaxed", styles.text)}>{offer.pitch}</p>

                  {offer.surveyStatement ? (
                    <p className="rounded-[10px] border border-primary/42 bg-primary/14 px-3 py-2 text-xs font-semibold tracking-[0.04em] text-white">
                      {offer.surveyStatement}
                    </p>
                  ) : null}

                  <ul className="space-y-2.5">
                    {offer.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5 text-sm text-white/88">
                        <span className={cn("mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[8px] border", styles.benefitIcon)}>
                          <Check className="size-3.5" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

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

      <div className="mt-8 rounded-[14px] border border-white/14 bg-[linear-gradient(145deg,#17181d_0%,#111217_100%)] p-3.5 md:p-4">
        <div className="mb-3 flex items-center gap-2">
          <Badge className="rounded-[8px] border border-primary/45 bg-primary/18 text-primary">Comparativa</Badge>
          <p className="text-xs uppercase tracking-[0.14em] text-white/64">Inicio | Base | Transformacion | Mentoria</p>
        </div>

        <div className="relative">
          <div
            ref={comparisonViewportRef}
            onScroll={scheduleComparisonMetricsUpdate}
            className="w-full touch-pan-x overflow-x-auto overflow-y-hidden rounded-[12px] border border-white/12 bg-black/24 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <table className="w-max min-w-[780px] border-separate border-spacing-0 text-sm md:min-w-[1040px]">
              <thead>
                <tr>
                  <th className="sticky left-0 z-30 min-w-[176px] border-b border-r border-white/12 bg-[linear-gradient(150deg,#15161b_0%,#111217_100%)] px-4 py-3 text-left text-[11px] uppercase tracking-[0.1em] text-white/68">
                    Caracteristica
                  </th>
                  {offers.map((offer) => {
                    const styles = themeClasses[offer.theme];
                    const isTransformacion = offer.slug === "programa-transformacion";

                    return (
                      <th
                        key={`head-${offer.slug}`}
                        className={cn(
                          "min-w-[182px] border-b border-l border-white/12 px-4 py-3 text-left text-[11px] uppercase tracking-[0.1em]",
                          styles.tableHead,
                          isTransformacion ? "border-primary/50 shadow-[0_14px_24px_-16px_rgba(212,20,20,0.9)]" : ""
                        )}
                      >
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          {offer.shortLabel}
                          {isTransformacion ? (
                            <span className="rounded-[6px] border border-primary/50 bg-primary/35 px-1.5 py-0.5 text-[9px]">
                              Mas elegido
                            </span>
                          ) : null}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className="sticky left-0 z-20 border-b border-r border-white/12 bg-[linear-gradient(145deg,#131419_0%,#101116_100%)] px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/78">
                      {row.label}
                    </td>

                    {offers.map((offer) => {
                      const styles = themeClasses[offer.theme];
                      const isTransformacion = offer.slug === "programa-transformacion";
                      return (
                        <td
                          key={`${row.label}-${offer.slug}`}
                          className={cn(
                            "border-b border-l border-white/12 px-4 py-3.5 text-sm",
                            styles.tableCell,
                            isTransformacion ? "border-primary/35 shadow-[0_18px_28px_-18px_rgba(212,20,20,0.85)]" : ""
                          )}
                        >
                          {row.getter(offer)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-6 bg-[linear-gradient(90deg,rgba(17,18,23,0.98)_0%,rgba(17,18,23,0)_100%)] transition-opacity duration-200",
              comparisonProgress.hasOverflow && comparisonProgress.progress > 0.02 ? "opacity-100" : "opacity-0"
            )}
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-6 bg-[linear-gradient(270deg,rgba(17,18,23,0.98)_0%,rgba(17,18,23,0)_100%)] transition-opacity duration-200",
              comparisonProgress.hasOverflow && comparisonProgress.progress < 0.98 ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {comparisonProgress.hasOverflow ? (
          <div className="mt-3 space-y-2">
            {!comparisonProgress.hasInteracted ? (
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/58 md:hidden">Desliza -&gt;</p>
            ) : null}

            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/14">
              <span
                className="absolute top-0 h-full rounded-full bg-[linear-gradient(90deg,#8b0000_0%,#d41414_100%)] transition-transform duration-150 ease-linear"
                style={{
                  width: `${comparisonProgress.thumbWidth}%`,
                  transform: `translateX(${comparisonProgress.progress * (100 - comparisonProgress.thumbWidth)}%)`,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
