import type { ReactNode } from "react";

import { AmbientGlow } from "@/components/site/ambient-glow";
import { PageContainer } from "@/components/site/section-primitives";
import { cn } from "@/lib/utils";

type SectionGlow = boolean | "soft-left" | "soft-right" | "faint-left" | "faint-right";

interface SectionProps {
  id?: string;
  tone?: "a" | "b";
  glow?: SectionGlow;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

function renderGlow(glow: SectionGlow) {
  if (glow === true) return <AmbientGlow variant="strong" />;
  if (glow === "soft-left") return <AmbientGlow variant="soft" position="left" />;
  if (glow === "soft-right") return <AmbientGlow variant="soft" position="right" />;
  if (glow === "faint-left") return <AmbientGlow variant="faint" position="left" />;
  if (glow === "faint-right") return <AmbientGlow variant="faint" position="right" />;
  return null;
}

/**
 * Envoltorio liviano para las secciones del sitio nuevo: sin tarjeta, sin
 * borde. Solo fondo alternado y el aire de 120px/180px entre secciones.
 * `glow={true}` (15%, fuerte) es Hero y Cierre. `glow="soft-*"` (9%) es
 * Resultados y Garantía. `glow="faint-*"` (8%) es el resto de las secciones
 * — alterná `-left`/`-right` entre secciones consecutivas.
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
      {renderGlow(glow)}
      <PageContainer className={cn("relative z-10", containerClassName)}>{children}</PageContainer>
    </section>
  );
}
