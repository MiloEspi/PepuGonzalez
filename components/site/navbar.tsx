"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getStickyWhatsAppHref } from "@/data/offers";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

type ExtraNavItem = {
  label: string;
  href: string;
};

type StaticNavItem = ExtraNavItem & { variant: "muted" | "product" };

interface NavbarProps {
  extraNavItems: ExtraNavItem[];
}

const STATIC_NAV_ITEMS: StaticNavItem[] = [
  { label: "Mi Historia", href: "/mi-historia", variant: "muted" },
  // Recetario todavía no existe — sacado del nav hasta que esté listo. Ver data/digital-products.ts.
  { label: "Rutinas", href: "/rutinas", variant: "product" },
];

const APPLY_HREF = getStickyWhatsAppHref();

export function Navbar({ extraNavItems }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const resolvedExtraNavItems = extraNavItems.filter((item) => item.label?.trim() && item.href?.trim());

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
      const navHeight = headerRef.current?.offsetHeight ?? 72;
      document.documentElement.style.setProperty("--navbar-height", `${navHeight}px`);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const navbarTone = isScrolled || isMenuOpen;

  function renderStaticItem(item: StaticNavItem, compact: boolean) {
    const active = pathname === item.href;

    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={() => setIsMenuOpen(false)}
          aria-current={active ? "page" : undefined}
          className={cn(
            "inline-flex items-center rounded-full border bg-transparent transition-colors duration-200",
            compact ? "px-2.5 py-1.5 text-xs font-semibold" : "px-3.5 py-2 text-sm font-semibold",
            active
              ? "border-[var(--dorado)] bg-[var(--dorado)]/12 text-[var(--dorado)]"
              : item.variant === "product"
                ? "border-[var(--dorado-suave)] text-[var(--texto)] hover:border-[var(--dorado)] hover:text-[var(--dorado)]"
                : "border-white/14 text-[var(--texto-gris)] hover:border-[var(--dorado-suave)] hover:text-[var(--texto)]"
          )}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/[0.05] bg-[rgba(10,10,10,0.7)] backdrop-blur-[12px] transition-shadow duration-300",
        navbarTone ? "shadow-[0_20px_42px_-30px_rgba(0,0,0,0.92)]" : "shadow-none"
      )}
    >
      <div className="layout-shell py-1.5 md:py-2">
        <div data-navbar-shell className="relative overflow-visible">
          <div className="flex items-center gap-3 px-2.5 py-2 md:grid md:grid-cols-[1fr_auto_1fr] md:px-3 md:py-2.5">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="min-w-0 truncate font-heading text-[1.18rem] uppercase tracking-tight text-[var(--texto)] transition-colors duration-200 hover:text-white sm:text-[1.42rem]"
            >
              Pepu González
            </Link>

            <nav aria-label="Navegación principal" className="hidden md:block md:justify-self-center">
              <ul className="flex items-center gap-2">
                {STATIC_NAV_ITEMS.map((item) => renderStaticItem(item, false))}
              </ul>
            </nav>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <div className="ml-auto flex items-center gap-2 justify-end md:justify-self-end">
                <WhatsAppButton href={APPLY_HREF} size="sm" dot className="hidden md:inline-flex tracking-[0.03em]">
                  Aplicar
                </WhatsAppButton>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isMenuOpen}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] text-[var(--texto)] transition-colors duration-200 hover:border-[var(--dorado-suave)]"
                  >
                    {isMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
                  </button>
                </SheetTrigger>
              </div>

              <SheetContent side="right" className="gap-5 px-4 pb-5 pt-9">
                <SheetHeader className="space-y-1 border-b border-white/10 pb-4 pr-8">
                  <SheetTitle className="font-heading text-[1.2rem] tracking-[0.02em]">Navegación</SheetTitle>
                  <SheetDescription className="text-xs uppercase tracking-[0.14em] text-[var(--texto-gris)]">
                    Elegí una sección para avanzar rápido
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-5 overflow-y-auto pb-2">
                  <WhatsAppButton href={APPLY_HREF} className="w-full justify-center">
                    Aplicar
                  </WhatsAppButton>

                  <div className="space-y-2">
                    <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--texto-gris)]">Accesos</p>
                    <ul className="space-y-1.5">
                      {STATIC_NAV_ITEMS.map((item) => (
                        <li key={`sheet-${item.href}`}>
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="inline-flex w-full items-center rounded-[10px] border border-white/14 bg-white/[0.05] px-3 py-2.5 text-sm font-medium text-[var(--texto)] transition-colors duration-200 hover:border-[var(--dorado-suave)]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {resolvedExtraNavItems.length > 0 && (
                    <div className="space-y-2">
                      <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--texto-gris)]">Explorar</p>
                      <ul className="space-y-1.5">
                        {resolvedExtraNavItems.map((item) => (
                          <li key={`sheet-extra-${item.href}-${item.label}`}>
                            <a
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="inline-flex w-full items-center rounded-[10px] border border-white/12 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-[var(--texto-gris)] transition-colors duration-200 hover:border-[var(--dorado-suave)] hover:text-[var(--texto)]"
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
              {STATIC_NAV_ITEMS.map((item) => renderStaticItem(item, true))}
              <li>
                <a
                  href={APPLY_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-flex items-center rounded-full bg-[var(--dorado)] px-2.5 py-1.5 text-xs font-bold text-black"
                >
                  <span aria-hidden className="apply-dot mr-[10px]" />
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
