"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type NavValue = "sobremi" | "planes" | "encontra-tu-plan";
type ActiveNavValue = NavValue | "none";

const NAV_SPY_SECTIONS: NavValue[] = ["encontra-tu-plan", "sobremi", "planes"];
const NAV_TOP_OFFSET = 92;
const ACTIVE_LINE_OFFSET = 20;
const MIN_VISIBLE_RATIO = 0.32;

interface VisibilityState {
  ratio: number;
  top: number;
  bottom: number;
}

function pickActiveSection(stateMap: Map<NavValue, VisibilityState>): ActiveNavValue {
  const activeLine = NAV_TOP_OFFSET + ACTIVE_LINE_OFFSET;
  const candidates = NAV_SPY_SECTIONS.filter((id) => {
    const section = stateMap.get(id);
    if (!section) return false;
    const nearTop = section.top <= activeLine && section.bottom > activeLine;
    return section.ratio >= MIN_VISIBLE_RATIO || nearTop;
  });

  if (!candidates.length) return "none";

  const [best] = candidates.sort((a, b) => {
    const aState = stateMap.get(a)!;
    const bState = stateMap.get(b)!;
    const ratioDelta = bState.ratio - aState.ratio;

    if (Math.abs(ratioDelta) > 0.05) {
      return ratioDelta;
    }

    return Math.abs(aState.top - activeLine) - Math.abs(bState.top - activeLine);
  });

  return best ?? "none";
}

function buildInitialStateMap(sections: HTMLElement[]): Map<NavValue, VisibilityState> {
  const initial = new Map<NavValue, VisibilityState>();

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const visibleTop = Math.max(rect.top, NAV_TOP_OFFSET);
    const visibleBottom = Math.min(rect.bottom, viewportHeight);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;

    initial.set(section.id as NavValue, {
      ratio,
      top: rect.top,
      bottom: rect.bottom,
    });
  });

  return initial;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [homeActive, setHomeActive] = useState<ActiveNavValue>("none");

  const selectedValue = useMemo<ActiveNavValue>(() => {
    if (pathname.startsWith("/planes")) return "planes";
    if (pathname !== "/") return "none";
    return homeActive;
  }, [homeActive, pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;

    const supportsObserver = typeof window.IntersectionObserver !== "undefined";
    if (!supportsObserver) {
      const hash = window.location.hash.replace("#", "") as ActiveNavValue;
      const frame = requestAnimationFrame(() => {
        if (NAV_SPY_SECTIONS.includes(hash as NavValue)) {
          setHomeActive(hash);
          return;
        }
        setHomeActive("none");
      });
      return () => cancelAnimationFrame(frame);
    }

    const sections = NAV_SPY_SECTIONS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node)
    );
    if (!sections.length) return;

    const stateMap = buildInitialStateMap(sections);
    const initialFrame = requestAnimationFrame(() => {
      setHomeActive(pickActiveSection(stateMap));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id as NavValue;
          stateMap.set(id, {
            ratio: entry.isIntersecting ? entry.intersectionRatio : 0,
            top: entry.boundingClientRect.top,
            bottom: entry.boundingClientRect.bottom,
          });
        });

        setHomeActive(pickActiveSection(stateMap));
      },
      {
        threshold: [0, 0.1, 0.2, 0.32, 0.45, 0.6, 0.8, 1],
        rootMargin: `-${NAV_TOP_OFFSET}px 0px -12% 0px`,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      cancelAnimationFrame(initialFrame);
      observer.disconnect();
    };
  }, [pathname]);

  function scrollToSection(id: NavValue) {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
  }

  function handleValueChange(nextValue: string) {
    if (!nextValue) return;
    const value = nextValue as NavValue;

    if (value === "planes" && pathname !== "/") {
      router.push("/planes");
      return;
    }

    if (pathname !== "/") {
      router.push(`/#${value}`);
      return;
    }

    scrollToSection(value);
  }

  const itemClassName = cn(
    "text-muted-foreground hover:bg-secondary hover:text-foreground",
    "data-[state=on]:bg-primary data-[state=on]:font-bold data-[state=on]:text-primary-foreground",
    "data-[state=on]:shadow-sm data-[state=on]:ring-1 data-[state=on]:ring-primary/20 motion-safe:data-[state=on]:-translate-y-px"
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/82">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="shrink-0 font-heading text-lg font-semibold text-foreground">
          Pepu Gonzalez
        </Link>

        <div className="flex min-w-0 flex-1 justify-end">
          <div className="max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ToggleGroup
              type="single"
              value={selectedValue === "none" ? undefined : selectedValue}
              onValueChange={handleValueChange}
              aria-label="Navegacion principal"
              className="w-max rounded-full border border-border/80 bg-secondary/72 p-1 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.62)]"
            >
              <ToggleGroupItem value="encontra-tu-plan" aria-label="Ir a Encontrar tu plan" className={itemClassName}>
                Encontra tu plan
              </ToggleGroupItem>
              <ToggleGroupItem value="sobremi" aria-label="Ir a Sobre mi" className={itemClassName}>
                Sobre mi
              </ToggleGroupItem>
              <ToggleGroupItem value="planes" aria-label="Ir a Planes" className={itemClassName}>
                Planes
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </header>
  );
}
