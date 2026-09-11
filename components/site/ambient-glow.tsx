import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  variant?: "strong" | "soft";
  position?: "left" | "right";
}

/**
 * `strong` (15%) es solo para Hero y Cierre. `soft` (9%) es para el resto de
 * las secciones — alterná `position` entre secciones consecutivas para que
 * no se note repetido.
 */
export function AmbientGlow({ variant = "strong", position = "left" }: AmbientGlowProps) {
  if (variant === "strong") {
    return <div aria-hidden className="ambient-glow" />;
  }

  return (
    <div
      aria-hidden
      className={cn("ambient-glow-soft", position === "left" ? "ambient-glow-soft--left" : "ambient-glow-soft--right")}
    />
  );
}
