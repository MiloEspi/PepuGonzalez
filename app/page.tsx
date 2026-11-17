import { ApplySection } from "@/components/site/apply-section";
import { ForWhomSection } from "@/components/site/for-whom-section";
import { GuaranteeSection } from "@/components/site/guarantee-section";
import { HeroSection } from "@/components/site/hero-section";
import { HomeFaqSection } from "@/components/site/home-faq-section";
import { MethodSection } from "@/components/site/method-section";
import { ProblemSection } from "@/components/site/problem-section";
import { ProductsTeaserSection } from "@/components/site/products-teaser-section";
import { StoryTeaserSection } from "@/components/site/story-teaser-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { RESULTS_QUERY, sanityFetch, type ResultDoc } from "@/lib/sanity";
import { publicAssetSlot } from "@/lib/public-asset";

export default async function HomePage() {
  const results = await sanityFetch<ResultDoc[]>(RESULTS_QUERY);
  const video = publicAssetSlot("hero.mp4");
  const poster = publicAssetSlot("hero-poster.jpg");
  const antes = publicAssetSlot("preview/antes.jpg");
  const hoy = publicAssetSlot("preview/hoy.jpg");

  return (
    <main>
      <HeroSection antes={antes} hoy={hoy} />
      <TestimonialsSection results={results} />
      <ProblemSection />
      <StoryTeaserSection video={video} poster={poster} />
      <MethodSection />
      <GuaranteeSection />
      <ForWhomSection />
      <ApplySection />
      <HomeFaqSection />
      <ProductsTeaserSection />
    </main>
  );
}
