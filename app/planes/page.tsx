import type { Metadata } from "next";

import { FeaturedPlans } from "@/components/site/featured-plans";

export const metadata: Metadata = {
  title: "Planes | Pepu Gonzalez",
  description: "Planes y programas de Pepu Gonzalez con detalle completo por nivel.",
};

export default function PlansPage() {
  return (
    <main className="pb-16 pt-6 md:pt-8">
      <FeaturedPlans />
    </main>
  );
}
