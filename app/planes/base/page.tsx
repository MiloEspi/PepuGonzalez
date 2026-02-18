import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfferDetailPage } from "@/components/site/offer-detail-page";
import { getOfferByDetailSlug } from "@/data/offers";

const offer = getOfferByDetailSlug("base");

export const metadata: Metadata = {
  title: `${offer?.title ?? "Plan Base"} | Pepu Gonzalez`,
  description: offer?.pitch ?? "Detalle completo del Plan Base de Pepu Gonzalez.",
};

export default function PlanBasePage() {
  if (!offer) notFound();
  return <OfferDetailPage offer={offer} />;
}
