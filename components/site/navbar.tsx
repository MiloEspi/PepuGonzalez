"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type NavValue = "sobre-mi" | "planes" | "plan-finder";
type HomeSection = "sobre-mi" | "planes-home" | "plan-finder";

const OBSERVED_HOME_SECTIONS: HomeSection[] = ["plan-finder", "sobre-mi", "planes-home"];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeValue, setActiveValue] = useState<NavValue>("plan-finder");

  const selectedValue = useMemo<NavValue>(() => {
    if (pathname.startsWith("/planes")) return "planes";
    return activeValue;
  }, [activeValue, pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;

    const supportsObserver = typeof window.IntersectionObserver !== "undefined";
    if (!supportsObserver) {
      const hash = window.location.hash.replace("#", "");
      const frame = requestAnimationFrame(() => {
        if (hash === "sobre-mi") setActiveValue("sobre-mi");
        if (hash === "plan-finder") setActiveValue("plan-finder");
        if (hash === "planes-home") setActiveValue("planes");
      });
      return () => cancelAnimationFrame(frame);
    }

    const targets = OBSERVED_HOME_SECTIONS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => Boolean(element)
    );
    if (!targets.length) return;

    const visibilityMap = new Map<HomeSection, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id as HomeSection;
          visibilityMap.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const [best] = Array.from(visibilityMap.entries()).sort((a, b) => b[1] - a[1]);
        if (!best || best[1] <= 0) return;

        if (best[0] === "sobre-mi") setActiveValue("sobre-mi");
        if (best[0] === "plan-finder") setActiveValue("plan-finder");
        if (best[0] === "planes-home") setActiveValue("planes");
      },
      {
        threshold: [0.1, 0.25, 0.45, 0.65],
        rootMargin: "-30% 0px -45% 0px",
      }
    );

    targets.forEach((target) => {
      visibilityMap.set(target.id as HomeSection, 0);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  function smoothScrollTo(sectionId: HomeSection) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${sectionId}`);
  }

  function handleValueChange(nextValue: string) {
    if (!nextValue) return;
    const value = nextValue as NavValue;

    if (value === "planes") {
      if (pathname === "/") {
        setActiveValue("planes");
        smoothScrollTo("planes-home");
        return;
      }

      router.push("/planes");
      return;
    }

    setActiveValue(value);

    if (pathname !== "/") {
      router.push(`/#${value}`);
      return;
    }

    smoothScrollTo(value);
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
              value={selectedValue}
              onValueChange={handleValueChange}
              aria-label="Navegacion principal"
              className="w-max rounded-full border border-border/80 bg-secondary/72 p-1 shadow-[inset_0_1px_0_hsl(0_0%_100%/0.62)]"
            >
              <ToggleGroupItem value="sobre-mi" aria-label="Ir a Sobre mi" className={itemClassName}>
                Sobre mi
              </ToggleGroupItem>
              <ToggleGroupItem value="planes" aria-label="Ir a Planes" className={itemClassName}>
                Planes
              </ToggleGroupItem>
              <ToggleGroupItem value="plan-finder" aria-label="Ir a Encontrar tu plan" className={itemClassName}>
                Encontra tu plan
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </header>
  );
}
