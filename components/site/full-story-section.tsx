import Image from "next/image";

import { AccentText } from "@/components/site/accent-text";
import { Section } from "@/components/site/section";
import { SectionTitle } from "@/components/site/section-heading";
import { publicAssetSlot } from "@/lib/public-asset";

const ANTES = publicAssetSlot("preview/antes.jpg");
const HOY = { src: "/DSC02489.jpg", filename: "DSC02489.jpg", exists: true };

const STORY_PARAGRAPHS = [
  "A los 16 pesaba casi 90 kilos y medía 1,75.",
  "Me acuerdo de un verano puntual. Una juntada con amigos, me saqué la remera, y un chico empezó a burlarse. No me olvido más. Yo en el fondo sabía que tenía potencial, pero el físico me hacía sentir menos que todos.",
  "Y hacés lo que hace todo el mundo: te ponés la remera y no te la sacás más. Ese dolor lo terminás tapando con más comida.",
  "Primero probé dietas estrictas. Duraba dos semanas y rebotaba.",
  "Después me fui al otro extremo: me obsesioné. Comía poquísimo, hacía cardio como un demente. Bajé un montón de peso, sí. Pero perdí músculo, quedé flaco y sin forma, y me arruiné la cabeza con la comida. Eso también fue un fracaso, aunque en las fotos pareciera un éxito.",
  "Hoy peso 78 kilos con músculo y como asado los domingos.",
  "Lo que aprendí es que no hacía falta nada de eso. No hacía falta pasar hambre ni obsesionarse. Hacía falta ordenar unos hábitos y sostenerlos.",
  "Yo tardé años y me llevé dos fracasos por delante para entender eso. Vos no tenés por qué pegarte la cabeza contra la pared mil veces como me la pegué yo. Para eso estoy.",
];

function Photo({ slot, label }: { slot: { src: string; filename: string; exists: boolean }; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[14px] bg-[var(--negro-2)]">
        {slot.exists ? (
          <Image src={slot.src} alt={`${label} de Pepu González`} fill sizes="(max-width: 767px) 45vw, 300px" className="object-cover object-top" />
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

export function FullStorySection() {
  return (
    <Section id="mi-historia" tone="a">
      <SectionTitle>
        MI <AccentText>historia</AccentText>
      </SectionTitle>

      <div className="mx-auto mt-10 grid max-w-[360px] grid-cols-2 gap-3 md:mt-12 md:max-w-[420px] md:gap-4">
        <Photo slot={ANTES} label="Antes" />
        <Photo slot={HOY} label="Hoy" />
      </div>

      <div className="copy mx-auto mt-10 space-y-1.5 text-[var(--texto-gris)] md:mt-12">
        {STORY_PARAGRAPHS.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
