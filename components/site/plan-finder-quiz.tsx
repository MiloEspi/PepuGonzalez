"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { animate } from "animejs";

import { SmoothScrollLink } from "@/components/site/smooth-scroll-link";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getStickyWhatsAppHref } from "@/data/offers";
import {
  QUIZ_ANSWER_LABELS,
  QUIZ_COMMITMENT_LABELS,
  isQuizComplete,
  quizQuestions,
  recommendPlanFromAnswers,
  type QuizAnswers,
} from "@/data/quiz";
import { rememberSelectedPlan } from "@/lib/plan-interest";
import { shouldReduceMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

function getAnswerLabel<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]): string {
  return QUIZ_ANSWER_LABELS[key][value];
}

export function PlanFinderQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const stepPanelRef = useRef<HTMLDivElement>(null);

  const totalSteps = quizQuestions.length;
  const canRecommend = isQuizComplete(answers);
  const recommendation = useMemo(() => (canRecommend ? recommendPlanFromAnswers(answers) : null), [answers, canRecommend]);
  const activeQuestion = quizQuestions[stepIndex];
  const progressValue = showRecommendation ? 100 : Math.round(((stepIndex + 1) / totalSteps) * 100);
  const selectedValue = activeQuestion ? answers[activeQuestion.id] : undefined;

  const selectedCommitment =
    typeof answers.commitmentLevel === "undefined" ? null : QUIZ_COMMITMENT_LABELS[answers.commitmentLevel as QuizAnswers["commitmentLevel"]];

  useEffect(() => {
    const panel = stepPanelRef.current;
    if (!panel || showRecommendation) return;

    if (shouldReduceMotion()) {
      panel.style.opacity = "1";
      panel.style.transform = "translateY(0px)";
      return;
    }

    panel.style.opacity = "0";
    panel.style.transform = `translateX(${direction === "next" ? "14px" : "-14px"})`;
    const entry = animate(panel, {
      opacity: [0, 1],
      translateX: [direction === "next" ? 14 : -14, 0],
      duration: 320,
      ease: "out(4)",
    });

    return () => {
      entry.pause();
    };
  }, [direction, showRecommendation, stepIndex]);

  function handleOptionSelect(value: QuizAnswers[keyof QuizAnswers], target?: HTMLElement) {
    if (!activeQuestion) return;

    if (target && !shouldReduceMotion()) {
      animate(target, {
        scale: [1, 0.985, 1.01, 1],
        duration: 240,
        ease: "out(4)",
      });
    }

    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: value }));
  }

  function handleBack() {
    setDirection("back");
    setStepIndex((prev) => Math.max(0, prev - 1));
  }

  function handleNext() {
    if (!activeQuestion || typeof selectedValue === "undefined") return;

    if (stepIndex < totalSteps - 1) {
      setDirection("next");
      setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
      return;
    }

    setShowRecommendation(true);
  }

  function handleEditAnswers() {
    setShowRecommendation(false);
    setDirection("back");
    setStepIndex(totalSteps - 1);
  }

  function handleReset() {
    setAnswers({});
    setStepIndex(0);
    setDirection("next");
    setShowRecommendation(false);
  }

  if (showRecommendation && recommendation) {
    return (
      <Card className="overflow-hidden rounded-[16px] border-primary/35 bg-[linear-gradient(150deg,#1f080a_0%,#121217_54%,#0f0f13_100%)] shadow-[0_38px_70px_-44px_rgba(122,14,14,0.95)]">
        <CardHeader className="space-y-4 border-b border-white/12 pb-5">
          <Badge className="badge-shimmer w-fit border border-primary/55 bg-primary/90 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-primary-foreground">
            Recomendacion final
          </Badge>

          <div className="space-y-2">
            <CardTitle className="text-[1.95rem] leading-[0.95] text-white md:text-[2.4rem]">{recommendation.title}</CardTitle>
            <p className="max-w-2xl text-sm text-white/84 md:text-base">{recommendation.pitch}</p>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-primary/85">{recommendation.durationLabel}</p>
          </div>

          <div className="rounded-[12px] border border-primary/35 bg-[linear-gradient(130deg,rgba(212,20,20,0.24)_0%,rgba(122,14,14,0.3)_100%)] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.14em] text-white/72">Precio del programa</p>
            <p className="mt-1 text-xl font-semibold text-white">
              {recommendation.priceArs}
              <span className="px-2 text-white/45">|</span>
              <span className="text-lg font-medium text-white/88">{recommendation.priceUsd}</span>
            </p>
          </div>

          {recommendation.surveyStatement ? (
            <div className="rounded-[12px] border border-primary/48 bg-primary/16 px-3.5 py-3 text-sm text-white/90">
              <p className="inline-flex items-start gap-2 font-medium">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                {recommendation.surveyStatement}
              </p>
            </div>
          ) : null}

          <p className="text-xs uppercase tracking-[0.16em] text-white/58">
            Ajustado por tu perfil {selectedCommitment ? `- ${selectedCommitment}` : ""}
          </p>
        </CardHeader>

        <CardContent className="space-y-5 pt-5">
          <div className="flex flex-wrap gap-2.5">
            {Object.entries(answers).map(([key, value]) => (
              <Badge key={key} variant="outline" className="rounded-[9px] border-white/20 bg-black/30 text-white/80">
                {getAnswerLabel(key as keyof QuizAnswers, value as QuizAnswers[keyof QuizAnswers])}
              </Badge>
            ))}
          </div>

          <ul className="space-y-2 text-sm text-white/84">
            {recommendation.benefits.slice(0, 4).map((item) => (
              <li key={item} className="rounded-[10px] border border-white/12 bg-black/24 px-3.5 py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex flex-col gap-2.5 pt-0 sm:flex-row sm:flex-wrap">
          <Button asChild className="premium-cta h-12 w-full rounded-[12px] bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] text-[0.78rem] font-bold tracking-[0.08em] sm:w-auto sm:px-6">
            <SmoothScrollLink href={`/#plan-${recommendation.slug}`} onClick={() => rememberSelectedPlan(recommendation.title)}>
              VER PROGRAMA RECOMENDADO
              <ArrowRight className="premium-arrow size-4" />
            </SmoothScrollLink>
          </Button>

          <WhatsAppButton href={getStickyWhatsAppHref(recommendation.title)} className="h-12 w-full rounded-[12px] px-6 text-[0.78rem] font-semibold tracking-[0.05em] sm:w-auto">
            APLICAR POR WHATSAPP
          </WhatsAppButton>

          <Button variant="ghost" className="h-10 w-full rounded-[10px] text-xs text-white/76 hover:text-white sm:w-auto" onClick={handleEditAnswers}>
            Editar respuestas
          </Button>

          <Button variant="ghost" className="h-10 w-full rounded-[10px] text-xs text-white/76 hover:text-white sm:w-auto" onClick={handleReset}>
            Reiniciar encuesta
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!activeQuestion) return null;

  return (
    <Card className="overflow-hidden rounded-[16px] border-white/14 bg-[linear-gradient(155deg,#17181d_0%,#101116_44%,#170b0d_100%)] shadow-[0_34px_64px_-40px_rgba(0,0,0,0.95)]">
      <CardHeader className="space-y-4 border-b border-white/10 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <Badge className="w-fit rounded-[8px] border border-white/14 bg-black/32 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
              Encuesta estrategica
            </Badge>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary/88">
              PASO {stepIndex + 1} DE {totalSteps}
            </p>
            <CardTitle className="text-[1.75rem] leading-[0.98] text-white md:text-[2.15rem]">{activeQuestion.title}</CardTitle>
          </div>
          <p className="rounded-[9px] border border-primary/35 bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            100% perfil real
          </p>
        </div>

        <Progress value={progressValue} className="h-2 bg-white/12 [&_[data-slot=progress-indicator]]:bg-[linear-gradient(90deg,#8b0000_0%,#d41414_100%)]" />
        <p className="text-sm text-white/76">{activeQuestion.subtitle}</p>
      </CardHeader>

      <CardContent className="space-y-5 pb-4 pt-5">
        <div ref={stepPanelRef} key={activeQuestion.id} className="space-y-3.5">
          {activeQuestion.options.map((option) => {
            const selected = answers[activeQuestion.id] === option.value;

            return (
              <button
                key={option.label}
                type="button"
                onClick={(event) => handleOptionSelect(option.value, event.currentTarget)}
                className={cn(
                  "group relative flex min-h-[66px] w-full items-center justify-between gap-3 overflow-hidden rounded-[12px] border px-4 py-3.5 text-left transition-[transform,border-color,background-color,box-shadow] duration-[240ms] ease-[var(--ease-premium)] active:scale-[0.992]",
                  selected
                    ? "border-primary/72 bg-[linear-gradient(132deg,rgba(139,0,0,0.52)_0%,rgba(212,20,20,0.32)_100%)] text-white shadow-[0_22px_34px_-24px_rgba(212,20,20,0.95)]"
                    : "border-white/14 bg-[linear-gradient(130deg,rgba(18,19,24,0.92)_0%,rgba(14,15,19,0.96)_100%)] text-white/84 hover:border-primary/46 hover:bg-[linear-gradient(132deg,rgba(52,17,19,0.78)_0%,rgba(30,15,18,0.9)_100%)] hover:text-white"
                )}
                aria-pressed={selected}
              >
                <span className="text-[0.97rem] font-medium leading-snug">{option.label}</span>
                <span
                  className={cn(
                    "relative grid size-6 shrink-0 place-items-center rounded-full border transition duration-[220ms]",
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-white/25 bg-black/38 text-transparent group-hover:border-primary/45"
                  )}
                >
                  <Check className="size-3.5" />
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(answers).map(([key, value]) => (
            <Badge key={key} variant="outline" className="rounded-[8px] border-white/14 bg-black/32 text-white/74">
              {getAnswerLabel(key as keyof QuizAnswers, value as QuizAnswers[keyof QuizAnswers])}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t border-white/10 pb-5 pt-4">
        <div className="flex w-full items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-[10px] text-white/82 hover:text-white"
            onClick={handleBack}
            disabled={stepIndex === 0}
          >
            <ArrowLeft className="size-4" />
            Volver
          </Button>
          <p className="text-xs uppercase tracking-[0.12em] text-white/55">Responde segun tu realidad</p>
        </div>

        <Button
          type="button"
          onClick={handleNext}
          disabled={typeof selectedValue === "undefined"}
          className="premium-cta group h-12 w-full max-w-[320px] rounded-[12px] border border-primary/46 bg-[linear-gradient(120deg,#8b0000_0%,#d41414_100%)] text-[0.78rem] font-bold tracking-[0.12em] shadow-[0_22px_34px_-20px_rgba(212,20,20,0.9)] disabled:border-white/20 disabled:bg-white/10 disabled:text-white/40"
        >
          {stepIndex < totalSteps - 1 ? "SIGUIENTE" : "VER RECOMENDACION"}
          <ArrowRight className="premium-arrow size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
