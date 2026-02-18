"use client";

import { useEffect } from "react";

type OverflowEntry = {
  element: HTMLElement;
  overflowBy: number;
};

const THROTTLE_MS = 800;

function getElementLabel(element: HTMLElement) {
  const id = element.id ? `#${element.id}` : "";
  const className =
    typeof element.className === "string" && element.className.trim().length
      ? `.${element.className.trim().replace(/\s+/g, ".")}`
      : "";
  return `${element.tagName.toLowerCase()}${id}${className}`;
}

function findOverflowEntries() {
  const viewportWidth = document.documentElement.clientWidth;
  const documentOverflow = document.documentElement.scrollWidth - viewportWidth;
  if (documentOverflow <= 1) return [];

  const nodes = Array.from(document.querySelectorAll<HTMLElement>("body *"));
  const entries: OverflowEntry[] = [];

  for (const node of nodes) {
    const style = window.getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") continue;
    if (style.position === "fixed") continue;
    if (node.clientWidth <= 0) continue;

    const rect = node.getBoundingClientRect();
    const overflowBy = Math.max(0, rect.right - viewportWidth, -rect.left);

    if (overflowBy > 1) {
      entries.push({ element: node, overflowBy });
    }
  }

  entries.sort((a, b) => b.overflowBy - a.overflowBy);
  return entries.slice(0, 20);
}

export function OverflowDebug() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let lastRunAt = 0;
    let timeoutId: number | null = null;
    let lastResultSignature = "";

    const elementIds = new WeakMap<HTMLElement, number>();
    let nextElementId = 1;

    const getElementId = (element: HTMLElement) => {
      let id = elementIds.get(element);
      if (!id) {
        id = nextElementId;
        nextElementId += 1;
        elementIds.set(element, id);
      }
      return id;
    };

    const getResultSignature = (entries: OverflowEntry[]) => {
      if (!entries.length) return "none";
      const ids = Array.from(new Set(entries.map((entry) => getElementId(entry.element))));
      ids.sort((a, b) => a - b);
      return ids.join(",");
    };

    const logOverflowIfChanged = () => {
      const entries = findOverflowEntries();
      const resultSignature = getResultSignature(entries);
      if (resultSignature === lastResultSignature) return;
      lastResultSignature = resultSignature;

      if (!entries.length) {
        console.debug("[overflow-debug] no overflow elements");
        return;
      }

      console.groupCollapsed(`[overflow-debug] found ${entries.length} potential overflow elements`);
      for (const entry of entries) {
        console.log(`[overflow-debug] +${entry.overflowBy.toFixed(2)}px`, getElementLabel(entry.element), entry.element);
      }
      console.groupEnd();
    };

    const runNow = () => {
      lastRunAt = Date.now();
      logOverflowIfChanged();
    };

    const scheduleLog = () => {
      const now = Date.now();
      const elapsed = now - lastRunAt;
      if (elapsed >= THROTTLE_MS) {
        runNow();
        return;
      }

      if (timeoutId !== null) return;
      timeoutId = window.setTimeout(() => {
        timeoutId = null;
        runNow();
      }, THROTTLE_MS - elapsed);
    };

    scheduleLog();
    window.addEventListener("resize", scheduleLog);
    window.addEventListener("load", scheduleLog);

    // Expose manual trigger in devtools.
    (window as typeof window & { __debugOverflow?: () => void }).__debugOverflow = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      runNow();
    };

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", scheduleLog);
      window.removeEventListener("load", scheduleLog);
      const overflowWindow = window as typeof window & { __debugOverflow?: () => void };
      delete overflowWindow.__debugOverflow;
    };
  }, []);

  return null;
}
