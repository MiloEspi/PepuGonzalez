"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { animate } from "animejs";

import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getStickyWhatsAppHref } from "@/data/offers";
import {
  QUIZ_COMMITMENT_LABELS,
  QUIZ_GOAL_LABELS,
  QUIZ_TRAINING_PLACE_LABELS,
  isQuizComplete,
  quizQuestions,
  recommendPlanFromAnswers,
  type QuizAnswers,
} from "@/data/quiz";
import { rememberSelectedPlan } from "@/lib/plan-interest";
import { shouldReduceMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

const dayLabels: Record<QuizAnswers["daysPerWeek"], string> = {
  3: "3 dias",
  4: "4 dias",
  5: "5 dias",
  6: "6 dias",
};

function getAnswerLabel<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]): string {
  if (key === "goal") return QUIZ_GOAL_LABELS[value as QuizAnswers["goal"]];
  if (key === "trainingPlace") return QUIZ_TRAINING_PLACE_LABELS[value as QuizAnswers["trainingPlace"]];
  if (key === "commitment90") return QUIZ_COMMITMENT_LABELS[value as QuizAnswers["commitment90"]];
  return dayLabels[value as QuizAnswers["daysPerWeek"]];
}

export function PlanFinderQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const stepPanelRef = useRef<HTMLDivElement>(null);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalSteps = quizQuestions.length;
  const isComplete = isQuizComplete(answers);
  const recommendation = useMemo(() => (isComplete ? recommendPlanFromAnswers(answers) : null), [answers, isComplete]);
  const activeQuestion = quizQuestions[stepIndex];
  const progressValue = isComplete ? 100 : Math.round(((stepIndex + 1) / totalSteps) * 100);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const panel = stepPanelRef.current;
    if (!panel || isComplete) return;

    if (shouldReduceMotion()) {
      panel.style.opacity = "1";
      panel.style.transform = "translateY(0px)";
      return;
    }

    panel.style.opacity = "0";
    panel.style.transform = "translateY(10px)";
    const entry = animate(panel, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      ease: "out(4)",
    });

    return () => {
      entry.pause();
    };
  }, [stepIndex, isComplete]);

  function handleOptionSelect(value: QuizAnswers[keyof QuizAnswers], target?: HTMLElement) {
    if (!activeQuestion) return;

    if (target && !shouldReduceMotion()) {
      animate(target, {
        scale: [1, 0.97, 1],
        duration: 210,
        ease: "out(4)",
      });
    }

    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: value }));

    if (stepIndex < totalSteps - 1) {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = setTimeout(() => {
        setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
      }, 120);
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
      <Card className="rounded-[14px] border-white/18 bg-card/95">
        <CardHeader className="space-y-3 border-b border-border/70 pb-4">
          <Badge className="badge-shimmer w-fit bg-primary/90 text-primary-foreground">Recomendacion final</Badge>
          <CardTitle className="text-2xl md:text-[1.9rem]">{recommendation.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{recommendation.strapline}</p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {Object.entries(answers).map(([key, value]) => (
              <Badge key={key} variant="outline" className="border-border/80 bg-background/55">
                {getAnswerLabel(key as keyof QuizAnswers, value as QuizAnswers[keyof QuizAnswers])}
              </Badge>
            ))}
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {recommendation.benefits.slice(0, 3).map((item) => (
              <li key={item} className="rounded-[10px] border border-border/75 bg-background/45 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 pt-1">
          <Button asChild className="rounded-[10px] px-5">
            <SmoothScrollLink href={`/#plan-${recommendation.slug}`} onClick={() => rememberSelectedPlan(recommendation.title)}>
              Ver detalle
            </SmoothScrollLink>
          </Button>

          <WhatsAppButton href={getStickyWhatsAppHref(recommendation.title)} className="px-5">
            Hablar por WhatsApp
          </WhatsAppButton>

          <Button variant="ghost" className="rounded-[10px]" onClick={handleReset}>
            Rehacer quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!activeQuestion) return null;

  return (
    <Card className="rounded-[14px] border-border/80 bg-card/96 shadow-[0_24px_42px_-36px_rgba(0,0,0,0.9)]">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">
              PASO {stepIndex + 1} / {totalSteps}
            </p>
            <CardTitle className="text-[1.9rem] leading-[1.06]">{activeQuestion.title}</CardTitle>
          </div>

          <Badge variant="secondary">
            Plan Finder
          </Badge>
        </div>

        <Progress value={progressValue} className="h-1 bg-white/12 [&_[data-slot=progress-indicator]]:bg-primary" />
        <p className="text-sm text-muted-foreground">{activeQuestion.subtitle}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div ref={stepPanelRef} key={activeQuestion.id} className="space-y-2.5">
          {activeQuestion.options.map((option) => {
            const selected = answers[activeQuestion.id] === option.value;

            return (
              <button
                key={option.label}
                type="button"
                onClick={(event) => handleOptionSelect(option.value, event.currentTarget)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-[10px] border px-3.5 py-2.5 text-left text-sm transition duration-[220ms] ease-[var(--ease-premium)]",
                  selected
                    ? "border-primary/70 bg-[rgba(122,14,14,0.58)] text-foreground shadow-[0_16px_30px_-28px_rgba(212,20,20,0.9)]"
                    : "border-border/80 bg-background/52 text-muted-foreground hover:border-primary/55 hover:bg-[rgba(122,14,14,0.18)] hover:text-foreground"
                )}
              >
                <span className="font-medium">{option.label}</span>
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-[8px] border transition",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/80 bg-background text-transparent group-hover:border-primary/45"
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
            <Badge key={key} variant="outline">
              {getAnswerLabel(key as keyof QuizAnswers, value as QuizAnswers[keyof QuizAnswers])}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button type="button" variant="ghost" size="sm" className="rounded-[10px]" onClick={handleBack} disabled={stepIndex === 0}>
          <ArrowLeft className="size-4" />
          Volver
        </Button>

        <p className="text-xs text-muted-foreground">Elegi una opcion para avanzar</p>
      </CardFooter>
    </Card>
  );
}
