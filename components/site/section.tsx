import type { ReactNode } from "react";

import { AmbientGlow } from "@/components/site/ambient-glow";
import { PageContainer } from "@/components/site/section-primitives";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  tone?: "a" | "b";
  glow?: boolean;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

/**
 * Envoltorio liviano para las secciones del sitio nuevo: sin tarjeta, sin
 * borde. Solo fondo alternado y el aire de 120px/180px entre secciones.
 * `glow` solo va en Hero y Cierre — en ningún otro lado.
 */
export function Section({ id, tone = "a", glow = false, className, containerClassName, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-[60px] md:py-[90px]",
        tone === "a" ? "bg-[var(--negro)]" : "bg-[var(--negro-2)]",
        className
      )}
    >
      {glow ? <AmbientGlow /> : null}
      <PageContainer className={cn("relative z-10", containerClassName)}>{children}</PageContainer>
    </section>
  );
}
