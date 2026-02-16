export const WHATSAPP_NUMBER = "5492213619007";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola Pepu, quiero evaluar el programa correcto para mi objetivo.";

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
    strapline: "Construi tu mejor version.",
    pitch: "No es una rutina mas. Es el punto donde empezas a progresar en serio.",
    benefits: [
      "Rutina personalizada (3 a 6 dias)",
      "Seleccion estrategica de ejercicios",
      "Progresion semanal estructurada",
      "Volumen e intensidad optimizados",
      "Indicaciones tecnicas detalladas",
      "PDF profesional descargable",
      "Posibilidad de actualizacion mensual",
    ],
    ctaLabel: "QUIERO EMPEZAR CON EL PROGRAMA BASE",
    ctaType: "checkout",
    theme: "base",
    spotsMicrocopy: "Ingreso limitado por semana.",
  },
  {
    slug: "programa-transformacion",
    title: "90 DIAS PARA CAMBIAR TU FISICO",
    shortLabel: "Transformacion",
    strapline: "Aca no solo entrenas. Aca evolucionas.",
    pitch: "Proceso estructurado para cambios visibles con entrenamiento, nutricion y control mensual.",
    benefits: [
      "Entrenamiento completamente personalizado",
      "Plan de alimentacion adaptado",
      "Ajustes cada 30 dias",
      "Seguimiento mensual",
      "Evaluacion de progreso",
      "Soporte por WhatsApp",
      "Prioridad en actualizaciones",
    ],
    ctaLabel: "QUIERO MI TRANSFORMACION",
    ctaType: "lead",
    theme: "transformacion",
    badgeLabel: "Mas elegido",
    spotsMicrocopy: "Cupos limitados por cohorte mensual.",
    coverImage: "/fitness-shirtless.jpg",
    featured: true,
  },
  {
    slug: "plan-personalizado",
    title: "Plan Personalizado",
    shortLabel: "Personalizado",
    strapline: "Diseno de precision adaptado a tu contexto real.",
    pitch: "Estrategia individual para quienes necesitan criterio fino en cada decision de entrenamiento.",
    benefits: [
      "Arquitectura semanal segun tu contexto real",
      "Ajustes por feedback y recuperacion",
      "Progresion especifica por objetivo",
      "Soporte directo para decisiones clave",
    ],
    ctaLabel: "QUIERO MI PLAN DE PRECISION",
    ctaType: "lead",
    theme: "personalizado",
    coverImage: "/fitness-shirtless.jpg",
    spotsMicrocopy: "Cupos reducidos para trabajo personalizado.",
  },
  {
    slug: "mentoria-1-1",
    title: "Mentoria 1 a 1",
    shortLabel: "Mentoria",
    strapline: "El nivel mas alto de acompanamiento.",
    pitch: "Esto no es un plan. Es un proceso personalizado conmigo para alto rendimiento.",
    benefits: [
      "Entrenamiento totalmente personalizado",
      "Nutricion ajustada al detalle",
      "Seguimiento semanal uno a uno",
      "Ajustes estrategicos continuos",
      "Analisis tecnico",
      "Contacto directo prioritario",
      "Soporte completo por WhatsApp",
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
  return `Hola Pepu, quiero aplicar a ${planTitle}. Nombre: ____ WhatsApp: ____ Objetivo: ____ Disponibilidad: ____`;
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

  return getWhatsAppUrl(`Hola Pepu, quiero aplicar a ${selectedPlan}.`);
}
