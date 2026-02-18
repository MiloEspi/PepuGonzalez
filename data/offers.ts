import { PROGRAMAS, TABLA_COMPARATIVA, type ProgramaTier } from "@/data/programas";

export const WHATSAPP_NUMBER = "5492213619007";

// Reemplazar por links reales de MercadoPago para fase productiva.
export const PLAN_INICIO_MERCADOPAGO_URL =
  "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=PEPU-PROGRAMA-INICIO-001";
export const PLAN_BASE_MERCADOPAGO_URL =
  "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=PEPU-PROGRAMA-BASE-001";

export type OfferSlug = "programa-inicio" | "programa-base" | "programa-transformacion" | "mentoria-1-1";
export type OfferDetailSlug = "inicio" | "base" | "transformacion" | "mentoria";
export type OfferCtaType = "checkout" | "lead";
export type OfferTheme = "inicio" | "base" | "transformacion" | "mentoria";

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
  descriptionLong: string;
  benefits: string[];
  idealFor: string;
  resultExpected?: string;
  limits?: string;
  conversionFlow?: string;
  durationLabel: string;
  priceArs: string;
  priceUsd: string;
  pricingNote?: string;
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

export const OFFER_DISPLAY_ORDER: OfferSlug[] = ["programa-inicio", "programa-base", "programa-transformacion", "mentoria-1-1"];

const OFFER_DETAIL_SLUG_BY_OFFER_SLUG: Record<OfferSlug, OfferDetailSlug> = {
  "programa-inicio": "inicio",
  "programa-base": "base",
  "programa-transformacion": "transformacion",
  "mentoria-1-1": "mentoria",
};

const OFFER_SLUG_BY_DETAIL_SLUG: Record<OfferDetailSlug, OfferSlug> = {
  inicio: "programa-inicio",
  base: "programa-base",
  transformacion: "programa-transformacion",
  mentoria: "mentoria-1-1",
};

const OFFER_SLUG_BY_TIER: Record<ProgramaTier, OfferSlug> = {
  inicio: "programa-inicio",
  base: "programa-base",
  transformacion: "programa-transformacion",
  mentoria: "mentoria-1-1",
};

const OFFER_SHORT_LABEL_BY_TIER: Record<ProgramaTier, string> = {
  inicio: "Inicio",
  base: "Base",
  transformacion: "Transformación",
  mentoria: "Mentoría",
};

const OFFER_IMAGE_BY_SLUG: Record<OfferSlug, string> = {
  "programa-inicio": "/programa-inicio.jpg",
  "programa-base": "/programa-base.jpg",
  "programa-transformacion": "/DSC02489.jpg",
  "mentoria-1-1": "/DSC02498.jpg",
};

function getComparisonValue(label: string, tier: ProgramaTier): string {
  const row = TABLA_COMPARATIVA.find((item) => item.label === label);
  if (!row) return "";
  return row[tier];
}

function getComparisonByTier(tier: ProgramaTier): OfferComparison {
  return {
    duration: getComparisonValue("Duración", tier),
    personalization: getComparisonValue("Nivel de personalización", tier),
    nutrition: getComparisonValue("Plan nutricional", tier),
    followUp: getComparisonValue("Seguimiento", tier),
    whatsappSupport: getComparisonValue("Soporte WhatsApp", tier),
    idealFor: getComparisonValue("Ideal para", tier),
  };
}

function getPitchFromDescription(descriptionLong: string): string {
  const lines = descriptionLong
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.slice(0, 3).join(" ");
}

export const offers: Offer[] = PROGRAMAS.map((programa) => {
  const slug = OFFER_SLUG_BY_TIER[programa.tier];
  return {
    slug,
    title: programa.title,
    shortLabel: OFFER_SHORT_LABEL_BY_TIER[programa.tier],
    strapline: programa.subtitle ?? "",
    pitch: getPitchFromDescription(programa.descriptionLong),
    descriptionLong: programa.descriptionLong,
    benefits: programa.includes,
    idealFor: programa.idealFor,
    resultExpected: programa.resultExpected,
    limits: programa.limits,
    conversionFlow: programa.conversionFlow,
    durationLabel: getComparisonByTier(programa.tier).duration,
    priceArs: programa.pricing.ars ?? "Consultar",
    priceUsd: programa.pricing.usd ?? "Consultar",
    pricingNote: programa.pricing.note,
    surveyStatement: programa.conversionFlow,
    featuredTagline: programa.conversionFlow,
    ctaLabel: programa.ctaLabel,
    ctaType: programa.tier === "inicio" || programa.tier === "base" ? "checkout" : "lead",
    theme: programa.tier,
    comparison: getComparisonByTier(programa.tier),
    badgeLabel: programa.badges?.[0],
    spotsMicrocopy: programa.limits,
    coverImage: OFFER_IMAGE_BY_SLUG[slug],
    featured: programa.tier === "transformacion",
  };
});

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

export function getOfferPrimaryHref(offer: Offer): string {
  if (offer.ctaType === "checkout") {
    if (offer.slug === "programa-inicio") return PLAN_INICIO_MERCADOPAGO_URL;
    return PLAN_BASE_MERCADOPAGO_URL;
  }

  return getWhatsAppUrl(buildLeadMessage({ planTitle: offer.title }));
}

export function getStickyWhatsAppHref(selectedPlan?: string): string {
  return getWhatsAppUrl(buildLeadMessage({ planTitle: selectedPlan }));
}

export function getOfferDetailSlug(offerSlug: OfferSlug): OfferDetailSlug {
  return OFFER_DETAIL_SLUG_BY_OFFER_SLUG[offerSlug];
}

export function getOfferDetailHref(offerSlug: OfferSlug): `/programas/${OfferSlug}` {
  return `/programas/${offerSlug}`;
}

export function getOfferByDetailSlug(detailSlug: string): Offer | undefined {
  const offerSlug = OFFER_SLUG_BY_DETAIL_SLUG[detailSlug as OfferDetailSlug];
  if (!offerSlug) return undefined;
  return offers.find((offer) => offer.slug === offerSlug);
}
