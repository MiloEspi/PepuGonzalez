import type { Metadata } from "next";

import { FeaturedPlans } from "@/components/site/featured-plans";
import { PLANS_QUERY, sanityFetch, type PlanDoc } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Programas | Pepu Gonzalez",
  description: "Planes y programas de Pepu Gonzalez.",
};

export default async function ProgramasPage() {
  const plans = await sanityFetch<PlanDoc[]>(PLANS_QUERY);

  return (
    <main className="pb-16 pt-6">
      <FeaturedPlans plans={plans} />
    </main>
  );
}
