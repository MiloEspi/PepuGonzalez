"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GOAL_LABELS, LEVEL_LABELS, TRAINING_PLACE_LABELS, getWhatsAppUrl } from "@/data/plans";
import { isQuizComplete, quizQuestions, recommendPlanFromAnswers, type QuizAnswers } from "@/data/quiz";
import { cn } from "@/lib/utils";

const dayLabels: Record<QuizAnswers["daysPerWeek"], string> = {
  3: "3 dias",
  4: "4 dias",
  5: "5 dias",
};

function getAnswerLabel<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]): string {
  if (key === "goal") return GOAL_LABELS[value as QuizAnswers["goal"]];
  if (key === "level") return LEVEL_LABELS[value as QuizAnswers["level"]];
  if (key === "trainingPlace") return TRAINING_PLACE_LABELS[value as QuizAnswers["trainingPlace"]];
  return dayLabels[value as QuizAnswers["daysPerWeek"]];
}

export function PlanFinderQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSteps = quizQuestions.length;
  const isComplete = isQuizComplete(answers);
  const recommendation = useMemo(() => (isComplete ? recommendPlanFromAnswers(answers) : null), [answers, isComplete]);
  const activeQuestion = quizQuestions[stepIndex];
  const progressValue = isComplete ? 100 : Math.round(((stepIndex + 1) / totalSteps) * 100);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  function handleOptionSelect(value: QuizAnswers[keyof QuizAnswers]) {
    if (!activeQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: value,
    }));

    if (stepIndex < totalSteps - 1) {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = setTimeout(() => {
        setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
      }, 130);
    }
  }

  function handleBack() {
    setStepIndex((prev) => Math.max(0, prev - 1));
  }

  function handleReset() {
    setAnswers({});
    setStepIndex(0);
  }

  if (isComplete && recommendation) {
    return (
      <Card className="rounded-2xl border-primary/30 bg-card">
        <CardHeader className="space-y-3">
          <Badge className="w-fit rounded-full">Plan recomendado</Badge>
          <CardTitle className="text-2xl">{recommendation.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{recommendation.tagline}</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm text-muted-foreground">
            Segun tus respuestas, este plan te da el mejor balance entre objetivo, nivel y disponibilidad.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{GOAL_LABELS[recommendation.goal]}</Badge>
            <Badge variant="outline">{LEVEL_LABELS[recommendation.level]}</Badge>
            <Badge variant="outline">{recommendation.daysPerWeek} dias</Badge>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {recommendation.includes.slice(0, 3).map((item) => (
              <li key={item} className="rounded-lg border border-border/70 bg-background/70 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <WhatsAppButton href={getWhatsAppUrl(recommendation.whatsappMessage)}>WhatsApp con este plan</WhatsAppButton>
          <Button asChild variant="outline" className="rounded-full">
            <Link href={`/planes/${recommendation.slug}`}>Ver detalle del plan</Link>
          </Button>
          <Button variant="ghost" className="rounded-full" onClick={handleReset}>
            Rehacer quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!activeQuestion) return null;

  return (
    <Card className="rounded-2xl border-border/80 bg-card/95">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground">
              PASO {stepIndex + 1} / {totalSteps}
            </p>
            <CardTitle className="text-2xl">{activeQuestion.title}</CardTitle>
          </div>
          <Badge variant="secondary" className="rounded-full">
            Plan Finder
          </Badge>
        </div>
        <Progress value={progressValue} className="h-1.5 bg-primary/18" />
        <p className="text-sm text-muted-foreground">{activeQuestion.subtitle}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div key={activeQuestion.id} className="space-y-3 animate-[quiz-step-in_220ms_ease-out]">
          {activeQuestion.options.map((option) => {
            const selected = answers[activeQuestion.id] === option.value;

            return (
              <button
                key={option.label}
                type="button"
                onClick={() => handleOptionSelect(option.value)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition",
                  selected
                    ? "border-primary bg-primary/10 text-foreground shadow-[0_14px_24px_-22px_hsl(212_70%_28%)]"
                    : "border-border/80 bg-background/65 text-muted-foreground hover:border-primary/35 hover:bg-accent/45 hover:text-foreground"
                )}
              >
                <span className="font-medium">{option.label}</span>
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-full border transition",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/80 bg-background text-transparent group-hover:border-primary/35"
                  )}
                >
                  <Check className="size-3.5" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {Object.entries(answers).map(([key, value]) => (
            <Badge key={key} variant="outline" className="rounded-full">
              {getAnswerLabel(key as keyof QuizAnswers, value as QuizAnswers[keyof QuizAnswers])}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button type="button" variant="ghost" size="sm" className="rounded-full" onClick={handleBack} disabled={stepIndex === 0}>
          <ArrowLeft className="size-4" />
          Volver
        </Button>
        <p className="text-xs text-muted-foreground">Selecciona una opcion para avanzar</p>
      </CardFooter>
    </Card>
  );
}
