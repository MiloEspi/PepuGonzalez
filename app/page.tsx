import { AboutSection } from "@/components/site/about-section";
import { FAQSection } from "@/components/site/faq-section";
import { FeaturedPlans } from "@/components/site/featured-plans";
import { FinalCTA } from "@/components/site/final-cta";
import { HeroSection } from "@/components/site/hero-section";
import { PlanFinderTeaser } from "@/components/site/plan-finder-teaser";
import { TestimonialsSection } from "@/components/site/testimonials-section";

export default function HomePage() {
  return (
    <main className="pb-10">
      <HeroSection />
      <PlanFinderTeaser />
      <AboutSection />
      <FeaturedPlans />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
