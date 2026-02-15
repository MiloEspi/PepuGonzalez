export const WHATSAPP_NUMBER = "5492213619007";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola Pepu, quiero mi Rutina (3/4/5/6 dias) y ayuda para elegir Volumen o Definicion.";

// Reemplazar por el link real de MercadoPago para fase productiva.
export const PLAN_BASE_MERCADOPAGO_URL =
  "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=PEPU-PROGRAMA-BASE-001";

export type OfferSlug = "programa-base" | "programa-transformacion" | "plan-personalizado" | "mentoria-1-1";
export type OfferCtaType = "checkout" | "lead";
export type OfferTheme = "base" | "transformacion" | "personalizado" | "mentoria";

export interface Offer {
  slug: OfferSlug;
  title: string;
  shortLabel: string;
  strapline: string;
  pitch: string;
  benefits: string[];
  ctaLabel: string;
  ctaType: OfferCtaType;
  theme: OfferTheme;
  badgeLabel?: string;
  spotsMicrocopy?: string;
  coverImage?: string;
  featured?: boolean;
}

export const offers: Offer[] = [
  {
    slug: "programa-base",
    title: "Programa Base",
    shortLabel: "Base",
    strapline: "Una base profesional para dejar de improvisar desde la primera semana.",
    pitch: "Sistema claro de entrenamiento para ordenar habitos, progresar y construir resultados sostenibles.",
    benefits: [
      "Rutina personalizada segun tu disponibilidad",
      "Seleccion estrategica de ejercicios",
      "PDF descargable con guias claras",
      "Indicaciones de progresion semanal",
    ],
    ctaLabel: "QUIERO EMPEZAR CON EL PROGRAMA BASE",
    ctaType: "checkout",
    theme: "base",
  },
  {
    slug: "programa-transformacion",
    title: "Programa Transformacion",
    shortLabel: "Transformacion",
    strapline: "90 dias de sistema para cambiar composicion corporal con direccion real.",
    pitch: "Entrenamiento + nutricion + seguimiento para resultados visibles y sostenibles sin improvisar.",
    benefits: [
      "Entrenamiento personalizado por fases",
      "Nutricion adaptada al objetivo",
      "Ajustes mensuales segun progreso",
      "Seguimiento por WhatsApp",
    ],
    ctaLabel: "QUIERO MI TRANSFORMACION",
    ctaType: "lead",
    theme: "transformacion",
    badgeLabel: "Mas vendido",
    spotsMicrocopy: "15 cupos activos por mes",
    coverImage: "/fitness-shirtless.jpg",
    featured: true,
  },
  {
    slug: "plan-personalizado",
    title: "Plan Personalizado",
    shortLabel: "Personalizado",
    strapline: "Programa estrategico adaptado a tus horarios, objetivo y contexto real.",
    pitch: "Diseno de entrenamiento totalmente individual para progresar con criterio y foco de ejecucion.",
    benefits: [
      "Arquitectura semanal segun tu contexto real",
      "Ajustes por feedback y recuperacion",
      "Progresion especifica por objetivo",
      "Soporte directo para decisiones clave",
    ],
    ctaLabel: "QUIERO MI PLAN PERSONALIZADO",
    ctaType: "lead",
    theme: "personalizado",
    coverImage: "/fitness-shirtless.jpg",
  },
  {
    slug: "mentoria-1-1",
    title: "Mentoria 1 a 1",
    shortLabel: "Mentoria",
    strapline: "Nivel premium para quienes quieren maxima precision y acompanamiento directo.",
    pitch: "Contacto prioritario, estrategia de alto detalle y decisiones semanales para acelerar el proceso.",
    benefits: [
      "Nutricion ajustada al detalle",
      "Seguimiento semanal uno a uno",
      "Contacto prioritario directo",
      "Revision de habitos y adherencia",
    ],
    ctaLabel: "QUIERO MI ASESORIA PERSONAL",
    ctaType: "lead",
    theme: "mentoria",
    badgeLabel: "Exclusivo",
    spotsMicrocopy: "Solo 5 cupos activos",
    coverImage: "/fitness-shirtless.jpg",
  },
];

export function getOfferBySlug(slug: OfferSlug): Offer {
  const offer = offers.find((item) => item.slug === slug);
  if (!offer) {
    return offers[0];
  }
  return offer;
}

export function buildLeadMessage(planTitle: string): string {
  return `Hola Pepu, quiero aplicar a ${planTitle}. Nombre: ____ WhatsApp: ____ Objetivo: ____`;
}

export function getWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

export function getOfferPrimaryHref(offer: Offer): string {
  if (offer.ctaType === "checkout") {
    return PLAN_BASE_MERCADOPAGO_URL;
  }

  return getWhatsAppUrl(buildLeadMessage(offer.title));
}

export function getStickyWhatsAppHref(selectedPlan?: string): string {
  if (!selectedPlan?.trim()) {
    return getWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE);
  }

  return getWhatsAppUrl(`Hola Pepu, quiero informacion sobre ${selectedPlan}.`);
}
