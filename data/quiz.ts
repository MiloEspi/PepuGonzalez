import { getPlanBySlug, plans, type DaysPerWeek, type Goal, type Level, type Plan, type TrainingPlace } from "@/data/plans";

export interface QuizAnswers {
  goal: Goal;
  level: Level;
  daysPerWeek: DaysPerWeek;
  trainingPlace: TrainingPlace;
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

export interface QuizRule {
  id: string;
  when: Partial<QuizAnswers>;
  planSlug: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    title: "Cual es tu objetivo principal?",
    subtitle: "Elegi el resultado que queres priorizar este ciclo.",
    options: [
      { label: "Definicion", value: "definicion" },
      { label: "Volumen", value: "volumen" },
      { label: "Rendimiento", value: "rendimiento" },
    ],
  },
  {
    id: "level",
    title: "En que nivel estas hoy?",
    subtitle: "Nos ayuda a ajustar la exigencia de cada semana.",
    options: [
      { label: "Principiante", value: "principiante" },
      { label: "Intermedio", value: "intermedio" },
      { label: "Avanzado", value: "avanzado" },
    ],
  },
  {
    id: "daysPerWeek",
    title: "Cuantos dias por semana entrenas?",
    subtitle: "La consistencia manda. Elegi lo que realmente podes cumplir.",
    options: [
      { label: "3 dias", value: 3 },
      { label: "4 dias", value: 4 },
      { label: "5 dias", value: 5 },
    ],
  },
  {
    id: "trainingPlace",
    title: "Donde vas a entrenar?",
    subtitle: "Adaptamos el plan al equipamiento que ya tenes.",
    options: [
      { label: "Gym", value: "gym" },
      { label: "Casa", value: "casa" },
    ],
  },
];

export const quizRules: QuizRule[] = [
  {
    id: "definicion-casa-4",
    when: { goal: "definicion", trainingPlace: "casa", daysPerWeek: 4 },
    planSlug: "definicion-casa-4d",
  },
  {
    id: "definicion-principiante",
    when: { goal: "definicion", level: "principiante" },
    planSlug: "recomp-3d-base",
  },
  {
    id: "volumen-avanzado",
    when: { goal: "volumen", level: "avanzado", daysPerWeek: 5 },
    planSlug: "volumen-5d-elite",
  },
  {
    id: "volumen-intermedio",
    when: { goal: "volumen", level: "intermedio" },
    planSlug: "volumen-4d-smart",
  },
  {
    id: "rendimiento-avanzado",
    when: { goal: "rendimiento", level: "avanzado", daysPerWeek: 5 },
    planSlug: "rendimiento-5d-pro",
  },
  {
    id: "rendimiento-casa",
    when: { goal: "rendimiento", trainingPlace: "casa" },
    planSlug: "rendimiento-3d-funcional",
  },
];

const weights: Record<QuizQuestionId, number> = {
  goal: 4,
  level: 3,
  daysPerWeek: 2,
  trainingPlace: 1,
};

function matchesPartialRule(answers: QuizAnswers, rule: Partial<QuizAnswers>): boolean {
  return (Object.keys(rule) as QuizQuestionId[]).every((key) => answers[key] === rule[key]);
}

export function isQuizComplete(answers: Partial<QuizAnswers>): answers is QuizAnswers {
  return (
    typeof answers.goal !== "undefined" &&
    typeof answers.level !== "undefined" &&
    typeof answers.daysPerWeek !== "undefined" &&
    typeof answers.trainingPlace !== "undefined"
  );
}

export function recommendPlanFromAnswers(answers: QuizAnswers): Plan {
  const directRule = quizRules.find((rule) => matchesPartialRule(answers, rule.when));
  if (directRule) {
    const plan = getPlanBySlug(directRule.planSlug);
    if (plan) return plan;
  }

  const [bestMatch] = plans
    .map((plan) => {
      let score = 0;
      if (plan.goal === answers.goal) score += weights.goal;
      if (plan.level === answers.level) score += weights.level;
      if (plan.daysPerWeek === answers.daysPerWeek) score += weights.daysPerWeek;
      if (plan.trainingPlace === answers.trainingPlace) score += weights.trainingPlace;
      return { plan, score };
    })
    .sort((a, b) => b.score - a.score);

  return bestMatch?.plan ?? plans[0];
}
