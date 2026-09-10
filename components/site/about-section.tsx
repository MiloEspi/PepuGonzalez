"use client";

import Image from "next/image";

import { SectionShell } from "@/components/site/section-shell";
import type { AboutDoc } from "@/lib/sanity";

interface AboutSectionProps {
  content: AboutDoc;
}

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

export function AboutSection({ content }: AboutSectionProps) {
  const imageSrc = content.aboutImageUrl;

  return (
    <SectionShell id="sobre-mi" className="pt-1" contentClassName="gap-4">
      <span id="sobremi" aria-hidden className="sr-only" />

      <article className="overflow-hidden rounded-[18px] border border-white/14 bg-[linear-gradient(145deg,#16181f_0%,#101116_100%)] shadow-[0_34px_60px_-40px_rgba(0,0,0,0.95)]">
        <div className="flex flex-col md:flex-row">

          {/* Foto */}
          <div className="relative aspect-[3/2] w-full shrink-0 md:aspect-auto md:w-[40%]">
            <Image
              src={imageSrc}
              alt="Pepu González, antes y después"
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
              className="object-cover object-[center_18%] scale-[1.08]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.16)_0%,rgba(8,8,10,0.38)_44%,rgba(8,8,10,0.76)_100%)]" />

            <div className="absolute inset-x-0 top-0 px-4 pt-4 sm:px-5 sm:pt-5">
              <h2
                data-section-title
                className="section-shell-title inline-flex rounded-[10px] border border-white/14 bg-[rgba(8,9,12,0.52)] px-3 py-1.5 text-[0.88rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-[8px] drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]"
              >
                Mi Historia
              </h2>
            </div>
          </div>

          {/* Texto */}
          <div className="relative flex flex-col justify-center border-t border-white/10 bg-[linear-gradient(145deg,rgba(10,11,15,0.88)_0%,rgba(15,16,21,0.96)_100%)] px-5 py-4 sm:px-6 sm:py-5 md:border-l md:border-t-0">
            <span data-section-line aria-hidden className="section-shell-active-bar mb-3 block" />
            <div className="max-w-3xl space-y-1.5 text-sm leading-relaxed text-white/84 sm:text-[0.98rem]">
              {STORY_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

        </div>
      </article>
    </SectionShell>
  );
}
