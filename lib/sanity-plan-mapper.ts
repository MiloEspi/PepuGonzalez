import { offers, sortOffersByDisplayOrder, type Offer } from "@/data/offers";
import type { PlanDoc } from "@/lib/sanity";

export function mapSanityPlansToOffers(plans: PlanDoc[]): Offer[] {
  void plans;
  return sortOffersByDisplayOrder(offers);
}
