import { AboutSection } from "@/components/site/about-section";
import { FAQSection } from "@/components/site/faq-section";
import { FeaturedPlans } from "@/components/site/featured-plans";
import { FinalCTA } from "@/components/site/final-cta";
import { HeroSection } from "@/components/site/hero-section";
import { PlanFinderTeaser } from "@/components/site/plan-finder-teaser";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import {
  ABOUT_QUERY,
  FAQ_QUERY,
  RESULTS_QUERY,
  SETTINGS_QUERY,
  sanityFetch,
  type AboutDoc,
  type FaqDoc,
  type ResultDoc,
  type SiteSettingsDoc,
} from "@/lib/sanity";

export default async function HomePage() {
  const [settings, about, results, faqs] = await Promise.all([
    sanityFetch<SiteSettingsDoc>(SETTINGS_QUERY),
    sanityFetch<AboutDoc>(ABOUT_QUERY),
    sanityFetch<ResultDoc[]>(RESULTS_QUERY),
    sanityFetch<FaqDoc[]>(FAQ_QUERY),
  ]);

  return (
    <main className="space-y-2 pb-10 md:space-y-3">
      <HeroSection content={settings} />
      <PlanFinderTeaser />
      <AboutSection content={about} />
      <FeaturedPlans />
      <TestimonialsSection results={results} />
      <FAQSection items={faqs} />
      <FinalCTA />
    </main>
  );
}
