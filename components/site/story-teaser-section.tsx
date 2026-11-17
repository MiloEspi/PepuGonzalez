import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";
import { StoryVideo } from "@/components/site/story-video";
import type { PublicAssetSlot } from "@/lib/public-asset";

interface StoryTeaserSectionProps {
  video: PublicAssetSlot;
  poster: PublicAssetSlot;
}

export function StoryTeaserSection({ video, poster }: StoryTeaserSectionProps) {
  return (
    <Section id="antes-despues" tone="a" glow="faint-left">
      <SectionEyebrow>MI HISTORIA</SectionEyebrow>
      <SectionTitle className="mt-3">
        YO TAMBIÉN <AccentText>estuve ahí</AccentText>
      </SectionTitle>

      <p className="copy mx-auto mt-10 text-[var(--texto)] md:mt-12">
        A los 16 pesaba 85 kilos. Probé dietas estrictas y rebotaba. Después me obsesioné, comía poquísimo
        y terminé flaco, sin músculo y con la cabeza rota. Hoy peso 78 con músculo y como asado los domingos. Todo lo
        que te enseño es lo que me funcionó a mí.
      </p>

      <div className="mx-auto mt-10 max-w-[42rem] md:mt-12">
        <StoryVideo video={video} poster={poster} />
        <p className="mt-3 text-center text-xs text-[var(--texto-gris)]">Son 90 segundos.</p>
      </div>
    </Section>
  );
}
