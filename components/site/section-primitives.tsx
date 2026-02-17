import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type DivProps = ComponentPropsWithoutRef<"div">;
type ArticleProps = ComponentPropsWithoutRef<"article">;

interface SectionHeaderProps extends DivProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function PageContainer({ className, children, ...props }: DivProps) {
  return (
    <div className={cn("page-container", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionCard({ className, children, ...props }: ArticleProps) {
  return (
    <article className={cn("section-card", className)} {...props}>
      {children}
    </article>
  );
}

export function SectionHeader({ eyebrow, title, description, className, ...props }: SectionHeaderProps) {
  if (!eyebrow && !title && !description) {
    return null;
  }

  return (
    <header className={cn("section-header", className)} {...props}>
      {eyebrow ? (
        <div className="flex items-center gap-2.5">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
          <span className="section-shell-eyebrow-line" />
        </div>
      ) : null}

      {title ? (
        <h2 data-section-title className="section-shell-title text-[1.65rem] font-semibold leading-[1.02] text-foreground sm:text-[2rem] md:text-[2.3rem]">
          {title}
        </h2>
      ) : null}

      {description ? <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p> : null}
      <span data-section-line aria-hidden className="section-shell-active-bar" />
    </header>
  );
}

export function MobileStack({ className, children, ...props }: DivProps & { children: ReactNode }) {
  return (
    <div className={cn("mobile-stack", className)} {...props}>
      {children}
    </div>
  );
}
