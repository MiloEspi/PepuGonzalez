import { offers, sortOffersByDisplayOrder, type Offer, type OfferCtaType, type OfferSlug } from "@/data/offers";
import type { PlanDoc } from "@/lib/sanity";

const OFFER_SLUG_BY_TIER: Record<PlanDoc["tier"], OfferSlug> = {
  inicio: "programa-inicio",
  base: "programa-base",
  transformacion: "programa-transformacion",
  mentoria: "mentoria-1-1",
};

function formatArs(price: number): string {
  const formatter = new Intl.NumberFormat("es-AR");
  return `$${formatter.format(price)} ARS`;
}

function formatUsd(price: number): string {
  return `${price} USD`;
}

function normalizeCtaType(value?: PlanDoc["ctaType"]): OfferCtaType | undefined {
  if (value === "checkout" || value === "lead") return value;
  return undefined;
}

export function mapSanityPlansToOffers(plans: PlanDoc[]): Offer[] {
  if (!plans.length) {
    return sortOffersByDisplayOrder(offers);
  }

  const planBySlug = new Map<OfferSlug, PlanDoc>();
  for (const plan of plans) {
    planBySlug.set(OFFER_SLUG_BY_TIER[plan.tier], plan);
  }

  const mapped = offers.map((fallbackOffer) => {
    const plan = planBySlug.get(fallbackOffer.slug);
    if (!plan) return fallbackOffer;

    const ctaType = normalizeCtaType(plan.ctaType) ?? fallbackOffer.ctaType;
    const hasFeatures = Array.isArray(plan.features) && plan.features.length > 0;

    return {
      ...fallbackOffer,
      title: plan.title || fallbackOffer.title,
      strapline: plan.subtitle ?? fallbackOffer.strapline,
      pitch: plan.shortDesc || fallbackOffer.pitch,
      descriptionLong: plan.descriptionLong ?? fallbackOffer.descriptionLong,
      benefits: hasFeatures ? plan.features : fallbackOffer.benefits,
      idealFor: plan.idealFor ?? fallbackOffer.idealFor,
      resultExpected: plan.resultExpected ?? fallbackOffer.resultExpected,
      limits: plan.limits ?? fallbackOffer.limits,
      conversionFlow: plan.conversionFlow ?? fallbackOffer.conversionFlow,
      durationLabel: plan.durationLabel || fallbackOffer.durationLabel,
      priceArs: Number.isFinite(plan.priceARS) ? formatArs(plan.priceARS) : fallbackOffer.priceArs,
      priceUsd: typeof plan.priceUSD === "number" ? formatUsd(plan.priceUSD) : fallbackOffer.priceUsd,
      ctaLabel: plan.ctaLabel ?? fallbackOffer.ctaLabel,
      ctaType,
      checkoutUrl: ctaType === "checkout" ? plan.checkoutUrl ?? fallbackOffer.checkoutUrl : undefined,
      badgeLabel: plan.badgeLabel ?? fallbackOffer.badgeLabel,
      surveyStatement: plan.conversionFlow ?? fallbackOffer.surveyStatement,
      featuredTagline: plan.conversionFlow ?? fallbackOffer.featuredTagline,
      spotsMicrocopy: plan.limits ?? fallbackOffer.spotsMicrocopy,
      coverImage: plan.imageUrl || fallbackOffer.coverImage,
      featured: typeof plan.isFeatured === "boolean" ? plan.isFeatured : fallbackOffer.featured,
    };
  });

  return sortOffersByDisplayOrder(mapped);
}
