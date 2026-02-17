import {createClient, type QueryParams} from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? "yzplyod3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-02-17";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const SANITY_FETCH_OPTIONS = { next: { revalidate: 60 } } as const;

export type SiteSettingsDoc = {
  heroTitle: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  whatsappCtaText: string;
  whatsappCtaHref: string;
  navItems: Array<{ label: string; href: string }>;
};

export type AboutDoc = {
  headline: string;
  aboutImageUrl: string;
  shortBio: string;
};

export type PlanDoc = {
  _id: string;
  tier: "inicio" | "base" | "transformacion" | "mentoria";
  title: string;
  subtitle?: string;
  priceARS: number;
  priceUSD?: number;
  durationLabel: string;
  shortDesc: string;
  features: string[];
  imageUrl: string;
  isFeatured?: boolean;
};

export type ResultDoc = {
  _id: string;
  personName: string;
  testimonial: string;
  resultMetric: string;
  durationLabel?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  tagLabel: string;
};

export type FaqDoc = {
  _id: string;
  question: string;
  answer: string;
  order: number;
};

export type FooterDoc = {
  email: string;
  socialLinks: Array<{ name: string; href: string }>;
  legalLinks: Array<{ label: string; href: string }>;
};

export const SETTINGS_QUERY = `*[_type=="siteSettings"][0]{
  heroTitle,
  heroSubtitle,
  "heroImageUrl": heroImage.asset->url,
  primaryCtaText,
  primaryCtaHref,
  whatsappCtaText,
  whatsappCtaHref,
  navItems[]{
    label,
    href
  }
}`;

export const ABOUT_QUERY = `*[_type=="about"][0]{
  headline,
  shortBio,
  "aboutImageUrl": aboutImage.asset->url
}`;

export const PLANS_QUERY = `*[_type=="plan"]|order(tier asc){
  _id,
  tier,
  title,
  subtitle,
  priceARS,
  priceUSD,
  durationLabel,
  shortDesc,
  features,
  "imageUrl": image.asset->url,
  isFeatured
}`;

export const RESULTS_QUERY = `*[_type=="result"]|order(_createdAt desc){
  _id,
  personName,
  testimonial,
  resultMetric,
  durationLabel,
  "beforeImageUrl": beforeImage.asset->url,
  "afterImageUrl": afterImage.asset->url,
  tagLabel
}`;

export const FAQ_QUERY = `*[_type=="faq"]|order(order asc){
  _id,
  question,
  answer,
  order
}`;

export const FOOTER_QUERY = `*[_type=="footer"][0]{
  email,
  socialLinks[]{
    name,
    href
  },
  legalLinks[]{
    label,
    href
  }
}`;

export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return sanityClient.fetch<T>(query, params, SANITY_FETCH_OPTIONS);
}
