const PLAN_STORAGE_KEY = "pepu:selected-plan";
const PLAN_EVENT_NAME = "pepu:selected-plan-updated";

export function rememberSelectedPlan(planName: string): void {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(PLAN_STORAGE_KEY, planName);
  window.dispatchEvent(new Event(PLAN_EVENT_NAME));
}

export function readSelectedPlan(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(PLAN_STORAGE_KEY);
}

export function getPlanInterestEventName(): string {
  return PLAN_EVENT_NAME;
}
