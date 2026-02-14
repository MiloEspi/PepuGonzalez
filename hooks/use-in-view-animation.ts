"use client";

import { type RefObject, useEffect, useState } from "react";

interface UseInViewAnimationOptions extends IntersectionObserverInit {
  once?: boolean;
  disabled?: boolean;
}

export function useInViewAnimation<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseInViewAnimationOptions = {}
) {
  const {
    threshold = 0.15,
    root = null,
    rootMargin = "0px 0px -10% 0px",
    once = true,
    disabled = false,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    handleMotionPreference();
    mediaQuery.addEventListener("change", handleMotionPreference);
    return () => mediaQuery.removeEventListener("change", handleMotionPreference);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (disabled || prefersReducedMotion) {
      const frame = requestAnimationFrame(() => {
        setIsInView(true);
        setHasAnimated(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    if (typeof window === "undefined") return;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = node.getBoundingClientRect();
    const isInitiallyVisible = rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * 0.1;

    if (isInitiallyVisible) {
      const frame = requestAnimationFrame(() => {
        setIsInView(true);
        setHasAnimated(true);
      });

      if (once) {
        return () => cancelAnimationFrame(frame);
      }
    }

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => {
        setIsInView(true);
        setHasAnimated(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsInView(true);
          setHasAnimated(true);
          if (once) observer.unobserve(entry.target);
          return;
        }

        if (!once) {
          setIsInView(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin, once, disabled, prefersReducedMotion]);

  return {
    isInView,
    hasEnteredView: hasAnimated,
    hasAnimated,
    prefersReducedMotion,
  };
}
