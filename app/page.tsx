import { ApplySection } from "@/components/site/apply-section";
import { GuaranteeSection } from "@/components/site/guarantee-section";
import { HeroSection } from "@/components/site/hero-section";
import { HomeFaqSection } from "@/components/site/home-faq-section";
import { MethodSection } from "@/components/site/method-section";
import { ProductsTeaserSection } from "@/components/site/products-teaser-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { RESULTS_QUERY, sanityFetch, type ResultDoc } from "@/lib/sanity";
import { publicAssetSlot } from "@/lib/public-asset";

export default async function HomePage() {
  const results = await sanityFetch<ResultDoc[]>(RESULTS_QUERY);
  const antes = publicAssetSlot("preview/antes.jpg");
  const hoy = publicAssetSlot("preview/hoy.jpg");

  return (
    <main>
      <HeroSection antes={antes} hoy={hoy} />
      <TestimonialsSection results={results} />
      <MethodSection />
      <GuaranteeSection />
      <ApplySection />
      <ProductsTeaserSection />
      <HomeFaqSection />
    </main>
  );
}
