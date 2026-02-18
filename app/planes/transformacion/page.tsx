import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfferDetailPage } from "@/components/site/offer-detail-page";
import { getOfferByDetailSlug } from "@/data/offers";

const offer = getOfferByDetailSlug("transformacion");

export const metadata: Metadata = {
  title: `${offer?.title ?? "Transformacion"} | Pepu Gonzalez`,
  description: offer?.pitch ?? "Detalle completo del Plan Transformacion de Pepu Gonzalez.",
};

export default function PlanTransformacionPage() {
  if (!offer) notFound();
  return <OfferDetailPage offer={offer} />;
}
