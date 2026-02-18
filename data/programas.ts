export type ProgramaTier = "inicio" | "base" | "transformacion" | "mentoria";

export interface ProgramaPricing {
  ars?: string;
  usd?: string;
  note?: string;
}

export interface Programa {
  slug: string;
  tier: ProgramaTier;
  title: string;
  subtitle: string;
  descriptionLong: string;
  includes: string[];
  idealFor: string;
  resultExpected?: string;
  ctaLabel: string;
  pricing: ProgramaPricing;
  badges: string[];
  limits?: string;
  conversionFlow?: string;
}

export interface ProgramaComparisonRow {
  label: string;
  values: Record<ProgramaTier, string>;
}

export const PROGRAMA_COLUMN_LABELS: Record<ProgramaTier, string> = {
  inicio: "INICIO",
  base: "BASE",
  transformacion: "TRANSFORMACIÓN",
  mentoria: "MENTORÍA",
};

export const PROGRAMA_COLUMN_ORDER: ProgramaTier[] = ["inicio", "base", "transformacion", "mentoria"];

function assertUniqueProgramaSlugs(programas: readonly Programa[]): readonly Programa[] {
  const seen = new Set<string>();
  for (const programa of programas) {
    if (seen.has(programa.slug)) {
      throw new Error(`Slug duplicado en PROGRAMAS: ${programa.slug}`);
    }
    seen.add(programa.slug);
  }
  return programas;
}

const PROGRAMAS_SOURCE: Programa[] = [
  {
    slug: "programa-inicio",
    tier: "inicio",
    title: "PROGRAMA INICIO",
    subtitle: "Fundamentos del Cambio",
    descriptionLong: `La mayoría empieza mal.
Entrena sin estructura.
Copia rutinas de internet.
No entiende progresión.
No aprende técnica.
Y después de meses… no ve cambios.
El problema no es la motivación.
Es la base.
El Programa Inicio – Fundamentos del Cambio está diseñado para que empieces bien desde el primer día.
No es una rutina improvisada.
Es un sistema guiado para que entiendas cómo entrenar, cómo progresar y cómo construir una base muscular sólida.
Acá no solo entrenás.
Aprendés a entrenar correctamente.
Porque si la base es fuerte, el crecimiento es inevitable.`,
    includes: [
      "Rutina adaptativa 3–4 días",
      "Explicación clara de cada ejercicio",
      "Guía básica de técnica y ejecución",
      "Progresión simple y estructurada",
      "PDF profesional descargable",
      "Recomendaciones nutricionales básicas",
      "Enfoque en construcción de base muscular",
    ],
    idealFor: "Personas que quieren empezar bien y evitar perder meses entrenando sin dirección.",
    resultExpected: "Construir fundamentos sólidos para luego escalar al siguiente nivel.",
    ctaLabel: "QUIERO EMPEZAR",
    pricing: {
      ars: "$29.900 ARS",
      usd: "29 USD",
    },
    badges: [],
    conversionFlow: "QUIERO EMPEZAR",
  },
  {
    slug: "programa-base",
    tier: "base",
    title: "PROGRAMA BASE",
    subtitle: "Construí tu Mejor Versión",
    descriptionLong: `No es una rutina más.
Es el punto donde empezás a progresar en serio.
Si estás cansado de entrenar sin saber si lo estás haciendo bien, este programa te da estructura, dirección y claridad.
Es el sistema ideal para dejar de improvisar.`,
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
    ctaLabel: "QUIERO EMPEZAR CON EL PROGRAMA BASE",
    pricing: {
      ars: "$49.900 ARS",
      usd: "49 USD",
    },
    badges: [],
    conversionFlow: "QUIERO EMPEZAR CON EL PROGRAMA BASE",
  },
  {
    slug: "programa-transformacion",
    tier: "transformacion",
    title: "PROGRAMA TRANSFORMACIÓN",
    subtitle: "90 días para cambiar tu físico (cupos limitados)",
    descriptionLong: `Acá no solo entrenás.
Acá evolucionás.
Este programa está diseñado para generar un antes y un después real.
Si querés resultados visibles y medibles, necesitás estrategia + nutrición + seguimiento.
Y eso es exactamente lo que incluye.
Los cupos son limitados porque el seguimiento es personalizado.`,
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
      usd: "119 USD",
    },
    badges: ["Más elegido"],
    limits: "Cupos limitados a 15 por mes.",
    conversionFlow: "Trabajo con cupos limitados para mantener calidad real en cada seguimiento.",
  },
  {
    slug: "mentoria-1-1",
    tier: "mentoria",
    title: "MENTORÍA 1 A 1",
    subtitle: "Alto rendimiento",
    descriptionLong: `El nivel más alto de acompañamiento.
Esto no es un plan.
Es un proceso personalizado conmigo.
Ideal para quienes quieren llevar su físico al máximo nivel y tener ajustes constantes, contacto directo y estrategia completa.
Acá no improvisamos.
Construimos.`,
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
      ars: "$279.900 ARS Argentina",
      usd: "299 USD internacional",
    },
    badges: [],
    limits: "Solo 5 cupos activos.",
    conversionFlow: "QUIERO MI ASESORÍA PERSONAL",
  },
];

export const PROGRAMAS = assertUniqueProgramaSlugs(PROGRAMAS_SOURCE);

export const PROGRAMA_MAS_ELEGIDO_TIER: ProgramaTier = "transformacion";

export const PROGRAMA_COMPARISON_ROWS: ProgramaComparisonRow[] = [
  {
    label: "Duración",
    values: {
      inicio: "8 semanas",
      base: "8–12 semanas",
      transformacion: "90 días",
      mentoria: "3 meses",
    },
  },
  {
    label: "Nivel de personalización",
    values: {
      inicio: "Adaptado inicial",
      base: "Personalizado estructurado",
      transformacion: "100% personalizado",
      mentoria: "Personalización total + ajustes constantes",
    },
  },
  {
    label: "Plan nutricional",
    values: {
      inicio: "Recomendaciones básicas",
      base: "Recomendaciones generales",
      transformacion: "Plan completo",
      mentoria: "Nutrición ajustada semanal",
    },
  },
  {
    label: "Seguimiento",
    values: {
      inicio: "No",
      base: "No",
      transformacion: "Mensual",
      mentoria: "Semanal",
    },
  },
  {
    label: "Soporte WhatsApp",
    values: {
      inicio: "No",
      base: "Limitado",
      transformacion: "Sí",
      mentoria: "Prioritario",
    },
  },
  {
    label: "Ideal para",
    values: {
      inicio: "Construir base",
      base: "Progresar fuerte",
      transformacion: "Cambio en 90 días",
      mentoria: "Optimización total",
    },
  },
];

export function getProgramaBySlug(slug: string): Programa | undefined {
  return PROGRAMAS.find((programa) => programa.slug === slug);
}

export function getProgramaSummary(programa: Programa, lineCount = 2): string {
  return programa.descriptionLong
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, lineCount)
    .join(" ");
}
