import { getOfferBySlug, type Offer, type OfferSlug } from "@/data/offers";

export type QuizGoal = "masa-muscular" | "definir-grasa" | "recomposicion-corporal";
export type QuizDaysPerWeek = 3 | 4 | 5 | 6;
export type QuizTrainingPlace = "gimnasio" | "casa";
export type QuizCommitment = "si" | "no";

export interface QuizAnswers {
  goal: QuizGoal;
  daysPerWeek: QuizDaysPerWeek;
  trainingPlace: QuizTrainingPlace;
  commitment90: QuizCommitment;
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
  "masa-muscular": "Ganar masa muscular",
  "definir-grasa": "Definir grasa",
  "recomposicion-corporal": "Recomposicion corporal",
};

export const QUIZ_TRAINING_PLACE_LABELS: Record<QuizTrainingPlace, string> = {
  gimnasio: "Gimnasio",
  casa: "Casa",
};

export const QUIZ_COMMITMENT_LABELS: Record<QuizCommitment, string> = {
  si: "Compromiso 90 dias: Si",
  no: "Compromiso 90 dias: No",
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    title: "Cual es tu objetivo principal?",
    subtitle: "Elegi el objetivo que queres atacar primero.",
    options: [
      { label: "Ganar masa muscular", value: "masa-muscular" },
      { label: "Definir grasa", value: "definir-grasa" },
      { label: "Recomposicion corporal", value: "recomposicion-corporal" },
    ],
  },
  {
    id: "daysPerWeek",
    title: "Cuantos dias entrenas por semana?",
    subtitle: "La recomendacion se ajusta a tu disponibilidad real.",
    options: [
      { label: "3 dias", value: 3 },
      { label: "4 dias", value: 4 },
      { label: "5 dias", value: 5 },
      { label: "6 dias", value: 6 },
    ],
  },
  {
    id: "trainingPlace",
    title: "Entrenas en gimnasio o en casa?",
    subtitle: "Necesitamos adaptar el sistema a tu contexto.",
    options: [
      { label: "Gimnasio", value: "gimnasio" },
      { label: "En casa", value: "casa" },
    ],
  },
  {
    id: "commitment90",
    title: "Estas dispuesto a comprometerte 90 dias?",
    subtitle: "La velocidad del resultado depende de tu compromiso.",
    options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
    ],
  },
];

export function isQuizComplete(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  return (
    typeof answers.goal !== "undefined" &&
    typeof answers.daysPerWeek !== "undefined" &&
    typeof answers.trainingPlace !== "undefined" &&
    typeof answers.commitment90 !== "undefined"
  );
}

function resolveOfferSlug(answers: QuizAnswers): OfferSlug {
  const highCommitment = answers.commitment90 === "si";
  const highAvailability = answers.daysPerWeek >= 5;
  const nutritionDriven = answers.goal === "definir-grasa" || answers.goal === "recomposicion-corporal";

  if (highCommitment && highAvailability) {
    return "mentoria-1-1";
  }

  if (highCommitment && nutritionDriven) {
    return "programa-transformacion";
  }

  return "programa-base";
}

export function recommendPlanFromAnswers(answers: QuizAnswers): Offer {
  return getOfferBySlug(resolveOfferSlug(answers));
}
