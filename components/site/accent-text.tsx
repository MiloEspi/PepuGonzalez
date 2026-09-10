import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Una o dos palabras destacadas dentro de un título: serif itálica dorada.
 * Máximo una vez por título — es el único recurso tipográfico del acento.
 */
export function AccentText({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("font-accent italic text-[var(--dorado)]", className)}>{children}</em>;
}
