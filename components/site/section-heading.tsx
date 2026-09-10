import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-bold uppercase tracking-[0.22em] text-[var(--dorado)]", className)}>{children}</p>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-heading text-[2rem] uppercase leading-[1.08] tracking-tight text-[var(--texto)] sm:text-[2.5rem] md:text-[2.9rem]",
        className
      )}
    >
      {children}
    </h2>
  );
}
