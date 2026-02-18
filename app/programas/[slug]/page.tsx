import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { OfferDetailPage } from "@/components/site/offer-detail-page";
import { offers, type Offer, type OfferSlug } from "@/data/offers";
import { PLANS_QUERY, sanityFetch, type PlanDoc } from "@/lib/sanity";
import { mapSanityPlansToOffers } from "@/lib/sanity-plan-mapper";

interface ProgramaDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

async function getCatalogOffers(): Promise<Offer[]> {
  const plans = await sanityFetch<PlanDoc[]>(PLANS_QUERY);
  return mapSanityPlansToOffers(plans);
}

export async function generateMetadata({ params }: ProgramaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const catalogOffers = await getCatalogOffers();
  const offer = catalogOffers.find((item) => item.slug === slug);
  if (!offer) return {};
  return {
    title: `${offer.title} | Pepu González`,
    description: offer.pitch,
  };
}

export default async function ProgramaDetailPage({ params }: ProgramaDetailPageProps) {
  const { slug } = await params;
  const catalogOffers = await getCatalogOffers();
  const offer = catalogOffers.find((item) => item.slug === (slug as OfferSlug));
  if (!offer) notFound();
  return <OfferDetailPage offer={offer} />;
}
