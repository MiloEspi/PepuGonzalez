import { getOfferBySlug, type Offer, type OfferSlug } from "@/data/offers";

export type QuizGoal = "ganar-masa" | "perder-grasa" | "recomposicion" | "mejorar-rendimiento";
export type QuizTrainingExperience = "nunca" | "menos-6-meses" | "seis-meses-dos-años" | "mas-2-años";
export type QuizDaysPerWeek = 3 | 4 | 5 | 6;
export type QuizRoutineStructure = "no" | "mas-o-menos" | "si";
export type QuizNutritionPlan = "si" | "no";
export type QuizFollowUp = "solo-plan" | "seguimiento-mensual" | "seguimiento-semanal";
export type QuizCommitment =
  | "empezar-aprender"
  | "progresar-serio"
  | "cambio-fuerte-90"
  | "maximo-acompañamiento";

export interface QuizAnswers {
  goal: QuizGoal;
  trainingExperience: QuizTrainingExperience;
  daysPerWeek: QuizDaysPerWeek;
  routineStructure: QuizRoutineStructure;
  wantsNutritionPlan: QuizNutritionPlan;
  followUp: QuizFollowUp;
  commitmentLevel: QuizCommitment;
}

export type QuizQuestionId = keyof QuizAnswers;

interface QuizOption<T extends QuizQuestionId> {
  label: string;
  value: QuizAnswers[T];
}

export interface QuizQuestion<T extends QuizQuestionId = QuizQuestionId> {
  id: T;
  title: string;
  subtitle: string;
  options: QuizOption<T>[];
}

export const QUIZ_GOAL_LABELS: Record<QuizGoal, string> = {
  "ganar-masa": "Ganar masa",
  "perder-grasa": "Perder grasa",
  recomposicion: "Recomposicion",
  "mejorar-rendimiento": "Mejorar rendimiento",
};

export const QUIZ_TRAINING_EXPERIENCE_LABELS: Record<QuizTrainingExperience, string> = {
  nunca: "Nunca entrene",
  "menos-6-meses": "Menos de 6 meses",
  "seis-meses-dos-años": "6 meses a 2 años",
  "mas-2-años": "Mas de 2 años",
};

export const QUIZ_DAYS_LABELS: Record<QuizDaysPerWeek, string> = {
  3: "3 dias",
  4: "4 dias",
  5: "5 dias",
  6: "6 dias",
};

export const QUIZ_ROUTINE_STRUCTURE_LABELS: Record<QuizRoutineStructure, string> = {
  no: "No",
  "mas-o-menos": "Mas o menos",
  si: "Si",
};

export const QUIZ_NUTRITION_LABELS: Record<QuizNutritionPlan, string> = {
  si: "Plan nutricional: Si",
  no: "Plan nutricional: No",
};

export const QUIZ_FOLLOW_UP_LABELS: Record<QuizFollowUp, string> = {
  "solo-plan": "Sin seguimiento",
  "seguimiento-mensual": "Seguimiento mensual",
  "seguimiento-semanal": "Seguimiento semanal",
};

export const QUIZ_COMMITMENT_LABELS: Record<QuizCommitment, string> = {
  "empezar-aprender": "Quiero empezar y aprender",
  "progresar-serio": "Quiero progresar en serio",
  "cambio-fuerte-90": "Quiero un cambio fuerte en 90 dias",
  "maximo-acompañamiento": "Quiero el maximo acompañamiento",
};

export const QUIZ_ANSWER_LABELS: {
  [K in keyof QuizAnswers]: Record<QuizAnswers[K], string>;
} = {
  goal: QUIZ_GOAL_LABELS,
  trainingExperience: QUIZ_TRAINING_EXPERIENCE_LABELS,
  daysPerWeek: QUIZ_DAYS_LABELS,
  routineStructure: QUIZ_ROUTINE_STRUCTURE_LABELS,
  wantsNutritionPlan: QUIZ_NUTRITION_LABELS,
  followUp: QUIZ_FOLLOW_UP_LABELS,
  commitmentLevel: QUIZ_COMMITMENT_LABELS,
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    title: "Objetivo principal",
    subtitle: "Definimos la direccion principal del proceso.",
    options: [
      { label: "Ganar masa", value: "ganar-masa" },
      { label: "Perder grasa", value: "perder-grasa" },
      { label: "Recomposicion", value: "recomposicion" },
      { label: "Mejorar rendimiento", value: "mejorar-rendimiento" },
    ],
  },
  {
    id: "trainingExperience",
    title: "Tiempo entrenando",
    subtitle: "Esto ajusta el nivel de complejidad inicial.",
    options: [
      { label: "Nunca entrene", value: "nunca" },
      { label: "Menos de 6 meses", value: "menos-6-meses" },
      { label: "6 meses a 2 años", value: "seis-meses-dos-años" },
      { label: "Mas de 2 años", value: "mas-2-años" },
    ],
  },
  {
    id: "daysPerWeek",
    title: "Dias disponibles",
    subtitle: "Armamos el sistema sobre tu disponibilidad real.",
    options: [
      { label: "3 dias", value: 3 },
      { label: "4 dias", value: 4 },
      { label: "5 dias", value: 5 },
      { label: "6 dias", value: 6 },
    ],
  },
  {
    id: "routineStructure",
    title: "Sabes estructurar rutina",
    subtitle: "Detectamos cuanto soporte tecnico necesitas.",
    options: [
      { label: "No", value: "no" },
      { label: "Mas o menos", value: "mas-o-menos" },
      { label: "Si", value: "si" },
    ],
  },
  {
    id: "wantsNutritionPlan",
    title: "Queres plan nutricional completo",
    subtitle: "Sumamos nutricion completa solo si realmente la necesitas.",
    options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "followUp",
    title: "Queres seguimiento",
    subtitle: "Defini la intensidad de acompañamiento que buscas.",
    options: [
      { label: "No, solo el plan", value: "solo-plan" },
      { label: "Seguimiento mensual", value: "seguimiento-mensual" },
      { label: "Seguimiento semanal", value: "seguimiento-semanal" },
    ],
  },
  {
    id: "commitmentLevel",
    title: "Nivel de compromiso",
    subtitle: "Con esto se define el marco final de trabajo.",
    options: [
      { label: "Quiero empezar y aprender", value: "empezar-aprender" },
      { label: "Quiero progresar en serio", value: "progresar-serio" },
      { label: "Quiero un cambio fuerte en 90 dias", value: "cambio-fuerte-90" },
      { label: "Quiero el maximo acompañamiento", value: "maximo-acompañamiento" },
    ],
  },
];

export function isQuizComplete(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  return (
    typeof answers.goal !== "undefined" &&
    typeof answers.trainingExperience !== "undefined" &&
    typeof answers.daysPerWeek !== "undefined" &&
    typeof answers.routineStructure !== "undefined" &&
    typeof answers.wantsNutritionPlan !== "undefined" &&
    typeof answers.followUp !== "undefined" &&
    typeof answers.commitmentLevel !== "undefined"
  );
}

function resolveOfferSlug(answers: QuizAnswers): OfferSlug {
  const isMentoriaExact =
    answers.trainingExperience === "mas-2-años" &&
    answers.followUp === "seguimiento-semanal" &&
    answers.commitmentLevel === "maximo-acompañamiento";
  if (isMentoriaExact) {
    return "mentoria-1-1";
  }

  const isTransformacionExact =
    answers.wantsNutritionPlan === "si" &&
    answers.followUp === "seguimiento-mensual" &&
    answers.commitmentLevel === "cambio-fuerte-90";
  if (isTransformacionExact) {
    return "programa-transformacion";
  }

  const isInicioExact =
    (answers.trainingExperience === "nunca" || answers.trainingExperience === "menos-6-meses") &&
    answers.routineStructure === "no" &&
    answers.commitmentLevel === "empezar-aprender" &&
    answers.followUp === "solo-plan";
  if (isInicioExact) {
    return "programa-inicio";
  }

  const isBaseExact =
    answers.trainingExperience === "seis-meses-dos-años" &&
    answers.routineStructure === "si" &&
    answers.followUp === "solo-plan" &&
    answers.commitmentLevel === "progresar-serio";
  if (isBaseExact) {
    return "programa-base";
  }

  // Fallback para perfiles mixtos, conservando la priorizacion del sistema final.
  if (answers.followUp === "seguimiento-semanal" || answers.commitmentLevel === "maximo-acompañamiento") {
    return "mentoria-1-1";
  }

  if (
    answers.wantsNutritionPlan === "si" ||
    answers.followUp === "seguimiento-mensual" ||
    answers.commitmentLevel === "cambio-fuerte-90"
  ) {
    return "programa-transformacion";
  }

  if (
    answers.trainingExperience === "nunca" ||
    answers.trainingExperience === "menos-6-meses" ||
    answers.routineStructure !== "si" ||
    answers.commitmentLevel === "empezar-aprender"
  ) {
    return "programa-inicio";
  }

  return "programa-base";
}

export function recommendPlanFromAnswers(answers: QuizAnswers): Offer {
  return getOfferBySlug(resolveOfferSlug(answers));
}
