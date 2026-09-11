import { ShieldCheck } from "lucide-react";

import { Section } from "@/components/site/section";

export function GuaranteeSection() {
  return (
    <Section id="garantia" tone="a" glow="soft-left" containerClassName="flex flex-col items-center text-center">
      <ShieldCheck className="size-9 text-[var(--dorado)]" strokeWidth={1.5} />
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--dorado)]">Garantía real</p>
      <p className="mt-6 max-w-3xl text-[1.7rem] font-bold leading-[1.2] text-[var(--texto)] sm:text-[2.3rem] md:text-[2.5rem]">
        Si seguís el plan durante 90 días y no ves cambios, sigo trabajando con vos sin costo hasta que los veas.
      </p>
    </Section>
  );
}
