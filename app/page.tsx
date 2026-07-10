import { AboutSection } from "@/components/site/about-section";
import { FAQSection } from "@/components/site/faq-section";
import { FinalCTA } from "@/components/site/final-cta";
import { HeroSection } from "@/components/site/hero-section";
import { SistemaPepuOffer } from "@/components/site/sistema-pepu-offer";
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
    <main className="space-y-3 pb-16 md:space-y-4">
      <HeroSection content={settings} />
      <TestimonialsSection results={results} />
      <AboutSection content={about} />
      <SistemaPepuOffer />
      <FAQSection items={faqs} />

      {/* Separador de marca PG */}
      <div aria-hidden className="flex items-center gap-4 px-6 py-1">
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(201,169,97,0.32))]" />
        <span className="font-heading text-[0.78rem] tracking-[0.28em] text-[#c9a961]/55 select-none">PG</span>
        <div className="h-px flex-1 bg-[linear-gradient(270deg,transparent,rgba(201,169,97,0.32))]" />
      </div>

      <FinalCTA />
    </main>
  );
}
