import { AboutSection } from "@/components/site/about-section";
import { DifferentialsSection } from "@/components/site/differentials-section";
import { FAQSection } from "@/components/site/faq-section";
import { FeaturedPlans } from "@/components/site/featured-plans";
import { FinalCTA } from "@/components/site/final-cta";
import { HeroSection } from "@/components/site/hero-section";
import { PlanFinderTeaser } from "@/components/site/plan-finder-teaser";
import { TestimonialsSection } from "@/components/site/testimonials-section";

export default function HomePage() {
  return (
    <main className="pb-14">
      <HeroSection />
      <div className="landing-band landing-band--deep">
        <PlanFinderTeaser />
      </div>
      <div className="landing-band landing-band--slate">
        <AboutSection />
      </div>
      <div className="landing-band landing-band--ink">
        <FeaturedPlans />
      </div>
      <div className="landing-band landing-band--deep">
        <TestimonialsSection />
      </div>
      <div className="landing-band landing-band--slate">
        <DifferentialsSection />
      </div>
      <div className="landing-band landing-band--ink">
        <FAQSection />
      </div>
      <div className="landing-band landing-band--deep landing-band--clean">
        <FinalCTA />
      </div>
    </main>
  );
}
