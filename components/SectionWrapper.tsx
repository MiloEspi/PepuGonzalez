"use client";

import { animate } from "animejs";
import { type ReactNode, useEffect, useRef } from "react";
import { useMachine } from "@xstate/react";

import { sectionMachine } from "@/state/sectionMachine";
import { EASE_OUT_EXPO, PREMIUM_EASE, animateSectionIntro, prefersReducedMotion, resetWillChange, setWillChange } from "@/utils/animations";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [state, send] = useMachine(sectionMachine);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      send({ type: "ENTER_VIEW" });
      return;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = section.getBoundingClientRect();
    const initiallyVisible = rect.top < viewportHeight * 0.96 && rect.bottom > viewportHeight * 0.04;

    if (initiallyVisible) {
      send({ type: "ENTER_VIEW" });
      return;
    }

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(14px)";
    });
  }, [reducedMotion, send]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      send({ type: "ENTER_VIEW" });
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      send({ type: "ENTER_VIEW" });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry || !entry.isIntersecting) return;
        send({ type: "ENTER_VIEW" });
        observer.unobserve(section);
      },
      {
        // On tall sections (mobile), high thresholds can never be reached.
        threshold: 0,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion, send]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new MutationObserver(() => {
      const navActive = section.getAttribute("data-nav-active") === "true";
      send({ type: "NAV_ACTIVE", value: navActive });
    });

    observer.observe(section, { attributes: true, attributeFilter: ["data-nav-active"] });
    return () => observer.disconnect();
  }, [send]);

  useEffect(() => {
    if (!sectionRef.current || !state.matches("entering")) return;
    animateSectionIntro(sectionRef.current);
  }, [state]);

  useEffect(() => {
    if (!sectionRef.current || !state.context.navActive || reducedMotion) return;
    const title = sectionRef.current.querySelector<HTMLElement>("[data-section-title]");
    const line = sectionRef.current.querySelector<HTMLElement>("[data-section-line]");
    if (!title || !line) return;

    setWillChange([title, line], "transform, opacity");
    line.style.filter = "url(#redWobble)";

    animate(title, {
      translateY: [0, -2, 0],
      duration: 290,
      ease: EASE_OUT_EXPO,
    });

    animate(line, {
      opacity: [1, 0.92, 1],
      scaleX: [1, 1.02, 1],
      duration: 300,
      ease: PREMIUM_EASE,
      complete: () => {
        line.style.filter = "";
        resetWillChange([title, line]);
      },
    });
  }, [reducedMotion, state.context.navActive]);

  return (
    <section id={id} ref={sectionRef} className={cn(className)}>
      {children}
    </section>
  );
}

