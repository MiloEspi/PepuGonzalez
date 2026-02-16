"use client";

import Image from "next/image";
import { ArrowRight, Check, Crown, ShieldCheck, Sparkles, Star, Target, TrendingUp, type LucideIcon } from "lucide-react";

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
  outer: string;
  surface: string;
  glow: string;
  hover: string;
  media: string;
  overlay: string;
  mediaMotion: string;
  badge: string;
  accentBadge: string;
  iconWrap: string;
  iconTone: string;
  title: string;
  titleHover?: string;
  strapline: string;
  pitch: string;
  benefitDivider: string;
  benefitIcon: string;
  benefitText: string;
  cta: string;
  microcopy?: string;
  studioLight?: string;
}

const themeClasses: Record<OfferTheme, ThemeConfig> = {
  base: {
    icon: ShieldCheck,
    outer:
      "bg-[linear-gradient(136deg,rgba(98,102,112,0.7)_0%,rgba(45,48,56,0.92)_64%,rgba(33,35,42,0.96)_100%)] shadow-[0_26px_48px_-36px_rgba(0,0,0,0.95)]",
    surface:
      "textured-surface bg-[linear-gradient(145deg,#18191f_0%,#121318_54%,#111216_100%)]",
    glow:
      "bg-[radial-gradient(circle_at_15%_0%,rgba(212,20,20,0.18),transparent_62%)] opacity-45 group-hover:opacity-75",
    hover: "hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-32px_rgba(0,0,0,0.92)]",
    media: "border-white/14 bg-[linear-gradient(145deg,#111216_0%,#0d0e12_100%)]",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(122,14,14,0.3)_100%)]",
    mediaMotion: "group-hover:scale-[1.06] group-hover:translate-x-1",
    badge: "border-white/16 bg-black/58 text-white/88",
    accentBadge: "border-white/14 bg-black/46 text-white/78",
    iconWrap: "border-white/18 bg-black/46",
    iconTone: "text-primary/85",
    title: "text-[1.9rem] font-semibold leading-[0.96] text-white md:text-[2.2rem]",
    strapline: "text-[0.98rem] font-medium leading-snug text-white/86",
    pitch: "text-sm leading-relaxed text-white/72",
    benefitDivider: "border-b border-white/12",
    benefitIcon: "border-primary/35 bg-primary/16 text-primary",
    benefitText: "text-sm leading-relaxed text-white/86",
    cta: "bg-[linear-gradient(120deg,#8B0000_0%,#D41414_100%)] text-white shadow-[0_16px_30px_-20px_rgba(212,20,20,0.92)] hover:shadow-[0_20px_34px_-18px_rgba(212,20,20,0.98)]",
    microcopy: "border-primary/30 bg-primary/10 text-white/80",
  },
  transformacion: {
    icon: TrendingUp,
    outer:
      "bg-[linear-gradient(145deg,rgba(212,20,20,0.92)_0%,rgba(122,14,14,0.9)_58%,rgba(44,8,9,0.96)_100%)] shadow-[0_34px_64px_-34px_rgba(122,14,14,0.96)]",
    surface:
      "bg-[linear-gradient(154deg,#270708_0%,#170709_48%,#101116_100%)] [background-image:linear-gradient(154deg,#270708_0%,#170709_48%,#101116_100%),repeating-linear-gradient(132deg,rgba(255,255,255,0.016)_0_1px,transparent_1px_6px)]",
    glow:
      "bg-[radial-gradient(circle_at_20%_0%,rgba(212,20,20,0.5),transparent_58%)] opacity-65 group-hover:opacity-100",
    hover:
      "hover:-translate-y-2.5 hover:shadow-[0_42px_78px_-34px_rgba(122,14,14,0.98)]",
    media: "border-primary/55 bg-black/72",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(122,14,14,0.72)_100%)]",
    mediaMotion: "group-hover:scale-[1.1] group-hover:translate-x-1.5 group-hover:-translate-y-1",
    badge: "border-primary/45 bg-primary text-primary-foreground",
    accentBadge: "border-primary/50 bg-black/45 text-white",
    iconWrap: "border-primary/45 bg-primary/20",
    iconTone: "text-white",
    title: "text-[2rem] font-semibold leading-[0.94] text-white md:text-[2.52rem]",
    titleHover: "group-hover:-translate-y-1",
    strapline: "text-[1rem] font-medium leading-snug text-white/92",
    pitch: "text-sm leading-relaxed text-white/78",
    benefitDivider: "border-b border-white/16",
    benefitIcon: "border-primary/50 bg-primary/20 text-white",
    benefitText: "text-sm leading-relaxed text-white/90",
    cta: "bg-[linear-gradient(120deg,#9E0808_0%,#D41414_64%,#EF2D2D_100%)] text-white shadow-[0_20px_34px_-18px_rgba(212,20,20,0.94)] hover:shadow-[0_24px_38px_-16px_rgba(212,20,20,0.98)]",
    microcopy: "border-primary/45 bg-primary/18 text-white",
  },
  personalizado: {
    icon: Target,
    outer:
      "bg-[linear-gradient(130deg,rgba(112,115,124,0.76)_0%,rgba(52,58,69,0.82)_44%,rgba(212,20,20,0.42)_100%)] shadow-[0_30px_54px_-38px_rgba(0,0,0,0.95)]",
    surface:
      "textured-metal bg-[linear-gradient(128deg,#1a1b21_0%,#121318_42%,#1f2330_74%,#2f1518_100%)] [background-image:linear-gradient(128deg,#1a1b21_0%,#121318_42%,#1f2330_74%,#2f1518_100%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.14),transparent_40%),repeating-linear-gradient(132deg,rgba(255,255,255,0.015)_0_1px,transparent_1px_6px)]",
    glow:
      "bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.2),transparent_62%),radial-gradient(circle_at_92%_86%,rgba(212,20,20,0.26),transparent_52%)] opacity-42 group-hover:opacity-64",
    hover: "hover:-translate-y-1.5 hover:shadow-[0_34px_58px_-34px_rgba(0,0,0,0.94)]",
    media: "border-white/16 bg-[linear-gradient(145deg,#121318_0%,#0d0e13_100%)]",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(122,14,14,0.44)_100%)]",
    mediaMotion: "group-hover:scale-[1.07] group-hover:translate-x-1",
    badge: "border-white/16 bg-[#15161a] text-white/86",
    accentBadge: "border-white/16 bg-black/42 text-white/78",
    iconWrap: "border-white/18 bg-black/42",
    iconTone: "text-white/88",
    title: "text-[1.82rem] font-medium leading-[0.98] tracking-[0.01em] text-white md:text-[2.18rem]",
    strapline: "text-[0.98rem] font-medium leading-snug text-white/86",
    pitch: "text-sm leading-relaxed text-white/72",
    benefitDivider: "border-b border-white/14",
    benefitIcon: "border-white/28 bg-white/8 text-white/84",
    benefitText: "text-sm leading-relaxed text-white/84",
    cta: "bg-[linear-gradient(120deg,#5E0B0B_0%,#8A1010_100%)] text-white shadow-[0_14px_24px_-18px_rgba(122,14,14,0.95)] hover:shadow-[0_18px_30px_-16px_rgba(122,14,14,0.95)]",
    studioLight:
      "bg-[linear-gradient(126deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_18%,rgba(255,255,255,0)_44%)]",
  },
  mentoria: {
    icon: Crown,
    outer:
      "bg-[linear-gradient(138deg,rgba(200,163,79,0.92)_0%,rgba(144,118,58,0.7)_48%,rgba(22,18,12,0.97)_100%)] shadow-[0_34px_62px_-40px_rgba(200,163,79,0.66)]",
    surface:
      "bg-[linear-gradient(146deg,#0c0c0f_0%,#101116_54%,#0d0d10_100%)] [background-image:linear-gradient(146deg,#0c0c0f_0%,#101116_54%,#0d0d10_100%),radial-gradient(circle_at_80%_22%,rgba(200,163,79,0.22),transparent_46%),repeating-linear-gradient(132deg,rgba(255,255,255,0.014)_0_1px,transparent_1px_6px)]",
    glow:
      "bg-[radial-gradient(circle_at_20%_0%,rgba(200,163,79,0.34),transparent_62%),radial-gradient(circle_at_92%_76%,rgba(200,163,79,0.28),transparent_50%)] opacity-44 group-hover:opacity-72",
    hover:
      "hover:-translate-y-2 hover:shadow-[0_38px_68px_-34px_rgba(200,163,79,0.72)]",
    media: "border-[#c8a34f]/55 bg-black/82",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(200,163,79,0.38)_100%)]",
    mediaMotion: "group-hover:scale-[1.08] group-hover:translate-x-1 group-hover:-translate-y-1",
    badge: "border-[#c8a34f]/56 bg-[#c8a34f]/94 text-black",
    accentBadge: "border-[#c8a34f]/44 bg-black/56 text-[#debf76]",
    iconWrap: "border-[#c8a34f]/52 bg-[#c8a34f]/12",
    iconTone: "text-[#c8a34f]",
    title: "text-[1.95rem] font-semibold leading-[0.95] text-[#f6e8c3] md:text-[2.24rem]",
    strapline: "text-[0.98rem] font-medium leading-snug text-white/88",
    pitch: "text-sm leading-relaxed text-white/74",
    benefitDivider: "border-b border-[#c8a34f]/26",
    benefitIcon: "border-[#c8a34f]/52 bg-[#c8a34f]/14 text-[#d9b661]",
    benefitText: "text-sm leading-relaxed text-white/86",
    cta: "border border-[#c8a34f]/64 bg-black text-[#e3c57d] shadow-[0_15px_26px_-18px_rgba(200,163,79,0.72)] hover:border-[#d6b86d] hover:bg-[#c8a34f] hover:text-black hover:shadow-[0_22px_34px_-16px_rgba(200,163,79,0.76)]",
  },
};

export function FeaturedPlans() {
  return (
    <SectionShell
      id="planes"
      eyebrow="PLANES"
      title="Elegi el nivel de acompanamiento para tu proceso"
      description="Cada programa sube el nivel de exigencia y precision. El objetivo es uno: transformacion real."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
        {offers.map((offer) => {
          const styles = themeClasses[offer.theme];
          const Icon = styles.icon;
          const imageSrc = offer.coverImage ?? PLAN_FALLBACK_IMAGE;
          const isTransformacion = offer.theme === "transformacion";
          const isMentoria = offer.theme === "mentoria";
          const badgeLabel = offer.theme === "base" ? "Base" : offer.theme === "personalizado" ? "Precision" : offer.shortLabel;
          const visibleBenefits = offer.benefits;

          return (
            <PlanCard
              data-reveal
              id={`plan-${offer.slug}`}
              key={offer.slug}
              className={cn(
                "group relative overflow-hidden rounded-[14px] p-[1px] opacity-0 transition-[transform,box-shadow] duration-[240ms] ease-[var(--ease-premium)]",
                isTransformacion ? "lg:-translate-y-2 lg:scale-[1.03] lg:shadow-[0_48px_86px_-46px_rgba(122,14,14,1)]" : "",
                styles.outer
              )}
            >
              <span data-plan-accent className="pointer-events-none absolute inset-y-6 left-0 z-20 w-px rounded-full bg-primary/70 opacity-58" />
              <div className={cn("pointer-events-none absolute inset-0 -z-10 rounded-[14px] blur-2xl transition-opacity duration-250", styles.glow)} />

              <div className={cn("relative flex h-full flex-col overflow-hidden rounded-[14px] p-3.5 md:p-4", styles.surface)}>
                {styles.studioLight ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-70 mix-blend-screen transition-opacity duration-300 group-hover:opacity-85",
                      styles.studioLight
                    )}
                  />
                ) : null}

                <div className={cn("relative mb-4 h-40 overflow-hidden rounded-[10px] border md:h-44", styles.media)}>
                  <Image
                    data-plan-media-image
                    src={imageSrc}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
                    className="object-cover grayscale contrast-[1.18] brightness-[0.78]"
                  />
                  <div className={cn("pointer-events-none absolute inset-0", styles.overlay)} />
                  <div
                    data-plan-media-overlay
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.72)_100%)] opacity-[0.78]"
                  />

                  <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
                    <Badge className={cn("badge-shimmer rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.badge)}>
                      {badgeLabel}
                    </Badge>

                    {isTransformacion ? (
                      <Badge className={cn("rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.accentBadge)}>
                        <Star className="size-3.5" />
                        MAS ELEGIDO
                      </Badge>
                    ) : null}

                    {isMentoria ? (
                      <Badge className={cn("rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em]", styles.accentBadge)}>
                        <Sparkles className="size-3.5" />
                        Solo 5 cupos
                      </Badge>
                    ) : null}

                    {!isTransformacion && !isMentoria && offer.badgeLabel ? (
                      <Badge className={cn("rounded-[8px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.accentBadge)}>
                        {offer.badgeLabel}
                      </Badge>
                    ) : null}
                  </div>

                  <span className={cn("absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-[8px] border", styles.iconWrap)}>
                    <Icon className={cn("size-4", styles.iconTone)} />
                  </span>
                </div>

                <div data-plan-copy>
                  <h3
                    className={cn(
                      styles.title,
                      "text-[1.45rem] leading-[1.02] md:text-[1.7rem]",
                      styles.titleHover ? `transition-transform duration-200 ${styles.titleHover}` : ""
                    )}
                  >
                    {offer.title}
                  </h3>
                  <p className={styles.strapline}>{offer.strapline}</p>
                  <p className={styles.pitch}>{offer.pitch}</p>

                  {offer.spotsMicrocopy && !isMentoria ? (
                    <p className={cn("mt-3 inline-flex w-fit items-center gap-1 rounded-[8px] border px-2.5 py-1 text-xs font-medium", styles.microcopy)}>
                      {offer.spotsMicrocopy}
                    </p>
                  ) : null}

                  <ul className="mt-4">
                    {visibleBenefits.map((benefit, index) => (
                      <li key={benefit} className={cn("flex items-start gap-2.5 py-2", index < visibleBenefits.length - 1 ? styles.benefitDivider : "")}>
                        <span className={cn("mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[8px] border", styles.benefitIcon)}>
                          <Check className="size-3.5" />
                        </span>
                        <span className={styles.benefitText}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <AnimatedButton
                  href={getOfferPrimaryHref(offer)}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("premium-cta mt-4 h-11 w-full justify-between rounded-[10px] px-4 text-[0.68rem] font-bold tracking-[0.08em]", styles.cta)}
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
    </SectionShell>
  );
}
