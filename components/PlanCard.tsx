"use client";

import { animate } from "animejs";
import { type ComponentProps, useMemo, useRef } from "react";

import { EASE_OUT_EXPO, prefersReducedMotion, resetWillChange, setWillChange } from "@/utils/animations";
import { cn } from "@/lib/utils";

type PlanCardProps = ComponentProps<"article">;

export function PlanCard({ className, children, onPointerDown, onPointerUp, onMouseEnter, onMouseLeave, ...props }: PlanCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  function runInteraction(active: boolean) {
    const card = cardRef.current;
    if (!card || reducedMotion) return;

    const media = card.querySelector<HTMLElement>("[data-plan-media-image]");
    const overlay = card.querySelector<HTMLElement>("[data-plan-media-overlay]");
    const accent = card.querySelector<HTMLElement>("[data-plan-accent]");
    const copy = card.querySelector<HTMLElement>("[data-plan-copy]");

    const targets = [media, overlay, accent, copy].filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    setWillChange(targets, "transform, opacity");

    if (media) {
      animate(media, {
        scale: active ? 1.04 : 1,
        duration: active ? 320 : 280,
        ease: EASE_OUT_EXPO,
      });
    }

    if (overlay) {
      animate(overlay, {
        opacity: active ? 0.92 : 0.78,
        duration: active ? 320 : 280,
        ease: EASE_OUT_EXPO,
      });
    }

    if (accent) {
      accent.style.filter = active ? "url(#redWobble)" : "";
      animate(accent, {
        opacity: active ? 1 : 0.58,
        scaleY: active ? 1 : 0.92,
        duration: active ? 300 : 260,
        ease: EASE_OUT_EXPO,
      });
    }

    if (copy) {
      animate(copy, {
        translateY: active ? -2 : 0,
        duration: active ? 280 : 240,
        ease: EASE_OUT_EXPO,
      });
    }

    setTimeout(() => resetWillChange(targets), active ? 360 : 300);
  }

  return (
    <article
      {...props}
      ref={cardRef}
      className={cn(className)}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        runInteraction(true);
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        runInteraction(false);
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.pointerType === "touch") runInteraction(true);
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        if (event.pointerType === "touch") runInteraction(false);
      }}
    >
      {children}
    </article>
  );
}
