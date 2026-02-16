export const WHATSAPP_NUMBER = "5492213619007";
export const WHATSAPP_DIRECT_URL =
  "https://api.whatsapp.com/send/?phone=5492213619007&text=Hola+Pepu%2C+quiero+mi+Rutina+%283%2F4%2F5%2F6+d%C3%ADas%29+y+ayuda+para+elegir+Volumen+o+Definici%C3%B3n.&type=phone_number&app_absent=0";

export type Goal = "definicion" | "volumen" | "rendimiento";
export type Level = "principiante" | "intermedio" | "avanzado";
export type TrainingPlace = "gym" | "casa";
export type DaysPerWeek = 3 | 4 | 5;

export interface PlanFaq {
  question: string;
  answer: string;
}

export interface Plan {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  goal: Goal;
  level: Level;
  daysPerWeek: DaysPerWeek;
  trainingPlace: TrainingPlace;
  includes: string[];
  forWho: string[];
  notFor: string[];
  faqs: PlanFaq[];
  priceLabel: string;
  whatsappMessage: string;
  featured?: boolean;
}

export const GOAL_LABELS: Record<Goal, string> = {
  definicion: "Definicion",
  volumen: "Volumen",
  rendimiento: "Rendimiento",
};

export const LEVEL_LABELS: Record<Level, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export const TRAINING_PLACE_LABELS: Record<TrainingPlace, string> = {
  gym: "Gym",
  casa: "Casa",
};

export const plans: Plan[] = [
  {
    slug: "recomp-3d-base",
    title: "Recomp 3D Base",
    tagline: "Perde grasa y gana forma sin vivir en el gym.",
    description:
      "Plan de entrada con progresion clara, ideal para ordenar habitos y ver resultados en pocas semanas.",
    goal: "definicion",
    level: "principiante",
    daysPerWeek: 3,
    trainingPlace: "gym",
    includes: [
      "Rutina full body de 3 dias con progresion semanal",
      "Video guia de tecnica para ejercicios clave",
      "Checklist semanal de adherencia y descanso",
      "Soporte por WhatsApp para ajustes rapidos",
    ],
    forWho: [
      "Personas que arrancan desde cero o vuelven despues de mucho tiempo",
      "Quienes quieren bajar grasa sin hacer rutinas eternas",
    ],
    notFor: [
      "Atletas avanzados que buscan alto volumen de entrenamiento",
      "Quienes no pueden sostener al menos 3 dias por semana",
    ],
    faqs: [
      {
        question: "Cuanto tarda en verse el cambio?",
        answer:
          "Si seguis el plan y nutricion basica, la mayoria nota cambios entre la semana 3 y 5.",
      },
      {
        question: "Necesito suplementos?",
        answer: "No. El plan prioriza consistencia, tecnica y progresion.",
      },
    ],
    priceLabel: "Desde ARS 42.000",
    whatsappMessage:
      "Hola Pepu, quiero empezar Recomp 3D Base. Quiero mas info para arrancar esta semana.",
    featured: true,
  },
  {
    slug: "volumen-4d-smart",
    title: "Volumen 4D Smart",
    tagline: "Subi masa muscular sin perder movilidad ni tecnica.",
    description:
      "Bloques upper/lower con enfoque en hipertrofia medible, recuperacion y sobrecarga progresiva.",
    goal: "volumen",
    level: "intermedio",
    daysPerWeek: 4,
    trainingPlace: "gym",
    includes: [
      "Split upper/lower en 4 sesiones",
      "Plan de progresion por RIR y carga",
      "Ajuste de volumen por fatiga",
      "Soporte por WhatsApp 1:1",
    ],
    forWho: [
      "Entrenados intermedios que ya dominan basicos",
      "Quienes buscan ganar masa con estructura",
    ],
    notFor: [
      "Personas con menos de 4 dias disponibles",
      "Quienes prefieren rutinas sin seguimiento de cargas",
    ],
    faqs: [
      {
        question: "Hay descarga planificada?",
        answer:
          "Si. El plan incluye semanas de descarga para sostener progreso sin sobreentrenar.",
      },
      {
        question: "Sirve para mujeres?",
        answer: "Si. Se ajusta intensidad y seleccion de ejercicios segun objetivo y contexto.",
      },
    ],
    priceLabel: "Desde ARS 56.000",
    whatsappMessage:
      "Hola Pepu, me interesa Volumen 4D Smart. Quiero avanzar con masa muscular.",
    featured: true,
  },
  {
    slug: "rendimiento-5d-pro",
    title: "Rendimiento 5D Pro",
    tagline: "Potencia, resistencia y fuerza para rendir de verdad.",
    description:
      "Programa de 5 dias para mejorar performance general con bloques de fuerza, potencia y acondicionamiento.",
    goal: "rendimiento",
    level: "avanzado",
    daysPerWeek: 5,
    trainingPlace: "gym",
    includes: [
      "Bloque semanal de fuerza + potencia + condicionamiento",
      "Test quincenal de rendimiento",
      "Control de carga interna y externa",
      "Acompañamiento por WhatsApp con feedback tecnico",
    ],
    forWho: [
      "Personas con experiencia que quieren rendimiento integral",
      "Atletas recreativos con objetivo competitivo",
    ],
    notFor: [
      "Quienes recien empiezan a entrenar",
      "Quienes no pueden recuperar bien entre sesiones",
    ],
    faqs: [
      {
        question: "Incluye trabajo de movilidad?",
        answer: "Si, incluye bloques cortos de movilidad y preactivacion en cada sesion.",
      },
      {
        question: "Puedo combinarlo con running?",
        answer: "Si, se ajustan las cargas para evitar interferencia.",
      },
    ],
    priceLabel: "Desde ARS 68.000",
    whatsappMessage:
      "Hola Pepu, quiero detalles de Rendimiento 5D Pro para mejorar performance.",
    featured: true,
  },
  {
    slug: "definicion-casa-4d",
    title: "Definicion Casa 4D",
    tagline: "Entrena en casa con estructura y resultados reales.",
    description:
      "Plan para reducir grasa y tonificar con mancuernas, bandas y peso corporal. Flexible y efectivo.",
    goal: "definicion",
    level: "intermedio",
    daysPerWeek: 4,
    trainingPlace: "casa",
    includes: [
      "Rutina en casa con equipamiento minimo",
      "Progresion con tempo, pausas y repeticiones objetivo",
      "Cardio inteligente integrado al plan",
      "Feedback semanal por WhatsApp",
    ],
    forWho: [
      "Personas con agenda cargada que entrenan en casa",
      "Quienes quieren bajar grasa sin depender de maquinas",
    ],
    notFor: [
      "Quienes no tienen al menos algo de equipamiento basico",
      "Quienes buscan enfoque principal en fuerza maxima",
    ],
    faqs: [
      {
        question: "Que equipamiento minimo necesito?",
        answer: "Mancuernas regulables o bandas + una colchoneta.",
      },
      {
        question: "Se adapta si viajo?",
        answer: "Si, incluye versiones express para semanas de viaje.",
      },
    ],
    priceLabel: "Desde ARS 48.000",
    whatsappMessage:
      "Hola Pepu, quiero empezar Definicion Casa 4D y entrenar desde casa.",
  },
  {
    slug: "volumen-5d-elite",
    title: "Volumen 5D Elite",
    tagline: "Hipertrofia avanzada con foco en simetria y densidad.",
    description:
      "Plan de alto volumen con control fino de intensidad para atletas que ya entrenan fuerte.",
    goal: "volumen",
    level: "avanzado",
    daysPerWeek: 5,
    trainingPlace: "gym",
    includes: [
      "Division por grupos musculares con prioridad visual",
      "Metodos avanzados de intensidad",
      "Microciclos de especializacion",
      "Ajustes semanales con soporte por WhatsApp",
    ],
    forWho: [
      "Entrenados avanzados que buscan estetica premium",
      "Quienes toleran alto volumen y controlan tecnica",
    ],
    notFor: [
      "Principiantes sin base de fuerza",
      "Personas con disponibilidad menor a 5 dias",
    ],
    faqs: [
      {
        question: "Puedo enfocarlo en hombros y espalda?",
        answer: "Si, se pueden priorizar grupos segun objetivo visual.",
      },
      {
        question: "Hay plan nutricional incluido?",
        answer:
          "Incluye lineamientos claros de calorias y macros orientativas para acompañar el volumen.",
      },
    ],
    priceLabel: "Desde ARS 72.000",
    whatsappMessage:
      "Hola Pepu, estoy listo para Volumen 5D Elite. Quiero una propuesta personalizada.",
  },
  {
    slug: "rendimiento-3d-funcional",
    title: "Rendimiento 3D Funcional",
    tagline: "Mas fuerte, agil y resistente en solo 3 sesiones.",
    description:
      "Programa compacto para mejorar condicion fisica global con foco en potencia y control corporal.",
    goal: "rendimiento",
    level: "principiante",
    daysPerWeek: 3,
    trainingPlace: "casa",
    includes: [
      "Circuitos de fuerza y capacidad aerobica",
      "Bloques de movilidad y estabilidad",
      "Progress checks cada 2 semanas",
      "Comunicacion directa por WhatsApp",
    ],
    forWho: [
      "Personas activas que quieren rendimiento sin rutinas largas",
      "Quienes entrenan en casa con poco tiempo",
    ],
    notFor: [
      "Atletas de fuerza que buscan marcas maximas especificas",
      "Quienes prefieren entrenamiento exclusivamente de hipertrofia",
    ],
    faqs: [
      {
        question: "Se puede hacer sin equipamiento?",
        answer: "Si, aunque con una mancuerna o banda mejora mucho la progresion.",
      },
      {
        question: "Es apto para empezar?",
        answer: "Si, el plan escala desde nivel inicial.",
      },
    ],
    priceLabel: "Desde ARS 44.000",
    whatsappMessage:
      "Hola Pepu, quiero informacion de Rendimiento 3D Funcional para arrancar ya.",
    featured: true,
  },
];

export const featuredPlans = plans.filter((plan) => plan.featured);

export function getPlanBySlug(slug: string): Plan | undefined {
  return plans.find((plan) => plan.slug === slug);
}

export function getWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

