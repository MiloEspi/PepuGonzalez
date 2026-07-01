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
import { getStickyWhatsAppHref } from "@/data/offers";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

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
  { id: "sobre-mi", label: "Sobre mí" },
];

const APPLY_HREF = getStickyWhatsAppHref("Sistema Pepu");

const OBSERVER_THRESHOLDS = Array.from({ length: 17 }, (_, index) => index / 16);

function getViewportCoverage(rect: DOMRect, viewportHeight: number, navOffset: number) {
  const visibleTop = Math.max(rect.top, navOffset + 6);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return viewportHeight > 0 ? visibleHeight / viewportHeight : 0;
}

function resolveHref(pathname: string, id: PrimarySectionId) {
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
              Pepu González
            </Link>

            <nav aria-label="Navegación principal" className="hidden md:block md:justify-self-center">
              <ul className="flex items-center gap-2">
                {PRIMARY_NAV_ITEMS.map((item) => renderPrimaryItem(item, false))}
              </ul>
            </nav>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <div className="ml-auto flex items-center gap-2 justify-end md:justify-self-end">
                <WhatsAppButton
                  href={APPLY_HREF}
                  size="sm"
                  className="hidden md:inline-flex font-semibold tracking-[0.03em]"
                >
                  Aplicar
                </WhatsAppButton>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isMenuOpen}
                    className="inline-flex size-9 items-center justify-center rounded-[9px] border border-white/14 bg-white/[0.06] text-white/88 transition-all duration-[220ms] ease-[var(--ease-premium)] hover:border-primary/36 hover:bg-white/[0.12] hover:text-white hover:shadow-[0_0_24px_-15px_rgba(212,20,20,0.92)]"
                  >
                    {isMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
                  </button>
                </SheetTrigger>
              </div>

              <SheetContent side="right" className="gap-5 px-4 pb-5 pt-9">
                <SheetHeader className="space-y-1 border-b border-white/10 pb-4 pr-8">
                  <SheetTitle className="font-heading text-[1.2rem] font-semibold tracking-[0.02em]">Navegación</SheetTitle>
                  <SheetDescription className="text-xs uppercase tracking-[0.14em] text-white/58">
                    Elegí una sección para avanzar rápido
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-5 overflow-y-auto pb-2">
                  {/* Botón WhatsApp destacado */}
                  <a
                    href={APPLY_HREF}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-[#25D366] bg-[#25D366] px-4 py-3 text-sm font-bold text-[#07371f] transition-colors duration-200 hover:bg-[#1fbd5b]"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0 fill-current">
                      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.48 0 .11 5.36.11 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.9 11.9 0 0 0 5.7 1.45h.01c6.58 0 11.94-5.36 11.95-11.95a11.84 11.84 0 0 0-3.38-8.38ZM12 21.7c-1.77 0-3.51-.47-5.03-1.37l-.36-.21-3.7.97.99-3.6-.24-.37a9.79 9.79 0 0 1-1.52-5.2c0-5.41 4.4-9.81 9.82-9.81 2.62 0 5.08 1.02 6.93 2.88a9.73 9.73 0 0 1 2.88 6.93c0 5.41-4.4 9.81-9.81 9.81Zm5.38-7.37c-.29-.14-1.7-.84-1.96-.94-.26-.1-.45-.14-.64.15-.18.29-.73.94-.9 1.14-.16.2-.33.22-.62.08-.29-.14-1.23-.45-2.34-1.43-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.12-.59.12-.12.29-.33.43-.49.14-.16.19-.28.29-.47.09-.2.05-.37-.02-.52-.07-.14-.64-1.55-.87-2.12-.24-.57-.48-.49-.64-.5l-.55-.01c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.46s1.07 2.85 1.22 3.05c.14.2 2.09 3.18 5.06 4.46.71.31 1.27.49 1.71.62.72.23 1.37.2 1.88.12.58-.09 1.7-.69 1.95-1.36.24-.67.24-1.24.17-1.36-.07-.13-.26-.2-.55-.34Z" />
                    </svg>
                    Aplicar
                  </a>

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

                  {resolvedExtraNavItems.length > 0 && (
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
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <nav aria-label="Navegación principal mobile" className="border-t border-white/[0.07] px-2 pb-2 pt-1.5 md:hidden">
            <ul className="flex flex-wrap gap-1.5">
              {PRIMARY_NAV_ITEMS.map((item) => renderPrimaryItem(item, true))}
              <li>
                <a
                  href={APPLY_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-[9px] border border-[#25D366]/60 bg-[#25D366]/14 px-2.5 py-1.5 text-xs font-semibold text-[#25D366] transition-colors duration-200 hover:bg-[#25D366]/26"
                >
                  Aplicar
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
