import { ShieldCheck } from "lucide-react";

import { Section } from "@/components/site/section";

export function GuaranteeSection() {
  return (
    <Section id="garantia" tone="a" glow="soft-left" containerClassName="flex flex-col items-center text-center">
      <ShieldCheck className="size-9 text-[var(--dorado)]" strokeWidth={1.5} />
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--dorado)]">Garantía real</p>
      <p className="mt-6 max-w-3xl text-[1.7rem] font-bold leading-[1.2] text-[var(--texto)] sm:text-[2.3rem] md:text-[2.5rem]">
        Si hacés tus 12 check-ins semanales y a los 90 días tu peso promedio no bajó, te devuelvo toda la plata.
      </p>
      <p className="copy mt-6 text-[var(--texto-gris)]">
        Los check-ins son la prueba de que hiciste tu parte. Así es justo para los dos.
      </p>
    </Section>
  );
}
