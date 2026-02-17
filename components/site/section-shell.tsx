import type { ReactNode } from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { cn } from "@/lib/utils";
import { MobileStack, PageContainer, SectionCard, SectionHeader } from "@/components/site/section-primitives";

interface SectionShellProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  cardClassName?: string;
  contentClassName?: string;
  children: ReactNode;
}

export function SectionShell({ id, eyebrow, title, description, className, cardClassName, contentClassName, children }: SectionShellProps) {
  return (
    <SectionWrapper id={id} className={cn("scroll-mt-[calc(var(--navbar-height)+0.7rem)] py-2.5 md:py-3", className)}>
      <PageContainer>
        <SectionCard className={cardClassName}>
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          <MobileStack className={contentClassName}>{children}</MobileStack>
        </SectionCard>
      </PageContainer>
    </SectionWrapper>
  );
}
