export const WHATSAPP_NUMBER = "5492213619007";

// Reemplazar por links reales de MercadoPago para fase productiva.
export const PLAN_INICIO_MERCADOPAGO_URL =
  "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=PEPU-PROGRAMA-INICIO-001";
export const PLAN_BASE_MERCADOPAGO_URL =
  "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=PEPU-PROGRAMA-BASE-001";

export type OfferSlug = "programa-inicio" | "programa-base" | "programa-transformacion" | "mentoria-1-1";
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

export const offers: Offer[] = [
  {
    slug: "programa-inicio",
    title: "PROGRAMA INICIO",
    shortLabel: "Inicio",
    strapline: "El punto de partida correcto lo cambia todo.",
    pitch:
      "La mayoria empieza mal: entrena sin estructura, copia rutinas y no entiende progresion. El problema no es motivacion. Es la base. Este programa esta diseñado para que empieces bien desde el primer dia.",
    benefits: [
      "Rutina adaptativa 3-4 dias",
      "Explicacion clara de ejercicios",
      "Guia basica de tecnica",
      "Progresion estructurada",
      "PDF profesional descargable",
      "Recomendaciones nutricionales basicas",
      "Enfoque en base muscular",
    ],
    durationLabel: "6-8 semanas",
    priceArs: "$29.900 ARS",
    priceUsd: "29 USD",
    ctaLabel: "QUIERO EMPEZAR CON BASE SOLIDA",
    ctaType: "checkout",
    theme: "inicio",
    badgeLabel: "Inicio",
    spotsMicrocopy: "Ideal para salir del caos y entrenar con estructura.",
    coverImage: "/programa-inicio.jpg",
    comparison: {
      duration: "6-8 semanas",
      personalization: "Adaptado inicial",
      nutrition: "Recomendaciones basicas",
      followUp: "No",
      whatsappSupport: "No",
      idealFor: "Construir base",
    },
  },
  {
    slug: "programa-base",
    title: "Programa Base",
    shortLabel: "Base",
    strapline: "Estructura para progresar en serio sin depender de seguimiento constante.",
    pitch:
      "Pensado para quienes ya entrenan y necesitan un sistema claro para sostener progreso durante 8 a 12 semanas.",
    benefits: [
      "Plan de entrenamiento adaptado a tu objetivo",
      "Progresion semanal estructurada",
      "Bloques de fuerza e hipertrofia ordenados",
      "Indicaciones tecnicas claras",
      "PDF profesional descargable",
      "Recomendaciones nutricionales practicas",
      "Sin seguimiento constante",
    ],
    durationLabel: "8-12 semanas",
    priceArs: "$49.900 ARS",
    priceUsd: "49 USD",
    ctaLabel: "QUIERO EMPEZAR CON EL PROGRAMA BASE",
    ctaType: "checkout",
    theme: "base",
    spotsMicrocopy: "Estructura profesional para entrenar por cuenta propia.",
    coverImage: "/programa-base.jpg",
    comparison: {
      duration: "8-12 semanas",
      personalization: "Personalizado estructurado",
      nutrition: "Recomendaciones generales",
      followUp: "No",
      whatsappSupport: "Limitado",
      idealFor: "Progresar fuerte",
    },
  },
  {
    slug: "programa-transformacion",
    title: "90 DIAS PARA CAMBIAR TU FISICO",
    shortLabel: "Transformacion",
    strapline: "Programa Transformacion",
    pitch:
      "Plan 100% personalizado a traves de encuesta estrategica inicial para construir un cambio real en 90 dias.",
    benefits: [
      "Entrenamiento completamente personalizado",
      "Encuesta detallada inicial",
      "Plan nutricional completo",
      "Ajustes cada 30 dias",
      "Seguimiento mensual",
      "Evaluacion de progreso",
      "Soporte por WhatsApp",
    ],
    durationLabel: "90 dias",
    priceArs: "$119.900 ARS",
    priceUsd: "119 USD",
    surveyStatement: "Se envia encuesta detallada para diseñar tu plan completamente adaptado.",
    featuredTagline: "Plan 100% personalizado a traves de encuesta estrategica inicial.",
    ctaLabel: "QUIERO MI TRANSFORMACION 100% PERSONALIZADA",
    ctaType: "lead",
    theme: "transformacion",
    badgeLabel: "Mas elegido",
    spotsMicrocopy: "Cupos limitados por cohorte mensual.",
    coverImage: "/DSC02489.jpg",
    featured: true,
    comparison: {
      duration: "90 dias",
      personalization: "100% personalizado",
      nutrition: "Plan completo",
      followUp: "Mensual",
      whatsappSupport: "Si",
      idealFor: "Cambio en 90 dias",
    },
  },
  {
    slug: "mentoria-1-1",
    title: "Mentoria 1 a 1",
    shortLabel: "Mentoria",
    strapline: "Maximo nivel de acompañamiento premium.",
    pitch:
      "Proceso 1 a 1 con seguimiento semanal, ajustes constantes y contacto directo prioritario para rendimiento alto.",
    benefits: [
      "Entrenamiento personalizado",
      "Nutricion ajustada semanal",
      "Seguimiento semanal uno a uno",
      "Ajustes constantes",
      "Contacto directo prioritario",
    ],
    durationLabel: "3 meses",
    priceArs: "$279.900 ARS",
    priceUsd: "299 USD",
    ctaLabel: "QUIERO LA MENTORIA 1 A 1",
    ctaType: "lead",
    theme: "mentoria",
    badgeLabel: "Premium",
    spotsMicrocopy: "Solo 5 cupos activos",
    coverImage: "/DSC02498.jpg",
    comparison: {
      duration: "3 meses",
      personalization: "Personalizacion total + ajustes constantes",
      nutrition: "Nutricion ajustada semanal",
      followUp: "Semanal",
      whatsappSupport: "Prioritario",
      idealFor: "Optimizacion total",
    },
  },
];

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

