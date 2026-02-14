import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export function SectionShell({ id, eyebrow, title, description, className, children }: SectionShellProps) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 md:scroll-mt-28 md:py-20", className)}>
      {(eyebrow || title || description) && (
        <header className="mb-8 max-w-3xl space-y-3">
          {eyebrow ? (
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
              <Separator className="max-w-28 bg-border/80" />
            </div>
          ) : null}
          {title ? <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2> : null}
          {description ? <p className="text-base text-muted-foreground md:text-lg">{description}</p> : null}
        </header>
      )}
      {children}
    </section>
  );
}
