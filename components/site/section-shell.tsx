import type { ReactNode } from "react";

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
    <section id={id} className={cn("mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-14 md:scroll-mt-28 md:py-20", className)}>
      {(eyebrow || title || description) && (
        <header className="mb-9 max-w-4xl space-y-4 md:mb-10">
          {eyebrow ? (
            <div className="flex items-center gap-3.5">
              <p className="text-xs font-semibold tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
              <span className="section-shell-eyebrow-line" />
            </div>
          ) : null}
          {title ? <h2 className="text-3xl font-semibold leading-[1.02] text-foreground md:text-[3.3rem]">{title}</h2> : null}
          {description ? <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p> : null}
        </header>
      )}
      {children}
    </section>
  );
}
