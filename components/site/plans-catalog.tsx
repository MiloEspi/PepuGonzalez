"use client";

import { useMemo, useState } from "react";

import { PlanCard } from "@/components/site/plan-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GOAL_LABELS, LEVEL_LABELS, plans, type Goal, type Level } from "@/data/plans";

type GoalFilter = Goal | "all";
type LevelFilter = Level | "all";
type DaysFilter = 3 | 4 | 5 | "all";

const goalFilterOptions: Array<{ label: string; value: GoalFilter }> = [
  { label: "Todos", value: "all" },
  { label: GOAL_LABELS.definicion, value: "definicion" },
  { label: GOAL_LABELS.volumen, value: "volumen" },
  { label: GOAL_LABELS.rendimiento, value: "rendimiento" },
];

const levelFilterOptions: Array<{ label: string; value: LevelFilter }> = [
  { label: "Todos", value: "all" },
  { label: LEVEL_LABELS.principiante, value: "principiante" },
  { label: LEVEL_LABELS.intermedio, value: "intermedio" },
  { label: LEVEL_LABELS.avanzado, value: "avanzado" },
];

const daysFilterOptions: Array<{ label: string; value: DaysFilter }> = [
  { label: "Todos", value: "all" },
  { label: "3 dias", value: 3 },
  { label: "4 dias", value: 4 },
  { label: "5 dias", value: 5 },
];

function FilterGroup<T extends string | number>({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: Array<{ label: string; value: T }>;
  selected: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={`${title}-${option.value}`}
            type="button"
            size="sm"
            variant={selected === option.value ? "default" : "outline"}
            className="rounded-full"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function PlansCatalog() {
  const [goalFilter, setGoalFilter] = useState<GoalFilter>("all");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [daysFilter, setDaysFilter] = useState<DaysFilter>("all");

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      if (goalFilter !== "all" && plan.goal !== goalFilter) return false;
      if (levelFilter !== "all" && plan.level !== levelFilter) return false;
      if (daysFilter !== "all" && plan.daysPerWeek !== daysFilter) return false;
      return true;
    });
  }, [daysFilter, goalFilter, levelFilter]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border/80 bg-[linear-gradient(145deg,#16171b_0%,#121318_100%)] p-5 md:p-6">
        <div className="grid gap-5 md:grid-cols-3">
          <FilterGroup title="OBJETIVO" options={goalFilterOptions} selected={goalFilter} onChange={setGoalFilter} />
          <FilterGroup title="NIVEL" options={levelFilterOptions} selected={levelFilter} onChange={setLevelFilter} />
          <FilterGroup title="DIAS POR SEMANA" options={daysFilterOptions} selected={daysFilter} onChange={setDaysFilter} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Mostrando {filteredPlans.length} plan(es)</p>
        <Badge variant="outline" className="rounded-full">
          Actualizado para fase 1
        </Badge>
      </div>

      {filteredPlans.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredPlans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/55 p-8 text-center text-sm text-muted-foreground">
          No encontramos planes con esos filtros. Proba cambiar objetivo, nivel o dias.
        </div>
      )}
    </div>
  );
}
