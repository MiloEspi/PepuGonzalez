import type { Metadata } from "next";

import { PlansCatalog } from "@/components/site/plans-catalog";
import { SectionShell } from "@/components/site/section-shell";

export const metadata: Metadata = {
  title: "Planes | Pepu Gonzalez",
  description: "Catalogo de planes personalizados para definicion, volumen y rendimiento.",
};

export default function PlansPage() {
  return (
    <main className="pb-16 pt-6">
      <SectionShell
        eyebrow="CATALOGO"
        title="Planes de entrenamiento"
        description="Filtra por objetivo, nivel y disponibilidad para encontrar el programa que mejor encaja con tu proceso."
        className="pb-6"
      >
        <PlansCatalog />
      </SectionShell>
    </main>
  );
}
