"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { animate } from "animejs";
import { useMachine } from "@xstate/react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navbarMachine, type NavbarSectionId } from "@/state/navbarMachine";
import { EASE_OUT_EXPO, pulseActiveTab, prefersReducedMotion } from "@/utils/animations";
import { cn } from "@/lib/utils";

type PrimarySectionId = Exclude<NavbarSectionId, "none">;

type PrimaryNavItem = {
  id: PrimarySectionId;
  label: string;
};

type ExtraNavItem = {
  label: string;
  href: string;
};

interface NavbarProps {
  extraNavItems: ExtraNavItem[];
}

const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: "cuestionario", label: "Cuestionario" },
  { id: "sobre-mi", label: "Sobre mi" },
  { id: "planes", label: "Planes" },
];

const OBSERVER_THRESHOLDS = Array.from({ length: 17 }, (_, index) => index / 16);

function getViewportCoverage(rect: DOMRect, viewportHeight: number, navOffset: number) {
  const visibleTop = Math.max(rect.top, navOffset + 6);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return viewportHeight > 0 ? visibleHeight / viewportHeight : 0;
}

function resolveHref(pathname: string, id: PrimarySectionId) {
  if (id === "planes") {
    return pathname === "/" ? "#planes" : "/programas";
  }

  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export function Navbar({ extraNavItems }: NavbarProps) {
  const pathname = usePathname();
  const [navState, sendNav] = useMachine(navbarMachine);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [navOffset, setNavOffset] = useState(104);

  const selectedValue = useMemo<NavbarSectionId>(() => {
    if (pathname.startsWith("/programas") || pathname.startsWith("/planes")) return "planes";
    if (pathname !== "/") return "none";
    return navState.context.activeId;
  }, [navState.context.activeId, pathname]);

  const resolvedExtraNavItems = useMemo(() => {
    return extraNavItems.filter((item) => item.label?.trim() && item.href?.trim());
  }, [extraNavItems]);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateOffset = () => {
      const navHeight = headerRef.current?.offsetHeight ?? 98;
      document.documentElement.style.setProperty("--navbar-height", `${navHeight}px`);
      setNavOffset(navHeight + 6);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    if (typeof window === "undefined") return;

    const sections = PRIMARY_NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node)
    );

    if (!sections.length) return;

    const updateFromRects = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      let bestId: NavbarSectionId = "none";
      let bestScore = 0;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const id = section.id as PrimarySectionId;
        const viewportCoverage = getViewportCoverage(rect, viewportHeight, navOffset);
        const nearTop = rect.top <= navOffset + 56 && rect.bottom > navOffset + 44;
        const score = viewportCoverage + (nearTop ? 0.16 : 0);

        if (score > bestScore && (viewportCoverage > 0.08 || nearTop)) {
          bestScore = score;
          bestId = id;
        }
      });

      sendNav({ type: "SET_ACTIVE", id: bestId });
    };

    updateFromRects();

    const observer = new IntersectionObserver(
      () => updateFromRects(),
      {
        threshold: OBSERVER_THRESHOLDS,
        rootMargin: `-${navOffset}px 0px -42% 0px`,
      }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("resize", updateFromRects);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateFromRects);
    };
  }, [navOffset, pathname, sendNav]);

  useEffect(() => {
    const activeHomeSection = pathname === "/" ? navState.context.activeId : "none";

    PRIMARY_NAV_ITEMS.forEach((item) => {
      const section = document.getElementById(item.id);
      if (!section) return;

      if (pathname === "/" && activeHomeSection === item.id) {
        section.setAttribute("data-nav-active", "true");
        return;
      }

      section.removeAttribute("data-nav-active");
    });
  }, [navState.context.activeId, pathname]);

  useEffect(() => {
    if (selectedValue === "none") return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(`[data-nav-item='${selectedValue}']`));
    nodes.forEach((node) => pulseActiveTab(node));
  }, [navState.value, selectedValue]);

  function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
  }

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    setIsMenuOpen(false);

    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
    sendNav({ type: "SET_ACTIVE", id: "none" });
  }

  function handlePrimaryClick(event: MouseEvent<HTMLAnchorElement>, id: PrimarySectionId) {
    setIsMenuOpen(false);

    if (pathname !== "/") return;

    event.preventDefault();
    sendNav({ type: "SET_ACTIVE", id });
    scrollToSection(id);
  }

  function handleExtraClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    setIsMenuOpen(false);

    if (pathname !== "/") return;
    if (!href.startsWith("#")) return;

    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);
    if (!section) return;

    event.preventDefault();
    scrollToSection(sectionId);
  }

  const navbarTone = isScrolled || isMenuOpen;

  function renderPrimaryItem(item: PrimaryNavItem, compact: boolean) {
    const active = selectedValue === item.id;
    const href = resolveHref(pathname, item.id);

    return (
      <li key={`${item.id}-${compact ? "compact" : "desktop"}`}>
        <a
          data-nav-item={item.id}
          href={href}
          onClick={(event) => handlePrimaryClick(event, item.id)}
          onMouseEnter={(event) => {
            if (reducedMotion) return;
            const line = event.currentTarget.querySelector<HTMLElement>("[data-nav-line]");
            const glow = event.currentTarget.querySelector<HTMLElement>("[data-nav-glow]");
            if (line) {
              animate(line, {
                scaleX: [0, 1],
                duration: 220,
                ease: EASE_OUT_EXPO,
              });
            }
            if (glow) {
              animate(glow, {
                opacity: [0.14, 0.35],
                duration: 230,
                ease: EASE_OUT_EXPO,
              });
            }
          }}
          onMouseLeave={(event) => {
            if (active || reducedMotion) return;
            const glow = event.currentTarget.querySelector<HTMLElement>("[data-nav-glow]");
            if (!glow) return;
            animate(glow, {
              opacity: [0.34, 0.14],
              duration: 180,
              ease: EASE_OUT_EXPO,
            });
          }}
          aria-current={active ? "page" : undefined}
          className={cn(
            "group relative inline-flex items-center rounded-[9px] border transition-all duration-[240ms] ease-[var(--ease-premium)]",
            compact ? "px-2.5 py-1.5 text-xs font-semibold" : "px-3.5 py-2 text-sm font-semibold",
            active
              ? "border-primary/58 bg-[linear-gradient(120deg,rgba(139,0,0,0.82)_0%,rgba(212,20,20,0.98)_100%)] text-white shadow-[0_14px_24px_-18px_rgba(212,20,20,0.9)]"
              : "border-white/12 text-white/78 hover:border-primary/34 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_22px_-14px_rgba(212,20,20,0.78)]"
          )}
        >
          <span
            data-nav-glow
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[8px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,26,26,0.32),transparent_72%)] opacity-14"
          />
          <span className="relative z-10">{item.label}</span>
          <span
            data-nav-line
            className={cn(
              "pointer-events-none absolute -bottom-px left-2 right-2 h-px origin-center rounded-full bg-primary transition-transform duration-[220ms] ease-[var(--ease-premium)]",
              active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            )}
          />
        </a>
      </li>
    );
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-[rgba(10,10,15,0.5)] backdrop-blur-[12px] transition-shadow duration-300",
        navbarTone ? "shadow-[0_20px_42px_-30px_rgba(0,0,0,0.92)]" : "shadow-[0_12px_28px_-24px_rgba(0,0,0,0.72)]"
      )}
    >
      <div className="layout-shell py-1.5 md:py-2">
        <div
          data-navbar-shell
          className={cn(
            "relative overflow-visible transition-shadow duration-[260ms] ease-[var(--ease-premium)]",
            navbarTone ? "shadow-[0_16px_30px_-26px_rgba(0,0,0,0.72)]" : "shadow-none"
          )}
        >
          <div className="flex items-center gap-3 px-2.5 py-2 md:grid md:grid-cols-[1fr_auto_1fr] md:px-3 md:py-2.5">
            <Link
              href="/"
              onClick={handleBrandClick}
              className="min-w-0 truncate font-heading text-[1.12rem] font-extrabold tracking-[-0.02em] text-white/90 transition-colors duration-200 hover:text-white sm:text-[1.34rem]"
            >
              Pepu Gonzalez
            </Link>

            <nav aria-label="Navegacion principal" className="hidden md:block md:justify-self-center">
              <ul className="flex items-center gap-2">{PRIMARY_NAV_ITEMS.map((item) => renderPrimaryItem(item, false))}</ul>
            </nav>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <div className="ml-auto flex items-center justify-end md:justify-self-end">
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
                    aria-expanded={isMenuOpen}
                    className="inline-flex size-9 items-center justify-center rounded-[9px] border border-white/14 bg-white/[0.06] text-white/88 transition-all duration-[220ms] ease-[var(--ease-premium)] hover:border-primary/36 hover:bg-white/[0.12] hover:text-white hover:shadow-[0_0_24px_-15px_rgba(212,20,20,0.92)]"
                  >
                    {isMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
                  </button>
                </SheetTrigger>
              </div>

              <SheetContent side="right" className="gap-5 px-4 pb-5 pt-9">
                <SheetHeader className="space-y-1 border-b border-white/10 pb-4 pr-8">
                  <SheetTitle className="font-heading text-[1.2rem] font-semibold tracking-[0.02em]">Navegacion</SheetTitle>
                  <SheetDescription className="text-xs uppercase tracking-[0.14em] text-white/58">
                    Elegi una seccion para avanzar rapido
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-5 overflow-y-auto pb-2">
                  <div className="space-y-2">
                    <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/54">Accesos</p>
                    <ul className="space-y-1.5">
                      {PRIMARY_NAV_ITEMS.map((item) => (
                        <li key={`sheet-${item.id}`}>
                          <a
                            href={resolveHref(pathname, item.id)}
                            onClick={(event) => handlePrimaryClick(event, item.id)}
                            className="inline-flex w-full items-center rounded-[10px] border border-white/14 bg-white/[0.05] px-3 py-2.5 text-sm font-medium text-foreground transition-colors duration-[220ms] ease-[var(--ease-premium)] hover:border-primary/34 hover:bg-primary/12"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/54">Explorar</p>
                    <ul className="space-y-1.5">
                      {resolvedExtraNavItems.map((item) => (
                        <li key={`sheet-extra-${item.href}-${item.label}`}>
                          <a
                            href={item.href.startsWith("#") && pathname !== "/" ? `/${item.href}` : item.href}
                            onClick={(event) => handleExtraClick(event, item.href)}
                            className="inline-flex w-full items-center rounded-[10px] border border-white/12 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-white/80 transition-colors duration-[220ms] ease-[var(--ease-premium)] hover:border-primary/32 hover:bg-primary/10 hover:text-white"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <nav aria-label="Navegacion principal mobile" className="border-t border-white/[0.07] px-2 pb-2 pt-1.5 md:hidden">
            <ul className="flex flex-wrap gap-1.5">{PRIMARY_NAV_ITEMS.map((item) => renderPrimaryItem(item, true))}</ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

