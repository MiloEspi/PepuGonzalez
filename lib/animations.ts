"use client";

import { animate, stagger } from "animejs";

type TargetInput = HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | null;

interface FadeSlideOptions {
  distance?: number;
  duration?: number;
  delay?: number;
  staggerStep?: number;
}

function toElementArray(targets: TargetInput): HTMLElement[] {
  if (!targets) return [];
  if (targets instanceof HTMLElement) return [targets];
  if (targets instanceof NodeList) return Array.from(targets);
  return targets;
}

export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animateFadeSlideIn(targets: TargetInput, options: FadeSlideOptions = {}): void {
  const nodes = toElementArray(targets);
  if (!nodes.length) return;

  const { distance = 24, duration = 640, delay = 0, staggerStep = 80 } = options;

  if (shouldReduceMotion()) {
    nodes.forEach((node) => {
      node.style.opacity = "1";
      node.style.transform = "translateY(0px)";
    });
    return;
  }

  nodes.forEach((node) => {
    node.style.willChange = "transform, opacity";
  });

  animate(nodes, {
    opacity: [0, 1],
    translateY: [distance, 0],
    duration,
    delay: nodes.length > 1 ? stagger(staggerStep, { start: delay }) : delay,
    ease: "out(3)",
    complete: () => {
      nodes.forEach((node) => {
        node.style.willChange = "auto";
      });
    },
  });
}

export function morphDiscToPill(button: HTMLElement | null, label: HTMLElement | null): void {
  if (!button) return;

  if (shouldReduceMotion()) {
    button.style.width = "13rem";
    button.style.height = "3rem";
    button.style.borderRadius = "999px";
    if (label) {
      label.style.opacity = "1";
      label.style.transform = "translateX(0px)";
    }
    return;
  }

  animate(button, {
    width: ["4rem", "13rem"],
    height: ["4rem", "3rem"],
    scale: [1, 1.03, 1],
    borderRadius: ["999px", "999px"],
    duration: 450,
    ease: "inOut(3)",
  });

  if (label) {
    animate(label, {
      opacity: [0, 1],
      translateX: [10, 0],
      duration: 260,
      delay: 150,
      ease: "out(3)",
    });
  }
}
