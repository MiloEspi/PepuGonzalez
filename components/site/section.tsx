import type { ReactNode } from "react";

import { AmbientGlow } from "@/components/site/ambient-glow";
import { PageContainer } from "@/components/site/section-primitives";
import { cn } from "@/lib/utils";

type SectionGlow = boolean | "soft-left" | "soft-right";

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
  return null;
}

/**
 * Envoltorio liviano para las secciones del sitio nuevo: sin tarjeta, sin
 * borde. Solo fondo alternado y el aire de 120px/180px entre secciones.
 * El resplandor va en exactamente cuatro lugares de todo el sitio:
 * `glow={true}` (15%, fuerte) en Hero y Cierre; `glow="soft-left"` en
 * Garantía y `glow="soft-right"` en Resultados (7%). En ningún otro lado —
 * compite con la lectura en las secciones de texto denso.
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
