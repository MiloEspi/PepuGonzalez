export type ProgramaTier = "base" | "transformacion" | "mentoria";

export interface ProgramaPricing {
  ars?: string;
  note?: string;
}

export interface Programa {
  slug: string;
  tier: ProgramaTier;
  title: string;
  subtitle?: string;
  descriptionLong: string;
  includes: string[];
  idealFor: string;
  resultExpected?: string;
  ctaLabel: string;
  pricing: ProgramaPricing;
  badges?: string[];
  limits?: string;
  conversionFlow?: string;
}

export interface TablaComparativaRow {
  label: string;
  base: string;
  transformacion: string;
  mentoria: string;
}

export type TablaComparativa = TablaComparativaRow[];

function assertUniqueSlugs(programas: Programa[]): Programa[] {
  const seen = new Set<string>();
  for (const programa of programas) {
    if (seen.has(programa.slug)) {
      throw new Error(`Slug duplicado en PROGRAMAS: ${programa.slug}`);
    }
    seen.add(programa.slug);
  }
  return programas;
}

export const PROGRAMAS: Programa[] = assertUniqueSlugs([
  {
    slug: "programa-base",
    tier: "base",
    title: "PROGRAMA BASE",
    subtitle: "Construí tu Mejor Versión",
    descriptionLong:
      "No es una rutina más.\nEs el punto donde empezás a progresar en serio.\nSi estás cansado de entrenar sin saber si lo estás haciendo bien, este programa te da estructura, dirección y claridad.\nEs el sistema ideal para dejar de improvisar.",
    includes: [
      "Rutina personalizada (3 a 6 días)",
      "Selección estratégica de ejercicios",
      "Progresión semanal estructurada",
      "Volumen e intensidad optimizados",
      "Indicaciones técnicas detalladas",
      "PDF profesional descargable",
      "Posibilidad de actualización mensual",
    ],
    idealFor: "Personas que quieren entrenar con método profesional sin necesidad de seguimiento constante.",
    ctaLabel: "COMPRAR AHORA",
    pricing: {
      ars: "$34.900 ARS",
    },
  },
  {
    slug: "programa-transformacion",
    tier: "transformacion",
    title: "PROGRAMA TRANSFORMACIÓN",
    subtitle: "90 DÍAS PARA CAMBIAR TU FÍSICO (CUPOS LIMITADOS)",
    descriptionLong:
      "Acá no solo entrenás.\nAcá evolucionás.\nEste programa está diseñado para generar un antes y un después real.\nSi querés resultados visibles y medibles, necesitás estrategia + nutrición + seguimiento.\nY eso es exactamente lo que incluye.\nLos cupos son limitados porque el seguimiento es personalizado.",
    includes: [
      "Entrenamiento completamente personalizado",
      "Plan de alimentación adaptado a tu objetivo",
      "Ajustes cada 30 días",
      "Seguimiento mensual",
      "Evaluación de progreso",
      "Soporte por WhatsApp",
      "Prioridad en actualizaciones",
    ],
    idealFor: "Personas comprometidas que quieren un cambio real en 90 días.",
    ctaLabel: "QUIERO MI TRANSFORMACIÓN",
    pricing: {
      ars: "$119.900 ARS",
    },
    badges: ["Más elegido"],
    limits: "Cupos limitados a 15 por mes.",
    conversionFlow: "Trabajo con cupos limitados para mantener calidad real en cada seguimiento.",
  },
  {
    slug: "mentoria-1-1",
    tier: "mentoria",
    title: "MENTORÍA 1 A 1",
    subtitle: "ALTO RENDIMIENTO",
    descriptionLong:
      "El nivel más alto de acompañamiento.\nEsto no es un plan.\nEs un proceso personalizado conmigo.\nIdeal para quienes quieren llevar su físico al máximo nivel y tener ajustes constantes, contacto directo y estrategia completa.\nAcá no improvisamos.\nConstruimos.",
    includes: [
      "Entrenamiento totalmente personalizado",
      "Nutrición ajustada al detalle",
      "Seguimiento semanal",
      "Ajustes estratégicos continuos",
      "Análisis técnico de progreso",
      "Contacto directo prioritario",
      "Soporte completo por WhatsApp",
    ],
    idealFor:
      "Ideal para quienes quieren llevar su físico al máximo nivel y tener ajustes constantes, contacto directo y estrategia completa.",
    ctaLabel: "QUIERO MI ASESORÍA PERSONAL",
    pricing: {
      ars: "$247.900 ARS",
    },
    limits: "Solo 5 cupos activos.",
  },
]);

export const TABLA_COMPARATIVA: TablaComparativa = [
  {
    label: "Duración",
    base: "8–12 semanas",
    transformacion: "90 días",
    mentoria: "3 meses",
  },
  {
    label: "Nivel de personalización",
    base: "Personalizado estructurado",
    transformacion: "100% personalizado",
    mentoria: "Personalización total + ajustes constantes",
  },
  {
    label: "Plan nutricional",
    base: "Recomendaciones generales",
    transformacion: "Plan completo",
    mentoria: "Nutrición ajustada semanal",
  },
  {
    label: "Seguimiento",
    base: "No",
    transformacion: "Mensual",
    mentoria: "Semanal",
  },
  {
    label: "Soporte WhatsApp",
    base: "Limitado",
    transformacion: "Sí",
    mentoria: "Prioritario",
  },
  {
    label: "Ideal para",
    base: "Progresar fuerte",
    transformacion: "Cambio en 90 días",
    mentoria: "Optimización total",
  },
];

export function getProgramaBySlug(slug: string): Programa | undefined {
  return PROGRAMAS.find((programa) => programa.slug === slug);
}
