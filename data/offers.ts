import {
  PROGRAMA_COLUMN_ORDER,
  PROGRAMA_COMPARISON_ROWS,
  PROGRAMAS,
  type ProgramaTier,
  getProgramaSummary,
} from "@/data/programas";

export const WHATSAPP_NUMBER = "5492213619007";

export const OFFER_DISPLAY_ORDER = ["programa-inicio", "programa-base", "programa-transformacion", "mentoria-1-1"] as const;

export type OfferSlug = (typeof OFFER_DISPLAY_ORDER)[number];
export type OfferCtaType = "checkout" | "lead";
export type OfferTheme = ProgramaTier;

export interface OfferComparison {
  duration: string;
  personalization: string;
  nutrition: string;
  followUp: string;
  whatsappSupport: string;
  idealFor: string;
}

export interface Offer {
  slug: OfferSlug;
  title: string;
  shortLabel: string;
  strapline: string;
  pitch: string;
  benefits: string[];
  durationLabel: string;
  priceArs: string;
  priceUsd: string;
  surveyStatement?: string;
  featuredTagline?: string;
  ctaLabel: string;
  ctaType: OfferCtaType;
  theme: OfferTheme;
  comparison: OfferComparison;
  badgeLabel?: string;
  spotsMicrocopy?: string;
  coverImage?: string;
  featured?: boolean;
}

export interface WhatsAppLeadPayload {
  planTitle?: string;
  firstName?: string;
  lastName?: string;
  objective?: string;
  trainingDays?: string;
  experience?: string;
}

const OFFER_SHORT_LABELS: Record<OfferTheme, string> = {
  inicio: "Inicio",
  base: "Base",
  transformacion: "Transformación",
  mentoria: "Mentoría",
};

const OFFER_COVER_IMAGE_BY_SLUG: Partial<Record<OfferSlug, string>> = {
  "programa-inicio": "/programa-inicio.jpg",
  "programa-base": "/programa-base.jpg",
  "programa-transformacion": "/DSC02489.jpg",
  "mentoria-1-1": "/DSC02498.jpg",
};

function getComparisonValue(label: keyof OfferComparison, tier: OfferTheme): string {
  const labelMap: Record<keyof OfferComparison, string> = {
    duration: "Duración",
    personalization: "Nivel de personalización",
    nutrition: "Plan nutricional",
    followUp: "Seguimiento",
    whatsappSupport: "Soporte WhatsApp",
    idealFor: "Ideal para",
  };

  const row = PROGRAMA_COMPARISON_ROWS.find((item) => item.label === labelMap[label]);
  if (!row) return "";
  return row.values[tier];
}

function getOfferSlugByTier(tier: OfferTheme): OfferSlug {
  if (tier === "inicio") return "programa-inicio";
  if (tier === "base") return "programa-base";
  if (tier === "transformacion") return "programa-transformacion";
  return "mentoria-1-1";
}

function mapProgramaToOffer(tier: OfferTheme): Offer {
  const programa = PROGRAMAS.find((item) => item.tier === tier);
  if (!programa) {
    throw new Error(`No se encontró programa para tier "${tier}"`);
  }

  return {
    slug: getOfferSlugByTier(tier),
    title: programa.title,
    shortLabel: OFFER_SHORT_LABELS[tier],
    strapline: programa.subtitle,
    pitch: getProgramaSummary(programa, 2),
    benefits: programa.includes,
    durationLabel: getComparisonValue("duration", tier),
    priceArs: programa.pricing.ars ?? "Consultar",
    priceUsd: programa.pricing.usd ?? "Consultar",
    surveyStatement: tier === "transformacion" ? programa.conversionFlow : undefined,
    featuredTagline: tier === "transformacion" ? programa.conversionFlow : undefined,
    ctaLabel: programa.ctaLabel,
    ctaType: tier === "inicio" || tier === "base" ? "checkout" : "lead",
    theme: tier,
    comparison: {
      duration: getComparisonValue("duration", tier),
      personalization: getComparisonValue("personalization", tier),
      nutrition: getComparisonValue("nutrition", tier),
      followUp: getComparisonValue("followUp", tier),
      whatsappSupport: getComparisonValue("whatsappSupport", tier),
      idealFor: getComparisonValue("idealFor", tier),
    },
    badgeLabel: programa.badges[0],
    spotsMicrocopy: programa.limits,
    coverImage: OFFER_COVER_IMAGE_BY_SLUG[getOfferSlugByTier(tier)],
    featured: tier === "transformacion",
  };
}

export const offers: Offer[] = PROGRAMA_COLUMN_ORDER.map(mapProgramaToOffer);

export function sortOffersByDisplayOrder<T extends { slug: OfferSlug }>(items: T[]): T[] {
  const orderRank = new Map(OFFER_DISPLAY_ORDER.map((slug, index) => [slug, index]));
  return [...items].sort((a, b) => (orderRank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (orderRank.get(b.slug) ?? Number.MAX_SAFE_INTEGER));
}

export function getOfferBySlug(slug: OfferSlug): Offer {
  const offer = offers.find((item) => item.slug === slug);
  if (!offer) {
    return offers[0];
  }
  return offer;
}

function normalizeLeadValue(value?: string): string {
  return value?.trim() ?? "";
}

export function buildLeadMessage(payload: WhatsAppLeadPayload = {}): string {
  const planTitle = normalizeLeadValue(payload.planTitle);

  if (!planTitle) {
    return [
      "Hola Pepu, estoy interesado en el plan:",
      "",
      "---",
      "Nombre:",
      "Apellido:",
      "",
      "---",
      "Me contas los pasos para empezar?",
    ].join("\n");
  }

  return [
    `Hola Pepu, estoy interesado en el plan: ${planTitle}`,
    "",
    "---",
    `Nombre: ${normalizeLeadValue(payload.firstName)}`,
    `Apellido: ${normalizeLeadValue(payload.lastName)}`,
    `Objetivo: ${normalizeLeadValue(payload.objective)}`,
    `Dias de entrenamiento: ${normalizeLeadValue(payload.trainingDays)}`,
    `Experiencia: ${normalizeLeadValue(payload.experience)}`,
    "",
    "---",
    "Me contas los pasos para empezar?",
  ].join("\n");
}

export function getWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

export function getStickyWhatsAppHref(selectedPlan?: string): string {
  return getWhatsAppUrl(buildLeadMessage({ planTitle: selectedPlan }));
}
