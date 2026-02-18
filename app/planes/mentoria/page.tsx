import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfferDetailPage } from "@/components/site/offer-detail-page";
import { getOfferByDetailSlug } from "@/data/offers";

const offer = getOfferByDetailSlug("mentoria");

export const metadata: Metadata = {
  title: `${offer?.title ?? "Mentoria"} | Pepu Gonzalez`,
  description: offer?.pitch ?? "Detalle completo del Plan Mentoria de Pepu Gonzalez.",
};

export default function PlanMentoriaPage() {
  if (!offer) notFound();
  return <OfferDetailPage offer={offer} />;
}
