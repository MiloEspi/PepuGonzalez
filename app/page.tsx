import { GuaranteeSection } from "@/components/site/guarantee-section";
import { HeroSection } from "@/components/site/hero-section";
import { InlineCta } from "@/components/site/inline-cta";
import { FinalCTA } from "@/components/site/final-cta";
import { MethodSection } from "@/components/site/method-section";
import { NotIncludedSection } from "@/components/site/not-included-section";
import { ProblemSection } from "@/components/site/problem-section";
import { ProductsTeaserSection } from "@/components/site/products-teaser-section";
import { StoryTeaserSection } from "@/components/site/story-teaser-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { RESULTS_QUERY, sanityFetch, type ResultDoc } from "@/lib/sanity";
import { publicAssetSlot } from "@/lib/public-asset";

export default async function HomePage() {
  const results = await sanityFetch<ResultDoc[]>(RESULTS_QUERY);
  const heroVideo = publicAssetSlot("hero.mp4");
  const heroPoster = publicAssetSlot("hero-poster.jpg");

  return (
    <main>
      <HeroSection video={heroVideo} poster={heroPoster} />
      <StoryTeaserSection />
      <TestimonialsSection results={results} />
      <InlineCta />
      <MethodSection />
      <ProblemSection />
      <NotIncludedSection />
      <GuaranteeSection />
      <ProductsTeaserSection />
      <FinalCTA />
    </main>
  );
}
