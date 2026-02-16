"use client";

import { animate, stagger } from "animejs";

export const EASE_OUT_EXPO = "outExpo";
export const PREMIUM_EASE = "cubicBezier(.22,1,.36,1)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function setWillChange(targets: HTMLElement[] | HTMLElement, value: string) {
  const nodes = Array.isArray(targets) ? targets : [targets];
  nodes.forEach((node) => {
    node.style.willChange = value;
  });
}

export function resetWillChange(targets: HTMLElement[] | HTMLElement) {
  const nodes = Array.isArray(targets) ? targets : [targets];
  nodes.forEach((node) => {
    node.style.willChange = "auto";
  });
}

export function animateCounter(
  target: HTMLElement,
  to: number,
  options?: { from?: number; duration?: number; prefix?: string; suffix?: string }
) {
  const { from = 0, duration = 1320, prefix = "", suffix = "" } = options ?? {};

  if (prefersReducedMotion()) {
    target.textContent = `${prefix}${to}${suffix}`;
    return;
  }

  const counter = { value: from };
  setWillChange(target, "opacity, transform");
  animate(counter, {
    value: [from, to],
    duration,
    ease: EASE_OUT_EXPO,
    update: () => {
      target.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
    },
    complete: () => {
      target.textContent = `${prefix}${to}${suffix}`;
      resetWillChange(target);
    },
  });
}

export function animateSectionIntro(section: HTMLElement) {
  const title = section.querySelector<HTMLElement>("[data-section-title]");
  const line = section.querySelector<HTMLElement>("[data-section-line]");
  const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (prefersReducedMotion()) {
    if (title) {
      title.style.opacity = "1";
      title.style.transform = "translateY(0px)";
    }
    if (line) {
      line.style.opacity = "1";
      line.style.transform = "scaleX(1)";
    }
    cards.forEach((card) => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0px)";
    });
    return;
  }

  if (title) {
    setWillChange(title, "transform, opacity");
    animate(title, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 430,
      ease: EASE_OUT_EXPO,
      complete: () => resetWillChange(title),
    });
  }

  if (line) {
    setWillChange(line, "transform, opacity");
    animate(line, {
      opacity: [0.22, 1],
      scaleX: [0, 1],
      duration: 420,
      delay: 60,
      ease: PREMIUM_EASE,
      complete: () => resetWillChange(line),
    });
  }

  if (cards.length) {
    setWillChange(cards, "transform, opacity");
    animate(cards, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 380,
      delay: stagger(60, { start: 80 }),
      ease: PREMIUM_EASE,
      complete: () => resetWillChange(cards),
    });
  }
}

export function pulseActiveTab(target: HTMLElement) {
  if (prefersReducedMotion()) return;

  const glow = target.querySelector<HTMLElement>("[data-nav-glow]");
  setWillChange(target, "transform");
  animate(target, {
    scale: [1, 1.03, 1],
    duration: 300,
    ease: EASE_OUT_EXPO,
    complete: () => resetWillChange(target),
  });

  if (glow) {
    setWillChange(glow, "opacity");
    glow.style.filter = "url(#redWobble)";
    animate(glow, {
      opacity: [0, 0.64, 0.14],
      duration: 300,
      ease: EASE_OUT_EXPO,
      complete: () => {
        glow.style.filter = "";
        resetWillChange(glow);
      },
    });
  }
}

