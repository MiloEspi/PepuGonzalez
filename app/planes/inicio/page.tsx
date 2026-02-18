import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfferDetailPage } from "@/components/site/offer-detail-page";
import { getOfferByDetailSlug } from "@/data/offers";

const offer = getOfferByDetailSlug("inicio");

export const metadata: Metadata = {
  title: `${offer?.title ?? "Plan Inicio"} | Pepu Gonzalez`,
  description: offer?.pitch ?? "Detalle completo del Plan Inicio de Pepu Gonzalez.",
};

export default function PlanInicioPage() {
  if (!offer) notFound();
  return <OfferDetailPage offer={offer} />;
}
