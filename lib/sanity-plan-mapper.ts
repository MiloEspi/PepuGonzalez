import { sortOffersByDisplayOrder, type Offer, type OfferComparison, type OfferSlug, type OfferTheme } from "@/data/offers";
import type { PlanDoc } from "@/lib/sanity";

type TierConfig = {
  slug: OfferSlug;
  theme: OfferTheme;
  shortLabel: string;
  badgeLabel?: string;
  strapline: string;
  comparison: OfferComparison;
};

const TIER_CONFIG: Record<PlanDoc["tier"], TierConfig> = {
  inicio: {
    slug: "programa-inicio",
    theme: "inicio",
    shortLabel: "Inicio",
    badgeLabel: "Inicio",
    strapline: "El punto de partida correcto lo cambia todo.",
    comparison: {
      duration: "6-8 semanas",
      personalization: "Adaptado inicial",
      nutrition: "Recomendaciones basicas",
      followUp: "No",
      whatsappSupport: "No",
      idealFor: "Construir base",
    },
  },
  base: {
    slug: "programa-base",
    theme: "base",
    shortLabel: "Base",
    badgeLabel: "Base",
    strapline: "Estructura para progresar en serio sin depender de seguimiento constante.",
    comparison: {
      duration: "8-12 semanas",
      personalization: "Personalizado estructurado",
      nutrition: "Recomendaciones generales",
      followUp: "No",
      whatsappSupport: "Limitado",
      idealFor: "Progresar fuerte",
    },
  },
  transformacion: {
    slug: "programa-transformacion",
    theme: "transformacion",
    shortLabel: "Transformacion",
    badgeLabel: "Mas elegido",
    strapline: "90 dias para cambiar tu fisico",
    comparison: {
      duration: "90 dias",
      personalization: "100% personalizado",
      nutrition: "Plan completo",
      followUp: "Mensual",
      whatsappSupport: "Si",
      idealFor: "Cambio en 90 dias",
    },
  },
  mentoria: {
    slug: "mentoria-1-1",
    theme: "mentoria",
    shortLabel: "Mentoria",
    badgeLabel: "Premium",
    strapline: "Maximo nivel de acompanamiento premium.",
    comparison: {
      duration: "3 meses",
      personalization: "Personalizacion total + ajustes constantes",
      nutrition: "Nutricion ajustada semanal",
      followUp: "Semanal",
      whatsappSupport: "Prioritario",
      idealFor: "Optimizacion total",
    },
  },
};

function formatArs(value: number): string {
  return `$${new Intl.NumberFormat("es-AR").format(Math.trunc(value))} ARS`;
}

function formatUsd(value?: number): string {
  if (typeof value !== "number") return "Consultar";
  return `${Math.trunc(value)} USD`;
}

function buildOfferFromPlan(plan: PlanDoc): Offer {
  const config = TIER_CONFIG[plan.tier];
  const normalizedFeatures = plan.features.filter(Boolean).slice(0, 8);

  return {
    slug: config.slug,
    title: plan.title,
    shortLabel: config.shortLabel,
    strapline: plan.subtitle?.trim() ? plan.subtitle : config.strapline,
    pitch: plan.shortDesc,
    benefits: normalizedFeatures,
    durationLabel: plan.durationLabel,
    priceArs: formatArs(plan.priceARS),
    priceUsd: formatUsd(plan.priceUSD),
    ctaLabel: `QUIERO ${plan.title.toUpperCase()}`,
    ctaType: plan.tier === "inicio" || plan.tier === "base" ? "checkout" : "lead",
    theme: config.theme,
    comparison: {
      ...config.comparison,
      duration: plan.durationLabel,
    },
    badgeLabel: config.badgeLabel,
    coverImage: plan.imageUrl,
    featured: Boolean(plan.isFeatured),
  };
}

export function mapSanityPlansToOffers(plans: PlanDoc[]): Offer[] {
  const byTier = new Map<PlanDoc["tier"], PlanDoc>();

  plans.forEach((plan) => {
    if (!byTier.has(plan.tier)) byTier.set(plan.tier, plan);
  });

  return sortOffersByDisplayOrder(Array.from(byTier.values()).map(buildOfferFromPlan));
}
