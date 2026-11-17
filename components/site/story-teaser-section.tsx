import Image from "next/image";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionEyebrow, SectionTitle } from "@/components/site/section-heading";
import { publicAssetSlot } from "@/lib/public-asset";

// PENDIENTE: completar con el número real antes de publicar.
const KILOS_A_LOS_16 = "[número]";

const ANTES = publicAssetSlot("preview/antes.jpg");
const HOY = publicAssetSlot("preview/hoy.jpg");

function Photo({ slot, label }: { slot: { src: string; filename: string; exists: boolean }; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px] bg-[var(--negro-2)]">
        {slot.exists ? (
          <Image src={slot.src} alt={`${label} de Pepu González`} fill sizes="(max-width: 767px) 230px, 250px" className="object-cover object-top" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border border-[var(--dorado-suave)]/30 p-2 text-center">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[var(--texto-gris)]">{slot.filename}</span>
          </div>
        )}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--dorado)]">{label}</span>
    </div>
  );
}

export function StoryTeaserSection() {
  return (
    <Section id="antes-despues" tone="a" glow="faint-left">
      <SectionEyebrow>MI HISTORIA</SectionEyebrow>
      <SectionTitle className="mt-3">
        YO TAMBIÉN <AccentText>estuve ahí</AccentText>
      </SectionTitle>

      <div className="mx-auto mt-10 grid max-w-[460px] grid-cols-2 gap-3 md:mt-12 md:max-w-[520px] md:gap-4">
        <Photo slot={ANTES} label="Antes" />
        <Photo slot={HOY} label="Hoy" />
      </div>

      <p className="copy mx-auto mt-10 text-[var(--texto)] md:mt-12">
        A los 16 pesaba {KILOS_A_LOS_16} kilos. Probé dietas estrictas y rebotaba. Después me obsesioné, comía poquísimo
        y terminé flaco, sin músculo y con la cabeza rota. Hoy peso 78 con músculo y como asado los domingos. Todo lo
        que te enseño es lo que me funcionó a mí.
      </p>
    </Section>
  );
}
