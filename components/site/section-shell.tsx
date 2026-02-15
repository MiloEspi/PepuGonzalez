import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  panelClassName?: string;
  children: ReactNode;
}

export function SectionShell({ id, eyebrow, title, description, className, panelClassName, children }: SectionShellProps) {
  return (
    <section id={id} className={cn("layout-shell scroll-mt-24 py-8 md:scroll-mt-28 md:py-10", className)}>
      <div className={cn("panel-shell", panelClassName)}>
        {(eyebrow || title || description) && (
          <header className="relative z-10 mb-9 max-w-4xl space-y-4 md:mb-10">
            {eyebrow ? (
              <div className="flex items-center gap-3.5">
                <p className="text-xs font-semibold tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
                <span className="section-shell-eyebrow-line" />
              </div>
            ) : null}
            {title ? <h2 className="text-[2rem] font-semibold leading-[1.02] text-foreground md:text-[3.3rem]">{title}</h2> : null}
            {description ? <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-lg">{description}</p> : null}
          </header>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}
