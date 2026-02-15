"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Check, Crown, ShieldCheck, Sparkles, Star, Target, TrendingUp, type LucideIcon } from "lucide-react";

import { SectionShell } from "@/components/site/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { offers, getOfferPrimaryHref } from "@/data/offers";
import { rememberSelectedPlan } from "@/lib/plan-interest";
import { animateFadeSlideIn, shouldReduceMotion } from "@/lib/animations";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { cn } from "@/lib/utils";

const cardGridMap = {
  "programa-base": "xl:col-span-5",
  "programa-transformacion": "xl:col-span-7",
  "plan-personalizado": "xl:col-span-6",
  "mentoria-1-1": "xl:col-span-6",
} as const;

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
      "bg-[linear-gradient(135deg,rgba(95,99,108,0.72)_0%,rgba(46,48,54,0.94)_64%,rgba(212,20,20,0.28)_100%)] shadow-[0_26px_48px_-36px_rgba(0,0,0,0.95)]",
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
      "bg-[linear-gradient(145deg,rgba(116,119,126,0.74)_0%,rgba(78,80,88,0.72)_58%,rgba(212,20,20,0.45)_100%)] shadow-[0_30px_54px_-38px_rgba(0,0,0,0.95)]",
    surface:
      "textured-metal bg-[linear-gradient(148deg,#1a1b21_0%,#121318_50%,#17181e_100%)]",
    glow:
      "bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,0.16),transparent_64%)] opacity-35 group-hover:opacity-55",
    hover: "hover:-translate-y-1.5 hover:shadow-[0_34px_58px_-34px_rgba(0,0,0,0.94)]",
    media: "border-white/16 bg-[linear-gradient(145deg,#121318_0%,#0d0e13_100%)]",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(122,14,14,0.42)_100%)]",
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
      "bg-[linear-gradient(128deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.03)_22%,rgba(255,255,255,0)_46%)]",
  },
  mentoria: {
    icon: Crown,
    outer:
      "bg-[linear-gradient(145deg,rgba(200,163,79,0.9)_0%,rgba(138,112,54,0.76)_56%,rgba(24,20,14,0.96)_100%)] shadow-[0_34px_62px_-40px_rgba(200,163,79,0.66)]",
    surface:
      "bg-[linear-gradient(150deg,#0c0c0f_0%,#101116_60%,#0d0d10_100%)] [background-image:linear-gradient(150deg,#0c0c0f_0%,#101116_60%,#0d0d10_100%),repeating-linear-gradient(132deg,rgba(255,255,255,0.014)_0_1px,transparent_1px_6px)]",
    glow:
      "bg-[radial-gradient(circle_at_18%_0%,rgba(200,163,79,0.32),transparent_62%)] opacity-40 group-hover:opacity-68",
    hover:
      "hover:-translate-y-2 hover:shadow-[0_38px_68px_-34px_rgba(200,163,79,0.72)]",
    media: "border-[#c8a34f]/55 bg-black/82",
    overlay: "bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(200,163,79,0.3)_100%)]",
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
  const cardsRef = useRef<HTMLDivElement>(null);
  const { hasEnteredView } = useInViewAnimation(cardsRef, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

  useEffect(() => {
    const container = cardsRef.current;
    if (!container || !hasEnteredView) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-reveal]");
    animateFadeSlideIn(cards, { distance: 24, duration: 520, staggerStep: 95 });
  }, [hasEnteredView]);

  const reducedMotion = shouldReduceMotion();

  return (
    <SectionShell
      id="planes"
      eyebrow="PLANES"
      title="Elegi tu nivel de acompanamiento"
      description="Programas estructurados para etapas distintas del proceso, con una misma logica: resultados medibles y sostenibles."
    >
      <div ref={cardsRef} className="grid gap-5 lg:grid-cols-2 xl:grid-cols-12">
        {offers.map((offer) => {
          const styles = themeClasses[offer.theme];
          const Icon = styles.icon;
          const imageSrc = offer.coverImage ?? PLAN_FALLBACK_IMAGE;
          const isTransformacion = offer.theme === "transformacion";
          const isMentoria = offer.theme === "mentoria";

          return (
            <article
              data-reveal
              id={`plan-${offer.slug}`}
              key={offer.slug}
              className={cn(
                "group relative overflow-hidden rounded-[10px] p-[1px] opacity-0 transition-[transform,box-shadow] duration-[240ms] ease-[var(--ease-premium)]",
                cardGridMap[offer.slug],
                styles.outer,
                styles.hover
              )}
            >
              <div className={cn("pointer-events-none absolute inset-0 -z-10 rounded-[10px] blur-2xl transition-opacity duration-250", styles.glow)} />

              <div className={cn("relative flex h-full flex-col overflow-hidden rounded-[9px] p-4 md:p-5", styles.surface)}>
                {styles.studioLight ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-70 mix-blend-screen transition-opacity duration-300 group-hover:opacity-85",
                      styles.studioLight
                    )}
                  />
                ) : null}

                <div className={cn("relative mb-5 h-44 overflow-hidden rounded-[8px] border md:h-48", styles.media)}>
                  <Image
                    src={imageSrc}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1400px) 50vw, 33vw"
                    className={cn(
                      "object-cover grayscale contrast-[1.18] brightness-[0.78] transition-transform duration-[760ms] ease-[var(--ease-premium)]",
                      reducedMotion ? "" : styles.mediaMotion
                    )}
                  />
                  <div className={cn("pointer-events-none absolute inset-0", styles.overlay)} />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.72)_100%)]" />

                  <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
                    <Badge className={cn("badge-shimmer rounded-[6px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.badge)}>
                      {offer.shortLabel}
                    </Badge>

                    {isTransformacion ? (
                      <Badge className={cn("rounded-[6px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.accentBadge)}>
                        <Star className="size-3.5" />
                        MAS VENDIDO
                      </Badge>
                    ) : null}

                    {isMentoria ? (
                      <Badge className={cn("rounded-[6px] border px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em]", styles.accentBadge)}>
                        <Sparkles className="size-3.5" />
                        Solo 5 cupos
                      </Badge>
                    ) : null}

                    {!isTransformacion && !isMentoria && offer.badgeLabel ? (
                      <Badge className={cn("rounded-[6px] border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]", styles.accentBadge)}>
                        {offer.badgeLabel}
                      </Badge>
                    ) : null}
                  </div>

                  <span className={cn("absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-[6px] border", styles.iconWrap)}>
                    <Icon className={cn("size-4", styles.iconTone)} />
                  </span>
                </div>

                <h3 className={cn(styles.title, styles.titleHover ? `transition-transform duration-200 ${styles.titleHover}` : "")}>{offer.title}</h3>
                <p className={styles.strapline}>{offer.strapline}</p>
                <p className={styles.pitch}>{offer.pitch}</p>

                {offer.spotsMicrocopy && !isMentoria ? (
                  <p className={cn("mt-3 inline-flex w-fit items-center gap-1 rounded-[6px] border px-2.5 py-1 text-xs font-medium", styles.microcopy)}>
                    {offer.spotsMicrocopy}
                  </p>
                ) : null}

                <ul className="mt-5">
                  {offer.benefits.map((benefit, index) => (
                    <li key={benefit} className={cn("flex items-start gap-3 py-2.5", index < offer.benefits.length - 1 ? styles.benefitDivider : "")}>
                      <span className={cn("mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-[6px] border", styles.benefitIcon)}>
                        <Check className="size-3.5" />
                      </span>
                      <span className={styles.benefitText}>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild size="lg" className={cn("premium-cta mt-6 h-11 w-full justify-between rounded-[8px] px-4 text-[0.69rem] font-bold tracking-[0.08em]", styles.cta)}>
                  <Link href={getOfferPrimaryHref(offer)} target="_blank" rel="noreferrer" onClick={() => rememberSelectedPlan(offer.title)}>
                    <span className="pr-2 text-left leading-[1.2]">{offer.ctaLabel}</span>
                    <ArrowRight className="premium-arrow size-4 shrink-0" />
                  </Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8">
        <Button asChild variant="outline" className="premium-cta rounded-[8px] border-white/18 bg-black/38 px-5">
          <Link href="/planes">Ver catalogo completo</Link>
        </Button>
      </div>
    </SectionShell>
  );
}
