import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfferDetailPage } from "@/components/site/offer-detail-page";
import { offers, type OfferSlug } from "@/data/offers";

interface ProgramaDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({ params }: ProgramaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = offers.find((item) => item.slug === slug);
  if (!offer) return {};
  return {
    title: `${offer.title} | Pepu Gonzalez`,
    description: offer.pitch,
  };
}

export default async function ProgramaDetailPage({ params }: ProgramaDetailPageProps) {
  const { slug } = await params;
  const offer = offers.find((item) => item.slug === (slug as OfferSlug));
  if (!offer) notFound();
  return <OfferDetailPage offer={offer} />;
}
