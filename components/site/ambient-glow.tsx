import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  variant?: "strong" | "soft" | "faint";
  position?: "left" | "right";
}

/**
 * `strong` (15%) es solo para Hero y Cierre. `soft` (9%) es para Resultados
 * y Garantía. `faint` (8%) es para el resto de las secciones. Alterná
 * `position` entre secciones consecutivas para que no se note repetido.
 */
export function AmbientGlow({ variant = "strong", position = "left" }: AmbientGlowProps) {
  if (variant === "strong") {
    return <div aria-hidden className="ambient-glow" />;
  }

  const toneClass =
    variant === "soft"
      ? position === "left"
        ? "ambient-glow-soft--left"
        : "ambient-glow-soft--right"
      : position === "left"
        ? "ambient-glow-faint--left"
        : "ambient-glow-faint--right";

  return <div aria-hidden className={cn("ambient-glow-soft", toneClass)} />;
}
