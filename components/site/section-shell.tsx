import type { ReactNode } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
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
    <SectionWrapper id={id} className={cn("layout-shell scroll-mt-[calc(var(--navbar-height)+0.7rem)] py-6 md:py-8", className)}>
      <div className={cn("panel-shell", panelClassName)}>
        {(eyebrow || title || description) && (
          <header className="relative z-10 mb-6 max-w-4xl space-y-3.5 md:mb-7 md:space-y-4">
            {eyebrow ? (
              <div className="flex items-center gap-3.5">
                <p className="text-xs font-semibold tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
                <span className="section-shell-eyebrow-line" />
              </div>
            ) : null}
            {title ? (
              <h2 data-section-title className="section-shell-title text-[1.8rem] font-semibold leading-[1.02] text-foreground md:text-[2.55rem]">
                {title}
              </h2>
            ) : null}
            {description ? <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-lg">{description}</p> : null}
            <span data-section-line aria-hidden className="section-shell-active-bar" />
          </header>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </SectionWrapper>
  );
}
