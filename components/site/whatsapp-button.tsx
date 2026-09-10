import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { WhatsAppGlyph } from "@/components/site/primary-button";

interface WhatsAppButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "default" | "lg";
  dot?: boolean;
}

/**
 * Botón compacto de WhatsApp para lugares chicos (navbar, sheet mobile).
 * Mismo dorado/negro que el botón principal, sin glow — el glow es solo
 * para el PrimaryButton de las secciones. `dot` agrega el punto pulsante
 * — usar en un solo lugar de toda la página.
 */
export function WhatsAppButton({ href, children, className, size = "default", dot = false }: WhatsAppButtonProps) {
  const sizeClass = size === "sm" ? "min-h-8 px-3 py-2 text-sm" : size === "lg" ? "min-h-10 px-6 py-2.5 text-sm" : "min-h-9 px-4 py-2 text-sm";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Hablar por WhatsApp"
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-[var(--dorado)] font-bold text-black transition-[filter] duration-200 hover:brightness-110",
        sizeClass,
        className
      )}
    >
      <WhatsAppGlyph className="mr-2" />
      {dot ? <span aria-hidden className="apply-dot mr-[10px]" /> : null}
      <span className="min-w-0 break-words">{children}</span>
    </a>
  );
}
