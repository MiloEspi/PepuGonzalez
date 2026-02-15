"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { animate } from "animejs";

import { cn } from "@/lib/utils";

type PrimarySectionId = "encontra-tu-plan" | "sobremi" | "planes";
type ActiveNav = PrimarySectionId | "none";

type PrimaryNavItem = {
  id: PrimarySectionId;
  label: string;
  mobileLabel: string;
};

const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  { id: "encontra-tu-plan", label: "Encontra tu plan", mobileLabel: "Cuestionario" },
  { id: "sobremi", label: "Sobre mi", mobileLabel: "Sobre mi" },
  { id: "planes", label: "Planes", mobileLabel: "Planes" },
];

const EXTRA_NAV_ITEMS = [
  { id: "resultados", label: "Resultados" },
  { id: "diferenciales", label: "Competencias" },
  { id: "faq", label: "FAQ" },
  { id: "aplicar-ahora", label: "Aplicar" },
  { id: "contacto", label: "Contacto" },
];

const NAV_TOP_OFFSET = 92;
const ACTIVE_MIN_COVERAGE = 0.34;
const HERO_VISIBLE_MIN_COVERAGE = 0.34;

interface SectionState {
  top: number;
  bottom: number;
  viewportCoverage: number;
}

function buildThresholds() {
  return Array.from({ length: 21 }, (_, index) => index / 20);
}

function getViewportCoverage(rect: DOMRect, viewportHeight: number) {
  const visibleTop = Math.max(rect.top, NAV_TOP_OFFSET + 6);
  const visibleBottom = Math.min(rect.bottom, viewportHeight);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return viewportHeight > 0 ? visibleHeight / viewportHeight : 0;
}

function heroIsDominatingView() {
  if (typeof window === "undefined") return false;
  const hero = document.getElementById("inicio");
  if (!hero) return false;

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const rect = hero.getBoundingClientRect();
  const coverage = getViewportCoverage(rect, viewportHeight);
  const keepsTop = rect.top <= NAV_TOP_OFFSET + 36;
  const hasDepth = rect.bottom > NAV_TOP_OFFSET + 108;

  return keepsTop && hasDepth && coverage >= HERO_VISIBLE_MIN_COVERAGE;
}

function resolvePrimaryActive(stateMap: Map<PrimarySectionId, SectionState>): ActiveNav {
  let bestId: ActiveNav = "none";
  let bestScore = 0;

  for (const item of PRIMARY_NAV_ITEMS) {
    const state = stateMap.get(item.id);
    if (!state) continue;

    const nearTop = state.top <= NAV_TOP_OFFSET + 64 && state.bottom > NAV_TOP_OFFSET + 86;
    const coverageBonus = nearTop ? 0.08 : 0;
    const score = state.viewportCoverage + coverageBonus;

    if (state.viewportCoverage >= ACTIVE_MIN_COVERAGE || nearTop) {
      if (score > bestScore) {
        bestScore = score;
        bestId = item.id;
      }
    }
  }

  return bestId;
}

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function resolveHref(pathname: string, id: PrimarySectionId) {
  if (id === "planes") {
    return pathname === "/" ? "#planes" : "/planes";
  }

  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export function Navbar() {
  const pathname = usePathname();
  const [activeHomeSection, setActiveHomeSection] = useState<ActiveNav>("none");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedValue = useMemo<ActiveNav>(() => {
    if (pathname.startsWith("/planes")) return "planes";
    if (pathname !== "/") return "none";
    return activeHomeSection;
  }, [activeHomeSection, pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    if (typeof window === "undefined") return;

    const sections = PRIMARY_NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node)
    );

    if (!sections.length) return;

    const stateMap = new Map<PrimarySectionId, SectionState>();

    const updateFromRects = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const id = section.id as PrimarySectionId;
        stateMap.set(id, {
          top: rect.top,
          bottom: rect.bottom,
          viewportCoverage: getViewportCoverage(rect, viewportHeight),
        });
      });

      if (heroIsDominatingView()) {
        setActiveHomeSection("none");
        return;
      }

      setActiveHomeSection(resolvePrimaryActive(stateMap));
    };

    updateFromRects();

    const observer = new IntersectionObserver(
      (entries) => {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id as PrimarySectionId;
          stateMap.set(id, {
            top: entry.boundingClientRect.top,
            bottom: entry.boundingClientRect.bottom,
            viewportCoverage: getViewportCoverage(entry.boundingClientRect, viewportHeight),
          });
        });

        if (heroIsDominatingView()) {
          setActiveHomeSection("none");
          return;
        }

        setActiveHomeSection(resolvePrimaryActive(stateMap));
      },
      {
        threshold: buildThresholds(),
        rootMargin: `-${NAV_TOP_OFFSET}px 0px -18% 0px`,
      }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("resize", updateFromRects);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateFromRects);
    };
  }, [pathname]);

  useEffect(() => {
    const menuNode = menuRef.current;
    if (!menuNode || !isMenuOpen) return;

    const entryAnimation = animate(menuNode, {
      opacity: [0, 1],
      translateY: [-8, 0],
      scale: [0.96, 1],
      duration: 260,
      ease: "out(3)",
    });

    return () => {
      entryAnimation.pause();
    };
  }, [isMenuOpen]);

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
    setActiveHomeSection("none");
  }

  function handlePrimaryClick(event: MouseEvent<HTMLAnchorElement>, id: PrimarySectionId) {
    setIsMenuOpen(false);

    if (pathname !== "/") return;

    const href = event.currentTarget.getAttribute("href") ?? "";
    const hashId = href.startsWith("#") ? href.replace("#", "") : "";
    if (!hashId || hashId !== id) return;

    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
  }

  function handleExtraClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    setIsMenuOpen(false);

    if (pathname !== "/") return;

    const href = event.currentTarget.getAttribute("href") ?? "";
    const targetUrl = new URL(href, window.location.href);
    const currentPath = normalizePath(window.location.pathname);
    const targetPath = normalizePath(targetUrl.pathname);
    const hashId = targetUrl.hash.replace("#", "");

    if (targetPath !== currentPath || !hashId) return;

    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    scrollToSection(id);
  }

  const isTransparent = pathname === "/" && !isScrolled && !isMenuOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isTransparent
          ? "border-b border-transparent bg-[rgba(15,15,18,0.62)] backdrop-blur-[14px]"
          : "border-b border-white/12 bg-[rgba(15,15,18,0.78)] backdrop-blur-[14px]"
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-3 px-5">
        <Link
          href="/"
          onClick={handleBrandClick}
          className="shrink-0 font-heading text-[1.7rem] font-extrabold tracking-[-0.02em] text-white/90 transition-colors duration-200 hover:text-white"
        >
          Pepu Gonzalez
        </Link>

        <div className="relative ml-auto flex items-center gap-2">
          <nav
            aria-label="Navegacion principal"
            className="rounded-[10px] border border-white/14 bg-white/[0.06] p-1 backdrop-blur-md"
          >
            <ul className="flex items-center gap-1">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const active = selectedValue === item.id;
                const href = resolveHref(pathname, item.id);

                return (
                  <li key={item.id}>
                    <a
                      href={href}
                      onClick={(event) => handlePrimaryClick(event, item.id)}
                      className={cn(
                        "group relative inline-flex items-center rounded-[8px] px-3 py-1.5 text-xs font-semibold transition-all duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4",
                        active
                          ? "translate-y-[-1px] border border-primary/55 bg-[linear-gradient(120deg,#8B0000_0%,#D41414_100%)] text-white shadow-[0_16px_24px_-18px_rgba(212,20,20,0.95)]"
                          : "border border-transparent text-muted-foreground hover:border-primary/30 hover:bg-white/[0.08] hover:text-foreground"
                      )}
                    >
                      <span className="sm:hidden">{item.mobileLabel}</span>
                      <span className="hidden sm:inline">{item.label}</span>
                      <span
                        className={cn(
                          "pointer-events-none absolute bottom-1 left-3 right-3 h-px origin-left rounded-full bg-primary transition-transform duration-[250ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-white/90 transition-all duration-200 hover:border-primary/45 hover:text-white"
          >
            {isMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
          </button>

          {isMenuOpen ? (
            <div
              ref={menuRef}
              className="absolute right-0 top-[calc(100%+0.55rem)] z-40 w-56 origin-top-right rounded-2xl border border-white/[0.14] bg-[rgba(15,15,18,0.85)] p-2.5 opacity-0 shadow-[0_24px_52px_-30px_rgba(0,0,0,0.92)] backdrop-blur-xl"
            >
              <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Explorar</p>
              <ul className="space-y-1">
                {EXTRA_NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={pathname === "/" ? `#${item.id}` : `/#${item.id}`}
                      onClick={(event) => handleExtraClick(event, item.id)}
                      className="inline-flex w-full items-center rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-white/[0.08] hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
