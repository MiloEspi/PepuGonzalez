"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { getStickyWhatsAppHref } from "@/data/offers";
import { getPlanInterestEventName, readSelectedPlan } from "@/lib/plan-interest";

export function MobileWhatsAppSticky() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const syncSelectedPlan = () => {
      setSelectedPlan(readSelectedPlan());
    };

    syncSelectedPlan();
    const eventName = getPlanInterestEventName();
    window.addEventListener("storage", syncSelectedPlan);
    window.addEventListener(eventName, syncSelectedPlan as EventListener);

    return () => {
      window.removeEventListener("storage", syncSelectedPlan);
      window.removeEventListener(eventName, syncSelectedPlan as EventListener);
    };
  }, []);

  return (
    <a
      href={getStickyWhatsAppHref(selectedPlan ?? undefined)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 rounded-[8px] border border-primary/45 bg-[linear-gradient(120deg,#8B0000_0%,#D41414_100%)] px-4 py-3 text-xs font-semibold text-white shadow-[0_20px_36px_-24px_rgba(212,20,20,0.86)] transition-transform duration-[220ms] ease-[var(--ease-premium)] hover:-translate-y-1 md:hidden"
      aria-label="Abrir WhatsApp para aplicar a un plan"
    >
      <MessageCircle className="size-4" />
      <span>{selectedPlan ? `WhatsApp: ${selectedPlan}` : "WhatsApp"}</span>
    </a>
  );
}
