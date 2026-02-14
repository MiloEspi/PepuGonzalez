import Link from "next/link";

import { PlanCard } from "@/components/site/plan-card";
import { SectionShell } from "@/components/site/section-shell";
import { Button } from "@/components/ui/button";
import { featuredPlans } from "@/data/plans";

export function FeaturedPlans() {
  return (
    <SectionShell
      id="planes"
      eyebrow="PLANES DESTACADOS"
      title="Elegi un plan con estructura y objetivo claro"
      description="Cada programa esta armado para ejecutarse en tu realidad: dias disponibles, nivel actual y contexto de entrenamiento."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {featuredPlans.slice(0, 4).map((plan) => (
          <PlanCard key={plan.slug} plan={plan} className="transition-transform duration-300 hover:-translate-y-1" />
        ))}
      </div>

      <div className="mt-8">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/planes">Ver catalogo completo de planes</Link>
        </Button>
      </div>
    </SectionShell>
  );
}
